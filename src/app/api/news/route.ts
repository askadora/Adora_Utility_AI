import { NextRequest, NextResponse } from 'next/server';

interface GNewsApiResponse {
  totalArticles: number;
  articles: Array<{
    title: string;
    description: string;
    content: string;
    url: string;
    image: string | null;
    publishedAt: string;
    source: {
      name: string;
      url: string;
    };
  }>;
}

class GNewsService {
  private static instance: GNewsService;
  private apiKey: string;
  private baseUrl: string;
  private cache: Map<string, { data: NewsItem[]; timestamp: number }>;
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly TRUSTED_SOURCES = [
    'reuters.com',
    'bloomberg.com',
    'techcrunch.com',
    'wired.com',
    'theverge.com'
  ];

  private constructor() {
    this.apiKey = process.env.GNEWS_API_KEY || '21581127eccd78175b4f0d54ed4573d1';
    this.baseUrl = 'https://gnews.io/api/v4';
    this.cache = new Map();
  }

  public static getInstance(): GNewsService {
    if (!GNewsService.instance) {
      GNewsService.instance = new GNewsService();
    }
    return GNewsService.instance;
  }

  private transformArticle(article: GNewsApiResponse['articles'][0]): NewsItem {
    return {
      id: this.generateId(article.url),
      title: this.formatTitle(article.title),
      source: this.formatSource(article.source.name),
      timeAgo: this.getTimeAgo(article.publishedAt),
      category: this.determineCategory(article.title, article.description),
      excerpt: this.formatExcerpt(article.description),
      image: article.image || undefined,
      timestamp: article.publishedAt,
      url: article.url,
      content: article.content || undefined
    };
  }

  private generateId(url: string): number {
    return parseInt(url.split('/').pop()?.replace(/[^0-9]/g, '') || '0', 10);
  }
  private formatTitle(title: string): string {
    let cleanTitle = title.replace(/^.*?[-|]/, '').trim();
    cleanTitle = cleanTitle.replace(/^(BREAKING|UPDATE|JUST IN|EXCLUSIVE):\s*/i, '');
    if (cleanTitle.length > 100) {
      cleanTitle = cleanTitle.substring(0, 97) + '...';
    }
    return cleanTitle;
  }
  private formatSource(sourceName: string): string {
    const sourceMap: { [key: string]: string } = {
      'Reuters': 'Reuters',
      'Bloomberg': 'Bloomberg',
      'TechCrunch': 'TechCrunch',
      'Wired': 'Wired',
      'The Verge': 'The Verge',
    };
    return sourceMap[sourceName] || sourceName;
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
  private formatExcerpt(text: string): string {
    let excerpt = (text || '').replace(/\s+/g, ' ').replace(/\[.*?\]/g, '').trim();
    const sentences = excerpt.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
      excerpt = sentences.slice(0, 2).join(' ').trim();
    }
    if (excerpt.length > 150) {
      excerpt = excerpt.substring(0, 147) + '...';
    }
    return excerpt;
  }

  public async fetchNews(category: string = 'general'): Promise<NewsItem[]> {
    const cacheKey = `news_${category}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < this.CACHE_DURATION)) {
      return cachedData.data;
    }
    try {
      const response = await fetch(
        `${this.baseUrl}/top-headlines?` +
        `category=${category}&` +
        `lang=en&` +
        `max=10&` +
        `token=${this.apiKey}`
      );
      if (!response.ok) {
        throw new Error(`GNews API error: ${response.statusText}`);
      }
      const data = await response.json() as GNewsApiResponse;
      const filteredArticles = data.articles
        // .filter(article => this.TRUSTED_SOURCES.some(source => article.url.includes(source)))
        .map(article => this.transformArticle(article));
      this.cache.set(cacheKey, {
        data: filteredArticles,
        timestamp: Date.now()
      });
      return filteredArticles;
    } catch (error) {
      console.error('Error fetching from GNews:', error);
      throw error;
    }
  }
}

const gnewsService = GNewsService.getInstance();

interface NewsItem {
  id: number;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  excerpt: string;
  image?: string;
  timestamp: string;
  url?: string;
  content?: string;
}

// AI and Technology keywords for filtering
const AI_TECH_KEYWORDS = [
  'artificial intelligence', 'AI', 'machine learning', 'ML', 'deep learning',
  'neural networks', 'chatgpt', 'gpt', 'openai', 'anthropic', 'claude',
  'google bard', 'gemini', 'microsoft copilot', 'meta', 'llama',
  'nvidia', 'gpu', 'semiconductor', 'chip', 'quantum computing',
  'robotics', 'automation', 'blockchain', 'cryptocurrency', 'bitcoin',
  'ethereum', 'web3', 'metaverse', 'virtual reality', 'VR', 'augmented reality', 'AR',
  'cybersecurity', 'data science', 'big data', 'cloud computing',
  'startup', 'tech', 'technology', 'software', 'programming', 'coding',
  'algorithm', 'algorithmic', 'autonomous', 'self-driving', 'tesla',
  'spacex', 'space', 'satellite', '5g', '6g', 'internet of things', 'iot',
  'smartphone', 'mobile', 'app', 'application', 'platform', 'api',
  'database', 'server', 'serverless', 'microservices', 'docker', 'kubernetes'
];

function isAITechRelated(title: string, description: string): boolean {
  const text = (title + ' ' + description).toLowerCase();
  return AI_TECH_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
}

export async function GET() {
  // Get the date 7 days ago in YYYY-MM-DD format
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const techUrl = `https://gnews.io/api/v4/search?q=technology&lang=en&from=${fromDate}&max=50&token=1a37eb5a7bc13b0cd1f0f10ea01c00bd`;

  try {
    const response = await fetch(techUrl);
    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch news: ${response.status} ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    let articles = data.articles || [];

    // Remove duplicates by URL and title
    const seenUrls = new Set();
    const seenTitles = new Set();
    articles = articles.filter((item: any) => {
      if (seenUrls.has(item.url) || seenTitles.has(item.title)) return false;
      seenUrls.add(item.url);
      seenTitles.add(item.title);
      return true;
    });

    const mapped = articles.map((item: any) => ({
      title: item.title,
      description: item.description,
      url: item.url,
      image: item.image,
      source: item.source?.name || '',
      published_at: item.publishedAt
    }));

    return NextResponse.json({ news: mapped, lastUpdate: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 