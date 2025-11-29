/* script.js — small interactions and responsive menu */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if(!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // if mobile menu open, close it
      if(window.innerWidth <= 700){
        closeMobileNav();
      }
    }
  });
});

// mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('mainNav');

function openMobileNav(){
  nav.style.display = 'flex';
  nav.style.flexDirection = 'column';
  nav.style.position = 'absolute';
  nav.style.right = '20px';
  nav.style.top = '62px';
  nav.style.background = 'linear-gradient(180deg, rgba(3,6,12,0.95), rgba(3,6,12,0.95))';
  nav.style.padding = '12px';
  nav.style.borderRadius = '8px';
  hamburger.textContent = '✕';
}

function closeMobileNav(){
  nav.style.display = 'none';
  hamburger.textContent = '☰';
}

if(hamburger){
  hamburger.addEventListener('click', ()=>{
    if(window.innerWidth > 700) return;
    if(nav.style.display === 'flex') closeMobileNav(); else openMobileNav();
  });
  // ensure nav reset on resize
  window.addEventListener('resize', ()=> {
    if(window.innerWidth > 700){
      nav.style.display = 'flex';
      nav.style.position = 'static';
      nav.style.flexDirection = 'row';
      hamburger.textContent = '☰';
    } else {
      // keep it hidden initially on small screens
      nav.style.display = 'none';
    }
  });
}

// entrance stagger
document.querySelectorAll('.fade-in').forEach((el, idx)=>{
  el.style.animationDelay = (idx * 60) + 'ms';
});