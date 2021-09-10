const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');


menuItems.forEach(item => {
  let style = getComputedStyle(item);
  let marginRight = parseInt(style.marginRight);
  item.style.width = item.clientWidth + marginRight + 'px';
  item.style.height = item.clientHeight + 'px';
})

burger.addEventListener('click', e => {
  menu.classList.toggle('active');
  burger.classList.toggle('active');
})

