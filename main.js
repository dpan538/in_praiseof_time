const MANIFEST_URL = "signal_data/MANIFEST.json";

const CHAPTERS = {
  ch00: {
    code: "CH.00",
    label: "LOCATING...",
    primary: "#F0F0F0",
    secondary: "#0a0a0a",
    coordinates: "40.7194, -73.9896",
    clips: [],
  },
  ch01: {
    code: "CH.01",
    label: "THE SAME WINDOW",
    primary: "#FF2D55",
    secondary: "#1A1A4E",
    coordinates: "40.7194, -73.9896",
    clips: ["IMG_1401", "IMG_1410", "IMG_2140", "IMG_2361", "IMG_4700", "IMG_1448", "IMG_1565", "IMG_1627"],
    interruptAfter: "IMG_4700",
  },
  ch02: {
    code: "CH.02",
    label: "NO SIGNAL",
    primary: "#FFE600",
    secondary: "#0a0a0a",
    coordinates: "NO GPS / SUSPENDED",
    clips: ["IMG_7948", "IMG_8033", "IMG_8084", "IMG_8191", "IMG_8220", "IMG_8224", "IMG_8284", "IMG_8300", "IMG_8722", "IMG_0196"],
  },
  ch03: {
    code: "CH.03",
    label: "ASCENT",
    primary: "#7ECECA",
    secondary: "#C8C800",
    tertiary: "#888888",
    coordinates: "37.3300, 101.4005",
    clips: ["IMG_3484", "IMG_3549", "IMG_3551", "IMG_3567", "IMG_3612", "IMG_3618", "IMG_3682", "IMG_3727", "IMG_3773", "IMG_3798", "IMG_3810", "IMG_3840", "IMG_3940"],
  },
  ch04: {
    code: "CH.04",
    label: "BRISBANE",
    primary: "#5A9E9E",
    secondary: "#555555",
    coordinates: "-27.4431, 153.0639",
    clips: ["IMG_5523", "IMG_5521", "IMG_5671", "IMG_6010", "IMG_3483"],
  },
  int: {
    code: "INT",
    label: "MT. TAI",
    primary: "#4D4DFF",
    secondary: "#0a0a0a",
    coordinates: "36.2043, 117.0843",
    clips: ["IMG_8863"],
  },
};

const state = {
  signal: {},
  chapter: "ch00",
  previousChapter: "ch01",
  clipIndex: 0,
  currentClip: null,
  previousClip: null,
  wasInterrupted: false,
  textureRects: [],
  textureTarget: [],
  p5Loaded: false,
  p5Sketch: null,
  ch04EnteredAt: 0,
  intTimer: null,
  desktopWindows: [],
  windowZ: 100,
  gpsLostTimers: [],
  interruptTextTimer: null,
  trashSequenceStarted: false,
  audio: {
    context: null,
    gainVideo: null,
    gainExtract: null,
    gainAmbient: null,
    ambientGainBase: 0.15,
  },
};

const dom = {
  root: document.documentElement,
  body: document.body,
  texture: document.getElementById("signal-texture"),
  subdermalText: document.getElementById("subdermal-text"),
  noise: document.getElementById("noise-frame"),
  flash: document.getElementById("white-flash"),
  chapter00: document.getElementById("chapter-00"),
  stage: document.getElementById("chapter-stage"),
  chapterLabel: document.getElementById("chapter-label"),
  coordinates: document.getElementById("coordinates"),
  clock: document.getElementById("clock"),
  navButtons: [...document.querySelectorAll(".chapter-nav button")],
  latScan: document.getElementById("lat-scan"),
  lonScan: document.getElementById("lon-scan"),
  signalAcquired: document.getElementById("signal-acquired"),
  video: document.getElementById("chapter-video"),
  crtFrame: document.getElementById("crt-frame"),
  monitor: document.getElementById("signal-monitor"),
  route: document.getElementById("altitude-route"),
  scale: document.getElementById("altitude-scale"),
  p5Layer: document.getElementById("p5-layer"),
  gpsLostLine: document.getElementById("gps-lost-line"),
  gpsLostBeishang: document.getElementById("gps-lost-beishang"),
  ch02BeishangFragment: document.getElementById("ch02-beishang-fragment"),
  objectLayer: document.getElementById("desktop-object-layer"),
  desktopIcons: [...document.querySelectorAll(".desktop-icon")],
  interruptStage: document.getElementById("interrupt-stage"),
  interruptVideo: document.getElementById("interrupt-video"),
  interruptBeishangText: document.getElementById("interrupt-beishang-text"),
};

