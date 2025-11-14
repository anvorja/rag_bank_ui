// src/providers/ChatProvider.jsx
import React, { useReducer, useCallback } from 'react';
import ChatContext from '../contexts/ChatContext';
import { sendMessage as apiSendMessage } from '../utils/api';

// Función para generar IDs únicos
const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substring(2, 9);
};

const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Reducer para manejar el estado del chat
const chatReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_MESSAGE': {
            const newMessage = {
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

const initialState = {
    messages: [],
    loading: false,
    sessionId: generateSessionId(),
    messageCount: 0
};

const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    const getErrorMessage = useCallback((error) => {
        if (error.code === 'ECONNREFUSED') {
            return '🔌 No se puede conectar al servidor. Verifica que el backend esté ejecutándose.';
        } else if (error.response) {
            return `⚠️ Error ${error.response.status}: ${error.response.data?.detail || 'Error del servidor'}`;
        } else if (error.request) {
            return '📡 No se recibió respuesta del servidor.';
        }
        return `❌ Error: ${error.message}`;
    }, []);

    const prepareConversationHistory = useCallback((messages, limit = 5) => {
        // Tomar solo los últimos N mensajes
        const recentMessages = messages.slice(-limit);

        // Formatear al formato esperado por el backend
        return recentMessages.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
        }));
    }, []);

    const sendMessage = useCallback(async (text) => {
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

    const value = {
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

export default ChatProvider;