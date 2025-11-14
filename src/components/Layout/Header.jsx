// components/Layout/Header.jsx
import React from 'react'
import ConnectionStatus from './ConnectionStatus'

export const Header = ({
  title = "GlassChat AI",
  subtitle = "Asistente inteligente",
  isConnected,
  isTesting,
  onTestConnection,
  onClearChat,
  messageCount
}) => {
  return (
    <div className="glass-header p-4 sm:p-6 border-b border-white/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
            <span className="text-white text-lg sm:text-xl">🤖</span>
          </div>
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
            <p className="text-white/70 text-xs sm:text-sm">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-4">
          <div className="text-white/60 text-sm">
            {messageCount} mensaje{messageCount !== 1 ? 's' : ''}
          </div>
          <ConnectionStatus
            isConnected={isConnected}
            isTesting={isTesting}
            onTest={onTestConnection}
          />
          <button
            onClick={onClearChat}
            className="text-white/60 hover:text-white/80 transition-colors text-sm"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;