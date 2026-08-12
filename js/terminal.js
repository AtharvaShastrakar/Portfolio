/* ==========================================================================
   ATHARVA PORTFOLIO - CYBER TERMINAL / CLI SHELL
   Interactive terminal simulator with real command routing, history, & audio.
   ========================================================================== */

class CyberTerminal {
  constructor() {
    this.container = document.getElementById('terminal-body');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = -1;
    
    this.commands = [
      'help', 'whoami', 'bio', 'education', 'experience', 'projects',
      'skills', 'certifications', 'scan', 'crypto', 'aws', 'contact',
      'resume', 'theme', 'sound', 'clear'
    ];

    this.bindEvents();
    this.printBanner();
  }

  bindEvents() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      if (window.soundFX) window.soundFX.playKeyClick();

      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        this.input.value = '';
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.handleCommand(cmd);
        } else {
          this.appendPromptLine('');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autoComplete();
      }
    });

    // Quick chip buttons
    document.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.input.value = cmd;
          this.handleCommand(cmd);
        }
      });
    });
  }

  autoComplete() {
    const val = this.input.value.trim().toLowerCase();
    if (!val) return;
    const match = this.commands.find(c => c.startsWith(val));
    if (match) {
      this.input.value = match;
    }
  }

  printBanner() {
    const banner = `
   █████╗ ████████╗██╗  ██╗ █████╗ ██████╗ ██╗   ██╗ █████╗ 
  ██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗██║   ██║██╔══██╗
  ███████║   ██║   ███████║███████║██████╔╝██║   ██║███████║
  ██╔══██║   ██║   ██╔══██║██╔══██║██╔══██╗╚██╗ ██╔╝██╔══██║
  ██║  ██║   ██║   ██║  ██║██║  ██║██║  ██║ ╚████╔╝ ██║  ██║
  ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝
  ==============================================================
  [+] SYSTEM: ATHARVA-OS v3.6.2 (Cybersecurity & DevSecOps Console)
  [+] STATUS: OPERATIONAL | REGION: AWS-AP-SOUTH-1 | ROLE: SOC ANALYST
  [+] Type 'help' to view available operations or click chips below.
  ==============================================================`;

    this.appendLine(banner, 'ascii');
  }

  appendLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `terminal-line ${className}`;
    div.textContent = text;
    this.output.appendChild(div);
    this.scrollToBottom();
  }

  appendPromptLine(cmd) {
    const div = document.createElement('div');
    div.className = 'terminal-line command';
    div.innerHTML = `<span class="terminal-prompt">atharva@soc-terminal:~$</span> ${this.escapeHtml(cmd)}`;
    this.output.appendChild(div);
    this.scrollToBottom();
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  scrollToBottom() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  handleCommand(inputStr) {
    this.appendPromptLine(inputStr);
    const parts = inputStr.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (window.soundFX) window.soundFX.playCommandExecute();

    switch (cmd) {
      case 'help':
      case '?':
        this.appendLine(`
AVAILABLE COMMANDS:
  whoami / bio     - Professional biography & executive profile
  education        - Degree, institution & academic achievements
  experience       - Full-stack developer & club presidency roles
  projects         - VoteChain, Cryptography Suite & AWS projects
  skills           - Categorized technical stack (Cyber, Cloud, Web)
  certifications   - IBM, Ethnus, ISC2, CEH credentials
  scan             - Execute simulated threat & vulnerability scan
  crypto           - Run cryptographic algorithms check
  aws              - AWS cloud infrastructure & DevSecOps status
  contact          - Direct contact details & social channels
  resume           - View & download printable resume
  theme <name>     - Change accent: cyan, emerald, violet, amber
  sound <on/off>   - Toggle terminal sound effects
  clear / cls      - Clear terminal window
        `, 'info');
        break;

      case 'whoami':
      case 'bio':
      case 'about':
        this.appendLine(`
[+] CANDIDATE: Atharva Dnyaneshwar Shastrakar
[+] DEGREE: B.Tech in CSE (Cyber Security & Digital Forensics) - VIT Bhopal
[+] TARGET ROLES: Cybersecurity Analyst | Full Stack Developer (AWS)
[+] SUMMARY:
    Undergraduate with hands-on experience in secure application design,
    full-stack web engineering, and AWS cloud technologies. Proficient in
    Python, JavaScript, React.js, Next.js, REST APIs, and penetration testing.
    Passionate about building scalable, resilient, and user-centric systems.
        `, 'success');
        break;

      case 'education':
        this.appendLine(`
[+] INSTITUTION: VIT Bhopal University, Bhopal, India
[+] DEGREE: Bachelor of Technology (B.Tech)
[+] MAJOR: Computer Science & Engineering – Cyber Security and Digital Forensics
[+] DURATION: Jun 2022 – Jun 2026
[+] CGPA: 7.3 / 10.0
[+] KEY SUBJECTS: Cryptography, Digital Forensics, Network Security, NIST Framework,
    System Design, Distributed Systems, Software Architecture.
        `, 'info');
        break;

      case 'experience':
      case 'work':
        this.appendLine(`
1. CUSTOMER SUPPORT EXECUTIVE @ Offcomfrt Apparels LLP (Jul 2026 – Present)
   - Managed high-priority customer workflows, ticket escalation resolution, and client communications.
   - Streamlined support ticketing protocols and ensured high client retention & service satisfaction.

2. FULL STACK DEVELOPER @ Chrysadalus (Nov 2025 – Mar 2026)
   - Developed responsive web applications using modern frontend & backend technologies.
   - Built and integrated RESTful APIs, improving frontend-backend communication.
   - Collaborated with cross-functional teams to optimize performance and resolve production issues.

3. BUSINESS DEVELOPMENT INTERN @ Skidev Inc (May 2025 – Aug 2025)
   - Conducted market research, client acquisition outreach, and business growth analysis.
   - Collaborated on product strategy, partnership pipelines, and client demonstrations.

4. PRESIDENT @ Cyber Warrior Club, VIT Bhopal University (Jul 2024 – Jun 2025)
   - Directed cybersecurity workshops and CTF competitions for 200+ students.
   - Mentored 30+ members through structured onboarding in ethical hacking & forensics.
   - Managed technical symposiums with 300+ participants and secured sponsorships.
        `, 'info');
        break;

      case 'projects':
        this.appendLine(`
1. VOTECHAIN — Decentralized Blockchain-based Secure Voting Platform
   - Stack: Solana, Next.js, Phantom Wallet, Rust smart contract bindings
   - Highlights: Role-based auth, cryptographic audit logging, tamper-proof voting ledger.

2. CRYPTOGRAPHY SUITE — Multi-Algorithm Encryption & Decryption Toolkit
   - Stack: Python, AES, DES, RSA, Diffie-Hellman, IDEA, HMAC, Rail Fence, ADFGVX
   - Highlights: Modular symmetric/asymmetric workflows, secure key negotiation.

3. AWS DEVSECOPS PIPELINE — Cloud Hardening & Container Deployment
   - Stack: AWS EC2, S3, Docker, GitHub Actions, IAM Least Privilege
   - Highlights: Automated CI/CD build, image vulnerability scanning, security groups.
        `, 'success');
        break;

      case 'skills':
        this.appendLine(`
[+] CYBERSECURITY: Penetration Testing, Network Security, NIST Framework, Wireshark, Nmap, Metasploit, Burp Suite, Digital Forensics
[+] PROGRAMMING: Python, C, C++, Java, JavaScript, PowerShell, Bash
[+] WEB & FRAMEWORKS: React.js, Next.js, Django, Flask, REST APIs, HTML, CSS
[+] DATABASES: PostgreSQL, MySQL
[+] CLOUD & DEVOPS: AWS (EC2, S3), Docker, GitHub Actions, CI/CD
[+] SYSTEM DESIGN: REST APIs, Software Architecture, Distributed Systems Fundamentals
        `, 'info');
        break;

      case 'certifications':
      case 'certs':
        this.appendLine(`
[✔] Cybersecurity Analyst — IBM (Verified)
[✔] MERN Full Stack — Ethnus (Verified)
[⏳] AWS Certified Cloud Practitioner — In Progress
[⏳] ISC2 Certified in Cybersecurity (CC) — In Progress
[⏳] Certified Ethical Hacker (CEH) — In Progress
        `, 'success');
        break;

      case 'scan':
        this.appendLine('[*] Initializing Nmap SYN Stealth Port Scan on target perimeter...', 'warning');
        setTimeout(() => {
          this.appendLine('[*] Scanning 1000 ports on 127.0.0.1...', 'info');
        }, 300);
        setTimeout(() => {
          this.appendLine(`
PORT      STATE SERVICE       VERSION
22/tcp    open  ssh           OpenSSH 9.3 (Hardened, Key-Auth Only)
80/tcp    open  http          Nginx (Secure Reverse Proxy)
443/tcp   open  https         TLS 1.3 (ChaCha20-Poly1305 Cipher Suite)
8000/tcp  open  http-alt      Django REST Framework API
8080/tcp  open  http-proxy    Docker Microservices Container
[+] SCAN RESULT: 0 Critical Vulnerabilities. Defense-in-Depth Verified.
          `, 'success');
        }, 700);
        break;

      case 'crypto':
        this.appendLine(`
[*] Running Cryptographic Engine Self-Test:
[+] AES-256-GCM Hardware Acceleration: ENABLED
[+] SHA-256 / HMAC Signature Verification: PASSED
[+] RSA-2048 Public/Private Keygen: READY
[+] Diffie-Hellman Key Exchange: SYNCHRONIZED
[+] All cryptographic modules fully functional.
        `, 'success');
        break;

      case 'aws':
        this.appendLine(`
[+] AWS CLOUD INFRASTRUCTURE TOPOLOGY:
    ├── Region: ap-south-1 (Mumbai)
    ├── VPC: 10.0.0.0/16 (Isolated Multi-AZ Subnets)
    ├── Compute: AWS EC2 (Dockerized Microservices, Auto-scaled)
    ├── Storage: AWS S3 (Encrypted at rest with KMS, Versioned)
    ├── Security: AWS IAM (Zero Trust, Least-Privilege Policies)
    └── CI/CD: GitHub Actions -> Automated Build & Deploy Pipeline
        `, 'info');
        break;

      case 'contact':
        this.appendLine(`
[+] PHONE: +91-7499074139
[+] EMAIL: atharva.d.s.shastrakar@gmail.com
[+] LINKEDIN: https://linkedin.com/in/atharva-shastrakar
[+] GITHUB: https://github.com/AtharvaShastrakar
[+] LEETCODE: https://leetcode.com/atharva_shastrakar
        `, 'success');
        break;

      case 'resume':
        this.appendLine('[+] Launching resume preview modal...', 'info');
        const resumeModalEl = document.getElementById('resume-modal');
        if (resumeModalEl) resumeModalEl.classList.add('open');
        break;

      case 'theme':
        if (args[0]) {
          const t = args[0].toLowerCase();
          if (['cyan', 'emerald', 'violet', 'amber'].includes(t)) {
            document.documentElement.setAttribute('data-theme', t === 'cyan' ? '' : t);
            localStorage.setItem('portfolio_theme', t);
            this.appendLine(`[+] Theme accent switched to '${t}'.`, 'success');
          } else {
            this.appendLine(`[!] Unknown theme '${args[0]}'. Choose from: cyan, emerald, violet, amber`, 'error');
          }
        } else {
          this.appendLine(`[!] Usage: theme <cyan|emerald|violet|amber>`, 'warning');
        }
        break;

      case 'sound':
        if (args[0] === 'on' || args[0] === 'off') {
          const state = args[0] === 'on';
          if (window.soundFX) {
            window.soundFX.enabled = state;
            localStorage.setItem('cyber_sound_enabled', state ? 'true' : 'false');
            this.appendLine(`[+] Sound effects ${state ? 'ENABLED' : 'DISABLED'}.`, 'success');
          }
        } else {
          this.appendLine(`[!] Usage: sound <on|off>`, 'warning');
        }
        break;

      case 'clear':
      case 'cls':
        this.output.innerHTML = '';
        this.printBanner();
        break;

      default:
        this.appendLine(`[!] Unknown command: '${cmd}'. Type 'help' for supported commands.`, 'error');
        if (window.soundFX) window.soundFX.playAlert();
        break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberTerminal = new CyberTerminal();
});
