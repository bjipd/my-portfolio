
document.addEventListener('DOMContentLoaded', () => {

  let currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;

    // Toggle mobile navigation menu
  function toggleMenu() {
    const nav = document.querySelector('nav');
    const toggle = document.querySelector('.menu-toggle');
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
  }
 
  // Attach event listener to hamburger button
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', toggleMenu);

  // Smooth scrolling for nav links
  const navLinks = document.querySelectorAll('#nav_ul li a');

  navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
    
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
        });
      }  

    // Close menu after clicking (on mobile)
    document.querySelector('nav').classList.remove('active');
    document.querySelector('.menu-toggle').classList.remove('active');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', false);
    }
  });
});


const track = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');

let index = 0;
const cardWidth = 330; // card width + margin
const totalCards = document.querySelectorAll('.project-card').length;

function updateSlider() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (index < totalCards - 1) {
    index++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});


// Contact form validation
  const form = document.querySelector('#contact');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const cityInput = document.querySelector('#city');
  const messageInput = document.querySelector('#message');

  // Utility: show error message
  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
      error = document.createElement('span');
      error.classList.add('error-message');
      input.insertAdjacentElement('afterend', error);
    }
    error.textContent = message;
    error.style.color = 'red';
    error.style.fontSize = '0.9rem';
  }

  // Utility: clear error
  function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
      error.textContent = '';
    }
  }

  // Real-time validation
  [nameInput, emailInput, cityInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() === '') {
        showError(input, `${input.name} is required`);
      } else {
        clearError(input);
        if (input.type === 'email') {
          const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
          if (!emailPattern.test(input.value)) {
            showError(input, 'Please enter a valid email address');
          }
        }
      }
    });
  });

  // On submit
  form.addEventListener('submit', (e) => {
    let valid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      valid = false;
    }
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email is required');
      valid = false;
    } else {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        valid = false;
      }
    }
    if (cityInput.value.trim() === '') {
      showError(cityInput, 'City is required');
      valid = false;
    }
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Message is required');
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // stop submission
    } else {
      alert('Thank you! Your message has been sent.');
    }
  });

});