// src/hooks/use-connection.ts
import { useContext } from 'react';
import { ConnectionContext, ConnectionContextType } from '@/providers/connection.provider';

export const useConnection = (): ConnectionContextType => {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error('useConnection must be used within ConnectionProvider');
    }
    return context;
};