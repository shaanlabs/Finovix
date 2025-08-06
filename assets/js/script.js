// Smooth Scrolling for Navbar Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Adjust for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form Validation
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill out all fields!');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }
  
    alert('Your message has been sent! Thank you.');
    e.target.reset(); // Clear form fields
  });
  
  // Dynamic Navbar Background on Scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
  
  // Navbar background style (can be added dynamically for better customization)
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .navbar-scrolled {
        background-color: rgba(0, 0, 0, 0.8) !important;
        transition: background-color 0.3s ease;
      }
    </style>`
  );
  
  // AOS Animation Reinitialization on Resize
  window.addEventListener('resize', () => AOS.refresh());
  
  // Gallery Image Zoom on Hover
  document.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('mouseenter', () => img.classList.add('img-hover'));
    img.addEventListener('mouseleave', () => img.classList.remove('img-hover'));
  });
  
  // Dynamic Image Hover CSS
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .img-hover {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
    </style>`
  );// Smooth Scrolling for Navbar Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Adjust for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '⬆';
  backToTopButton.classList.add('back-to-top', 'btn', 'btn-primary');
  document.body.appendChild(backToTopButton);
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // Form Validation
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill out all fields!');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }
  
    alert('Your message has been sent! Thank you.');
    e.target.reset(); // Clear form fields
  });
  
  // Dynamic Navbar Background on Scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
  
  // Navbar background style (can be added dynamically for better customization)
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .navbar-scrolled {
        background-color: rgba(0, 0, 0, 0.8) !important;
        transition: background-color 0.3s ease;
      }
      .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
    </style>`
  );
  
  // AOS Animation Reinitialization on Resize
  window.addEventListener('resize', () => AOS.refresh());
  
  // Gallery Image Zoom on Hover
  document.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('mouseenter', () => img.classList.add('img-hover'));
    img.addEventListener('mouseleave', () => img.classList.remove('img-hover'));
  });
  
  // Dynamic Image Hover CSS
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .img-hover {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
    </style>`
  );
  
  // Service Section Dynamic Highlight on Hover
  document.querySelectorAll('#services .card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('service-highlight'));
    card.addEventListener('mouseleave', () => card.classList.remove('service-highlight'));
  });
  
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .service-highlight {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
        transition: all 0.3s ease;
      }
    </style>`
  );
  
  // Scroll Progress Indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
  
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        background-color: #007bff;
        z-index: 1000;
        transition: width 0.2s ease;
      }
    </style>`
  );
  // Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.querySelector('header h1');
    typedText.textContent = "Welcome to My Advanced Website!";
  });
  
  // Scroll-Based Animations
  const fadeIns = document.querySelectorAll('.fade-in');
  const scrollEffects = document.querySelectorAll('.scroll-effect');
  
  const observeElements = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold: 0.1 });
  
    elements.forEach(el => observer.observe(el));
  };
  
  observeElements(fadeIns, 'visible');
  observeElements(scrollEffects, 'visible');
  
  // Navbar Change on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
  
  // Scroll to Top Button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.textContent = '⬆️';
  scrollTopBtn.style.position = 'fixed';
  scrollTopBtn.style.bottom = '20px';
  scrollTopBtn.style.right = '20px';
  scrollTopBtn.style.padding = '10px 15px';
  scrollTopBtn.style.border = 'none';
  scrollTopBtn.style.borderRadius = '50%';
  scrollTopBtn.style.backgroundColor = '#f8d210';
  scrollTopBtn.style.color = '#333';
  scrollTopBtn.style.fontSize = '18px';
  scrollTopBtn.style.display = 'none';
  scrollTopBtn.style.cursor = 'pointer';
  scrollTopBtn.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  