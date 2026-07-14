// ===== Year in footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

function openMenu(){
  navLinks.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  navLinks.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
}
if (navClose) navClose.addEventListener('click', closeMenu);
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ===== Typed intro line (homepage hero only) =====
const typedTextEl = document.getElementById('typedText');
const lines = [
  'const developer = "Nikhil";',
  'stack: ["React", "Node.js", "TypeScript"]',
  'status: "Open to opportunities"'
];
let lineIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typedTextEl) return;
  const current = lines[lineIndex];

  if (!deleting) {
    typedTextEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedTextEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 30 : 55);
}
if (typedTextEl) typeLoop();

// ===== Animated counters (IntersectionObserver) =====
const counters = document.querySelectorAll('.num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(step);
}

// ===== Contact form (Netlify AJAX submit) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    })
      .then(() => {
        if (formNote) formNote.textContent = "Thanks! Your message has been sent — I'll reply soon.";
        form.reset();
      })
      .catch(() => {
        if (formNote) formNote.textContent = 'Something went wrong. Please email hello@nikhildev.com directly.';
      });
  });
}

// ===== Nav goes solid / hides once you scroll past a simple fixed threshold =====
const nav = document.getElementById('nav');
const floatingNav = document.getElementById('floatingNav');
const floatingNavBurger = document.getElementById('floatingNavBurger');
const SCROLL_THRESHOLD = 400;

function handleScrollState(){
  if (!nav) return;
  const pastThreshold = window.scrollY > SCROLL_THRESHOLD;

  nav.classList.toggle('scrolled', pastThreshold);
  nav.classList.toggle('nav--hidden', pastThreshold);
  if (floatingNav) floatingNav.classList.toggle('visible', pastThreshold);
}

window.addEventListener('scroll', handleScrollState);
handleScrollState(); // run once on load in case the page opens mid-scroll (e.g. after a refresh)



// ===== Scroll-triggered reveal (slide/fade/zoom/blur in) =====
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-zoom, .reveal-blur');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== FAQ accordion (About page) — only one open at a time =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-item__q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(other => other.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== About page: image strip shifts horizontally as you scroll =====
const heroStrip = document.querySelector('.about-hero__strip');
if (heroStrip) {
  const stripItems = heroStrip.querySelectorAll('.about-hero__strip-item');
  window.addEventListener('scroll', () => {
    const rect = heroStrip.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const offset = (progress - 0.5) * 60;
    stripItems.forEach((item, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      item.style.transform = `translateX(${offset * direction}px) scale(1.15)`;
    });
  }, { passive: true });
}

// ===== Work page: category filter =====
const workFilters = document.querySelectorAll('.work-filter');
const workRows = document.querySelectorAll('.work-row');
const blogCards = document.querySelectorAll('.blog-card');

workFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.work-filters');
    group.querySelectorAll('.work-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    workRows.forEach(row => {
      const show = filter === 'all' || row.dataset.category === filter;
      row.classList.toggle('is-hidden', !show);
    });
    blogCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// ===== Floating nav: reveal nav items inline instead of opening a fullscreen menu =====
const floatingNavItems = document.getElementById('floatingNavItems');
if (floatingNavBurger && floatingNavItems) {
  // Measure the true content width once, so the transition animates to an
  // exact value instead of an oversized guess (which felt jerky at the end).
  floatingNavItems.style.width = 'auto';
  const naturalWidth = floatingNavItems.scrollWidth;
  floatingNavItems.style.width = '0px';

  floatingNavBurger.addEventListener('click', () => {
    const isOpen = floatingNavItems.classList.toggle('open');
    floatingNavItems.style.width = isOpen ? naturalWidth + 'px' : '0px';
    floatingNavBurger.classList.toggle('is-open', isOpen);
  });
}
