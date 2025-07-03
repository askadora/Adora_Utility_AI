import { ChatRequest, ChatResponse } from './types';
import { RAG_CHATBOT_CONFIG, RAG_CHATBOT_ENDPOINTS } from './config';

export class RagChatbotService {
  private readonly documentType: string;

  constructor(documentType: string = 'general') {
    this.documentType = documentType;
    console.log('🤖 RagChatbotService initialized with documentType:', documentType);
  }

  private getHeaders(): HeadersInit {
    const headers = {
      'Content-Type': 'application/json',
    };
    console.log('📋 Request headers prepared:', headers);
    return headers;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    console.log('🚀 Starting RAG chat request...');
    console.log('📥 Input request:', request);
    
    const url = `${RAG_CHATBOT_CONFIG.baseUrl}${RAG_CHATBOT_ENDPOINTS.CHAT}`;
    console.log('🌐 Request URL:', url);
    console.log('⚙️ RAG_CHATBOT_CONFIG:', RAG_CHATBOT_CONFIG);
    
    // Prepare the request body according to Chatbot API format
    const requestBody = {
      message: request.message,
      session_id: request.session_id || undefined,
      document_type: request.document_type || this.documentType,
      recent_messages: request.recent_messages || undefined,
    };

    console.log('📦 Prepared request body:', requestBody);
    console.log('📊 Request details:', {
      url,
      method: 'POST',
      headers: this.getHeaders(),
      bodySize: JSON.stringify(requestBody).length + ' bytes',
      request: {
        message: request.message,
        document_type: requestBody.document_type,
        session_id: requestBody.session_id,
        recentMessagesLength: request.recent_messages?.length || 0,
      }
    });

    try {
      console.log('🔄 Making fetch request...');
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Fetch response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        console.error('❌ Response not OK, handling error...');
        // Try to get the error message from the response
        let errorDetails = '';
        try {
          console.log('🔍 Attempting to parse error as JSON...');
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
          console.log('📄 Error data (JSON):', errorData);
        } catch (e) {
          console.log('🔍 JSON parsing failed, attempting text...');
          errorDetails = await response.text();
          console.log('📄 Error data (text):', errorDetails);
        }

        console.error('🚨 RAG Chatbot API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorDetails,
          requestUrl: url,
          requestBody,
        });

        throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
      }

      console.log('✅ Response OK, parsing JSON...');
      const data = await response.json();
      console.log('📥 RAG Chatbot API Response (raw):', data);
      console.log('📥 RAG Chatbot API Response (formatted):', {
        response: data.response,
        session_id: data.session_id,
        sourcesCount: data.sources?.length || 0,
        sources: data.sources,
      });
      
      // Parse response according to Chatbot API format
      const parsedResponse = {
        response: data.response || 'No response received',
        session_id: data.session_id || '',
        sources: data.sources || [],
        error: data.error,
      };

      console.log('🎯 Final parsed response:', parsedResponse);
      return parsedResponse;
    } catch (error) {
      console.error('💥 RAG Chatbot API Error (caught):', error);
      console.error('🔍 Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      const errorResponse = {
        response: 'Sorry, I encountered an error. Please try again.',
        session_id: '',
        sources: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };

      console.log('🚨 Returning error response:', errorResponse);
      return errorResponse;
    }
  }
} 