const textureCtx = dom.texture.getContext("2d");

init();

async function init() {
  const response = await fetch(MANIFEST_URL);
  state.signal = await response.json();
  window.SIGNAL = state.signal;
  loadSubdermalText();

  bindEvents();
  startClock();
  setupVideoObserver();
  setupAudioUnlock();
  setupDesktopObjects();
  resizeTexture();
  activateChapter("ch00");
  runLocating();
  requestAnimationFrame(drawTexture);
}

async function loadSubdermalText() {
  const response = await fetch("beishang.txt");
  const text = await response.text();
  dom.subdermalText.textContent = Array.from({ length: 10 }, () => text).join("\n\n");
}

function bindEvents() {
  window.addEventListener("resize", resizeTexture);
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener("wheel", onWheel, { passive: false });

  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const chapter = button.dataset.chapter;
      if (chapter === "int") {
        enterInterrupt();
      } else {
        activateChapter(chapter);
      }
    });
  });

  dom.video.addEventListener("ended", () => advanceClip());
  dom.interruptVideo.addEventListener("ended", () => exitInterrupt());
}

function setupDesktopObjects() {
  const zones = [
    { x: [0.12, 0.24], y: [0.16, 0.32] },
    { x: [0.72, 0.84], y: [0.16, 0.34] },
    { x: [0.12, 0.25], y: [0.62, 0.78] },
    { x: [0.72, 0.84], y: [0.58, 0.76] },
    { x: [0.46, 0.56], y: [0.76, 0.86] },
  ];

  dom.desktopIcons.forEach((icon, index) => {
    const zone = zones[index];
    icon.style.left = `${randomBetween(zone.x[0], zone.x[1]) * window.innerWidth}px`;
    icon.style.top = `${randomBetween(zone.y[0], zone.y[1]) * window.innerHeight}px`;
    icon.addEventListener("click", () => openDesktopObject(icon.dataset.object));
  });
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function openDesktopObject(type) {
  const builders = {
    nye: buildNyeWindow,
    nanxiang: buildNanxiangWindow,
    brisbane: buildBrisbaneWindow,
    nogps: buildNoGpsWindow,
    trash: buildTrashWindow,
  };
  const builder = builders[type];
  if (!builder) return;

  closeOldestWindowsForNewOne();
  const win = builder();
  win.style.left = `${Math.round(randomBetween(0.34, 0.58) * window.innerWidth)}px`;
  win.style.top = `${Math.round(randomBetween(0.18, 0.42) * window.innerHeight)}px`;
  bringWindowForward(win);
  makeDraggable(win);
  dom.objectLayer.appendChild(win);
  state.desktopWindows.push(win);
}

function closeOldestWindowsForNewOne() {
  while (state.desktopWindows.length >= 2) {
    const oldest = state.desktopWindows.shift();
    oldest?.remove();
  }
}

function createDesktopWindow(title, body) {
  const win = document.createElement("article");
  win.className = "desktop-window";
  win.innerHTML = [
    `<div class="desktop-titlebar"><span>| ${title} |</span><button class="desktop-close" aria-label="Close">[x]</button></div>`,
    `<div class="desktop-body"><pre>+------------------------------+</pre>${body}<pre>+------------------------------+</pre></div>`,
  ].join("");
  win.querySelector(".desktop-close").addEventListener("click", () => closeDesktopWindow(win));
  win.addEventListener("pointerdown", () => bringWindowForward(win));
  return win;
}

function closeDesktopWindow(win) {
  if (win.trashTimers) {
    win.trashTimers.forEach((timer) => clearTimeout(timer));
  }
  const index = state.desktopWindows.indexOf(win);
  if (index >= 0) state.desktopWindows.splice(index, 1);
  win.remove();
}

function bringWindowForward(win) {
  state.windowZ += 1;
  win.style.zIndex = state.windowZ;
}

function makeDraggable(win) {
  const handle = win.querySelector(".desktop-titlebar");
  let drag = null;
  handle.addEventListener("pointerdown", (event) => {
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: parseFloat(win.style.left) || 0,
      top: parseFloat(win.style.top) || 0,
    };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!drag) return;
    win.style.left = `${drag.left + event.clientX - drag.x}px`;
    win.style.top = `${drag.top + event.clientY - drag.y}px`;
  });
  handle.addEventListener("pointerup", () => {
    drag = null;
  });
}

