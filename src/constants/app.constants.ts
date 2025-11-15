// src/constants/app.constants.ts
// Constantes del chatbot
export const CHATBOT_CONSTANTS = {
  MAX_MESSAGES: 100,
  MAX_MESSAGE_LENGTH: 4000,
  TYPING_DELAY: 500,
  RECONNECT_ATTEMPTS: 3,
  RECONNECT_DELAY: 2000,
  CONNECTION_CHECK_INTERVAL: 30000,
  STREAM_TIMEOUT: 60000,
} as const;

// Mensajes del sistema
export const SYSTEM_MESSAGES = {
  WELCOME: "¡Hola! Soy tu asesor Borgian Bank. ¿En qué puedo ayudarte hoy?",
  ERROR_NETWORK: "Error de conexión. Verifica tu internet e intenta de nuevo.",
  ERROR_TIMEOUT: "La solicitud tardó demasiado. Intenta de nuevo.",
  ERROR_RATE_LIMIT: "Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.",
  ERROR_SERVICE: "El servicio no está disponible temporalmente.",
  ERROR_GENERIC: "Ocurrió un error inesperado. Intenta de nuevo.",
  CONNECTION_RESTORED: "Conexión restaurada. Ya puedes chatear normalmente.",
  CONNECTION_LOST: "Conexión perdida. Reintentando...",
} as const;

// Configuración de la UI
export const UI_CONSTANTS = {
  CHAT_WINDOW: {
    WIDTH: 384, // w-96
    HEIGHT: 600,
    BORDER_RADIUS: 24, // rounded-3xl
    Z_INDEX: 50,
  },
  FLOATING_BUTTON: {
    SIZE: 64, // w-16 h-16
    BOTTOM: 32, // bottom-8
    RIGHT: 32, // right-8
    Z_INDEX: 50,
  },
  ANIMATIONS: {
    DURATION: 300,
    SCALE_IN: 'animate-scale-in',
    PULSE_GLOW: 'pulse-glow',
    HOVER_GLOW: 'hover-glow',
    BREATHE: 'breathe',
  },
} as const;

// Códigos de error HTTP
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Breakpoints de Tailwind
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Temas de color
export const THEME_COLORS = {
  PRIMARY: 'hsl(190, 95%, 55%)',
  ACCENT: 'hsl(280, 85%, 60%)',
  BACKGROUND: 'hsl(220, 40%, 5%)',
  FOREGROUND: 'hsl(210, 100%, 98%)',
  MUTED: 'hsl(220, 30%, 12%)',
  BORDER: 'hsl(220, 30%, 20%)',
} as const;

// Configuración de las partículas
export const PARTICLES_CONFIG = {
  COUNT: 50,
  SPEED: 0.5,
  SIZE_RANGE: [1, 4],
  OPACITY_RANGE: [0.2, 0.7],
  CONNECTION_DISTANCE: 150,
} as const;

// Configuración de localStorage
export const STORAGE_KEYS = {
  CHAT_HISTORY: 'borgianbank_chat_history',
  USER_PREFERENCES: 'borgianbank_user_preferences',
  LAST_VISIT: 'borgianbank_last_visit',
} as const;

// Configuración de accesibilidad
export const A11Y_CONFIG = {
  FOCUS_RING: 'focus:ring-2 focus:ring-primary/50',
  SR_ONLY: 'sr-only',
  ARIA_LABELS: {
    OPEN_CHAT: 'Abrir chat con asesor financiero',
    CLOSE_CHAT: 'Cerrar chat',
    SEND_MESSAGE: 'Enviar mensaje',
    MESSAGE_INPUT: 'Escribe tu pregunta',
  },
} as const;