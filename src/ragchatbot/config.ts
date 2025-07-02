export const RAG_CHATBOT_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_RAG_CHATBOT_BASE_URL || 
             (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000').replace(':3000', ':8000'),
    apiVersion: 'v1',
  } as const;
  
  export const RAG_CHATBOT_ENDPOINTS = {
    CHAT: 'api/v1/chat',
  } as const; 