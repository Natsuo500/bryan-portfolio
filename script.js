/* ==========================================================
   script.js controls how your site BEHAVES: the phone menu,
   the highlighted menu link, and the image viewer.

   Basic reading guide:
   - "const x = ..." saves something under a name so we can use it later
   - document.querySelector('.name') finds an element on the page by its class
   - addEventListener('click', ...) means "when this is clicked, run this code"
   ========================================================== */

/* ---------- Find the parts of the page we need ---------- */
const menuToggle = document.querySelector('.menu-toggle');   // the ☰ button
const navLinks = document.querySelector('.nav-links');       // the menu container
const links = document.querySelectorAll('.nav-link');        // ALL the individual menu links

/* ---------- Phone menu ---------- */

// A small reusable helper that closes the menu and resets the button.
function closeMenu() {
  navLinks.classList.remove('open');                    // the CSS hides the menu when "open" is missing
  menuToggle.setAttribute('aria-expanded', 'false');    // tells screen readers the menu is closed
  menuToggle.textContent = '☰';                         // changes the button back to ☰
}

// Clicking the ☰ button opens or closes the menu.
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');     // toggle = add the class if missing, remove it if present
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';          // shows ✕ when open, ☰ when closed
});

// Clicking any menu link closes the menu (so it doesn't cover the page after you jump to a section).
links.forEach((link) => link.addEventListener('click', closeMenu));

// Pressing the Escape key closes the menu and returns focus to the button.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

/* ---------- Highlight the menu link for the section you're viewing ---------- */

// Gives the "active" class to the link matching the given section id, and removes it from the rest.
function setActive(id) {
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

// IntersectionObserver is a built-in browser tool that tells us when an element
// scrolls into view. The "if" makes sure it exists in the visitor's browser first.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);   // this section is on screen: highlight its link
    });
  // rootMargin shrinks the "detection zone" to a thin band across the middle of the screen
  // (ignoring the top 40% and bottom 55%), so a section only counts as "current"
  // once it reaches the middle.
  }, { rootMargin: '-40% 0px -55% 0px' });

  // Watch every <section> inside <main> that has an id.
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

/* ---------- Lightbox: click a gallery image to see it larger ---------- */
const lightbox = document.querySelector('.lightbox');                    // the <dialog> element
const lightboxImg = lightbox.querySelector('img');                       // the big image inside it
const lightboxCaption = lightbox.querySelector('.lightbox-caption');     // the caption text inside it

// One listener on the whole page handles every click. This way it also works for
// images you add later, without any extra code.
document.addEventListener('click', (event) => {
  // Did the click land on (or inside) a gallery image button?
  const zoom = event.target.closest('.gallery .zoom');
  if (zoom) {
    const img = zoom.querySelector('img');
    const caption = zoom.closest('figure').querySelector('figcaption');
    lightboxImg.src = img.currentSrc || img.src;               // copy the clicked image into the viewer
    lightboxImg.alt = img.alt;                                 // and its description
    lightboxCaption.textContent = caption ? caption.textContent : '';   // copy the caption (or leave blank)
    lightbox.showModal();                                      // open the viewer
    return;                                                    // stop here; nothing else to check
  }

  // Otherwise: did they click the ✕ button, or the dark area outside the picture?
  if (event.target.closest('.lightbox-close') || event.target === lightbox) {
    lightbox.close();
  }
});