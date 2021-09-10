import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/dist/providers/youtube';
Vlitejs.registerProvider('youtube', VlitejsYoutube);

new Vlitejs('#player', {
  options: {
    controls: true,
    autoplay: false,
    playPause: false,
    progressBar: true,
    time: true,
    volume: true,
    fullscreen: true,
    poster: null,
    bigPlay: true,
    playsinline: true,
    loop: false,
    muted: false,
    autoHide: true,
    providerParams: {
      controls: 0,
      autoplay: 0,
    }
  },
  provider: 'youtube',
});

const buttonPlay = document.querySelector('.v-bigPlay');
buttonPlay.innerHTML= '<svg width="59" height="64" viewBox="0 0 59 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '<path d="M11.0918 1.59967C5.29305 -1.69413 0.591797 1.00419 0.591797 7.62171V56.4561C0.591797 63.0802 5.29305 65.775 11.0918 62.4844L54.196 38.0056C59.9967 34.7106 59.9967 29.3723 54.196 26.0781L11.0918 1.59967Z" fill="white"/>\n' +
  '</svg>\n';