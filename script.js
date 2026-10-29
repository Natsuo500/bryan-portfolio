
// ========================================
// 1. FIND THE HTML ELEMENTS WE NEED
// ========================================

// Finds the mobile menu button in the HTML.
const menuToggle = document.querySelector('.menu-toggle');

// Finds the navigation container that holds all the links.
const navLinks = document.querySelector('.nav-links');

// Finds every navigation link: Home, About, Art, etc.
const links = document.querySelectorAll('.nav-link');


// ========================================
// 2. OPEN AND CLOSE THE MOBILE MENU
// ========================================

// Runs this function whenever the menu button is clicked.
menuToggle.addEventListener('click', () => {

  // Adds the "open" class if the menu is closed.
  // Removes the "open" class if the menu is already open.
  const isOpen = navLinks.classList.toggle('open');

  // Updates the accessibility information to say
  // whether the menu is currently open or closed.
  menuToggle.setAttribute('aria-expanded', String(isOpen));

  // Changes the button symbol:
  // ☰ means open the menu.
  // ✕ means close the menu.
  menuToggle.textContent = isOpen ? '✕' : '☰';
});


// ========================================
// 3. HANDLE NAVIGATION LINK CLICKS
// ========================================

// Goes through every navigation link individually.
links.forEach((link) => {

  // Adds a click event to each link.
  link.addEventListener('click', () => {

    // Removes the active highlight from every link.
    links.forEach((item) => item.classList.remove('active'));

    // Highlights the link that was just clicked.
    link.classList.add('active');


    // Close the mobile menu after a link is clicked.
    navLinks.classList.remove('open');

    // Update the menu button's accessibility information.
    menuToggle.setAttribute('aria-expanded', 'false');

    // Reset the menu button to the three-line symbol.
    menuToggle.textContent = '☰';
  });
});
