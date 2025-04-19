document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('#header');
	const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
	const navLinks = document.querySelector('.nav-links');

	mobileNavToggle.addEventListener('click', function () {
		mobileNavToggle.classList.toggle('active');
		navLinks.classList.toggle('active');
	});

	window.addEventListener('scroll', function () {
		if (this.window.scrollY > 50) {
			header.classList.add('header-scrolled');
		} else {
			header.classList.remove('header-scrolled');
		}
	});

	// AOS Initialize

	AOS.init();
});

// Select all carousels on the page
document.querySelectorAll('.carousel').forEach(function (carousel) {
    const images = carousel.querySelectorAll('.carousel-img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    // Show image at given index
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    // Previous button
    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    // Next button
    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    // Initialize first image
    showImage(currentIndex);
});

// ===== Image Preview Modal with Carousel, Auto-Slide, Keyboard Nav =====

const modal = document.getElementById('imagePreviewModal');
const previewImg = modal.querySelector('.preview-img');
const closeBtn = modal.querySelector('.close-btn');
const prevBtn = modal.querySelector('.modal-prev');
const nextBtn = modal.querySelector('.modal-next');

let allImages = [];         // Will hold current carousel's images
let currentIndex = 0;       // Track currently displayed image index
let autoSlideInterval;      // For auto-slide timer

// Set preview image and animate fade
function setPreviewImage(index) {
  previewImg.classList.remove('show'); // Hide image first
  previewImg.src = allImages[index].src;

  // Add fade animation once image is loaded
  previewImg.onload = () => {
    previewImg.classList.add('show');
  };
}

// Open modal with the clicked image
document.querySelectorAll('.carousel-img').forEach((img) => {
  img.addEventListener('click', function () {
    // Get all images from the same carousel
    allImages = Array.from(this.closest('.carousel').querySelectorAll('.carousel-img'));
    currentIndex = allImages.indexOf(this); // Identify clicked image index

    setPreviewImage(currentIndex); // Show selected image
    modal.classList.add('active'); // Display modal

    startAutoSlide(); // Start auto-slide
  });
});

// Navigation buttons
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

function showNextImage() {
  currentIndex = (currentIndex + 1) % allImages.length;
  setPreviewImage(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  setPreviewImage(currentIndex);
}

// Close modal via close button
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  stopAutoSlide();
});

// Close modal by clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    stopAutoSlide();
  }
});

// ESC + Arrow navigation via keyboard
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('active')) {
    if (e.key === 'Escape') {
      modal.classList.remove('active');
      stopAutoSlide();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  }
});

// Auto Slide every 3 seconds
function startAutoSlide() {
  autoSlideInterval = setInterval(showNextImage, 3000);
}

// Stop Auto Slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Pause auto-slide on hover
modal.addEventListener('mouseenter', stopAutoSlide);
modal.addEventListener('mouseleave', startAutoSlide);

