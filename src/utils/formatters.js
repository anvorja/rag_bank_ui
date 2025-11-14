// utils/formatters.js
export const formatTime = (date) => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatMessageCount = (count) => {
  return `${count} mensaje${count !== 1 ? 's' : ''}`
}