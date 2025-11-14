// src/components/UI/Input.jsx
import React from 'react'

export const Input = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  clearable = false,
  onClear,
  className = '',
  ...props
}) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full bg-white/15 backdrop-blur-md 
          border border-white/25 rounded-2xl 
          px-5 py-4 text-white placeholder-white/60 
          focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent
          transition-all duration-200 disabled:opacity-50
          ${className}
        `}
        {...props}
      />
      {clearable && value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Input