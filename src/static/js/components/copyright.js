const dateSpan = document.querySelector('.copyright span');

if (dateSpan) {
    const currentYear = new Date().getFullYear();
    dateSpan.innerHTML += ' ' + currentYear;
}