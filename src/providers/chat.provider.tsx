// src/providers/chat.provider.tsx
import React, { useReducer, useCallback, ReactNode } from 'react';
import { sendMessage as apiSendMessage } from '@/services/api.service';

interface SourceInfo {
    id: number;
    source: string;
    section: string;
    subsection: string;
    content: string;
    chunk_id: string;
    relevance_score?: number;
}

interface MessageMetadata {
    timestamp: string;
    session_id?: string;
    processing_time_ms?: number;
    model_info: {
        llm_model: string;
        embedding_model: string;
        embedding_dimension: number;
        mode: string;
    };
    retrieval_stats?: Record<string, unknown>;
}

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    isError?: boolean;
    sources?: SourceInfo[];
    metadata?: MessageMetadata;
}

interface ChatState {
    messages: Message[];
    loading: boolean;
    sessionId: string;
    messageCount: number;
}

interface ChatContextType {
    messages: Message[];
    loading: boolean;
    sendMessage: (text: string) => Promise<boolean>;
    clearMessages: () => void;
    messageCount: number;
    sessionId: string;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

// Exportar el contexto para que pueda ser usado por el hook personalizado
export { ChatContext };
export type { ChatContextType, Message, SourceInfo, MessageMetadata };

// Función para generar IDs únicos
const generateUniqueId = (): string => {
    return Date.now() + Math.random().toString(36).substring(2, 9);
};

const generateSessionId = (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

type ChatAction =
    | { type: 'ADD_MESSAGE'; payload: Omit<Message, 'id' | 'timestamp'> }
    | { type: 'CLEAR_MESSAGES' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'INITIALIZE_SESSION'; payload: string }
    | { type: 'INCREMENT_MESSAGE_COUNT' };

// Reducer para manejar el estado del chat
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            const newMessage: Message = {
                ...action.payload,
                id: generateUniqueId(),
                timestamp: new Date()
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: []
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'INITIALIZE_SESSION':
            return {
                ...state,
                sessionId: action.payload
            };
        case 'INCREMENT_MESSAGE_COUNT':
            return {
                ...state,
                messageCount: state.messageCount + 1
            };
        default:
            return state;
    }
};

const initialState: ChatState = {
    messages: [],
    loading: false,
    sessionId: generateSessionId(),
    messageCount: 0
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    const getErrorMessage = useCallback((error: unknown): string => {
        // Type guard para verificar si es un error de Axios
        interface AxiosError {
            code?: string;
            response?: {
                status: number;
                data?: {
                    detail?: string;
                };
            };
            request?: unknown;
            message?: string;
        }

        const isAxiosError = (err: unknown): err is AxiosError => {
            return typeof err === 'object' && err !== null;
        };

        if (!isAxiosError(error)) {
            return 'Error desconocido';
        }

        if (error.code === 'ECONNREFUSED') {
            return 'No se puede conectar al servidor. Verifica que el backend este ejecutandose.';
        } else if (error.response) {
            return `Error ${error.response.status}: ${error.response.data?.detail || 'Error del servidor'}`;
        } else if (error.request) {
            return 'No se recibio respuesta del servidor.';
        } else if (error.message) {
            return `Error: ${error.message}`;
        }
        return 'Error desconocido';
    }, []);

    const prepareConversationHistory = useCallback((messages: Message[], limit: number = 5) => {
        // Tomar solo los últimos N mensajes
        const recentMessages = messages.slice(-limit);

        // Formatear al formato esperado por el backend
        return recentMessages.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
        }));
    }, []);

    const sendMessage = useCallback(async (text: string): Promise<boolean> => {
        if (!text.trim() || state.loading) return false;

        dispatch({ type: 'ADD_MESSAGE', payload: { text, isUser: true } });
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            // Preparar historial (últimos 5 mensajes)
            const conversationHistory = prepareConversationHistory(state.messages, 5);

            const isFirstMessage = state.messageCount === 0;

            const result = await apiSendMessage(
                text,
                state.sessionId,
                isFirstMessage,
                conversationHistory
            );

            if (result.success) {
                dispatch({
                    type: 'ADD_MESSAGE',
                    payload: {
                        text: result.data.answer,
                        isUser: false,
                        sources: result.data.sources,
                        metadata: result.data.metadata
                    }
                });
                dispatch({ type: 'INCREMENT_MESSAGE_COUNT' });
            } else {
                const errorMessage = getErrorMessage(result.error);

                dispatch({
                    type: 'ADD_MESSAGE',
                    payload: {
                        text: errorMessage,
                        isUser: false,
                        isError: true
                    }
                });
            }

            return result.success;
        } catch (error) {
            const errorMessage = getErrorMessage(error);

            dispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    text: errorMessage,
                    isUser: false,
                    isError: true
                }
            });
            return false;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [state.loading, state.messages, state.sessionId, state.messageCount, getErrorMessage, prepareConversationHistory]);

    const clearMessages = useCallback(() => {
        // Limpiar mensajes
        dispatch({ type: 'CLEAR_MESSAGES' });

        // Generar nuevo session_id
        const newSessionId = generateSessionId();
        dispatch({ type: 'INITIALIZE_SESSION', payload: newSessionId });
    }, []);

    const value: ChatContextType = {
        messages: state.messages,
        loading: state.loading,
        sendMessage,
        clearMessages,
        messageCount: state.messages.length,
        sessionId: state.sessionId
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};