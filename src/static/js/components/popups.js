const modalsOpen = document.querySelectorAll('.modal-open');
const body = document.querySelector('body');

if(modalsOpen.length > 0) {
  modalsOpen.forEach(modalOpen => {
    const popup = document.querySelector(modalOpen.dataset.modal);
    if(popup) {
      const close = popup.querySelector('.modal__close svg');
      popup.addEventListener('click', e => {
        e.stopPropagation();
        if(e.target === popup) {
          popup.classList.remove('show');
          body.classList.remove('lock');
        }
      })
      modalOpen.addEventListener('click', () => {
        popup.classList.add('show');
        body.classList.add('lock');
      })
      close.addEventListener('click', () => {
        popup.classList.remove('show');
        body.classList.remove('lock');
      })
    }
  })
}
