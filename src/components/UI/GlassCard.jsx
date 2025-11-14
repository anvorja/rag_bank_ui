// src/components/UI/GlassCard.jsx
import React from 'react'

export const GlassCard = ({
  children,
  className = '',
  blur = 'blur(20px)',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-md border border-white/20 
        rounded-3xl shadow-2xl
        ${className}
      `}
      style={{ backdropFilter: blur }}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard