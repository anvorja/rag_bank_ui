// src/components/chatbot/MessageBubble.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Components } from 'react-markdown';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isExpanded: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isExpanded }) => {
  const { text, isUser, timestamp, isError } = message;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Componentes personalizados para Markdown con tipos correctos
  const markdownComponents: Components = {
    // Headers con jerarquía visual clara
    h1: ({ children, ...props }) => (
      <h1 className="text-lg font-bold text-white mb-2 mt-1" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-base font-bold text-white mb-2 mt-1" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-sm font-semibold text-white mb-1 mt-1" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-sm font-medium text-white mb-1" {...props}>
        {children}
      </h4>
    ),

    // Párrafos con buen espaciado
    p: ({ children, ...props }) => (
      <p className="text-sm text-white mb-2 leading-relaxed" {...props}>
        {children}
      </p>
    ),

    // Listas con bullets personalizados
    ul: ({ children, ...props }) => (
      <ul className="space-y-1 mb-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="space-y-1 mb-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-sm text-white flex items-start gap-2">
        <span className="text-primary text-sm mt-0.5 flex-shrink-0">•</span>
        <span {...props}>{children}</span>
      </li>
    ),

    // Texto enfatizado
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-white" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-white/90" {...props}>
        {children}
      </em>
    ),

    // Código inline y bloques
    code: ({ children, className, ...props }) => {
      const isInline = !className || !className.includes('language-');

      if (isInline) {
        return (
          <code
            className="bg-white/15 px-1.5 py-0.5 rounded text-sm font-mono text-primary border border-white/10"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <pre className="bg-white/10 p-3 rounded-lg border border-white/10 overflow-x-auto mb-2">
          <code className="text-sm font-mono text-white" {...props}>
            {children}
          </code>
        </pre>
      );
    },

    // Citas
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary/40 pl-3 py-1 italic text-white/90 my-2 bg-white/5 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Enlaces
    a: ({ children, ...props }) => (
      <a
        className="text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),

    // Tablas
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-2">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-white/20 bg-white/10 px-2 py-1 text-sm font-medium text-white text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-white/20 px-2 py-1 text-sm text-white" {...props}>
        {children}
      </td>
    ),

    // Separadores
    hr: ({ ...props }) => (
      <hr className="border-white/20 my-3" {...props} />
    ),
  };

  return (
    <div className={cn(
      "flex gap-2.5 items-start",
      isUser ? "justify-end" : "justify-start"
    )}>
      {/* Avatar del asesor */}
      {!isUser && (
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-3 h-3 text-primary" />
        </div>
      )}

      {/* Mensaje */}
      <div className={cn(
        "px-3 py-2.5 rounded-2xl transition-all duration-200 hover:scale-[1.02]",
        isExpanded ? "max-w-[85%]" : "max-w-[80%]",
        isUser
          ? "glass-border bg-primary/10 rounded-br-md"
          : isError
          ? "glass bg-red-500/10 border-red-400/30 rounded-bl-md"
          : "glass rounded-bl-md"
      )}>
        {/* Contenido del mensaje */}
        {!isUser && !isError ? (
          // Mensaje del bot con ReactMarkdown
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </div>
        ) : (
          // Mensaje del usuario o error - texto simple
          <div className="text-sm leading-relaxed text-white whitespace-pre-wrap">
            {text}
          </div>
        )}

        {/* Footer con timestamp e identificación */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
          <div className="text-xs text-white/60">
            {formatTime(timestamp)}
          </div>
          <div className="text-xs text-white/60 flex items-center gap-1">
            {isUser ? (
              <>
                <User className="w-3 h-3" />
                <span>Tú</span>
              </>
            ) : isError ? (
              <>
                <span>⚠️</span>
                <span>Error</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                <span>Sebastián</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Avatar del usuario */}
      {isUser && (
        <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <User className="w-3 h-3 text-primary" />
        </div>
      )}
    </div>
  );
};