function buildVideoObjectWindow(title, clipKey, extraHtml, autoCloseMs = null) {
  const clip = state.signal[clipKey];
  const body = [
    `<div class="desktop-crt"><video playsinline preload="metadata" src="${clip.filename}"></video></div>`,
    `<div class="desktop-signal">${extraHtml}</div>`,
  ].join("");
  const win = createDesktopWindow(title, body);
  const video = win.querySelector("video");
  video.volume = 0.2;
  video.loop = false;
  setTimeout(() => video.play().catch(() => {}), 0);
  if (autoCloseMs) {
    setTimeout(() => {
      if (document.body.contains(win)) closeDesktopWindow(win);
    }, autoCloseMs);
  }
  return win;
}

function buildNyeWindow() {
  return buildVideoObjectWindow(
    "31 DEC 2024  22:14  NEW YORK",
    "IMG_5811",
    "LUM 0.036  MOTION 0.005  GLITCH ██████████",
    3000
  );
}

function buildNanxiangWindow() {
  return buildVideoObjectWindow(
    "12 JAN 2024  20:55  SHANGHAI",
    "IMG_0196",
    `<div>LUM 0.062  MOTION 0.003</div><div class="desktop-text-slot"><!-- NANXIANG_TEXT --></div>`
  );
}

function buildBrisbaneWindow() {
  return buildVideoObjectWindow(
    "14 MAY 2026  00:23  BALMORAL",
    "IMG_6010",
    `<div>LUM 0.473  MOTION 0.245</div><div class="desktop-text-slot"><!-- BRISBANE_TEXT --></div>`
  );
}

function buildNoGpsWindow() {
  const body = [
    `<div class="desktop-crt black-signal">`,
    `<pre>GPS:    NO SIGNAL
ALT:    ---
GLITCH: ██████████  1.00
LUM:    0.479
MOTION: 0.136</pre>`,
    `<div class="center-line"><!-- NO_GPS_TEXT --></div>`,
    `</div>`,
  ].join("");
  return createDesktopWindow("04 JUL 2024  09:46  QIQIHAR->ARXAN", body);
}

function buildTrashWindow() {
  const body = `<div class="trash-list"><button data-trash-item="untitled">untitled.txt</button></div>`;
  const win = createDesktopWindow("TRASH - 1 item", body);
  win.querySelector("[data-trash-item]").addEventListener("click", () => {
    openTrashTextWindow();
  });
  return win;
}

function openTrashTextWindow() {
  closeOldestWindowsForNewOne();
  const win = createDesktopWindow("untitled.txt", `<textarea class="trash-empty-file" readonly></textarea><div class="trash-status"></div>`);
  win.style.left = `${Math.round(randomBetween(0.4, 0.6) * window.innerWidth)}px`;
  win.style.top = `${Math.round(randomBetween(0.26, 0.46) * window.innerHeight)}px`;
  bringWindowForward(win);
  makeDraggable(win);
  dom.objectLayer.appendChild(win);
  state.desktopWindows.push(win);
  startTrashSequence(win);
}

