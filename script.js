// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollPos = window.scrollY + 90;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector('.nav-link[href="#' + id + '"]');
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
onScroll();

// Theme toggle (dark is default)
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('sk-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

const storedTheme = localStorage.getItem('sk-theme');
setTheme(storedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Fade-in animation on scroll using IntersectionObserver
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
