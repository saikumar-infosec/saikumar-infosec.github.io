// script.js

document.addEventListener('DOMContentLoaded', () => {

  /* ============== THEME TOGGLE ============== */
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    root.setAttribute('data-theme', storedTheme);
  }

  function updateToggleIcon() {
    const theme = root.getAttribute('data-theme') || 'dark';
    toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  updateToggleIcon();

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon();
  });

  /* ============== SMOOTH SCROLL (extra) ============== */
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ============== SCROLL REVEAL ============== */
  const revealEls = document.querySelectorAll(
    '.section, .card, .timeline-item, .project-card, .lab-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12
  });

  revealEls.forEach(el => observer.observe(el));

  /* ============== FOOTER YEAR ============== */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});