function startTrashSequence(win) {
  if (state.trashSequenceStarted) return;
  state.trashSequenceStarted = true;
  const status = win.querySelector(".trash-status");
  win.trashTimers = [
    setTimeout(() => {
      if (document.body.contains(win)) status.textContent = "modified: never";
    }, 5000),
    setTimeout(() => {
      if (document.body.contains(win)) status.textContent = "我没有加入他们。";
    }, 10000),
    setTimeout(() => {
      if (document.body.contains(win)) status.textContent = "";
    }, 15000),
  ];
}

function onKeyDown(event) {
  if (event.key.toLowerCase() === "n" && state.chapter === "ch01") {
    triggerNyeInterrupt();
  }
  if (event.key === "Escape" && dom.interruptStage.classList.contains("is-active")) {
    exitInterrupt();
  }
}

function onWheel(event) {
  if (state.chapter !== "ch04") return;
  event.preventDefault();
  window.scrollBy(0, event.deltaY * 0.4);
}

function startClock() {
  const tick = () => {
    const now = new Date();
    dom.clock.textContent = `| ${now.toLocaleTimeString("en-AU", { hour12: false })} |`;
  };
  tick();
  setInterval(tick, 1000);
}

function runLocating() {
  const started = performance.now();
  const duration = 4800;
  const targetLat = 40.7194;
  const targetLon = -73.9896;

  function step(now) {
    if (state.chapter !== "ch00") return;
    const t = Math.min(1, (now - started) / duration);
    const jitter = (1 - t) * 40;
    const lat = t < 0.92 ? targetLat + (Math.random() - 0.5) * jitter : targetLat;
    const lon = t < 0.92 ? targetLon + (Math.random() - 0.5) * jitter : targetLon;
    dom.latScan.textContent = lat.toFixed(4);
    dom.lonScan.textContent = lon.toFixed(4);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      dom.signalAcquired.classList.add("is-active");
      setTimeout(() => hardCut(() => activateChapter("ch01")), 850);
    }
  }

  requestAnimationFrame(step);
}

function activateChapter(chapter) {
  if (!CHAPTERS[chapter]) return;
  if (chapter === "int") {
    enterInterrupt();
    return;
  }

  state.previousChapter = state.chapter;
  state.chapter = chapter;
  state.clipIndex = 0;
  state.wasInterrupted = false;

  const spec = CHAPTERS[chapter];
  setPalette(spec);
  updateChrome(spec);
  updateNav(chapter);
  dom.chapter00.classList.toggle("is-active", chapter === "ch00");
  dom.stage.classList.toggle("is-active", chapter !== "ch00");
  dom.stage.dataset.mode = chapter;

  if (chapter === "ch00") {
    dom.video.pause();
    dom.video.removeAttribute("src");
    dom.video.load();
    setTextureChapter("ch00");
    return;
  }

  setTextureChapter(chapter);
  setClip(spec.clips[0]);
  renderAltitudeRoute();
  maybeStartP5(chapter);
  maybeStartCh04InterruptTimer(chapter);
}

function setPalette(spec) {
  dom.root.style.setProperty("--chapter-primary", spec.primary);
  dom.root.style.setProperty("--chapter-secondary", spec.secondary);
  dom.root.style.setProperty("--chapter-tertiary", spec.tertiary || "#888888");
}

function updateChrome(spec) {
  dom.chapterLabel.textContent = `| ${spec.code} / ${spec.label} |`;
  dom.coordinates.textContent = `| ${spec.coordinates} |`;
}

function updateNav(chapter) {
  dom.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.chapter === chapter);
  });
}

