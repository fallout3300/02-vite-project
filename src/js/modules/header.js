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
      <a href="/index.html" class="header__logo">🎿 Лыжный поход</a>
      <nav class="header__nav">
        <a href="/index.html" class="header__link">Главная</a>
        <a href="/pages/spravochnye-svedeniya.html" class="header__link">Отчёт</a>
        <a href="/pages/grafik-dvizheniya.html" class="header__link">График</a>
        <a href="/pages/prilozhenie-2.html" class="header__link">О Карелии</a>
      </nav>
    </div>
  `
  
  console.log('✅ Header инициализирован')
}
