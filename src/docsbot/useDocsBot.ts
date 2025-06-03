import { useState } from 'react';
import { Message } from './types';
import { DocsBotService } from './docsbotService';

export const useDocsBot = (botId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const docsBotService = new DocsBotService(botId);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    console.log('💬 Sending message:', { content, botId });
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Format history as array of arrays [role, content]
      const formattedHistory = messages.map(msg => [msg.role, msg.content] as [string, string]);
      
      const response = await docsBotService.chat({
        question: content,
        history: formattedHistory,
      });

      if (response.error) {
        console.error('❌ Error in response:', response.error);
        setError(response.error);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
      };
      console.log('🤖 Assistant response:', { 
        answer: response.answer,
        sources: response.sources,
      });
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('❌ Error sending message:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    console.log('🧹 Clearing messages');
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}; 