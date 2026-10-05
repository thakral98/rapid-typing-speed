/* SpeedType Studio - Typing Arcade
 * Six typing games. Every game is driven only by correct keystrokes.
 * WPM  = (correct characters / 5) / minutes spent typing
 * Accuracy = correct keystrokes / all keystrokes
 */
(function () {
  "use strict";

  var root = document.getElementById("games");
  if (!root) return;

  var $ = function (id) { return document.getElementById(id); };
  var hub = $("gmHub"), stage = $("gmStage"), canvas = $("gmCanvas"), ctx = canvas.getContext("2d");
  var overlay = $("gmOverlay"), input = $("gmInput"), textBox = $("gmText");
  var diffSel = $("gmDiff"), lenSel = $("gmLen");
  var hud = { wpm: $("gmWpm"), acc: $("gmAcc"), err: $("gmErr"), time: $("gmTime"), extra: $("gmExtra"), extraLabel: $("gmExtraLabel") };
  var W = canvas.width, H = canvas.height;
  var BEST_KEY = "speedtype.games.best.v1";

  var GAMES = {
    boat:     { title: "Boat Race",      type: "race", icon: "🚤", intro: "Type the text to power your boat across the water. Beat all three rivals to the finish buoy." },
    car:      { title: "Car Race",       type: "race", icon: "🏎️", intro: "Every correct key hits the throttle. Cross the finish line before the other cars." },
    bike:     { title: "Bike Race",      type: "race", icon: "🚴", intro: "Pedal down the dirt track. Only correct keys move you, so keep your rhythm clean." },
    rocket:   { title: "Rocket Race",    type: "race", icon: "🚀", intro: "Fuel your rocket with accurate typing and out-fly the rival ships." },
    mountain: { title: "Mountain Climb", type: "climb", icon: "🏔️", intro: "Climb to the summit! A storm is chasing you up the mountain. If you stop typing it catches you." },
    meteor:   { title: "Meteor Blast",   type: "rain", icon: "☄️", intro: "Meteors fall with words on them. Type a word to destroy it. Don't let 5 meteors reach the ground." }
  };

  var WORDS = {
    easy: "the and you that was for are with his they have this from one had word but not what all were when your can said there use each which she how their will other about out many then them these some her would make like him into time has look two more write see number way could people my than first water been call who oil its now find long down day did get come made may part over new sound take only little work know place year live back give most very after thing our just name good sentence man think say great where help through much before line right too mean old any same tell boy follow came want show also around form three small set put end does another well large must big even such because turn here why ask went men read need land different home us move try kind hand picture again change off play spell air away animal house point page letter mother answer found study still learn should world high every near add food between own below country plant last school father keep tree never start city earth eye light thought head under story saw left don't few while along might close something seem next hard open example begin life always those both paper together got group often run important until children side feet car mile night walk white sea began grow took river four carry state once book hear stop without second later miss idea enough eat face watch far Indian real almost let above girl sometimes mountain cut young talk soon list song being leave family it's".split(" "),
    medium: "practice keyboard accuracy rhythm forward student teacher journey library morning evening village mountain thunder captain diamond kitchen holiday giant powerful balance adventure quickly silence monitor compass freedom pattern harvest message trouble weather machine program network battery science culture protect explore imagine develop capture current silver golden shadow canyon harbor lantern meadow orchard pioneer quantum rainbow stadium tension upward venture whisper yellow zigzag answer border climate decide engine fabric garden horizon island jungle kingdom launch mirror nature ocean planet quality river season travel unique valley window wonder yearly zenith bridge candle desert eagle forest glacier hammer insight jacket kernel ladder marble needle option puzzle rocket signal timber velvet wizard anchor bottle castle dragon engine flight grocery helmet ignite jersey kettle lagoon magnet nickel orange pencil quiver ribbon saddle tunnel umbrella voyage walnut".split(" "),
    hard: "extraordinary simultaneously acknowledgement responsibility characteristic environmental international unquestionably opportunity communication determination entrepreneurial imagination philosophical revolutionary sophisticated vocabulary architecture catastrophe disappointing electromagnetic fundamentally inconsequential knowledgeable laboratory mathematics neighbourhood organization pharmaceutical questionnaire rehabilitation straightforward technological understanding vulnerability wholeheartedly acceleration bureaucracy chronological demonstrate encyclopedia fluctuation geographical hypothetical illustration jurisdiction kaleidoscope legitimate manufacturer nevertheless observation psychology qualification reconstruction subsequently transformation unbelievable verification weatherproof exaggeration infrastructure miscellaneous perpendicular maintenance necessarily conscientious thoroughly mysterious archaeological temperature relationship available necessary government development professional".split(" ")
  };
  // Short words used by Meteor Blast so words fit on screen
  var RAIN_WORDS = {
    easy: WORDS.easy.filter(function (w) { return w.length <= 5 && /^[a-z]+$/.test(w); }),
    medium: WORDS.easy.concat(WORDS.medium).filter(function (w) { return w.length >= 4 && w.length <= 7 && /^[a-z]+$/.test(w); }),
    hard: WORDS.medium.concat(WORDS.hard).filter(function (w) { return w.length >= 6 && w.length <= 11 && /^[a-z]+$/.test(w); })
  };

  var AI_WPM = { easy: 18, medium: 32, hard: 50 };
  var LEN_WORDS = { short: 25, medium: 45, long: 80 };
  var RAIN_SECONDS = { short: 60, medium: 90, long: 150 };
  var RIVALS = [
    { name: "Rival 1", color: "#F97316", speed: 0.92, phase: 0 },
    { name: "Rival 2", color: "#A855F7", speed: 1.0, phase: 2 },
    { name: "Rival 3", color: "#22C55E", speed: 1.1, phase: 4 }
  ];
  var PLAYER_COLOR = "#00B8D4";

  var G = null; // current game state
  var raf = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmtTime(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); }

  function makeText(diff, count) {
    var bank = WORDS[diff], out = [], last = "", sentenceLen = 0, startSentence = true;
    for (var i = 0; i < count; i++) {
      var w;
      do { w = pick(bank); } while (w === last);
      last = w;
      if (diff === "hard") {
        if (startSentence) w = w.charAt(0).toUpperCase() + w.slice(1);
        sentenceLen++;
        startSentence = false;
        if (sentenceLen >= 6 + Math.floor(Math.random() * 4) || i === count - 1) {
          w += (Math.random() < 0.8 ? "." : ",");
          if (w.slice(-1) === ".") { startSentence = true; }
          sentenceLen = 0;
        }
      }
      out.push(w);
    }
    return out.join(" ");
  }

  /* ------------------------------ state ------------------------------ */
  function newState(id) {
    var def = GAMES[id];
    var diff = diffSel.value, len = lenSel.value;
    var s = {
      id: id, def: def, diff: diff, len: len, phase: "ready",
      clock: 0, typingT: 0, started: false,
      correct: 0, errors: 0, keys: 0,
      idx: 0, text: "", dispP: 0, bgOff: 0, anim: 0, shake: 0, flash: 0,
      countdown: 0, particles: [], rivals: [], lastCps: 0, cpsWindow: [],
      stormP: 0, words: [], lives: 5, target: null, spawnT: 0, destroyed: 0, level: 1,
      duration: 0, won: false, place: 1
    };
    if (def.type === "race" || def.type === "climb") {
      s.text = makeText(diff, LEN_WORDS[len]);
      if (def.type === "race") {
        s.rivals = RIVALS.map(function (r) { return { name: r.name, color: r.color, speed: r.speed, phase: r.phase, p: 0, dispP: 0 }; });
      }
    } else {
      s.duration = RAIN_SECONDS[len];
    }
    return s;
  }

  function showStage(id) {
    hub.hidden = true;
    stage.hidden = false;
    $("gmTitle").textContent = GAMES[id].icon + "  " + GAMES[id].title;
    G = newState(id);
    prepareUi();
    showIntro();
    stage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showHub() {
    stopLoop();
    G = null;
    stage.hidden = true;
    hub.hidden = false;
  }

  function prepareUi() {
    var t = G.def.type;
    hud.wpm.textContent = "0"; hud.acc.textContent = "100%"; hud.err.textContent = "0";
    hud.time.textContent = t === "rain" ? fmtTime(G.duration) : "0:00";
    hud.extraLabel.textContent = t === "race" ? "Position" : (t === "climb" ? "Storm Gap" : "Lives");
    hud.extra.textContent = t === "race" ? "1 / 4" : (t === "climb" ? "12%" : "♥♥♥♥♥");
    renderText();
    drawFrame();
  }

  function showIntro() {
    stopLoop();
    G.phase = "ready";
    var lenHint = G.def.type === "rain" ? fmtTime(G.duration) + " mission" : LEN_WORDS[G.len] + " words";
    overlay.hidden = false;
    overlay.innerHTML = "<h4>" + G.def.icon + " " + G.def.title + "</h4><p>" + G.def.intro + "</p><p style='opacity:.75;font-size:.85rem'>" +
      cap(G.diff) + " difficulty · " + lenHint + "</p><div class='gm-btn-row'><button class='btn btn-primary' id='gmStart' type='button'>Start Game</button></div>";
    $("gmStart").addEventListener("click", startCountdown);
    drawFrame();
  }

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function startCountdown() {
    G = newState(G.id);
    prepareUi();
    G.phase = "countdown";
    G.countdown = 3.2;
    overlay.hidden = false;
    overlay.innerHTML = "<div class='gm-count' id='gmCount'>3</div>";
    input.value = "";
    input.focus({ preventScroll: true });
    startLoop();
  }

  function begin() {
    G.phase = "running";
    overlay.hidden = true;
    input.focus({ preventScroll: true });
  }

  function togglePause(force) {
    if (!G) return;
    if (G.phase === "running" && force !== false) {
      G.phase = "paused";
      overlay.hidden = false;
      overlay.innerHTML = "<h4>Paused</h4><p>Your timer is stopped.</p><div class='gm-btn-row'><button class='btn btn-primary' id='gmResume' type='button'>Resume</button></div>";
      $("gmResume").addEventListener("click", function () { togglePause(false); });
      $("gmPause").textContent = "Resume";
    } else if (G.phase === "paused" && force !== true) {
      G.phase = "running";
      overlay.hidden = true;
      $("gmPause").textContent = "Pause";
      input.focus({ preventScroll: true });
    }
  }

  /* ----------------------------- typing ------------------------------ */
  function handleChar(ch) {
    if (!G || G.phase !== "running") return;
    if (!G.started) G.started = true;
    var t = G.def.type;
    if (t === "rain") return rainChar(ch);

    G.keys++;
    var expected = G.text.charAt(G.idx);
    if (ch === expected) {
      G.correct++;
      G.idx++;
      G.cpsWindow.push(G.clock);
      puff(1);
      if (G.idx >= G.text.length) finish(true);
    } else {
      G.errors++;
      G.shake = 0.25;
      G.flash = 0.25;
    }
    renderText();
    updateHud();
  }

  function rainChar(ch) {
    if (ch === " " || ch === "\n") return;
    G.keys++;
    if (!G.target) {
      var best = null;
      G.words.forEach(function (w) {
        if (w.dead) return;
        if (w.text.charAt(0) === ch && (!best || w.y > best.y)) best = w;
      });
      if (best) { G.target = best; best.pos = 1; G.correct++; }
      else { G.errors++; G.shake = 0.25; G.flash = 0.25; }
    } else {
      var w = G.target;
      if (w.text.charAt(w.pos) === ch) {
        w.pos++; G.correct++;
        if (w.pos >= w.text.length) {
          w.dead = true; G.destroyed++; G.target = null;
          boom(w.x, w.y, "#FFB703");
          if (G.destroyed % 8 === 0) G.level++;
        }
      } else { G.errors++; G.shake = 0.25; G.flash = 0.25; }
    }
    renderText();
    updateHud();
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); togglePause(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length === 1) { e.preventDefault(); handleChar(e.key); }
  });
  // Mobile keyboards often send "Unidentified" keydowns, so read the input event as a fallback.
  input.addEventListener("input", function () {
    var v = input.value;
    input.value = "";
    for (var i = 0; i < v.length; i++) handleChar(v.charAt(i));
  });
  canvas.addEventListener("click", function () { if (G && G.phase === "running") input.focus({ preventScroll: true }); });

  function renderText() {
    if (!G) return;
    var t = G.def.type;
    if (t === "rain") {
      if (G.target) {
        var w = G.target;
        textBox.innerHTML = "<span class='ok'>" + esc(w.text.slice(0, w.pos)) + "</span><span class='cur" + (G.flash > 0 ? " bad" : "") + "'>" + esc(w.text.charAt(w.pos)) + "</span>" + esc(w.text.slice(w.pos + 1));
      } else {
        textBox.innerHTML = "<span class='lock'>Type the first letter of any falling word to lock on.</span>";
      }
      return;
    }
    // show a window of about 3 lines worth of text around the cursor
    var start = Math.max(0, G.idx - 30);
    var end = Math.min(G.text.length, G.idx + 150);
    var before = G.text.slice(start, G.idx), cur = G.text.charAt(G.idx), after = G.text.slice(G.idx + 1, end);
    textBox.innerHTML = "<span class='ok'>" + esc(before) + "</span>" + (cur ? "<span class='cur" + (G.flash > 0 ? " bad" : "") + "'>" + (cur === " " ? "&nbsp;" : esc(cur)) + "</span>" : "") + esc(after);
  }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function stats() {
    var typingT = Math.max(G.typingT, 1);
    var wpm = G.started ? Math.round((G.correct / 5) / (typingT / 60)) : 0;
    var acc = G.keys ? Math.round((G.correct / G.keys) * 100) : 100;
    return { wpm: wpm, acc: acc };
  }

  function updateHud() {
    var s = stats();
    hud.wpm.textContent = s.wpm;
    hud.acc.textContent = s.acc + "%";
    hud.err.textContent = G.errors;
    var t = G.def.type;
    if (t === "rain") {
      hud.time.textContent = fmtTime(G.duration - G.clock);
      hud.extra.textContent = new Array(Math.max(0, G.lives) + 1).join("♥") || "-";
    } else {
      hud.time.textContent = fmtTime(G.clock);
      if (t === "race") {
        var total = G.text.length, ahead = 0;
        G.rivals.forEach(function (r) { if (r.p > G.idx) ahead++; });
        hud.extra.textContent = (ahead + 1) + " / 4";
      } else {
        var gap = Math.max(0, Math.round((G.idx - (G.stormP - G.text.length * 0.12)) / G.text.length * 100));
        hud.extra.textContent = gap + "%";
      }
    }
  }

  /* ----------------------------- finish ------------------------------ */
  function finish(won) {
    if (!G || G.phase === "over") return;
    G.phase = "over";
    G.won = won;
    var t = G.def.type, s = stats();
    var place = 1;
    if (t === "race") {
      G.rivals.forEach(function (r) { if (r.p >= G.text.length) place++; });
      G.place = place;
    }
    var title, sub;
    if (t === "race") {
      title = place === 1 ? "🏆 You Won!" : (place === 2 ? "🥈 2nd Place" : (place === 3 ? "🥉 3rd Place" : "4th Place"));
      sub = "You finished in " + fmtTime(G.clock) + ".";
    } else if (t === "climb") {
      title = won ? "🚩 Summit Reached!" : "❄️ The Storm Caught You";
      sub = won ? "You beat the storm to the top." : "You got " + Math.round(G.idx / G.text.length * 100) + "% of the way up. Type faster to stay ahead.";
    } else {
      title = won ? "🛡️ Mission Complete!" : "💥 Game Over";
      sub = G.destroyed + " meteors destroyed" + (won ? " and the base survived." : ".");
    }

    // keep best score, save to dashboard (only if the player really typed something)
    var best = loadBest(), key = G.id, isBest = false;
    var good = G.correct >= 10 && G.typingT >= 3;
    if (good) {
      if (!best[key] || s.wpm > best[key].wpm) { best[key] = { wpm: s.wpm, acc: s.acc }; isBest = true; saveBest(best); }
      if (typeof window.saveGameRun === "function") {
        try { window.saveGameRun(s.wpm, s.acc, G.errors, "Game: " + G.def.title + " (" + cap(G.diff) + ")"); } catch (e) { console.error(e); }
      }
    }
    var bestLine = best[key] ? "Best WPM here: " + best[key].wpm : "";

    overlay.hidden = false;
    overlay.innerHTML = "<h4>" + title + "</h4><p>" + sub + "</p>" +
      "<div class='gm-result-grid'><div><span>WPM</span><strong>" + s.wpm + "</strong></div><div><span>Accuracy</span><strong>" + s.acc + "%</strong></div><div><span>Errors</span><strong>" + G.errors + "</strong></div></div>" +
      "<p style='font-size:.85rem'>" + (isBest ? "⭐ New personal best! " : bestLine) + (good ? "" : " (Type a bit more to save your score.)") + "</p>" +
      "<div class='gm-btn-row'><button class='btn btn-primary' id='gmAgain' type='button'>Play Again</button><button class='btn btn-secondary' id='gmAll' type='button' style='color:#fff;border-color:rgba(255,255,255,.5)'>All Games</button></div>";
    $("gmAgain").addEventListener("click", startCountdown);
    $("gmAll").addEventListener("click", showHub);
    updateHud();
  }

  function loadBest() { try { return JSON.parse(localStorage.getItem(BEST_KEY) || "{}"); } catch (e) { return {}; } }
  function saveBest(b) { try { localStorage.setItem(BEST_KEY, JSON.stringify(b)); } catch (e) { /* storage unavailable */ } }

  /* ------------------------------ loop ------------------------------- */
  function startLoop() {
    stopLoop();
    var last = performance.now();
    function frame(now) {
      var raw = (now - last) / 1000;
      last = now;
      // dt drives the animation; realDt keeps the timer (and so the WPM) honest even on slow devices
      if (G) { update(Math.min(0.25, raw), Math.min(1, raw)); drawFrame(); }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }
  function stopLoop() { if (raf) cancelAnimationFrame(raf); raf = 0; }

  function update(dt, realDt) {
    G.anim += dt;
    if (G.shake > 0) G.shake -= dt;
    if (G.flash > 0) { G.flash -= dt; if (G.flash <= 0) renderText(); }
    stepParticles(dt);

    if (G.phase === "countdown") {
      G.countdown -= realDt;
      var n = Math.ceil(G.countdown);
      var el = $("gmCount");
      if (G.countdown <= 0) { begin(); }
      else if (el) { el.textContent = n > 3 ? "3" : String(n); }
      return;
    }
    if (G.phase !== "running") return;

    G.clock += realDt;
    if (G.started) G.typingT += realDt;

    // moving average speed (chars per second over the last 2 seconds) used to scroll the scenery
    while (G.cpsWindow.length && G.cpsWindow[0] < G.clock - 2) G.cpsWindow.shift();
    G.lastCps = G.cpsWindow.length / 2;
    G.bgOff += (50 + G.lastCps * 70) * dt;

    var t = G.def.type;
    if (t === "race") updateRace(dt);
    else if (t === "climb") updateClimb(dt);
    else updateRain(dt);
    updateHud();
  }

  function updateRace(dt) {
    var cps = AI_WPM[G.diff] * 5 / 60;
    G.rivals.forEach(function (r) {
      var wobble = 1 + 0.18 * Math.sin(G.clock * 0.9 + r.phase);
      r.p = Math.min(G.text.length, r.p + cps * r.speed * wobble * dt);
      r.dispP = r.p;
    });
    G.dispP += (G.idx - G.dispP) * Math.min(1, dt * 10);
  }

  function updateClimb(dt) {
    var cps = AI_WPM[G.diff] * 0.85 * 5 / 60;
    G.stormP += cps * dt * (G.clock > 0 ? 1 : 0);
    if (G.stormP < 0) G.stormP = 0;
    G.dispP += (G.idx - G.dispP) * Math.min(1, dt * 10);
    // storm starts 12% behind the climber's start so there is a head start
    var gap = G.idx - (G.stormP - G.text.length * 0.12);
    if (gap <= 0) finish(false);
  }

  function updateRain(dt) {
    if (G.clock >= G.duration) { finish(true); return; }
    G.spawnT -= dt;
    var interval = Math.max(0.9, (G.diff === "easy" ? 2.8 : G.diff === "medium" ? 2.3 : 1.9) - G.level * 0.12);
    if (G.spawnT <= 0) {
      G.spawnT = interval;
      var txt = pick(RAIN_WORDS[G.diff]);
      ctx.font = "bold 20px 'JetBrains Mono', monospace";
      var tw = ctx.measureText(txt).width + 24;
      G.words.push({ text: txt, x: rnd(tw / 2 + 10, W - tw / 2 - 10), y: -20, w: tw, pos: 0, dead: false,
        v: (G.diff === "easy" ? 26 : G.diff === "medium" ? 34 : 44) + G.level * 5 + rnd(0, 8) });
    }
    G.words.forEach(function (w) {
      if (w.dead) return;
      w.y += w.v * dt;
      if (w.y >= H - 56) {
        w.dead = true;
        if (G.target === w) { G.target = null; renderText(); }
        G.lives--;
        G.shake = 0.35;
        boom(w.x, H - 56, "#EF4444");
        if (G.lives <= 0) finish(false);
      }
    });
    G.words = G.words.filter(function (w) { return !w.dead; });
  }

  /* ---------------------------- particles ---------------------------- */
  function puff(n) {
    if (G.def.type === "climb" || G.def.type === "rain") return;
    for (var i = 0; i < n; i++) G.particles.push({ x: 0, y: 0, vx: -rnd(40, 90), vy: rnd(-20, 20), life: 0.5, max: 0.5, c: "rgba(255,255,255,.7)", r: rnd(2, 4), follow: true });
  }
  function boom(x, y, c) {
    for (var i = 0; i < 18; i++) G.particles.push({ x: x, y: y, vx: rnd(-140, 140), vy: rnd(-140, 100), life: 0.6, max: 0.6, c: c, r: rnd(2, 5) });
  }
  function stepParticles(dt) {
    G.particles.forEach(function (p) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; });
    G.particles = G.particles.filter(function (p) { return p.life > 0; });
  }
  function drawParticles() {
    G.particles.forEach(function (p) {
      if (p.follow) return;
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ----------------------------- drawing ----------------------------- */
  function drawFrame() {
    if (!G) return;
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    if (G.shake > 0) ctx.translate(rnd(-3, 3), rnd(-2, 2));
    var t = G.def.type;
    if (t === "race") drawRace();
    else if (t === "climb") drawClimb();
    else drawRain();
    drawParticles();
    ctx.restore();
  }

  var LANE_TOP = 46, LANE_H = 76, X0 = 90, X1 = W - 110;

  function drawRace() {
    var id = G.id;
    ctx.fillStyle = "#0F172A"; ctx.fillRect(0, 0, W, H);
    // lanes
    for (var i = 0; i < 4; i++) drawLane(id, i);
    // start / finish
    ctx.fillStyle = "rgba(255,255,255,.85)";
    ctx.fillRect(X0 - 24, LANE_TOP, 3, LANE_H * 4);
    drawChecker(X1 + 30, LANE_TOP, 14, LANE_H * 4);
    ctx.font = "bold 13px Outfit, sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "#fff";
    ctx.fillText("START", X0 - 22, LANE_TOP - 12); ctx.fillText("FINISH", X1 + 37, LANE_TOP - 12);
    // progress bar on top
    var pr = Math.min(1, G.dispP / G.text.length);
    ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(X0 - 24, 12, X1 - X0 + 68, 8);
    ctx.fillStyle = PLAYER_COLOR; ctx.fillRect(X0 - 24, 12, (X1 - X0 + 68) * pr, 8);

    // vehicles: rivals in lanes 0-2, player in lane 3 (nearest the viewer)
    var all = G.rivals.map(function (r, k) { return { lane: k, p: r.dispP, c: r.color, name: r.name }; });
    all.push({ lane: 3, p: G.dispP, c: PLAYER_COLOR, name: "YOU" });
    all.forEach(function (v) {
      var x = X0 + (X1 - X0) * Math.min(1, v.p / G.text.length);
      var y = LANE_TOP + v.lane * LANE_H + LANE_H / 2 + 4;
      drawVehicle(id, x, y, v.c, v.lane === 3);
      ctx.font = "bold 11px Outfit, sans-serif"; ctx.textAlign = "left"; ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.fillText(v.name, 8, LANE_TOP + v.lane * LANE_H + 16);
    });
  }

  function drawChecker(x, y, size, h) {
    for (var r = 0; r < Math.ceil(h / size); r++) for (var c = 0; c < 2; c++) {
      ctx.fillStyle = (r + c) % 2 ? "#111" : "#fff";
      ctx.fillRect(x + c * size, y + r * size, size, Math.min(size, h - r * size));
    }
  }

  function drawLane(id, i) {
    var y = LANE_TOP + i * LANE_H, off = G.bgOff;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, y, W, LANE_H); ctx.clip();
    if (id === "boat") {
      var g = ctx.createLinearGradient(0, y, 0, y + LANE_H);
      g.addColorStop(0, "#1E88C8"); g.addColorStop(1, "#0B5C99");
      ctx.fillStyle = g; ctx.fillRect(0, y, W, LANE_H);
      ctx.strokeStyle = "rgba(255,255,255,.28)"; ctx.lineWidth = 2;
      for (var k = 0; k < 2; k++) {
        ctx.beginPath();
        for (var x = 0; x <= W; x += 8) {
          var yy = y + 22 + k * 28 + Math.sin((x + off * (1 + k * 0.4)) / 22) * 4;
          if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
    } else if (id === "car") {
      ctx.fillStyle = "#3B4150"; ctx.fillRect(0, y, W, LANE_H);
      ctx.fillStyle = "rgba(255,255,255,.75)";
      for (var d = -80; d < W + 80; d += 80) ctx.fillRect(((d - off) % (W + 160) + (W + 160)) % (W + 160) - 80, y + LANE_H - 3, 40, 3);
    } else if (id === "bike") {
      ctx.fillStyle = i % 2 ? "#A5744A" : "#9A6A42"; ctx.fillRect(0, y, W, LANE_H);
      ctx.fillStyle = "rgba(60,35,15,.45)";
      for (var s = 0; s < 14; s++) {
        var sx = (((s * 97 - off * 1.1) % (W + 60)) + (W + 60)) % (W + 60) - 30;
        ctx.beginPath(); ctx.ellipse(sx, y + 14 + (s * 37) % 50, 5, 2.5, 0, 0, 6.283); ctx.fill();
      }
    } else { // rocket / space
      var sg = ctx.createLinearGradient(0, y, 0, y + LANE_H);
      sg.addColorStop(0, "#0A1030"); sg.addColorStop(1, "#1A1050");
      ctx.fillStyle = sg; ctx.fillRect(0, y, W, LANE_H);
      ctx.fillStyle = "#fff";
      for (var q = 0; q < 26; q++) {
        var spd = 0.4 + (q % 3) * 0.4;
        var qx = (((q * 61 - off * spd) % W) + W) % W;
        ctx.globalAlpha = 0.35 + (q % 4) * 0.15;
        ctx.fillRect(qx, y + (q * 29) % LANE_H, 2, 2);
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(0, y + LANE_H - 1, W, 1);
  }

  function drawVehicle(id, x, y, color, isPlayer) {
    var a = G.anim;
    ctx.save();
    ctx.translate(x, y);
    if (isPlayer) { ctx.shadowColor = color; ctx.shadowBlur = 14; }
    if (id === "boat") {
      var bob = Math.sin(a * 6 + x * 0.05) * 2; ctx.translate(0, bob);
      ctx.fillStyle = "rgba(255,255,255,.65)";
      ctx.beginPath(); ctx.ellipse(-38, 10, 14, 3, 0, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-56, 11, 9, 2, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(-28, -4); ctx.lineTo(32, -4); ctx.lineTo(20, 11); ctx.lineTo(-22, 11); ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff"; ctx.fillRect(-8, -16, 20, 12);
      ctx.fillStyle = "#334155"; ctx.fillRect(-4, -13, 5, 6); ctx.fillRect(4, -13, 5, 6);
    } else if (id === "car") {
      ctx.fillStyle = color;
      roundRect(-30, -8, 60, 16, 5); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = shade(color, 30);
      ctx.beginPath(); ctx.moveTo(-14, -8); ctx.lineTo(-8, -19); ctx.lineTo(10, -19); ctx.lineTo(17, -8); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#CFE9F7"; ctx.fillRect(-6, -17, 7, 8); ctx.fillRect(3, -17, 7, 8);
      ctx.fillStyle = "#FFEB3B"; ctx.fillRect(27, -5, 4, 4);
      [-17, 17].forEach(function (wx) { wheel(wx, 9, 7, a * 18); });
    } else if (id === "bike") {
      var sp = a * 14;
      wheel(-18, 6, 10, sp, true); wheel(18, 6, 10, sp, true);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-18, 6); ctx.lineTo(-2, 6); ctx.lineTo(-8, -9); ctx.lineTo(14, -10); ctx.lineTo(18, 6); ctx.moveTo(-2, 6); ctx.lineTo(14, -10); ctx.stroke();
      ctx.strokeStyle = "#1F2937"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-8, -9); ctx.lineTo(2, -22); ctx.lineTo(13, -11); ctx.stroke();
      ctx.fillStyle = "#F4C7A1"; ctx.beginPath(); ctx.arc(4, -29, 5.5, 0, 6.283); ctx.fill();
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(4, -31, 6, Math.PI, 0); ctx.fill();
      var pedal = Math.sin(sp) * 5;
      ctx.strokeStyle = "#111"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-8, -9); ctx.lineTo(-2 + pedal, 8 - Math.abs(pedal) * 0.3); ctx.stroke();
    } else { // rocket
      var fl = 10 + Math.random() * 14;
      var fg = ctx.createLinearGradient(-26, 0, -26 - fl - 8, 0);
      fg.addColorStop(0, "#FFD54F"); fg.addColorStop(1, "rgba(255,87,34,0)");
      ctx.shadowBlur = 0; ctx.fillStyle = fg;
      ctx.beginPath(); ctx.moveTo(-26, -5); ctx.lineTo(-26 - fl - 8, 0); ctx.lineTo(-26, 5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = isPlayer ? 14 : 0;
      ctx.beginPath(); ctx.moveTo(-26, -7); ctx.lineTo(14, -9); ctx.quadraticCurveTo(38, 0, 14, 9); ctx.lineTo(-26, 7); ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = shade(color, -30);
      ctx.beginPath(); ctx.moveTo(-26, -7); ctx.lineTo(-34, -20); ctx.lineTo(-10, -8); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-26, 7); ctx.lineTo(-34, 20); ctx.lineTo(-10, 8); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#CFE9F7"; ctx.beginPath(); ctx.arc(6, 0, 4.5, 0, 6.283); ctx.fill();
    }
    ctx.restore();
  }

  function wheel(x, y, r, rot, bike) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.shadowBlur = 0;
    ctx.fillStyle = bike ? "rgba(0,0,0,0)" : "#111";
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fill();
    ctx.strokeStyle = bike ? "#111" : "#9CA3AF"; ctx.lineWidth = bike ? 3 : 2;
    ctx.beginPath(); ctx.arc(0, 0, bike ? r : r * 0.55, 0, 6.283); ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-r * 0.8, 0); ctx.lineTo(r * 0.8, 0); ctx.moveTo(0, -r * 0.8); ctx.lineTo(0, r * 0.8); ctx.stroke();
    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, v + amt)); }
    return "rgb(" + c(r) + "," + c(g) + "," + c(b) + ")";
  }

  /* ----------------------------- mountain ---------------------------- */
  function slope(p) { return { x: 80 + (W - 220) * p, y: (H - 46) - (H - 130) * p + Math.sin(p * 26) * 5 }; }

  function drawClimb() {
    var sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#6FB1E8"); sky.addColorStop(1, "#DCEEFF");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // distant peaks
    ctx.fillStyle = "#9DB6D3";
    ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(120, 170); ctx.lineTo(260, H); ctx.lineTo(420, 130); ctx.lineTo(600, H); ctx.lineTo(760, 190); ctx.lineTo(960, H); ctx.closePath(); ctx.fill();
    // main mountain
    var mg = ctx.createLinearGradient(0, 60, 0, H);
    mg.addColorStop(0, "#F5F8FC"); mg.addColorStop(0.35, "#B7C2CF"); mg.addColorStop(1, "#6B5B4B");
    ctx.fillStyle = mg;
    ctx.beginPath(); ctx.moveTo(0, H);
    for (var i = 0; i <= 60; i++) { var pt = slope(i / 60); ctx.lineTo(pt.x, pt.y + 14); }
    var top = slope(1); ctx.lineTo(top.x + 70, top.y + 90); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    // trail
    ctx.strokeStyle = "rgba(60,40,20,.55)"; ctx.lineWidth = 4; ctx.setLineDash([8, 6]);
    ctx.beginPath(); for (var j = 0; j <= 60; j++) { var q = slope(j / 60); if (j) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }
    ctx.stroke(); ctx.setLineDash([]);
    // checkpoints + summit flag
    [0.25, 0.5, 0.75].forEach(function (cp) { var c = slope(cp); drawFlag(c.x, c.y, "#F59E0B", 0.7); });
    drawFlag(top.x, top.y, "#EF4444", 1.2);

    // storm
    var sp = G.stormP - G.text.length * 0.12;
    var sPos = slope(Math.max(-0.25, Math.min(1, sp / G.text.length)));
    var danger = Math.max(0, Math.min(1, 1 - (G.idx - sp) / (G.text.length * 0.12)));
    ctx.fillStyle = "rgba(40,48,66," + (0.75 + danger * 0.2) + ")";
    [[-30, -20, 34], [0, -34, 40], [34, -22, 34], [10, -6, 32], [-24, 0, 28]].forEach(function (c) {
      ctx.beginPath(); ctx.arc(sPos.x + c[0] - 40, sPos.y + c[1], c[2], 0, 6.283); ctx.fill();
    });
    ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1.5;
    for (var f = 0; f < 10; f++) {
      var fx = sPos.x - 70 + ((f * 13 + G.anim * 90) % 80), fy = sPos.y - 10 + ((f * 29 + G.anim * 140) % 60);
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx - 3, fy + 8); ctx.stroke();
    }
    if (danger > 0.55 && Math.floor(G.anim * 4) % 2 === 0) {
      ctx.fillStyle = "#EF4444"; ctx.font = "bold 16px Outfit, sans-serif"; ctx.textAlign = "left";
      ctx.fillText("⚠ Storm is close! Type faster!", 20, 30);
    }
    // climber
    var cl = slope(Math.min(1, G.dispP / G.text.length));
    drawClimber(cl.x, cl.y);
  }

  function drawFlag(x, y, color, s) {
    ctx.strokeStyle = "#333"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 34 * s); ctx.stroke();
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x, y - 34 * s); ctx.lineTo(x + 18 * s, y - 28 * s); ctx.lineTo(x, y - 22 * s); ctx.closePath(); ctx.fill();
  }

  function drawClimber(x, y) {
    var step = Math.sin(G.anim * 10) * (G.lastCps > 0.2 ? 5 : 0);
    ctx.save(); ctx.translate(x, y);
    ctx.shadowColor = PLAYER_COLOR; ctx.shadowBlur = 12;
    ctx.strokeStyle = "#1F2937"; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(-5 - step, 0); ctx.moveTo(0, -14); ctx.lineTo(7 + step, -1); ctx.stroke();
    ctx.strokeStyle = PLAYER_COLOR; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(3, -28); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#1F2937"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(3, -25); ctx.lineTo(14, -30 + step * 0.5); ctx.stroke();
    ctx.strokeStyle = "#8B5A2B"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(14, -30); ctx.lineTo(16, -4); ctx.stroke();
    ctx.fillStyle = "#F4C7A1"; ctx.beginPath(); ctx.arc(4, -34, 5.5, 0, 6.283); ctx.fill();
    ctx.fillStyle = "#EF4444"; ctx.beginPath(); ctx.arc(4, -36, 6, Math.PI, 0); ctx.fill();
    ctx.restore();
  }

  /* ------------------------------ meteors ---------------------------- */
  function drawRain() {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#050A24"); g.addColorStop(1, "#2B1B5E");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    for (var s = 0; s < 40; s++) { ctx.globalAlpha = 0.3 + (s % 5) * 0.12; ctx.fillRect((s * 83) % W, (s * 47 + G.anim * (6 + s % 4)) % H, 2, 2); }
    ctx.globalAlpha = 1;
    // ground
    ctx.fillStyle = "#1B1F3B"; ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = "#3B82F6"; ctx.fillRect(0, H - 42, W, 3);
    // defender rocket pointing at the target
    var tx = G.target ? G.target.x : W / 2, ty = G.target ? G.target.y : 0;
    var ang = Math.atan2(ty - (H - 50), tx - W / 2) + Math.PI / 2;
    ctx.save(); ctx.translate(W / 2, H - 44); ctx.rotate(Math.max(-1.2, Math.min(1.2, ang)));
    ctx.fillStyle = PLAYER_COLOR; ctx.fillRect(-7, -26, 14, 26);
    ctx.beginPath(); ctx.moveTo(-7, -26); ctx.lineTo(0, -40); ctx.lineTo(7, -26); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (G.target) {
      ctx.strokeStyle = "rgba(0,229,255,.55)"; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(W / 2, H - 80); ctx.lineTo(tx, ty); ctx.stroke(); ctx.setLineDash([]);
    }
    // words
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    G.words.forEach(function (w) {
      var locked = G.target === w;
      ctx.fillStyle = locked ? "#FB923C" : "#7C3F1D";
      ctx.beginPath(); ctx.arc(w.x - w.w / 2 + 6, w.y - 4, 8, 0, 6.283); ctx.arc(w.x + w.w / 2 - 6, w.y + 3, 9, 0, 6.283); ctx.fill();
      ctx.fillStyle = locked ? "#FDBA74" : "#A5592B";
      roundRect(w.x - w.w / 2, w.y - 15, w.w, 30, 14); ctx.fill();
      ctx.font = "bold 20px 'JetBrains Mono', monospace";
      var half = ctx.measureText(w.text).width / 2, startX = w.x - half;
      ctx.textAlign = "left";
      ctx.fillStyle = "#16A34A"; ctx.fillText(w.text.slice(0, w.pos), startX, w.y);
      var done = ctx.measureText(w.text.slice(0, w.pos)).width;
      ctx.fillStyle = "#1B1209"; ctx.fillText(w.text.slice(w.pos), startX + done, w.y);
      ctx.textAlign = "center";
    });
    ctx.textBaseline = "alphabetic";
  }

  /* ------------------------------ wiring ----------------------------- */
  hub.addEventListener("click", function (e) {
    var card = e.target.closest(".gm-card");
    if (card) showStage(card.getAttribute("data-game"));
  });
  $("gmBack").addEventListener("click", showHub);
  $("gmRestart").addEventListener("click", function () { if (G) startCountdown(); });
  $("gmPause").addEventListener("click", function () { togglePause(); });
  diffSel.addEventListener("change", function () { if (G) { G = newState(G.id); prepareUi(); showIntro(); } });
  lenSel.addEventListener("change", function () { if (G) { G = newState(G.id); prepareUi(); showIntro(); } });

  // Leaving the Games page ends the current game; pausing when the tab is hidden keeps timing fair.
  window.addEventListener("speedtype:pagechange", function (e) {
    if (e.detail !== "games" && G) showHub();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && G && G.phase === "running") togglePause(true);
  });
})();
