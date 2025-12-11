/* script.js
   - theme toggle (dark/light)
   - smooth scroll for in-page nav links
   - avatar gentle float animation
   - small defensive fixes for images overflowing
*/

/* THEME TOGGLE */
(function () {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Load preference (optional)
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') {
    root.style.setProperty('--bg', '#f6f9ff');
    root.style.setProperty('--text', '#0b1b2b');
    btn.textContent = '☀️';
  } else {
    btn.textContent = '🌙';
  }

  btn.addEventListener('click', () => {
    const current = btn.textContent.trim();
    if (current === '🌙') {
      // switch to light-ish quick variant
      root.style.setProperty('--bg', '#f6f9ff');
      root.style.setProperty('--text', '#0b1b2b');
      btn.textContent = '☀️';
      localStorage.setItem('site-theme', 'light');
    } else {
      // restore dark
      root.style.setProperty('--bg', '#071226');
      root.style.setProperty('--text', '#e6eef6');
      btn.textContent = '🌙';
      localStorage.setItem('site-theme', 'dark');
    }
  });
})();

/* SMOOTH SCROLL FOR ANCHORS */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 64,
            behavior: 'smooth'
          });
        }
      }
    });
  });
})();

/* GENTLE FLOAT FOR HERO AVATAR (pure JS) */
(function () {
  const avatar = document.querySelector('.hero-avatar');
  if (!avatar) return;
  let angle = 0;
  function float() {
    angle += 0.02;
    const x = Math.sin(angle) * 6; // horizontal
    const y = Math.cos(angle * 1.2) * 6; // vertical
    avatar.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(float);
  }
  requestAnimationFrame(float);
})();

/* DEFENSIVE: ensure large images don't overflow on mobile */
(function () {
  document.querySelectorAll('img').forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.addEventListener('load', () => {
      img.style.display = 'block';
    });
  });
})();