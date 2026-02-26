import os
import sys
import zipfile
from docx import Document
from docx.oxml.ns import qn
from docx.shared import Inches

# Устанавливаем UTF-8 кодировку для вывода
sys.stdout.reconfigure(encoding='utf-8')

# Пути
docx_path = r"c:\Users\Саша\Desktop\Programming\tests\ai\02\files\Отчет.docx"
images_output_dir = r"c:\Users\Саша\Desktop\Programming\tests\ai\02\src\assets\images"

# Создаем папку для изображений если не существует
os.makedirs(images_output_dir, exist_ok=True)

# Открываем документ
doc = Document(docx_path)

# Структура для хранения текста
text_structure = []
output_lines = []

# Функция для определения типа параграфа
def get_paragraph_type(para):
    style_name = para.style.name if para.style else ""
    
    if style_name.startswith('Heading'):
        level = style_name.replace('Heading', '').strip()
        return ('heading', level, para.text.strip())
    elif style_name == 'List Paragraph' or para._element.xpath('.//w:numPr'):
        return ('list_item', None, para.text.strip())
    elif para.text.strip():
        return ('paragraph', None, para.text.strip())
    return None

# Извлекаем текст с структурой
output_lines.append("=" * 60)
output_lines.append("СТРУКТУРА ДОКУМЕНТА")
output_lines.append("=" * 60)

for para in doc.paragraphs:
    para_type = get_paragraph_type(para)
    if para_type:
        text_structure.append(para_type)
        p_type, level, text = para_type
        
        if p_type == 'heading':
            output_lines.append(f"\n[ЗАГОЛОВОК УРОВНЯ {level}]")
            output_lines.append(text)
        elif p_type == 'list_item':
            output_lines.append(f"  • {text}")
        elif p_type == 'paragraph':
            output_lines.append(f"\n{text}")

# Извлекаем изображения из документа
output_lines.append("\n" + "=" * 60)
output_lines.append("ИЗОБРАЖЕНИЯ")
output_lines.append("=" * 60)

# Word хранит изображения внутри документа как ZIP-архив
# Извлекаем их из word/media/ внутри .docx
saved_images = []

with zipfile.ZipFile(docx_path, 'r') as zip_ref:
    # Находим все изображения в архиве
    image_files = [f for f in zip_ref.namelist() if f.startswith('word/media/')]
    
    if image_files:
        output_lines.append(f"\nНайдено изображений: {len(image_files)}")
        
        for image_path in image_files:
            # Получаем имя файла
            image_name = os.path.basename(image_path)
            output_path = os.path.join(images_output_dir, image_name)
            
            # Извлекаем файл
            with zip_ref.open(image_path) as source:
                with open(output_path, 'wb') as target:
                    target.write(source.read())
            
            saved_images.append(image_name)
            output_lines.append(f"  ✓ Сохранено: {image_name}")
    else:
        output_lines.append("\nИзображения в документе не найдены.")

# Выводим итоговую информацию
output_lines.append("\n" + "=" * 60)
output_lines.append("ИТОГИ")
output_lines.append("=" * 60)
output_lines.append(f"\nПолный текст с структурой показан выше.")
output_lines.append(f"Сохранённые изображения ({len(saved_images)}):")
for img in saved_images:
    output_lines.append(f"  - {img}")

if not saved_images:
    output_lines.append("  (нет изображений)")

# Сохраняем текст в файл для удобства
output_text_path = r"c:\Users\Саша\Desktop\Programming\tests\ai\02\extracted_text.txt"
with open(output_text_path, 'w', encoding='utf-8') as f:
    for p_type, level, text in text_structure:
        if p_type == 'heading':
            f.write(f"\n{'#' * int(level)} {text}\n")
        elif p_type == 'list_item':
            f.write(f"  • {text}\n")
        elif p_type == 'paragraph':
            f.write(f"{text}\n")

output_lines.append(f"\nТекст также сохранён в файл: {output_text_path}")

# Выводим всё содержимое
for line in output_lines:
    print(line)
