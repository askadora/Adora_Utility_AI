import { useState, useEffect } from 'react';
import { Message } from './types';
import { RagChatbotService } from './ragChatbotService';

export const useRagChatbot = (documentType: 'investors' | 'general' | 'knowledgebase' = 'general') => {
  console.log('🎣 useRagChatbot hook initialized with documentType:', documentType);
  
  // Session storage keys
  const STORAGE_KEYS = {
    MESSAGES: `ragchatbot_messages_${documentType}`,
    SESSION_ID: `ragchatbot_session_${documentType}`,
  };

  // Helper function for session storage
  const saveToStorage = (messages: Message[], sessionId: string | null) => {
    try {
      console.log('💾 Saving to session storage:', {
        messagesCount: messages.length,
        sessionId,
        keys: STORAGE_KEYS,
      });
      
      sessionStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
      if (sessionId) {
        sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
      }
    } catch (error) {
      console.error('❌ Error saving to session storage:', error);
    }
  };

  // Clear session storage on component mount (page refresh/reload)
  const clearSessionStorage = () => {
    try {
      console.log('🗑️ Clearing session storage on mount/refresh...');
      sessionStorage.removeItem(STORAGE_KEYS.MESSAGES);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
      console.log('✅ Session storage cleared on mount');
    } catch (error) {
      console.error('❌ Error clearing session storage on mount:', error);
    }
  };

  // Initialize state - always start fresh (clear storage first)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  console.log('📊 Current hook state (fresh start):', {
    messagesCount: messages.length,
    isLoading,
    error,
    sessionId,
  });

  // Clear storage on mount and save to session storage whenever messages or sessionId change
  useEffect(() => {
    console.log('🔄 useEffect triggered');
    // Clear storage on first mount (page refresh/reload)
    if (messages.length === 0 && !sessionId) {
      clearSessionStorage();
    } else {
      // Save current state to storage
      console.log('💾 Saving current state to storage');
      saveToStorage(messages, sessionId);
    }
  }, [messages, sessionId]);

  const ragChatbotService = new RagChatbotService(documentType);

  const sendMessage = async (content: string) => {
    console.log('📝 sendMessage called with content:', content);
    
    if (!content.trim()) {
      console.log('⚠️ Message content is empty, returning early');
      return;
    }

    console.log('💬 Processing message:', { 
      content, 
      documentType,
      currentMessagesCount: messages.length,
      currentSessionId: sessionId,
    });

    const userMessage: Message = { role: 'user', content };
    console.log('👤 Created user message:', userMessage);
    
    console.log('📝 Adding user message to state...');
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      console.log('📝 Messages updated:', {
        previousCount: prev.length,
        newCount: newMessages.length,
        lastMessage: newMessages[newMessages.length - 1],
      });
      return newMessages;
    });
    
    console.log('⏳ Setting loading state to true...');
    setIsLoading(true);
    
    console.log('🧹 Clearing error state...');
    setError(null);

    try {
      console.log('🚀 Preparing to call ragChatbotService.chat...');
      
      // Get recent messages for context (include the new user message)
      const currentMessages = [...messages, userMessage];
      const recentMessages = currentMessages.slice(-6); // Last 6 messages for context
      
      const requestPayload = {
        message: content,
        document_type: documentType,
        session_id: sessionId || undefined,
        recent_messages: recentMessages,
      };
      
      console.log('📦 Chat request payload:', requestPayload);
      console.log('📚 Recent messages for context:', {
        totalMessages: currentMessages.length,
        contextMessages: recentMessages,
        contextCount: recentMessages.length,
      });

      const response = await ragChatbotService.chat(requestPayload);
      console.log('✅ Received response from ragChatbotService:', response);

      // Update session ID from response
      if (response.session_id && !sessionId) {
        console.log('🆔 Updating session ID:', {
          previous: sessionId,
          new: response.session_id,
        });
        setSessionId(response.session_id);
      } else {
        console.log('🆔 Session ID status:', {
          responseHasSessionId: !!response.session_id,
          currentSessionId: sessionId,
          willUpdate: response.session_id && !sessionId,
        });
      }

      if (response.error) {
        console.error('❌ Error in response:', response.error);
        console.log('📝 Setting error state...');
        setError(response.error);
      } else {
        console.log('✅ No error in response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
      };
      
      console.log('🤖 Created assistant message:', assistantMessage);
      console.log('📊 Full response details:', { 
        response: response.response,
        sources: response.sources,
        sourcesCount: response.sources?.length || 0,
        session_id: response.session_id,
        error: response.error,
      });
      
      console.log('📝 Adding assistant message to state...');
      setMessages(prev => {
        const newMessages = [...prev, assistantMessage];
        console.log('📝 Messages updated with assistant response:', {
          previousCount: prev.length,
          newCount: newMessages.length,
          lastMessage: newMessages[newMessages.length - 1],
        });
        return newMessages;
      });
      
    } catch (err) {
      console.error('💥 Error caught in sendMessage:', err);
      console.error('🔍 Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
      });
      
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.log('📝 Setting error state with message:', errorMessage);
      setError(errorMessage);
      
      const errorResponseMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      
      console.log('🤖 Created error response message:', errorResponseMessage);
      console.log('📝 Adding error message to state...');
      setMessages(prev => {
        const newMessages = [...prev, errorResponseMessage];
        console.log('📝 Messages updated with error response:', {
          previousCount: prev.length,
          newCount: newMessages.length,
          lastMessage: newMessages[newMessages.length - 1],
        });
        return newMessages;
      });
    } finally {
      console.log('⏳ Setting loading state to false...');
      setIsLoading(false);
      console.log('✅ sendMessage completed');
    }
  };

  const clearMessages = () => {
    console.log('🧹 clearMessages called');
    console.log('📊 State before clearing:', {
      messagesCount: messages.length,
      error,
      sessionId,
    });
    
    console.log('📝 Clearing messages...');
    setMessages([]);
    
    console.log('🧹 Clearing error...');
    setError(null);
    
    console.log('🆔 Clearing session ID...');
    setSessionId(null);
    
    console.log('🗑️ Clearing session storage...');
    try {
      sessionStorage.removeItem(STORAGE_KEYS.MESSAGES);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
      console.log('✅ Session storage cleared');
    } catch (error) {
      console.error('❌ Error clearing session storage:', error);
    }
    
    console.log('✅ All state cleared');
  };

  console.log('🎯 useRagChatbot hook returning:', {
    messagesCount: messages.length,
    isLoading,
    error,
    sessionId,
    functions: ['sendMessage', 'clearMessages'],
    storageKeys: STORAGE_KEYS,
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    sessionId,
  };
}; 