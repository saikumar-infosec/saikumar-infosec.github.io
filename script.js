// script.js
// Small helpers: active menu & current year

document.addEventListener("DOMContentLoaded", () => {
  // 1) set footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2) highlight nav link based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - 120; // offset for sticky nav
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // run once on load
});
