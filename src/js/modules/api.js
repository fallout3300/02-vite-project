/**
 * API модуль
 * Утилиты для работы с HTTP-запросами
 */

const BASE_URL = '/api'

/**
 * Базовый fetch с обработкой ошибок
 * @param {string} endpoint - Эндпоинт
 * @param {Object} options - Опции fetch
 * @returns {Promise<any>}
 */
export async function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  try {
    const response = await fetch(url, { ...defaultOptions, ...options })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

/**
 * GET запрос
 * @param {string} endpoint - Эндпоинт
 * @returns {Promise<any>}
 */
export function get(endpoint) {
  return fetchApi(endpoint, { method: 'GET' })
}

/**
 * POST запрос
 * @param {string} endpoint - Эндпоинт
 * @param {Object} data - Данные для отправки
 * @returns {Promise<any>}
 */
export function post(endpoint, data) {
  return fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
