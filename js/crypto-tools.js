/* ==========================================================================
   ATHARVA PORTFOLIO - CRYPTOGRAPHY SUITE PLAYGROUND
   Client-side cryptographic tools implementing AES-GCM, HMAC, RSA, Rail Fence,
   Caesar & Transposition algorithms.
   ========================================================================== */

class CryptoPlayground {
  constructor() {
    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.algoSelect = document.getElementById('crypto-algo-select');
    this.modeSelect = document.getElementById('crypto-mode-select');
    this.inputText = document.getElementById('crypto-input-text');
    this.keyInput = document.getElementById('crypto-key-input');
    this.keyGroup = document.getElementById('crypto-key-group');
    this.paramGroup = document.getElementById('crypto-param-group');
    this.paramInput = document.getElementById('crypto-param-input');
    this.paramLabel = document.getElementById('crypto-param-label');
    
    this.btnRun = document.getElementById('crypto-btn-run');
    this.btnSample = document.getElementById('crypto-btn-sample');
    this.btnClear = document.getElementById('crypto-btn-clear');
    
    this.outputBox = document.getElementById('crypto-output-text');
    this.metaAlgo = document.getElementById('meta-algo-name');
    this.metaTime = document.getElementById('meta-exec-time');
    this.metaKeyLen = document.getElementById('meta-key-len');
    this.metaStatus = document.getElementById('meta-status-text');
  }

  bindEvents() {
    if (!this.algoSelect || !this.btnRun) return;

    this.algoSelect.addEventListener('change', () => this.handleAlgoChange());
    this.btnRun.addEventListener('click', () => this.executeCrypto());
    if (this.btnSample) this.btnSample.addEventListener('click', () => this.loadSample());
    if (this.btnClear) this.btnClear.addEventListener('click', () => this.clearFields());
    
    // Initial config
    this.handleAlgoChange();
  }

  handleAlgoChange() {
    const algo = this.algoSelect.value;
    if (algo === 'aes') {
      this.keyGroup.style.display = 'flex';
      this.paramGroup.style.display = 'none';
      this.keyInput.placeholder = 'e.g., SecretPassphrase2026!';
    } else if (algo === 'hmac') {
      this.keyGroup.style.display = 'flex';
      this.paramGroup.style.display = 'none';
      this.keyInput.placeholder = 'e.g., SecretSigningKey';
    } else if (algo === 'rsa') {
      this.keyGroup.style.display = 'none';
      this.paramGroup.style.display = 'none';
    } else if (algo === 'caesar') {
      this.keyGroup.style.display = 'none';
      this.paramGroup.style.display = 'flex';
      this.paramLabel.textContent = 'Shift Key (1-25):';
      this.paramInput.type = 'number';
      this.paramInput.value = '7';
      this.paramInput.min = '1';
      this.paramInput.max = '25';
    } else if (algo === 'railfence') {
      this.keyGroup.style.display = 'none';
      this.paramGroup.style.display = 'flex';
      this.paramLabel.textContent = 'Rails (2-10):';
      this.paramInput.type = 'number';
      this.paramInput.value = '3';
      this.paramInput.min = '2';
      this.paramInput.max = '10';
    } else if (algo === 'base64') {
      this.keyGroup.style.display = 'none';
      this.paramGroup.style.display = 'none';
    }
  }

  loadSample() {
    const algo = this.algoSelect.value;
    if (algo === 'aes' || algo === 'hmac') {
      this.inputText.value = "CONFIDENTIAL: Atharva's SOC Threat Intelligence Report #2026-X";
      this.keyInput.value = "CyberWarriorKey_2026$#";
    } else if (algo === 'rsa') {
      this.inputText.value = "Simulate RSA 2048-bit Public/Private Keypair Generation for secure identity exchange.";
    } else if (algo === 'caesar') {
      this.inputText.value = "DEFEND THE PERIMETER WITH ZERO TRUST ARCHITECTURE";
      this.paramInput.value = "7";
    } else if (algo === 'railfence') {
      this.inputText.value = "CYBERSECURITY AND DIGITAL FORENSICS INVESTIGATION";
      this.paramInput.value = "3";
    } else if (algo === 'base64') {
      this.inputText.value = "Atharva Dnyaneshwar Shastrakar - Cybersecurity Analyst & Full Stack Developer";
    }
    if (window.soundFX) window.soundFX.playKeyClick();
  }

  clearFields() {
    this.inputText.value = '';
    this.outputBox.textContent = '// Output will be displayed here after computation...';
    this.metaStatus.textContent = 'IDLE';
    this.metaStatus.style.color = '#94a3b8';
    this.metaTime.textContent = '--';
    this.metaKeyLen.textContent = '--';
    if (window.soundFX) window.soundFX.playKeyClick();
  }

