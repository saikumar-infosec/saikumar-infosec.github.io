# Project Tasks & Milestones

**Status**: Planning Phase  
**Last Updated**: 2026-05-16

---

## Phase 1: Foundation (Target: Week 1-2)

### Core System Development

- [ ] Create `core/` directory structure
- [ ] Implement `VulnerabilityPage` template class (ES6)
- [ ] Create `PayloadDatabase` class for centralized storage
- [ ] Develop reusable UI components (breadcrumb, nav, footer)
- [ ] Refactor `style.css` → modular `core/styles/`
- [ ] Refactor `script.js` → `core/` modules

### Payload Database Infrastructure

- [ ] Design payload JSON schema
- [ ] Create `payloads/database/web/` structure
- [ ] Seed initial payloads from existing 58 pages
- [ ] Build payload indexing system (by-vulnerability, by-framework)
- [ ] Create payload search utility

### Migrate Existing Pages

- [ ] Audit all 58 existing HTML files
- [ ] Create migration strategy
- [ ] Refactor to use `VulnerabilityPage` template
- [ ] Test all links and navigation
- [ ] Verify visual consistency

### Navigation & UX

- [ ] Implement sidebar navigation (all modules)
- [ ] Update breadcrumb navigation
- [ ] Mobile responsive menu (hamburger)
- [ ] Theme switcher (dark/light)
- [ ] Sticky navigation header

### Testing & Validation

- [ ] Unit tests for core classes
- [ ] Visual regression testing (58 pages)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness check
- [ ] Performance baseline (Lighthouse)

---

## Phase 2: Payload Intelligence (Target: Week 3-4)

### Payload Database Expansion

- [ ] Collect payloads from existing pages
- [ ] Normalize into JSON schema
- [ ] Target: 1000+ payloads
- [ ] Categorize by: vulnerability, framework, tool, encoding

### Payload Generators

- [ ] Implement mutation engine (encoding variations)
- [ ] Build WAF bypass generator (CloudFlare, AWS WAF, ModSecurity)
- [ ] Create payload mixer (context-aware variants)
- [ ] Develop tool formatters (Burp, sqlmap, nuclei, ffuf)

### Advanced Payloads

- [ ] Blind/OOB payloads (time-based, DNS exfil)
- [ ] Polyglots (XSS + SQLi dual payloads)
- [ ] CSP bypass collection
- [ ] Framework-specific payloads (Laravel, Django, Express, etc.)
- [ ] Database-specific payloads (MySQL, PostgreSQL, MSSQL, Oracle)

### Payload Search & Discovery

- [ ] Implement client-side payload search
- [ ] Tag filtering system
- [ ] Framework filtering
- [ ] WAF type filtering

---

## Phase 3: Content Expansion & AI (Target: Week 5-8)

### Web Security Coverage (30+ vulnerabilities)

- [ ] SQL Injection (union, time-based, blind, error-based, NoSQL)
- [ ] XSS (stored, reflected, DOM, WAF-bypassed)
- [ ] SSRF (basic, cloud pivots)
- [ ] SSTI (Jinja, Mako, Velocity, Smarty)
- [ ] XXE (XML, DTD, parameter entity)
- [ ] IDOR/BOLA (horizontal, vertical)
- [ ] CSRF (token validation, SameSite)
- [ ] CORS (misconfiguration)
- [ ] LFI/RFI (wrapper abuse)
- [ ] File Upload (extension, MIME, polyglot)
- [ ] Path Traversal (encoding tricks)
- [ ] Command Injection (OS-specific)
- [ ] Request Smuggling (CL.TE, TE.CL, TE.TE)
- [ ] Cache Poisoning
- [ ] Host Header Injection
- [ ] Open Redirect
- [ ] Clickjacking
- [ ] Prototype Pollution
- [ ] Deserialization
- [ ] JWT Attacks
- [ ] OAuth Flaws
- [ ] GraphQL Abuse
- [ ] WebSocket Issues
- [ ] Race Conditions
- [ ] Business Logic Abuse
- [ ] Session Flaws
- [ ] MFA Bypasses
- [ ] Auth Bypasses
- [ ] Access Control Flaws
- [ ] WAF Bypass Techniques

### API Security Module (10+ topics)

- [ ] BOLA/BFLA exploitation
- [ ] JWT attacks in APIs
- [ ] OAuth flaws
- [ ] GraphQL abuse (queries, mutations, introspection)
- [ ] REST API abuse (method override, param pollution)
- [ ] SOAP abuse (XXE, XML bombing)
- [ ] gRPC abuse (reflection, TLS)
- [ ] API Fuzzing
- [ ] Mass Assignment
- [ ] Rate Limit Bypasses

### Mobile Security Module

- [ ] Android APK analysis & exploitation
- [ ] iOS IPA analysis & exploitation
- [ ] SSL Pinning bypasses
- [ ] Root detection bypasses
- [ ] Runtime instrumentation
- [ ] WebView exploitation
- [ ] APK tampering & repackaging
- [ ] Intent-based vulnerabilities
- [ ] Insecure storage

### Cloud Security Module

