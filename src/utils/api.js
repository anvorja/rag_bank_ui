// utils/api.js
import axios from 'axios'
import { API_CONFIG } from './constants'

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const healthCheck = async () => {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.HEALTH)
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Envía un mensaje al chatbot con contexto conversacional
 * @param {string} question - La pregunta del usuario
 * @param {string} sessionId - ID único de la sesión
 * @param {boolean} isFirstMessage - Si es el primer mensaje de la sesión
 * @param {Array<{role: string, content: string}>} conversationHistory - Historial de la conversación
 * @returns {Promise<{success: boolean, data?: any, error?: any}>}
 */
export const sendMessage = async (
  question,
  sessionId,
  isFirstMessage = true,
  conversationHistory = []
) => {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.ASK, {
      question,
      session_id: sessionId,
      is_first_message: isFirstMessage,
      conversation_history: conversationHistory
    })
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error }
  }
}

export default api