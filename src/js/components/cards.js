/**
 * Компонент карточек
 * Рендерит карточки с возможностями
 */

const featuresData = [
  {
    icon: '⚡',
    title: 'Быстрая разработка',
    description: 'Vite обеспечивает мгновенный запуск сервера и горячую перезагрузку модулей.'
  },
  {
    icon: '📦',
    title: 'Модульная архитектура',
    description: 'Код организован в отдельные модули для удобной поддержки и масштабирования.'
  },
  {
    icon: '🎨',
    title: 'Стилизация',
    description: 'CSS-переменные и компонентный подход к стилям для гибкой настройки.'
  },
  {
    icon: '🚀',
    title: 'Оптимизация',
    description: 'Автоматическая сборка и минификация кода для продакшена.'
  }
]

export function initCards() {
  const container = document.getElementById('features-cards')
  
  if (!container) {
    console.warn('Features cards container not found')
    return
  }
  
  container.innerHTML = featuresData.map(feature => `
    <article class="card">
      <div class="card__icon">${feature.icon}</div>
      <h3 class="card__title">${feature.title}</h3>
      <p class="card__description">${feature.description}</p>
    </article>
  `).join('')
  
  console.log('✅ Карточки инициализированы')
}