function setClip(clipKey) {
  if (!clipKey || !state.signal[clipKey]) return;
  state.currentClip = clipKey;
  const clip = state.signal[clipKey];

  dom.video.dataset.clip = clipKey;
  dom.video.loop = false;
  dom.video.volume = 0.2;
  dom.video.src = clip.filename;
  dom.video.load();
  dom.video.play().catch(() => {});

  const glitch = clip.glitch_weight || 0;
  dom.crtFrame.style.setProperty("--glitch-shift", `${1 + glitch * 5}px`);
  dom.crtFrame.style.setProperty("--glitch-opacity", `${0.18 + glitch * 0.42}`);
  dom.crtFrame.style.setProperty("--glitch-cycle", `${Math.max(1.8, 8 - glitch * 5.8)}s`);

  updateMonitor(clip);
  updateRouteCurrent();
  updateAmbientGain(clip);
  handleGpsLost(clipKey);
}

function advanceClip() {
  if (state.wasInterrupted) return;
  const spec = CHAPTERS[state.chapter];
  if (!spec || !spec.clips.length) return;

  if (state.chapter === "ch01" && state.currentClip === spec.interruptAfter) {
    triggerNyeInterrupt();
    return;
  }

  state.clipIndex = (state.clipIndex + 1) % spec.clips.length;
  setClip(spec.clips[state.clipIndex]);
}

function triggerNyeInterrupt() {
  if (state.wasInterrupted) return;
  state.wasInterrupted = true;
  state.previousClip = state.currentClip;
  hardCut(() => setClip("IMG_5811"));
  setTimeout(() => {
    hardCut(() => {
      state.wasInterrupted = false;
      setClip(state.previousClip || "IMG_1401");
    });
  }, 3000);
}

function enterInterrupt() {
  state.previousChapter = state.chapter === "int" ? "ch01" : state.chapter;
  state.chapter = "int";
  const clip = state.signal.IMG_8863;
  setPalette(CHAPTERS.int);
  dom.body.classList.add("is-interrupt");
  dom.interruptStage.classList.add("is-active");
  dom.interruptVideo.volume = 0.2;
  dom.interruptVideo.src = clip.filename;
  dom.interruptVideo.load();
  hardCut(() => dom.interruptVideo.play().catch(() => {}));
  startInterruptText();
  setTextureChapter("int");
}

function exitInterrupt() {
  stopInterruptText();
  dom.interruptVideo.pause();
  dom.interruptVideo.removeAttribute("src");
  dom.interruptVideo.load();
  dom.body.classList.remove("is-interrupt");
  dom.interruptStage.classList.remove("is-active");
  hardCut(() => activateChapter(state.previousChapter || "ch04"));
}

function startInterruptText() {
  stopInterruptText();
  const text = "在这种单纯面前，\n我如何是一个人？\n不是风中飘来的声音。";
  const interval = 62000 / (text.length * 0.8);
  let index = 0;
  dom.interruptBeishangText.textContent = "";
  state.interruptTextTimer = setInterval(() => {
    index += 1;
    dom.interruptBeishangText.textContent = text.slice(0, index);
    if (index >= text.length) stopInterruptText(false);
  }, interval);
}

function stopInterruptText(clear = true) {
  if (state.interruptTextTimer) {
    clearInterval(state.interruptTextTimer);
    state.interruptTextTimer = null;
  }
  if (clear) dom.interruptBeishangText.textContent = "";
}

function hardCut(callback) {
  dom.noise.classList.remove("is-active");
  void dom.noise.offsetWidth;
  dom.noise.classList.add("is-active");
  setTimeout(callback, 40);
}

function whiteFlash() {
  dom.flash.classList.remove("is-active");
  void dom.flash.offsetWidth;
  dom.flash.classList.add("is-active");
}

