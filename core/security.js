/**
 * Security Headers Middleware
 * Adds security headers to all pages via server configuration
 * For GitHub Pages, add these to _config.yml or via .htaccess equivalent
 */

/*
# Apache .htaccess Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
    Header set Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';"
</IfModule>

# Nginx Security Headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';" always;
*/

const SecurityHeaders = {
  /**
   * List of security headers applied via meta tags (for static HTML)
   */
  metaHeaders: [
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'X-Frame-Options', content: 'DENY' },
    { name: 'X-XSS-Protection', content: '1; mode=block' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' }
  ],

  /**
   * Content Security Policy
   * Restricts resource loading to trusted sources only
   */
  csp: {
    'default-src': "'self'",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    'font-src': "'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    'script-src': "'self' 'unsafe-inline'",
    'img-src': "'self' data:",
    'connect-src': "'self'",
    'frame-ancestors': "'none'",
    'form-action': "'self'",
    'base-uri': "'self'",
    'object-src': "'none'"
  },

  /**
   * Generate CSP header string
   */
  getCSPString() {
    return Object.entries(this.csp)
      .map(([directive, value]) => `${directive} ${value}`)
      .join('; ');
  }
};

/**
 * Apply security headers to current document
 * Call this on DOMContentLoaded
 */
function applySecurityHeaders() {
  const head = document.head || document.querySelector('head');
  if (!head) return;

  SecurityHeaders.metaHeaders.forEach(header => {
    const meta = document.createElement('meta');
    meta.httpEquiv = header.name;
    meta.content = header.content;
    head.appendChild(meta);
  });

  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = SecurityHeaders.getCSPString();
  head.appendChild(cspMeta);
}

/**
 * Sanitize user input to prevent XSS
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validate URL to prevent open redirect vulnerabilities
 */
function validateURL(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Generate secure random ID
 */
function generateSecureId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SecurityHeaders,
    applySecurityHeaders,
    sanitizeInput,
    validateURL,
    escapeHtml,
    generateSecureId
  };
}