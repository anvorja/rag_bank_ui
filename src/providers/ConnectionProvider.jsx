// providers/ConnectionProvider.jsx
import React, { useReducer, useCallback, useEffect } from 'react';
import ConnectionContext from '../contexts/ConnectionContext';
import { healthCheck } from '../utils/api';

const connectionReducer = (state, action) => {
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

const initialState = {
  isConnected: null,
  isTesting: false
};

const ConnectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(connectionReducer, initialState);

  const testConnection = useCallback(async () => {
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

  const value = {
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

export default ConnectionProvider;