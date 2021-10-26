const cookie = document.querySelector('.cookie');
const agreeBtn = cookie.querySelector('.button');

agreeBtn.addEventListener('click', () => {
    cookie.classList.remove('active');
    writeCookie('cookies_accept', 'true', 365);
});

setTimeout(() => {
    if (!readCookie('cookies_accept')) cookie.classList.add('active');
}, 3000);




function writeCookie(name, val, expires) {
    const date = new Date;
    date.setDate(date.getDate() + expires);
    document.cookie = name+"="+val+"; path=/; expires=" + date.toUTCString();
}

function readCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}