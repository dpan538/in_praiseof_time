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

const BOOT_SEQUENCE_BASE = [
  { text: "in_praise_of_time", delay: 0 },
  { text: "v1.0.0", delay: 600 },
  { text: "", delay: 400 },
  { text: "loading archive...", delay: 200 },
  { text: "MANIFEST.json        OK", delay: 500 },
  { text: "environment.json     OK", delay: 200 },
];

const SHUTDOWN_TEXT = "in_praise_of_time  —  session ended";
const SHUTDOWN_SUBTEXT = "2024 – 2026";
const SHUTDOWN_FINAL = "daipan.art  /  daipan.ink";

const MAP_CENTERS = {
  CH00: { lat: 40.7194, lon: -73.9896, zoom: 15 },
  CH01: { lat: 40.7194, lon: -73.9896, zoom: 15 },
  CH02: { lat: 48.9213, lon: 117.1130, zoom: 9 },
  CH03: { lat: 37.3784, lon: 101.4117, zoom: 10 },
  CH04: { lat: -27.443, lon: 153.064, zoom: 13 },
  INT: { lat: 36.2043, lon: 117.0843, zoom: 12 },
};

const TRASH_ITEMS = [
  { id: "freedom-wanted", filename: "想要自由.txt", type: "text", content: [] },
  { id: "freedom-forbidden", filename: "不该有自由.txt", type: "text", content: [] },
  { id: "freedom-still", filename: "还是应该有.txt", type: "text", statusSequence: true, content: [] },
  {
    id: "cambridge-as",
    filename: "Cambridge_AS_2020.pdf",
    type: "pdf",
    content: [
      "STATEMENT OF RESULTS",
      "GCE AS & A LEVEL",
      "",
      "Candidate Name    DAI PAN",
      "Centre Name       SISU BILINGUAL SCHOOL",
      "Date of Birth     17/07/2003",
      "Series            November 2020",
      "Centre / Cand.    CN378/0012",
      "",
      "──────────────────────────────────────",
      "Syllabus  Title        Qual    Result",
      "9702      Physics      AS      b(b) 74%",
      "9708      Economics    AS      d(d) 53%",
      "9709      Mathematics  A Level B(b) 77%",
      "──────────────────────────────────────",
      "",
      "Cambridge Assessment International",
      "Education",
    ],
  },
  {
    id: "cambridge-al-forecast",
    filename: "Cambridge_AL_forecast.pdf",
    type: "pdf",
    content: [
      "CAMBRIDGE INTERNATIONAL A LEVEL",
      "FORECAST GRADES",
      "",
      "Shanghai International Studies",
      "University Bilingual School",
      "International Division",
      "",
      "Student Name  潘岱 PAN Dai",
      "Gender        Male",
      "D.O.B.        17/07/2003",
      "Enrollment    01/09/2018",
      "Graduation    01/06/2021",
      "",
      "──────────────────────────────────────",
      "Subject             Forecast Grade",
      "A Level Physics     B",
      "A Level Economics   B",
      "──────────────────────────────────────",
      "",
      "SISU Bilingual School",
      "15/03/2021",
    ],
  },
];

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
  startedAt: performance.now(),
  systemIntervals: [],
  textObserver: null,
  shutdownBuffer: "",
  shuttingDown: false,
  environmentEntries: null,
  minimizedWindows: new Map(),
  map: {
    instance: null,
    marker: null,
    ready: false,
  },
  settings: {
    signalTexture: true,
    subdermalText: true,
    scanLines: false,
    dataPanel: true,
    systemChrome: true,
    coordinates: true,
    clock: true,
    signalOpacity: 1,
    subdermalOpacity: 0.03,
    audio: {
      video: 0.2,
      ambient: 0.15,
      extract: 0,
    },
  },
  metrics: {
    clipWatch: {},
    clipsRead: new Set(JSON.parse(sessionStorage.getItem("clips_read") || "[]")),
    textSeen: new Set(JSON.parse(sessionStorage.getItem("text_seen") || "[]")),
  },
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
  bootScreen: document.getElementById("boot-screen"),
  bootLines: document.getElementById("boot-lines"),
  shutdownScreen: document.getElementById("shutdown-screen"),
  shutdownText: document.getElementById("shutdown-text"),
  shutdownSubtext: document.getElementById("shutdown-subtext"),
  shutdownFinal: document.getElementById("shutdown-final"),
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
  hiddenIntButton: document.getElementById("hidden-int-button"),
  dockBar: document.getElementById("dock-bar"),
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
  setupOperatingSystem();
  resizeTexture();
  if (sessionStorage.getItem("booted") === "1") {
    const chapter = sessionStorage.getItem("last_chapter") || "ch00";
    if (chapter === "int") activateChapter("ch04");
    else {
      activateChapter(CHAPTERS[chapter] ? chapter : "ch00");
      if ((CHAPTERS[chapter] ? chapter : "ch00") === "ch00") runLocating();
    }
  } else {
    await playBootSequence();
    sessionStorage.setItem("booted", "1");
    hardCut(() => {
      hideBootScreen();
      activateChapter("ch00");
      runLocating();
    });
  }
}

async function loadSubdermalText() {
  const response = await fetch("beishang.txt");
  const text = await response.text();
  dom.subdermalText.textContent = Array.from({ length: 10 }, () => text).join("\n\n");
}

function bindEvents() {
  window.addEventListener("resize", () => {
    resizeTexture();
    positionDesktopIcons();
  });
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
  dom.video.addEventListener("timeupdate", trackClipReadProgress);
  dom.interruptVideo.addEventListener("ended", () => exitInterrupt());
  dom.hiddenIntButton?.addEventListener("click", () => enterInterrupt());
}

async function playBootSequence() {
  if (!dom.bootScreen || !dom.bootLines) return;
  dom.bootScreen.classList.add("is-active");
  dom.bootScreen.setAttribute("aria-hidden", "false");
  dom.bootLines.textContent = "";
  const lines = [];
  for (const entry of buildBootSequence()) {
    await wait(entry.delay);
    lines.push(entry.text);
    dom.bootLines.textContent = lines.join("\n");
    dom.bootLines.scrollTop = dom.bootLines.scrollHeight;
  }
  await wait(800);
}

function buildBootSequence() {
  const clips = Object.keys(state.signal || {})
    .filter((key) => key.startsWith("IMG_"))
    .map((key) => state.signal[key]);
  return [
    ...BOOT_SEQUENCE_BASE,
    { text: "", delay: 200 },
    { text: "indexing clips...", delay: 300 },
    ...clips.map((clip) => ({ text: formatBootClipLine(clip), delay: 60 })),
    { text: "", delay: 80 },
    { text: `all ${clips.length} clips indexed   ✓`, delay: 300 },
    { text: "", delay: 120 },
    { text: "loading signal data...", delay: 300 },
    { text: "glitch weights         ✓", delay: 70 },
    { text: "altitude index         ✓", delay: 70 },
    { text: "ios timeline           ✓", delay: 70 },
    { text: "audio waveforms        ✓", delay: 70 },
    { text: "", delay: 120 },
    { text: "mounting environment...", delay: 300 },
    { text: "47 locations           ✓", delay: 70 },
    { text: "6 unverified           !", delay: 70 },
    { text: "", delay: 120 },
    { text: "loading text layers...", delay: 300 },
    { text: "beishang.txt           ✓  (3847 chars)", delay: 70 },
    { text: "eyu_articles.js        ✓  (7 articles)", delay: 70 },
    { text: "news_content.js        ✓  (6 chapters)", delay: 70 },
    { text: "", delay: 120 },
    { text: "system ready.", delay: 600 },
    { text: "locating...", delay: 600 },
  ];
}

function formatBootClipLine(clip) {
  const name = String(clip.filename || clip.clip || "").padEnd(20, " ");
  const time = String(clip.local_time || "").slice(11, 16) || "--:--";
  const location = String(clip.location || "unknown").replace(",", "");
  return `${name}${time}  ${location.padEnd(16, " ")}✓`;
}

function hideBootScreen() {
  if (!dom.bootScreen) return;
  dom.bootScreen.classList.remove("is-active");
  dom.bootScreen.setAttribute("aria-hidden", "true");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setupDesktopObjects() {
  positionDesktopIcons();
  dom.desktopIcons.forEach((icon) => {
    icon.addEventListener("click", () => selectDesktopIcon(icon));
    icon.addEventListener("dblclick", () => openDesktopObject(icon.dataset.object));
  });
}

function positionDesktopIcons() {
  const positions = {
    nye: { right: 236, top: 70 },
    nanxiang: { right: 126, top: 70 },
    brisbane: { right: 16, top: 70 },
    nogps: { right: 170, top: 190 },
    readme: { right: 56, top: 202 },
    eyu: { right: 128, bottom: 84 },
    trash: { right: 18, bottom: 40 },
  };
  dom.desktopIcons.forEach((icon) => {
    const pos = positions[icon.dataset.object] || { right: 18, top: 70 };
    const width = 92;
    icon.style.left = `${Math.max(8, window.innerWidth - pos.right - width)}px`;
    icon.style.top = Number.isFinite(pos.bottom) ? "" : `${pos.top}px`;
    icon.style.bottom = Number.isFinite(pos.bottom) ? `${pos.bottom}px` : "";
  });
}

function selectDesktopIcon(icon) {
  dom.desktopIcons.forEach((item) => item.classList.toggle("is-selected", item === icon));
}

function openDesktopObject(type) {
  const builders = {
    eyu: buildEyuWindow,
    nye: buildNyeWindow,
    nanxiang: buildNanxiangWindow,
    brisbane: buildBrisbaneWindow,
    nogps: buildNoGpsWindow,
    trash: buildTrashWindow,
    readme: buildReadmeWindow,
  };
  const builder = builders[type];
  if (!builder) return;

  closeOldestWindowsForNewOne();
  const win = builder();
  if (!win) return;
  const mounted = mountDesktopWindow(win, {
    id: type,
    kind: "object",
    ...desktopObjectWindowPosition(type),
  });
  if (type === "trash") maybeShowTrashDialog();
  return mounted;
}

function desktopObjectWindowPosition(type) {
  return {
    eyu: { left: 220, top: 110 },
    nye: { left: 460, top: 110 },
    nanxiang: { left: 500, top: 150 },
    brisbane: { left: 540, top: 190 },
    nogps: { left: 460, top: 230 },
    trash: { left: 340, top: 260 },
    readme: { left: 300, top: 90 },
  }[type] || { left: 80, top: 80 };
}

function closeOldestWindowsForNewOne() {
  while (state.desktopWindows.filter((win) => win.dataset.windowKind === "object").length >= 2) {
    const oldest = state.desktopWindows.find((win) => win.dataset.windowKind === "object");
    closeDesktopWindow(oldest);
  }
}

function createDesktopWindow(title, body) {
  const win = document.createElement("article");
  win.className = "desktop-window";
  win.dataset.windowTitle = title;
  win.innerHTML = [
    `<div class="desktop-titlebar"><span>${title}</span><button class="desktop-minimize" type="button" aria-label="Minimize">[─]</button><button class="desktop-close" type="button" aria-label="Close">[×]</button></div>`,
    `<div class="desktop-body"><pre>+------------------------------+</pre>${body}<pre>+------------------------------+</pre></div>`,
  ].join("");
  win.querySelector(".desktop-close").addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    event.preventDefault();
    closeDesktopWindow(win);
  });
  win.querySelector(".desktop-minimize").addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    event.preventDefault();
    minimizeDesktopWindow(win);
  });
  win.addEventListener("pointerdown", () => bringWindowForward(win));
  return win;
}

