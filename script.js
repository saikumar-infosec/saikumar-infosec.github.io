// Basic interactive behaviors (theme toggle, mobile nav, smooth scroll, reveal on scroll)

(function(){
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  // --- Theme (persist to localStorage)
  const saved = localStorage.getItem('site-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  });

  // Set icon correctly on load
  themeToggle.textContent = (document.documentElement.getAttribute('data-theme') === 'light') ? '☀️' : '🌙';

  // --- Mobile nav
  mobileToggle.addEventListener('click', () => {
    if (body.classList.contains('mobile-open')) {
      body.classList.remove('mobile-open');
    } else {
      body.classList.add('mobile-open');
    }
  });

  // close mobile nav when a link clicked
  mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && body.classList.contains('mobile-open')) {
      body.classList.remove('mobile-open');
    }
  });

  // --- Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Reveal on scroll (simple)
  const reveals = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if (ent.isIntersecting) {
        ent.target.classList.add('visible');
        ent.target.style.animationDelay = '0.05s';
        ent.target.style.animationFillMode = 'forwards';
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

})();