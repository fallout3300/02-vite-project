/**
 * Компонент галереи
 * Управляет отображением и просмотром изображений
 */

// Список основных изображений для предпросмотра
const previewImages = [
  { src: '/src/assets/images/image1.png', caption: 'Питкяранта - начало маршрута' },
  { src: '/src/assets/images/image2.jpeg', caption: 'Памятник на улице Ленина' },
  { src: '/src/assets/images/image3.jpeg', caption: 'Родниковая улица - надеваем лыжи' },
  { src: '/src/assets/images/image5.jpeg', caption: 'Первая развилка' },
  { src: '/src/assets/images/image7.jpeg', caption: 'Мост через реку Мустайоки' },
  { src: '/src/assets/images/image8.jpeg', caption: 'Озеро Куиккаламмет' },
  { src: '/src/assets/images/image13.jpeg', caption: 'Лунка для воды на озере Лоухиярви' },
  { src: '/src/assets/images/image15.png', caption: 'Уксинская озовая гряда' },
  { src: '/src/assets/images/image17.jpeg', caption: 'Трасса Сортавала' },
  { src: '/src/assets/images/image27.jpeg', caption: 'Братская могила' },
  { src: '/src/assets/images/image37.jpeg', caption: 'Водопад Белые мосты 2' },
  { src: '/src/assets/images/image40.jpeg', caption: 'Мост над водопадом' }
]

let currentImageIndex = 0
let allImages = []

/**
 * Инициализация галереи
 */
export function initGallery() {
  const previewContainer = document.getElementById('gallery-preview')
  const fullGallery = document.getElementById('gallery-full')
  
  if (previewContainer) {
    renderPreviewGallery(previewContainer)
  }
  
  if (fullGallery) {
    renderFullGallery(fullGallery)
  }
  
  createModal()
  loadAllImages()
  
  console.log('✅ Галерея инициализирована')
}

/**
 * Загрузка всех изображений
 */
function loadAllImages() {
  allImages = []
  for (let i = 1; i <= 79; i++) {
    const ext = i === 1 ? 'png' : i === 12 ? '~' : i === 13 || i === 21 || i === 31 || i === 32 || i === 59 ? 'jpg' : i === 15 || i === 104 ? 'png' : 'jpeg'
    allImages.push({
      src: `/src/assets/images/image${i}.${ext}`,
      caption: `Фото ${i}`
    })
  }
}

/**
 * Рендер предпросмотра галереи
 */
function renderPreviewGallery(container) {
  container.innerHTML = previewImages.map((img, index) => `
    <div class="gallery-item" data-index="${index}" onclick="openModal(${index})">
      <img src="${img.src}" alt="${img.caption}" loading="lazy" onerror="this.src='/src/assets/images/placeholder.jpg'">
    </div>
  `).join('')
}

/**
 * Рендер полной галереи
 */
function renderFullGallery(container) {
  container.innerHTML = `
    <h2>Все фотографии</h2>
    <div class="gallery-grid">
      ${allImages.map((img, index) => `
        <div class="gallery-item" data-index="${index}" onclick="openModal(${index})">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" onerror="this.style.display='none'">
        </div>
      `).join('')}
    </div>
  `
}

/**
 * Создание модального окна
 */
function createModal() {
  if (document.getElementById('gallery-modal')) return
  
  const modal = document.createElement('div')
  modal.id = 'gallery-modal'
  modal.className = 'modal'
  modal.innerHTML = `
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <span class="modal-nav modal-prev" onclick="prevImage()">&#10094;</span>
    <img class="modal-content" id="modal-img" src="" alt="">
    <p class="modal-caption" id="modal-caption"></p>
    <span class="modal-nav modal-next" onclick="nextImage()">&#10095;</span>
  `
  
  document.body.appendChild(modal)
  
  // Закрытие по клику вне изображения
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  
  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
  })
}

/**
 * Открытие модального окна
 */
window.openModal = function(index) {
  const modal = document.getElementById('gallery-modal')
  const modalImg = document.getElementById('modal-img')
  const caption = document.getElementById('modal-caption')
  
  currentImageIndex = index
  const images = document.getElementById('gallery-full') ? allImages : previewImages
  
  modalImg.src = images[index].src
  caption.textContent = images[index].caption || `Фото ${index + 1}`
  
  modal.classList.add('active')
  document.body.style.overflow = 'hidden'
}

/**
 * Закрытие модального окна
 */
window.closeModal = function() {
  const modal = document.getElementById('gallery-modal')
  modal.classList.remove('active')
  document.body.style.overflow = ''
}

/**
 * Предыдущее изображение
 */
window.prevImage = function() {
  const images = document.getElementById('gallery-full') ? allImages : previewImages
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
  updateModal()
}

/**
 * Следующее изображение
 */
window.nextImage = function() {
  const images = document.getElementById('gallery-full') ? allImages : previewImages
  currentImageIndex = (currentImageIndex + 1) % images.length
  updateModal()
}

/**
 * Обновление модального окна
 */
function updateModal() {
  const modalImg = document.getElementById('modal-img')
  const caption = document.getElementById('modal-caption')
  const images = document.getElementById('gallery-full') ? allImages : previewImages
  
  modalImg.src = images[currentImageIndex].src
  caption.textContent = images[currentImageIndex].caption || `Фото ${currentImageIndex + 1}`
}
