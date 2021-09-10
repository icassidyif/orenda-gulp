const parentBlock = document.querySelector('.share');
if(parentBlock) {
  const body = document.querySelector('body');

  body.addEventListener('click', e => {
    if(e.target.closest('.share__trigger')) {
      parentBlock.classList.toggle('open');
    } else if(!e.target.closest('.share__container')) {
     parentBlock.classList.remove('open');
    }
  })
}