- [ ] AWS (IAM, S3, Lambda, metadata)
- [ ] Azure (AppServices, Key Vault, RBAC)
- [ ] GCP (Storage, Compute, Service Accounts)
- [ ] Kubernetes exploitation
- [ ] Docker escape
- [ ] CI/CD pipeline attacks
- [ ] Terraform/IaC flaws
- [ ] Serverless exploitation

### Active Directory Module

- [ ] Kerberoasting & ASP-REP
- [ ] NTLM relay attacks
- [ ] BloodHound exploitation
- [ ] Delegation abuse
- [ ] ADCS abuse
- [ ] Lateral movement
- [ ] Privilege escalation
- [ ] DNS abuse

### Network/Wi-Fi Module

- [ ] Wi-Fi attacks (WPA, Evil Twin, Rogue AP)
- [ ] MITM attacks
- [ ] SMB abuse
- [ ] Protocol abuse
- [ ] Network enumeration
- [ ] Pivoting & tunneling
- [ ] VLAN hopping

### LLM Security Module

- [ ] Prompt injection (direct, indirect)
- [ ] Jailbreaks & leakage
- [ ] RAG poisoning
- [ ] Tool & agent abuse
- [ ] Memory poisoning
- [ ] Model leakage
- [ ] Prompt exfiltration

### Web3 Security Module

- [ ] Smart contract vulnerabilities
- [ ] Wallet attacks
- [ ] DeFi exploitation
- [ ] RPC abuse
- [ ] Signature replay
- [ ] Blockchain recon

### Secure Code Review (8+ languages)

- [ ] Java (Spring, deserialization)
- [ ] Python (Flask, Django)
- [ ] PHP (Laravel, WordPress)
- [ ] Node.js (Express)
- [ ] JavaScript (React)
- [ ] Go (net/http)
- [ ] C# / .NET
- [ ] Kotlin & Swift

### AI Payload Generation System

- [ ] Claude API integration
- [ ] Request analysis (HTTP, APK, code, config)
- [ ] Context extraction (framework, WAF, DB, encoding)
- [ ] Prompt engineering for payloads
- [ ] Prompt caching setup
- [ ] Tool formatting (Burp, sqlmap, nuclei)
- [ ] Attack chain recommendations
- [ ] Exploit suggestion system

---

## Phase 4: Attack Chains, Labs, Automation (Target: Week 9-12)

### Attack Chains System

- [ ] Design chain visualization
- [ ] Web to RCE chains (10+)
- [ ] API to data breach (10+)
- [ ] Cloud to lateral movement (10+)
- [ ] AD to domain compromise (10+)
- [ ] Link payloads across chains
- [ ] Document evasion per chain

### OSCP-Style Labs

- [ ] Linux enumeration (5+)
- [ ] Privilege escalation (5+)
- [ ] Web exploitation (5+)
- [ ] Active Directory (5+)
- [ ] Cloud labs (3+)
- [ ] Step-by-step guides
- [ ] Answer keys & walkthroughs

### Tool Automation Workflows

- [ ] Burp Suite templates
- [ ] sqlmap profiles
- [ ] Nuclei templates (20+)
- [ ] ffuf wordlists
- [ ] Custom Python scripts (10+)
- [ ] PowerShell AD scripts
- [ ] Bash enumeration
- [ ] Tool chaining examples

---

## Phase 5: Search, Intelligence, Scaling (Target: Week 13-16)

### Search & Indexing

- [ ] Full-text index (vulns + payloads)
- [ ] Keyword-based search
- [ ] Faceted search (severity, framework)
- [ ] Fuzzy matching
- [ ] Search UI

### Intelligence Features

- [ ] Payload recommendations
- [ ] Vulnerability trend analysis
- [ ] CVE mapping
- [ ] Most-effective payloads
- [ ] Framework intelligence

### Performance Optimization

- [ ] Lazy-load payloads
- [ ] Client-side caching
- [ ] Image optimization
- [ ] CSS/JS bundling
- [ ] Lighthouse 90+

### Documentation

- [ ] CONTRIBUTING.md
- [ ] API documentation
- [ ] Payload schema docs
- [ ] Automation examples
- [ ] Coding standards

---

## Success Criteria

| Phase | Metric | Target |
|-------|--------|--------|
| 1 | Pages refactored | 58/58 |
| 1 | Code duplication | 0% |
| 1 | Time per new page | < 5 min |
| 2 | Payloads in DB | 1000+ |
| 2 | Mutation variants | 5+ per payload |
| 3 | Web vulns complete | 30+ |
| 3 | Total vulnerabilities | 70+ |
| 3 | AI generations/day | 100+ |
| 4 | Attack chains | 50+ |
| 4 | Lab exercises | 25+ |
| 5 | Search latency | < 500ms |
| 5 | Page load | < 2s |
| 5 | Pages indexed | 10,000+ |

---

## Key Decisions

1. **Vanilla JS** — No framework dependency, faster, GitHub Pages compatible
2. **JSON Payloads** — Git-friendly, version control, offline access
3. **Static Site** — Free hosting, fast, GitHub integration
4. **Claude API** — Most capable, prompt caching support
5. **Dark UI** — Professional aesthetic, accessibility-aware

---

**Current Phase**: Planning & Architecture  
**Next Checkpoint**: End of Phase 1 (Week 2)  
**Status**: Ready for Phase 1 kickoff
