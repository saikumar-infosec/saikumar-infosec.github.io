/**
 * Core JavaScript
 * Theme toggling, mobile menu, utility functions
 */

// Theme Management
class ThemeManager {
  constructor() {
    this.storageKey = 'theme-preference';
    this.init();
  }

  init() {
    const saved = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');

    this.setTheme(theme);
    this.setupToggle();
  }

  setTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('light', !isDark);
    localStorage.setItem(this.storageKey, theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      const icon = btn.querySelector('i');
      const text = btn.textContent.trim().split(' ')[1] || 'Dark';
      if (icon) {
        icon.classList.toggle('fa-moon', isDark);
        icon.classList.toggle('fa-sun', !isDark);
      }
      btn.textContent = isDark ? ' Dark' : ' Light';
    }
  }

  setupToggle() {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('light');
        this.setTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  toggle() {
    const isDark = !document.body.classList.contains('light');
    this.setTheme(isDark ? 'light' : 'dark');
  }
}

// Mobile Menu Management
class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById('mobileMenuBtn');
    this.navLinks = document.getElementById('navLinks');
    this.init();
  }

  init() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.toggle());
    }

    if (this.navLinks) {
      this.navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.close();
        }
      });
    }
  }

  toggle() {
    this.navLinks?.classList.toggle('show');
  }

  open() {
    this.navLinks?.classList.add('show');
  }

  close() {
    this.navLinks?.classList.remove('show');
  }
}

// Utility Functions
const Utils = {
  /**
   * Copy text to clipboard
   */
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy');
    });
  },

  /**
   * Format code blocks for display
   */
  formatCode(code) {
    return code
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Escape HTML entities
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  },

  /**
   * Get URL parameter
   */
  getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  /**
   * Smooth scroll to element
   */
  scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  new ThemeManager();

  // Initialize mobile menu
  new MobileMenu();

  console.log('Core JS loaded - Theme & Mobile Menu ready');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Theme toggle: Alt + T
  if (e.altKey && e.key === 't') {
    const tm = new ThemeManager();
    tm.toggle();
  }

  // Mobile menu toggle: Alt + M
  if (e.altKey && e.key === 'm') {
    const mm = new MobileMenu();
    mm.toggle();
  }
});
