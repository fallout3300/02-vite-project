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
      <p class="footer__text">© ${currentYear} Отчёт о лыжном походе | ГБНОУ «Балтийский берег»</p>
      <p class="footer__text">Руководитель: Акилов Александр Юрьевич</p>
    </div>
  `
  
  console.log('✅ Footer инициализирован')
}
