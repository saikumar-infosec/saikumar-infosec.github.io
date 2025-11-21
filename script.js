// theme toggle (auto + manual)
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('site-theme');
  const systemPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = stored || (systemPref ? 'dark' : 'light');
  if(current === 'dark') document.documentElement.setAttribute('data-theme','dark');

  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('site-theme', isDark ? 'light' : 'dark');
  });

  // set footer year
  document.getElementById('year').innerText = new Date().getFullYear();

  // small fade-in for sections
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section, .card, .project-card, .timeline-item').forEach((el, i) => {
      el.style.animationDelay = (i*75) + 'ms';
      el.classList.add('fade-in');
    });

    // optional typing effect in hero (if you want)
    const title = document.querySelector('.hero-title');
    const words = ['Offensive Security & VAPT Specialist'];
    let idx = 0;
    if(title){
      const original = title.textContent;
      // simple typing - show then revert to static
      title.textContent = '';
      let pos = 0;
      const typer = setInterval(() => {
        title.textContent += original[pos++] || '';
        if(pos > original.length) clearInterval(typer);
      }, 12);
    }
  });

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').substring(1);
      if(!id) return window.scrollTo({top:0,behavior:'smooth'});
      const node = document.getElementById(id);
      if(node) node.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

})();
