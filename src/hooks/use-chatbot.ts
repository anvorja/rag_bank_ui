// src/hooks/use-chatbot.ts
import { useContext } from 'react';
import {ChatbotContext, ChatbotContextType} from "@/contexts/chatbot.context.ts";

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);

  if (context === undefined) {
    throw new Error('useChatbot must be used within a CchatbotProvider');
  }

  return context;
};