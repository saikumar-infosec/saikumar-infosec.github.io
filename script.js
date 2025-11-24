// theme toggle
const htmlEl = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    htmlEl.setAttribute("data-theme", stored);
  }

  const refreshIcon = () => {
    const mode = htmlEl.getAttribute("data-theme");
    themeToggle.textContent = mode === "light" ? "🌙" : "☀️";
  };
  refreshIcon();

  themeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    refreshIcon();
  });
}

// smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  });
});