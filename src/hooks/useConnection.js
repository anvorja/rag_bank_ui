// hooks/useConnection.js
import { useContext } from 'react';
import ConnectionContext from '../contexts/ConnectionContext';

export const useConnection = () => {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error('useConnection debe ser usado dentro de un ConnectionProvider');
  }

  return context;
};

export default useConnection;