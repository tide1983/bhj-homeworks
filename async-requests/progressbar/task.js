const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const progress = document.getElementById('progress');
const percentDisplay = document.createElement('span');
percentDisplay.style.marginLeft = '10px';
progress.parentNode.insertBefore(percentDisplay, progress.nextSibling);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Выберите файл');
        return;
    }
    
    progress.value = 0;
    percentDisplay.textContent = '0%';
    
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            progress.value = event.loaded / event.total;
            percentDisplay.textContent = `${Math.round(percent)}%`;
        }
    });
    
    xhr.addEventListener('load', () => {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('Файл успешно загружен!');
            form.reset();
            progress.value = 0;
            percentDisplay.textContent = '0%';
        } else {
            alert('Ошибка при загрузке файла');
            progress.value = 0;
            percentDisplay.textContent = '0%';
        }
    });
    
    xhr.addEventListener('error', () => {
        alert('Ошибка сети');
        progress.value = 0;
        percentDisplay.textContent = '0%';
    });
    
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});