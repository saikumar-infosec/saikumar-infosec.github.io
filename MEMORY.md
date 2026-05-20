# Project Memory - Cybersecurity Platform

## Last Updated: 2026-05-17

---

## FINAL PROJECT STRUCTURE

```
project-root/
├── index.html                     ✅ Homepage (portfolio + 10 modules)
├── style.css                     ✅ Main styles (unified #00f5a0)
├── script.js                     ✅ Main scripts
│
├── core/                         ✅ Core infrastructure
│   ├── styles/
│   │   ├── core.css              ✅ Vulnerability template styles
│   │   └── responsive.css
│   ├── vulnerability-template.js
│   ├── payload-database.js
│   ├── components.js
│   └── core.js
│
├── web/                          ✅ 50+ vulnerability pages
│   ├── index.html               ✅ Web security index
│   └── [all vulnerability pages]
│
├── api/                         ✅ 7 API security pages
│   ├── index.html
│   └── [API vulnerability pages]
│
├── mobile/                      ✅ 6 mobile security pages
│   ├── index.html
│   └── [mobile vulnerability pages]
│
├── active-directory/            ✅ AD security (25+ pages)
│   ├── index.html
│   └── [AD attack techniques]
│
├── systems/                     ✅ Systems & Networks (30+ pages)
│   ├── index.html
│   └── [protocol exploitation, privesc, pivoting]
│
├── evasion/                     ✅ AV/EDR bypass (20+ pages)
│   ├── index.html
│   └── [process injection, anti-debug, LOLBAS, C2]
│
├── radio/                       ✅ WiFi/Radio (20+ pages)
│   ├── index.html
│   └── [WEP/WPA attacks, RFID, Bluetooth, BLE]
│
├── osint/                       ✅ OSINT & Recon (20+ pages)
│   ├── index.html
│   └── [email recon, domain enumeration, Shodan]
│
├── cloud/                       ✅ Cloud security (5+ pages)
│   ├── index.html
│   └── [cloud vulnerabilities]
│
├── bugbounty/                   ✅ Bug bounty resources
│   ├── index.html
│   └── [writeups, examples]
│
├── payloads/                    ✅ Payload generator
│   └── index.html
│
├── labs/                        ✅ Security labs
│   └── index.html
│
├── attack-chains/               ✅ Attack chains
│   └── index.html
│
├── network/                     ✅ Network security
│   └── index.html
│
├── windows-security/             ✅ Windows security
│   └── index.html
│
├── scripts/                     ✅ Automation scripts
└── MEMORY.md                    ✅ Project documentation
```

---

## MODULE SUMMARY

| Module | Index | Content Pages | Status |
|--------|-------|---------------|--------|
| Web Security | ✅ | 50+ | Complete |
| API Security | ✅ | 7 | Complete |
| Mobile Security | ✅ | 6 | Complete |
| Active Directory | ✅ | 25+ | Complete |
| Systems & Networks | ✅ | 30+ | Complete |
| Evasion (AV/EDR) | ✅ | 20+ | Complete |
| Radio/WiFi | ✅ | 20+ | Complete |
| OSINT | ✅ | 20+ | Complete |
| Cloud Security | ✅ | 5+ | Complete |
| Bug Bounty | ✅ | 5+ | Complete |

---

## STYLING SYSTEM

