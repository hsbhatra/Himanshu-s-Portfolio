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