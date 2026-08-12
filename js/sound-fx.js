/* ==========================================================================
   ATHARVA PORTFOLIO - CYBER AUDIO FX SYNTHESIZER (WEB AUDIO API)
   Generates subtle sci-fi / terminal feedback without external audio files.
   ========================================================================== */

class CyberSoundFX {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('cyber_sound_enabled') === 'true';
    this.initUserGesture();
  }

  initUserGesture() {
    const unlock = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('cyber_sound_enabled', this.enabled ? 'true' : 'false');
    if (this.enabled) {
      this.playBeep(880, 'sine', 0.08, 0.04);
    }
    return this.enabled;
  }

  playKeyClick() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 400, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.03);
    } catch (e) {
      // Audio context might be restricted
    }
  }

  playBeep(freq = 600, type = 'sine', duration = 0.08, vol = 0.03) {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled || !this.audioCtx) return;
    this.playBeep(523.25, 'sine', 0.08, 0.03);
    setTimeout(() => this.playBeep(659.25, 'sine', 0.08, 0.03), 70);
    setTimeout(() => this.playBeep(783.99, 'sine', 0.12, 0.035), 140);
  }

  playCommandExecute() {
    if (!this.enabled || !this.audioCtx) return;
    this.playBeep(440, 'triangle', 0.06, 0.04);
    setTimeout(() => this.playBeep(880, 'sine', 0.09, 0.04), 50);
  }

  playAlert() {
    if (!this.enabled || !this.audioCtx) return;
    this.playBeep(240, 'sawtooth', 0.15, 0.03);
  }
}

window.soundFX = new CyberSoundFX();
