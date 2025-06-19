import { NewsItem } from '@/types/news';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }>;
}

interface NewsApiError {
  status: string;
  code: string;
  message: string;
}

class NewsApiService {
  private static instance: NewsApiService;
  private apiKey: string;
  private baseUrl: string;
  private cache: Map<string, { data: NewsItem[]; timestamp: number }>;
  private cacheDuration: number;
  private rateLimit: number;
  private requestCount: number;
  private lastResetTime: number;
  private lastRequestTime: number;
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private readonly RATE_LIMIT = 1000; // Minimum time between requests in milliseconds

  // Define trusted sources for AI news - focusing on established, reputable sources
  private readonly TRUSTED_SOURCES = [
    'reuters.com',
    'bloomberg.com',
    'nature.com',
    'science.org',
    'mit.edu',
    'stanford.edu',
    'berkeley.edu',
    'arxiv.org',
    'ieee.org',
    'acm.org',
    'research.google',
    'deepmind.com/research',
    'openai.com/research',
    'microsoft.com/research',
    'nvidia.com/research',
    'anthropic.com/research'
  ];

  private constructor() {
    this.apiKey = process.env.NEWS_API_KEY || '';
    this.baseUrl = process.env.NEWS_API_BASE_URL || 'https://newsapi.org/v2';
    this.cache = new Map();
    this.cacheDuration = parseInt(process.env.NEWS_API_CACHE_DURATION || '300000');
    this.rateLimit = parseInt(process.env.NEWS_API_RATE_LIMIT || '100');
    this.requestCount = 0;
    this.lastResetTime = Date.now();
    this.lastRequestTime = 0;

    if (!this.apiKey) {
      console.error('NewsAPI key is not configured');
    }
  }

  public static getInstance(): NewsApiService {
    if (!NewsApiService.instance) {
      NewsApiService.instance = new NewsApiService();
    }
    return NewsApiService.instance;
  }

  private resetRateLimitIfNeeded(): void {
    const now = Date.now();
    if (now - this.lastResetTime >= 24 * 60 * 60 * 1000) { // 24 hours
      this.requestCount = 0;
      this.lastResetTime = now;
    }
  }

  private checkRateLimit(): boolean {
    this.resetRateLimitIfNeeded();
    if (this.requestCount >= this.rateLimit) {
      throw new Error('NewsAPI rate limit exceeded');
    }
    this.requestCount++;
    return true;
  }

