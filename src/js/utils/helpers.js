/**
 * Вспомогательные утилиты
 */

/**
 * Debounce функция
 * @param {Function} func - Функция для выполнения
 * @param {number} wait - Время ожидания в мс
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle функция
 * @param {Function} func - Функция для выполнения
 * @param {number} limit - Лимит времени в мс
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Проверка на пустое значение
 * @param {*} value - Проверяемое значение
 * @returns {boolean}
 */
export function isEmpty(value) {
  return value === null || value === undefined || value === ''
}
