export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  question: string;
  history: Message[];
}

export interface ChatResponse {
  answer: string;
  sources?: string[];
  error?: string;
}

export interface DocsBotConfig {
  teamId: string;
  botId: string;
  apiKey: string;
} 