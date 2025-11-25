// ================= THEME TOGGLE =================

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const stored = localStorage.getItem("saikumar-theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = stored || (prefersDark ? "dark" : "dark");
  root.setAttribute("data-theme", initialTheme);
  toggle.textContent = initialTheme === "dark" ? "🌙" : "☀️";

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("saikumar-theme", next);
    toggle.textContent = next === "dark" ? "🌙" : "☀️";
  });
})();

// ================= SMOOTH SCROLL FOR NAV LINKS =================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const yOffset = -70;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop + yOffset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  });
});

// ================= FADE-IN ON SCROLL =================

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

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ================= FOOTER YEAR =================

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}