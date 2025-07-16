// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('primary-menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Nav toggle for mobile
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navList.classList.toggle('open');
});

// Theme toggle (persist preference)
function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(!isDark);
});

// Load theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
}

// Carousel functionality
const carousel = document.querySelector('.carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}

// Modal for rule details
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');
const ruleButtons = document.querySelectorAll('.rule-details-btn');

const ruleDetails = {
  'speed-limits': {
    title: 'Speed Limits',
    description: 'Adhering to speed limits is crucial for road safety. Speed limits are set considering road conditions, traffic, and environmental factors to reduce accident risk.'
  },
  'seat-belts': {
    title: 'Seat Belts',
    description: 'Wearing a seat belt significantly reduces injury during accidents. Always buckle up, no matter how short the trip.'
  },
  'no-distracted-driving': {
    title: 'No Distracted Driving',
    description: 'Distracted driving, such as texting or phone calls, greatly increases accident chances. Stay focused and keep your eyes on the road.'
  }
};

ruleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const ruleKey = btn.getAttribute('data-rule');
    const data = ruleDetails[ruleKey];
    if (data) {
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.modal-content').focus();
    }
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
});

// Contact form validation & feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const feedback = document.getElementById('form-feedback');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all required fields.';
      return;
    }

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    // For demo, just clear and show success message
    feedback.style.color = 'green';
    feedback.textContent = 'Thank you for contacting us! We will get back to you soon.';
    contactForm.reset();
  });
}
