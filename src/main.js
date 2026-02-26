import './styles/main.css'
import { initHeader } from './js/modules/header.js'
import { initFooter } from './js/modules/footer.js'
import { initCards } from './js/components/cards.js'

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Приложение запущено')
  
  initHeader()
  initFooter()
  initCards()
})
