// src/components/chatbot/FinancialAdvisorChat.tsx
import React, { useState } from 'react';
import { FloatingChatButton } from './FloatingChatButton';
import { ChatWindow } from './ChatWindow';

export const FinancialAdvisorChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <>
      {!isOpen && <FloatingChatButton onClick={openChat} />}
      <ChatWindow isOpen={isOpen} onClose={closeChat} />
    </>
  );
};