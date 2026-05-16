/**
 * Reusable UI Components
 * Breadcrumb, navigation, headers, footers
 */

class UIComponents {
  /**
   * Create breadcrumb navigation
   */
  static createBreadcrumb(crumbs) {
    return `
      <div class="breadcrumb">
        ${crumbs.map((crumb, idx) => {
          if (idx === crumbs.length - 1) {
            return `<span>${crumb.name}</span>`;
          }
          return `<a href="${crumb.url}">${crumb.name}</a>`;
        }).join(' / ')}
      </div>
    `;
  }

  /**
   * Create severity badge
   */
  static createSeverityBadge(severity) {
    const colors = {
      critical: { bg: 'rgba(255, 68, 68, 0.2)', text: '#ff4444' },
      high: { bg: 'rgba(255, 136, 0, 0.2)', text: '#ff8800' },
      medium: { bg: 'rgba(255, 187, 0, 0.2)', text: '#ffbb00' },
      low: { bg: 'rgba(0, 255, 136, 0.2)', text: '#00ff88' }
    };

    const color = colors[severity] || colors.critical;
    const label = severity.charAt(0).toUpperCase() + severity.slice(1);

    return `
      <span class="severity-badge" style="background: ${color.bg}; color: ${color.text}">
        <i class="fas fa-exclamation-triangle"></i> ${label} Severity
      </span>
    `;
  }

  /**
   * Create payload grid
   */
  static createPayloadGrid(payloads) {
    return `
      <div class="payload-grid">
        ${payloads.map(p => `
          <div class="payload-item" title="Click to copy">
            <code>${this.escapeHtml(p)}</code>
            <button class="copy-btn" onclick="navigator.clipboard.writeText('${this.escapeHtml(p)}'); alert('Copied!')">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Create code block with copy button
   */
  static createCodeBlock(code, language = '') {
    const id = `code-${Date.now()}`;
    return `
      <div class="code-block" id="${id}">
        <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('${id}').innerText); alert('Copied!')">
          <i class="fas fa-copy"></i> Copy
        </button>
        <pre><code class="language-${language}">${this.escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  /**
   * Create vulnerability box (highlighted content)
   */
  static createVulnerabilityBox(title, content) {
    return `
      <div class="vulnerability-box">
        <strong>${title}</strong>
        <p>${content}</p>
      </div>
    `;
  }

  /**
   * Create mitigation box
   */
  static createMitigationBox(title, content) {
    return `
      <div class="mitigation-box">
        <strong>${title}</strong>
        <p>${content}</p>
      </div>
    `;
  }

  /**
   * Create meta grid (CWE, OWASP, CVSS, etc.)
   */
  static createMetaGrid(meta) {
    return `
      <div class="meta-grid">
        ${Object.entries(meta).map(([key, value]) => `
          <div class="meta-item">
            <strong>${key}:</strong>
            <span>${Array.isArray(value) ? value.join(', ') : value}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Escape HTML entities
   */
  static escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIComponents;
}
