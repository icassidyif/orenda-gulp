const expandBtn = document.querySelector('.expand-icon');
const bodyExpand = document.querySelector('.body-expand');

if(expandBtn && bodyExpand) {
  //  Detect full height of the body
  bodyExpand.style.height = 'auto';
  const bodyFullHeight = bodyExpand.clientHeight;
  bodyExpand.removeAttribute('style');
  const bodyShortHeight = bodyExpand.clientHeight;
  //

  bodyExpand.style.height = bodyShortHeight + 'px';
  bodyExpand.style.transition = 'height .5s ease-out';

  expandBtn.addEventListener('click', e => {

    //  add styles to elements
    bodyExpand.classList.toggle('open');
    if(bodyExpand.classList.contains('open')) {
      bodyExpand.style.height = bodyFullHeight + 'px';
    } else {
      bodyExpand.style.height = bodyShortHeight + 'px';
    }
  })
}