function mountDesktopWindow(win, options = {}) {
  if (!win) return null;
  const id = options.id || win.dataset.windowId || `window-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  win.dataset.windowId = id;
  win.dataset.windowKind = options.kind || win.dataset.windowKind || "object";
  if (!win.dataset.windowTitle) {
    win.dataset.windowTitle = win.querySelector(".desktop-titlebar span")?.textContent?.replace(/[|]/g, "").trim() || id;
  }
  setWindowPosition(win, options);
  bringWindowForward(win);
  makeDraggable(win);
  dom.objectLayer.appendChild(win);
  if (!state.desktopWindows.includes(win)) state.desktopWindows.push(win);
  updateFinderWindow();
  updateControlPanelWindow();
  return win;
}

function setWindowPosition(win, options = {}) {
  ["left", "right", "top", "bottom"].forEach((side) => {
    win.style[side] = "";
  });
  if (Number.isFinite(options.width)) win.style.width = `${options.width}px`;
  if (Number.isFinite(options.height)) win.style.height = `${options.height}px`;
  const left = options.left ?? 80;
  const top = options.top ?? 80;
  if (Number.isFinite(options.right)) win.style.right = `${options.right}px`;
  else win.style.left = `${left}px`;
  if (Number.isFinite(options.bottom)) win.style.bottom = `${options.bottom}px`;
  else win.style.top = `${top}px`;
}

function createSizedDesktopWindow(title, body, className) {
  const win = typeof body === "string" ? createDesktopWindow(title, body) : createDesktopWindow(title, "");
  if (className) win.classList.add(className);
  if (body && typeof body !== "string") {
    const bodyEl = win.querySelector(".desktop-body");
    bodyEl.insertBefore(body, bodyEl.lastElementChild);
  }
  return win;
}

function closeDesktopWindow(win) {
  if (!win) return;
  removeDockIcon(win);
  if (win.trashTimers) {
    win.trashTimers.forEach((timer) => clearTimeout(timer));
  }
  if (win.systemTimer) clearInterval(win.systemTimer);
  if (win.dataset.windowId === "maze") teardownMazeWindow(win);
  if (win.dataset.windowId === "map") teardownMapWindow(win);
  const index = state.desktopWindows.indexOf(win);
  if (index >= 0) state.desktopWindows.splice(index, 1);
  win.remove();
  updateFinderWindow();
  updateControlPanelWindow();
}

function bringWindowForward(win) {
  if (win.classList.contains("is-minimized")) return;
  state.windowZ += 1;
  state.desktopWindows.forEach((item) => item.classList.remove("is-focused"));
  win.style.zIndex = state.windowZ;
  win.classList.add("is-focused");
  updateFinderWindow();
}

function minimizeDesktopWindow(win) {
  if (!win || win.classList.contains("is-minimized")) return;
  const rect = win.getBoundingClientRect();
  win.dataset.restoreLeft = String(rect.left);
  win.dataset.restoreTop = String(rect.top);
  win.dataset.restoreWidth = String(rect.width);
  win.dataset.restoreHeight = String(rect.height);
  win.classList.add("is-minimized");
  win.style.display = "none";
  addDockIcon(win);
  updateFinderWindow();
  updateControlPanelWindow();
}

function restoreDesktopWindow(win) {
  if (!win) return;
  win.classList.remove("is-minimized");
  win.style.display = "";
  win.style.left = `${Math.round(Number(win.dataset.restoreLeft || 80))}px`;
  win.style.top = `${Math.round(Number(win.dataset.restoreTop || 80))}px`;
  win.style.right = "";
  win.style.bottom = "";
  if (win.dataset.restoreWidth) win.style.width = `${Math.round(Number(win.dataset.restoreWidth))}px`;
  if (win.dataset.restoreHeight) win.style.height = `${Math.round(Number(win.dataset.restoreHeight))}px`;
  removeDockIcon(win);
  bringWindowForward(win);
}

function addDockIcon(win) {
  if (!dom.dockBar || state.minimizedWindows.has(win.dataset.windowId)) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "dock-icon";
  button.textContent = String(win.dataset.windowTitle || win.dataset.windowId || "window").slice(0, 12);
  button.addEventListener("click", () => restoreDesktopWindow(win));
  state.minimizedWindows.set(win.dataset.windowId, button);
  dom.dockBar.appendChild(button);
}

function removeDockIcon(win) {
  const icon = state.minimizedWindows.get(win.dataset.windowId);
  if (icon) icon.remove();
  state.minimizedWindows.delete(win.dataset.windowId);
}

function makeDraggable(win) {
  const handle = win.querySelector(".desktop-titlebar");
  let drag = null;
  handle.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
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

/* SYSTEM WINDOWS --------------------------------------------------------- */
function setupOperatingSystem() {
  insertSystemLaunchers();
  setupTextSeenObserver();
  applySystemSettings();
  if (!sessionStorage.getItem("news_issue")) sessionStorage.setItem("news_issue", "0");
  state.systemIntervals.push(setInterval(() => {
    updateFinderWindow();
    updateProfilerWindow();
  }, 2000));
  openInitialSystemWindows();
}

function openInitialSystemWindows() {
  ["finder", "control", "news", "note", "calendar"].forEach((id) => openSystemWindow(id));
}

function insertSystemLaunchers() {
  const nav = document.querySelector(".chapter-nav");
  if (!nav || document.getElementById("os-launchers")) return;
  const group = document.createElement("div");
  group.id = "os-launchers";
  [
    ["finder", "[FIND]"],
    ["control", "[CTRL]"],
    ["note", "[NOTE]"],
    ["calendar", "[CAL]"],
    ["puzzle", "[PUZ]"],
    ["profiler", "[PROF]"],
    ["maze", "[MAZE]"],
    ["news", "[NEWS]"],
    ["map", "[MAP]"],
  ].forEach(([id, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.systemWindow = id;
    button.textContent = label;
    button.addEventListener("click", () => openSystemWindow(id));
    group.appendChild(button);
  });
  nav.appendChild(group);
}

function openSystemWindow(id) {
  if (id === "search") {
    openSearchWindow(true);
    return null;
  }
  if (id === "eyu") {
    const existing = findWindowById("eyu");
    if (existing) {
      bringWindowForward(existing);
      return existing;
    }
    return openDesktopObject("eyu");
  }
  const existing = findWindowById(id);
  if (existing) {
    bringWindowForward(existing);
    return existing;
  }
  const builder = {
    control: buildControlPanelWindow,
    finder: buildFinderWindow,
    note: buildNoteWindow,
    calendar: buildCalendarWindow,
    puzzle: buildPuzzleWindow,
    profiler: buildProfilerWindow,
    maze: buildMazeWindow,
    news: buildNewsWindow,
    map: buildMapWindow,
  }[id];
  if (!builder) return null;
  const win = builder();
  return mountDesktopWindow(win, { id, kind: "system", ...systemWindowPosition(id) });
}

function closeSystemWindow(id) {
  if (id === "search") {
    openSearchWindow(false);
    return;
  }
  const win = findWindowById(id);
  if (win) closeDesktopWindow(win);
}

function setSystemWindowOpen(id, open) {
  if (open) openSystemWindow(id);
  else closeSystemWindow(id);
  updateControlPanelWindow();
}

function findWindowById(id) {
  return state.desktopWindows.find((win) => win.dataset.windowId === id && document.body.contains(win));
}

function systemWindowPosition(id) {
  const positions = {
    finder: { left: 10, top: 60 },
    control: { right: 10, top: 60 },
    news: { left: 220, top: 60 },
    note: { left: 10, bottom: 80 },
    calendar: { right: 10, bottom: 80 },
    puzzle: { left: 460, top: 120 },
    profiler: { left: 480, top: 150 },
    maze: { left: 520, top: 180 },
    map: { left: 540, top: 80 },
  };
  return positions[id] || {};
}

function openSearchWindow(open) {
  const existing = findWindowById("search");
  if (open) {
    if (existing) {
      restoreDesktopWindow(existing);
      bringWindowForward(existing);
      return;
    }
    const win = buildSearchWindow();
    mountDesktopWindow(win, { id: "search", kind: "system", left: 90, top: 90, width: 360, height: 440 });
    return;
  }
  if (existing) closeDesktopWindow(existing);
}

function isSearchWindowOpen() {
  return !!findWindowById("search");
}

function buildSearchWindow() {
  const shell = document.createElement("div");
  shell.className = "search-panel os-window-body";
  const input = document.createElement("input");
  input.className = "search-input";
  input.type = "search";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "";
  const results = document.createElement("div");
  results.className = "search-results";
  const detail = document.createElement("div");
  detail.className = "search-detail";
  shell.append(input, results, detail);
  const win = createSizedDesktopWindow("search", shell, "desktop-window-search");
  const render = () => renderSearchWindow(input.value, results, detail);
  input.addEventListener("input", render);
  loadEnvironmentEntries().then(render).catch((error) => {
    detail.textContent = `environment.json unavailable\n${error.message || error}`;
  });
  return win;
}

async function loadEnvironmentEntries() {
  if (state.environmentEntries) return state.environmentEntries;
  const env = await fetch("signal_data/environment.json").then((response) => response.json());
  state.environmentEntries = Object.keys(env)
    .filter((group) => group.startsWith("GROUP_"))
    .flatMap((group) => Object.entries(env[group] || {}).map(([key, raw]) => ({
      key,
      group,
      raw,
      label: raw.full_name || key.replaceAll("_", " "),
      search: [key, raw.full_name, raw.terrain, raw.one_fact, raw.narrative_note, raw.chapter_relevance].filter(Boolean).join(" ").toLowerCase(),
    })));
  return state.environmentEntries;
}

function renderSearchWindow(query, results, detail) {
  const entries = state.environmentEntries || [];
  const needle = query.trim().toLowerCase();
  const matches = entries.filter((entry) => !needle || entry.search.includes(needle)).slice(0, 24);
  results.innerHTML = "";
  matches.forEach((entry, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";
    button.textContent = entry.label;
    button.addEventListener("click", () => {
      results.querySelectorAll(".search-result").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      renderSearchDetail(entry, detail);
    });
    results.appendChild(button);
    if (index === 0) {
      button.classList.add("is-selected");
      renderSearchDetail(entry, detail);
    }
  });
  if (!matches.length) detail.textContent = "NO MATCH";
}

function renderSearchDetail(entry, detail) {
  const raw = entry.raw || {};
  detail.innerHTML = "";
  const title = document.createElement("div");
  title.className = "search-detail-title";
  title.textContent = entry.label;
  detail.appendChild(title);
  [
    ["coordinates", extractEnvironmentCoordinates(raw)],
    ["altitude", extractEnvironmentAltitude(raw)],
    ["terrain", raw.terrain || raw.terrain_detail],
    ["climate", raw.climate_note || raw.climate || raw.seasonal_light],
    ["light", raw.light_note || raw.sensory_atmospheric],
    ["population", raw.population_density],
    ["signal coverage", raw.signal_coverage],
    ["one_fact", raw.one_fact],
    ["narrative_note", raw.narrative_note],
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "search-detail-row";
    row.textContent = `${label}: ${formatSearchValue(value)}`;
    detail.appendChild(row);
  });
}

function extractEnvironmentCoordinates(raw) {
  const source = raw.coordinates_verified?.manifest || raw.coordinates_verified?.requested || raw.coordinates || raw;
  const lat = Number(source.lat ?? source.latitude);
  const lon = Number(source.lon ?? source.lng ?? source.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "—";
  return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
}

function extractEnvironmentAltitude(raw) {
  const altitude = raw.altitude_verified;
  if (typeof altitude === "number") return `${Math.round(altitude)}m`;
  if (altitude && typeof altitude === "object") {
    const meters = altitude.meters ?? altitude.manifest_meters ?? altitude.altitude_m;
    if (Number.isFinite(Number(meters))) return `${Math.round(Number(meters))}m`;
    if (altitude.status) return altitude.status;
  }
  return "—";
}

function formatSearchValue(value) {
  if (value === null || typeof value === "undefined" || value === "") return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(formatSearchValue).join("; ");
  return JSON.stringify(value);
}

function makeAsciiCheckbox(label, checked, onChange) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ascii-checkbox";
  const render = () => {
    button.textContent = `${checked ? "[■]" : "[□]"} ${label}`;
  };
  button.addEventListener("click", () => {
    checked = !checked;
    onChange(checked);
    render();
  });
  render();
  return button;
}

function makeAsciiSlider(label, value, min, max, step, onChange) {
  const row = document.createElement("div");
  row.className = "ascii-slider-row";
  const name = document.createElement("span");
  name.className = "ascii-slider-label";
  name.textContent = label;
  const track = document.createElement("button");
  track.type = "button";
  track.className = "ascii-slider";
  const valueNode = document.createElement("span");
  valueNode.className = "ascii-slider-value";
  let current = value;
  const render = () => {
    const units = 10;
    const ratio = Math.max(0, Math.min(1, (current - min) / (max - min || 1)));
    const position = Math.min(units, Math.floor(ratio * units));
    track.textContent = `[${"─".repeat(position)}●${"─".repeat(units - position)}]`;
    valueNode.textContent = current.toFixed(max <= 1 ? 2 : 0);
  };
  const stepFromClientX = (clientX) => {
    const rect = track.getBoundingClientRect();
    const direction = clientX < rect.left + rect.width / 2 ? -1 : 1;
    const next = current + direction * step;
    current = Number(Math.max(min, Math.min(max, next)).toFixed(3));
    onChange(current);
    render();
  };
  track.addEventListener("pointerdown", (event) => {
    stepFromClientX(event.clientX);
  });
  render();
  row.append(name, track, valueNode);
  return row;
}

function sectionBlock(title, children) {
  const block = document.createElement("section");
  block.className = "os-section";
  const heading = document.createElement("div");
  heading.className = "os-section-title";
  heading.textContent = title;
  block.appendChild(heading);
  children.forEach((child) => block.appendChild(child));
  return block;
}

function buildControlPanelWindow() {
  const shell = document.createElement("div");
  shell.className = "control-panel os-window-body";
  const layerControls = [
    makeAsciiCheckbox("signal texture", state.settings.signalTexture, (value) => {
      state.settings.signalTexture = value;
      applySystemSettings();
    }),
    makeAsciiSlider("opacity", state.settings.signalOpacity, 0, 1, 0.05, (value) => {
      state.settings.signalOpacity = value;
      applySystemSettings();
    }),
    makeAsciiCheckbox("subdermal text", state.settings.subdermalText, (value) => {
      state.settings.subdermalText = value;
      applySystemSettings();
    }),
    makeAsciiSlider("opacity", state.settings.subdermalOpacity, 0, 1, 0.01, (value) => {
      state.settings.subdermalOpacity = value;
      applySystemSettings();
    }),
    makeAsciiCheckbox("scan lines", state.settings.scanLines, (value) => {
      state.settings.scanLines = value;
      applySystemSettings();
    }),
    makeAsciiCheckbox("data panel", state.settings.dataPanel, (value) => {
      state.settings.dataPanel = value;
      applySystemSettings();
    }),
  ];
  const audioControls = [
    makeAsciiSlider("video", state.settings.audio.video, 0, 1, 0.05, (value) => {
      state.settings.audio.video = value;
      applySystemSettings();
    }),
    makeAsciiSlider("ambient", state.settings.audio.ambient, 0, 1, 0.05, (value) => {
      state.settings.audio.ambient = value;
      applySystemSettings();
    }),
    makeAsciiSlider("extract", state.settings.audio.extract, 0, 1, 0.05, (value) => {
      state.settings.audio.extract = value;
      applySystemSettings();
    }),
  ];
  const windowControls = document.createElement("div");
  windowControls.className = "checkbox-grid";
  [
    ["search", "search"],
    [".eyu", "eyu"],
    ["profiler", "profiler"],
    ["news", "news"],
    ["map", "map"],
  ].forEach(([label, id]) => {
    windowControls.appendChild(makeAsciiCheckbox(label, isWindowOpen(id), (value) => setSystemWindowOpen(id, value)));
  });
  const displayControls = [
    makeAsciiCheckbox("system chrome", state.settings.systemChrome, (value) => {
      state.settings.systemChrome = value;
      applySystemSettings();
    }),
    makeAsciiCheckbox("coordinates", state.settings.coordinates, (value) => {
      state.settings.coordinates = value;
      applySystemSettings();
    }),
    makeAsciiCheckbox("clock", state.settings.clock, (value) => {
      state.settings.clock = value;
      applySystemSettings();
    }),
  ];
  shell.append(
    sectionBlock("LAYERS", layerControls),
    sectionBlock("AUDIO", audioControls),
    sectionBlock("WINDOWS", [windowControls]),
    sectionBlock("DISPLAY", displayControls)
  );
  return createSizedDesktopWindow("▣ CONTROL PANEL", shell, "desktop-window-control");
}

function isWindowOpen(id) {
  return id === "search" ? isSearchWindowOpen() : !!findWindowById(id);
}

function updateControlPanelWindow() {
  const win = findWindowById("control");
  if (!win) return;
  win.querySelectorAll(".ascii-checkbox").forEach((button) => {
    const text = button.textContent.replace(/^\[[■□]\]\s*/, "");
    const map = { search: "search", ".eyu": "eyu", profiler: "profiler", news: "news", map: "map" };
    if (map[text]) button.textContent = `${isWindowOpen(map[text]) ? "[■]" : "[□]"} ${text}`;
  });
}

function applySystemSettings() {
  dom.body.classList.toggle("hide-signal-texture", !state.settings.signalTexture);
  dom.body.classList.toggle("hide-subdermal-text", !state.settings.subdermalText);
  dom.body.classList.toggle("hide-scan-lines", !state.settings.scanLines);
  dom.body.classList.toggle("hide-data-panel", !state.settings.dataPanel);
  dom.body.classList.toggle("hide-system-chrome", !state.settings.systemChrome);
  dom.body.classList.toggle("hide-coordinates", !state.settings.coordinates);
  dom.body.classList.toggle("hide-clock", !state.settings.clock);
  dom.root.style.setProperty("--signal-texture-opacity", state.settings.signalOpacity);
  dom.root.style.setProperty("--subdermal-opacity", state.settings.subdermalOpacity);
  dom.video.volume = state.settings.audio.video;
  if (state.audio.gainVideo) state.audio.gainVideo.gain.value = state.settings.audio.video;
  if (state.audio.gainExtract) state.audio.gainExtract.gain.value = state.settings.audio.extract;
  if (state.audio.gainAmbient) state.audio.gainAmbient.gain.value = state.settings.audio.ambient;
  state.audio.ambientGainBase = state.settings.audio.ambient;
}

function buildFinderWindow() {
  const shell = document.createElement("div");
  shell.className = "finder-panel os-window-body";
  const win = createSizedDesktopWindow("finder", shell, "desktop-window-finder");
  requestAnimationFrame(() => updateFinderWindow(win));
  return win;
}

function updateFinderWindow(win = findWindowById("finder")) {
  if (!win) return;
  const shell = win.querySelector(".finder-panel");
  if (!shell) return;
  shell.innerHTML = "";
  const windows = document.createElement("div");
  const rows = [
    ...state.desktopWindows.filter((item) => document.body.contains(item)).map((item) => ({
      label: item.dataset.windowTitle || item.dataset.windowId,
      action: () => bringWindowForward(item),
    })),
  ];
  if (isSearchWindowOpen()) {
    rows.unshift({ label: "search", action: () => openSearchWindow(true) });
  }
  windows.appendChild(finderTitle(`WINDOWS (${rows.length} open)`));
  rows.forEach((row) => windows.appendChild(finderButton(`▶ ${row.label}`, row.action)));

  const objects = document.createElement("div");
  objects.appendChild(finderTitle("DESKTOP OBJECTS"));
  [
    ["📄 NYE_3SEC.MOV", "nye"],
    ["📄 NANXIANG.MOV", "nanxiang"],
    ["📄 BRISBANE_WATER.MOV", "brisbane"],
    ["📄 NO_GPS", "nogps"],
    [`📄 鳄鱼的美食屋.eyu ${isEyuVisible() ? "" : "(hidden)"}`, "eyu"],
    ["📄 README.txt", "readme"],
    ["🗑 trash", "trash"],
  ].forEach(([label, id]) => objects.appendChild(finderButton(label, () => openDesktopObject(id))));

  const system = document.createElement("div");
  system.appendChild(finderTitle("SYSTEM"));
  const clip = state.currentClip || "----";
  system.appendChild(readoutLine("CHAPTER", state.chapter.toUpperCase()));
  system.appendChild(readoutLine("CLIP", clip));
  system.appendChild(readoutLine("UPTIME", sessionDuration()));
  system.appendChild(readoutLine("MEM", "OK"));
  shell.append(windows, objects, system);
}

function finderTitle(text) {
  const node = document.createElement("div");
  node.className = "finder-title";
  node.textContent = text;
  return node;
}

function finderButton(text, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "finder-row";
  button.textContent = text;
  button.addEventListener("click", action);
  return button;
}

function readoutLine(label, value) {
  const node = document.createElement("div");
  node.className = "readout-line";
  node.textContent = `${label.padEnd(9, " ")} ${value}`;
  return node;
}

function isEyuVisible() {
  return !document.querySelector('[data-object="eyu"]')?.classList.contains("is-hidden");
}

function buildNoteWindow() {
  const shell = document.createElement("div");
  shell.className = "note-panel os-window-body";
  const textarea = document.createElement("textarea");
  textarea.spellcheck = false;
  textarea.setAttribute("autocorrect", "off");
  textarea.autocapitalize = "off";
  textarea.autocomplete = "off";
  textarea.value = sessionStorage.getItem("note_content") || "";
  const footer = document.createElement("div");
  footer.className = "note-footer";
  const clear = document.createElement("button");
  clear.type = "button";
  clear.textContent = "[clear]";
  const count = document.createElement("span");
  const update = () => {
    sessionStorage.setItem("note_content", textarea.value);
    count.textContent = `${textarea.value.length} chars`;
  };
  clear.addEventListener("click", () => {
    textarea.value = "";
    update();
    textarea.focus();
  });
  textarea.addEventListener("input", update);
  footer.append(clear, count);
  shell.append(textarea, footer);
  update();
  return createSizedDesktopWindow("note", shell, "desktop-window-note");
}

function buildCalendarWindow() {
  const shell = document.createElement("div");
  shell.className = "calendar-panel os-window-body";
  renderCalendar(shell);
  return createSizedDesktopWindow("calendar", shell, "desktop-window-calendar");
}

function renderCalendar(shell) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const marks = filmingDatesForMonth(year, month);
  shell.appendChild(finderTitle(`${now.toLocaleString("en-US", { month: "short" }).toUpperCase()}  ${year}`));
  const grid = document.createElement("div");
  grid.className = "calendar-grid";
  ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((day) => {
    const node = document.createElement("div");
    node.className = "calendar-weekday";
    node.textContent = day;
    grid.appendChild(node);
  });
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < offset; i += 1) grid.appendChild(document.createElement("div"));
  for (let day = 1; day <= days; day += 1) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-date";
    button.textContent = `${day}${marks[key] ? "·" : ""}`;
    button.classList.toggle("is-today", day === now.getDate());
    if (marks[key]) {
      button.classList.add("is-marked");
      button.addEventListener("mouseenter", () => showCalendarTooltip(button, marks[key]));
      button.addEventListener("focus", () => showCalendarTooltip(button, marks[key]));
    }
    grid.appendChild(button);
  }
  const footer = document.createElement("div");
  footer.className = "calendar-footer";
  footer.textContent = "● filming dates marked";
  shell.append(grid, footer);
}

function filmingDatesForMonth(year, month) {
  return Object.values(state.signal).reduce((map, clip) => {
    if (!clip.local_time) return map;
    const date = clip.local_time.slice(0, 10);
    const clipDate = new Date(`${date}T00:00:00`);
    if (clipDate.getFullYear() !== year || clipDate.getMonth() !== month) return map;
    map[date] = map[date] || [];
    map[date].push(`${clip.filename || clip.clip} / ${clip.location || "—"}`);
    return map;
  }, {});
}

function showCalendarTooltip(target, lines) {
  let tooltip = document.getElementById("calendar-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "calendar-tooltip";
    document.body.appendChild(tooltip);
  }
  tooltip.textContent = lines.join("\n");
  const rect = target.getBoundingClientRect();
  tooltip.style.left = `${Math.min(window.innerWidth - 260, rect.left)}px`;
  tooltip.style.top = `${rect.bottom + 6}px`;
  tooltip.classList.add("is-active");
  clearTimeout(tooltip.dismissTimer);
  tooltip.dismissTimer = setTimeout(() => tooltip.classList.remove("is-active"), 2500);
}

function buildPuzzleWindow() {
  const shell = document.createElement("div");
  shell.className = "puzzle-panel os-window-body";
  const state15 = { tiles: [], moves: 0, solved: false };
  const grid = document.createElement("div");
  grid.className = "puzzle-grid";
  const footer = document.createElement("div");
  footer.className = "puzzle-footer";
  const shuffle = document.createElement("button");
  shuffle.type = "button";
  shuffle.textContent = "[shuffle]";
  const moves = document.createElement("span");
  footer.append(shuffle, moves);
  shell.append(grid, footer);
  const render = () => {
    grid.innerHTML = "";
    state15.tiles.forEach((tile, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "puzzle-tile";
      button.textContent = tile || "";
      if (!tile) button.classList.add("is-empty");
      button.addEventListener("click", () => movePuzzleTile(state15, index, render));
      grid.appendChild(button);
    });
    moves.textContent = state15.solved ? `solved. moves: ${state15.moves}` : `moves ${state15.moves}`;
  };
  shuffle.addEventListener("click", () => {
    shufflePuzzle(state15);
    render();
  });
  shufflePuzzle(state15);
  render();
  return createSizedDesktopWindow("puzzle", shell, "desktop-window-puzzle");
}

function shufflePuzzle(state15) {
  state15.tiles = [...Array.from({ length: 15 }, (_, index) => index + 1), 0];
  state15.moves = 0;
  state15.solved = false;
  for (let i = 0; i < 220; i += 1) {
    const empty = state15.tiles.indexOf(0);
    const choices = adjacentIndexes(empty).filter((idx) => idx >= 0 && idx < 16);
    const next = choices[Math.floor(Math.random() * choices.length)];
    [state15.tiles[empty], state15.tiles[next]] = [state15.tiles[next], state15.tiles[empty]];
  }
}

function adjacentIndexes(index) {
  const row = Math.floor(index / 4);
  const col = index % 4;
  return [
    row > 0 ? index - 4 : -1,
    row < 3 ? index + 4 : -1,
    col > 0 ? index - 1 : -1,
    col < 3 ? index + 1 : -1,
  ];
}

function movePuzzleTile(state15, index, render) {
  if (state15.solved) return;
  const empty = state15.tiles.indexOf(0);
  if (!adjacentIndexes(empty).includes(index)) return;
  [state15.tiles[empty], state15.tiles[index]] = [state15.tiles[index], state15.tiles[empty]];
  state15.moves += 1;
  state15.solved = state15.tiles.every((tile, idx) => tile === (idx === 15 ? 0 : idx + 1));
  render();
}

function buildProfilerWindow() {
  const shell = document.createElement("div");
  shell.className = "profiler-panel os-window-body";
  const win = createSizedDesktopWindow("▣ profiler", shell, "desktop-window-profiler");
  win.systemTimer = setInterval(() => updateProfilerWindow(win), 5000);
  requestAnimationFrame(() => updateProfilerWindow(win));
  return win;
}

function updateProfilerWindow(win = findWindowById("profiler")) {
  if (!win) return;
  const shell = win.querySelector(".profiler-panel");
  if (!shell) return;
  const clipsRead = state.metrics.clipsRead.size;
  const textSeen = state.metrics.textSeen.size;
  const textTotal = Math.max(1, document.querySelectorAll(".text-slot, .boxed-text, .beishang-fragment, #gps-lost-line, .gps-lost-one, .gps-lost-two").length);
  const openCount = state.desktopWindows.filter((item) => document.body.contains(item)).length + (isSearchWindowOpen() ? 1 : 0);
  shell.innerHTML = `
    <div>
      <div class="os-section-title">PROCESS</div>
      <pre>chapters   5
clips     46
locations 47
words   ~3200
objects    6
fragments 12

────────────
STATUS
running</pre>
    </div>
    <div>
      <div class="os-section-title">MONITOR</div>
      <pre>clips read   ${tenBar(clipsRead / 46)}
text seen    ${tenBar(textSeen / textTotal)}
windows open ${tenBar(openCount / 8)}
time spent   ${tenBar(sessionSeconds() / 600)}

───────────────
SESSIONS
visits    1
duration  ${sessionDuration()}
chapter   ${state.chapter.toUpperCase()}
last seen —</pre>
    </div>`;
}

function tenBar(value) {
  const filled = Math.round(Math.max(0, Math.min(1, value)) * 10);
  return `${"█".repeat(filled)}${"░".repeat(10 - filled)}`;
}

function setupTextSeenObserver() {
  const nodes = document.querySelectorAll(".text-slot, .boxed-text, .beishang-fragment, #gps-lost-line, .gps-lost-one, .gps-lost-two");
  state.textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || entry.target.className || entry.target.textContent.slice(0, 20);
      state.metrics.textSeen.add(String(id));
      sessionStorage.setItem("text_seen", JSON.stringify([...state.metrics.textSeen]));
    });
  }, { threshold: 0.1 });
  nodes.forEach((node) => state.textObserver.observe(node));
}

function trackClipReadProgress() {
  const clip = state.currentClip;
  if (!clip) return;
  state.metrics.clipWatch[clip] = Math.max(state.metrics.clipWatch[clip] || 0, dom.video.currentTime || 0);
  if (state.metrics.clipWatch[clip] > 3 && !state.metrics.clipsRead.has(clip)) {
    state.metrics.clipsRead.add(clip);
    sessionStorage.setItem("clips_read", JSON.stringify([...state.metrics.clipsRead]));
    updateProfilerWindow();
  }
}

function buildMazeWindow() {
  const shell = document.createElement("div");
  shell.className = "maze-panel os-window-body";
  const grid = document.createElement("canvas");
  grid.className = "maze-canvas";
  const message = document.createElement("div");
  message.className = "maze-message";
  const footer = document.createElement("div");
  footer.className = "maze-footer";
  shell.append(grid, message, footer);
  const win = createSizedDesktopWindow("maze", shell, "desktop-window-maze");
  win.mazeState = initMazeState();
  win.mazeHandler = (event) => handleMazeKey(event, win);
  win.tabIndex = 0;
  win.addEventListener("keydown", win.mazeHandler);
  win.addEventListener("pointerdown", () => win.focus());
  requestAnimationFrame(() => {
    win.focus();
    renderMaze(win);
  });
  return win;
}

function initMazeState() {
  const levels = [
    {
      name: "LEVEL 1 — LUDLOW ST",
      rows: ["██████████", "█@        █", "█ ██████ █", "█ █    █ █", "█ █ ██ █ █", "█   ██   █", "████████ █", "█       E█", "██████████"],
    },
    {
      name: "LEVEL 2 — ARXAN FOREST",
      rows: ["██████████████", "█@           █", "█ ████████ ██", "█ █        █ ", "██ ████ ████", "█      █   █ ", "█ ████ █ ██ ", "█ █    █   █", "█ █████████ ", "█          E█", "██████████████"],
      signalTile: { x: 7, y: 5 },
    },
    {
      name: "LEVEL 3 — QILIAN PASS",
      rows: ["████████████████", "█@             █", "██ ████████ ███", "█  █        █  ", "█ ██ ██████ █ █", "█ █  █      █ █", "█ █ ██ ████ █ █", "█ █  █  █   █ █", "█ ████ ██ ███ █", "█      █      █", "████████ ██████", "█             E█", "████████████████"],
    },
  ];
  return { levels, level: 0, rows: [...levels[0].rows], steps: 0, complete: false, shrinkRows: 0, message: "" };
}

function handleMazeKey(event, win) {
  const key = event.key.toLowerCase();
  if (win.mazeState.complete) {
    closeDesktopWindow(win);
    return;
  }
  const delta = {
    arrowup: [0, -1], w: [0, -1],
    arrowdown: [0, 1], s: [0, 1],
    arrowleft: [-1, 0], a: [-1, 0],
    arrowright: [1, 0], d: [1, 0],
  }[key];
  if (!delta) return;
  event.preventDefault();
  moveMazePlayer(win, delta);
}

function moveMazePlayer(win, [dx, dy]) {
  const ms = win.mazeState;
  const rows = mazeRows(ms);
  const pos = findMazeChar(rows, "@");
  if (!pos) return;
  const nx = pos.x + dx;
  const ny = pos.y + dy;
  const target = rows[ny]?.[nx];
  if (!target || target === "█") return;
  if (ms.level === 1 && nx === ms.levels[1].signalTile.x && ny === ms.levels[1].signalTile.y) {
    ms.message = "signal lost";
    whiteFlash();
    teleportMazePlayer(rows, pos);
    setTimeout(() => {
      if (document.body.contains(win)) {
        win.mazeState.message = "";
        renderMaze(win);
      }
    }, 2000);
    renderMaze(win, rows);
    return;
  }
  rows[pos.y] = replaceAt(rows[pos.y], pos.x, " ");
  rows[ny] = replaceAt(rows[ny], nx, "@");
  ms.steps += 1;
  if (target === "E") advanceMazeLevel(win);
  else {
    renderMaze(win, maybeShrinkMaze(win, rows));
  }
}

function mazeRows(ms) {
  if (!Array.isArray(ms.rows)) ms.rows = [...ms.levels[ms.level].rows];
  return ms.rows;
}

function renderMaze(win, rows = mazeRows(win.mazeState)) {
  const ms = win.mazeState;
  const grid = win.querySelector(".maze-canvas");
  const footer = win.querySelector(".maze-footer");
  const message = win.querySelector(".maze-message");
  const cell = 24;
  if (ms.complete) {
    const text = "出口在这里。或者说，这里有一个出口。";
    grid.width = 480;
    grid.height = 96;
    const ctx = grid.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, grid.width, grid.height);
    ctx.fillStyle = "#000000";
    ctx.font = "12px IBM Plex Mono, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, grid.width / 2, grid.height / 2);
    footer.textContent = "press any key";
    message.textContent = "";
    return;
  }
  const width = Math.max(...rows.map((row) => row.length));
  grid.width = width * cell;
  grid.height = rows.length * cell;
  const ctx = grid.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, grid.width, grid.height);
  ctx.font = "16px IBM Plex Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  rows.forEach((row, y) => {
    for (let x = 0; x < width; x += 1) {
      const char = row[x] || " ";
      if (char === "█") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x * cell, y * cell, cell, cell);
      } else if (char === "@" || char === "E") {
        ctx.fillStyle = "#000000";
        ctx.fillText(char, x * cell + cell / 2, y * cell + cell / 2);
      }
    }
  });
  win.style.width = `${grid.width + 18}px`;
  win.style.height = `${grid.height + 96}px`;
  message.textContent = ms.message;
  footer.textContent = `${ms.levels[ms.level].name} / steps ${ms.steps}`;
}

function findMazeChar(rows, char) {
  for (let y = 0; y < rows.length; y += 1) {
    const x = rows[y].indexOf(char);
    if (x >= 0) return { x, y };
  }
  return null;
}

function teleportMazePlayer(rows, pos) {
  const choices = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    .map(([dx, dy]) => ({ x: pos.x + dx, y: pos.y + dy }))
    .filter(({ x, y }) => rows[y]?.[x] === " ");
  const next = choices[Math.floor(Math.random() * choices.length)] || pos;
  rows[pos.y] = replaceAt(rows[pos.y], pos.x, " ");
  rows[next.y] = replaceAt(rows[next.y], next.x, "@");
}

function advanceMazeLevel(win) {
  const ms = win.mazeState;
  if (ms.level >= ms.levels.length - 1) {
    ms.complete = true;
  } else {
    ms.level += 1;
    ms.rows = [...ms.levels[ms.level].rows];
    ms.steps = 0;
    ms.shrinkRows = 0;
    ms.message = "";
  }
  renderMaze(win);
}

function maybeShrinkMaze(win, rows) {
  const ms = win.mazeState;
  if (ms.level !== 2 || ms.steps <= 80) return rows;
  const shrink = Math.floor((ms.steps - 81) / 10) + 1;
  if (shrink <= ms.shrinkRows) return rows;
  ms.shrinkRows = shrink;
  const pos = findMazeChar(rows, "@");
  if (pos && pos.y >= rows.length - shrink) {
    ms.steps = 0;
    ms.shrinkRows = 0;
    ms.rows = [...ms.levels[ms.level].rows];
    return ms.rows;
  }
  rows.splice(rows.length - shrink, shrink);
  return rows;
}

function replaceAt(text, index, char) {
  return `${text.slice(0, index)}${char}${text.slice(index + 1)}`;
}

function teardownMazeWindow(win) {
  if (win?.mazeHandler) win.removeEventListener("keydown", win.mazeHandler);
}

function buildNewsWindow() {
  const shell = document.createElement("div");
  shell.className = "news-panel os-window-body";
  const win = createSizedDesktopWindow("news", shell, "desktop-window-news");
  win.newsPage = 1;
  requestAnimationFrame(() => renderNewsWindow(win));
  return win;
}

function renderNewsWindow(win = findWindowById("news")) {
  if (!win) return;
  const shell = win.querySelector(".news-panel");
  if (!shell) return;
  const key = currentNewsKey();
  const content = window.NEWS_CONTENT?.[key] || window.NEWS_CONTENT?.CH00;
  const total = content?.pages || 1;
  win.newsPage = Math.max(1, Math.min(total, win.newsPage || 1));
  const body = content[`body_p${win.newsPage}`] || content.body || "";
  shell.innerHTML = "";
  const issue = sessionStorage.getItem("news_issue") || "0";
  const header = document.createElement("div");
  header.className = "news-header";
  header.innerHTML = `<div class="news-logo">NEWS!!!</div><div class="news-issue">issue ${issue}</div>`;
  const subtitle = document.createElement("div");
  subtitle.className = "news-subtitle";
  subtitle.textContent = content.subtitle;
  const bodyWrap = document.createElement("div");
  bodyWrap.className = "news-body";
  const figure = document.createElement("div");
  figure.className = "news-figure";
  const image = document.createElement("div");
  image.className = "news-figure-image";
  const caption = document.createElement("span");
  caption.textContent = `[${content.fig}]`;
  figure.append(image, caption);
  const article = document.createElement("article");
  article.className = "news-copy";
  article.innerHTML = `<h2>${content.headline}</h2><p>${body}</p>`;
  bodyWrap.append(figure, article);
  const footer = document.createElement("div");
  footer.className = "news-footer";
  const prev = document.createElement("button");
  prev.type = "button";
  prev.textContent = "[←]";
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "[→]";
  prev.addEventListener("click", () => {
    win.newsPage = win.newsPage <= 1 ? total : win.newsPage - 1;
    renderNewsWindow(win);
  });
  next.addEventListener("click", () => {
    win.newsPage = win.newsPage >= total ? 1 : win.newsPage + 1;
    renderNewsWindow(win);
  });
  footer.append(prev, next, Object.assign(document.createElement("span"), { textContent: `page ${win.newsPage} / ${total}` }));
  shell.append(header, subtitle, hrNode(), bodyWrap, footer);
}

function buildMapWindow() {
  const shell = document.createElement("div");
  shell.className = "map-panel os-window-body";
  const canvas = document.createElement("div");
  canvas.className = "map-canvas";
  const footer = document.createElement("div");
  footer.className = "map-footer";
  const zoomOut = document.createElement("button");
  zoomOut.type = "button";
  zoomOut.textContent = "[-]";
  const zoomIn = document.createElement("button");
  zoomIn.type = "button";
  zoomIn.textContent = "[+]";
  const coords = document.createElement("span");
  coords.className = "map-coordinates";
  footer.append(zoomOut, zoomIn, coords);
  shell.append(canvas, footer);
  const win = createSizedDesktopWindow("map", shell, "desktop-window-map");
  win.mapCanvas = canvas;
  win.mapCoords = coords;
  zoomOut.addEventListener("click", () => win.leafletMap?.zoomOut());
  zoomIn.addEventListener("click", () => win.leafletMap?.zoomIn());
  requestAnimationFrame(() => initializeMapWindow(win));
  return win;
}

function initializeMapWindow(win) {
  if (!win?.mapCanvas) return;
  const center = currentMapCenter();
  if (!window.L) {
    win.mapCanvas.textContent = "Leaflet.js unavailable";
    if (win.mapCoords) win.mapCoords.textContent = formatMapCoords(center);
    return;
  }
  const map = L.map(win.mapCanvas, { zoomControl: false }).setView([center.lat, center.lon], center.zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);
  const applyTileFilter = () => {
    win.querySelectorAll(".leaflet-tile").forEach((tile) => {
      tile.style.filter = "grayscale(100%) brightness(0.75) contrast(0.9)";
    });
  };
  map.on("load", applyTileFilter);
  map.on("tileload", applyTileFilter);
  const marker = L.circleMarker([center.lat, center.lon], {
    radius: 4,
    weight: 1,
    color: "#000000",
    fillColor: "#000000",
    fillOpacity: 1,
  }).addTo(map);
  win.leafletMap = map;
  win.mapMarker = marker;
  state.map.instance = map;
  state.map.marker = marker;
  state.map.ready = true;
  updateMapWindow(win, false);
  setTimeout(() => map.invalidateSize(), 80);
}

function updateMapWindow(win = findWindowById("map"), fly = true) {
  if (!win) return;
  const center = currentMapCenter();
  if (win.mapCoords) win.mapCoords.textContent = formatMapCoords(center);
  if (!win.leafletMap || !win.mapMarker) return;
  const latLng = [center.lat, center.lon];
  win.mapMarker.setLatLng(latLng);
  win.mapMarker.setStyle({ color: "#000000", fillColor: "#000000" });
  if (fly) win.leafletMap.flyTo(latLng, center.zoom, { duration: 1.5 });
  else win.leafletMap.setView(latLng, center.zoom);
}

function teardownMapWindow(win) {
  if (win?.leafletMap) win.leafletMap.remove();
  if (state.map.instance === win?.leafletMap) {
    state.map.instance = null;
    state.map.marker = null;
    state.map.ready = false;
  }
}

function currentMapCenter() {
  const key = state.chapter === "int" ? "INT" : state.chapter.toUpperCase();
  return MAP_CENTERS[key] || MAP_CENTERS.CH00;
}

function currentChapterColor() {
  return getComputedStyle(dom.root).getPropertyValue("--chapter-primary").trim() || "#f0f0f0";
}

function formatMapCoords(center) {
  return `${center.lat.toFixed(5)}, ${center.lon.toFixed(5)}`;
}

function currentNewsKey() {
  return state.chapter === "int" ? "INT" : state.chapter.toUpperCase();
}

function hrNode() {
  const node = document.createElement("div");
  node.className = "os-hr";
  node.textContent = "────────────────────────────";
  return node;
}

function incrementNewsIssue() {
  const next = Number(sessionStorage.getItem("news_issue") || "0") + 1;
  sessionStorage.setItem("news_issue", String(next));
}

function sessionSeconds() {
  return Math.floor((performance.now() - state.startedAt) / 1000);
}

function sessionDuration() {
  const seconds = sessionSeconds();
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function buildVideoObjectWindow(title, clipKey, extraHtml, autoCloseMs = null) {
  const clip = state.signal[clipKey];
  const body = [
    `<div class="desktop-crt"><video playsinline preload="metadata" src="${clip.filename}"></video></div>`,
    `<div class="desktop-signal">${extraHtml}</div>`,
  ].join("");
  const win = createDesktopWindow(title, body);
  const video = win.querySelector("video");
  video.volume = state.settings.audio.video;
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
  const body = `<div class="trash-list"></div>`;
  const win = createDesktopWindow(`TRASH - ${TRASH_ITEMS.length} items`, body);
  const list = win.querySelector(".trash-list");
  TRASH_ITEMS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.trashItem = item.id;
    button.textContent = item.filename;
    button.addEventListener("click", () => openTrashItem(item.id));
    list.appendChild(button);
  });
  return win;
}

function openTrashItem(id) {
  const item = TRASH_ITEMS.find((entry) => entry.id === id);
  if (!item) return;
  if (item.statusSequence) {
    openTrashTextWindow(item.filename);
    return;
  }
  closeOldestWindowsForNewOne();
  const shell = document.createElement("pre");
  shell.className = `trash-doc trash-doc-${item.type}`;
  shell.textContent = (item.content || []).join("\n");
  const win = createSizedDesktopWindow(item.filename, shell, item.type === "pdf" ? "desktop-window-pdf" : "");
  mountDesktopWindow(win, {
    id: `trash-${item.id}`,
    kind: "object",
    ...trashItemWindowPosition(item.id),
  });
}

function trashItemWindowPosition(id) {
  return {
    "freedom-wanted": { left: 360, top: 300 },
    "freedom-forbidden": { left: 390, top: 330 },
    "cambridge-as": { left: 420, top: 160 },
    "cambridge-al-forecast": { left: 450, top: 190 },
  }[id] || { left: 360, top: 300 };
}

function buildReadmeWindow() {
  const shell = document.createElement("pre");
  shell.className = "readme-file";
  shell.textContent = "loading README.txt...";
  const win = createSizedDesktopWindow("README.txt", shell, "desktop-window-readme");
  fetch("README.txt")
    .then((response) => response.ok ? response.text() : Promise.reject(new Error(`README ${response.status}`)))
    .then((text) => {
      if (document.body.contains(win)) shell.textContent = text;
    })
    .catch(() => {
      if (document.body.contains(win)) shell.textContent = "README.txt unavailable";
    });
  return win;
}

function buildEyuWindow() {
  const articles = sortedEyuArticles();
  if (!articles.length) return null;

  const shell = document.createElement("div");
  shell.className = "eyu-shell";

  const list = document.createElement("div");
  list.className = "eyu-list";

  const content = document.createElement("div");
  content.className = "eyu-content";

  shell.append(list, content);

  const win = createSizedDesktopWindow("鳄鱼的美食屋.eyu", shell, "desktop-window-eyu");

  articles.forEach((article, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.articleId = article.id;
    button.classList.toggle("is-active", index === 0);
    const date = document.createElement("span");
    date.className = "eyu-list-date";
    date.textContent = eyuListDate(article);
    const title = document.createElement("span");
    title.className = "eyu-list-title";
    title.textContent = eyuListTitle(article);
    button.append(date, title);
    button.addEventListener("click", () => renderEyuArticle(win, article.id));
    list.appendChild(button);
  });

  renderEyuArticle(win, articles[0].id);
  return win;
}

function sortedEyuArticles() {
  const articles = Array.isArray(window.EYU_ARTICLES) ? window.EYU_ARTICLES : [];
  const order = [
    "kaishi_sheying",
    "shicha_diyi_juan",
    "lekai_5112",
    "langshan",
    "dongjing_guangxue",
    "jiyi_bianma",
    "xue_qian_xue_hou",
  ];
  return [...articles].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

function eyuListDate(article) {
  return {
    kaishi_sheying: "Sep 2024",
    shicha_diyi_juan: "Jan 2025",
    lekai_5112: "Oct 2024",
    langshan: "2024",
    dongjing_guangxue: "Jan 2025",
    jiyi_bianma: "Jan 2025",
    xue_qian_xue_hou: "2025",
  }[article.id] || article.date || "";
}

function eyuListTitle(article) {
  return {
    shicha_diyi_juan: "时差里的第一卷",
    dongjing_guangxue: "东京光学 50mm F2，和公园",
    jiyi_bianma: "漆黑的记忆编码",
  }[article.id] || article.title;
}

function renderEyuArticle(win, articleId) {
  const articles = Array.isArray(window.EYU_ARTICLES) ? window.EYU_ARTICLES : [];
  const article = articles.find((entry) => entry.id === articleId) || articles[0];
  if (!article || !win) return;

  const list = win.querySelector(".eyu-list");
  const content = win.querySelector(".eyu-content");
  if (!list || !content) return;

  [...list.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("is-active", button.dataset.articleId === article.id);
  });

  content.innerHTML = "";

  const header = document.createElement("div");
  header.className = "eyu-header";

  const title = document.createElement("div");
  title.className = "eyu-title";
  title.textContent = article.title;

  const meta = document.createElement("div");
  meta.className = "eyu-meta";
  meta.textContent = `${article.date} / reads ${article.reads ?? "—"}`;

  header.append(title, meta);
  content.appendChild(header);

  article.sections.forEach((section) => {
    const unit = document.createElement("div");
    unit.className = "eyu-section";
    renderEyuSection(unit, section);
    content.appendChild(unit);
  });

  const footer = document.createElement("div");
  footer.className = "eyu-footer";
  footer.textContent = `阅读 ${article.reads ?? "—"}  留言 ↓`;
  content.appendChild(footer);

  if (article.comment) {
    const comment = document.createElement("div");
    comment.className = "eyu-comment";
    comment.textContent = `── ${article.comment.author} / ${article.comment.location} / ${article.comment.date}\n${article.comment.content}`;
    content.appendChild(comment);
  }

  content.scrollTop = 0;
}

function renderEyuSection(container, section) {
  if (section.type === "text") {
    container.textContent = section.content;
    return;
  }

  if (section.type === "redact") {
    const block = document.createElement("div");
    block.className = "eyu-redact";
    block.style.height = `${Math.max(1, section.rows || 1) * 18}px`;
    container.appendChild(block);
    return;
  }

  if (section.type === "strike") {
    if (section.before) {
      const before = document.createElement("span");
      before.textContent = section.before;
      container.appendChild(before);
    }

    const struck = document.createElement("span");
    struck.className = "eyu-strike";
    struck.textContent = section.content;
    container.appendChild(struck);

    if (section.after) {
      const after = document.createElement("span");
      after.textContent = section.after;
      container.appendChild(after);
    }

    if (section.strike2) {
      const struck2 = document.createElement("span");
      struck2.className = "eyu-strike";
      struck2.textContent = section.strike2;
      container.appendChild(struck2);
    }
  }
}

function openTrashTextWindow(filename = "还是应该有.txt") {
  closeOldestWindowsForNewOne();
  const win = createDesktopWindow(filename, `<textarea class="trash-empty-file" readonly></textarea><div class="trash-status"></div>`);
  mountDesktopWindow(win, {
    id: "trash-still",
    kind: "object",
    left: 390,
    top: 300,
  });
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
  trackShutdownPhrase(event);
  if (state.shuttingDown) return;
  if (event.key.toLowerCase() === "n" && state.chapter === "ch01") {
    triggerNyeInterrupt();
  }
  if (event.key === "Escape" && dom.interruptStage.classList.contains("is-active")) {
    exitInterrupt();
  }
}

function trackShutdownPhrase(event) {
  if (state.shuttingDown || event.key.length !== 1) return;
  state.shutdownBuffer = `${state.shutdownBuffer}${event.key.toLowerCase()}`.slice(-8);
  if (state.shutdownBuffer === "shutdown") startShutdownSequence();
}

function startShutdownSequence() {
  if (state.shuttingDown) return;
  state.shuttingDown = true;
  state.desktopWindows.slice().forEach((win) => closeDesktopWindow(win));
  openSearchWindow(false);
  dom.video.pause();
  dom.interruptVideo.pause();
  document.querySelectorAll(".desktop-window video").forEach((video) => video.pause());
  fadeAudioToZero(1000);
  dom.shutdownText.textContent = "";
  dom.shutdownSubtext.textContent = "";
  dom.shutdownFinal.textContent = "";
  dom.shutdownScreen.classList.add("is-active");
  dom.shutdownScreen.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    dom.shutdownText.textContent = SHUTDOWN_TEXT;
  }, 2000);
  setTimeout(() => {
    dom.shutdownSubtext.textContent = SHUTDOWN_SUBTEXT;
  }, 3000);
  setTimeout(() => {
    dom.shutdownFinal.textContent = SHUTDOWN_FINAL;
  }, 6000);
}

function fadeAudioToZero(duration) {
  const started = performance.now();
  const videoVolume = dom.video.volume;
  const interruptVolume = dom.interruptVideo.volume;
  const gains = [state.audio.gainVideo, state.audio.gainAmbient, state.audio.gainExtract].filter(Boolean);
  const gainStarts = gains.map((gain) => gain.gain.value);
  const step = (now) => {
    const t = Math.min(1, (now - started) / duration);
    dom.video.volume = videoVolume * (1 - t);
    dom.interruptVideo.volume = interruptVolume * (1 - t);
    gains.forEach((gain, index) => {
      gain.gain.value = gainStarts[index] * (1 - t);
    });
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
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
  sessionStorage.setItem("last_chapter", chapter);
  state.clipIndex = 0;
  state.wasInterrupted = false;

  const spec = CHAPTERS[chapter];
  setPalette(spec);
  updateChrome(spec);
  updateNav(chapter);
  updateDesktopObjectVisibility(chapter);
  updateMapWindow();
  incrementNewsIssue();
  renderNewsWindow();
  updateFinderWindow();
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
  maybeShowOnboardingDialog(chapter);
}

function maybeShowOnboardingDialog(chapter) {
  if (chapter !== "ch01" || sessionStorage.getItem("onboarding_ch01") === "1") return;
  sessionStorage.setItem("onboarding_ch01", "1");
  showSystemDialog("■ in_praise_of_time", [
    "This is an archive.",
    "46 clips. 47 locations.",
    "2024 – 2026.",
    "",
    "Double-click desktop objects to open.",
    "Windows can be moved and resized.",
    "Type \"shutdown\" to end the session.",
  ]);
}

function maybeShowTrashDialog() {
  if (sessionStorage.getItem("trash_onboarding") === "1") return;
  sessionStorage.setItem("trash_onboarding", "1");
  showSystemDialog("■ trash", [
    "5 items.",
    "Some were kept on purpose.",
  ]);
}

function showSystemDialog(title, lines) {
  const existing = document.querySelector(".system-dialog");
  if (existing) existing.remove();
  const dialog = document.createElement("section");
  dialog.className = "system-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.innerHTML = [
    `<div class="system-dialog-title">${title}</div>`,
    `<div class="system-dialog-body"><pre></pre><button type="button">[ OK ]</button></div>`,
  ].join("");
  dialog.querySelector("pre").textContent = `\n${lines.join("\n")}\n`;
  dialog.querySelector("button").addEventListener("click", () => dialog.remove());
  document.body.appendChild(dialog);
  dialog.querySelector("button").focus();
}

function updateDesktopObjectVisibility(chapter) {
  const eyuIcon = dom.objectLayer?.querySelector('[data-object="eyu"]');
  if (!eyuIcon) return;
  eyuIcon.classList.toggle("is-hidden", !(chapter === "ch01" || chapter === "ch04"));
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
  dom.video.volume = state.settings.audio.video;
  dom.video.src = clip.filename;
  dom.video.load();
  dom.video.play().catch(() => {});

  const glitch = clip.glitch_weight || 0;
  dom.crtFrame.style.setProperty("--glitch-shift", `${1 + glitch * 5}px`);
  dom.crtFrame.style.setProperty("--glitch-cycle", `${Math.max(1.8, 8 - glitch * 5.8)}s`);

  updateMonitor(clip);
  updateRouteCurrent();
  updateAmbientGain(clip);
  handleGpsLost(clipKey);
  updateFinderWindow();
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
  if (state.chapter === "int") return;
  const ch04Spec = CHAPTERS.ch04;
  const fromCh04 = state.chapter === "ch04" && ch04Spec.clips.includes(state.currentClip);
  state.interruptReturn = {
    chapter: "ch04",
    clip: fromCh04 ? state.currentClip : ch04Spec.clips[0],
    clipIndex: fromCh04 ? state.clipIndex : 0,
    time: fromCh04 ? dom.video.currentTime || 0 : 0,
  };
  state.previousChapter = state.interruptReturn.chapter;
  state.chapter = "int";
  sessionStorage.setItem("last_chapter", "ch04");
  const clip = state.signal.IMG_8863;
  setPalette(CHAPTERS.int);
  updateMapWindow();
  incrementNewsIssue();
  renderNewsWindow();
  updateFinderWindow();
  dom.body.classList.add("is-interrupt");
  dom.interruptStage.classList.add("is-active");
  dom.video.pause();
  dom.interruptVideo.volume = state.settings.audio.video;
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
  const restore = state.interruptReturn || { chapter: "ch04" };
  hardCut(() => {
    activateChapter(restore.chapter || "ch04");
    if (restore.clip && state.signal[restore.clip]) {
      const spec = CHAPTERS[restore.chapter || "ch04"];
      state.clipIndex = Math.max(0, spec.clips.indexOf(restore.clip));
      if (restore.time) {
        const seek = () => {
          dom.video.currentTime = Math.min(restore.time, Math.max(0, (dom.video.duration || restore.time) - 0.2));
          dom.video.play().catch(() => {});
          dom.video.removeEventListener("loadedmetadata", seek);
        };
        dom.video.addEventListener("loadedmetadata", seek);
      }
      setClip(restore.clip);
    }
  });
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

function hexToRgba() {
  return "#000000";
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
    state.audio.gainVideo.gain.value = state.settings.audio.video;
    state.audio.gainExtract.gain.value = state.settings.audio.extract;
    state.audio.gainAmbient.gain.value = state.settings.audio.ambient;
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

/* GAZETTEER.db ------------------------------------------------------------ */
(function setupGazetteerDb() {
  const db = {
    env: null,
    manifest: {},
    entries: [],
    lookup: [],
    selectedKey: null,
    query: "",
    chapterFilter: "ALL",
    unverifiedOnly: false,
    tooltipTimer: null,
    z: 58,
  };

  function bootGazetteer() {
    // Replaced by the simpler environment search window.
  }

  function insertDbButton() {
    const nav = document.querySelector(".chapter-nav");
    if (!nav || document.getElementById("gazetteer-db-button")) return;
    const button = document.createElement("button");
    button.id = "gazetteer-db-button";
    button.type = "button";
    button.className = "gazetteer-nav-button";
    button.textContent = "[DB]";
    button.setAttribute("aria-label", "Open GAZETTEER.db");
    button.addEventListener("click", toggleGazetteerWindow);
    nav.appendChild(button);
  }

  function createGazetteerWindow() {
    if (document.getElementById("gazetteer-window")) return;
    const root = document.createElement("section");
    root.id = "gazetteer-window";
    root.setAttribute("aria-label", "GAZETTEER.db window");
    root.innerHTML = `
      <div class="gazetteer-frame">
        <pre class="gazetteer-ascii">+------------------------------------------------------------------+</pre>
        <div class="gazetteer-titlebar">
          <span>GAZETTEER.db</span>
          <button class="gazetteer-close" type="button" aria-label="Close GAZETTEER.db">[x]</button>
        </div>
        <div class="gazetteer-body">
          <aside class="gazetteer-left">
            <label class="gazetteer-search-row"><span>&gt;</span><input id="gazetteer-search" autocomplete="off" spellcheck="false" aria-label="Search gazetteer"></label>
            <div class="gazetteer-results" id="gazetteer-results" aria-label="Gazetteer results"></div>
            <div class="gazetteer-browse">
              <label for="gazetteer-chapter-filter">BROWSE BY [CHAPTER v]</label>
              <select id="gazetteer-chapter-filter" aria-label="Browse by chapter"></select>
            </div>
            <button class="gazetteer-unverified" id="gazetteer-unverified" type="button">UNVERIFIED 0</button>
          </aside>
          <article class="gazetteer-right" id="gazetteer-detail" aria-label="Gazetteer entry detail">
            <div class="gazetteer-entry-header">LOADING LOCAL DATA</div>
            <div class="gazetteer-row-value">signal_data/environment.json<br>signal_data/MANIFEST.json</div>
          </article>
        </div>
        <pre class="gazetteer-footer-ascii">+------------------------------------------------------------------+</pre>
      </div>`;

    document.body.appendChild(root);
    makeGazetteerDraggable(root, root.querySelector(".gazetteer-titlebar"));
    root.querySelector(".gazetteer-close").addEventListener("click", closeGazetteerWindow);
    root.querySelector("#gazetteer-search").addEventListener("input", (event) => {
      db.query = event.target.value.trim();
      db.unverifiedOnly = false;
      updateUnverifiedButton();
      renderGazetteerResults();
    });
    root.querySelector("#gazetteer-chapter-filter").addEventListener("change", (event) => {
      db.chapterFilter = event.target.value;
      db.unverifiedOnly = false;
      updateUnverifiedButton();
      renderGazetteerResults();
    });
    root.querySelector("#gazetteer-unverified").addEventListener("click", () => {
      db.unverifiedOnly = !db.unverifiedOnly;
      updateUnverifiedButton();
      renderGazetteerResults();
    });
  }

  function createGazetteerTooltip() {
    if (document.getElementById("gazetteer-tooltip")) return;
    const tooltip = document.createElement("div");
    tooltip.id = "gazetteer-tooltip";
    tooltip.setAttribute("role", "tooltip");
    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", (event) => {
      const term = event.target.closest?.(".gazetteer-term");
      if (!term) return;
      const entry = db.entries.find((item) => item.key === term.dataset.gazetteerKey);
      if (entry) showGazetteerTooltip(entry, term);
    });
  }

  async function loadGazetteerData() {
    try {
      const [env, manifest] = await Promise.all([
        fetch("signal_data/environment.json").then((response) => response.json()),
        fetch("signal_data/MANIFEST.json").then((response) => response.json()),
      ]);
      db.env = env;
      db.manifest = normalizeManifest(manifest);
      if (typeof state !== "undefined" && state.signal && Object.keys(state.signal).length) {
        db.manifest = { ...db.manifest, ...state.signal };
      }
      window.ENV = env;
      window.SIGNAL = { ...(window.SIGNAL || {}), ...db.manifest };
      db.entries = flattenEnvironment(env);
      db.lookup = buildGazetteerLookup(db.entries);
      populateChapterFilter();
      renderGazetteerResults();
      enhanceNarrativeLocationTerms();
    } catch (error) {
      const detail = document.getElementById("gazetteer-detail");
      if (detail) {
        detail.innerHTML = "";
        detail.appendChild(headerNode("GAZETTEER LOAD ERROR"));
        detail.appendChild(valueNode(String(error.message || error)));
      }
    }
  }

  function normalizeManifest(raw) {
    const normalized = {};
    if (Array.isArray(raw)) {
      raw.forEach((clip) => {
        const key = clip.clip || clip.filename?.replace(/\.[^.]+$/, "");
        if (key) normalized[key] = { ...clip, clip: key };
      });
      return normalized;
    }
    Object.entries(raw || {}).forEach(([key, clip]) => {
      if (!clip || typeof clip !== "object") return;
      const clipKey = clip.clip || key;
      normalized[clipKey] = { ...clip, clip: clipKey };
    });
    return normalized;
  }

  function flattenEnvironment(env) {
    const sparseKeys = new Set((env.sparse_or_unverifiable_after_deep_search || []).map((item) => item.key || item));
    return Object.keys(env)
      .filter((group) => group.startsWith("GROUP_"))
      .flatMap((group) => Object.entries(env[group] || {}).map(([key, raw]) => {
        const sparse = sparseKeys.has(key) || textHasSparseStatus(raw);
        const chineseNames = collectChineseStrings(raw).slice(0, 8);
        const searchBlob = [key, key.replaceAll("_", " "), raw.full_name, raw.narrative_note, ...chineseNames]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return {
          key,
          group,
          raw,
          sparse,
          chineseNames,
          chapter: raw.chapter_relevance || "—",
          searchBlob,
        };
      }));
  }

  function textHasSparseStatus(value) {
    return JSON.stringify(value || {}).toLowerCase().includes("sparse") || JSON.stringify(value || {}).toLowerCase().includes("unverified");
  }

  function collectChineseStrings(value, result = []) {
    if (!value || result.length > 24) return result;
    if (typeof value === "string") {
      const matches = value.match(/[\u3400-\u9fff][\u3400-\u9fff\u3000-\u303f，。、：；（）《》「」“”\w\s-]{1,28}/g);
      if (matches) matches.forEach((item) => result.push(item.trim()));
      return result;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => collectChineseStrings(item, result));
      return result;
    }
    if (typeof value === "object") {
      Object.values(value).forEach((item) => collectChineseStrings(item, result));
    }
    return [...new Set(result.filter(Boolean))];
  }

  function buildGazetteerLookup(entries) {
    const stop = new Set(["city", "county", "province", "area", "road", "street", "china", "australia", "new york", "urban", "mountain"]);
    const seen = new Set();
    const terms = [];
    entries.forEach((entry) => {
      const raw = entry.raw;
      const candidates = [
        entry.key,
        entry.key.replace(/IMG_\d{4}_?/g, "").replaceAll("_", " "),
        raw.full_name,
        ...(raw.full_name ? raw.full_name.split(",") : []),
        ...entry.chineseNames,
      ];
      candidates.forEach((candidate) => {
        const term = String(candidate || "").trim().replace(/\s+/g, " ");
        if (term.length < 2) return;
        if (/^IMG_\d{4}$/.test(term)) return;
        if (stop.has(term.toLowerCase())) return;
        const id = term.toLowerCase();
        if (seen.has(id)) return;
        seen.add(id);
        terms.push({ term, key: entry.key, isChinese: /[\u3400-\u9fff]/.test(term) });
      });
    });
    return terms.sort((a, b) => b.term.length - a.term.length).slice(0, 600);
  }

  function populateChapterFilter() {
    const select = document.getElementById("gazetteer-chapter-filter");
    if (!select) return;
    const counts = db.entries.reduce((map, entry) => {
      map.set(entry.chapter, (map.get(entry.chapter) || 0) + 1);
      return map;
    }, new Map());
    select.innerHTML = "";
    select.appendChild(optionNode("ALL", `ALL (${db.entries.length})`));
    ["CH01", "CH02", "CH03", "CH04", "INT", "EYU", "BEISHANG"].forEach((chapter) => {
      if (counts.has(chapter)) select.appendChild(optionNode(chapter, `${chapter} (${counts.get(chapter)})`));
    });
  }

  function optionNode(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }

  function renderGazetteerResults() {
    const results = document.getElementById("gazetteer-results");
    if (!results) return;
    const matches = filteredEntries();
    results.innerHTML = "";
    matches.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `gazetteer-result ${entry.key === db.selectedKey ? "is-selected" : ""}`;
      button.dataset.key = entry.key;
      const sparse = entry.sparse ? `<span class="gazetteer-sparse-dot">●</span>` : "";
      button.innerHTML = `${sparse}${escapeHtml(displayName(entry))}<span class="gazetteer-result-key">${escapeHtml(entry.key)}</span>`;
      button.addEventListener("click", () => selectGazetteerEntry(entry.key));
      results.appendChild(button);
    });

    if (!matches.length) {
      results.appendChild(valueNode("NO MATCH"));
      renderGazetteerDetail(null);
      return;
    }
    if (!db.selectedKey || !matches.some((entry) => entry.key === db.selectedKey)) {
      db.selectedKey = matches[0].key;
    }
    renderGazetteerDetail(db.entries.find((entry) => entry.key === db.selectedKey));
    updateUnverifiedButton();
  }

  function filteredEntries() {
    const query = db.query.toLowerCase();
    return db.entries.filter((entry) => {
      if (db.unverifiedOnly && !entry.sparse) return false;
      if (db.chapterFilter !== "ALL" && entry.chapter !== db.chapterFilter) return false;
      if (query && !entry.searchBlob.includes(query)) return false;
      return true;
    });
  }

  function updateUnverifiedButton() {
    const button = document.getElementById("gazetteer-unverified");
    if (!button) return;
    const count = db.entries.filter((entry) => entry.sparse).length;
    button.textContent = `UNVERIFIED ${count}`;
    button.classList.toggle("is-active", db.unverifiedOnly);
  }

  function selectGazetteerEntry(key) {
    db.selectedKey = key;
    renderGazetteerResults();
  }

  function renderGazetteerDetail(entry) {
    const detail = document.getElementById("gazetteer-detail");
    if (!detail) return;
    detail.innerHTML = "";
    if (!entry) {
      detail.appendChild(headerNode("NO ENTRY"));
      return;
    }

    const raw = entry.raw;
    detail.appendChild(headerNode(`${entry.key.toUpperCase()}${entry.chineseNames[0] ? ` / ${entry.chineseNames[0]}` : ""}`));
    if (entry.sparse) detail.appendChild(bannerNode("DATA SPARSE — unverified"));

    const coords = extractCoordinates(raw);
    const altitude = extractAltitude(raw);
    detail.appendChild(fieldRows([
      ["COORDINATES", coords || "—"],
      ["ALTITUDE", altitude || "—"],
      ["TERRAIN", raw.terrain || raw.terrain_detail || "—"],
      ["CHAPTER", entry.chapter || "—"],
    ]));

    detail.appendChild(sectionTitle("CLIPS"));
    renderClipSection(detail, entry);
    detail.appendChild(sectionTitle("SIGNAL"));
    renderSignalSection(detail, entry);
    detail.appendChild(sectionTitle("ENVIRONMENT"));
    renderEnvironmentSection(detail, entry);
    detail.appendChild(sectionTitle("NOTE"));
    const note = document.createElement("div");
    note.className = "gazetteer-note";
    note.textContent = raw.narrative_note || "—";
    detail.appendChild(note);
  }

  function renderClipSection(detail, entry) {
    const clips = findClipsForEntry(entry);
    if (!clips.length) {
      detail.appendChild(valueNode("—"));
      return;
    }
    const list = document.createElement("div");
    list.className = "gazetteer-clip-list";
    clips.forEach((clip) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gazetteer-clip-button";
      const local = clip.local_time_short || clip.local_time?.slice(11, 16) || "--:--";
      const duration = clip.duration_human || (Number.isFinite(clip.duration_sec) ? `${Math.round(clip.duration_sec)}s` : "--");
      button.textContent = `${clip.clip || clip.filename} | ${local} | ${duration}`;
      button.addEventListener("click", () => jumpToClip(clip.clip));
      list.appendChild(button);
    });
    detail.appendChild(list);
  }

  function renderSignalSection(detail, entry) {
    const clips = findClipsForEntry(entry);
    if (!clips.length) {
      detail.appendChild(valueNode("—"));
      return;
    }
    detail.appendChild(fieldRows([
      ["GLITCH", range(clips.map((clip) => clip.glitch_weight))],
      ["LUMINANCE", range(clips.map((clip) => clip.rgb?.luminance_mean))],
      ["MOTION", range(clips.map((clip) => clip.rgb?.motion_score))],
    ]));
  }

  function renderEnvironmentSection(detail, entry) {
    const skip = new Set(["clips", "full_name", "coordinates_verified", "altitude_verified", "terrain", "terrain_detail", "chapter_relevance", "narrative_note"]);
    const fields = Object.entries(entry.raw).filter(([key]) => !skip.has(key));
    if (!fields.length) {
      detail.appendChild(valueNode("—"));
      return;
    }
    fields.forEach(([key, value]) => {
      const row = document.createElement("div");
      row.className = "gazetteer-row";
      const label = document.createElement("div");
      label.className = "gazetteer-row-label";
      label.textContent = key.replaceAll("_", " ").toUpperCase();
      const body = document.createElement("div");
      body.className = "gazetteer-env-value";
      body.textContent = formatValue(value);
      row.append(label, body);
      detail.appendChild(row);
    });
  }

  function findClipsForEntry(entry) {
    const raw = entry.raw;
    const explicit = new Set([...(raw.clips || []), ...(entry.key.match(/IMG_\d{4}/g) || [])]);
    const clips = Object.values(db.manifest).filter((clip) => explicit.has(clip.clip));
    if (clips.length) return clips.sort(compareClipsByTime);

    const name = String(raw.full_name || entry.key).toLowerCase();
    return Object.values(db.manifest)
      .filter((clip) => {
        const place = String(clip.location || clip.place || "").toLowerCase();
        return place && (name.includes(place) || place.includes(firstPlaceToken(name)));
      })
      .sort(compareClipsByTime);
  }

  function firstPlaceToken(name) {
    return name.split(/[,/]/)[0].replace(/\b(city|county|province|area|district)\b/g, "").trim();
  }

  function compareClipsByTime(a, b) {
    return String(a.local_time || a.creation_time || "").localeCompare(String(b.local_time || b.creation_time || ""));
  }

  function jumpToClip(clipKey) {
    if (!clipKey || typeof CHAPTERS === "undefined") return;
    const chapter = Object.entries(CHAPTERS).find(([, spec]) => spec.clips?.includes(clipKey))?.[0];
    if (!chapter) return;
    if (chapter === "int") {
      enterInterrupt();
      return;
    }
    activateChapter(chapter);
    requestAnimationFrame(() => {
      const spec = CHAPTERS[chapter];
      state.clipIndex = Math.max(0, spec.clips.indexOf(clipKey));
      setClip(clipKey);
    });
  }

  function extractCoordinates(raw) {
    const source = raw.coordinates_verified?.manifest || raw.coordinates_verified?.requested || raw.coordinates || raw;
    const lat = Number(source.lat ?? source.latitude);
    const lon = Number(source.lon ?? source.lng ?? source.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "";
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  }

  function extractAltitude(raw) {
    const altitude = raw.altitude_verified;
    if (typeof altitude === "number") return `${Math.round(altitude)}m`;
    if (altitude && typeof altitude === "object") {
      const meters = altitude.meters ?? altitude.manifest_meters ?? altitude.altitude_m;
      if (Number.isFinite(Number(meters))) return `${Math.round(Number(meters))}m`;
      if (altitude.status) return altitude.status;
    }
    return "";
  }

  function range(values) {
    const nums = values.map(Number).filter(Number.isFinite);
    if (!nums.length) return "—";
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? min.toFixed(3) : `${min.toFixed(3)} - ${max.toFixed(3)}`;
  }

  function formatValue(value) {
    if (value === null || typeof value === "undefined" || value === "") return "—";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value) && value.every((item) => typeof item === "string" || typeof item === "number")) return value.join("\n");
    return JSON.stringify(value, null, 2);
  }

  function displayName(entry) {
    return entry.raw.full_name || entry.key.replaceAll("_", " ");
  }

  function headerNode(text) {
    const node = document.createElement("div");
    node.className = "gazetteer-entry-header";
    node.textContent = text;
    return node;
  }

  function valueNode(text) {
    const node = document.createElement("div");
    node.className = "gazetteer-row-value";
    node.textContent = text;
    return node;
  }

  function bannerNode(text) {
    const node = document.createElement("div");
    node.className = "gazetteer-sparse-banner";
    node.textContent = text;
    return node;
  }

  function sectionTitle(text) {
    const node = document.createElement("div");
    node.className = "gazetteer-section-title";
    node.textContent = `────── ${text}`;
    return node;
  }

  function fieldRows(rows) {
    const fragment = document.createDocumentFragment();
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "gazetteer-row";
      const left = document.createElement("div");
      left.className = "gazetteer-row-label";
      left.textContent = label;
      const right = document.createElement("div");
      right.className = "gazetteer-row-value";
      right.textContent = value || "—";
      row.append(left, right);
      fragment.appendChild(row);
    });
    return fragment;
  }

  function toggleGazetteerWindow() {
    const root = document.getElementById("gazetteer-window");
    if (!root) return;
    root.classList.toggle("is-open");
    document.getElementById("gazetteer-db-button")?.classList.toggle("is-open", root.classList.contains("is-open"));
    if (root.classList.contains("is-open")) {
      root.style.zIndex = String(++db.z);
      renderGazetteerResults();
    }
  }

  function closeGazetteerWindow() {
    document.getElementById("gazetteer-window")?.classList.remove("is-open");
    document.getElementById("gazetteer-db-button")?.classList.remove("is-open");
  }

  function makeGazetteerDraggable(root, handle) {
    if (!root || !handle) return;
    let drag = null;
    handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      drag = {
        x: event.clientX,
        y: event.clientY,
        left: root.offsetLeft,
        top: root.offsetTop,
      };
      root.style.zIndex = String(++db.z);
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", (event) => {
      if (!drag) return;
      root.style.left = `${Math.max(0, Math.min(window.innerWidth - 80, drag.left + event.clientX - drag.x))}px`;
      root.style.top = `${Math.max(0, Math.min(window.innerHeight - 48, drag.top + event.clientY - drag.y))}px`;
    });
    handle.addEventListener("pointerup", () => { drag = null; });
    handle.addEventListener("pointercancel", () => { drag = null; });
  }

  function enhanceNarrativeLocationTerms() {
    if (!db.lookup.length) return;
    const containers = document.querySelectorAll("#narrative-layer, .beishang-fragment, #gps-lost-line, .gps-lost-beishang, .interrupt-stage");
    containers.forEach((container) => wrapTextNodes(container));
  }

  function wrapTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest(".gazetteer-term, #gazetteer-window, #gazetteer-tooltip")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(wrapNodeTerms);
  }

  function wrapNodeTerms(node) {
    const text = node.nodeValue;
    const matches = findTermMatches(text);
    if (!matches.length) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    matches.forEach((match) => {
      if (match.start > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, match.start)));
      const span = document.createElement("span");
      span.className = "gazetteer-term";
      span.dataset.gazetteerKey = match.key;
      span.textContent = text.slice(match.start, match.end);
      fragment.appendChild(span);
      cursor = match.end;
    });
    if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)));
    node.parentNode.replaceChild(fragment, node);
  }

  function findTermMatches(text) {
    const lower = text.toLowerCase();
    const matches = [];
    db.lookup.forEach(({ term, key }) => {
      const needle = term.toLowerCase();
      if (needle.length < 2) return;
      let index = lower.indexOf(needle);
      while (index !== -1) {
        matches.push({ start: index, end: index + needle.length, key });
        index = lower.indexOf(needle, index + needle.length);
      }
    });
    matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
    const accepted = [];
    let lastEnd = -1;
    matches.forEach((match) => {
      if (match.start >= lastEnd) {
        accepted.push(match);
        lastEnd = match.end;
      }
    });
    return accepted;
  }

  function showGazetteerTooltip(entry, target) {
    const tooltip = document.getElementById("gazetteer-tooltip");
    if (!tooltip) return;
    clearTimeout(db.tooltipTimer);
    tooltip.innerHTML = "";
    const coords = document.createElement("div");
    coords.className = "gazetteer-tooltip-coords";
    coords.textContent = extractCoordinates(entry.raw) || "COORDINATES —";
    const note = document.createElement("div");
    note.className = "gazetteer-tooltip-note";
    note.textContent = entry.raw.narrative_note || "—";
    tooltip.append(coords, note);

    const rect = target.getBoundingClientRect();
    tooltip.style.left = `${Math.min(window.innerWidth - 256, Math.max(12, rect.left))}px`;
    tooltip.style.top = `${Math.min(window.innerHeight - 130, Math.max(12, rect.bottom + 8))}px`;
    tooltip.classList.add("is-active");
    db.tooltipTimer = setTimeout(() => tooltip.classList.remove("is-active"), 3000);
  }

  function wrapChapterActivationForGazetteer() {
    if (typeof activateChapter !== "function" || activateChapter.gazetteerWrapped) return;
    const originalActivateChapter = activateChapter;
    activateChapter = function gazetteerAwareActivateChapter(chapter) {
      const result = originalActivateChapter.apply(this, arguments);
      setTimeout(() => {
        renderGazetteerResults();
        enhanceNarrativeLocationTerms();
      }, 0);
      return result;
    };
    activateChapter.gazetteerWrapped = true;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootGazetteer, { once: true });
  } else {
    bootGazetteer();
  }
})();
