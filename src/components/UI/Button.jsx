// src/components/UI/Button.jsx
import React from 'react'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center 
    font-medium rounded-2xl 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-white/40
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `

  const variants = {
    primary: 'bg-white/30 backdrop-blur-md border border-white/30 text-white hover:bg-white/40',
    secondary: 'bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25',
    danger: 'bg-red-500/30 backdrop-blur-md border border-red-400/30 text-white hover:bg-red-500/40'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button