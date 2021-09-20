import Swiper from '../../../../node_modules/swiper/swiper-bundle';


const mainPageSlider = new Swiper('.interesting__slider .swiper',
  {
    spaceBetween: 30,
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  }
);

const singlePageSlider = new Swiper('.slider-card-single .swiper',
  {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    autoplay: {
      delay: 5000,
    },
  });

const teamSlider = new Swiper('.team__slider .swiper',
  {
    spaceBetween: 30,
    loop: false,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    autoplay: {
      delay: 5000,
    },
  });





