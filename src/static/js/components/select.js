const selects = document.querySelectorAll('.form-control.select');

if (selects.length > 0) {
  selects.forEach(select => {
    const handle = select.querySelector('.select__trigger');
    const customOptionBlock = select.querySelector(' .custom-options');
    const customOptionBlockHeight = customOptionBlock.offsetHeight;
    customOptionBlock.style.padding = '0px';
    customOptionBlock.style.height = '0px';

    handle.addEventListener('click', () => {
      if(!select.classList.contains('open')) {
        select.classList.add('open');
        customOptionBlock.style.removeProperty('padding');
        customOptionBlock.style.height = customOptionBlockHeight + 'px';
      } else {
        select.classList.remove('open');
        customOptionBlock.style.padding = '0px';
        customOptionBlock.style.height = '0px';
      }
    })
  })
}