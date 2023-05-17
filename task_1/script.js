const btn = document.querySelector('.btn__task-one');
const icon = document.querySelectorAll('.btn__icon')

btn.addEventListener('click', () => {
    icon.forEach(icon => {
        icon.classList.toggle('active');
    });
})

