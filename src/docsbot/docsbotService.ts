import { ChatRequest, ChatResponse } from './types';
import { DOCSBOT_CONFIG } from './config';

export class DocsBotService {
  private readonly botId: string;

  constructor(botId: string) {
    this.botId = botId;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DOCSBOT_CONFIG.apiKey}`,
    };
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    console.log('DocsBot API Request:', {
      url: `${DOCSBOT_CONFIG.baseUrl}/teams/${DOCSBOT_CONFIG.teamId}/bots/${this.botId}/chat`,
      request: {
        question: request.question,
        historyLength: request.history.length,
      },
      headers: {
        ...this.getHeaders(),
        'Authorization': 'Bearer [REDACTED]' // Don't log the actual API key
      }
    });

    try {
      const response = await fetch(
        `${DOCSBOT_CONFIG.baseUrl}/teams/${DOCSBOT_CONFIG.teamId}/bots/${this.botId}/chat`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        // Try to get the error message from the response
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (e) {
          errorDetails = await response.text();
        }

        console.error('DocsBot API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorDetails,
          requestUrl: `${DOCSBOT_CONFIG.baseUrl}/teams/${DOCSBOT_CONFIG.teamId}/bots/${this.botId}/chat`,
          requestBody: {
            question: request.question,
            historyLength: request.history.length,
          }
        });

        if (response.status === 409) {
          console.error('🔍 409 Conflict Details:', {
            teamId: DOCSBOT_CONFIG.teamId,
            botId: this.botId,
            apiKeyLength: DOCSBOT_CONFIG.apiKey?.length,
            baseUrl: DOCSBOT_CONFIG.baseUrl
          });
        }

        throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
      }

      const data = await response.json();
      console.log('📥 DocsBot API Response:', {
        answer: data.answer,
        sources: data.sources,
        error: data.error,
      });
      return data;
    } catch (error) {
      console.error('DocsBot API Error:', error);
      return {
        answer: 'Sorry, I encountered an error. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
} 