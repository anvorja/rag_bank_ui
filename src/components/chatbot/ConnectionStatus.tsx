// src/components/chatbot/ConnectionStatus.tsx
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { chatbotService } from '@/services/chatbot.service';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  className?: string;
}

type ConnectionState = 'connected' | 'disconnected' | 'checking';

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ className }) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkConnection = async () => {
    setConnectionState('checking');
    try {
      const isConnected = await chatbotService.testConnection();
      setConnectionState(isConnected ? 'connected' : 'disconnected');
      setLastCheck(new Date());
    } catch (error) {
      setConnectionState('disconnected');
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    checkConnection();

    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (connectionState) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Conectado',
          color: 'text-green-500',
          bgColor: 'bg-green-500/20',
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Sin conexión',
          color: 'text-red-500',
          bgColor: 'bg-red-500/20',
        };
      case 'checking':
        return {
          icon: AlertCircle,
          text: 'Verificando...',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/20',
        };
    }
  };

  const { icon: Icon, text, color, bgColor } = getStatusConfig();

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
      'glass-border transition-all duration-300',
      bgColor,
      className
    )}>
      <Icon className={cn('w-3 h-3', color)} />
      <span className={color}>{text}</span>
      {lastCheck && connectionState !== 'checking' && (
        <span className="text-muted-foreground ml-1">
          {lastCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </div>
  );
};