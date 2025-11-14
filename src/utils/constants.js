// utils/constants.js

export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api/v1',
  TIMEOUT: 30000, // 30 segundos

  ENDPOINTS: {
    HEALTH: '/health',
    ASK: 'chat/ask',
    STATS: '/stats'
  }
}

export const CHAT_CONFIG = {
  // Número máximo de mensajes a enviar como historial
  MAX_HISTORY_MESSAGES: 5,

  // Tiempo máximo de espera para respuesta (ms)
  RESPONSE_TIMEOUT: 30000,

  // Mensajes de sugerencia iniciales
  SUGGESTIONS: [
    "¿Cómo abrir una cuenta de ahorros?",
    "¿Cuáles son los requisitos para un crédito?",
    "¿Qué es un CDT?",
    "¿Cómo bloquear mi tarjeta?"
  ]
}

export default { API_CONFIG, CHAT_CONFIG }