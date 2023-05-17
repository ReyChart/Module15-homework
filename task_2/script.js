const btn = document.querySelector('.btn__task-two');

btn.addEventListener('click', () => {
    alert(`Ширина экрана: ${document.documentElement.clientWidth}; Высота экрана: ${document.documentElement.clientHeight}`);
})