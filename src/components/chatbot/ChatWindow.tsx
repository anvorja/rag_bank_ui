// src/components/chatbot/ChatWindow.tsx
import React, { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, Minimize2, Maximize2, Expand, Shrink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from '@/providers/chat.provider';
import { useConnection } from '@/providers/connection.provider';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const { messages, loading, sendMessage } = useChat();
  const { isConnected, isTesting } = useConnection();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simular typing indicator
  useEffect(() => {
    if (loading) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const messageText = input;
    setInput("");
    await sendMessage(messageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) return null;

  // Determinar el ancho basado en estados
  const getWidth = () => {
    if (isMinimized) return "w-80";
    if (isExpanded) return "w-[32rem]";
    return "w-96";
  };

  return (
    <div className={cn(
      "fixed bottom-8 right-8 glass rounded-3xl flex flex-col overflow-hidden z-50 animate-scale-in transition-all duration-300",
      getWidth(),
      isMinimized ? "h-16" : "h-[600px]"
    )}>
      {/* Header */}
      <div className="glass-border p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Sparkles className="w-4 h-4 text-background" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Asesor Financiero</h3>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Borgian Bank</p>
              <div className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs',
                isConnected === true ? 'bg-green-500/20 text-green-400' :
                isConnected === false ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              )}>
                <div className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  isConnected === true ? 'bg-green-400' :
                  isConnected === false ? 'bg-red-400' :
                  'bg-yellow-400'
                )} />
                <span className="text-xs">
                  {isTesting ? 'Verificando' :
                   isConnected === true ? 'Conectado' :
                   'Desconectado'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Botón expandir ancho */}
          {!isMinimized && (
            <button
              onClick={toggleExpand}
              className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={isExpanded ? "Contraer ancho" : "Expandir ancho"}
            >
              {isExpanded ?
                <Shrink className="w-4 h-4" /> :
                <Expand className="w-4 h-4" />
              }
            </button>
          )}

          {/* Botón minimizar altura */}
          <button
            onClick={toggleMinimize}
            className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
          >
            {isMinimized ?
              <Maximize2 className="w-4 h-4" /> :
              <Minimize2 className="w-4 h-4" />
            }
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Cerrar chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      {!isMinimized && (
        <>
          {/* Messages con scroll suave y fade */}
          <div className="flex-1 relative overflow-hidden">
            {/* Fade gradient en top */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background/20 to-transparent z-10 pointer-events-none" />

            {/* Messages */}
            <div className="h-full overflow-y-auto px-3 py-2 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-md border border-white/20">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm mb-1">¡Hola! Soy tu asesor financiero</p>
                  <p className="text-xs text-muted-foreground/70">Escribe un mensaje para comenzar</p>
                </div>
              )}

              {/* Renderizar mensajes con MessageBubble */}
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isExpanded={isExpanded}
                />
              ))}

              {/* Typing indicator - solo puntos animados */}
              {(loading || isTyping) && (
                <div className="flex gap-2.5 items-start justify-start">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div className="glass px-3 py-2.5 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Fade gradient en bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background/20 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Input */}
          <div className="glass-border p-3 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                disabled={loading}
                className="flex-1 bg-muted/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 glow-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4 text-background" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

