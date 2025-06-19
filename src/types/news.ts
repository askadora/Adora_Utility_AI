export interface NewsItem {
  id: number;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  excerpt: string;
  image?: string;
  timestamp: string;
  url: string;
  author?: string;
  content?: string;
  relatedImages?: {
    url: string;
    caption: string;
  }[];
} 