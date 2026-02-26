/**
 * Модуль футера
 * Инициализирует и управляет подвалом сайта
 */

export function initFooter() {
  const footer = document.getElementById('footer')
  
  if (!footer) {
    console.warn('Footer element not found')
    return
  }
  
  const currentYear = new Date().getFullYear()
  
  footer.innerHTML = `
    <div class="footer__container">
      <p class="footer__text">© ${currentYear} MyProject. Все права защищены.</p>
      <div class="footer__links">
        <a href="#" class="footer__link">Политика конфиденциальности</a>
        <a href="#" class="footer__link">Условия использования</a>
      </div>
    </div>
  `
  
  console.log('✅ Footer инициализирован')
}
