// src/services/chatbot.service.ts
import { API_CONFIG } from '@/config/app.config';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface MessageHistory {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface SourceInfo {
  id: number;
  source: string;
  section: string;
  subsection: string;
  content: string;
  chunk_id: string;
  relevance_score?: number;
}

export interface ChatResponse {
  answer: string;
  sources: SourceInfo[];
  confidence: number;
  metadata: {
    timestamp: string;
    session_id?: string;
    processing_time_ms?: number;
    model_info: {
      llm_model: string;
      embedding_model: string;
      embedding_dimension: number;
      mode: string;
    };
    retrieval_stats?: any;
  };
}

export interface ChatRequest {
  question: string;
  session_id?: string;
  is_first_message?: boolean;
  conversation_history?: MessageHistory[];
}

class ChatbotService {
  private readonly baseUrl = API_CONFIG.BASE_URL;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  async sendMessage(messages: Message[]): Promise<ChatResponse> {
    try {
      // Convertir el último mensaje a la pregunta
      const userMessages = messages.filter(m => m.role === 'user');
      if (userMessages.length === 0) {
        throw new Error('No user message found');
      }

      const question = userMessages[userMessages.length - 1].content;

      // Preparar historial de conversación (excluyendo el último mensaje)
      const conversationHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));

      const isFirstMessage = messages.length <= 1;

      const requestBody: ChatRequest = {
        question,
        session_id: this.sessionId,
        is_first_message: isFirstMessage,
        conversation_history: conversationHistory
      };

      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.CHAT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorMessage = await this.handleHttpError(response);
        throw new Error(errorMessage);
      }

      const data: ChatResponse = await response.json();
      return data;

    } catch (error) {
      console.error('ChatbotService - Error sending message:', error);
      throw this.enhanceError(error);
    }
  }

async testConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.HEALTH}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('ChatbotService - Connection test failed:', error);
    return false;
  }
}
  // Método para obtener estadísticas del backend
  async getStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.STATS}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('ChatbotService - Error getting stats:', error);
      throw error;
    }
  }

  // Reset session ID
  resetSession(): void {
    this.sessionId = this.generateSessionId();
  }

  getSessionId(): string {
    return this.sessionId;
  }

  private async handleHttpError(response: Response): Promise<string> {
    try {
      const errorData = await response.json();
      return `HTTP ${response.status}: ${errorData.detail || response.statusText}`;
    } catch {
      try {
        const errorText = await response.text();
        return `HTTP ${response.status}: ${errorText || response.statusText}`;
      } catch {
        return `HTTP ${response.status}: ${response.statusText}`;
      }
    }
  }

  private enhanceError(error: unknown): Error {
    if (error instanceof Error) {
      // Mejorar mensaje para errores comunes
      if (error.name === 'AbortError') {
        return new Error('Request timeout - Please try again');
      }
      if (error.message.includes('Failed to fetch')) {
        return new Error('Unable to connect to server - Please check if the backend is running');
      }
      return error;
    }
    return new Error('An unexpected error occurred');
  }

  // Método para limpiar recursos si es necesario
  cleanup(): void {
    // Implementar limpieza de recursos si es necesario
    console.log('ChatbotService cleanup completed');
  }
}

export const chatbotService = new ChatbotService();