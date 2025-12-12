/* THEME TOGGLE */
(function () {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') {
    if (btn) btn.textContent = '☀️';
    root.style.setProperty('--bg', '#f6f9ff');
    root.style.setProperty('--text', '#0b1b2b');
  } else {
    if (btn) btn.textContent = '🌙';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const current = btn.textContent.trim();
      if (current === '🌙') {
        root.style.setProperty('--bg', '#f6f9ff');
        root.style.setProperty('--text', '#0b1b2b');
        btn.textContent = '☀️';
        localStorage.setItem('site-theme', 'light');
      } else {
        root.style.setProperty('--bg', '#071226');
        root.style.setProperty('--text', '#e6eef6');
        btn.textContent = '🌙';
        localStorage.setItem('site-theme', 'dark');
      }
    });
  }
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
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        }
      }
    });
  });
})();

/* HERO AVATAR FLOAT (gentle) */
(function () {
  const avatar = document.querySelector('.hero-avatar');
  if (!avatar) return;
  let angle = 0;
  function float() {
    angle += 0.02;
    const x = Math.sin(angle) * 6;
    const y = Math.cos(angle * 1.2) * 6;
    avatar.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(float);
  }
  requestAnimationFrame(float);
})();

/* IMAGE GUARD & fallback */
(function () {
  document.querySelectorAll('img').forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.addEventListener('load', () => { img.style.display = 'block'; });
  });

  const heroImg = document.querySelector('.avatar-inner img');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      const fb = document.getElementById('avatarFallback');
      if (fb) fb.style.display = 'flex';
    });
    // if already failed
    if (heroImg.complete && heroImg.naturalWidth === 0) {
      const fb = document.getElementById('avatarFallback');
      if (fb) fb.style.display = 'flex';
    }
  }
})();
