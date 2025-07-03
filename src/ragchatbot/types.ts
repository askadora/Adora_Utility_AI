export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
  document_type?: string; // For namespace filtering (e.g., 'investors', 'general', 'knowledgebase')
  recent_messages?: Message[]; // Recent message history for context
}

export interface ChatSource {
  document_id: number;
  chunk_index: number;
  relevance_score: number;
  preview: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  sources: ChatSource[];
  error?: string;
}

export interface RagChatbotConfig {
  baseUrl: string;
  apiVersion: string;
} 