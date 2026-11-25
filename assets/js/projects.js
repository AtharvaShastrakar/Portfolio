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
    adlab: {
      title: 'Active Directory Security & Threat Detection Lab',
      category: 'Adversary Emulation & Detection Engineering',
      stack: ['Windows Server 2022/2025', 'Windows 10/11', 'Kali Linux', 'PowerShell', 'Sysmon', 'Splunk SPL', 'Elastic KQL', 'Impacket', 'NetExec', 'BloodHound', 'Hashcat', 'MITRE ATT&CK'],
      githubUrl: 'https://github.com/AtharvaShastrakar/Active-Directory-Security-Threat-Detection-Lab',
      description: 'A fully reproducible, multi-VM Active Directory lab mirroring a corporate domain (adlab.test). It pairs red team adversary emulation with blue team telemetry and detection engineering, runs on a 16 GB host (Apple Silicon or x86), and is provisioned end to end by PowerShell scripts.',
      architecture: `
+-------------------------------------------------------------------------+
|          ISOLATED LAB NETWORK 192.168.56.0/24 (no internet bridge)      |
+-------------------------------------------------------------------------+
[ DC01  .10 ]   Windows Server, forest adlab.test, AD DS, DNS, Kerberos KDC
      |
      +------------------+------------------+
      v                  v                  v
[ CLIENT01 .20 ]   [ CLIENT02 .21 ]   [ KALI .50 ]
  Initial foothold   Lateral pivot      Impacket, NetExec,
  Sysmon + 4104      Sysmon + 4104      BloodHound, Hashcat

ATTACK PATH (Kali)                        DETECTION (Sysmon + Event Logs)
Recon / BloodHound            ------->    4624, Sysmon 3
AS-REP Roast  (svc_backup)    ------->    4768  PreAuthType 0
Kerberoast    (svc_sql SPN)   ------->    4769  RC4 (0x17)
Pass-the-Hash / PsExec / WinRM ------>    4624 type 3, 7045, Sysmon 1/17/18
DCSync / secretsdump          ------->    4662  directory replication
                                              |
                                              v
                                 [ Splunk SPL / Elastic KQL rules ]
      `,
      highlights: [
        'Five PowerShell scripts promote the domain controller, seed OUs, users, SPNs and deliberate misconfigurations, join the clients and enable auditing.',
        'Red team playbook covering reconnaissance, AS-REP roasting, Kerberoasting, Pass-the-Hash over WMI, PsExec, WinRM and NTDS.dit dumping via DRSUAPI.',
        'Blue team telemetry: tuned Sysmon config, command-line process auditing (4688), PowerShell script block logging (4104) and Kerberos ticket auditing (4768/4769).',
        'Every exercise mapped to MITRE ATT&CK techniques with matching Splunk SPL and Elastic KQL detection queries.',
        'EDR internals research: ntdll.dll user-mode hooking, AMSI and ETW in-memory patching, direct syscalls and DLL unhooking.'
      ]
    },
    killswitch: {
      title: 'KillSwitch – Auto-Lock & Remote Wipe for Unreturned Laptops',
      category: 'Endpoint Security & Device Lifecycle (Prototype)',
      stack: ['Go 1.22', 'Node.js 22', 'Express', 'SQLite', 'BitLocker', 'Windows MDM RemoteWipe', 'PowerShell', 'Ed25519', 'AES-256-GCM', 'HMAC-SHA256', 'scrypt'],
      githubUrl: 'https://github.com/AtharvaShastrakar/KillSwitch',
      description: 'When an employee leaves and does not return their laptop, KillSwitch moves it through offboarding, a grace period, a reversible BitLocker lock and finally a two-admin-approved wipe. A Node.js server runs the workflow and admin dashboard; a Go agent on each laptop verifies signed commands and carries them out.',
      architecture: `
+-------------------------------------------------------------------------+
|                     KILLSWITCH OFFBOARDING WORKFLOW                     |
+-------------------------------------------------------------------------+
Resigns -> OFFBOARDING -last day-> GRACE (10 days) -not returned-> LOCKED
                                      |                              |
                                      |                  still missing v
                                      |                        WIPE PENDING
                                      |                              |
                                      |              2 admins approve v
                                      +--- returned ---> RETURNED    WIPED

[ HR system ] --HMAC-signed webhook--> [ Node.js / Express server ]
                                        - workflow engine + SQLite
                                        - admin dashboard (strict CSP)
                                        - append-only audit log
                                        - recovery keys, AES-256-GCM
                                                 |
                               Ed25519-signed commands + 7-day lease
                                                 v
                                      [ Go agent on each laptop ]
                                        - pins server public key
                                        - rejects expired / replayed cmds
                                        - LOCK: remove BitLocker TPM key
                                        - WIPE: crypto-shred + reset
                                        - offline past lease -> self-lock
      `,
      highlights: [
        'Lock removes the BitLocker TPM protector so the laptop boots to a recovery screen with a return-to-IT message; IT can undo it with the escrowed recovery key.',
        'Wipe crypto-shreds the escrowed recovery key and triggers Windows protected factory reset, and needs approval from two different admins, with mass-wipe rate limiting.',
        'Commands and leases are signed with Ed25519; the agent pins the server key and rejects expired commands and replays.',
        'Offline safety net: a laptop that misses its 7-day lease, or whose clock is moved backwards, locks itself; re-enrolling a locked serial number locks it again.',
        'Recovery keys encrypted with AES-256-GCM, scrypt password hashing, throttled logins, HMAC-verified HR webhooks and an append-only audit log enforced by database triggers.',
        'Ships in dry-run mode, with a demo mode where one day is ten seconds, so the full lifecycle can be shown safely on a Mac.'
      ]
    },
    dnslookup: {
      title: 'DNS Lookup CLI – DNS Toolkit & Email Security Auditor',
      category: 'Network Security & Email Authentication',
      stack: ['Python 3.10+', 'dnspython', 'Typer', 'Rich', 'cryptography', 'pytest', 'uv'],
      githubUrl: 'https://github.com/AtharvaShastrakar/DNS-Lookup',
      description: 'A DNS query CLI with rich terminal output and a built-in email security audit. It looks up every common record type, traces resolution from the root servers, runs WHOIS and batch lookups, and scores a domain\'s MX, SPF, DKIM and DMARC setup from 0 to 100 with an A to F grade.',
      architecture: `
+-------------------------------------------------------------------------+
|                      DNSLOOKUP CLI ARCHITECTURE                         |
+-------------------------------------------------------------------------+
[ cli.py : Typer commands ]
   query | reverse | trace | batch | whois | email | mx | spf | dkim | dmarc
          |
          +------------------------+-------------------------+
          v                        v                         v
[ resolver.py ]          [ email_security.py ]        [ whois.py ]
- dnspython client       - MX: PTR, Null MX, CNAME    - IANA + registrar
- reverse (PTR)          - SPF: include tree, 10        referral following
- concurrent batch         lookup + void limits
- iterative root trace   - DKIM: ~65 selectors, key size
                         - DMARC, MTA-STS, TLS-RPT, BIMI
                         - score 0-100, grade A-F
          |                        |
          +-----------+------------+
                      v
          [ output.py : Rich tables | --json ]
                      |
                      v
          exit code 1 on grade F  -->  can gate CI pipelines
      `,
      highlights: [
        'Record lookups for A, AAAA, MX, NS, TXT, CNAME and SOA, plus CAA, SRV, PTR, DS, DNSKEY, HTTPS, SVCB, NAPTR and TLSA.',
        'Iterative trace from the root servers to the authoritative nameserver, like dig +trace, plus concurrent batch lookups and WHOIS with referral following.',
        'SPF validation expands the full include/redirect tree, enforces the 10-lookup and 2-void-lookup limits, detects loops and grades the all policy.',
        'DKIM discovery probes about 65 common selectors, reports RSA key size or Ed25519, and flags revoked keys, testing mode and SHA-1-only keys.',
        'Weighted 0 to 100 score with an A to F grade, JSON output on every command, and 46 offline unit tests against an in-memory DNS zone.'
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
