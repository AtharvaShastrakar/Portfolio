/* ==========================================================================
   ATHARVA PORTFOLIO - MAIN APP JAVASCRIPT
   Portal loading screen, scroll spy, modals, command palette, toasts, dispatch.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 0. CYBER PORTAL LOADING SCREEN / TELEMETRY GATEWAY
  // ------------------------------------------------------------------------
  const portalOverlay = document.getElementById('portal-overlay');
  const portalProgressFill = document.getElementById('portal-progress-fill');
  const portalProgressPercent = document.getElementById('portal-progress-percent');
  const portalLogBox = document.getElementById('portal-log-box');
  const portalBtnEnter = document.getElementById('portal-btn-enter');
  const portalBtnSkip = document.getElementById('portal-btn-skip');

  // Telemetry Elements
  const telMac = document.getElementById('tel-mac');
  const telIp = document.getElementById('tel-ip');
  const telPlatform = document.getElementById('tel-platform');
  const telIsp = document.getElementById('tel-isp');
  const telProtocol = document.getElementById('tel-protocol');
  const telFirewall = document.getElementById('tel-firewall');

  function generateVirtualMac() {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      mac += hex.charAt(Math.floor(Math.random() * 16)) + hex.charAt(Math.floor(Math.random() * 16));
      if (i < 5) mac += ':';
    }
    return mac;
  }

  function detectClientInfo() {
    // Detect OS & Platform
    let os = 'macOS / Apple Silicon';
    const ua = navigator.userAgent;
    if (ua.indexOf('Win') !== -1) os = 'Windows NT / x86_64';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux / GNU Core';
    else if (ua.indexOf('Android') !== -1) os = 'Android OS';
    else if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) os = 'Apple iOS';

    if (telPlatform) telPlatform.textContent = os;
    if (telMac) telMac.textContent = generateVirtualMac();
    if (telProtocol) telProtocol.textContent = 'TLS 1.3 / ChaCha20';
    if (telFirewall) telFirewall.textContent = 'STATEFUL (DEFCON 5)';
    if (telIsp) telIsp.textContent = 'AWS CloudFront / AP-SOUTH-1';

    // Simulated Gateway IP with client fallback
    const randomHost = Math.floor(Math.random() * 200) + 20;
    if (telIp) telIp.textContent = `103.21.244.${randomHost}`;
  }

  detectClientInfo();

  let portalProgress = 0;
  let portalFinished = false;

  const bootLogs = [
    { at: 10, text: '[0.12s] Probing hardware MAC interface & kernel architecture...' },
    { at: 28, text: '[0.65s] Discovering gateway IP & AWS Edge node (AP-SOUTH-1 Mumbai)...' },
    { at: 48, text: '[1.30s] Initiating TLS 1.3 cryptographic handshake & SHA-256 HMAC verification...' },
    { at: 68, text: '[2.10s] Verifying Zero-Trust perimeter access policies & threat matrices...' },
    { at: 86, text: '[2.90s] Decrypting Atharva Shastrakar security & full-stack core...' },
    { at: 100, text: '[3.60s] ACCESS GRANTED. Welcome to Atharva Portfolio Mainframe.' }
  ];

  let logIndex = 0;

  function appendPortalLog(text, isLast = false) {
    if (!portalLogBox) return;
    const p = document.createElement('div');
    p.className = `portal-log-line ${isLast ? 'success highlight' : 'active'}`;
    p.textContent = `> ${text}`;
    portalLogBox.appendChild(p);
    portalLogBox.scrollTop = portalLogBox.scrollHeight;
  }

  // Smooth cinematic progress interval
  const portalInterval = setInterval(() => {
    // Increment gradually
    if (portalProgress < 30) {
      portalProgress += 2;
    } else if (portalProgress < 60) {
      portalProgress += 3;
    } else if (portalProgress < 85) {
      portalProgress += 2;
    } else {
      portalProgress += 3;
    }

    if (portalProgress > 100) portalProgress = 100;

    if (portalProgressFill) portalProgressFill.style.width = `${portalProgress}%`;
    if (portalProgressPercent) portalProgressPercent.textContent = `${portalProgress}%`;

    while (logIndex < bootLogs.length && portalProgress >= bootLogs[logIndex].at) {
      appendPortalLog(bootLogs[logIndex].text, bootLogs[logIndex].at === 100);
      if (window.soundFX && bootLogs[logIndex].at === 100) {
        window.soundFX.playSuccess();
      } else if (window.soundFX) {
        window.soundFX.playKeyClick();
      }
      logIndex++;
    }

    if (portalProgress >= 100) {
      clearInterval(portalInterval);
      portalFinished = true;
      if (portalBtnEnter) {
        portalBtnEnter.style.display = 'inline-flex';
        portalBtnEnter.classList.add('pulse-border');
        portalBtnEnter.textContent = '⚡ Enter Portfolio';
      }

      // Allow 2.2 seconds for the user to view the complete HUD, or click the Enter button
      setTimeout(() => {
        if (!portalOverlay.classList.contains('fade-out')) {
          dismissPortal();
        }
      }, 2200);
    }
  }, 95);

  function dismissPortal() {
    if (!portalOverlay) return;
    portalOverlay.classList.add('fade-out');
    if (window.soundFX) window.soundFX.playCommandExecute();
    setTimeout(() => {
      portalOverlay.style.display = 'none';
    }, 600);
  }

  if (portalBtnEnter) portalBtnEnter.addEventListener('click', dismissPortal);
  if (portalBtnSkip) portalBtnSkip.addEventListener('click', dismissPortal);

  // ------------------------------------------------------------------------
  // 1. Navbar Sticky & Scroll Spy
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Mobile Menu Toggle
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
      if (window.soundFX) window.soundFX.playKeyClick();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Scroll Reveal Observer
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 5. Interactive Hero Typing Effect
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('hero-typed-text');
  if (typingElement) {
    const roles = [
      'Cybersecurity Analyst',
      'Full Stack Web Developer',
      'Digital Forensics Investigator',
      'CTF Organizer & Mentor'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeRole() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeRole, typeSpeed);
    }
    typeRole();
  }

  // ------------------------------------------------------------------------
  // 6. Tabbed Navigation in Security Playground
  // ------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(targetTab);
      if (pane) pane.classList.add('active');
      if (window.soundFX) window.soundFX.playKeyClick();
    });
  });

  // ------------------------------------------------------------------------
  // 7. Copy to Clipboard Utility
  // ------------------------------------------------------------------------
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}"`, 'success');
          if (window.soundFX) window.soundFX.playSuccess();
        }).catch(() => {
          showToast('Failed to copy. Please manually copy.', 'error');
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 8. Toast Notification System
  // ------------------------------------------------------------------------
  window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `<span style="color:var(--primary);font-weight:bold;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // ------------------------------------------------------------------------
  // 9. Project Deep Dive Modal Handlers
  // ------------------------------------------------------------------------
  const projectDetails = {
    passvault: {
      title: 'Pass-Vault (pv) – Zero-Knowledge Encrypted Password Manager',
      category: 'Cryptographic Engineering & Defense-in-Depth',
      stack: ['Python 3', 'Argon2id KDF', 'AES-256-GCM', 'Atomic Fsync', 'POSIX Locks', 'Zero-Knowledge', 'OWASP-Aligned'],
      githubUrl: 'https://github.com/AtharvaShastrakar/Pass-Vault',
      description: 'A modern, zero-knowledge, encrypted command-line password manager engineered with defense-in-depth, Argon2id memory-hard key derivation, AES-256-GCM authenticated encryption, crash-resilient atomic storage, and POSIX concurrency locks.',
      architecture: `
+-------------------------------------------------------------------------+
|                  PASS-VAULT ZERO-KNOWLEDGE CRYPTOGRAPHIC FLOW            |
+-------------------------------------------------------------------------+
[ User Master Password ]
          |
          v (Argon2id KDF: 64 MiB RAM, 3 Passes, 4 Lanes, 16B Salt)
[ 256-Bit Derived Key (In-Memory Ephemeral) ]
          |
          +-----------------------------------+
          |                                   |
          v (Encryption)                      v (Decryption)
[ AES-256-GCM + 96-bit Nonce ]       [ Verify Tag & Decrypt Payload ]
          |                                   |
          v (Atomic Write Pipeline)           v
[ tmp file -> fsync -> atomic replace ]  [ In-Memory Vault Credentials ]
      `,
      highlights: [
        'Zero-knowledge architecture ensuring master credentials never touch disk, memory leaks, or shell history.',
        'Argon2id memory-hard key derivation (64 MiB RAM, 3 passes, 4 lanes, ~0.5s cost) thwarting GPU/ASIC cluster cracking.',
        'AES-256-GCM authenticated encryption with anti-oracle tamper resistance (unified WrongPasswordError eliminates attack oracles).',
        'Crash-safe atomic persistence pipeline (tmp write -> fsync -> atomic replace -> parent-dir fsync) with zero chmod race windows.',
        'Comprehensive automated test suite with 71 passing unit/integration tests and 88% code coverage.'
      ]
    },
    fileintegrity: {
      title: 'File Integrity Checker – Cryptographic Log Tamper Detection',
      category: 'Security Tooling & Digital Forensics',
      stack: ['Python', 'SHA-256 Hashing', 'File Integrity Monitoring (FIM)', 'POSIX 0600 Permissions', 'CLI Tooling'],
      githubUrl: 'https://github.com/AtharvaShastrakar/File-Integrity-Checker',
      description: 'A command-line security tool that verifies the cryptographic integrity of log files to detect tampering and unauthorized modifications using SHA-256 hashing and protected baseline stores.',
      architecture: `
+-------------------------------------------------------------------------+
|                FILE INTEGRITY CHECKER SYSTEM ARCHITECTURE               |
+-------------------------------------------------------------------------+
[ Target Files / Directories ] ---> [ Recursive File Discovery Engine ]
                                                   |
                                                   v
                                      [ SHA-256 Hashing Engine ]
                                                   |
                   +-------------------------------+-------------------------------+
                   v                                                               v
      [ Initial Baseline Pass ]                                      [ Verification Pass ]
      - Store Hashes in DB File                                      - Read Current Hashes
      - Enforce POSIX 0600 Permissions                               - Compare Against Baseline
                                                                                   |
                                                                                   v
                                                                      [ Tamper Alert / Match Status ]
      `,
      highlights: [
        'Accepts individual file targets or recursively crawls nested directories to compute SHA-256 cryptographic digests.',
        'Secure baseline storage enforcing strict POSIX 0600 permissions (owner read/write only) preventing database tampering.',
        'Immediate discrepancy reporting displaying status (Modified / Unmodified) with stored baseline vs current hash mismatch.',
        'Supports manual re-initialization and atomic baseline updates following legitimate administrative system modifications.'
      ]
    },
    storeratings: {
      title: 'StoreRatings – Enterprise Full-Stack Rating & Review Platform',
      category: 'Full-Stack Engineering & Cloud Systems',
      stack: ['React 19', 'TypeScript', 'Node.js v22', 'Express 5', 'PostgreSQL', 'Prisma ORM', 'Zod', 'Tailwind CSS', 'Vitest'],
      githubUrl: 'https://github.com/AtharvaShastrakar/Store-Rating-Platform',
      description: 'A production-grade, multi-role full-stack web application built to allow platform users to search, review, and rate registered stores with interactive analytics and strict role-based access control.',
      architecture: `
+-------------------------------------------------------------------------+
|                  STORERATINGS FULL-STACK ARCHITECTURE                   |
+-------------------------------------------------------------------------+
[ React 19 + TypeScript + Tailwind UI ]
          |
          v (Axios API Client + JWT Bearer Interceptor)
[ Security & Middleware: Helmet | Rate Limiter | Zod Validator | RBAC Auth ]
          |
          v
[ Thin Express 5 Controllers ] ---> [ Business Logic Services ]
                                                   |
                                                   v
                                      [ Prisma ORM Client Layer ]
                                                   |
                                                   v
                                     [ PostgreSQL Relational Database ]
      `,
      highlights: [
        'Decoupled Controller-Service-Schema layered architecture with strict separation of concerns and Zod request validation.',
        'Robust multi-role RBAC (System Admin, Store Owner, User) with secure JWT bearer authentication & Helmet HTTP protection.',
        'Interactive real-time analytics dashboard calculating average store ratings, submission counts, and user reviews.',
        'Relational data persistence powered by PostgreSQL and Prisma ORM, accompanied by comprehensive Vitest test coverage.'
      ]
    },
    orangechat: {
      title: 'OrangeChat – Real-Time Secure Messaging & Group Platform',
      category: 'Real-Time Web & Cloud Security',
      stack: ['Next.js App Router', 'TypeScript', 'Supabase Realtime', 'PostgreSQL RLS', 'WebSockets', 'Tailwind CSS'],
      githubUrl: 'https://github.com/AtharvaShastrakar/orangeChat',
      description: 'A robust, minimalist group messaging platform built for sub-millisecond latency and cryptographic data isolation powered by Next.js App Router and Supabase Realtime with database-level Row Level Security.',
      architecture: `
+-------------------------------------------------------------------------+
|                    ORANGECHAT REAL-TIME ARCHITECTURE                     |
+-------------------------------------------------------------------------+
[ Next.js App Router Client ] <---> [ Next.js Edge Middleware Auth ]
          |
          | (WebSocket Phoenix Channels)
          v
[ Supabase Realtime Engine (Live Presence & Broadcast) ]
          |
          v
[ PostgreSQL Database with Row Level Security (RLS) ]
- Cryptographic Tenant Isolation
- Gated Room Membership Policies
- Direct Table-Level Authorization
      `,
      highlights: [
        'Database-layer PostgreSQL Row Level Security (RLS) guaranteeing cryptographic data isolation even if client is compromised.',
        'Sub-millisecond latency real-time communication and live presence tracking powered by Supabase Phoenix channels.',
        'Strict access gating using Next.js Edge Middleware, unverified email rejection, and zero unauthenticated data leakages.',
        'Lean governance model featuring role-based room administration, instant messaging, and deletion broadcasting.'
      ]
    },
    votechain: {
      title: 'VoteChain – Blockchain-based Secure Voting Platform',
      category: 'Decentralized Security & Full-Stack Application',
      stack: ['Solana Blockchain', 'Next.js 14', 'Phantom Wallet', 'Rust / Anchor', 'Tailwind/CSS', 'Audit Logging'],
      githubUrl: 'https://github.com/AtharvaShastrakar',
      description: 'VoteChain addresses election tampering and lack of auditability by leveraging high-throughput Solana distributed ledger technology, Phantom cryptographic wallet signatures, and zero-knowledge identity proofs.',
      architecture: `
+-------------------------------------------------------------------------+
|                          VOTECHAIN SYSTEM ARCHITECTURE                  |
+-------------------------------------------------------------------------+
[ Voter Client (Next.js) ] ---> [ Phantom Wallet ECDSA / Ed25519 Signer ]
                                                  |
                                                  v
                                    [ Solana Anchor Smart Contract ]
                                                  |
               +----------------------------------+-----------------------+
               v                                                          v
  [ Immutable Ledger State ]                                [ Zero-Trust Audit Stream ]
  - Tamper-Proof Vote Count                                 - Cryptographic Hashes
  - Anonymous Ballots                                       - Real-Time Verifiable Logs
      `,
      highlights: [
        'Decentralized voting architecture preventing single points of failure and censorship.',
        'Cryptographic vote validation using Ed25519 signatures with zero-knowledge ballot verification.',
        'Real-time automated audit logging for public transparency while guaranteeing voter privacy.',
        'Comprehensive developer documentation, smart contract unit tests, and seamless onboarding.'
      ]
    },
    cryptosuite: {
      title: 'Cryptography Suite – Multi-Algorithm Security Toolkit',
      category: 'Cryptographic Engineering & Python Systems',
      stack: ['Python 3.11', 'AES-256', 'DES', 'RSA-2048', 'Diffie-Hellman', 'IDEA', 'HMAC-SHA256', 'Rail Fence', 'ADFGVX'],
      githubUrl: 'https://github.com/AtharvaShastrakar',
      description: 'An enterprise-grade, modular Python cryptography framework providing unified APIs for symmetric ciphers, asymmetric key generation, cryptographic negotiation protocols, and classical classical transpositions.',
      architecture: `
+-------------------------------------------------------------------------+
|                      CRYPTOGRAPHY SUITE ARCHITECTURE                    |
+-------------------------------------------------------------------------+
                        [ Unified Crypto Engine API ]
                                     |
    +--------------------------------+--------------------------------+
    |                                |                                |
    v                                v                                v
[ Symmetric Engine ]        [ Asymmetric Engine ]          [ Transposition / Auth ]
- AES-256 (CBC/GCM)         - RSA (2048/4096-bit)          - HMAC-SHA256
- DES / 3DES                - Diffie-Hellman Key Exchange  - Rail Fence / ADFGVX
- IDEA Cipher               - PKCS#1 v2.2 OAEP Padding     - Row Transposition
      `,
      highlights: [
        'Engineered 9+ distinct cryptographic algorithms with end-to-end mathematical verification.',
        'Modular symmetric and asymmetric encryption pipelines for stream and block processing.',
        'Practical implementation of Diffie-Hellman key exchange for secure ephemeral session establishment.',
        'Built-in integrity validation via HMAC-SHA256 and customizable ciphertext serialization.'
      ]
    },
    awscloud: {
      title: 'AWS DevSecOps & Cloud Hardening Architecture',
      category: 'Cloud Infrastructure & Security Automation',
      stack: ['AWS EC2', 'AWS S3', 'Docker', 'GitHub Actions', 'AWS IAM', 'Nginx TLS 1.3', 'VPC'],
      githubUrl: 'https://github.com/AtharvaShastrakar',
      description: 'Production-ready cloud architecture and DevSecOps deployment pipeline adhering to AWS Well-Architected Security Pillar and Zero Trust principles.',
      architecture: `
+-------------------------------------------------------------------------+
|                    AWS SECURE DEVSECOPS INFRASTRUCTURE                  |
+-------------------------------------------------------------------------+
[ Developer Git Push ] -> [ GitHub Actions CI/CD Pipeline ]
                                       |
                     +-----------------+-----------------+
                     v                                   v
          [ Vulnerability Scanning ]             [ Docker Container Build ]
          - Dependency SAST Check                - Lightweight Hardened Image
          - Secret Scanning                               |
                                                          v
                                               [ AWS EC2 / Docker Host ]
                                               - Least Privilege IAM Role
                                               - Encrypted AWS S3 Buckets
                                               - Hardened Security Groups
      `,
      highlights: [
        'Secure multi-AZ VPC architecture with strict ingress/egress firewall rules and security groups.',
        'Automated GitHub Actions CI/CD pipeline with embedded static code analysis and dependency audits.',
        'AWS S3 bucket security with SSE-KMS encryption, versioning, and strict IAM bucket policies.',
        'Docker microservices containerization with non-root execution and healthcheck monitoring.'
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-category').textContent = data.category;
    document.getElementById('modal-project-desc').textContent = data.description;
    document.getElementById('modal-project-architecture').textContent = data.architecture;

    const githubBtn = document.getElementById('modal-project-github');
    if (githubBtn) {
      if (data.githubUrl) {
        githubBtn.href = data.githubUrl;
        githubBtn.style.display = 'inline-flex';
      } else {
        githubBtn.style.display = 'none';
      }
    }

    const tagsContainer = document.getElementById('modal-project-tags');
    tagsContainer.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'badge badge-primary';
      span.textContent = tech;
      tagsContainer.appendChild(span);
    });

    const highlightsContainer = document.getElementById('modal-project-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(h => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="bullet-icon">▸</span> ${h}`;
      highlightsContainer.appendChild(li);
    });

    projectModal.classList.add('open');
    if (window.soundFX) window.soundFX.playKeyClick();
  };

  if (projectModalClose && projectModal) {
    projectModalClose.addEventListener('click', () => {
      projectModal.classList.remove('open');
      if (window.soundFX) window.soundFX.playKeyClick();
    });

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('open');
      }
    });
  }

  // Keyboard accessibility for interactive project cards
  document.querySelectorAll('.project-card[role="button"]').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 10. Resume Viewer Modal Handlers
  // ------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const openResumeBtns = document.querySelectorAll('.btn-open-resume');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) {
        resumeModal.classList.add('open');
        if (window.soundFX) window.soundFX.playKeyClick();
      }
    });
  });

  if (resumeModalClose && resumeModal) {
    resumeModalClose.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      if (window.soundFX) window.soundFX.playKeyClick();
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 11. Global Keyboard Listeners (Escape to close modals)
  // ------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) projectModal.classList.remove('open');
      if (resumeModal && resumeModal.classList.contains('open')) resumeModal.classList.remove('open');
    }
  });

  // ------------------------------------------------------------------------
  // 12. Contact Form Submission & Encrypted Real Transmission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const dispatchStatus = document.getElementById('dispatch-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = (document.getElementById('contact-subject')?.value || '').trim() || 'New Transmission from Portfolio Website';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'warning');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="typing-cursor"></span> Encrypting Payload...';
      dispatchStatus.innerHTML = '<span style="color:#38bdf8;">[1/3] Generating Ephemeral 256-bit AES Session Key...</span>';

      await new Promise(resolve => setTimeout(resolve, 600));
      dispatchStatus.innerHTML = '<span style="color:#f59e0b;">[2/3] Performing TLS Handshake & Transmitting to Mail Server...</span>';

      try {
        const response = await fetch('https://formsubmit.co/ajax/atharva.d.s.shastrakar@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: `[Portfolio Contact] ${subject} - from ${name}`,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true) {
          dispatchStatus.innerHTML = '<span style="color:#10b981;">[3/3] Secure Packet Transmitted (Delivered to atharva.d.s.shastrakar@gmail.com).</span>';
          submitBtn.innerHTML = '✓ Dispatched to Atharva';
          showToast(`Thank you, ${name}! Your transmission has been delivered to Atharva.`, 'success');
          contactForm.reset();
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          dispatchStatus.innerHTML = '<span style="color:#f59e0b;">⚠️ Activation Required: Check atharva.d.s.shastrakar@gmail.com and click "Activate Form"</span>';
          submitBtn.innerHTML = 'Check Gmail to Activate';
          showToast('Activation email sent! Please check your Gmail (or Spam folder) and click "Activate Form".', 'warning');
        } else {
          throw new Error(data.message || 'Server returned non-200 response');
        }
      } catch (err) {
        // Fallback: If network issue or blocked, provide direct mailto link
        dispatchStatus.innerHTML = '<span style="color:#38bdf8;">[Fallback] Opening Direct Mail Client...</span>';
        window.location.href = `mailto:atharva.d.s.shastrakar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        showToast('Direct mail client opened as backup.', 'info');
      } finally {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🔒 Transmit Encrypted Message</span>';
          dispatchStatus.innerHTML = '<span style="color:#10b981;">✓ TLS 1.3 End-to-End Encrypted Tunnel Ready</span>';
        }, 4000);
      }
    });
  }
});
