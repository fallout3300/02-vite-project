/**
 * Компонент навигации
 * Управляет навигацией между страницами отчёта
 */

// Структура страниц отчёта
const reportPages = [
  { 
    id: 'spravochnye-svedeniya', 
    title: 'Справочные сведения о походе',
    prev: null,
    next: 'sostav-gruppy'
  },
  { 
    id: 'sostav-gruppy', 
    title: 'Состав группы',
    prev: 'spravochnye-svedeniya',
    next: 'organizatsiya-pohoda'
  },
  { 
    id: 'organizatsiya-pohoda', 
    title: 'Организация похода',
    prev: 'sostav-gruppy',
    next: 'kartograficheskiy-material'
  },
  { 
    id: 'kartograficheskiy-material', 
    title: 'Картографический материал',
    prev: 'organizatsiya-pohoda',
    next: 'tehniicheskoe-opisanie'
  },
  { 
    id: 'tehniicheskoe-opisanie', 
    title: 'Техническое описание маршрута',
    prev: 'kartograficheskiy-material',
    next: 'grafik-dvizheniya'
  },
  { 
    id: 'grafik-dvizheniya', 
    title: 'График движения',
    prev: 'tehniicheskoe-opisanie',
    next: 'itogi-vyvody'
  },
  { 
    id: 'itogi-vyvody', 
    title: 'Итоги, выводы и рекомендации',
    prev: 'grafik-dvizheniya',
    next: 'prilozhenie-1'
  },
  { 
    id: 'prilozhenie-1', 
    title: 'Приложение 1 – Материальное оснащение',
    prev: 'itogi-vyvody',
    next: 'prilozhenie-2'
  },
  { 
    id: 'prilozhenie-2', 
    title: 'Приложение 2 – Характеристика района',
    prev: 'prilozhenie-1',
    next: null
  }
]

/**
 * Инициализация навигации
 */
export function initNavigation() {
  renderBreadcrumbs()
  renderPageNavigation()
  
  console.log('✅ Навигация инициализирована')
}

/**
 * Рендер хлебных крошек
 */
function renderBreadcrumbs() {
  const breadcrumbsContainer = document.getElementById('breadcrumbs')
  if (!breadcrumbsContainer) return
  
  const currentPage = getCurrentPage()
  if (!currentPage) return
  
  const homeLink = '<a href="/02-vite-project/">Главная</a>'
  const separator = '<span class="separator">/</span>'
  const current = `<span class="current">${currentPage.title}</span>`
  
  breadcrumbsContainer.innerHTML = `${homeLink} ${separator} ${current}`
}

/**
 * Рендер навигации между страницами
 */
function renderPageNavigation() {
  const navContainer = document.getElementById('page-navigation')
  if (!navContainer) return
  
  const currentPage = getCurrentPage()
  if (!currentPage) return
  
  let prevPage = currentPage.prev ? reportPages.find(p => p.id === currentPage.prev) : null
  let nextPage = currentPage.next ? reportPages.find(p => p.id === currentPage.next) : null

  nextPage ??= {
    id: 'index',
    title: 'На главную'
  }
  prevPage ??= {
    id: 'index',
    title: 'На главную'
  }
  
  navContainer.innerHTML = `
    ${prevPage 
      ? `<a href="./${prevPage.id}.html" class="page-nav-btn">
           <span class="arrow">←</span> ${prevPage.title}
         </a>`
      : '<span class="page-nav-btn disabled"><span class="arrow">←</span> Назад</span>'
    }
    
    ${nextPage
      ? `<a href="./${nextPage.id}.html" class="page-nav-btn">
           ${nextPage.title} <span class="arrow">→</span>
         </a>`
      : '<span class="page-nav-btn disabled">Вперёд <span class="arrow">→</span></span>'
    }
  `
}

/**
 * Получение текущей страницы
 */
function getCurrentPage() {
  const path = window.location.pathname
  const match = path.match(/\/pages\/([^.]+)\.html$/)
  
  if (match) {
    return reportPages.find(p => p.id === match[1])
  }
  
  return null
}

/**
 * Получить список всех страниц
 */
export function getReportPages() {
  return reportPages
}
