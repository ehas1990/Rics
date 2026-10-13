/**
 * RICS Home Surveys - Hero Section Slider
 * 4-Slide Responsive Image Slider with Smooth Transitions
 */
(function () {
  'use strict';

  function initHeroSlider() {
    var sliderSection = document.getElementById('hero-slider-section');
    if (!sliderSection) return;

    var slides = sliderSection.querySelectorAll('.tp-hero-slide');
    var dots = sliderSection.querySelectorAll('.tp-hero-dot');
    var prevBtn = sliderSection.querySelector('.tp-hero-prev');
    var nextBtn = sliderSection.querySelector('.tp-hero-next');

    if (!slides.length) return;

    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoplayInterval = 5000;
    var autoplayTimer = null;
    var isHovered = false;

    // Check prefers-reduced-motion
    var prefersReducedMotion = false;
    if (window.matchMedia) {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function updateSlider(index) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }

      currentIndex = index;

      // Update slides
      slides.forEach(function (slide, i) {
        if (i === currentIndex) {
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('is-active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update pagination dots
      dots.forEach(function (dot, i) {
        if (i === currentIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
          dot.setAttribute('tabindex', '0');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
          dot.setAttribute('tabindex', '-1');
        }
      });
    }

    function nextSlide() {
      updateSlider(currentIndex + 1);
    }

    function prevSlide() {
      updateSlider(currentIndex - 1);
    }

    function startAutoplay() {
      if (prefersReducedMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        if (!isHovered && document.visibilityState !== 'hidden') {
          nextSlide();
        }
      }, autoplayInterval);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Arrow navigation
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      });
    }

    // Dots navigation
    dots.forEach(function (dot) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        var targetIndex = parseInt(this.getAttribute('data-index'), 10);
        if (!isNaN(targetIndex) && targetIndex !== currentIndex) {
          updateSlider(targetIndex);
          resetAutoplay();
        }
      });
    });

    // Pause on hover (desktop)
    sliderSection.addEventListener('mouseenter', function () {
      isHovered = true;
    });

    sliderSection.addEventListener('mouseleave', function () {
      isHovered = false;
    });

    // Page visibility handling
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Keyboard navigation (ArrowLeft & ArrowRight)
    sliderSection.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      }
    });

    // Touch / Swipe Navigation for mobile & tablet
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;

    sliderSection.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    sliderSection.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches.length > 0) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }
    }, { passive: true });

    sliderSection.addEventListener('touchend', function () {
      var diffX = touchEndX - touchStartX;
      var diffY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is greater than vertical movement
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          // Swiped left -> next
          nextSlide();
        } else {
          // Swiped right -> prev
          prevSlide();
        }
        resetAutoplay();
      }
      touchStartX = 0;
      touchEndX = 0;
    });

    // Initialize first slide and start autoplay
    updateSlider(0);
    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
  } else {
    initHeroSlider();
  }
})();
