const modalsOpen = document.querySelectorAll('.modal-open');
const body = document.querySelector('body');

const modals = document.querySelectorAll('.modal-container');

if (modals.length > 0) {
  modals.forEach(modal => {
    popupInit(modal);
  })
}

// if(modalsOpen.length > 0) {
//   modalsOpen.forEach(modalOpen => {
//     const popup = document.querySelector(modalOpen.dataset.modal);
//     if(popup) {
//       modalOpen.addEventListener('click', () => {
//         popup.classList.add('show');
//         body.classList.add('lock');
//       })
//       popupInit(popup);
//     }
//   })
// }




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