// components/Chat/ChatContainer.jsx
import React from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export const ChatContainer = ({
  messages,
  loading,
  className = ''
}) => {
  return (
    <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-black/5 ${className}`}>
      {messages.length === 0 && (
        <div className="text-center text-white/60 py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-lg mb-2">¡Hola! Soy tu asistente AI</p>
          <p className="text-sm">Escribe un mensaje para comenzar la conversación</p>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {loading && <TypingIndicator />}
    </div>
  )
}

export default ChatContainer