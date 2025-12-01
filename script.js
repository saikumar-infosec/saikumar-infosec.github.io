// script.js
// Basic UI interactions: theme toggle, smooth scroll, current year in footer.

// Toggle light/dark theme and store in localStorage
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
updateThemeButton();

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('site-theme', next);
  updateThemeButton();
});

function updateThemeButton(){
  const t = root.getAttribute('data-theme') || 'dark';
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// Put current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Optional: highlight active nav item when scrolling
const navLinks = document.querySelectorAll('.main-nav a');
const sections = Array.from(navLinks).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

function onScrollActive() {
  const y = window.scrollY + 120; // offset for header
  let activeIndex = -1;
  sections.forEach((sec, idx) => {
    if (sec.offsetTop <= y) activeIndex = idx;
  });
  navLinks.forEach((a,i)=> a.classList.toggle('active', i === activeIndex));
}
window.addEventListener('scroll', onScrollActive);
onScrollActive();
