// ====================================
// THEME TOGGLE
// ====================================
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

// init theme from localStorage
const storedTheme = localStorage.getItem("theme") || "dark";
setTheme(storedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ====================================
// SMOOTH SCROLL + ACTIVE NAV
// ====================================
const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

const sections = document.querySelectorAll("section[id]");

function setActiveNavOnScroll() {
  const scrollPos = window.scrollY + 120;
  let currentId = "home";

  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      currentId = sec.id;
    }
  });

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active");
    } else if (href.startsWith("#")) {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavOnScroll);
setActiveNavOnScroll();

// ====================================
// E) SCROLL PROGRESS BAR
// ====================================
const progressBar = document.querySelector(".scroll-progress-bar");

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// ====================================
// D) SCROLL-REVEAL (IntersectionObserver)
// ====================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all immediately
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ====================================
// YEAR IN FOOTER
// ====================================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}