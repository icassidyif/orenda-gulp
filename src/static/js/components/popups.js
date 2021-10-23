const modalsOpen = document.querySelectorAll('.modal-open');
const body = document.querySelector('body');

const modals = document.querySelectorAll('.modal-container');

if (modals.length > 0) {
  modals.forEach(modal => {
    popupInit(modal);
  })
}



function popupInit (popup) {
  const modalOpen = null;

  modalsOpen.forEach(open => {
    if (open.dataset.modal === '#' + popup.id) {
        open.addEventListener('click', () => {
        popup.classList.add('show');
        body.classList.add('lock');
      })
    }
  })

  const close = popup.querySelector('.modal__close svg');
  popup.addEventListener('click', e => {
    e.stopPropagation();
    if(e.target === popup) {
      popup.classList.remove('show');
      body.classList.remove('lock');
    }
  });

  close.addEventListener('click', () => {
    popup.classList.remove('show');
    body.classList.remove('lock');
  })
}