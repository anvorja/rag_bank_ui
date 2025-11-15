// src/config/app.config.ts

export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api/v1',
  ENDPOINTS: {
    CHAT: '/chat/ask',
    HEALTH: '/health',
    STATS: '/stats',
  },
  TIMEOUTS: {
    DEFAULT: 30000, // 30 segundos
    STREAMING: 0,   // Sin timeout para streaming
  },
} as const;

// Configuración del entorno
export const APP_CONFIG = {
  NAME: 'Borgian Bank',
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// Configuración de la UI
export const UI_CONFIG = {
  CHAT: {
    MAX_MESSAGES: 100,
    TYPING_DELAY: 500,
    ANIMATION_DURATION: 300,
  },
  PARTICLES: {
    COUNT: 50,
    SPEED: 0.5,
  },
} as const;

export default {
  API_CONFIG,
  APP_CONFIG,
  UI_CONFIG,
};