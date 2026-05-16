/**
 * PayloadDatabase
 * Centralized payload storage and querying
 * Supports indexed lookups by vulnerability, framework, encoding
 */

class PayloadDatabase {
  constructor() {
    this.payloads = {};
    this.indexes = {
      byVulnerability: {},
      byFramework: {},
      byCategory: {},
      byTool: {},
      byWafBypass: {}
    };
  }

  /**
   * Add payload to database and update indexes
   */
  addPayload(payload) {
    const id = payload.id || `${payload.vulnerability}-${Date.now()}`;

    this.payloads[id] = {
      id,
      vulnerability: payload.vulnerability,
      category: payload.category || 'basic',
      payload: payload.payload,
      context: payload.context || {},
      wafBypass: payload.wafBypass || false,
      variants: payload.variants || [],
      toolSupport: payload.toolSupport || [],
      impact: payload.impact || '',
      references: payload.references || [],
      ...payload
    };

    this.updateIndexes(id);
    return id;
  }

  /**
   * Batch add payloads
   */
  addPayloads(payloads) {
    return payloads.map(p => this.addPayload(p));
  }

  /**
   * Query payloads by criteria
   */
  query(criteria = {}) {
    let results = Object.values(this.payloads);

    if (criteria.vulnerability) {
      results = results.filter(p => p.vulnerability === criteria.vulnerability);
    }

    if (criteria.category) {
      results = results.filter(p => p.category === criteria.category);
    }

    if (criteria.framework) {
      results = results.filter(p =>
        p.context.framework && p.context.framework.includes(criteria.framework)
      );
    }

    if (criteria.tool) {
      results = results.filter(p => p.toolSupport.includes(criteria.tool));
    }

    if (criteria.wafBypass) {
      results = results.filter(p => p.wafBypass === criteria.wafBypass);
    }

    if (criteria.limit) {
      results = results.slice(0, criteria.limit);
    }

    return results;
  }

  /**
   * Get payloads by vulnerability
   */
  getByVulnerability(vuln) {
    return this.query({ vulnerability: vuln });
  }

  /**
   * Get payloads by framework
   */
  getByFramework(framework) {
    return this.query({ framework });
  }

  /**
   * Get WAF bypass payloads
   */
  getWafBypass(vuln) {
    return this.query({ vulnerability: vuln, wafBypass: true });
  }

  /**
   * Get payload variants (mutations, encodings)
   */
  getVariants(payloadId) {
    const payload = this.payloads[payloadId];
    if (!payload) return [];

    return payload.variants.map(variantId => this.payloads[variantId]).filter(Boolean);
  }

  /**
   * Update indexes for faster lookups
   */
  updateIndexes(payloadId) {
    const p = this.payloads[payloadId];

    // Index by vulnerability
    if (!this.indexes.byVulnerability[p.vulnerability]) {
      this.indexes.byVulnerability[p.vulnerability] = [];
    }
    this.indexes.byVulnerability[p.vulnerability].push(payloadId);

    // Index by framework
    if (p.context.framework) {
      const fw = p.context.framework;
      if (!this.indexes.byFramework[fw]) {
        this.indexes.byFramework[fw] = [];
      }
      this.indexes.byFramework[fw].push(payloadId);
    }

    // Index by category
    if (!this.indexes.byCategory[p.category]) {
      this.indexes.byCategory[p.category] = [];
    }
    this.indexes.byCategory[p.category].push(payloadId);

    // Index by tool support
    p.toolSupport.forEach(tool => {
      if (!this.indexes.byTool[tool]) {
        this.indexes.byTool[tool] = [];
      }
      this.indexes.byTool[tool].push(payloadId);
    });

    // Index WAF bypass status
    if (p.wafBypass) {
      if (!this.indexes.byWafBypass[p.vulnerability]) {
        this.indexes.byWafBypass[p.vulnerability] = [];
      }
      this.indexes.byWafBypass[p.vulnerability].push(payloadId);
    }
  }

  /**
   * Get payload count by vulnerability
   */
  getStats() {
    const stats = {
      totalPayloads: Object.keys(this.payloads).length,
      byVulnerability: {},
      byFramework: {},
      byCategory: {},
      wafBypassCount: 0
    };

    Object.entries(this.indexes.byVulnerability).forEach(([vuln, ids]) => {
      stats.byVulnerability[vuln] = ids.length;
    });

    Object.entries(this.indexes.byFramework).forEach(([fw, ids]) => {
      stats.byFramework[fw] = ids.length;
    });

    Object.entries(this.indexes.byCategory).forEach(([cat, ids]) => {
      stats.byCategory[cat] = ids.length;
    });

    stats.wafBypassCount = Object.values(this.indexes.byWafBypass)
      .reduce((sum, arr) => sum + arr.length, 0);

    return stats;
  }

  /**
   * Export database as JSON
   */
  toJSON() {
    return {
      payloads: this.payloads,
      indexes: this.indexes,
      stats: this.getStats()
    };
  }
}

// Global instance
const payloadDB = new PayloadDatabase();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PayloadDatabase, payloadDB };
}
