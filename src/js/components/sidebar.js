/**
 * Компонент боковой навигации
 * Управляет навигационной панелью слева
 */

const navItems = [
  { href: '/', icon: '🏠', label: 'Главная' },
  { href: '/pages/spravochnye-svedeniya.html', icon: '📋', label: 'Справочные сведения' },
  { href: '/pages/sostav-gruppy.html', icon: '👥', label: 'Состав группы' },
  { href: '/pages/organizatsiya-pohoda.html', icon: '🎒', label: 'Организация похода' },
  { href: '/pages/kartograficheskiy-material.html', icon: '🗺️', label: 'Картографический материал' },
  { href: '/pages/tehniicheskoe-opisanie.html', icon: '📝', label: 'Техническое описание' },
  { href: '/pages/grafik-dvizheniya.html', icon: '📊', label: 'График движения' },
  { href: '/pages/itogi-vyvody.html', icon: '✅', label: 'Итоги и выводы' },
  { href: '/pages/prilozhenie-1.html', icon: '📦', label: 'Приложение 1' },
  { href: '/pages/prilozhenie-2.html', icon: '🌲', label: 'Приложение 2' }
]

/**
 * Инициализация боковой навигации
 */
export function initSidebar() {
  const container = document.getElementById('sidebar-container')
  if (!container) {
    console.warn('Sidebar container not found')
    return
  }
  
  renderSidebar(container)
  setupToggle()
  highlightCurrentPage()
  
  console.log('✅ Sidebar инициализирован')
}

/**
 * Рендер боковой панели
 */
function renderSidebar(container) {
  const sidebar = document.createElement('aside')
  sidebar.className = 'sidebar'
  sidebar.id = 'sidebar'
  
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="../index.html" class="sidebar-logo">
        <span class="logo-icon">🎿</span>
        <span class="logo-text">Лыжный поход</span>
      </a>
      <button class="sidebar-close" id="sidebar-close" aria-label="Закрыть меню">
        <span>&times;</span>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="nav-list">
        ${navItems.map(item => `
          <li class="nav-item">
            <a href="/02-vite-project${item.href}" class="nav-link">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <p>Карелия 2025-2026</p>
    </div>
  `
  
  container.appendChild(sidebar)
  
  // Добавляем overlay для мобильной версии
  const overlay = document.createElement('div')
  overlay.className = 'sidebar-overlay'
  overlay.id = 'sidebar-overlay'
  document.body.appendChild(overlay)
}

/**
 * Настройка переключения sidebar
 */
function setupToggle() {
  // Кнопка открытия
  const toggleBtn = document.createElement('button')
  toggleBtn.className = 'sidebar-toggle'
  toggleBtn.id = 'sidebar-toggle'
  toggleBtn.innerHTML = '<span>☰</span>'
  toggleBtn.setAttribute('aria-label', 'Открыть меню')
  document.body.appendChild(toggleBtn)
  
  // Обработчики
  const sidebar = document.getElementById('sidebar')
  const closeBtn = document.getElementById('sidebar-close')
  const overlay = document.getElementById('sidebar-overlay')
  
  toggleBtn.addEventListener('click', () => openSidebar())
  closeBtn.addEventListener('click', () => closeSidebar())
  overlay.addEventListener('click', () => closeSidebar())
  
  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar()
  })
}

/**
 * Открытие sidebar
 */
function openSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebar-overlay')
  sidebar.classList.add('active')
  overlay.classList.add('active')
  document.body.style.overflow = 'hidden'
}

/**
 * Закрытие sidebar
 */
function closeSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebar-overlay')
  sidebar.classList.remove('active')
  overlay.classList.remove('active')
  document.body.style.overflow = ''
}

/**
 * Подсветка текущей страницы
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-link')
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    // console.log(currentPath)
    // console.log(href)
    // debugger
    if (href === currentPath || ((currentPath === '/02-vite-project/' || currentPath === '/02-vite-project/index.html') && href === '/02-vite-project/pages/index.html')) {
      link.classList.add('active')
    }
  })
}
