// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = darkToggle.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i> Light';
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    darkToggle.innerHTML = '<i class="fas fa-moon"></i> Dark';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});

// Download Resume button (placeholder)
const resumeBtn = document.getElementById('downloadResumeBtn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download ready. Replace this with your actual PDF file path.');
  });
}

// Contact form handler
const sendBtn = document.getElementById('sendMessageBtn');
const feedback = document.getElementById('formFeedback');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name || !email || !message) {
      feedback.innerHTML = '❌ Please fill in all fields.';
      feedback.style.color = '#dc2626';
      setTimeout(() => { feedback.innerHTML = ''; }, 3000);
      return;
    }

    feedback.innerHTML = `✓ Thank you ${name}, Saikumar will respond to ${email} shortly.`;
    feedback.style.color = '#10b981';
    
    // Clear form
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';

    setTimeout(() => { feedback.innerHTML = ''; }, 4000);
  });
}
