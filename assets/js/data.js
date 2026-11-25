/**
 * Atharva Shastrakar - portfolio content.
 * Edit this file to change text on the site. Project case-study details are in projects.js.
 */
const portfolioData = {
  personal: {
    name: "Atharva Shastrakar",
    title: "Cybersecurity Analyst & Full Stack Developer",
    email: "atharva.d.s.shastrakar@gmail.com",
    phone: "+91-7499074139",
    location: "Maharashtra, India",
    linkedin: "https://www.linkedin.com/in/atharva-shastrakar/",
    linkedinDisplay: "linkedin.com/in/atharva-shastrakar",
    github: "https://github.com/AtharvaShastrakar",
    githubDisplay: "github.com/AtharvaShastrakar",
    resume: "assets/documents/Atharva_Dnyaneshwar_Shastrakar_Resume.pdf",
    summary: "Cyber Security and Digital Forensics graduate of VIT Bhopal University with hands-on experience in full-stack web engineering, secure application architecture and AWS cloud. I defend systems and build scalable, zero-trust software, treating security as part of the architecture from the first commit."
  },

  /* Lines typed one after another above the name. */
  roles: [
    "Cybersecurity Analyst",
    "Full Stack Developer",
    "B.Tech CSE, Cyber Security & Digital Forensics",
    "VIT Bhopal University",
    "AWS Cloud & DevSecOps"
  ],

  marquee: ["Penetration Testing", "Active Directory", "Nmap", "Wireshark", "Metasploit", "Burp Suite", "Sysmon", "Splunk", "BitLocker", "NIST CSF", "Digital Forensics", "Python", "React", "Next.js", "Django", "PostgreSQL", "AWS", "Docker", "GitHub Actions", "AES-256-GCM", "Argon2id"],

  stats: [
    { value: "200+", label: "Students in CTFs & workshops", highlight: "Cyber Warrior Club" },
    { value: "300+", label: "Participants at events I ran", highlight: "With industry sponsorship" },
    { value: "30+", label: "Members mentored", highlight: "Structured onboarding" },
    { value: "9+", label: "Ciphers implemented", highlight: "Cryptography Suite" },
    { value: "71", label: "Automated tests", highlight: "Pass-Vault, 88% coverage" }
  ],

  /* Most recent first. `node` is how the role appears on the route diagram. */
  experiences: [
    {
      id: "offcomfrt",
      company: "Offcomfrt Apparels LLP",
      role: "Customer Support Executive",
      period: "Jul 2026 – Aug 2026",
      category: "Operations",
      badge: "Customer operations",
      node: { tag: "HOP-04", sym: "headset", name: "Offcomfrt Apparels", sub: "Customer support", yr: "2026" },
      teaser: "Handled high-priority client communication and dispute resolution, and tightened the ticketing workflow so escalations moved faster.",
      projectTitle: "Client communication, escalation handling and service workflow improvement",
      highlights: [
        "Managed high-priority client communications, dispute resolution, and cross-channel support workflows.",
        "Streamlined service workflows and CRM ticketing systems, ensuring prompt escalations and high customer satisfaction scores.",
        "Collaborated with operational teams to analyze client feedback, identify recurring service bottlenecks, and optimize processes."
      ],
      technologies: ["CRM ticketing", "Escalation handling", "Dispute resolution", "Process improvement"],
      metrics: [
        { label: "Focus", val: "Client communication" },
        { label: "Systems", val: "CRM ticketing" },
        { label: "Worked with", val: "Operations teams" }
      ]
    },
    {
      id: "chrysadalus",
      company: "Chrysadalus",
      role: "Full Stack Developer",
      period: "Nov 2025 – Mar 2026",
      category: "Full-stack engineering",
      badge: "Web engineering",
      node: { tag: "HOP-03", sym: "code", name: "Chrysadalus", sub: "Full stack developer", yr: "2025 to 26" },
      teaser: "Built responsive web applications end to end and the REST APIs that connect their front ends to back-end services.",
      projectTitle: "Responsive web applications and REST API integration",
      highlights: [
        "Developed responsive web applications using modern frontend and backend technologies, delivering scalable and user-friendly solutions.",
        "Built and integrated RESTful APIs, improving communication between frontend interfaces and backend services.",
        "Collaborated with cross-functional teams to implement new features, optimize application performance, and resolve production issues."
      ],
      technologies: ["JavaScript", "React.js", "REST APIs", "Backend services", "Performance tuning"],
      metrics: [
        { label: "Scope", val: "Front end and back end" },
        { label: "Built", val: "RESTful APIs" },
        { label: "Worked with", val: "Cross-functional teams" }
      ]
    },
    {
      id: "skidev",
      company: "Skidev Inc",
      role: "Business Development Intern",
      period: "May 2025 – Aug 2025",
      category: "Business development",
      badge: "Market research",
      node: { tag: "HOP-02", sym: "chart", name: "Skidev Inc", sub: "Business development", yr: "2025" },
      teaser: "Researched markets and competitors, prepared technical pitches, and turned client requirements into development roadmaps.",
      projectTitle: "Market research, outreach and requirement translation for engineering",
      highlights: [
        "Conducted market research and competitor analysis to identify strategic expansion opportunities and new client demographics.",
        "Supported business outreach pipelines, prepared customized technical pitches, and engaged prospective partners.",
        "Collaborated with product and engineering teams to translate client requirements into actionable development roadmaps."
      ],
      technologies: ["Market research", "Competitor analysis", "Technical pitches", "Roadmapping"],
      metrics: [
        { label: "Focus", val: "Market and competitor research" },
        { label: "Delivered", val: "Technical pitches" },
        { label: "Worked with", val: "Product and engineering" }
      ]
    },
    {
      id: "cyber-warrior",
      company: "Cyber Warrior Club",
      role: "President",
      location: "VIT Bhopal University",
      period: "Jul 2024 – Jun 2025",
      category: "Security leadership",
      badge: "Club president",
      node: { tag: "HOP-01", sym: "shield", name: "Cyber Warrior Club", sub: "President", yr: "2024 to 25" },
      teaser: "Led the university security club: CTF competitions and workshops for 200+ students, events with 300+ participants, and a mentoring program.",
      projectTitle: "Running a university cybersecurity club: CTFs, workshops and mentoring",
      highlights: [
        "Directed cybersecurity workshops and CTF (Capture The Flag) competitions for 200+ students.",
        "Mentored 30+ members through a structured onboarding program in ethical hacking, penetration testing, and digital forensics.",
        "Managed technical events with 300+ participants and secured industry sponsorships."
      ],
      technologies: ["CTF design", "Ethical hacking", "Penetration testing", "Digital forensics", "Event management", "Sponsorships"],
      metrics: [
        { label: "Students reached", val: "200+" },
        { label: "Event participants", val: "300+" },
        { label: "Members mentored", val: "30+" }
      ]
    }
  ],

  /* Card text for each project. The id must match an entry in projects.js. */
  projects: [
    { id: "passvault", name: "Pass-Vault (pv)", sym: "lock", track: "Cryptographic engineering", badge: "Argon2id + AES",
      teaser: "Zero-knowledge encrypted CLI password manager with Argon2id memory-hard key derivation, AES-256-GCM, and crash-resilient atomic storage.",
      tags: ["Python 3", "Argon2id", "AES-256-GCM", "Zero-knowledge"] },
    { id: "adlab", name: "Active Directory Threat Detection Lab", sym: "shield", track: "Red & blue team lab", badge: "MITRE ATT&CK mapped",
      teaser: "Reproducible multi-VM Active Directory lab that pairs Kerberos, Pass-the-Hash and DCSync attack emulation with Sysmon telemetry and Splunk / Elastic detection rules.",
      tags: ["PowerShell", "Sysmon", "Splunk SPL", "Elastic KQL", "Impacket", "BloodHound"] },
    { id: "killswitch", name: "KillSwitch", sym: "lock", track: "Endpoint security & offboarding", badge: "Ed25519-signed commands",
      teaser: "Auto-lock and remote wipe for laptops not returned after offboarding. A Go agent enforces BitLocker lock and crypto-shred wipe commands signed by a Node.js server, with two-admin wipe approval.",
      tags: ["Go", "Node.js", "Express", "SQLite", "BitLocker", "Ed25519", "AES-256-GCM"] },
    { id: "dnslookup", name: "DNS Lookup CLI", sym: "file", track: "Network & email security", badge: "Graded A to F",
      teaser: "DNS query CLI with root-to-authoritative tracing, WHOIS and a scored email security audit of MX, SPF, DKIM and DMARC that can gate CI.",
      tags: ["Python", "dnspython", "Typer", "Rich", "pytest"] },
    { id: "fileintegrity", name: "File Integrity Checker", sym: "file", track: "Forensics & FIM", badge: "SHA-256 verified",
      teaser: "Log tamper detection CLI with recursive directory crawling, SHA-256 digests, and a protected POSIX 0600 baseline store.",
      tags: ["Python", "SHA-256", "FIM", "POSIX 0600"] },
    { id: "storeratings", name: "StoreRatings Platform", sym: "star", track: "Full-stack", badge: "Full-stack RBAC",
      teaser: "Rating and review platform with a Controller-Service-Schema layered architecture, multi-role RBAC, and analytics dashboards.",
      tags: ["React 19", "TypeScript", "Express 5", "PostgreSQL", "Prisma"] },
    { id: "orangechat", name: "OrangeChat", sym: "chat", track: "Real-time cloud & security", badge: "Supabase RLS",
      teaser: "Real-time group messaging on the Next.js App Router and Supabase Realtime, with database-level Row Level Security.",
      tags: ["Next.js", "TypeScript", "Supabase Realtime", "PostgreSQL RLS"] },
    { id: "votechain", name: "VoteChain", sym: "chain", track: "Decentralized & Web3", badge: "Verified protocol",
      teaser: "Decentralized electronic voting on the Solana blockchain with Phantom Wallet, for verifiable election results.",
      tags: ["Solana", "Next.js", "Phantom Wallet", "Rust / Anchor"] },
    { id: "cryptosuite", name: "Cryptography Suite", sym: "key", track: "Cryptographic security", badge: "9+ ciphers",
      teaser: "Modular Python cryptography toolkit with unified APIs for 9+ symmetric, asymmetric, and classical transposition algorithms.",
      tags: ["Python", "AES", "RSA", "Diffie-Hellman", "HMAC"] },
    { id: "awscloud", name: "AWS DevSecOps Pipeline", sym: "cloud", track: "Cloud & DevSecOps", badge: "Cloud hardened",
      teaser: "Zero-trust cloud architecture deploying containerized services on AWS EC2 and S3, with GitHub Actions CI/CD vulnerability scanning.",
      tags: ["AWS EC2", "Docker", "GitHub Actions", "IAM policies"] }
  ],

  skillsData: [
    {
      category: "Cybersecurity & Forensics", short: "Security & forensics",
      skills: [
        { name: "Penetration Testing", kind: "Method", domain: "Offensive security", desc: "Vulnerability assessment and audits of networks and web applications.", appliedAt: "Cyber Warrior Club workshops and CTFs", lab: true },
        { name: "Nmap", kind: "Tool", domain: "Recon & port profiling", desc: "Network topology discovery, port scanning and service fingerprinting." },
        { name: "Wireshark", kind: "Tool", domain: "Packet analysis", desc: "Packet capture and traffic analysis to spot anomalies and unauthorized access attempts." },
        { name: "Burp Suite", kind: "Tool", domain: "Web application testing", desc: "Intercepting and testing web traffic to find application vulnerabilities." },
        { name: "Metasploit", kind: "Tool", domain: "Exploitation", desc: "Validating vulnerabilities with controlled exploitation." },
        { name: "NIST Framework", kind: "Framework", domain: "Governance & incident response", desc: "Identify, Protect, Detect, Respond and Recover: threat identification, triage and forensic analysis.", lab: true },
        { name: "Network Security", kind: "Method", domain: "Defense in depth", desc: "Zero-trust access control, TLS, and least-privilege policies." },
        { name: "Digital Forensics", kind: "Method", domain: "Investigation", desc: "Root-cause triage and evidence integrity.", appliedAt: "File Integrity Checker" },
        { name: "Applied Cryptography", kind: "Method", domain: "Symmetric, asymmetric, HMAC", desc: "AES, DES, RSA, Diffie-Hellman and HMAC authentication.", appliedAt: "Pass-Vault, Cryptography Suite", lab: true },
        { name: "Active Directory Security", kind: "Method", domain: "Kerberos & lateral movement", desc: "AS-REP roasting, Kerberoasting, Pass-the-Hash, WinRM and DCSync, emulated and detected in an isolated lab.", appliedAt: "Active Directory Threat Detection Lab" },
        { name: "Sysmon & SIEM Detection", kind: "Tool", domain: "Detection engineering", desc: "Tuned Sysmon config, Windows audit policies, Splunk SPL and Elastic KQL rules mapped to MITRE ATT&CK.", appliedAt: "Active Directory Threat Detection Lab" },
        { name: "DNS & Email Security", kind: "Method", domain: "SPF, DKIM, DMARC", desc: "SPF include-tree validation, DKIM key analysis, DMARC policy checks, MTA-STS and TLS-RPT.", appliedAt: "DNS Lookup CLI" }
      ]
    },
    {
      category: "Programming Languages", short: "Languages",
      skills: [
        { name: "Python", kind: "Language", domain: "Security tooling & back ends", desc: "CLI security tools, cryptography and web back ends.", appliedAt: "Pass-Vault, File Integrity Checker, Cryptography Suite" },
        { name: "JavaScript (ES6+)", kind: "Language", domain: "Web", desc: "Front-end and Node.js development.", appliedAt: "StoreRatings, OrangeChat, this site" },
        { name: "C / C++", kind: "Language", domain: "Systems", desc: "Systems programming fundamentals." },
        { name: "Java", kind: "Language", domain: "Object-oriented", desc: "Object-oriented application development." },
        { name: "PowerShell", kind: "Language", domain: "Windows automation", desc: "Scripting and administration on Windows.", appliedAt: "Active Directory Threat Detection Lab, KillSwitch installer" },
        { name: "Go", kind: "Language", domain: "Endpoint agents", desc: "Cross-platform agent binaries with Windows-specific BitLocker and reset executors.", appliedAt: "KillSwitch" },
        { name: "Bash", kind: "Language", domain: "Linux automation", desc: "Shell scripting on Linux and macOS." }
      ]
    },
    {
      category: "Web & Frameworks", short: "Web & frameworks",
      skills: [
        { name: "React.js", kind: "Framework", domain: "Front end", desc: "Component-based user interfaces.", appliedAt: "StoreRatings Platform" },
        { name: "Next.js", kind: "Framework", domain: "Full stack", desc: "App Router, edge middleware and server rendering.", appliedAt: "OrangeChat, VoteChain" },
        { name: "Django", kind: "Framework", domain: "Back end", desc: "Python web applications and APIs." },
        { name: "Flask", kind: "Framework", domain: "Back end", desc: "Lightweight Python services and APIs." },
        { name: "RESTful APIs", kind: "Method", domain: "Integration", desc: "Designing and integrating APIs between front ends and services.", appliedAt: "Chrysadalus, StoreRatings" },
        { name: "PostgreSQL & MySQL", kind: "Database", domain: "Relational data", desc: "Schema design, Prisma ORM and Row Level Security.", appliedAt: "StoreRatings, OrangeChat" },
        { name: "HTML5 / CSS3", kind: "Language", domain: "Front end", desc: "Semantic, responsive layouts." }
      ]
    },
    {
      category: "Cloud & DevOps (AWS)", short: "Cloud & DevOps",
      skills: [
        { name: "AWS EC2", kind: "Cloud", domain: "Compute", desc: "Provisioning and hardening instances.", appliedAt: "AWS DevSecOps Pipeline" },
        { name: "AWS S3", kind: "Cloud", domain: "Storage", desc: "Bucket encryption, versioning and bucket policies.", appliedAt: "AWS DevSecOps Pipeline" },
        { name: "AWS IAM", kind: "Cloud", domain: "Identity", desc: "Least-privilege roles and policy design.", appliedAt: "AWS DevSecOps Pipeline" },
        { name: "Docker", kind: "Tool", domain: "Containers", desc: "Containerized services with non-root execution and health checks.", appliedAt: "AWS DevSecOps Pipeline" },
        { name: "GitHub Actions CI/CD", kind: "Tool", domain: "Automation", desc: "Automated delivery pipelines with static analysis and dependency audits.", appliedAt: "AWS DevSecOps Pipeline" },
        { name: "VPC & Subnets", kind: "Cloud", domain: "Networking", desc: "Network segmentation, security groups and firewall rules." }
      ]
    }
  ],

  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      minor: "Specialization in Cyber Security and Digital Forensics",
      institution: "VIT Bhopal University, Bhopal, India",
      period: "Jun 2022 – Jun 2026",
      grade: "Cyber Security & Digital Forensics",
      rank: "CGPA 7.3 / 10",
      details: [
        "Coursework spanning offensive and defensive security, digital forensics, cryptography, networks and software engineering.",
        "President of the Cyber Warrior Club, the university cybersecurity club, from Jul 2024 to Jun 2025."
      ]
    }
  ],

  certificationsAndAwards: [
    { title: "Cybersecurity Analyst", issuer: "IBM Professional Certificate", date: "Verified", type: "Certification", desc: "Threat intelligence, SIEM tools, network defense, incident response methodologies, and forensic discovery." },
    { title: "MERN Full Stack", issuer: "Ethnus Training", date: "Verified", type: "Certification", desc: "MongoDB, Express.js, React.js and Node.js full-stack web architecture, API integration, and scalable UI engineering." },
    { title: "ISC2 Certified in Cybersecurity (CC)", issuer: "ISC2", date: "In progress", type: "In progress", desc: "Security principles, access controls, network security, and security operations." },
    { title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "In progress", type: "In progress", desc: "Attack vectors, vulnerability scanning, social engineering, web application penetration testing, and cryptography." },
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "In progress", type: "In progress", desc: "Cloud fundamentals, the shared responsibility model, IAM, VPC networking, EC2, and S3." }
  ],

  nist: [
    { code: "ID", name: "Identify", sub: "Asset & risk governance", items: ["Network topology discovery and port profiling", "Vulnerability assessment using Nmap and Burp", "Risk mitigation and threat modeling"] },
    { code: "PR", name: "Protect", sub: "Defensive hardening", items: ["Zero-trust access control and role-based auth", "AES-256-GCM and TLS 1.3 encryption", "AWS IAM least-privilege policies"] },
    { code: "DE", name: "Detect", sub: "Anomaly & event monitoring", items: ["Wireshark packet capture and analysis", "Cryptographic audit log verification", "Unauthorized access attempt monitoring"] },
    { code: "RS", name: "Respond", sub: "Incident response", items: ["Containment of compromised endpoints", "Root-cause forensic triage", "Incident documentation and escalation"] },
    { code: "RC", name: "Recover", sub: "Resilience & continuity", items: ["AWS S3 versioned backups and recovery", "Docker automated service restoration", "Post-incident hardening reviews"] }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
