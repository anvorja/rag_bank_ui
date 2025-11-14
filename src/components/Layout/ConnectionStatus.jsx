// components/Layout/ConnectionStatus.jsx
import React from 'react'

export const ConnectionStatus = ({ isConnected, isTesting, onTest }) => {
  const getStatusConfig = () => {
    if (isTesting) {
      return {
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-400/30',
        text: 'text-yellow-200',
        dot: 'bg-yellow-400 animate-pulse',
        label: 'Conectando...'
      }
    }

    if (isConnected === true) {
      return {
        bg: 'bg-green-500/20',
        border: 'border-green-400/30',
        text: 'text-green-200',
        dot: 'bg-green-400',
        label: 'Conectado'
      }
    }

    if (isConnected === false) {
      return {
        bg: 'bg-red-500/20',
        border: 'border-red-400/30',
        text: 'text-red-200',
        dot: 'bg-red-400',
        label: 'Desconectado'
      }
    }

    return {
      bg: 'bg-gray-500/20',
      border: 'border-gray-400/30',
      text: 'text-gray-200',
      dot: 'bg-gray-400',
      label: 'Desconocido'
    }
  }

  const status = getStatusConfig()

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onTest}
        className="text-white/60 hover:text-white/80 transition-colors text-sm"
      >
        Probar conexión
      </button>
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full backdrop-blur-md border ${status.bg} ${status.border} ${status.text}`}>
        <div className={`w-2 h-2 rounded-full ${status.dot}`}></div>
        <span className="text-sm font-medium">{status.label}</span>
      </div>
    </div>
  )
}

export default ConnectionStatus;
