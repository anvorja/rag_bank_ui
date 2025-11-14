// contexts/ConnectionContext.js
import { createContext } from 'react';

export const ConnectionContext = createContext({
  isConnected: null,
  isTesting: false,
  testConnection: async () => {}
});

export default ConnectionContext;