// src/contexts/chatbot.context.ts
import { createContext } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatbotContextType {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => Promise<void>;
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
  isConnected: boolean | null;
  isTesting: boolean;
  testConnection: () => Promise<boolean>;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);