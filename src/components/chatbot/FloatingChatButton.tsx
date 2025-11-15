// src/components/chatbot/FloatingChatButton.tsx
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface FloatingChatButtonProps {
  onClick: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-8 right-8 w-16 h-16 rounded-full z-50",
        "bg-gradient-to-br from-cyan-500 to-purple-600",
        "flex items-center justify-center group",
        "transition-all duration-500 hover:scale-110",
        "shadow-lg hover:shadow-cyan-500/50",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      )}
      aria-label="Abrir chat con asesor financiero"
      style={{
        backgroundColor: '#00bcd4',
        boxShadow: '0 4px 20px rgba(0, 188, 212, 0.4)'
      }}
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
    </button>
  );
};