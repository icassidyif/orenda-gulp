import GLightbox from 'glightbox';

const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true,
  selector: '.glightbox-single-caard',
  elements: null,
  closeButton: true,
  openEffect: 'zoom',
  closeEffect: 'zoom',
  slideEffect: 'slide',
  draggable: true,
  preload: true,
});

const lightboxVideo = GLightbox({
  autoplayVideos: true,
  autofocusVideos: true,
  selector: '.glightbox-video',
  closeButton: true,
  openEffect: 'zoom',
  closeEffect: 'zoom',
  preload: true,
});


