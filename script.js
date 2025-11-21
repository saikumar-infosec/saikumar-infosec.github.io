// script.js — theme toggle, nav toggle, year, QR generator placeholder
(function(){
  // set year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // theme toggle (auto + manual)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function setTheme(t){
    if(t === 'dark'){
      root.setAttribute('data-theme','dark');
      localStorage.setItem('site-theme','dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('site-theme','light');
    }
  }

  // initial theme: system preference or saved
  const saved = localStorage.getItem('site-theme');
  if(saved === 'dark') setTheme('dark');
  else if(saved === 'light') setTheme('light');
  else {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // QR code: static PNG already included at assets/qr.png
  // Optionally we could generate QR via JS library; for now static image works.
})();
