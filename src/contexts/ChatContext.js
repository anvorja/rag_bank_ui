// src/contexts/ChatContext.js
import { createContext } from 'react';

export const ChatContext = createContext({
  messages: [],
  loading: false,
  sendMessage: async () => {},
  clearMessages: () => {},
  messageCount: 0
});

export default ChatContext;