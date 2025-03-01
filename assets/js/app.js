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
