// src/providers/connection.provider.tsx
import React, { useReducer, useCallback, useEffect, ReactNode } from 'react';
import { healthCheck } from '@/services/api.service';

interface ConnectionState {
    isConnected: boolean | null;
    isTesting: boolean;
}

interface ConnectionContextType {
    isConnected: boolean | null;
    isTesting: boolean;
    testConnection: () => Promise<boolean>;
}

const ConnectionContext = React.createContext<ConnectionContextType | undefined>(undefined);

// Exportar el contexto para que pueda ser usado por el hook personalizado
export { ConnectionContext };
export type { ConnectionContextType };

type ConnectionAction =
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'SET_TESTING'; payload: boolean };

const connectionReducer = (state: ConnectionState, action: ConnectionAction): ConnectionState => {
    switch (action.type) {
        case 'SET_CONNECTION_STATUS':
            return {
                ...state,
                isConnected: action.payload
            };

        case 'SET_TESTING':
            return {
                ...state,
                isTesting: action.payload
            };

        default:
            return state;
    }
};

const initialState: ConnectionState = {
    isConnected: null,
    isTesting: false
};

export const ConnectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(connectionReducer, initialState);

    const testConnection = useCallback(async (): Promise<boolean> => {
        dispatch({ type: 'SET_TESTING', payload: true });

        try {
            const result = await healthCheck();
            dispatch({ type: 'SET_CONNECTION_STATUS', payload: result.success });
            return result.success;
        } catch (error) {
            dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
            return false;
        } finally {
            dispatch({ type: 'SET_TESTING', payload: false });
        }
    }, []);

  // Test de conexión automático al montar
    useEffect(() => {
        testConnection();
    }, [testConnection]);

    const value: ConnectionContextType = {
        isConnected: state.isConnected,
        isTesting: state.isTesting,
        testConnection
    };

    return (
        <ConnectionContext.Provider value={value}>
            {children}
        </ConnectionContext.Provider>
    );
};