// src/services/api.service.ts
import axios from 'axios';
import { API_CONFIG } from '@/config/app.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUTS.DEFAULT,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const healthCheck = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.HEALTH);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

export const sendMessage = async (
  question: string,
  sessionId: string,
  isFirstMessage: boolean = true,
  conversationHistory: Array<{role: string, content: string}> = []
) => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.CHAT, {
      question,
      session_id: sessionId,
      is_first_message: isFirstMessage,
      conversation_history: conversationHistory
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

export default api;