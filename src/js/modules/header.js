/**
 * Модуль хедера
 * Инициализирует и управляет шапкой сайта
 */

export function initHeader() {
  const header = document.getElementById('header')
  
  if (!header) {
    console.warn('Header element not found')
    return
  }
  
  header.innerHTML = `
    <div class="header__container">
      <a href="/" class="header__logo">MyProject</a>
      <nav class="header__nav">
        <a href="/" class="header__link">Главная</a>
        <a href="/pages/about.html" class="header__link">О проекте</a>
        <a href="#" class="header__link">Контакты</a>
      </nav>
    </div>
  `
  
  console.log('✅ Header инициализирован')
}
