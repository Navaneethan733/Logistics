/* ══════════════════════════════════════
   STACKLY – Main JavaScript
   ══════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');

function syncNavDropdownTop() {
  if (window.innerWidth <= 768 && navLinks) {
    navLinks.style.top = navbar.offsetHeight + 'px';
  } else if (navLinks) {
    navLinks.style.top = '';
  }
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  syncNavDropdownTop();
});

window.addEventListener('resize', syncNavDropdownTop);
syncNavDropdownTop();

// ── Hamburger menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
navLinks.querySelectorAll('.nav-link, .btn-cta').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// Close mobile menu when clicking outside navbar
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('open') && !navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }
});

// ── Smooth scroll for nav links ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── Scroll Reveal Animations ─────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── Counter Animation ─────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => {
  counterObserver.observe(el);
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = formatNum(Math.floor(current));
  }, 16);
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K';
  return n.toString();
}

// ── Contact Form ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Quote Requested! <span class="btn-icon">✓</span>';
    btn.style.background = '#10b981';
    showToast();
    setTimeout(() => {
      btn.innerHTML = 'Get Free Quote <span class="btn-icon">↗</span>';
      btn.style.background = '';
      btn.disabled = false;
      document.getElementById('contact-form').reset();
    }, 3000);
  }, 1200);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Parallax effect on hero ───────────────────────────────────
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.25}px)`;
  });
}

// ── Stat card hover glow ──────────────────────────────────────
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(45,212,191,0.12), rgba(255,255,255,0.03))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── Floating dot animation on hero badge ─────────────────────
const dotEl = document.querySelector('.dot');
if (dotEl) {
  setInterval(() => {
    dotEl.style.transform = 'scale(1.5)';
    setTimeout(() => { dotEl.style.transform = 'scale(1)'; }, 400);
  }, 2000);
  dotEl.style.transition = 'transform 0.4s ease';
}

// ── Marquee pause on hover ────────────────────────────────────
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
  marqueeContent.addEventListener('mouseenter', () => {
    marqueeContent.style.animationPlayState = 'paused';
  });
  marqueeContent.addEventListener('mouseleave', () => {
    marqueeContent.style.animationPlayState = 'running';
  });
}

// ── Step hover effect ─────────────────────────────────────────
document.querySelectorAll('.step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.08}s`;
});

// ── Card tilt effect ──────────────────────────────────────────
document.querySelectorAll('.testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
