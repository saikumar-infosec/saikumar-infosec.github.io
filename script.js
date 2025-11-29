// small UI behavior: theme toggle, smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
  // theme toggle (persist in localStorage)
  const toggle = document.getElementById('theme-toggle');
  const preferred = localStorage.getItem('site-theme') || 'dark';
  setTheme(preferred);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // smooth scroll for nav links
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // simple entrance animations (stagger)
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.animationDelay = `${i * 80}ms`;
  });
});

function setTheme(t) {
  if (t === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    // subtle light theme override
    document.body.style.background = 'linear-gradient(180deg,#f6fbff,#f4fbff)';
    document.documentElement.style.setProperty('--text', '#0f172a');
    document.documentElement.style.setProperty('--muted', '#6b7280');
    document.getElementById('theme-toggle').textContent = '🌞';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.style.background = 'linear-gradient(180deg,var(--bg-1),var(--bg-2))';
    document.documentElement.style.setProperty('--text', '#e6eef6');
    document.documentElement.style.setProperty('--muted', '#9aa6b2');
    document.getElementById('theme-toggle').textContent = '🌙';
  }
  localStorage.setItem('site-theme', t);
}