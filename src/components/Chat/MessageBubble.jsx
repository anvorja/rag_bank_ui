// // components/Chat/MessageBubble.jsx
// import React from 'react'
// import { formatTime } from '../../utils/formatters'
// import GlassCard from '../UI/GlassCard'
//
// export const MessageBubble = ({ message }) => {
//   const { text, isUser, timestamp, isError } = message
//
//   const bubbleClasses = isUser
//     ? 'bg-gradient-135deg from-blue-400/40 to-purple-500/40 border-blue-400/30'
//     : isError
//     ? 'bg-red-500/20 border-red-400/30'
//     : 'bg-white/20 border-white/30'
//
//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//       <div className="max-w-full sm:max-w-[85%]">
//         <GlassCard
//           className={`p-4 ${bubbleClasses} transition-all duration-200 hover:translate-y-[-2px]`}
//           blur="blur(10px)"
//         >
//           <div className="whitespace-pre-wrap leading-relaxed text-white">
//             {text}
//           </div>
//           <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
//             <div className="text-xs opacity-60">
//               {formatTime(timestamp)}
//             </div>
//             <div className="text-xs opacity-60">
//               {isUser ? '👤 Tú' : isError ? '⚠️ Error' : '🤖 Asistente'}
//             </div>
//           </div>
//         </GlassCard>
//       </div>
//     </div>
//   )
// }
//
// export default MessageBubble

// components/Chat/MessageBubble.jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { formatTime } from '../../utils/formatters'
import GlassCard from '../UI/GlassCard'

export const MessageBubble = ({ message }) => {
  const { text, isUser, timestamp, isError } = message

  const bubbleClasses = isUser
    ? 'bg-gradient-135deg from-blue-400/40 to-purple-500/40 border-blue-400/30'
    : isError
    ? 'bg-red-500/20 border-red-400/30'
    : 'bg-white/20 border-white/30'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-full sm:max-w-[85%]">
        <GlassCard
          className={`p-4 ${bubbleClasses} transition-all duration-200 hover:translate-y-[-2px]`}
          blur="blur(10px)"
        >
          {/* Renderizar Markdown para mensajes del bot */}
          {!isUser && !isError ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  // Estilos personalizados para elementos Markdown
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-semibold text-white mb-1" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-sm font-semibold text-white mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="text-white mb-2 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-white mb-2 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside text-white mb-2 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="text-white ml-2" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-white/90" {...props} />,
                  code: ({node, inline, ...props}) =>
                    inline ? (
                      <code className="bg-white/20 px-1 py-0.5 rounded text-sm font-mono text-white" {...props} />
                    ) : (
                      <code className="block bg-white/20 p-2 rounded text-sm font-mono text-white overflow-x-auto" {...props} />
                    ),
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-white/40 pl-3 italic text-white/90 my-2" {...props} />
                  ),
                  a: ({node, ...props}) => (
                    <a className="text-blue-300 hover:text-blue-200 underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          ) : (
            // Para mensajes del usuario y errores, mostrar texto simple
            <div className="whitespace-pre-wrap leading-relaxed text-white">
              {text}
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <div className="text-xs opacity-60">
              {formatTime(timestamp)}
            </div>
            <div className="text-xs opacity-60">
              {isUser ? '👤 Tú' : isError ? '⚠️ Error' : '🤖 Sebastián'}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default MessageBubble