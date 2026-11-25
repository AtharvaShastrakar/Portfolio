/* Atharva Shastrakar portfolio. Renders content from data.js (portfolioData) and projects.js. */
(function () {
  'use strict';
  var D = window.portfolioData || (typeof portfolioData !== 'undefined' ? portfolioData : null);
  if (!D) { document.body.classList.remove('is-loading'); var g0 = document.getElementById('gate'); if (g0) g0.remove(); return; }

  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var P = D.personal, ITEMS = D.experiences, PROJECTS = D.projects, PD = window.PROJECT_DETAILS || {};
  var GROUP = { passvault: 'sec', adlab: 'sec', killswitch: 'sec', dnslookup: 'sec', fileintegrity: 'sec', cryptosuite: 'sec', storeratings: 'dev', orangechat: 'dev', votechain: 'dev', awscloud: 'cloud' };
  var projById = {};
  PROJECTS.forEach(function (p) { projById[p.id] = p; });
  var chips = function (list) { return '<span class="chips">' + list.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</span>'; };

  /* ---------- Hero ---------- */
  function drawHero() { $('lede').textContent = P.summary; }
  function typeRoles() {
    var el = $('typed'), roles = D.roles;
    if (CALM) { el.textContent = roles[0]; return; }
    var r = 0, i = 0, del = false;
    (function tick() {
      var s = roles[r];
      i += del ? -2 : 1;
      el.textContent = s.slice(0, Math.max(0, i));
      var wait = del ? 18 : 45;
      if (!del && i >= s.length) { del = true; wait = 2000; }
      else if (del && i <= 0) { del = false; r = (r + 1) % roles.length; wait = 300; }
      setTimeout(tick, wait);
    })();
  }

  /* ---------- Stats ---------- */
  function drawStats() {
    $('stats').innerHTML = D.stats.map(function (s) {
      return '<div class="stat"><b data-count="' + esc(s.value) + '">' + esc(s.value) + '</b><span>' + esc(s.label) + '</span><em>' + esc(s.highlight) + '</em></div>';
    }).join('');
  }
  function countUp(el) {
    var m = /^(\D*)([\d.]+)(.*)$/.exec(el.getAttribute('data-count'));
    if (!m || CALM) return;
    var end = parseFloat(m[2]), t0 = null;
    (function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 4);
      el.textContent = m[1] + Math.round(end * e) + m[3];
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* ---------- About ---------- */
  function drawAbout() {
    var e = D.education[0];
    var rows = [['University', 'VIT Bhopal University'], ['Degree', 'B.Tech CSE, Cyber Security and Digital Forensics'], ['Timeline', e.period],
      ['CGPA', e.rank.replace('CGPA ', '')], ['Location', P.location], ['Target roles', 'Cybersecurity Analyst, Full Stack Developer']];
    $('id-fields').innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('');
  }

  /* ---------- Experience: list on the left, detail on the right ---------- */
  function drawXp() {
    var list = $('xp-list'), pane = $('xp-pane');
    list.innerHTML = ITEMS.map(function (x, i) {
      return '<button type="button" role="tab" class="xp-tab" id="xp-tab-' + i + '" aria-controls="xp-pane" data-i="' + i + '">' +
        '<span class="xp-date">' + esc(x.period) + '</span><b>' + esc(x.role) + '</b><span>' + esc(x.company) + '</span></button>';
    }).join('');
    function show(i, focus) {
      var x = ITEMS[i];
      $$('.xp-tab', list).forEach(function (t) {
        var on = +t.getAttribute('data-i') === i;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      pane.setAttribute('aria-labelledby', 'xp-tab-' + i);
      pane.innerHTML =
        '<div class="xp-head"><div><h3>' + esc(x.role) + '</h3><p class="xp-co">' + esc(x.company) + (x.location ? ', ' + esc(x.location) : '') + '</p></div>' +
        '<div class="xp-meta"><span class="xp-date">' + esc(x.period) + '</span><span class="tag">' + esc(x.badge) + '</span></div></div>' +
        '<ul class="ticks big">' + x.highlights.map(function (h, k) { return '<li style="--k:' + k + '">' + esc(h) + '</li>'; }).join('') + '</ul>' +
        chips(x.technologies);
    }
    list.addEventListener('click', function (e) { var t = e.target.closest('.xp-tab'); if (t) show(+t.getAttribute('data-i')); });
    list.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var cur = +list.querySelector('[aria-selected="true"]').getAttribute('data-i');
      show((cur + d + ITEMS.length) % ITEMS.length, true); e.preventDefault();
    });
    show(0);
  }

  /* ---------- Projects and detail drawer ---------- */
  function drawProjects() {
    var grid = $('proj'), filters = $('filters');
    var F = [['all', 'All'], ['sec', 'Security'], ['dev', 'Full-stack'], ['cloud', 'Cloud']];
    filters.innerHTML = F.map(function (f, i) {
      var n = f[0] === 'all' ? PROJECTS.length : PROJECTS.filter(function (p) { return GROUP[p.id] === f[0]; }).length;
      return '<button type="button" class="filter" data-f="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + f[1] + '<span>' + n + '</span></button>';
    }).join('');
    grid.innerHTML = PROJECTS.map(function (p) {
      return '<button type="button" class="card reveal" data-id="' + p.id + '" data-group="' + GROUP[p.id] + '">' +
        '<span class="card-top"><span class="path">' + esc(p.track) + '</span><span class="tag">' + esc(p.badge) + '</span></span>' +
        '<b class="card-name">' + esc(p.name) + '</b>' +
        '<span class="card-text">' + esc(p.teaser) + '</span>' + chips(p.tags) +
        '<span class="card-open">Inspect architecture</span></button>';
    }).join('');
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      var f = b.getAttribute('data-f');
      $$('.filter', filters).forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      $$('.card', grid).forEach(function (c) { c.hidden = f !== 'all' && c.getAttribute('data-group') !== f; c.classList.add('in'); });
    });
    grid.addEventListener('click', function (e) { var c = e.target.closest('.card'); if (c) openProject(c.getAttribute('data-id')); });
    var dlg = $('drawer');
    var close = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    $('drawer-x').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  }
  function openProject(id) {
    var p = projById[id], d = PD[id], dlg = $('drawer');
    if (!p || !d) return false;
    var isRepo = /github\.com\/[^/]+\/[^/]+/.test(d.githubUrl || '');
    $('drawer-body').innerHTML =
      '<span class="path">' + esc(p.track) + '</span>' +
      '<h2 id="drawer-title">' + esc(d.title) + '</h2>' +
      '<p class="drawer-cat">' + esc(d.category) + '</p>' +
      '<p>' + esc(d.description) + '</p>' +
      '<h3>Architecture</h3><pre class="arch" tabindex="0">' + esc(String(d.architecture).replace(/^\s*\n/, '').replace(/\s+$/, '')) + '</pre>' +
      '<h3>Engineering highlights</h3><ul class="ticks">' + d.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' +
      '<h3>Stack</h3>' + chips(d.stack) +
      (d.githubUrl ? '<p class="drawer-link"><a class="btn btn-fill" href="' + esc(d.githubUrl) + '" target="_blank" rel="noopener">' + (isRepo ? 'View code on GitHub' : 'GitHub profile') + '</a></p>' : '');
    if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
    dlg.scrollTop = 0;
    return true;
  }

  /* ---------- Lab tabs, NIST, skills, certifications ---------- */
  function bindTabs() {
    var tabs = $$('.lab .tab');
    tabs.forEach(function (b) {
      b.addEventListener('click', function () {
        tabs.forEach(function (o) { o.setAttribute('aria-selected', o === b); $('pane-' + o.getAttribute('data-pane')).hidden = o !== b; });
      });
    });
  }
  function drawLists() {
    $('nist-list').innerHTML = D.nist.map(function (n) {
      return '<article><span class="nist-code">' + esc(n.code) + '</span><h3>' + esc(n.name) + '</h3><p>' + esc(n.sub) + '</p><ul class="ticks">' +
        n.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></article>';
    }).join('');
    $('arsenal').innerHTML = D.skillsData.map(function (c) {
      return '<article class="panel reveal"><h3>' + esc(c.category) + '<span>' + c.skills.length + '</span></h3><ul class="ars">' +
        c.skills.map(function (s) { return '<li><b>' + esc(s.name) + '</b><span>' + esc(s.domain) + '</span></li>'; }).join('') + '</ul></article>';
    }).join('');
    $('cert-list').innerHTML = D.certificationsAndAwards.map(function (c) {
      var ok = c.type === 'Certification';
      return '<article class="panel cert reveal ' + (ok ? 'ok' : 'wip') + '"><span class="cert-state"><span class="led"></span>' + (ok ? 'Verified' : 'In progress') + '</span>' +
        '<h3>' + esc(c.title) + '</h3><p class="cert-by">' + esc(c.issuer) + '</p><p>' + esc(c.desc) + '</p></article>';
    }).join('');
  }

  /* ---------- Contact, copy buttons, nav highlight ---------- */
  function bindMisc() {
    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = btn.getAttribute('data-label'); }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy this', text); });
        else window.prompt('Copy this', text);
      });
    });
    $('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('contact-name').value.trim(), email = $('contact-email').value.trim();
      var topic = $('contact-topic').value, msg = $('contact-message').value.trim();
      var subject = encodeURIComponent('[Portfolio] ' + topic + ', from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + topic + '\n\n' + msg);
      window.location.href = 'mailto:' + P.email + '?subject=' + subject + '&body=' + body;
      $('form-note').textContent = 'Thanks, ' + name + '. Your email app is opening with the draft.';
    });
    if ('IntersectionObserver' in window) {
      var links = {};
      $$('.rail-nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var a = links[en.target.id];
          if (a && en.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
            a.setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      Object.keys(links).forEach(function (k) { var s = $(k); if (s) io.observe(s); });
    }
  }

  function bindReveal() {
    var els = $$('.reveal, .stats, .sec-head');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        $$('[data-count]', en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Falling hex digits behind the page ---------- */
  function startRain() {
    if (CALM) return;
    var cv = $('rain'), ctx = cv.getContext('2d'), W, H, cols, drops, run = true, last = 0, SZ = 16;
    var CH = '0123456789ABCDEF';
    function size() {
      W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
      cols = Math.ceil(W / SZ); drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * -60);
    }
    function frame(t) {
      if (!run) return;
      requestAnimationFrame(frame);
      if (t - last < 70) return;
      last = t;
      ctx.fillStyle = 'rgba(5,7,7,0.12)'; ctx.fillRect(0, 0, W, H);
      ctx.font = SZ - 3 + 'px "IBM Plex Mono", monospace';
      for (var i = 0; i < cols; i++) {
        if (i % 2) continue;
        var y = drops[i] * SZ;
        ctx.fillStyle = Math.random() > 0.96 ? '#FF3355' : '#00FF9C';
        ctx.fillText(CH[(Math.random() * 16) | 0], i * SZ, y);
        drops[i] = y > H && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    }
    size(); requestAnimationFrame(frame);
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    document.addEventListener('visibilitychange', function () { var was = run; run = !document.hidden; if (run && !was) requestAnimationFrame(frame); });
  }

  /* ---------- Loading gate ---------- */
  function runGate(done) {
    var el = $('gate'), log = $('gate-log'), fill = $('gate-fill'), pct = $('gate-pct'), step = $('gate-step'), finished = false, shown = 0;
    function finish() {
      if (finished) return; finished = true;
      el.classList.add('open');
      document.body.classList.remove('is-loading');
      document.body.classList.add('ready');
      setTimeout(function () { el.remove(); }, 1200);
      done();
    }
    if (CALM) { finish(); return; }
    var LINES = ['establishing secure channel', 'tls 1.3 / chacha20-poly1305', 'verifying certificate chain', 'checking integrity, sha-256', 'loading terminal and crypto lab', 'identity: visitor, role: guest'];
    var STEPS = ['Initializing secure session', 'Negotiating handshake', 'Verifying identity', 'Mounting portfolio'];
    var t0 = performance.now(), DUR = 2900;
    (function tick(t) {
      var k = Math.min(1, (t - t0) / DUR), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      pct.textContent = Math.round(e * 100) + '%';
      fill.style.width = (e * 100).toFixed(1) + '%';
      step.textContent = STEPS[Math.min(STEPS.length - 1, Math.floor(e * STEPS.length))];
      while (shown < Math.floor(e * LINES.length + 0.001)) {
        var ln = document.createElement('div');
        ln.innerHTML = '<span>&gt; ' + LINES[shown++] + '</span><i></i><b>ok</b>';
        log.appendChild(ln);
      }
      if (k < 1) requestAnimationFrame(tick);
      else { el.classList.add('granted'); step.textContent = 'Session established'; setTimeout(finish, 900); }
    })(t0);
    $('gate-skip').addEventListener('click', finish);
    setTimeout(finish, 6000);
  }

  /* ---------- Security lab: ciphers ---------- */
  var te = new TextEncoder(), td = new TextDecoder();
  function toB64(buf) { var u = new Uint8Array(buf), t = ''; for (var i = 0; i < u.length; i++) t += String.fromCharCode(u[i]); return btoa(t); }
  function fromB64(str) { var t = atob(str.replace(/\s+/g, '')), u = new Uint8Array(t.length); for (var i = 0; i < t.length; i++) u[i] = t.charCodeAt(i); return u; }
  function toHex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function caesar(t, n) {
    return t.replace(/[a-z]/gi, function (ch) { var base = ch <= 'Z' ? 65 : 97; return String.fromCharCode((ch.charCodeAt(0) - base + n + 26) % 26 + base); });
  }
  function railPattern(len, rails) {
    var idx = [], r = 0, d = 1;
    for (var i = 0; i < len; i++) { idx.push(r); if (r === 0) d = 1; else if (r === rails - 1) d = -1; r += d; }
    return idx;
  }
  function railEnc(t, rails) { var p = railPattern(t.length, rails), out = ''; for (var r = 0; r < rails; r++) for (var i = 0; i < t.length; i++) if (p[i] === r) out += t[i]; return out; }
  function railDec(t, rails) { var p = railPattern(t.length, rails), res = new Array(t.length), k = 0; for (var r = 0; r < rails; r++) for (var i = 0; i < t.length; i++) if (p[i] === r) res[i] = t[k++]; return res.join(''); }
  function aesKey(pass, salt) {
    return crypto.subtle.importKey('raw', te.encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (k) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: 210000, hash: 'SHA-256' }, k, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  /* Returns a promise of { out, key, name } */
  function runCipher(algo, mode, key, n, text) {
    var P = Promise.resolve();
    if (algo === 'caesar') return P.then(function () { return { name: 'Caesar', key: 'shift ' + n, out: caesar(text, mode === 'enc' ? n : -n) }; });
    if (algo === 'rail') return P.then(function () { return { name: 'Rail Fence', key: n + ' rails', out: mode === 'enc' ? railEnc(text, n) : railDec(text, n) }; });
    if (algo === 'b64') return P.then(function () { return { name: 'Base64', key: 'none (encoding)', out: mode === 'enc' ? toB64(te.encode(text)) : td.decode(fromB64(text)) }; });
    if (!(window.crypto && crypto.subtle)) return Promise.reject(new Error('This algorithm needs a secure page. Open the site over https or localhost.'));
    if (algo === 'sha') return crypto.subtle.digest('SHA-256', te.encode(text)).then(function (h) { return { name: 'SHA-256', key: 'none (hash)', out: toHex(h) }; });
    if (!key) return Promise.reject(new Error('Enter a secret key or passphrase first.'));
    if (algo === 'hmac') {
      return crypto.subtle.importKey('raw', te.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
        .then(function (k) { return crypto.subtle.sign('HMAC', k, te.encode(text)); })
        .then(function (sig) { return { name: 'HMAC-SHA256', key: '256-bit tag', out: toHex(sig) }; });
    }
    if (mode === 'enc') {
      var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
      return aesKey(key, salt).then(function (k) { return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, te.encode(text)); })
        .then(function (ct) {
          var all = new Uint8Array(28 + ct.byteLength);
          all.set(salt, 0); all.set(iv, 16); all.set(new Uint8Array(ct), 28);
          return { name: 'AES-256-GCM', key: 'PBKDF2, 256-bit', out: toB64(all) };
        });
    }
    var raw;
    try { raw = fromB64(text); } catch (err) { return Promise.reject(new Error('That input is not valid Base64 ciphertext. Encrypt something first, then choose "Use output as input".')); }
    if (raw.length < 45) return Promise.reject(new Error('That ciphertext is too short. Encrypt something first, then choose "Use output as input".'));
    return aesKey(key, raw.slice(0, 16)).then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(16, 28) }, k, raw.slice(28)); })
      .then(function (pt) { return { name: 'AES-256-GCM', key: 'PBKDF2, 256-bit', out: td.decode(pt) }; },
            function () { throw new Error('Decryption failed: wrong passphrase, or the ciphertext was modified. AES-GCM rejects tampered data.'); });
  }

  function bindCipher() {
    var algo = $('cx-algo'), mode = $('cx-mode'), key = $('cx-key'), n = $('cx-n'), inp = $('cx-in'), out = $('cx-out');
    function layout() {
      var a = algo.value;
      $('cx-mode-wrap').hidden = a === 'hmac' || a === 'sha';
      $('cx-key-wrap').hidden = !(a === 'aes' || a === 'hmac');
      $('cx-n-wrap').hidden = !(a === 'caesar' || a === 'rail');
      if (a === 'rail') { n.min = 2; n.max = 8; if (+n.value > 8 || +n.value < 2) n.value = 3; $('cx-n-label').textContent = 'Rails'; }
      if (a === 'caesar') { n.min = 1; n.max = 25; $('cx-n-label').textContent = 'Shift'; }
      $('cx-n-out').textContent = n.value;
    }
    function run() {
      var t0 = performance.now();
      $('ro-status').textContent = 'Running';
      runCipher(algo.value, mode.value, key.value, +n.value, inp.value).then(function (r) {
        out.textContent = r.out; out.classList.remove('is-err');
        $('ro-algo').textContent = r.name; $('ro-key').textContent = r.key;
        $('ro-time').textContent = (performance.now() - t0).toFixed(1) + ' ms';
        $('ro-status').textContent = 'Success';
      }, function (err) {
        out.textContent = err.message; out.classList.add('is-err');
        $('ro-time').textContent = '–'; $('ro-status').textContent = 'Failed';
      });
    }
    algo.addEventListener('change', layout);
    n.addEventListener('input', function () { $('cx-n-out').textContent = n.value; });
    $('cx-run').addEventListener('click', run);
    $('cx-swap').addEventListener('click', function () {
      if (out.classList.contains('is-err') || $('ro-status').textContent !== 'Success') return;
      inp.value = out.textContent;
      if (!$('cx-mode-wrap').hidden) mode.value = mode.value === 'enc' ? 'dec' : 'enc';
    });
    $('cx-copy').addEventListener('click', function () {
      var b = $('cx-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out.textContent).then(function () {
        b.textContent = 'Copied'; setTimeout(function () { b.textContent = b.getAttribute('data-label'); }, 1800);
      });
    });
    layout();
  }

  /* ---------- Security lab: password analyzer ---------- */
  function bindPassword() {
    var pw = $('pw'), list = $('pw-checks');
    var CHECKS = [
      ['At least 12 characters', function (v) { return v.length >= 12; }],
      ['Uppercase letters (A-Z)', function (v) { return /[A-Z]/.test(v); }],
      ['Lowercase letters (a-z)', function (v) { return /[a-z]/.test(v); }],
      ['Digits (0-9)', function (v) { return /[0-9]/.test(v); }],
      ['Special characters (!@#$%)', function (v) { return /[^A-Za-z0-9]/.test(v); }],
      ['No obvious sequence or common word', function (v) { return v.length > 0 && !/(012|123|234|345|456|567|678|789|abc|qwerty|password|admin|letmein|welcome|(.)\2\2)/i.test(v); }]
    ];
    list.innerHTML = CHECKS.map(function (c) { return '<li>' + c[0] + '</li>'; }).join('');
    function human(sec) {
      if (sec < 1) return 'Instantly';
      var units = [['second', 60], ['minute', 60], ['hour', 24], ['day', 365], ['year', 1000], ['thousand years', 1000], ['million years', 1000], ['billion years', 1000]];
      var v = sec;
      for (var i = 0; i < units.length; i++) {
        if (v < units[i][1] || i === units.length - 1) {
          if (i === units.length - 1 && v >= 1000) return 'Longer than the age of the universe';
          var r = v < 10 ? v.toFixed(1) : Math.round(v);
          return r + ' ' + units[i][0] + (i < 5 && +r !== 1 ? 's' : '');
        }
        v /= units[i][1];
      }
    }
    function upd() {
      var v = pw.value, pool = 0;
      if (/[a-z]/.test(v)) pool += 26;
      if (/[A-Z]/.test(v)) pool += 26;
      if (/[0-9]/.test(v)) pool += 10;
      if (/[^A-Za-z0-9]/.test(v)) pool += 33;
      var bits = v ? v.length * Math.log(pool) / Math.LN2 : 0;
      var lvl = !v ? ['Enter a password', 'lvl-mid'] : bits < 40 ? ['Weak', 'lvl-bad'] : bits < 70 ? ['Fair', 'lvl-mid'] : bits < 100 ? ['Strong', 'lvl-good'] : ['Very strong', 'lvl-good'];
      $('pw-bits').textContent = Math.round(bits) + ' bits';
      $('pw-level').textContent = lvl[0];
      $('pw-level').className = 'pill ' + lvl[1];
      $('pw-time').textContent = v ? human(Math.pow(2, bits) / 2 / 1e11) : '–';
      $('pw-pool').textContent = pool + ' symbols';
      $('pw-len').textContent = v.length + ' characters';
      CHECKS.forEach(function (c, i) { list.children[i].className = c[1](v) ? 'ok' : ''; });
    }
    pw.addEventListener('input', upd);
    upd();
  }

  /* ---------- Security lab: terminal ---------- */
  function bindTerminal() {
    var out = $('term-out'), form = $('term-form'), input = $('term-input'), P = D.personal;
    function print(text, cls) {
      var line = document.createElement('div');
      if (cls) line.className = cls;
      line.textContent = text;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    }
    function pad(t, n) { t = String(t); while (t.length < n) t += ' '; return t; }
    var CMDS = {
      help: function () {
        return ['Available commands:',
          '  whoami          who I am', '  education       degree and university', '  skills          technical arsenal',
          '  projects        list projects', '  open <id>       open a project, e.g. open passvault', '  experience      career history',
          '  certifications  credentials', '  scan            simulated port scan', '  contact         how to reach me',
          '  resume          download my resume', '  clear           clear the screen'];
      },
      whoami: function () { return [P.name, P.title, P.summary]; },
      education: function () { var e = D.education[0]; return [e.degree, e.minor, e.institution, e.period + ', ' + e.rank]; },
      skills: function () { return D.skillsData.map(function (c) { return pad(c.short, 22) + c.skills.map(function (k) { return k.name; }).join(', '); }); },
      projects: function () { return PROJECTS.map(function (p) { return pad(p.id, 15) + p.name + '  [' + p.track + ']'; }).concat(['', 'Run open <id> to inspect one.']); },
      experience: function () { return ITEMS.map(function (x) { return pad(x.period, 22) + x.role + ', ' + x.company; }); },
      certifications: function () { return D.certificationsAndAwards.map(function (c) { return (c.type === 'Certification' ? '[verified]    ' : '[in progress] ') + c.title + ', ' + c.issuer; }); },
      contact: function () { return ['email     ' + P.email, 'phone     ' + P.phone, 'linkedin  ' + P.linkedinDisplay, 'github    ' + P.githubDisplay]; },
      resume: function () { var a = document.createElement('a'); a.href = P.resume; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); return ['Downloading ' + P.resume.split('/').pop()]; },
      sudo: function () { return ['Permission denied. This incident will be reported.']; },
      clear: function () { out.innerHTML = ''; return []; }
    };
    CMDS.certs = CMDS.certifications;
    function scan() {
      var lines = ['Starting simulated SYN scan of a demo host (no packets are sent)', 'PORT      STATE     SERVICE',
        '22/tcp    filtered  ssh', '80/tcp    open      http  (redirects to https)', '443/tcp   open      https (TLS 1.3)',
        '3306/tcp  closed    mysql', '5432/tcp  filtered  postgresql', 'Scan complete: 2 open, 2 filtered, 1 closed. Perimeter looks hardened.'];
      lines.forEach(function (l, i) { setTimeout(function () { print(l, i === lines.length - 1 ? 'hl' : ''); }, CALM ? 0 : i * 160); });
    }
    function exec(raw) {
      print('$ ' + raw, 'echo');
      var parts = raw.toLowerCase().split(/\s+/), name = parts[0];
      if (name === 'scan') return scan();
      if (name === 'open') {
        if (!parts[1]) print('Usage: open <id>. Run projects to see the ids.', 'err');
        else if (!openProject(parts[1])) print('No project called "' + parts[1] + '". Run projects to see the ids.', 'err');
        else print('Opened ' + parts[1] + '.', 'hl');
        return;
      }
      if (CMDS[name]) CMDS[name]().forEach(function (l) { print(l); });
      else print('Unknown command "' + name + '". Type help for the list.', 'err');
    }
    var history = [], hi = 0;
    print('SOC node online. Type help, or use a quick command below.', 'dim');
    exec('whoami');
    out.scrollTop = 0;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = input.value.trim();
      input.value = '';
      if (!raw) return;
      history.push(raw); hi = history.length;
      exec(raw);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' && hi > 0) { input.value = history[--hi]; e.preventDefault(); }
      else if (e.key === 'ArrowDown' && hi < history.length) { input.value = history[++hi] || ''; e.preventDefault(); }
    });
    $('term-quick').innerHTML = ['help', 'whoami', 'skills', 'projects', 'experience', 'scan', 'certifications', 'contact'].map(function (c) {
      return '<button type="button" data-cmd="' + c + '">' + c + '</button>';
    }).join('');
    $('term-quick').addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) exec(b.getAttribute('data-cmd'));
    });
  }

  function bindLab() { bindCipher(); bindPassword(); bindTerminal(); }

  /* ---------- Boot ---------- */
  drawHero();
  drawStats();
  drawAbout();
  drawXp();
  drawProjects();
  drawLists();
  bindTabs();
  bindLab();
  bindMisc();
  runGate(function () {
    typeRoles();
    bindReveal();
    startRain();
  });
})();
