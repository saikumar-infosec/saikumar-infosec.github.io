// site behaviors: theme toggle, footer year, fade-in, typing, smooth scroll
(function () {
  'use strict';

  // Helper: set/get theme
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('site-theme', theme);
  }

  function initTheme() {
    const stored = localStorage.getItem('site-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  // Footer year
  function setFooterYear() {
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    if (el) el.textContent = y;
  }

  // Entrance animations: staggered fade-in for sections/cards
  function runEntrance() {
    const nodes = document.querySelectorAll('section, .card, .project-card, .timeline-item');
    nodes.forEach((el, i) => {
      el.style.animationDelay = (i * 75) + 'ms';
      el.classList.add('fade-in');
    });
  }

  // Tiny typing effect for hero title (runs once)
  function typeHero() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    const original = title.textContent.trim();
    title.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      title.textContent += original[i] || '';
      i++;
      if (i > original.length) clearInterval(interval);
    }, 12);
  }

  // Smooth scrolling for in-page links
  function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = a.getAttribute('href');
        if (!href || href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); e.preventDefault(); return; }
        const id = href.slice(1);
        const node = document.getElementById(id);
        if (node) {
          e.preventDefault();
          node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Mobile nav simple toggle (if you later add a collapsed nav)
  function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === '1';
      nav.setAttribute('data-open', open ? '0' : '1');
      nav.style.display = open ? '' : 'flex';
    });
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setFooterYear();
    runEntrance();
    typeHero();
    enableSmoothScroll();
    initMobileMenu();

    // optional: reduce heavy images loaded at huge sizes: resize queries could be added here,
    // but CSS img{max-width:100%} solves most issues. If you need automatic downscaling,
    // we can add client-side image resizing or replace with SVG QR.
  });

})();
