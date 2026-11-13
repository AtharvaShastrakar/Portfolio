/* Project case-study details (carried over from the previous portfolio). */
window.PROJECT_DETAILS = {
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
