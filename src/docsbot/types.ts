export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  question: string;
  history: [string, string][]; // Array of [role, content] pairs
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