function updateMonitor(clip) {
  const rgb = clip.rgb || {};
  const local = clip.local_time ? clip.local_time.slice(11, 16) : "--:--";
  const place = (clip.location || "----").replace("New York City, US", "NYC");
  const altitude = Number.isFinite(clip.altitude_m) ? `${Math.round(clip.altitude_m).toString().padStart(4, "0")}m` : "----";
  const gps = clip.glitch_weight >= 1 ? "NO GPS" : `SIG ${(1 - clip.glitch_weight).toFixed(2)}`;
  const ascent = state.chapter === "ch03" && Number.isFinite(clip.altitude_m) ? `| ASCENT   | ${signed(Math.round(clip.altitude_m - 1723))}m from start |` : "";

  dom.monitor.textContent = [
    "+-----------------------------+",
    "| SIGNAL MONITOR              |",
    "+-----------------------------+",
    row("CLIP", clip.clip),
    row("LOCAL", `${local} ${place.slice(0, 10)}`),
    row("ALT", altitude),
    row("GPS SIG", `${gps} ${bar(1 - clip.glitch_weight)}`),
    row("LUM", `${num(rgb.luminance_mean)} ${bar(rgb.luminance_mean)}`),
    row("MOTION", `${num(rgb.motion_score)} ${bar(rgb.motion_score * 4)}`),
    row("GLITCH", `${num(clip.glitch_weight)} ${bar(clip.glitch_weight)}`),
    row("RMS PEAK", `${num(clip.rms_peak)} ${bar(clip.rms_peak * 3)}`),
    row("iOS", clip.ios || "----"),
    state.chapter === "ch03" ? row("ALTITUDE", `${Math.round(clip.altitude_m || 0)}m ${bar(clip.altitude_normalized)}`) : "",
    ascent,
    "+-----------------------------+",
  ].filter(Boolean).join("\n");
}

function row(label, value) {
  const left = label.padEnd(8, " ");
  const right = String(value).slice(0, 17).padEnd(17, " ");
  return `| ${left} | ${right} |`;
}

function bar(value) {
  const clamped = Math.max(0, Math.min(1, Number(value) || 0));
  const filled = Math.round(clamped * 5);
  return "▓".repeat(filled) + "░".repeat(5 - filled);
}

function num(value) {
  return (Number(value) || 0).toFixed(2);
}

function signed(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function setupVideoObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && dom.video.dataset.clip && !dom.video.src) {
        setClip(dom.video.dataset.clip);
      }
    });
  });
  observer.observe(dom.video);
}

function resizeTexture() {
  const ratio = window.devicePixelRatio || 1;
  dom.texture.width = Math.floor(window.innerWidth * ratio);
  dom.texture.height = Math.floor(window.innerHeight * ratio);
  dom.texture.style.width = `${window.innerWidth}px`;
  dom.texture.style.height = `${window.innerHeight}px`;
  textureCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  setTextureChapter(state.chapter);
}

function setTextureChapter(chapter) {
  const spec = CHAPTERS[chapter] || CHAPTERS.ch00;
  const clips = spec.clips.length ? spec.clips : ["IMG_1448", "IMG_1565", "IMG_1627"];
  const values = clips.map((key) => state.signal[key]).filter(Boolean);
  const count = 150;
  state.textureTarget = Array.from({ length: count }, (_, index) => {
    const clip = values[index % values.length] || { rgb: { luminance_mean: 0.05, contrast: 0.05 } };
    const lum = clip.rgb?.luminance_mean || 0.05;
    const contrast = clip.rgb?.contrast || 0.05;
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      baseX: Math.random() * window.innerWidth,
      baseY: Math.random() * window.innerHeight,
      size: 4 + Math.random() * (4 + contrast * 18),
      alpha: lum * 0.15,
      drift: 2 + Math.random() * 6,
      phase: Math.random() * Math.PI * 2,
      color: spec.primary,
    };
  });

  if (!state.textureRects.length) {
    state.textureRects = state.textureTarget.map((rect) => ({ ...rect }));
  }
}

