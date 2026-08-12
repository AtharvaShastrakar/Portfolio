/* ==========================================================================
   ATHARVA PORTFOLIO - PASSWORD ENTROPY & SECURITY ANALYZER
   Calculates Shannon entropy, brute-force cracking resistance, and NIST compliance.
   ========================================================================== */

class PasswordAnalyzer {
  constructor() {
    this.input = document.getElementById('pass-input');
    this.toggleVisBtn = document.getElementById('pass-toggle-vis');
    this.meterFill = document.getElementById('pass-meter-fill');
    this.strengthText = document.getElementById('pass-strength-text');
    
    this.statEntropy = document.getElementById('stat-entropy-bits');
    this.statCrackGpu = document.getElementById('stat-crack-gpu');
    this.statPoolSize = document.getElementById('stat-pool-size');
    this.statLength = document.getElementById('stat-length');

    this.checkLength = document.getElementById('chk-len');
    this.checkUpper = document.getElementById('chk-upper');
    this.checkLower = document.getElementById('chk-lower');
    this.checkNumber = document.getElementById('chk-num');
    this.checkSpecial = document.getElementById('chk-sym');
    this.checkRepetition = document.getElementById('chk-no-repeat');

    this.bindEvents();
  }

  bindEvents() {
    if (!this.input) return;

    this.input.addEventListener('input', () => this.analyze());
    if (this.toggleVisBtn) {
      this.toggleVisBtn.addEventListener('click', () => {
        const type = this.input.type === 'password' ? 'text' : 'password';
        this.input.type = type;
        this.toggleVisBtn.textContent = type === 'password' ? '👁 Show' : '🔒 Hide';
      });
    }
  }

  analyze() {
    const val = this.input.value;
    const len = val.length;

    if (len === 0) {
      this.resetStats();
      return;
    }

    let pool = 0;
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);
    const isSequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|qwerty|password|admin)/i.test(val);

    if (hasLower) pool += 26;
    if (hasUpper) pool += 26;
    if (hasNumber) pool += 10;
    if (hasSpecial) pool += 33;

    // Calculate Entropy: H = L * log2(Pool)
    const entropy = pool > 0 ? len * (Math.log(pool) / Math.log(2)) : 0;
    const entropyFormatted = entropy.toFixed(1);

    // Update Checklist
    this.updateCheck(this.checkLength, len >= 12);
    this.updateCheck(this.checkUpper, hasUpper);
    this.updateCheck(this.checkLower, hasLower);
    this.updateCheck(this.checkNumber, hasNumber);
    this.updateCheck(this.checkSpecial, hasSpecial);
    this.updateCheck(this.checkRepetition, !isSequential && !/(.)\1{2,}/.test(val));

    // Stats
    this.statLength.textContent = `${len} chars`;
    this.statPoolSize.textContent = `${pool} symbols`;
    this.statEntropy.textContent = `${entropyFormatted} bits`;

    // Crack time estimation (Assuming high-end multi-GPU cluster at 100 Billion hashes/sec)
    const combinations = Math.pow(pool, len);
    const hashesPerSec = 100_000_000_000; // 100 GH/s
    const secondsToCrack = combinations / hashesPerSec / 2; // Average 50%
    this.statCrackGpu.textContent = this.formatTime(secondsToCrack);

    // Strength classification
    let score = Math.min(100, Math.round((entropy / 80) * 100));
    if (isSequential) score = Math.max(10, score - 25);

    this.meterFill.style.width = `${score}%`;

    if (score < 30) {
      this.meterFill.style.background = '#ef4444';
      this.strengthText.textContent = 'VULNERABLE / VERY WEAK';
      this.strengthText.style.color = '#ef4444';
    } else if (score < 60) {
      this.meterFill.style.background = '#f59e0b';
      this.strengthText.textContent = 'MODERATE / CRACKABLE';
      this.strengthText.style.color = '#f59e0b';
    } else if (score < 85) {
      this.meterFill.style.background = '#00f2fe';
      this.strengthText.textContent = 'STRONG / DEFENSE READY';
      this.strengthText.style.color = '#00f2fe';
    } else {
      this.meterFill.style.background = '#10b981';
      this.strengthText.textContent = 'ENTERPRISE / QUANTUM RESISTANT';
      this.strengthText.style.color = '#10b981';
    }
  }

  updateCheck(el, passed) {
    if (!el) return;
    if (passed) {
      el.className = 'check-item passed';
      el.querySelector('.icon').textContent = '✓';
    } else {
      el.className = 'check-item failed';
      el.querySelector('.icon').textContent = '✕';
    }
  }

  formatTime(seconds) {
    if (seconds < 0.001) return 'Instant (< 1ms)';
    if (seconds < 1) return '< 1 second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000 * 1000000) return `${Math.round(seconds / (31536000 * 1000))}k years`;
    return 'Centuries+ (> 1M years)';
  }

  resetStats() {
    this.meterFill.style.width = '0%';
    this.strengthText.textContent = 'ENTER PASSWORD';
    this.strengthText.style.color = 'var(--text-muted)';
    this.statEntropy.textContent = '0 bits';
    this.statCrackGpu.textContent = '--';
    this.statPoolSize.textContent = '0 symbols';
    this.statLength.textContent = '0 chars';
    [this.checkLength, this.checkUpper, this.checkLower, this.checkNumber, this.checkSpecial, this.checkRepetition].forEach(el => {
      if (el) {
        el.className = 'check-item';
        el.querySelector('.icon').textContent = '○';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.passwordAnalyzer = new PasswordAnalyzer();
});