  async executeCrypto() {
    const algo = this.algoSelect.value;
    const mode = this.modeSelect.value; // 'encrypt' or 'decrypt'
    const input = this.inputText.value;
    const keyStr = this.keyInput.value;
    const startTime = performance.now();

    if (!input.trim() && algo !== 'rsa') {
      this.outputBox.textContent = '[ERROR]: Please provide input text to process.';
      if (window.soundFX) window.soundFX.playAlert();
      return;
    }

    try {
      this.metaStatus.textContent = 'COMPUTING...';
      this.metaStatus.style.color = '#38bdf8';
      let result = '';
      let keyInfo = '--';

      if (algo === 'aes') {
        if (!keyStr) throw new Error('Secret key is required for AES-GCM.');
        if (mode === 'encrypt') {
          result = await this.aesEncrypt(input, keyStr);
          keyInfo = '256-bit AES-GCM + 96-bit IV';
        } else {
          result = await this.aesDecrypt(input, keyStr);
          keyInfo = '256-bit AES-GCM';
        }
      } else if (algo === 'hmac') {
        if (!keyStr) throw new Error('Key is required for HMAC-SHA256 generation.');
        result = await this.hmacSha256(input, keyStr);
        keyInfo = 'HMAC-SHA256 (256 bits)';
      } else if (algo === 'rsa') {
        result = await this.generateRSAKeyPair();
        keyInfo = 'RSA-OAEP 2048-bit';
      } else if (algo === 'caesar') {
        const shift = parseInt(this.paramInput.value, 10) || 3;
        result = this.caesarCipher(input, shift, mode === 'encrypt');
        keyInfo = `Caesar Shift: ${shift}`;
      } else if (algo === 'railfence') {
        const rails = parseInt(this.paramInput.value, 10) || 3;
        result = this.railFenceCipher(input, rails, mode === 'encrypt');
        keyInfo = `Rail Fence (${rails} rails)`;
      } else if (algo === 'base64') {
        if (mode === 'encrypt') {
          result = btoa(unescape(encodeURIComponent(input)));
        } else {
          result = decodeURIComponent(escape(atob(input)));
        }
        keyInfo = 'RFC 4648 Base64';
      }

      const elapsed = (performance.now() - startTime).toFixed(2);
      this.outputBox.textContent = result;
      this.metaAlgo.textContent = algo.toUpperCase();
      this.metaTime.textContent = `${elapsed} ms`;
      this.metaKeyLen.textContent = keyInfo;
      this.metaStatus.textContent = 'SUCCESS (200 OK)';
      this.metaStatus.style.color = '#34d399';

      if (window.soundFX) window.soundFX.playSuccess();
    } catch (err) {
      this.outputBox.textContent = `[CRYPTOGRAPHIC EXCEPTION]: ${err.message}`;
      this.metaStatus.textContent = 'FAILED';
      this.metaStatus.style.color = '#ef4444';
      if (window.soundFX) window.soundFX.playAlert();
    }
  }

  // Real AES-GCM via Web Crypto API
  async aesEncrypt(plainText, password) {
    const enc = new TextEncoder();
    const pwUtf8 = enc.encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const key = await crypto.subtle.importKey('raw', pwHash, { name: 'AES-GCM' }, false, ['encrypt']);
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ctBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plainText));
    
    const ctArray = Array.from(new Uint8Array(ctBuffer));
    const ivArray = Array.from(iv);
    
    const packet = {
      cipher: 'AES-256-GCM',
      iv: btoa(String.fromCharCode.apply(null, ivArray)),
      ciphertext: btoa(String.fromCharCode.apply(null, ctArray)),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(packet, null, 2);
  }

  async aesDecrypt(jsonStr, password) {
    let packet;
    try {
      packet = JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('Input must be a valid JSON packet produced by the AES encryptor.');
    }
    if (!packet.iv || !packet.ciphertext) {
      throw new Error('Invalid packet: Missing IV or ciphertext.');
    }

    const enc = new TextEncoder();
    const pwUtf8 = enc.encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const key = await crypto.subtle.importKey('raw', pwHash, { name: 'AES-GCM' }, false, ['decrypt']);

    const iv = new Uint8Array(atob(packet.iv).split('').map(c => c.charCodeAt(0)));
    const ct = new Uint8Array(atob(packet.ciphertext).split('').map(c => c.charCodeAt(0)));

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  // HMAC-SHA256
  async hmacSha256(message, secret) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    const hashArray = Array.from(new Uint8Array(signature));
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `HMAC-SHA256 DIGEST (HEX):\n${hexHash}\n\nBASE64 SIGNATURE:\n${btoa(String.fromCharCode.apply(null, hashArray))}`;
  }

  // Live RSA Key Pair Generation
  async generateRSAKeyPair() {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      },
      true,
      ['encrypt', 'decrypt']
    );

    const pubExported = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const privExported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

    const pubBase64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(pubExported))));
    const privBase64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(privExported))));

    return `-----BEGIN RSA PUBLIC KEY (2048-BIT SPKI)-----\n${pubBase64.match(/.{1,64}/g).join('\n')}\n-----END RSA PUBLIC KEY-----\n\n-----BEGIN RSA PRIVATE KEY (2048-BIT PKCS#8)-----\n${privBase64.match(/.{1,64}/g).join('\n')}\n-----END RSA PRIVATE KEY-----`;
  }

  // Caesar Cipher
  caesarCipher(str, shift, isEncrypt = true) {
    const s = isEncrypt ? shift : (26 - (shift % 26)) % 26;
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + s) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + s) % 26) + 97);
      }
      return char;
    }).join('');
  }

  // Rail Fence Transposition Cipher
  railFenceCipher(str, rails, isEncrypt = true) {
    if (rails < 2 || str.length === 0) return str;
    
    if (isEncrypt) {
      const fence = Array.from({ length: rails }, () => []);
      let rail = 0;
      let direction = 1;

      for (let char of str) {
        fence[rail].push(char);
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction *= -1;
      }
      return fence.flat().join('');
    } else {
      const pattern = Array.from({ length: rails }, () => Array(str.length).fill(null));
      let rail = 0;
      let direction = 1;

      for (let i = 0; i < str.length; i++) {
        pattern[rail][i] = '*';
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction *= -1;
      }

      let index = 0;
      for (let r = 0; r < rails; r++) {
        for (let c = 0; c < str.length; c++) {
          if (pattern[r][c] === '*' && index < str.length) {
            pattern[r][c] = str[index++];
          }
        }
      }

      let result = '';
      rail = 0;
      direction = 1;
      for (let i = 0; i < str.length; i++) {
        result += pattern[rail][i];
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction *= -1;
      }
      return result;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cryptoPlayground = new CryptoPlayground();
});
