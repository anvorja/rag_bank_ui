// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import ChatProvider from './providers/ChatProvider';
import ConnectionProvider from './providers/ConnectionProvider';
import { useChat } from './hooks/useChat';
import { useConnection } from './hooks/useConnection';
import ChatContainer from './components/Chat/ChatContainer';
import Header from './components/Layout/Header';
import Input from './components/UI/Input';
import Button from './components/UI/Button';
import GlassCard from './components/UI/GlassCard';
import './App.css';

// Componente principal que consume los contextos
const ChatApp = () => {
  const { messages, loading, sendMessage, clearMessages, messageCount } = useChat();
  const { isConnected, isTesting, testConnection } = useConnection();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const currentInput = inputValue;
    setInputValue('');
    await sendMessage(currentInput);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl overflow-hidden">
        <Header
          isConnected={isConnected}
          isTesting={isTesting}
          onTestConnection={testConnection}
          onClearChat={clearMessages}
          messageCount={messageCount}
        />

        <ChatContainer
          messages={messages}
          loading={loading}
          className="flex-1"
        />

        <div ref={messagesEndRef} />

        <div className="glass-input p-4 sm:p-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              disabled={loading}
              clearable={true}
              onClear={handleClearInput}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              loading={loading}
              disabled={loading || !inputValue.trim()}
              size="lg"
              className="min-w-[100px] sm:min-w-[120px]"
            >
              Enviar
            </Button>
          </div>

          <div className="text-xs text-white/50 mt-3 text-center">
            Presiona Enter para enviar • Backend: http://127.0.0.1:8000
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// App principal que provee los contextos
function App() {
  return (
    <ConnectionProvider>
      <ChatProvider>
        <ChatApp />
      </ChatProvider>
    </ConnectionProvider>
  );
}

export default App;