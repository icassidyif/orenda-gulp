const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');
const menuArrows = document.querySelectorAll('.menu__arrow');

if (menu) {

  menuArrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      const currentSubMenu = arrow.nextElementSibling;
      currentSubMenu.classList.toggle('show');
      const arrowSvg = arrow.querySelector('svg');
      if (currentSubMenu.classList.contains('show')) {
        arrowSvg.style.transform = 'rotate(-180deg)';
      } else arrowSvg.style.transform = 'rotate(180deg)';
    })
  })

  burger.addEventListener('click', e => {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
    body.classList.toggle('lock');
  })
}


