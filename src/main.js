import './styles/main.css'
import { initFooter } from './js/modules/footer.js'
import { initGallery } from './js/components/gallery.js'
import { initNavigation } from './js/components/navigation.js'
import { initSidebar } from './js/components/sidebar.js'
import { initCharts } from './js/components/charts.js'
import { initAccordion } from './js/utils/accordion.js'

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Приложение запущено')
  
  initSidebar()
  initFooter()
  initGallery()
  initNavigation()
  initCharts()
  initAccordion()
})