function drawTexture(now = 0) {
  textureCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  state.textureRects.forEach((rect, index) => {
    const target = state.textureTarget[index] || rect;
    rect.x += (target.x - rect.x) * 0.015;
    rect.y += (target.y - rect.y) * 0.015;
    rect.size += (target.size - rect.size) * 0.015;
    rect.alpha += (target.alpha - rect.alpha) * 0.015;
    rect.color = target.color;

    const dx = Math.sin(now / (target.drift * 1000) + target.phase) * 2;
    const dy = Math.cos(now / (target.drift * 1200) + target.phase) * 2;
    textureCtx.fillStyle = hexToRgba(rect.color, rect.alpha);
    textureCtx.fillRect(rect.x + dx, rect.y + dy, rect.size, rect.size);
  });
  requestAnimationFrame(drawTexture);
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function maybeStartP5(chapter) {
  if (chapter !== "ch02") {
    if (state.p5Sketch?.noLoop) state.p5Sketch.noLoop();
    return;
  }
  if (state.p5Sketch?.loop) {
    state.p5Sketch.loop();
    return;
  }
  if (state.p5Loaded) {
    createP5Sketch();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js";
  script.onload = () => {
    state.p5Loaded = true;
    createP5Sketch();
  };
  document.head.appendChild(script);
}

function createP5Sketch() {
  const source = document.getElementById("ch02-text-source").textContent.trim();
  const chars = source.length ? [...source] : [];
  const particles = [];
  let phase = 0;
  let phaseStarted = performance.now();

  state.p5Sketch = new p5((p) => {
    p.setup = () => {
      const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
      canvas.parent("p5-layer");
      p.textFont("IBM Plex Mono");
      p.textSize(14);
      spawn();
    };

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      spawn();
    };

    p.draw = () => {
      p.clear();
      p.fill(CHAPTERS.ch02.primary);
      p.noStroke();
      const elapsed = performance.now() - phaseStarted;
      if (elapsed > 5000) {
        phase = (phase + 1) % 4;
        phaseStarted = performance.now();
        if (phase === 3) pulseCh02Fragment();
      }

      particles.forEach((particle, index) => {
        const noise = p.noise(particle.x * 0.003, particle.y * 0.003, p.frameCount * 0.006);
        const amp = phase === 1 ? 3.2 : 1.1;
        particle.vx += (noise - 0.5) * 0.025 * amp;
        particle.vy += (noise - 0.5) * 0.02 * amp;

        if (phase === 2) {
          const target = birdTarget(index, particles.length, p.width, p.height);
          particle.vx += (target.x - particle.x) * 0.0008;
          particle.vy += (target.y - particle.y) * 0.0008;
        }

        if (phase === 3) {
          particle.vy -= 0.018;
          particle.vx += 0.004;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        p.push();
        p.translate(particle.x, particle.y);
        p.scale(1 + (phase === 1 ? noise * 1.8 : 0), 1);
        p.text(particle.char, 0, 0);
        p.pop();
      });

      if (phase === 3 && particles.every((particle) => particle.y < -20)) {
        phase = 0;
        phaseStarted = performance.now();
        spawn();
      }
    };

    function spawn() {
      particles.length = 0;
      chars.forEach((char) => {
        particles.push({
          char,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      });
    }
  });
}

function birdTarget(index, total, width, height) {
  const centerX = width * 0.5;
  const centerY = height * 0.42;
  const side = index % 2 === 0 ? -1 : 1;
  const rank = Math.floor(index / 2);
  return {
    x: centerX + side * rank * Math.max(4, width / Math.max(48, total)),
    y: centerY + rank * 3,
  };
}

function handleGpsLost(clipKey) {
  clearGpsLostTimers();
  if (clipKey !== "IMG_8084") {
    dom.gpsLostLine.classList.remove("is-active");
    dom.gpsLostBeishang.classList.remove("show-one", "show-two");
    return;
  }
  dom.gpsLostLine.classList.add("is-active");
  dom.gpsLostBeishang.classList.add("show-one");
  if (state.p5Sketch?.noLoop) state.p5Sketch.noLoop();
  state.gpsLostTimers.push(setTimeout(() => {
    dom.gpsLostBeishang.classList.remove("show-one");
    dom.gpsLostBeishang.classList.add("show-two");
  }, 5000));
  state.gpsLostTimers.push(setTimeout(() => {
    dom.gpsLostLine.classList.remove("is-active");
    dom.gpsLostBeishang.classList.remove("show-one", "show-two");
    if (state.chapter === "ch02" && state.p5Sketch?.loop) state.p5Sketch.loop();
  }, 9000));
}

function clearGpsLostTimers() {
  state.gpsLostTimers.forEach((timer) => clearTimeout(timer));
  state.gpsLostTimers = [];
}

function pulseCh02Fragment() {
  if (state.chapter !== "ch02") return;
  dom.ch02BeishangFragment.classList.add("is-bright");
  setTimeout(() => {
    dom.ch02BeishangFragment.classList.remove("is-bright");
  }, 1000);
}

function renderAltitudeRoute() {
  dom.route.innerHTML = "";
  dom.scale.innerHTML = "";
  if (state.chapter !== "ch03") return;

  const clips = CHAPTERS.ch03.clips.map((key) => state.signal[key]).filter(Boolean);
  const points = clips.map((clip, index) => {
    const x = 42 + (index / Math.max(1, clips.length - 1)) * 236;
    const y = 640 - (clip.altitude_normalized || 0) * 580;
    return { clip, x, y };
  });

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("class", "route-line");
  polyline.setAttribute("points", points.map((point) => `${point.x},${point.y}`).join(" "));
  dom.route.appendChild(polyline);

  points.forEach((point) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", `route-dot ${point.clip.clip === state.currentClip ? "is-current" : ""}`);
    dot.setAttribute("data-clip", point.clip.clip);
    dot.setAttribute("cx", point.x);
    dot.setAttribute("cy", point.y);
    dot.setAttribute("r", "4");
    dom.route.appendChild(dot);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "route-label");
    label.setAttribute("x", point.x + 7);
    label.setAttribute("y", point.y + 3);
    label.textContent = `${point.clip.clip} / ${point.clip.local_time.slice(11, 16)}`;
    dom.route.appendChild(label);
  });

  ["3752m", "3000m", "2200m", "1723m"].forEach((label) => {
    const div = document.createElement("div");
    div.textContent = `| ${label}`;
    dom.scale.appendChild(div);
  });
}

function updateRouteCurrent() {
  if (state.chapter !== "ch03") return;
  [...dom.route.querySelectorAll(".route-dot")].forEach((dot) => {
    dot.classList.toggle("is-current", dot.dataset.clip === state.currentClip);
  });
}

function maybeStartCh04InterruptTimer(chapter) {
  clearTimeout(state.intTimer);
  if (chapter !== "ch04") return;
  state.ch04EnteredAt = performance.now();
  state.intTimer = setTimeout(() => {
    if (state.chapter === "ch04") enterInterrupt();
  }, 240000);
}

function setupAudioUnlock() {
  const unlock = () => {
    if (state.audio.context) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    state.audio.context = context;
    state.audio.gainVideo = context.createGain();
    state.audio.gainExtract = context.createGain();
    state.audio.gainAmbient = context.createGain();
    state.audio.gainVideo.gain.value = 0.2;
    state.audio.gainExtract.gain.value = 0.0;
    state.audio.gainAmbient.gain.value = state.audio.ambientGainBase;
    state.audio.gainVideo.connect(context.destination);
    state.audio.gainExtract.connect(context.destination);
    state.audio.gainAmbient.connect(context.destination);
  };
  document.addEventListener("pointerdown", unlock, { once: true });
  document.addEventListener("keydown", unlock, { once: true });
}

function updateAmbientGain(clip) {
  const gain = state.audio.gainAmbient;
  if (!gain || !state.audio.context) return;
  const target = state.audio.ambientGainBase + (clip.rms_peak || 0) * 0.05;
  gain.gain.cancelScheduledValues(state.audio.context.currentTime);
  gain.gain.linearRampToValueAtTime(target, state.audio.context.currentTime + 0.25);
}
