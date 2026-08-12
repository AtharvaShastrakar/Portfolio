# 🛡️ Atharva Dnyaneshwar Shastrakar — Cybersecurity & Full-Stack Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Portfolio-atharvashastrakar.github.io-00f2fe?style=for-the-badge&logo=googlechrome&logoColor=black)](https://atharvashastrakar.github.io/Portfolio/)
[![Resume](https://img.shields.io/badge/📄_Official_Resume-PDF_Download-10b981?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://atharvashastrakar.github.io/Portfolio/assets/Atharva_Dnyaneshwar_Shastrakar_Resume.pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

**Cybersecurity Analyst • Full-Stack Engineer • AWS Cloud Architect**  
*B.Tech in Computer Science & Engineering (Specialization in Cyber Security & Digital Forensics) — VIT Bhopal University*

```
[+] SYSTEM: ATHARVA-OS v3.6.2 (Cybersecurity & DevSecOps Console)
[+] STATUS: OPERATIONAL | REGION: AWS AP-SOUTH-1 | ROLE: SOC ANALYST
```

</div>

---

## ⚡ Overview

Welcome to the official repository of **Atharva Dnyaneshwar Shastrakar's** personal portfolio and interactive Cybersecurity Operations Center (SOC) web application.

Built from the ground up with **Pure Vanilla HTML5, CSS3, and Modern ES6+ JavaScript**, this application features **zero external runtime dependencies**, high-performance Web Crypto API cryptography, a browser-based SOC command shell, real-time threat intelligence telemetry, and interactive security tools.

🔗 **Live Deployment:** [https://atharvashastrakar.github.io/Portfolio/](https://atharvashastrakar.github.io/Portfolio/)

---

## 🎯 Key Capabilities & Interactive Features

### 1. 🛡️ Zero-Trust Cyber Portal Loading Screen
- **Real-Time Client Telemetry**: Virtual MAC address, Client IP, detected Platform/OS architecture, Cloud Provider region (`AWS CloudFront AP-SOUTH-1`), and cipher handshake (`TLS 1.3 / ChaCha20`).
- **Paced Boot Sequence**: Streamed terminal boot logs with progress bar and audio cues.

### 2. 💻 Interactive SOC Terminal / CLI Shell
- **Fully Functional Browser Terminal**:
  - `whoami` — Candidate biography, degree, and focus areas.
  - `skills` — Full technical arsenal across security, programming, frameworks, and cloud.
  - `projects` — Deep-dive into decentralized systems and cryptographic toolkits.
  - `experience` — Career timeline and leadership logs.
  - `certifications` — Credentials across IBM, Ethnus, AWS, ISC2, and CEH.
  - `scan` — Simulated Nmap SYN stealth port scanner on defense perimeters.
  - `crypto` — Inline encryption/decryption execution.
  - `aws` — DevSecOps pipeline & cloud topology view.
  - `resume` — Direct access to the official PDF resume.
  - `clear`, `help` — Terminal screen utilities.

### 3. 🔐 Live Cryptography & Security Lab
- **Web Crypto API Sandbox**:
  - **AES-256-GCM**: Real authenticated symmetric encryption with 96-bit IV generation and tag verification.
  - **HMAC-SHA256**: Keyed cryptographic hashing for payload tamper-resistance.
  - **Classical & Transposition Ciphers**: Caesar cipher, Rail Fence transposition with dynamic key offsets.
- **Password Shannon Entropy & Brute-Force Estimator**:
  - Exact information-theoretic Shannon entropy ($H = L \cdot \log_2 N$) calculations.
  - GPU cluster crack-time modeling (RTX 4090 / hashcat speed benchmarks).
  - Real-time NIST SP 800-63B password composition checklist.
- **NIST Cybersecurity Framework (CSF) Matrix**: Interactive visualizer mapping Identify, Protect, Detect, Respond, and Recover workflows.

### 4. ☁️ AWS DevSecOps Architecture Showcase
- **Production Pipeline Topology**:
  - Scalable compute provisioning on **AWS EC2**.
  - Secure storage with **AWS S3** bucket encryption and KMS keys.
  - Microservices containerization via **Docker**.
  - Automated CI/CD pipelines with **GitHub Actions** and static code analysis.
  - Least-privilege **AWS IAM** security policy modeling.

### 5. 📄 Official Resume Integration
- **Direct PDF Download**: Immediate 1-click download of the official `Atharva_Dnyaneshwar_Shastrakar_Resume.pdf`.
- **In-Browser Embed Viewer**: Built-in modal and standalone page (`resume.html`) displaying the original document.

### 6. ⌨️ Command Palette (`Cmd + K` / `Ctrl + K`)
- Instant keyboard-driven navigation to search sections, inspect projects, or trigger tools from anywhere on the page.

### 7. 🔊 Dynamic Web Audio Synthesizer
- Synthesizes retro terminal keystrokes, radar blips, and security tones on-the-fly using the **Web Audio API** without loading external `.mp3` files.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 (W3C / SEO Optimized) |
| **Styling** | Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Responsive `@media` queries) |
| **Logic & State** | Modern Vanilla JavaScript (ES6+ Modules, Async/Await) |
| **Cryptography** | Client-Side Web Crypto API (`crypto.subtle`) |
| **Visual Effects** | HTML5 Canvas Particle Grid (`matrix-bg.js`) |
| **Sound Synthesis** | Web Audio API (`AudioContext`, `sound-fx.js`) |
| **Hosting & CI/CD** | GitHub Pages & GitHub Actions |
| **Dependencies** | **0 External Frameworks / Zero NPM packages** (100% lightweight & fast) |

---

## 📂 Repository Structure

```
Portfolio/
├── index.html              # Main Single Page Application (SPA)
├── resume.html             # Dedicated Standalone PDF Resume Viewer
├── README.md               # Repository Documentation & Overview
├── assets/
│   ├── Atharva_Dnyaneshwar_Shastrakar_Resume.pdf # Official Resume PDF
│   └── resume.pdf          # Fast-link PDF Alias
├── css/
│   ├── main.css            # Design tokens, typography, navbar, footer & layouts
│   ├── components.css      # Portal loading HUD, terminal, crypto lab, cards & modals
│   └── animations.css      # Radar sweeps, glitch text, glowing pulses & transitions
└── js/
    ├── app.js              # Application core, telemetry detection, modal handlers & UI routing
    ├── terminal.js         # Interactive SOC command-line shell engine
    ├── crypto-tools.js     # Web Crypto API engine (AES-GCM, HMAC, Caesar, Rail Fence)
    ├── password-analyzer.js# Shannon entropy calculator & NIST compliance evaluator
    ├── sound-fx.js         # Web Audio API retro acoustic synthesizer
    └── matrix-bg.js        # Dynamic HTML5 Canvas background particle system
```

---

## 🚀 Local Development Setup

To run this portfolio locally on your computer:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AtharvaShastrakar/Portfolio.git
   cd Portfolio
   ```

2. **Launch a lightweight local server:**
   
   Using Python:
   ```bash
   python3 -m http.server 8080
   ```
   
   Or using Node (`npx`):
   ```bash
   npx serve .
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:8080` in your browser.

---

## 💼 Career History & Experience

- **Customer Support Executive** — *Offcomfrt Apparels LLP* (`July 2026 – Present`)
- **Full Stack Developer** — *Chrysadalus* (`May 2025 – Aug 2025`)
- **Business Development Intern** — *Skidev Inc* (`May 2025 – Aug 2025`)
- **President, Cyber Warrior Club** — *VIT Bhopal University* (`Jul 2024 – Jun 2025`)

---

## 📜 Verified Credentials & Certifications

- [✔] **Cybersecurity Analyst Professional Certificate** — *IBM*
- [✔] **MERN Full Stack Web Development** — *Ethnus*
- [⏳] **AWS Certified Cloud Practitioner** — *Amazon Web Services (In Progress)*
- [⏳] **Certified in Cybersecurity (CC)** — *ISC2 (In Progress)*
- [⏳] **Certified Ethical Hacker (CEH)** — *EC-Council (In Progress)*

---

## 📬 Connect with Atharva

- 💼 **LinkedIn:** [linkedin.com/in/atharva-shastrakar](https://linkedin.com)
- 🐙 **GitHub:** [github.com/AtharvaShastrakar](https://github.com/AtharvaShastrakar)
- 💻 **LeetCode:** [leetcode.com/AtharvaShastrakar](https://leetcode.com)
- 📧 **Email:** [atharva.d.s.shastrakar@gmail.com](mailto:atharva.d.s.shastrakar@gmail.com)
- 📱 **Phone:** `+91-7499074139`

---

<div align="center">
  <sub>© 2026 Atharva Dnyaneshwar Shastrakar. Built with Zero Dependencies & Secure Architecture.</sub>
</div>
