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
  // 1. Sound Toggle Init
  // ------------------------------------------------------------------------
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    const isSoundOn = localStorage.getItem('cyber_sound_enabled') === 'true';
    if (isSoundOn) soundBtn.classList.add('active');
    soundBtn.addEventListener('click', () => {
      const enabled = window.soundFX ? window.soundFX.toggle() : false;
      soundBtn.classList.toggle('active', enabled);
      showToast(`Audio feedback ${enabled ? 'ENABLED' : 'MUTED'}`, 'info');
    });
  }

  // ------------------------------------------------------------------------
  // 2. Navbar Sticky & Scroll Spy
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
      'AWS Cloud & DevSecOps Engineer',
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
    votechain: {
      title: 'VoteChain – Blockchain-based Secure Voting Platform',
      category: 'Decentralized Security & Full-Stack Application',
      stack: ['Solana Blockchain', 'Next.js 14', 'Phantom Wallet', 'Rust / Anchor', 'Tailwind/CSS', 'Audit Logging'],
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
  // 11. Command Palette (Cmd+K / Ctrl+K)
  // ------------------------------------------------------------------------
  const cmdModal = document.getElementById('cmd-palette-modal');
  const cmdInput = document.getElementById('cmd-palette-input');
  const cmdResults = document.getElementById('cmd-palette-results');
  const openCmdBtns = document.querySelectorAll('.btn-open-cmd');

  const paletteItems = [
    { label: 'Go to Hero & SOC Deck', section: 'hero', badge: 'Section' },
    { label: 'Open Interactive Terminal Shell', section: 'terminal-section', badge: 'CLI' },
    { label: 'Explore About & Education (VIT Bhopal)', section: 'about', badge: 'Bio' },
    { label: 'Launch Security & Crypto Playground', section: 'playground', badge: 'Tool' },
    { label: 'View VoteChain Project', action: () => window.openProjectModal('votechain'), badge: 'Project' },
    { label: 'View Cryptography Suite Project', action: () => window.openProjectModal('cryptosuite'), badge: 'Project' },
    { label: 'View AWS DevSecOps Architecture', action: () => window.openProjectModal('awscloud'), badge: 'Project' },
    { label: 'View Experience (Offcomfrt, Chrysadalus, Skidev, Club)', section: 'experience', badge: 'Timeline' },
    { label: 'View Technical Arsenal & Skills', section: 'skills', badge: 'Skills' },
    { label: 'View Certifications (AWS, IBM, Ethnus, ISC2, CEH)', section: 'certifications', badge: 'Certs' },
    { label: 'Open Contact & Dispatch Console', section: 'contact', badge: 'Dispatch' },
    { label: 'View / Download Full Resume', action: () => { if (resumeModal) resumeModal.classList.add('open'); }, badge: 'Resume' }
  ];

  function openPalette() {
    if (!cmdModal) return;
    cmdModal.classList.add('open');
    cmdInput.value = '';
    renderPaletteItems(paletteItems);
    setTimeout(() => cmdInput.focus(), 50);
    if (window.soundFX) window.soundFX.playKeyClick();
  }

  function closePalette() {
    if (!cmdModal) return;
    cmdModal.classList.remove('open');
    if (window.soundFX) window.soundFX.playKeyClick();
  }

  function renderPaletteItems(items) {
    if (!cmdResults) return;
    cmdResults.innerHTML = '';

    if (items.length === 0) {
      cmdResults.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">No matching actions found.</div>';
      return;
    }

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `cmd-item ${index === 0 ? 'selected' : ''}`;
      div.innerHTML = `
        <div class="cmd-item-left">
          <span style="color:var(--primary)">▸</span>
          <span>${item.label}</span>
        </div>
        <span class="cmd-badge">${item.badge}</span>
      `;
      div.addEventListener('click', () => {
        closePalette();
        if (item.section) {
          const target = document.getElementById(item.section);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else if (item.action) {
          item.action();
        }
      });
      cmdResults.appendChild(div);
    });
  }

  openCmdBtns.forEach(btn => btn.addEventListener('click', openPalette));

  if (cmdInput) {
    cmdInput.addEventListener('input', () => {
      const query = cmdInput.value.toLowerCase().trim();
      const filtered = paletteItems.filter(i => i.label.toLowerCase().includes(query) || i.badge.toLowerCase().includes(query));
      renderPaletteItems(filtered);
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      if (cmdModal && cmdModal.classList.contains('open')) closePalette();
      if (projectModal && projectModal.classList.contains('open')) projectModal.classList.remove('open');
      if (resumeModal && resumeModal.classList.contains('open')) resumeModal.classList.remove('open');
    }
  });

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closePalette();
    });
  }

  // ------------------------------------------------------------------------
  // 12. Contact Form Submission & Encrypted Dispatch Simulation
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const dispatchStatus = document.getElementById('dispatch-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'warning');
        if (window.soundFX) window.soundFX.playAlert();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="typing-cursor"></span> Encrypting Payload...';
      dispatchStatus.innerHTML = '<span style="color:#38bdf8;">[1/3] Generating Ephemeral 256-bit AES Session Key...</span>';

      if (window.soundFX) window.soundFX.playCommandExecute();

      setTimeout(() => {
        dispatchStatus.innerHTML = '<span style="color:#f59e0b;">[2/3] Performing TLS Handshake & HMAC Integrity Check...</span>';
      }, 700);

      setTimeout(() => {
        dispatchStatus.innerHTML = '<span style="color:#10b981;">[3/3] Secure Packet Transmitted (200 OK: Delivered).</span>';
        submitBtn.innerHTML = '✓ Dispatched Securely';
        submitBtn.disabled = false;
        showToast(`Thank you, ${name}! Your encrypted message has been received.`, 'success');
        if (window.soundFX) window.soundFX.playSuccess();
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = '<span>🔒 Transmit Encrypted Message</span>';
          dispatchStatus.innerHTML = '<span style="color:#10b981;">✓ TLS 1.3 End-to-End Encrypted Tunnel Ready</span>';
        }, 4000);
      }, 1500);
    });
  }
});
