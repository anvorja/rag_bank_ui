// components/Chat/TypingIndicator.jsx
import React from 'react'
import GlassCard from '../UI/GlassCard'

export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <GlassCard className="p-4 bg-white/20 border-white/30" blur="blur(10px)">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm text-white/70">Escribiendo...</span>
        </div>
      </GlassCard>
    </div>
  )
}

export default TypingIndicator