/**
 * Утилиты для аккордеона
 */

/**
 * Инициализация аккордеона
 * @param {string} selector - Селектор контейнера аккордеона
 */
export function initAccordion(selector = '.accordion') {
  const accordions = document.querySelectorAll(selector)
  
  accordions.forEach(accordion => {
    const headers = accordion.querySelectorAll('.accordion-header')
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement
        const content = header.nextElementSibling
        const isActive = header.classList.contains('active')
        
        // Закрываем все остальные (если нужен режим "один открыт")
        // accordion.querySelectorAll('.accordion-header').forEach(h => {
        //   h.classList.remove('active')
        //   h.nextElementSibling.classList.remove('active')
        // })
        
        // Переключаем текущий
        header.classList.toggle('active')
        content.classList.toggle('active')
      })
    })
  })
  
  console.log('✅ Аккордеон инициализирован')
}