Unified color scheme: **#00f5a0** (cyan/green) across ALL pages:
- Homepage, module indexes, vulnerability pages - all use same accent color
- Background: Dark (#0a0a0f, #0b1020)
- Style source: `style.css` + `core/styles/core.css`

---

## 33-SECTION REFERENCE (For New Pages)

1. Header 2. Breadcrumb 3. Vulnerability Name 4. Severity Badge
5. Meta Grid (CWE, OWASP, CVSS) 6. Description 7. Classification
8. Attack Surface 9. Preconditions 10. Detection 11. Burp Workflow
12. Tool Automation 13. Payloads 14. Advanced Payloads 15. AI Payloads
16. Context-aware Payloads 17. PoCs 18. Request/Response 19. Impact
20. Advanced Exploitation 21. Attack Chains 22. Test Cases 23. Mitigation
24. Advanced Mitigation 25. Monitoring 26. Security Controls 27. Bypass
28. Tools 29. References 30. Retest Steps 31. Detection Logic
32. Threat-Hunting 33. Defensive Detection

---

## CLEANUP DONE

- ✅ Removed backups folder (60+ duplicate files)
- ✅ Removed root files: tools.html, status.html, resume.html, knowledge-base.html, blog.html
- ✅ All 11 module index pages verified
- ✅ Homepage links verified working

---

## NEXT STEPS (If continuing)

1. ✅ Color scheme unified (#00f5a0) across all pages
2. ✅ All 10 security modules have index pages
3. Expand payload database with more entries
4. Add more cheatsheets and tool documentation
5. Add content to Labs and Attack Chains
6. Deploy to GitHub Pages

---

## 2026-05-17 UPDATE

- **Unified colors**: All pages now use #00f5a0 accent color
- **style.css** updated with new color scheme
- **index.html** updated with #00f5a0
- **85+ pages** total in project
- **Ready for GitHub deployment**

---

## 2026-05-17 (Session 2)

### New Content Added
- **attack-chains/index.html** ✅ - 14 attack chains across Web, API, Network, Cloud, Mobile
  - SQLi to RCE, XSS to Account Takeover, SSRF to Cloud, File Upload RCE, IDOR, Phishing
  - API BOLA, JWT Bypass
  - Phishing to Domain Admin, WiFi Compromise, SMB Relay
  - Lambda Backdoor, S3 Misconfiguration
  - Android APK Analysis
  - Mitigation table included

- **payloads/index.html** ✅ - Interactive payload generator
  - Generator with vulnerability type, context, database selection
  - Encoding options (URL, Base64, Unicode, HTML, Double)
  - 25+ quick reference payloads across SQLi, XSS, SSRF, XXE, Command, WAF Bypass
  - Category filtering tabs
  - Copy functionality

- **labs/index.html** ✅ - Security practice labs
  - 6 Web Security labs (SQLi, XSS, SSRF, IDOR, File Upload, Command Injection)
  - 3 Network Security labs (Enumeration, SMB, DNS Tunneling)
  - 3 Privilege Escalation labs (Linux, Windows, AD)
  - 5 CTF-style challenges
  - Resources section with vulnerable apps and tools

- **scripts/index.html** ✅ - Ready-to-use security scripts
  - Copy-to-clipboard functionality

---

## 2026-05-17 (Session 3)

### Evasion Module Added
- **evasion/index.html** ✅ - Complete evasion techniques index
  - Process Injection, EDR Bypass, Code Obfuscation, LOLBAS, Anti-Analysis
- **evasion/process-injection.html** ✅ - Comprehensive process injection guide

### Mobile Module Added
- **mobile/index.html** ✅ - Complete mobile security index

### OSINT Module Added
- **osint/index.html** ✅ - Complete OSINT techniques index

### Radio Module Added
- **radio/index.html** ✅ - Complete WiFi/Radio security index

### Systems Module Added
- **systems/index.html** ✅ - Complete network/systems security index

### Cloud Module Added
- **cloud/index.html** ✅ - Complete cloud security index
  - AWS Security (IAM, S3, Metadata, Lambda, Networking)
  - Azure Security (AD, Key Vault, Storage, Services)
  - GCP Security (IAM, Storage, Metadata, Kubernetes)
  - Container Security (Docker, Escape, Images, Dockerfile)
  - Kubernetes Security (Enum, Credentials, RBAC, Attack Chains)
  - IaC Security (Terraform, CloudFormation, Supply Chain, CI/CD)
  - Tools (Pacu, CloudMapper, ScoutSuite, SkyFleet, CDK)

### Mobile Module Content
- **mobile/android-apk-analysis.html** ✅ - Comprehensive APK analysis guide
  - APK extraction, static/dynamic analysis
  - Frida scripting, SSL pinning bypass
  - Secure storage analysis, crypto analysis

### Bug Bounty Module Added
- **bugbounty/index.html** ✅ - Complete bug bounty methodology
  - Methodology, Recon, Vulnerability Discovery
  - High-value vulnerabilities, Sample writeups
  - Platform guides (HackerOne, Bugcrowd)
  - Essential tools (Nuclei, Subfinder, Amass, Gau)

### Active Directory Module Updated
- **active-directory/index.html** ✅ - Complete AD attack index
  - Initial Access (Phishing, Password, NTLM Relay, Credential Access)
  - Kerberos Attacks (Kerberoasting, AS-REP Roasting, Golden/Silver Ticket, Pass-the-Ticket)
  - Privilege Escalation (DA Paths, DCSync, Delegation, ADCS, ACL Abuse, LAPS)
  - Lateral Movement, Persistence techniques
  - Tools (BloodHound, Mimikatz, Rubeus, Responder, CrackMapExec)

### Windows Security Module Updated
- **windows-security/index.html** ✅ - Complete Windows sec index
  - Privilege Escalation (Services, UAC Bypass, DLL Hijacking, Registry, Tokens)
  - Credential Access (LSASS, SAM, Credential Manager, Keylogging)
  - Defense Evasion (Defender, Process Injection, Logging, File Hiding)
  - Lateral Movement (PsExec, WMI, WinRM, DCOM), Persistence

### Network Module Added
- **network/index.html** ✅ - Complete network security index

---

## 2026-05-17 (Session 4)

### Content Pages Added

**Active Directory:**
- **active-directory/kerberoasting.html** ✅ - Full Kerberoasting guide
  - ATT&CK T1558.003, Rubeus/Impacket/Mimikatz usage
  - TGS hash cracking, detection logic, mitigation
- **active-directory/golden-ticket.html** ✅ - Golden Ticket attack guide
  - MITRE T1558.001, Mimikatz/Rubeus forging
  - Silver Ticket comparison, KRBTGT reset

**Cloud Security:**
- **cloud/ssrf-aws.html** ✅ - SSRF to AWS Metadata compromise
  - Full attack chain, credential extraction, cloud privesc
  - IMDSv2 mitigation
- **cloud/container-escape.html** ✅ - Docker Container Escape
  - Docker socket, namespace, CAP_SYS_ADMIN exploits
  - Dirty Pipe, mitigations

**Systems Security:**
- **systems/linux-privesc.html** ✅ - Linux Privilege Escalation
  - LinPEAS, SUID/Sudo exploitation, GTFOBins
  - Cron, NFS, Kernel exploits, Docker group
  - Password hunting, capabilities abuse

**Radio Security:**
- **radio/wpa-cracking.html** ✅ - WPA/WPA2 Cracking
  - Handshake capture, deauth attacks
  - Hashcat/Hashcat/HCxtools cracking
  - PMKID attack, GPU performance, wordlists
  - Reconnaissance (Port Scanning, Service Enum, Mapping, Firewall Detection)
  - Common Service Attacks (SMB, DNS, Database, Email, VNC, SSH)
  - MITM Attacks (ARP, LLMNR, SMB Relay, SSL Stripping)
  - Tunneling & Pivoting (Port Forwarding, SSH Tunnel, DNS Tunnel, Proxy Chains)
  - Protocol Attacks (WiFi, LDAP, NFS, Printer)
  - Tools (Nmap, Netcat, Wireshark, Responder, Ettercap, Masscan)