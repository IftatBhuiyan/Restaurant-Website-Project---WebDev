// This file handles simple page interactions.

// Toggle nav menu when the mobile button is clicked.
const nav = document.querySelector('nav');
const menuButton = document.querySelector('.menu-toggle');

if (menuButton && nav) {
  menuButton.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}

// Set up gallery slider controls if this page has the slider.
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider-btn.prev');
const nextButton = document.querySelector('.slider-btn.next');
const sliderTrack = document.querySelector('.slides');

if (slides.length > 0 && sliderTrack) {
  let current = 0;

  function moveToSlide(index) {
    current = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      moveToSlide(current - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      moveToSlide(current + 1);
    });
  }

  setInterval(function () {
    moveToSlide(current + 1);
  }, 4500);
}