  private getCachedData(key: string): NewsItem[] | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: NewsItem[]): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private transformArticle(article: NewsApiResponse['articles'][0]): NewsItem {
    const cleanTitle = this.formatTitle(article.title);
    const excerpt = this.formatExcerpt(article.description || article.content || '');
    const image = this.validateImage(article.urlToImage);
    const relatedImages = this.getRelatedImages(article);
    const source = this.formatSource(article.source.name);

    return {
      id: this.generateId(article.url),
      title: cleanTitle,
      source,
      timeAgo: this.getTimeAgo(article.publishedAt),
      category: this.determineCategory(article.title, article.description || ''),
      excerpt,
      image,
      timestamp: article.publishedAt,
      url: article.url,
      author: article.author || undefined,
      content: article.content || undefined,
      relatedImages
    };
  }

  private formatTitle(title: string): string {
    // Remove source name from title if present
    let cleanTitle = title.replace(/^.*?[-|]/, '').trim();
    
    // Remove common prefixes
    cleanTitle = cleanTitle.replace(/^(BREAKING|UPDATE|JUST IN|EXCLUSIVE):\s*/i, '');
    
    // Limit length and add ellipsis if needed
    if (cleanTitle.length > 100) {
      cleanTitle = cleanTitle.substring(0, 97) + '...';
    }
    
    return cleanTitle;
  }

  private formatExcerpt(text: string): string {
    // Clean up the excerpt
    let excerpt = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\[.*?\]/g, '') // Remove text in brackets
      .trim();

    // Limit to one or two sentences
    const sentences = excerpt.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
      excerpt = sentences.slice(0, 2).join(' ').trim();
    }

    // Limit length
    if (excerpt.length > 150) {
      excerpt = excerpt.substring(0, 147) + '...';
    }

    return excerpt;
  }

  private validateImage(imageUrl: string | null): string | undefined {
    if (!imageUrl) return undefined;

    // Check if the image URL is valid and not a placeholder
    if (
      imageUrl.includes('placeholder') ||
      imageUrl.includes('default') ||
      imageUrl.includes('no-image')
    ) {
      return undefined;
    }

    // Ensure the image URL is HTTPS
    return imageUrl.replace(/^http:/, 'https:');
  }

  private getRelatedImages(article: NewsApiResponse['articles'][0]): { url: string; caption: string }[] {
    const images: { url: string; caption: string }[] = [];
    
    // Add the main image if it exists
    if (article.urlToImage) {
      images.push({
        url: article.urlToImage,
        caption: this.formatTitle(article.title)
      });
    }

    // Try to extract additional images from content if available
    if (article.content) {
      const imageMatches = article.content.match(/https?:\/\/[^\s<>"]+?\.(?:jpg|jpeg|gif|png)(?:\?[^\s<>"]*)?/gi);
      if (imageMatches) {
        imageMatches.slice(0, 2).forEach(url => {
          if (url !== article.urlToImage) {
            images.push({
              url: url.replace(/^http:/, 'https:'),
              caption: this.formatExcerpt(article.content || '')
            });
          }
        });
      }
    }

    return images;
  }

  private generateId(url: string): number {
    return parseInt(url.split('/').pop()?.replace(/[^0-9]/g, '') || '0', 10);
  }

  private getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    }
  }

  private determineCategory(title: string, description: string): string {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('openai') || text.includes('gpt') || text.includes('chatgpt')) return 'AI Research';
    if (text.includes('deepmind') || text.includes('alphafold')) return 'AI Research';
    if (text.includes('microsoft') || text.includes('copilot')) return 'AI Business';
    if (text.includes('meta') || text.includes('llama')) return 'AI Research';
    if (text.includes('nvidia') || text.includes('gpu')) return 'Hardware';
    return 'AI News';
  }

  private isCacheExpired(cacheKey: string): boolean {
    const cachedItem = this.cache.get(cacheKey);
    if (!cachedItem) return true;
    
    const now = Date.now();
    return now - cachedItem.timestamp > this.CACHE_DURATION;
  }

  private getCategoryQuery(category: string): string {
    switch (category) {
      case 'ai':
        // Focus on substantial AI developments and research
        return `(
          "artificial intelligence research" OR 
          "machine learning research" OR 
          "AI breakthrough" OR 
          "scientific discovery" OR 
          "research paper" OR 
          "peer-reviewed study" OR 
          "academic research" OR 
          "scientific journal" OR 
          "research findings" OR 
          "scientific breakthrough"
        ) AND (
          "university" OR 
          "research institute" OR 
          "scientific journal" OR 
          "academic" OR 
          "peer-reviewed" OR 
          "study" OR 
          "research" OR 
          "discovery" OR 
          "breakthrough"
        )`;
      case 'tech':
        return '(technology research) AND (scientific OR academic OR breakthrough)';
      case 'adora':
        return 'adora ai research';
      default:
        return 'artificial intelligence research';
    }
  }

  public async fetchNews(category: string = 'ai'): Promise<NewsItem[]> {
    try {
      const cacheKey = `news_${category}`;
      const cachedData = this.getCachedData(cacheKey);
      
      if (cachedData && !this.isCacheExpired(cacheKey)) {
        return cachedData;
      }

      this.checkRateLimit();

      // Calculate date for last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const fromDate = yesterday.toISOString().split('T')[0];

      // Prepare queries focusing on research and substantial developments
      const queries = category === 'ai' ? [
        // Academic and research news
        this.getCategoryQuery(category),
        // Major scientific breakthroughs
        '("AI breakthrough" OR "scientific discovery") AND ("research" OR "study" OR "findings")',
        // Industry research
        '("AI research" OR "machine learning research") AND ("industry" OR "enterprise" OR "commercial")'
      ] : [this.getCategoryQuery(category)];

      let allArticles: NewsItem[] = [];

      // Fetch news for each query
      for (const query of queries) {
        const response = await fetch(
          `${this.baseUrl}/everything?` +
          `q=${encodeURIComponent(query)}&` +
          `language=en&` +
          `sortBy=relevancy&` + // Changed from publishedAt to relevancy
          `pageSize=20&` +
          `from=${fromDate}&` +
          `apiKey=${this.apiKey}`
        );

        if (!response.ok) {
          const errorData = await response.json() as NewsApiError;
          console.error(`NewsAPI Error for query "${query}":`, errorData.message || response.statusText);
          continue;
        }

        const data = await response.json() as NewsApiResponse;

        if (data.status === 'ok') {
          const articles = data.articles
            .filter(article => {
              const articleDate = new Date(article.publishedAt);
              const isRecent = articleDate >= yesterday;
              const isTrustedSource = this.TRUSTED_SOURCES.some(source => 
                article.url.toLowerCase().includes(source)
              );
              
              // Additional quality filters
              const hasSubstantialContent = 
                article.description && 
                article.description.length > 100 && 
                article.title.length > 30;
              
              const isResearchFocused = 
                /(research|study|discovery|breakthrough|findings|analysis|investigation)/i
                .test(article.title + ' ' + article.description);
              
              return isRecent && 
                article.urlToImage && 
                hasSubstantialContent && 
                isResearchFocused && 
                isTrustedSource;
            })
            .map(article => this.transformArticle(article));

          allArticles = [...allArticles, ...articles];
        }
      }

      // Remove duplicates and sort by relevance
      const uniqueArticles = Array.from(
        new Map(allArticles.map(article => [article.url, article])).values()
      );

      // Sort by relevance (using a combination of source trust and content quality)
      const transformedData = uniqueArticles
        .sort((a, b) => {
          // Prioritize academic and research sources
          const aScore = this.getSourceScore(a.source);
          const bScore = this.getSourceScore(b.source);
          return bScore - aScore;
        })
        .slice(0, 10);

      this.setCachedData(cacheKey, transformedData);
      return transformedData;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  private getSourceScore(source: string): number {
    // Score sources based on their credibility
    const sourceScores: { [key: string]: number } = {
      'nature.com': 10,
      'science.org': 10,
      'arxiv.org': 9,
      'mit.edu': 9,
      'stanford.edu': 9,
      'berkeley.edu': 9,
      'research.google': 8,
      'deepmind.com/research': 8,
      'openai.com/research': 8,
      'microsoft.com/research': 8,
      'nvidia.com/research': 8,
      'anthropic.com/research': 8,
      'ieee.org': 7,
      'acm.org': 7,
      'reuters.com': 6,
      'bloomberg.com': 6
    };

    return sourceScores[source.toLowerCase()] || 0;
  }

  private formatSource(sourceName: string): string {
    // Map common source names to more readable formats
    const sourceMap: { [key: string]: string } = {
      'Reuters': 'Reuters',
      'Bloomberg': 'Bloomberg',
      'TechCrunch': 'TechCrunch',
      'Wired': 'Wired',
      'The Verge': 'The Verge',
      'Ars Technica': 'Ars Technica',
      'VentureBeat': 'VentureBeat',
      'MIT Technology Review': 'MIT Tech Review',
      'Nature': 'Nature',
      'Science': 'Science',
      'Google AI Blog': 'Google AI',
      'OpenAI Blog': 'OpenAI',
      'DeepMind Blog': 'DeepMind',
      'Microsoft AI': 'Microsoft AI',
      'NVIDIA Blog': 'NVIDIA',
      'Anthropic Blog': 'Anthropic',
      'Cohere AI': 'Cohere',
      'Hugging Face': 'Hugging Face'
    };

    return sourceMap[sourceName] || sourceName;
  }
}

export const newsApiService = NewsApiService.getInstance(); 