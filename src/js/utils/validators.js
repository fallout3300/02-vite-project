/**
 * Валидаторы
 */

/**
 * Валидация email
 * @param {string} email - Email для проверки
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Валидация телефона (базовая)
 * @param {string} phone - Телефон для проверки
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  return phoneRegex.test(phone)
}

/**
 * Проверка минимальной длины
 * @param {string} value - Значение для проверки
 * @param {number} minLength - Минимальная длина
 * @returns {boolean}
 */
export function hasMinLength(value, minLength) {
  return value && value.length >= minLength
}
