import './styles/main.css'
import { initHeader } from './js/modules/header.js'
import { initFooter } from './js/modules/footer.js'
import { initGallery } from './js/components/gallery.js'
import { initNavigation } from './js/components/navigation.js'

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Приложение запущено')
  
  initHeader()
  initFooter()
  initGallery()
  initNavigation()
})
