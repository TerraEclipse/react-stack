export default function ready (callback) {
  if (typeof document === 'undefined') {
    return setTimeout(callback, 0)
  }

  const state = document.readyState
  if (state === 'complete' || state === 'interactive') {
    return setTimeout(callback, 0)
  }

  document.addEventListener('DOMContentLoaded', callback)
}
