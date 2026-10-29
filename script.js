const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

links.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

/* Highlight the nav link for the section currently on screen */
function setActive(id) {
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

/* Lightbox: click a gallery image to view it larger */
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');

document.addEventListener('click', (event) => {
  const zoom = event.target.closest('.gallery .zoom');
  if (zoom) {
    const img = zoom.querySelector('img');
    const caption = zoom.closest('figure').querySelector('figcaption');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.showModal();
    return;
  }

  // Close on the close button or a click on the dark backdrop
  if (event.target.closest('.lightbox-close') || event.target === lightbox) {
    lightbox.close();
  }
});