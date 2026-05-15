const MANIFEST_URL = "signal_data/MANIFEST.json";

const CHAPTERS = {
  ch00: {
    code: "CHAPTER 00",
    label: "LOCATING...",
    primary: "#FFE66D",
    secondary: "#1A1208",
    coordinates: "40.7194, -73.9896",
    clips: [],
  },
  ch01: {
    code: "CHAPTER 01",
    label: "THE SAME WINDOW",
    primary: "#FF2D8D",
    secondary: "#FFE9B0",
    coordinates: "40.7194, -73.9896",
    clips: ["IMG_1401", "IMG_1410", "IMG_2140", "IMG_2361", "IMG_4700", "IMG_1448", "IMG_1565", "IMG_1627"],
    interruptAfter: "IMG_4700",
  },
  ch02: {
    code: "CHAPTER 02",
    label: "NO SIGNAL",
    primary: "#FFCF21",
    secondary: "#0a0a0a",
    coordinates: "NO GPS / SUSPENDED",
    clips: ["IMG_7948", "IMG_8033", "IMG_8084", "IMG_8191", "IMG_8220", "IMG_8224", "IMG_8284", "IMG_8300", "IMG_8722", "IMG_0196"],
  },
  ch03: {
    code: "CHAPTER 03",
    label: "ASCENT",
    primary: "#45D7D0",
    secondary: "#323232",
    tertiary: "#888888",
    coordinates: "37.3300, 101.4005",
    clips: ["IMG_3484", "IMG_3549", "IMG_3551", "IMG_3567", "IMG_3612", "IMG_3618", "IMG_3682", "IMG_3727", "IMG_3773", "IMG_3798", "IMG_3810", "IMG_3840", "IMG_3940"],
  },
  ch04: {
    code: "CHAPTER 04",
    label: "BRISBANE",
    primary: "#F39A13",
    secondary: "#1A1208",
    coordinates: "-27.4431, 153.0639",
    clips: ["IMG_5523", "IMG_5521", "IMG_5671", "IMG_6010", "IMG_3483"],
  },
  int: {
    code: "INT",
    label: "MT. TAI",
    primary: "#4D4DFF",
    secondary: "#FFFFFF",
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

const DATE_OVERRIDES = {
  IMG_6010: "2025-09-05T06:26:16+1000",
};

const NARRATIVE_TEXTS = {
  ch01: [
    "September. 不准开冷气了。\n窗缝里进来的风比预期少。\n我把冬天从被子里拉起来，像从旧相机里倒出一卷没有冲洗的胶片。",
    "40.7194° N / floor 18。\n楼下有人在尖叫，也可能只是在庆祝。\n隔着玻璃，声音失去语义，只剩下一种证明城市还活着的震动。",
    "不确定这是痛苦，或者也是。\n04:23，桌上有耳机、纸、相机和一杯融化的冰拿铁。\n房间像临时搭建的暗房，所有东西都等待显影。",
    "I pull up winter from bed.\nThe air conditioner walks beyond quilts.\n同一个窗口被反复拍摄，直到它不再像窗口，而像一个沉默的证人。",
    "Dec 31. 22:14。\n什么都没有发生。\n可是纽约的光在玻璃上聚集，像一张过曝的底片，替我把没有仪式的晚上保存下来。",
    "很多事情只在夜里才真实。\n地铁口、便利店、修缮中的钟楼、被闪光灯照亮的圣像。\n我低头走路，好像脖子上挂着的不是相机，而是一条回程路线。",
    "平安夜。我不知道为什么要待在这个城市。\n但我留了下来。\n窗外的灯不是给我的，我还是看着，像看一艘没刷油漆的木船停在夕阳里。",
    "IMG_1401 / 18th floor, Manhattan。\n冷风从窗缝进来。\n没有垃圾桶，只有一个很大的垃圾袋，脏衣服、书包、甜甜圈盒子一起组成临时生活。",
    "一个人过年，没有仪式。\n时间照常流动。\n相机自动完成对焦、测光、闪光，而我只负责在无声中按下快门。",
  ],
  ch02: [
    "大庆。齐齐哈尔。阿尔山。\n然后信号消えた。\n油田、平原、牛和低矮的夏天，按顺序从窗口外面退后。",
    "On a prairie of green and cattle,\nto be left behind might be death.\n绿色太多，没有边界，连恐惧也变得很平。",
    "在如此长时间的段落中，\n我写过许多东西，但无法与人分享。\n它们像被涂黑的照片，占据版面，却拒绝解释自己。",
    "北上。\n车厢里没有戏剧，只有路越来越直，城市名字越来越稀薄。\n地图给出边界，草原不承认。",
    "草原不欢迎你，但也不拒绝。\n这让人更难受。\n像一个没有回声的房间，所有提问都被绿色吸收。",
    "距离最近的城市 230 公里。\n信号格数：0。\n牛在路上，司机不按喇叭，时间在这里没有单位。",
    "内蒙古，七月，风是黄色的。\n我开始理解为什么有些照片只能存在为缺席：拍下它，反而会让它变小。",
    "Arxan border.\nThe train goes no further.\n下车的地方叫做终点，可路并没有结束，只是不再替人命名。",
    "45.7° N。\n草原的边界只存在于地图里。\n在屏幕上它是一条线，在身体里它是一阵持续很久的沉默。",
  ],
  ch03: [
    "银行给了我工资。\n我用它买了一张去西边的票。\n这是很普通的交换：劳动变成车票，车票变成海拔，海拔又变成身体里的重量。",
    "有路线。有地图。\n我就往那里走。\n这不是没有选择，而是选择被画成一条线以后，人会忍不住相信它。",
    "空気が薄い，但很好呼吸。\n被人需要，是一种重量。\n期待は重さがある，重さは証明だ。",
    "3752m。\n这是我待过的最高的地方。\n空气少了三分之一，声音也少了一部分，连自己的名字都变轻了。",
    "在高处，声音变得很轻。\n自己的声音也是。\n我想起那些没有染上多余颜色的物件，石头、票根、经年不换的位置。",
    "走了八个小时的山路。\n到了之后发现没什么可看的。\n有时候旅程的意义不是抵达，而是承认身体确实把时间搬运到了这里。",
    "门源。张掖。祁连。\n这些名字比地方本身更好看。\n它们像旧系统里的文件夹图标，打开以后只有风、光和继续上升的路。",
    "翻越一座山需要的时间比想象中少。\n可从山上下来以后，那条路会留在身体里很久，像一段无法关闭的后台进程。",
    "青海的星星不是浪漫。\n是一种压力。\n它们太亮，太确定，像在要求我给这趟旅行一个配得上的理由。",
  ],
  ch04: [
    "船。一个半小时。\n什么都做不了。\n这反而像一种被批准的空白：河水替我移动，时间替我保持沉默。",
    "太阳让人感到不安。\n不是热，是它的存在方式。\n它从正上方落下来，太明亮，太直接，不给记忆留下阴影。",
    "Diese Stadt ist nicht schlecht.\n「悪い」でもない。\n这个地方让人不放松，像一张曝光正确但情绪错误的照片。",
    "当你终于获得了看清世界的眼睛，\n也许，又开始想念那些厚重的镜片。\n模糊不是失败，它曾经替我保留过余地。",
    "Brisbane River，水是棕色的。\n阳光从正上方打下来。\n南半球的夏天没有我熟悉的季节感，一切都像被重新命名。",
    "渡轮靠岸。没有人等我。\n这是我要的。\n可是人真的得到想要的东西时，常常先感到轻微的不适。",
    "City Cat, 07:22。\n乘客们不看窗外。\n我看得太久，像在等这座城市露出一个可以被我误解的表情。",
    "-27.443° S。\n这是我去过最南的地方。\n不知道为什么要记录这件事，但记录本身正在变成理由。",
    "读了三遍那本书，在不同的城市。\n每次读到的都不一样。\n也许变化的不是书，而是我每次都把另一个自己带到了页面前。",
  ],
};

const MAP_CENTERS = {
  CH00: { lat: 40.7194, lon: -73.9896, zoom: 15, city: "New York" },
  CH01: { lat: 40.7194, lon: -73.9896, zoom: 15, city: "New York" },
  CH02: { lat: 48.9213, lon: 117.1130, zoom: 9, city: "Arxan" },
  CH03: { lat: 37.3784, lon: 101.4117, zoom: 10, city: "Qilian" },
  CH04: { lat: -27.443, lon: 153.064, zoom: 13, city: "Brisbane" },
  INT: { lat: 36.2043, lon: 117.0843, zoom: 12, city: "Tai'an" },
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

const PROJECT_EVENTS = [
  { date: "2021-09-01", label: "enrolled SVA, New York" },
  { date: "2021-01-01", label: "first film camera (Nikon F80)" },
  { date: "2024-01-12", label: "Shanghai Nanxiang (last days before NY)" },
  { date: "2024-02-10", label: "arrived New York / NJ" },
  { date: "2024-07-02", label: "northeast traverse begins" },
  { date: "2024-07-13", label: "northeast traverse ends (Jilin)" },
  { date: "2024-09-01", label: "Lower East Side begins (Ludlow 18F)" },
  { date: "2024-12-31", label: "New Year's Eve, New York" },
  { date: "2025-01-08", label: "UQ conditional offer received (in NY)" },
  { date: "2025-05-04", label: "last NYC clip (IMG_1627)" },
  { date: "2025-06-01", label: "SVA graduation (approximate)" },
  { date: "2025-07-04", label: "Gansu-Qinghai traverse begins" },
  { date: "2025-07-09", label: "traverse ends (Gandi)" },
  { date: "2025-07-21", label: "UQ orientation Brisbane" },
  { date: "2025-07-28", label: "UQ classes begin" },
  { date: "2025-08-22", label: "first Brisbane clip (Ascot)" },
  { date: "2025-12-23", label: "Mt Tai night climb" },
  { date: "2026-05-13", label: "most recent clips (Brisbane)" },
];

const state = {
  signal: {},
  chapter: "ch00",
  previousChapter: "ch01",
  clipIndex: 0,
  currentClip: null,
  previousClip: null,
  wasInterrupted: false,
  videoHoldTimer: null,
  isVideoHold: false,
  textTimer: null,
  textFadeTimer: null,
  ch00BootLogTimer: null,
  ch04DriftTimer: null,
  textCycle: {
    ch01: -1,
    ch02: -1,
    ch03: -1,
    ch04: -1,
  },
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
  dockApps: new Map(),
  dockTooltipTimer: null,
  stickyNotes: [],
  stickyZ: 300,
  nextStickyId: 1,
  calendarCursor: new Date(2024, 0, 1),
  userInteracted: false,
  mutedForAutoplay: true,
  map: {
    instance: null,
    marker: null,
    ready: false,
  },
  settings: {
    signalTexture: true,
    subdermalText: false,
    scanLines: false,
    dataPanel: false,
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
  ch00BootLog: document.getElementById("ch00-boot-log"),
  shutdownScreen: document.getElementById("shutdown-screen"),
  shutdownText: document.getElementById("shutdown-text"),
  shutdownSubtext: document.getElementById("shutdown-subtext"),
  shutdownFinal: document.getElementById("shutdown-final"),
  chapter00: document.getElementById("chapter-00"),
  stage: document.getElementById("chapter-stage"),
  chapterLabel: document.getElementById("chapter-label"),
  coordinates: document.getElementById("coordinates"),
  clock: document.getElementById("clock"),
  navButtons: [...document.querySelectorAll(".chapter-nav button[data-chapter]")],
  monitorToggle: document.getElementById("monitorToggle"),
  latScan: document.getElementById("lat-scan"),
  lonScan: document.getElementById("lon-scan"),
  signalAcquired: document.getElementById("signal-acquired"),
  video: document.getElementById("chapter-video"),
  crtFrame: document.getElementById("crt-frame"),
  crtShell: document.getElementById("crt-shell"),
  videoToggle: document.getElementById("video-toggle"),
  videoTime: document.getElementById("video-time"),
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
  interruptClose: document.getElementById("interrupt-close"),
  hiddenIntButton: document.getElementById("hidden-int-button"),
  dockBar: document.getElementById("dock-bar"),
  systemReadout: document.getElementById("system-readout"),
  mutedIndicator: document.getElementById("muted-indicator"),
};

const textureCtx = dom.texture.getContext("2d");

init();

function cssPx(name, fallback) {
  const value = parseFloat(getComputedStyle(dom.root).getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

function contentSafeRect(extra = 16) {
  const nav = window.matchMedia("(max-width: 860px)").matches ? 0 : cssPx("--nav-w", 160);
  const chrome = cssPx("--chrome-h", 28);
  const dock = cssPx("--dock-h", 64);
  return {
    left: nav + extra,
    top: chrome + extra,
    right: window.innerWidth - extra,
    bottom: window.innerHeight - dock - extra,
  };
}

function fitRect(width, height, rect = contentSafeRect()) {
  const w = Math.min(width, Math.max(240, rect.right - rect.left));
  const h = Math.min(height, Math.max(180, rect.bottom - rect.top));
  return { width: w, height: h };
}

function clampToRect(left, top, width, height, rect = contentSafeRect()) {
  return {
    left: Math.round(Math.max(rect.left, Math.min(rect.right - width, left))),
    top: Math.round(Math.max(rect.top, Math.min(rect.bottom - height, top))),
  };
}

function placeInSafeArea(width, height, xRatio = 0.5, yRatio = 0.5, rect = contentSafeRect()) {
  const fitted = fitRect(width, height, rect);
  const left = rect.left + (rect.right - rect.left - fitted.width) * xRatio;
  const top = rect.top + (rect.bottom - rect.top - fitted.height) * yRatio;
  return { ...fitted, ...clampToRect(left, top, fitted.width, fitted.height, rect) };
}

function constrainDesktopWindow(win) {
  if (!win || !isWindowVisible(win)) return;
  const rect = win.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const safe = contentSafeRect(10);
  const width = Math.min(rect.width, Math.max(260, safe.right - safe.left));
  const height = Math.min(rect.height, Math.max(200, safe.bottom - safe.top));
  if (width !== rect.width) win.style.width = `${Math.round(width)}px`;
  if (height !== rect.height) win.style.height = `${Math.round(height)}px`;
  const pos = clampToRect(rect.left, rect.top, width, height, safe);
  win.style.left = `${pos.left}px`;
  win.style.top = `${pos.top}px`;
  win.style.right = "";
  win.style.bottom = "";
}

async function init() {
  const response = await fetch(MANIFEST_URL);
  state.signal = await response.json();
  window.SIGNAL = state.signal;
  dom.video.muted = true;
  dom.interruptVideo.muted = true;
  loadSubdermalText();

  bindEvents();
  startClock();
  setupVideoObserver();
  setupAudioUnlock();
  setupDesktopObjects();
  if (sessionStorage.getItem("booted") !== "1") dom.body.classList.add("is-booting");
  setupOperatingSystem();
  restoreStickyNotes();
  resizeTexture();
  if (sessionStorage.getItem("booted") === "1") {
    dom.body.classList.add("has-booted");
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
    state.desktopWindows.forEach(constrainDesktopWindow);
    if (state.currentClip) applyVideoLayoutForClip(state.currentClip);
  });
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });
  document.addEventListener("keydown", handleFirstUserInteraction, { once: true });
  window.addEventListener("mousedown", (event) => {
    const win = event.target.closest?.(".desktop-window");
    if (win) bringWindowForward(win);
  });
  document.addEventListener("click", dismissCalendarPanel, true);
  document.addEventListener("pointerdown", dismissCalendarPanel, true);
  window.addEventListener("pointerdown", dismissCalendarPanel, true);
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
  dom.monitorToggle?.addEventListener("click", () => {
    state.settings.dataPanel = !state.settings.dataPanel;
    applySystemSettings();
  });

  dom.video.addEventListener("ended", onVideoEnded);
  dom.video.addEventListener("loadedmetadata", updateVideoControls);
  dom.video.addEventListener("timeupdate", () => {
    trackClipReadProgress();
    updateVideoControls();
  });
  dom.video.addEventListener("play", updateVideoControls);
  dom.video.addEventListener("pause", updateVideoControls);
  dom.crtFrame?.addEventListener("click", () => {
    if (state.isVideoHold) finishVideoHold();
  });
  dom.crtShell?.addEventListener("keydown", (event) => {
    if (event.key !== " ") return;
    event.preventDefault();
    toggleMainVideoPlayback();
  });
  dom.videoToggle?.addEventListener("click", toggleMainVideoPlayback);
  dom.interruptVideo.addEventListener("ended", () => exitInterrupt());
  dom.interruptClose?.addEventListener("click", () => exitInterrupt());
  dom.hiddenIntButton?.addEventListener("click", () => enterInterrupt());
  makeVideoDraggable();
}

function makeVideoDraggable() {
  const shell = dom.crtShell;
  if (!shell) return;
  let drag = null;
  shell.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    const rect = shell.getBoundingClientRect();
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    shell.style.transform = "none";
    shell.setPointerCapture(event.pointerId);
  });
  shell.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const next = clampToRect(drag.left + event.clientX - drag.x, drag.top + event.clientY - drag.y, drag.width, drag.height, contentSafeRect(8));
    shell.style.left = `${next.left}px`;
    shell.style.top = `${next.top}px`;
  });
  shell.addEventListener("pointerup", () => {
    drag = null;
  });
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
  const time = clipDisplayTime(clip);
  const location = String(clip.location || "unknown").replace(",", "");
  return `${name}${time}  ${location.padEnd(16, " ")}✓`;
}

function clipDisplayLocalTime(clipOrKey) {
  const clip = typeof clipOrKey === "string" ? state.signal[clipOrKey] : clipOrKey;
  const key = typeof clipOrKey === "string" ? clipOrKey : clip?.clip;
  if (key && DATE_OVERRIDES[key]) return formatOverrideLocalTime(DATE_OVERRIDES[key]);
  return clip?.local_time || "";
}

function clipDisplayDateKey(clipOrKey) {
  return clipDisplayLocalTime(clipOrKey).slice(0, 10);
}

function clipDisplayTime(clipOrKey) {
  return clipDisplayLocalTime(clipOrKey).slice(11, 16) || "--:--";
}

function formatOverrideLocalTime(isoLike) {
  const match = String(isoLike).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return String(isoLike);
  return `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}`;
}

function hideBootScreen() {
  if (!dom.bootScreen) return;
  dom.bootScreen.classList.remove("is-active");
  dom.bootScreen.setAttribute("aria-hidden", "true");
  dom.body.classList.remove("is-booting");
  dom.body.classList.add("has-booted");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setupDesktopObjects() {
  positionDesktopIcons();
  dom.desktopIcons.forEach((icon) => {
    icon.addEventListener("click", () => selectDesktopIcon(icon));
    icon.addEventListener("dblclick", () => openDesktopObject(icon.dataset.object));
    makeDesktopIconDraggable(icon);
  });
}

function makeDesktopIconDraggable(icon) {
  let drag = null;
  icon.addEventListener("pointerdown", (event) => {
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: icon.getBoundingClientRect().left,
      top: icon.getBoundingClientRect().top,
      moved: false,
    };
    icon.setPointerCapture(event.pointerId);
  });
  icon.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    const nextLeft = Math.max(0, Math.min(window.innerWidth - icon.offsetWidth, drag.left + dx));
    const nextTop = Math.max(24, Math.min(window.innerHeight - 60 - icon.offsetHeight, drag.top + dy));
    icon.dataset.dragged = "1";
    icon.style.left = `${Math.round(nextLeft)}px`;
    icon.style.top = `${Math.round(nextTop)}px`;
    icon.style.right = "";
    icon.style.bottom = "";
  });
  icon.addEventListener("pointerup", (event) => {
    if (drag?.moved) event.preventDefault();
    drag = null;
  });
}

function positionDesktopIcons() {
  const positions = {
    nye:      { right: 20, top: 48 },
    nanxiang: { right: 20, top: 142 },
    brisbane: { right: 20, top: 236 },
    nogps:    { right: 20, top: 330 },
    readme:   { right: 20, top: 424 },
  };
  dom.desktopIcons.forEach((icon) => {
    if (icon.dataset.dragged === "1") return;
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
  const existing = findWindowById(type);
  if (existing) {
    restoreDesktopWindow(existing);
    bringWindowForward(existing);
    if (type === "trash") maybeShowTrashDialog();
    return existing;
  }
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
  while (state.desktopWindows.filter((win) => win.dataset.windowKind === "object" && isWindowVisible(win)).length >= 2) {
    const oldest = state.desktopWindows.find((win) => win.dataset.windowKind === "object" && isWindowVisible(win));
    closeDesktopWindow(oldest);
  }
}

function createDesktopWindow(title, body) {
  const win = document.createElement("article");
  win.className = "desktop-window";
  win.tabIndex = 0;
  win.dataset.windowTitle = title;
  win.innerHTML = [
    `<div class="desktop-titlebar"><span>${title}</span><button class="desktop-minimize" type="button" aria-label="Minimize">−</button><button class="desktop-close" type="button" aria-label="Close">×</button></div>`,
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
  win.classList.remove("is-closed", "is-minimized");
  win.style.display = "";
  bringWindowForward(win);
  makeDraggable(win);
  if (!document.body.contains(win)) dom.objectLayer.appendChild(win);
  if (!state.desktopWindows.includes(win)) state.desktopWindows.push(win);
  requestAnimationFrame(() => constrainDesktopWindow(win));
  updateFinderWindow();
  updateControlPanelWindow();
  updateDockState();
  return win;
}

function setWindowPosition(win, options = {}) {
  ["left", "right", "top", "bottom"].forEach((side) => {
    win.style[side] = "";
  });
  if (Number.isFinite(options.width)) win.style.width = `${options.width}px`;
  if (Number.isFinite(options.height)) win.style.height = `${options.height}px`;
  const width = Number.isFinite(options.width) ? options.width : 420;
  const height = Number.isFinite(options.height) ? options.height : 360;
  const safe = contentSafeRect(10);
  const left = Number.isFinite(options.right)
    ? safe.right - options.right - width
    : options.left ?? safe.left + 24;
  const top = Number.isFinite(options.bottom)
    ? safe.bottom - options.bottom - height
    : options.top ?? safe.top + 24;
  const pos = clampToRect(left, top, width, height, safe);
  win.style.left = `${pos.left}px`;
  win.style.top = `${pos.top}px`;
}

function createSizedDesktopWindow(title, body, className) {
  const win = typeof body === "string" ? createDesktopWindow(title, body) : createDesktopWindow(title, "");
  if (className) win.classList.add(...String(className).split(/\s+/).filter(Boolean));
  if (body && typeof body !== "string") {
    const bodyEl = win.querySelector(".desktop-body");
    bodyEl.insertBefore(body, bodyEl.lastElementChild);
  }
  return win;
}

function closeDesktopWindow(win) {
  if (!win) return;
  removeDockIcon(win);
  saveWindowBounds(win);
  if (win.trashTimers) {
    win.trashTimers.forEach((timer) => clearTimeout(timer));
  }
  if (win.settingsTimer) clearInterval(win.settingsTimer);
  win.querySelectorAll("video").forEach((video) => video.pause());
  win.classList.remove("is-minimized", "is-focused");
  win.classList.add("is-closed");
  win.style.display = "none";
  updateFinderWindow();
  updateControlPanelWindow();
  updateDockState();
}

function bringWindowForward(win) {
  if (win.classList.contains("is-minimized") || win.classList.contains("is-closed")) return;
  if (win.dataset.windowId !== "calendar") dismissCalendarPanel({ target: document.body });
  state.windowZ += 1;
  state.desktopWindows.forEach((item) => item.classList.remove("is-focused"));
  win.style.zIndex = state.windowZ;
  win.classList.add("is-focused");
  win.focus?.({ preventScroll: true });
  updateFinderWindow();
  updateDockState();
}

function minimizeDesktopWindow(win) {
  if (!win || win.classList.contains("is-minimized")) return;
  saveWindowBounds(win);
  win.classList.add("is-minimized");
  win.style.display = "none";
  addDockIcon(win);
  updateFinderWindow();
  updateControlPanelWindow();
  updateDockState();
}

function restoreDesktopWindow(win) {
  if (!win) return;
  const shouldRestoreGeometry = win.classList.contains("is-minimized") || win.classList.contains("is-closed");
  win.classList.remove("is-minimized", "is-closed");
  win.style.display = "";
  if (shouldRestoreGeometry) {
    win.style.left = `${Math.round(Number(win.dataset.restoreLeft || parseFloat(win.style.left) || 80))}px`;
    win.style.top = `${Math.round(Number(win.dataset.restoreTop || parseFloat(win.style.top) || 80))}px`;
    win.style.right = "";
    win.style.bottom = "";
    if (win.dataset.restoreWidth) win.style.width = `${Math.round(Number(win.dataset.restoreWidth))}px`;
    if (win.dataset.restoreHeight) win.style.height = `${Math.round(Number(win.dataset.restoreHeight))}px`;
  }
  removeDockIcon(win);
  bringWindowForward(win);
  updateDockState();
}

function saveWindowBounds(win) {
  const rect = win.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  win.dataset.restoreLeft = String(rect.left);
  win.dataset.restoreTop = String(rect.top);
  win.dataset.restoreWidth = String(rect.width);
  win.dataset.restoreHeight = String(rect.height);
}

function isWindowVisible(win) {
  return !!win && document.body.contains(win) && !win.classList.contains("is-closed") && !win.classList.contains("is-minimized");
}

function addDockIcon(win) {
  if (!dom.dockBar || state.minimizedWindows.has(win.dataset.windowId)) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "dock-thumb";
  button.dataset.windowId = win.dataset.windowId;
  button.innerHTML = `<span>${String(win.dataset.windowTitle || win.dataset.windowId || "window").slice(0, 12)}</span>`;
  button.addEventListener("click", () => restoreDesktopWindow(win));
  state.minimizedWindows.set(win.dataset.windowId, button);
  const tray = dom.dockBar.querySelector("#dock-minimized") || dom.dockBar;
  tray.appendChild(button);
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
    const rect = win.getBoundingClientRect();
    const next = clampToRect(drag.left + event.clientX - drag.x, drag.top + event.clientY - drag.y, rect.width, rect.height, contentSafeRect(8));
    win.style.left = `${next.left}px`;
    win.style.top = `${next.top}px`;
  });
  handle.addEventListener("pointerup", () => {
    drag = null;
  });
}

/* SYSTEM WINDOWS --------------------------------------------------------- */
function setupOperatingSystem() {
  setupDock();
  setupTextSeenObserver();
  applySystemSettings();
  if (!sessionStorage.getItem("news_issue")) sessionStorage.setItem("news_issue", "0");
  state.systemIntervals.push(setInterval(() => {
    updateFinderWindow();
    updateProfilerWindow();
    updateSystemReadout();
    updateDockState();
  }, 2000));
  updateSystemReadout();
}

function setupDock() {
  if (!dom.dockBar) return;
  dom.dockBar.innerHTML = "";
  const apps = document.createElement("div");
  apps.className = "dock-apps";
  const dockUtilityDivider = document.createElement("div");
  dockUtilityDivider.className = "dock-divider dock-utility-divider has-items";
  const utilityApps = document.createElement("div");
  utilityApps.className = "dock-apps dock-utility-apps";
  const minimizedDivider = document.createElement("div");
  minimizedDivider.className = "dock-divider dock-minimized-divider";
  const minimized = document.createElement("div");
  minimized.className = "dock-minimized";
  minimized.id = "dock-minimized";
  dom.dockBar.append(apps, dockUtilityDivider, utilityApps, minimizedDivider, minimized);
  [
    ["finder", "FINDER", "ph-folders"],
    ["search", "SEARCH", "ph-magnifying-glass"],
    ["control", "SETTINGS", "ph-sliders"],
    ["news", "NEWS", "ph-newspaper"],
    ["chess", "CHESS", "ph-game-controller"],
    ["cards", "CARDS", "cards-icon"],
    ["note", "NOTES", "ph-note"],
    ["calendar", "CALENDAR", "ph-calendar"],
    ["monitor", "MONITOR", "monitor-icon"],
    ["profiler", "PROFILER", "ph-activity"],
    ["eyu", ".EYU", "ph-book-open"],
  ].forEach(([id, label, svg]) => {
    const button = createDockButton(id, label, svg);
    apps.appendChild(button);
    state.dockApps.set(id, button);
  });
  const trashButton = createDockButton("trash", "TRASH", "ph-trash");
  utilityApps.appendChild(trashButton);
  state.dockApps.set("trash", trashButton);
  updateDockState();
}

function handleDockApp(id) {
  if (id === "note") {
    createStickyNote();
    return;
  }
  if (id === "eyu" && !canOpenEyuFromDock()) {
    showDockTooltip(state.dockApps.get("eyu"), "available in CHAPTER 01 and CHAPTER 04 only");
    return;
  }
  if (id === "trash") {
    const existing = findWindowById("trash");
    if (isWindowVisible(existing)) closeDesktopWindow(existing);
    else openDesktopObject("trash");
    updateDockState();
    return;
  }
  toggleSystemWindow(id);
}

function createDockButton(id, label, svg) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "dock-app-icon";
  button.dataset.dockApp = id;
  const icon = svg === "cards-icon"
    ? `<span class="cards-dock-icon" aria-hidden="true"><b>♠</b><b>♥</b></span>`
    : svg === "monitor-icon"
      ? `<span class="monitor-dock-icon" aria-hidden="true"><i></i><i></i><i></i></span>`
    : `<i class="ph ${svg}" aria-hidden="true"></i>`;
  button.innerHTML = `<span class="dock-svg">${icon}</span><span class="dock-label">${label}</span><span class="dock-dot"></span>`;
  button.addEventListener("click", () => handleDockApp(id));
  return button;
}

function showDockTooltip(button, text) {
  if (!button) return;
  clearTimeout(state.dockTooltipTimer);
  let tooltip = button.querySelector(".dock-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("span");
    tooltip.className = "dock-tooltip";
    button.appendChild(tooltip);
  }
  tooltip.textContent = text;
  tooltip.classList.add("is-active");
  state.dockTooltipTimer = setTimeout(() => tooltip.classList.remove("is-active"), 2000);
}

function toggleSystemWindow(id) {
  const win = id === "search" ? findWindowById("search") : findWindowById(id);
  if (isWindowVisible(win)) closeSystemWindow(id);
  else openSystemWindow(id);
  updateDockState();
}

function canOpenEyuFromDock() {
  return state.chapter === "ch01" || state.chapter === "ch04";
}

function updateDockState() {
  state.dockApps.forEach((button, id) => {
    const open = id === "note"
      ? state.stickyNotes.some((note) => document.body.contains(note))
      : isWindowOpen(id);
    button.classList.toggle("is-open", open);
    button.classList.toggle("is-disabled", id === "eyu" && !canOpenEyuFromDock());
  });
  const minimized = dom.dockBar?.querySelector("#dock-minimized");
  const divider = dom.dockBar?.querySelector(".dock-minimized-divider");
  if (divider) divider.classList.toggle("has-items", !!state.minimizedWindows.size);
  if (!minimized) return;
  [...minimized.querySelectorAll(".dock-thumb")].forEach((thumb) => {
    const id = thumb.dataset.windowId;
    if (!state.minimizedWindows.has(id)) thumb.remove();
  });
}

function openSystemWindow(id) {
  if (id === "search") {
    openSearchWindow(true);
    return null;
  }
  if (id === "note") {
    createStickyNote();
    return null;
  }
  if (id === "eyu") {
    const existing = findWindowById("eyu");
    if (existing) {
      restoreDesktopWindow(existing);
      bringWindowForward(existing);
      return existing;
    }
    return openDesktopObject("eyu");
  }
  const existing = findWindowById(id);
  if (existing) {
    restoreDesktopWindow(existing);
    bringWindowForward(existing);
    return existing;
  }
  const builder = {
    control: buildControlPanelWindow,
    finder: buildFinderWindow,
    note: buildNoteWindow,
    calendar: buildCalendarWindow,
    chess: buildChessWindow,
    cards: buildCardsWindow,
    monitor: buildMonitorWindow,
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
  const safe = contentSafeRect(18);
  if (id === "finder") {
    const existing = findWindowById("finder");
    if (existing?.dataset.restoreLeft) {
      return { left: Number(existing.dataset.restoreLeft), top: Number(existing.dataset.restoreTop) };
    }
    return placeInSafeArea(820, 540, 0.48, 0.44, safe);
  }
  const positions = {
    control: placeInSafeArea(760, 560, 0.54, 0.40, safe),
    news: placeInSafeArea(560, 580, 0.18, 0.08, safe),
    calendar: placeInSafeArea(430, 560, 0.88, 0.34, safe),
    chess: placeInSafeArea(760, 500, 0.42, 0.10, safe),
    cards: placeInSafeArea(680, 610, 0.56, 0.18, safe),
    monitor: placeInSafeArea(620, 500, 0.62, 0.18, safe),
    profiler: placeInSafeArea(620, 460, 0.58, 0.26, safe),
    maze: placeInSafeArea(520, 440, 0.64, 0.36, safe),
    map: placeInSafeArea(500, 430, 0.70, 0.10, safe),
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
    const safe = contentSafeRect(18);
    const box = placeInSafeArea(980, 620, 0.46, 0.36, safe);
    const win = buildSearchWindow();
    mountDesktopWindow(win, { id: "search", kind: "system", ...box });
    updateDockState();
    return;
  }
  if (existing) closeDesktopWindow(existing);
  updateDockState();
}

function isSearchWindowOpen() {
  return isWindowVisible(findWindowById("search"));
}

function buildSearchWindow() {
  const panel = document.createElement("div");
  panel.className = "search-system-panel os-window-body";

  const inputWrap = document.createElement("div");
  inputWrap.className = "search-system-toolbar";
  const input = document.createElement("input");
  input.className = "search-system-input";
  input.type = "search";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "search locations…";
  const scope = Object.assign(document.createElement("span"), { className: "search-system-scope", textContent: "ENVIRONMENT DB" });
  inputWrap.append(scope, input);

  const body = document.createElement("div");
  body.className = "search-system-body";
  const results = document.createElement("div");
  results.className = "search-system-results";
  const detail = document.createElement("article");
  detail.className = "search-system-detail";
  body.append(results, detail);

  const footer = document.createElement("div");
  footer.className = "search-system-footer";
  footer.textContent = "loading…";

  panel.append(inputWrap, body, footer);
  const win = createSizedDesktopWindow("SEARCH", panel, "desktop-window-search");

  function renderEntries(query) {
    const entries = state.environmentEntries || [];
    const needle = query.trim().toLowerCase();
    if (["chart", "graph", "line", "折线", "图表"].includes(needle)) {
      openHiddenChartWindow("motion");
      footer.textContent = "chart.tmp surfaced";
    }
    const allMatches = needle
      ? entries.filter((e) => e.search.includes(needle))
      : entries;
    const matches = allMatches.slice(0, needle ? 36 : 24);
    results.innerHTML = "";
    detail.innerHTML = "";
    footer.textContent = `${matches.length}/${allMatches.length} shown - curated view`;

    if (!matches.length) {
      detail.appendChild(Object.assign(document.createElement("div"), { className: "search-empty", textContent: "NO MATCH" }));
      return;
    }

    const selectEntry = (entry, button) => {
      results.querySelectorAll(".search-system-result").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      renderSearchSystemDetail(entry, detail);
    };

    matches.forEach((entry, index) => {
      const raw = entry.raw || {};
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-system-result";
      const title = Object.assign(document.createElement("span"), { className: "search-result-name", textContent: entry.label });
      const meta = Object.assign(document.createElement("span"), {
        className: "search-result-meta",
        textContent: [
          raw.chapter_relevance,
          extractSearchDate(raw),
          extractEnvironmentAltitude(raw),
        ].filter((value) => value && value !== "—").join(" / ") || "unindexed",
      });
      button.append(title, meta);
      button.addEventListener("click", () => selectEntry(entry, button));
      results.appendChild(button);
      if (index === 0) requestAnimationFrame(() => selectEntry(entry, button));
    });
  }

  input.addEventListener("input", () => renderEntries(input.value));
  loadEnvironmentEntries()
    .then(() => renderEntries(""))
    .catch((err) => { detail.textContent = `unavailable: ${err.message || err}`; });

  return win;
}

function renderSearchSystemDetail(entry, detail) {
  const raw = entry.raw || {};
  detail.innerHTML = "";
  const eyebrow = Object.assign(document.createElement("div"), { className: "search-detail-eyebrow", textContent: raw.chapter_relevance || entry.group || "LOCATION" });
  const title = Object.assign(document.createElement("h2"), { className: "search-detail-heading", textContent: entry.label });
  detail.append(eyebrow, title);

  const table = document.createElement("div");
  table.className = "search-system-table";
  [
    ["WHEN", extractSearchDate(raw)],
    ["VISIBLE", extractVisibleSurface(raw)],
    ["WHERE", extractEnvironmentCoordinates(raw)],
    ["SIGNAL", raw.signal_coverage],
    ["SYSTEM TRUST", extractSearchConfidence(raw)],
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "search-system-row";
    row.append(
      Object.assign(document.createElement("div"), { className: "search-system-label", textContent: label }),
      Object.assign(document.createElement("div"), { className: "search-system-value", textContent: formatSearchValue(value) })
    );
    table.appendChild(row);
  });
  detail.appendChild(table);

  detail.appendChild(Object.assign(document.createElement("p"), {
    className: "search-system-fact",
    textContent: `visible fact: ${formatSearchValue(raw.one_fact)}`,
  }));
  detail.appendChild(Object.assign(document.createElement("p"), {
    className: "search-system-note",
    textContent: `why it stayed: ${formatSearchValue(extractWhyStayed(raw))}`,
  }));
  const more = document.createElement("button");
  more.type = "button";
  more.className = "search-more-button";
  more.textContent = "[one more thing]";
  more.addEventListener("click", () => {
    const note = document.createElement("p");
    note.className = "search-system-note";
    note.textContent = randomSearchAside(raw);
    detail.appendChild(note);
  });
  detail.appendChild(more);
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
  title.textContent = String(entry.label || "").toUpperCase();
  detail.appendChild(title);
  const chineseName = raw.chinese_name || raw.name_zh || raw.zh_name || raw.name_cn || raw.full_name_zh;
  if (chineseName) {
    const zh = document.createElement("div");
    zh.className = "search-detail-chinese";
    zh.textContent = chineseName;
    detail.appendChild(zh);
  }
  const table = document.createElement("div");
  table.className = "search-detail-table";
  [
    ["COORDINATES", extractEnvironmentCoordinates(raw)],
    ["ALTITUDE", extractEnvironmentAltitude(raw)],
    ["TERRAIN", raw.terrain || raw.terrain_detail],
    ["CLIMATE", raw.climate_note || raw.climate || raw.seasonal_light],
    ["LIGHT", raw.light_note || raw.sensory_atmospheric],
    ["POPULATION", raw.population_density],
    ["SIGNAL", raw.signal_coverage],
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "search-detail-row";
    const labelNode = document.createElement("div");
    labelNode.className = "search-detail-label";
    labelNode.textContent = label;
    const valueNode = document.createElement("div");
    valueNode.className = "search-detail-value";
    valueNode.textContent = formatSearchValue(value);
    row.append(labelNode, valueNode);
    table.appendChild(row);
  });
  detail.appendChild(table);
  const fact = document.createElement("div");
  fact.className = "search-detail-fact";
  fact.textContent = formatSearchValue(raw.one_fact);
  detail.appendChild(fact);
  const note = document.createElement("div");
  note.className = "search-detail-note";
  note.textContent = formatSearchValue(raw.narrative_note);
  detail.appendChild(note);
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

function extractSearchDate(raw) {
  const value = raw.date_context || raw.local_time || raw.date || raw.time_context;
  if (!value) return "—";
  return String(value).replace(" local", "");
}

function extractVisibleSurface(raw) {
  const text = [
    raw.terrain || raw.terrain_detail,
    raw.light_note || raw.sensory_atmospheric,
    raw.climate_note || raw.climate || raw.seasonal_light,
  ].filter(Boolean).join(" / ").toLowerCase();
  if (text.includes("river") || text.includes("ferry")) return "water, glare, commute";
  if (text.includes("grass") || text.includes("plain") || text.includes("green")) return "road, green, distance";
  if (text.includes("mountain") || text.includes("altitude") || text.includes("pass")) return "road, height, thin air";
  if (text.includes("urban") || text.includes("night")) return "window, street, artificial light";
  return formatSearchValue(raw.terrain || raw.terrain_detail || raw.light_note || "surface unknown");
}

function extractSearchConfidence(raw) {
  const status = raw.coordinates_verified?.status || raw.altitude_verified?.status || "";
  if (String(status).includes("manifest_only")) return "medium / phone only";
  if (String(status).includes("unverified")) return "low / substitute memory";
  if (String(status).includes("matched") || String(status).includes("resolved")) return "high enough";
  return "partial";
}

function extractWhyStayed(raw) {
  const note = String(raw.narrative_note || "");
  if (note) return note;
  const chapter = raw.chapter_relevance || "";
  if (chapter === "CH01") return "because the room kept recording a night that did not move.";
  if (chapter === "CH02") return "because the map became less certain than the road.";
  if (chapter === "CH03") return "because the route had a measurable weight.";
  if (chapter === "CH04") return "because the commute repeated until it looked like evidence.";
  if (chapter === "INT") return "because no reason was provided.";
  return "because it remained in the folder.";
}

function randomSearchAside(raw) {
  const options = [
    `altitude: ${extractEnvironmentAltitude(raw)}`,
    `light: ${formatSearchValue(raw.light_note || raw.sensory_atmospheric)}`,
    `weather-ish: ${formatSearchValue(raw.climate_note || raw.climate || raw.seasonal_light)}`,
    `database says: ${formatSearchValue(raw.one_fact)}`,
    `coordinates: ${extractEnvironmentCoordinates(raw)}`,
  ].filter((line) => !line.endsWith("—"));
  return options[Math.floor(Math.random() * options.length)] || "nothing else surfaced.";
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

function makeRangeSlider(label, value, min, max, step, onChange) {
  const row = document.createElement("label");
  row.className = "range-slider-row";
  const name = document.createElement("span");
  name.textContent = label;
  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = value;
  const valueNode = document.createElement("span");
  valueNode.className = "range-slider-value";
  const render = () => {
    valueNode.textContent = Number(input.value).toFixed(max <= 1 ? 2 : 0);
  };
  input.addEventListener("input", () => {
    const next = Number(input.value);
    onChange(next);
    render();
  });
  render();
  row.append(name, input, valueNode);
  return row;
}

function makeLayerControl(label, checked, onToggle, slider) {
  const group = document.createElement("div");
  group.className = "layer-control";
  let isChecked = checked;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ascii-checkbox";
  const sliderRow = slider ? makeRangeSlider("opacity", slider.value, slider.min, slider.max, slider.step, slider.onChange) : null;
  const render = () => {
    button.textContent = `${isChecked ? "[■]" : "[□]"} ${label}`;
    if (sliderRow) sliderRow.style.display = isChecked ? "grid" : "none";
  };
  button.addEventListener("click", () => {
    isChecked = !isChecked;
    onToggle(isChecked);
    render();
  });
  render();
  group.append(button);
  if (sliderRow) group.append(sliderRow);
  return group;
}

function makeSettingsCheckbox(label, checked, onChange) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "settings-checkbox";
  let current = checked;
  const render = () => {
    button.textContent = `${current ? "[■]" : "[□]"} ${label}`;
  };
  button.addEventListener("click", () => {
    current = !current;
    onChange(current);
    render();
  });
  render();
  return button;
}

function makeWindowToggleButton(label, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "settings-window-toggle";
  button.dataset.windowToggle = id;
  button.textContent = label;
  const sync = () => button.classList.toggle("is-active", isWindowOpen(id));
  button.addEventListener("click", () => {
    setSystemWindowOpen(id, !isWindowOpen(id));
    sync();
  });
  sync();
  return button;
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

function settingsPanel(className, children) {
  const panel = document.createElement("div");
  panel.className = `settings-ref-panel ${className || ""}`.trim();
  children.forEach((child) => panel.appendChild(child));
  return panel;
}

function settingsLabel(text) {
  const label = document.createElement("div");
  label.className = "settings-ref-label";
  label.textContent = text;
  return label;
}

function makeLevelBoxes(count, activeIndex, onSelect, labels = null) {
  const row = document.createElement("div");
  row.className = "settings-level-row";
  for (let index = 0; index < count; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "settings-level-box";
    button.textContent = labels ? labels[index] : String(index);
    button.classList.toggle("is-active", index === activeIndex);
    button.addEventListener("click", () => {
      onSelect(index);
      [...row.children].forEach((item, idx) => item.classList.toggle("is-active", idx === index));
    });
    row.appendChild(button);
  }
  return row;
}

function nearestIndex(values, current) {
  let best = 0;
  let distance = Infinity;
  values.forEach((value, index) => {
    const nextDistance = Math.abs(value - current);
    if (nextDistance < distance) {
      best = index;
      distance = nextDistance;
    }
  });
  return best;
}

function buildControlPanelWindow() {
  const shell = document.createElement("div");
  shell.className = "ctrl-strip-panel os-window-body";

  const header = document.createElement("div");
  header.className = "ctrl-strip-header";
  header.innerHTML = `<div>SETTINGS</div><span>CONTROL STRIPS / NO SUBMENUS</span>`;
  shell.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "ctrl-strip-grid";
  shell.appendChild(grid);

  let activeSetTime = null;
  buildCtrlAudio(grid, (fn) => { activeSetTime = fn; });
  buildCtrlDisplay(grid);
  buildCtrlLayers(grid);
  buildCtrlWindows(grid);

  const win = createSizedDesktopWindow("SETTINGS", shell, "desktop-window-control desktop-window-settings");
  win.settingsTimer = setInterval(() => { if (activeSetTime) activeSetTime(); }, 1000);
  return win;
}

function buildCtrlAudio(container, onSetTime) {
  // TIME display
  const timeDisplay = Object.assign(document.createElement("div"), { className: "ctrl-time-display" });
  const setTime = () => { timeDisplay.textContent = new Date().toLocaleTimeString("en-AU", { hour12: false }); };
  setTime();
  if (onSetTime) onSetTime(setTime);
  container.appendChild(makeCtrlRow("TIME", [timeDisplay]));

  // VIDEO volume
  const videoVal = Object.assign(document.createElement("span"), { className: "ctrl-value", textContent: state.settings.audio.video.toFixed(2) });
  const videoSlider = makeCtrlSlider(state.settings.audio.video, (v) => {
    state.settings.audio.video = v;
    videoVal.textContent = v.toFixed(2);
    applySystemSettings();
  });
  container.appendChild(makeCtrlRow("VIDEO VOL", [videoSlider, videoVal]));

  // AMBIENT volume
  const ambVal = Object.assign(document.createElement("span"), { className: "ctrl-value", textContent: state.settings.audio.ambient.toFixed(2) });
  const ambSlider = makeCtrlSlider(state.settings.audio.ambient, (v) => {
    state.settings.audio.ambient = v;
    ambVal.textContent = v.toFixed(2);
    applySystemSettings();
  });
  container.appendChild(makeCtrlRow("AMB VOL", [ambSlider, ambVal]));
}

function buildCtrlDisplay(container) {
  const textureLevels = [0, 0.33, 0.66, 1];
  container.appendChild(makeCtrlRow("TEXTURE", [
    makeLevelBoxes(4, nearestIndex(textureLevels, state.settings.signalOpacity), (i) => {
      state.settings.signalOpacity = textureLevels[i]; applySystemSettings();
    }),
  ]));

  const subLevels = [0, 0.01, 0.03, 0.06, 0.1];
  container.appendChild(makeCtrlRow("SUBDERMAL", [
    makeLevelBoxes(5, nearestIndex(subLevels, state.settings.subdermalOpacity), (i) => {
      state.settings.subdermalOpacity = subLevels[i]; applySystemSettings();
    }),
  ]));

  container.appendChild(makeCtrlRow("SCANLINES", [
    makeLevelBoxes(2, state.settings.scanLines ? 0 : 1, (i) => {
      state.settings.scanLines = i === 0; applySystemSettings();
    }, ["ON", "OFF"]),
  ]));
}

function buildCtrlLayers(container) {
  [
    ["SIGNAL TEXTURE",  "signalTexture"],
    ["SUBDERMAL TEXT",  "subdermalText"],
    ["DATA PANEL",      "dataPanel"],
    ["SYSTEM CHROME",   "systemChrome"],
    ["COORDINATES",     "coordinates"],
    ["CLOCK",           "clock"],
  ].forEach(([label, key]) => {
    const isOn = !!state.settings[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `ctrl-toggle-btn${isOn ? " is-active" : ""}`;
    btn.textContent = isOn ? "ON" : "OFF";
    btn.addEventListener("click", () => {
      const next = !btn.classList.contains("is-active");
      btn.classList.toggle("is-active", next);
      btn.textContent = next ? "ON" : "OFF";
      state.settings[key] = next;
      applySystemSettings();
    });
    const row = document.createElement("div");
    row.className = "ctrl-toggle-row";
    row.append(Object.assign(document.createElement("span"), { className: "ctrl-toggle-label", textContent: label }), btn);
    container.appendChild(row);
  });
}

function buildCtrlWindows(container) {
  [
    ["SEARCH",   "search"],
    ["NEWS",     "news"],
    ["FINDER",   "finder"],
    ["PROFILER", "profiler"],
    ["CALENDAR", "calendar"],
  ].forEach(([label, id]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    const open = isWindowOpen(id);
    btn.className = `ctrl-win-btn${open ? " is-active" : ""}`;
    btn.textContent = `${open ? "■" : "□"} ${label}`;
    btn.addEventListener("click", () => {
      if (isWindowOpen(id)) {
        const w = findWindowById(id);
        if (w) closeDesktopWindow(w);
      } else {
        openDesktopObject(id);
      }
      const nowOpen = isWindowOpen(id);
      btn.classList.toggle("is-active", nowOpen);
      btn.textContent = `${nowOpen ? "■" : "□"} ${label}`;
    });
    container.appendChild(btn);
  });
}

function makeCtrlRow(label, children) {
  const row = document.createElement("div");
  row.className = "ctrl-row";
  const lbl = Object.assign(document.createElement("div"), { className: "ctrl-row-label", textContent: label });
  const body = document.createElement("div");
  body.className = "ctrl-row-body";
  children.forEach((c) => body.appendChild(c));
  row.append(lbl, body);
  return row;
}

function makeCtrlSlider(value, onInput) {
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0"; slider.max = "1"; slider.step = "0.01";
  slider.value = String(value);
  slider.className = "ctrl-slider";
  slider.addEventListener("input", () => onInput(Number(slider.value)));
  return slider;
}

// ── Stale placeholder — delete body only, keep makeControlCell ──
function buildControlPanelWindow_OLD_PLACEHOLDER() {
  return null; // superseded by buildControlPanelWindow above
  // dummy reference to prevent lint warning on controlsRow
  const controlsRow = null;

  // VIDEO
  const videoSlider = document.createElement("input");
  videoSlider.type = "range"; videoSlider.min = "0"; videoSlider.max = "1"; videoSlider.step = "0.01";
  videoSlider.value = state.settings.audio.video;
  videoSlider.className = "settings-h-slider";
  videoSlider.addEventListener("input", () => { state.settings.audio.video = Number(videoSlider.value); applySystemSettings(); });
  controlsRow.appendChild(makeControlCell("VIDEO", [
    Object.assign(document.createElement("span"), { textContent: "🔊" }),
    videoSlider,
    Object.assign(document.createElement("span"), { textContent: "🔇" }),
  ]));

  // TIME
  const timeDisplay = document.createElement("div");
  timeDisplay.className = "settings-time-display";
  const setTime = () => { timeDisplay.textContent = new Date().toLocaleTimeString("en-AU", { hour12: false }); };
  setTime();
  controlsRow.appendChild(makeControlCell("TIME", [timeDisplay]));

  // TEXTURE
  const textureLevels = [0, 0.33, 0.66, 1];
  const texBoxes = makeLevelBoxes(4, nearestIndex(textureLevels, state.settings.signalOpacity), (i) => {
    state.settings.signalOpacity = textureLevels[i]; applySystemSettings();
  });
  controlsRow.appendChild(makeControlCell("TEXTURE", [texBoxes]));

  // SUBDERMAL
  const subdermalLevels = [0, 0.01, 0.03, 0.06, 0.1];
  const subBoxes = makeLevelBoxes(5, nearestIndex(subdermalLevels, state.settings.subdermalOpacity), (i) => {
    state.settings.subdermalOpacity = subdermalLevels[i]; applySystemSettings();
  });
  controlsRow.appendChild(makeControlCell("SUBDERMAL", [subBoxes]));

  // SCANLINES
  const scanBoxes = makeLevelBoxes(2, state.settings.scanLines ? 0 : 1, (i) => {
    state.settings.scanLines = i === 0; applySystemSettings();
  }, ["ON", "OFF"]);
  controlsRow.appendChild(makeControlCell("SCANLINES", [scanBoxes]));

  // AMBIENT
  const ambientValue = document.createElement("span");
  ambientValue.textContent = state.settings.audio.ambient.toFixed(2);
  ambientValue.style.cssText = "font-size:10px;color:var(--text-dim)";
  const ambientSlider = document.createElement("input");
  ambientSlider.type = "range"; ambientSlider.min = "0"; ambientSlider.max = "1"; ambientSlider.step = "0.01";
  ambientSlider.value = state.settings.audio.ambient;
  ambientSlider.className = "settings-h-slider";
  ambientSlider.addEventListener("input", () => {
    state.settings.audio.ambient = Number(ambientSlider.value);
    ambientValue.textContent = Number(ambientSlider.value).toFixed(2);
    applySystemSettings();
  });
  controlsRow.appendChild(makeControlCell("AMBIENT", [
    Object.assign(document.createElement("span"), { textContent: "♪" }),
    ambientSlider,
    ambientValue,
  ]));

  // ── VISIBILITY section ────────────────────────────────────────
  const visHeader = Object.assign(document.createElement("div"), { className: "settings-section-header", textContent: "VISIBILITY" });

  const visRow = document.createElement("div");
  visRow.className = "settings-toggle-row";
  [
    ["TEXTURE",    "signalTexture"],
    ["SUBDERMAL",  "subdermalText"],
    ["SCANLINES",  "scanLines"],
    ["DATA PANEL", "dataPanel"],
  ].forEach(([label, key]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "settings-ref-button";
    btn.textContent = label;
    btn.classList.toggle("is-active", !!state.settings[key]);
    btn.addEventListener("click", () => {
      state.settings[key] = !state.settings[key];
      btn.classList.toggle("is-active", !!state.settings[key]);
      applySystemSettings();
    });
    visRow.appendChild(btn);
  });

  // ── WINDOWS section ───────────────────────────────────────────
  const winHeader = Object.assign(document.createElement("div"), { className: "settings-section-header", textContent: "WINDOWS" });

  const winRow = document.createElement("div");
  winRow.className = "settings-toggle-row";
  [
    ["SEARCH",   "search"],
    ["NEWS",     "news"],
    ["FINDER",   "finder"],
    ["PROFILER", "profiler"],
    ["CALENDAR", "calendar"],
  ].forEach(([label, id]) => {
    const btn = makeWindowToggleButton(label, id);
    btn.classList.add("settings-ref-button");
    winRow.appendChild(btn);
  });

  shell.append(controlsRow, visHeader, visRow, winHeader, winRow);
  const win = createSizedDesktopWindow("SETTINGS", shell, "desktop-window-control desktop-window-settings");
  win.settingsTimer = setInterval(setTime, 1000);
  return win;
}

function makeControlCell(label, children) {
  const cell = document.createElement("div");
  cell.className = "settings-control-cell";
  children.forEach((child) => cell.appendChild(child));
  const lbl = Object.assign(document.createElement("div"), { className: "settings-control-label", textContent: label });
  cell.appendChild(lbl);
  return cell;
}

function isWindowOpen(id) {
  return id === "search" ? isSearchWindowOpen() : isWindowVisible(findWindowById(id));
}

function updateControlPanelWindow() {
  const win = findWindowById("control");
  if (!win) return;
  win.querySelectorAll(".ascii-checkbox").forEach((button) => {
    const text = button.textContent.replace(/^\[[■□]\]\s*/, "");
    const map = { search: "search", ".eyu": "eyu", profiler: "profiler", news: "news", chess: "chess", map: "map" };
    if (map[text]) button.textContent = `${isWindowOpen(map[text]) ? "[■]" : "[□]"} ${text}`;
  });
  win.querySelectorAll(".settings-window-toggle").forEach((button) => {
    button.classList.toggle("is-active", isWindowOpen(button.dataset.windowToggle));
  });
}

function applySystemSettings() {
  dom.body.classList.toggle("hide-signal-texture", !state.settings.signalTexture);
  dom.body.classList.toggle("hide-subdermal-text", !state.settings.subdermalText);
  dom.body.classList.toggle("show-subdermal-text", !!state.settings.subdermalText);
  dom.body.classList.toggle("hide-scan-lines", !state.settings.scanLines);
  dom.body.classList.toggle("hide-data-panel", !state.settings.dataPanel);
  dom.body.classList.toggle("hide-system-chrome", !state.settings.systemChrome);
  dom.body.classList.toggle("hide-coordinates", !state.settings.coordinates);
  dom.body.classList.toggle("hide-clock", !state.settings.clock);
  dom.monitorToggle?.classList.toggle("active", !!state.settings.dataPanel);
  dom.root.style.setProperty("--signal-texture-opacity", state.settings.signalOpacity);
  dom.root.style.setProperty("--subdermal-opacity", state.settings.subdermalOpacity);
  dom.video.volume = state.settings.audio.video;
  if (state.audio.gainVideo) state.audio.gainVideo.gain.value = state.settings.audio.video;
  if (state.audio.gainExtract) state.audio.gainExtract.gain.value = state.settings.audio.extract;
  if (state.audio.gainAmbient) state.audio.gainAmbient.gain.value = state.settings.audio.ambient;
  state.audio.ambientGainBase = state.settings.audio.ambient;
}

function buildFinderWindow() {
  const layout = document.createElement("div");
  layout.className = "finder-layout";

  const sidebar = document.createElement("div");
  sidebar.className = "finder-sidebar";

  const main = document.createElement("div");
  main.className = "finder-main";

  const preview = document.createElement("aside");
  preview.className = "finder-preview";

  const statusbar = document.createElement("div");
  statusbar.className = "finder-statusbar";
  statusbar.textContent = "5 items";

  const sections = [
    { key: "desktop", icon: "▣", label: "DESKTOP" },
    { key: "windows", icon: "⊡", label: "WINDOWS" },
    { key: "system",  icon: "◈", label: "SYSTEM INFO" },
  ];

  function renderSection(key) {
    sidebar.querySelectorAll(".finder-nav-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.section === key);
    });
    main.innerHTML = "";
    preview.innerHTML = "";

    const setPreview = (title, meta, lines, action = null) => {
      preview.innerHTML = "";
      preview.append(
        Object.assign(document.createElement("div"), { className: "finder-preview-icon", textContent: meta.icon || "▣" }),
        Object.assign(document.createElement("div"), { className: "finder-preview-title", textContent: title }),
        Object.assign(document.createElement("div"), { className: "finder-preview-meta", textContent: meta.kind || "" })
      );
      const info = document.createElement("div");
      info.className = "finder-preview-info";
      (lines || []).forEach(([label, value]) => {
        const row = document.createElement("div");
        row.append(
          Object.assign(document.createElement("span"), { textContent: label }),
          Object.assign(document.createElement("b"), { textContent: value })
        );
        info.appendChild(row);
      });
      preview.appendChild(info);
      if (action) {
        const open = document.createElement("button");
        open.type = "button";
        open.className = "finder-preview-open";
        open.textContent = "OPEN";
        open.addEventListener("click", action);
        preview.appendChild(open);
      }
    };

    if (key === "desktop") {
      const files = [
        { icon: "▶", name: "NYE_3SEC.MOV",       meta: "video", id: "nye" },
        { icon: "▶", name: "NANXIANG.MOV",        meta: "video", id: "nanxiang" },
        { icon: "▶", name: "BRISBANE_WATER.MOV",  meta: "video", id: "brisbane" },
        { icon: "?", name: "NO_GPS",              meta: "object", id: "nogps" },
        { icon: "☰", name: "README.txt",          meta: "text",   id: "readme" },
      ];
      files.forEach((f) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "finder-item";
        const iconEl = Object.assign(document.createElement("span"), { className: "finder-item-icon", textContent: f.icon });
        const nameEl = Object.assign(document.createElement("span"), { className: "finder-item-name", textContent: f.name });
        const metaEl = Object.assign(document.createElement("span"), { className: "finder-item-meta", textContent: f.meta });
        btn.append(iconEl, nameEl, metaEl);
        const action = () => openDesktopObject(f.id);
        btn.addEventListener("click", () => {
          main.querySelectorAll(".finder-item").forEach((item) => item.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          setPreview(f.name, { icon: f.icon, kind: f.meta }, [
            ["LOCATION", "desktop"],
            ["OBJECT ID", f.id],
            ["ACTION", "double-click or OPEN"],
          ], action);
        });
        btn.addEventListener("dblclick", action);
        main.appendChild(btn);
        if (!main.querySelector(".is-selected")) btn.click();
      });
      statusbar.textContent = `${files.length} items`;

    } else if (key === "windows") {
      const seenWindows = new Set();
      const openWins = state.desktopWindows.filter(isWindowVisible).reduce((acc, item) => {
        const id = item.dataset.windowId;
        if (seenWindows.has(id)) return acc;
        seenWindows.add(id);
        acc.push({ name: item.dataset.windowTitle || id, ref: item });
        return acc;
      }, []);

      if (!openWins.length) {
        const empty = Object.assign(document.createElement("div"), { className: "finder-empty", textContent: "NO OPEN WINDOWS" });
        main.appendChild(empty);
      } else {
        openWins.forEach((w) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "finder-item";
          const iconEl = Object.assign(document.createElement("span"), { className: "finder-item-icon", textContent: "⊡" });
          const nameEl = Object.assign(document.createElement("span"), { className: "finder-item-name", textContent: w.name.toUpperCase() });
          const metaEl = Object.assign(document.createElement("span"), { className: "finder-item-meta", textContent: "window" });
          btn.append(iconEl, nameEl, metaEl);
          const action = () => bringWindowForward(w.ref);
          btn.addEventListener("click", () => {
            main.querySelectorAll(".finder-item").forEach((item) => item.classList.remove("is-selected"));
            btn.classList.add("is-selected");
            const rect = w.ref.getBoundingClientRect();
            setPreview(w.name.toUpperCase(), { icon: "⊡", kind: "open window" }, [
              ["SIZE", `${Math.round(rect.width)} × ${Math.round(rect.height)}`],
              ["POSITION", `${Math.round(rect.left)}, ${Math.round(rect.top)}`],
              ["STATE", "visible"],
            ], action);
          });
          btn.addEventListener("dblclick", action);
          main.appendChild(btn);
          if (!main.querySelector(".is-selected")) btn.click();
        });
      }
      statusbar.textContent = `${openWins.length} open window${openWins.length !== 1 ? "s" : ""}`;

    } else if (key === "system") {
      const pairs = [
        ["CHAPTER",  (state.chapter || "----").toUpperCase()],
        ["CLIP",     state.currentClip || "----"],
        ["UPTIME",   sessionDuration()],
        ["MEMORY",   "OK"],
        ["VIEWPORT", `${window.innerWidth} × ${window.innerHeight}`],
        ["PLATFORM", navigator.platform || "unknown"],
      ];
      pairs.forEach(([label, value]) => {
        const row = document.createElement("div");
        row.className = "finder-readout-row";
        const lblEl = Object.assign(document.createElement("span"), { className: "finder-readout-label", textContent: label });
        const valEl = Object.assign(document.createElement("span"), { className: "finder-readout-value", textContent: value });
        row.append(lblEl, valEl);
        main.appendChild(row);
      });
      setPreview("IN_PRAISE_OF_TIME", { icon: "◈", kind: "system information" }, pairs);
      statusbar.textContent = "system information";
    }
  }

  // Build sidebar
  const locHeader = Object.assign(document.createElement("div"), { className: "finder-section-label", textContent: "LOCATIONS" });
  sidebar.appendChild(locHeader);
  sections.forEach((section) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "finder-nav-btn";
    btn.dataset.section = section.key;
    btn.textContent = `${section.icon}  ${section.label}`;
    btn.addEventListener("click", () => renderSection(section.key));
    sidebar.appendChild(btn);
  });

  renderSection("desktop");
  layout.append(sidebar, main, preview);

  const wrapper = document.createElement("div");
  wrapper.className = "finder-wrapper os-window-body";
  wrapper.append(layout, statusbar);

  const win = createSizedDesktopWindow("finder", wrapper, "desktop-window-finder");
  win._finderRender = renderSection;
  return win;
}

function updateFinderWindow(win = findWindowById("finder")) {
  if (!win) return;
  if (win._finderRender) win._finderRender("desktop");
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

function restoreStickyNotes() {
  const stored = JSON.parse(sessionStorage.getItem("sticky_notes") || "[]");
  if (!Array.isArray(stored)) return;
  stored.forEach((note) => createStickyNote(note));
}

function createStickyNote(saved = null) {
  if (!saved && state.stickyNotes.length >= 8) return null;
  const id = saved?.id || `sticky-${Date.now()}-${state.nextStickyId++}`;
  const note = document.createElement("section");
  note.className = "sticky-note";
  note.dataset.stickyId = id;
  note.style.left = `${saved?.left ?? 120 + state.stickyNotes.length * 18}px`;
  note.style.top = `${saved?.top ?? 92 + state.stickyNotes.length * 18}px`;
  note.style.zIndex = ++state.stickyZ;
  note.innerHTML = [
    `<div class="sticky-strip"><span class="sticky-state">○</span><button type="button" aria-label="Delete note">×</button></div>`,
    `<textarea spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off"></textarea>`,
  ].join("");
  const textarea = note.querySelector("textarea");
  const stateDot = note.querySelector(".sticky-state");
  textarea.value = saved?.content || "";
  const updateDot = () => {
    stateDot.textContent = textarea.value.trim() ? "●" : "○";
  };
  updateDot();
  textarea.addEventListener("input", () => {
    updateDot();
    saveStickyNotes();
  });
  note.querySelector("button").addEventListener("click", () => {
    note.remove();
    state.stickyNotes = state.stickyNotes.filter((item) => item !== note);
    saveStickyNotes();
    updateDockState();
  });
  note.addEventListener("pointerdown", () => {
    note.style.zIndex = ++state.stickyZ;
  });
  makeStickyDraggable(note);
  document.body.appendChild(note);
  state.stickyNotes.push(note);
  saveStickyNotes();
  updateDockState();
  textarea.focus();
  return note;
}

function makeStickyDraggable(note) {
  const handle = note.querySelector(".sticky-strip");
  let drag = null;
  handle.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    drag = {
      x: event.clientX,
      y: event.clientY,
      left: parseFloat(note.style.left) || 0,
      top: parseFloat(note.style.top) || 0,
    };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!drag) return;
    note.style.left = `${Math.max(0, drag.left + event.clientX - drag.x)}px`;
    note.style.top = `${Math.max(24, drag.top + event.clientY - drag.y)}px`;
  });
  handle.addEventListener("pointerup", () => {
    if (drag) saveStickyNotes();
    drag = null;
  });
}

function saveStickyNotes() {
  const notes = state.stickyNotes
    .filter((note) => document.body.contains(note))
    .map((note) => ({
      id: note.dataset.stickyId,
      left: Math.round(parseFloat(note.style.left) || 0),
      top: Math.round(parseFloat(note.style.top) || 0),
      content: note.querySelector("textarea")?.value || "",
    }));
  sessionStorage.setItem("sticky_notes", JSON.stringify(notes));
}

function buildCalendarWindow() {
  const shell = document.createElement("div");
  shell.className = "calendar-panel os-window-body";
  renderCalendar(shell);
  return createSizedDesktopWindow("calendar", shell, "desktop-window-calendar");
}

function renderCalendar(shell) {
  shell.innerHTML = "";
  const header = document.createElement("div");
  header.className = "calendar-header";
  const prev = document.createElement("button");
  prev.type = "button";
  prev.textContent = "[←]";
  const label = document.createElement("span");
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "[→]";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close calendar");
  close.addEventListener("click", (event) => {
    event.stopPropagation();
    const win = shell.closest(".desktop-window");
    if (win) closeDesktopWindow(win);
  });
  header.append(prev, label, next, close);

  const scroller = document.createElement("div");
  scroller.className = "calendar-scroll";
  const data = calendarTimelineData();
  for (let year = 2023; year <= 2026; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      scroller.appendChild(renderCalendarMonth(year, month, data));
    }
  }
  const updateLabel = () => {
    const month = visibleCalendarMonth(scroller);
    label.textContent = month || "2023-2026";
  };
  prev.addEventListener("click", () => jumpCalendarMonth(scroller, -1));
  next.addEventListener("click", () => jumpCalendarMonth(scroller, 1));
  scroller.addEventListener("scroll", updateLabel);
  shell.append(header, scroller);
  requestAnimationFrame(() => {
    const target = scroller.querySelector(`[data-month="${formatMonthKey(state.calendarCursor)}"]`) || scroller.firstElementChild;
    target?.scrollIntoView({ block: "start" });
    updateLabel();
  });
}

function calendarTimelineData() {
  const clips = Object.values(state.signal).reduce((map, clip) => {
    const date = clipDisplayDateKey(clip);
    if (!date) return map;
    map[date] = map[date] || [];
    map[date].push({
      clip: clip.clip || String(clip.filename || "").replace(/\..+$/, ""),
      filename: clip.filename || clip.clip,
      time: clipDisplayTime(clip),
      location: clip.location || "—",
      duration: clip.duration_s || clip.duration || clip.seconds || null,
    });
    return map;
  }, {});
  const events = PROJECT_EVENTS.reduce((map, event) => {
    map[event.date] = map[event.date] || [];
    map[event.date].push(event.label);
    return map;
  }, {});
  return { clips, events };
}

function renderCalendarMonth(year, month, data) {
  const section = document.createElement("section");
  section.className = "calendar-month";
  section.dataset.month = `${year}-${String(month + 1).padStart(2, "0")}`;
  section.appendChild(finderTitle(`${new Date(year, month, 1).toLocaleString("en-US", { month: "short" }).toUpperCase()}  ${year}`));
  const grid = document.createElement("div");
  grid.className = "calendar-grid";
  ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((day) => {
    const node = document.createElement("div");
    node.className = "calendar-weekday";
    node.textContent = day;
    grid.appendChild(node);
  });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < offset; i += 1) grid.appendChild(document.createElement("div"));
  for (let day = 1; day <= days; day += 1) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const clips = data.clips[key] || [];
    const events = data.events[key] || [];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-date";
    button.innerHTML = `<span>${day}</span><small>${clips.length ? "●" : ""}${events.length ? "◆" : ""}</small>`;
    button.classList.toggle("is-today", key === today);
    if (clips.length || events.length) {
      button.classList.add("is-marked");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        showCalendarInlinePanel(section, key, { clips, events });
      });
    }
    grid.appendChild(button);
  }
  const panel = document.createElement("div");
  panel.className = "calendar-inline-panel";
  section.append(grid, panel);
  return section;
}

function showCalendarInlinePanel(monthNode, date, payload) {
  document.querySelectorAll(".calendar-inline-panel").forEach((panel) => {
    panel.classList.remove("is-active");
    panel.textContent = "";
  });
  const panel = monthNode.querySelector(".calendar-inline-panel");
  if (!panel) return;
  panel.classList.add("is-active");
  panel.innerHTML = "";
  const clips = payload.clips || [];
  const events = payload.events || [];
  const close = document.createElement("button");
  close.type = "button";
  close.className = "calendar-inline-close";
  close.textContent = "×";
  close.addEventListener("click", (event) => {
    event.stopPropagation();
    panel.classList.remove("is-active");
    panel.textContent = "";
  });
  const pre = document.createElement("pre");
  pre.textContent = [
    date,
    ...events.map((label) => `◆ ${label}`),
    ...clips.map((clip) => `${clip.clip}  ${clip.time}  ${clip.location}  ${clip.duration ? `${Math.round(clip.duration)}s` : "—s"}`),
  ].join("\n");
  panel.append(close, pre);
}

function visibleCalendarMonth(scroller) {
  const rect = scroller.getBoundingClientRect();
  const months = [...scroller.querySelectorAll(".calendar-month")];
  const found = months.find((month) => month.getBoundingClientRect().bottom > rect.top + 48) || months[0];
  if (!found) return "";
  const [year, month] = found.dataset.month.split("-");
  const label = new Date(Number(year), Number(month) - 1, 1).toLocaleString("en-US", { month: "short" }).toUpperCase();
  state.calendarCursor = new Date(Number(year), Number(month) - 1, 1);
  return `${label} ${year}`;
}

function jumpCalendarMonth(scroller, delta) {
  const current = new Date(state.calendarCursor);
  current.setMonth(current.getMonth() + delta);
  const year = Math.max(2023, Math.min(2026, current.getFullYear()));
  const month = year === 2023 ? Math.max(0, current.getMonth()) : year === 2026 ? Math.min(11, current.getMonth()) : current.getMonth();
  state.calendarCursor = new Date(year, month, 1);
  scroller.querySelector(`[data-month="${formatMonthKey(state.calendarCursor)}"]`)?.scrollIntoView({ block: "start" });
}

function formatMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function dismissCalendarPanel(event) {
  if (event?.target?.closest?.(".calendar-panel")) return;
  document.querySelectorAll(".calendar-inline-panel").forEach((panel) => {
    panel.classList.remove("is-active");
    panel.textContent = "";
  });
}

function buildMonitorWindow() {
  const shell = document.createElement("div");
  shell.className = "monitor-panel os-window-body";
  shell.innerHTML = `
    <div class="monitor-head">
      <div>SIGNAL MONITOR</div>
      <span>LIVE CLIP TELEMETRY</span>
    </div>
    <div class="monitor-readout">
      <div class="monitor-big">
        <span>CLIP</span>
        <b data-monitor-field="clip">----</b>
      </div>
      <div class="monitor-stack">
        <div><span>LOCAL</span><b data-monitor-field="local">----</b></div>
        <div><span>GPS</span><b data-monitor-field="gps">----</b></div>
        <div><span>ALT</span><b data-monitor-field="altitude">----</b></div>
      </div>
    </div>
    <div class="monitor-meter-grid">
      ${["SIGNAL", "LUMINANCE", "MOTION", "GLITCH", "RMS PEAK"].map((label) => `
        <div class="monitor-meter" data-monitor-meter="${label}">
          <div><span>${label}</span><b>0.00</b></div>
          <i style="--meter: 0%"></i>
        </div>
      `).join("")}
    </div>
    <pre class="monitor-log" data-monitor-field="log">waiting for signal...</pre>
  `;
  const win = createSizedDesktopWindow("MONITOR", shell, "desktop-window-monitor");
  renderMonitorWindow(win, state.signal?.[state.currentClip]);
  return win;
}

function buildChessWindow() {
  const shell = document.createElement("div");
  shell.className = "chess-panel os-window-body";
  const header = document.createElement("div");
  header.className = "chess-header";
  header.innerHTML = "<div>CHESS.app</div><span>move a white piece; black replies</span>";
  const board = document.createElement("div");
  board.className = "chess-board";
  const side = document.createElement("div");
  side.className = "chess-side";
  const captured = document.createElement("div");
  captured.className = "chess-captured";
  const message = document.createElement("div");
  message.className = "chess-message";
  const footer = document.createElement("div");
  footer.className = "chess-footer";
  const newGame = document.createElement("button");
  newGame.type = "button";
  newGame.textContent = "[New Game]";
  const turn = document.createElement("span");
  footer.append(newGame, turn);
  side.append(message, captured, footer);
  shell.append(header, board, side);
  const win = createSizedDesktopWindow("chess", shell, "desktop-window-chess");
  win.chessState = newChessState();
  newGame.addEventListener("click", () => {
    win.chessState = newChessState();
    renderChess(win);
  });
  renderChess(win);
  return win;
}

function buildCardsWindow() {
  const shell = document.createElement("div");
  shell.className = "cards-panel os-window-body";

  const toolbar = document.createElement("div");
  toolbar.className = "cards-toolbar";
  toolbar.innerHTML = `
    <div>CARDS.app</div>
    <span>make pairs, routes, or small contradictions</span>
  `;

  const table = document.createElement("div");
  table.className = "cards-table";

  const footer = document.createElement("div");
  footer.className = "cards-footer";

  const status = document.createElement("div");
  status.className = "cards-status";
  const meters = document.createElement("div");
  meters.className = "cards-meters";

  const controls = document.createElement("div");
  controls.className = "cards-controls";
  const play = Object.assign(document.createElement("button"), { type: "button", textContent: "[play set]" });
  const deal = Object.assign(document.createElement("button"), { type: "button", textContent: "[redeal]" });
  const close = Object.assign(document.createElement("button"), { type: "button", textContent: "[close archive]" });
  controls.append(play, deal, close);
  footer.append(status, meters, controls);

  const win = createSizedDesktopWindow("cards.app", shell, "desktop-window-cards");
  const cs = {
    deck: shuffleCards(makeArchiveDeck()),
    selected: [],
    played: [],
    order: 0,
    signal: 70,
    drift: 0,
    moves: 0,
    complete: false,
  };
  win.cardsState = cs;

  const render = (message = "Select two or three cards. Rank, suit, route, sequence, contradiction.") => {
    table.innerHTML = "";
    cs.deck.forEach((entry, index) => {
      const card = renderArchiveCard(entry, index);
      card.classList.toggle("is-selected", cs.selected.includes(entry.id));
      card.classList.toggle("is-cleared", entry.cleared);
      card.addEventListener("click", () => {
        if (entry.cleared || cs.complete) return;
        if (cs.selected.includes(entry.id)) cs.selected = cs.selected.filter((id) => id !== entry.id);
        else if (cs.selected.length < 3) cs.selected.push(entry.id);
        else cs.selected = [entry.id];
        render(`${entry.rank}${entry.suit} / ${entry.label}`);
      });
      table.appendChild(card);
    });
    status.textContent = message;
    meters.innerHTML = [
      cardsMeter("ORDER", cs.order),
      cardsMeter("SIGNAL", cs.signal),
      cardsMeter("DRIFT", cs.drift),
    ].join("");
  };

  play.addEventListener("click", () => {
    if (cs.complete) return;
    const cards = cs.selected.map((id) => cs.deck.find((entry) => entry.id === id)).filter(Boolean);
    const result = evaluateArchiveSet(cards);
    if (!result.ok) {
      render(result.message);
      return;
    }
    cards.forEach((entry) => { entry.cleared = true; });
    cs.moves += 1;
    cs.played.push(result.name);
    cs.order = Math.min(100, cs.order + result.order);
    cs.signal = Math.max(0, Math.min(100, cs.signal + result.signal));
    cs.drift = Math.min(100, cs.drift + result.drift);
    cs.selected = [];
    if (result.flash) whiteFlash();
    if (result.chart) setTimeout(() => openHiddenChartWindow(result.chart), 300);
    const cleared = cs.deck.filter((entry) => entry.cleared).length;
    if (cleared >= cs.deck.length) {
      cs.complete = true;
      render(cardsSummary(cs, "table cleared"));
    } else {
      render(`${result.message} / ${cleared}/${cs.deck.length} filed`);
    }
  });

  deal.addEventListener("click", () => {
    Object.assign(cs, {
      deck: shuffleCards(makeArchiveDeck()),
      selected: [],
      played: [],
      order: 0,
      signal: 70,
      drift: 0,
      moves: 0,
      complete: false,
    });
    render("A clean table. Not a clean chronology.");
  });

  close.addEventListener("click", () => {
    cs.complete = true;
    render(cardsSummary(cs, "archive closed by user"));
  });

  shell.append(toolbar, table, footer);
  render();
  return win;
}

function makeArchiveDeck() {
  return [
    { id: "floor18", rank: "A", suit: "♠", label: "floor 18", chapter: "ch01", date: "2024-09-01", tags: ["window", "waiting"], clip: "IMG_1401" },
    { id: "window", rank: "7", suit: "♠", label: "same window", chapter: "ch01", date: "2024-09-02", tags: ["window", "repeat"], clip: "IMG_1410" },
    { id: "street", rank: "Q", suit: "♠", label: "04:23 street", chapter: "ch01", date: "2024-09-20", tags: ["noise", "waiting"], clip: "IMG_2361" },
    { id: "nye", rank: "K", suit: "♠", label: "NYE 3 sec", chapter: "ch01", date: "2024-12-31", tags: ["glitch", "window"], clip: "IMG_5811" },
    { id: "lastny", rank: "3", suit: "♠", label: "last NY clip", chapter: "ch01", date: "2025-05-04", tags: ["leaving", "night"], clip: "IMG_1627" },
    { id: "nanxiang", rank: "A", suit: "♥", label: "Nanxiang", chapter: "ch02", date: "2024-01-12", tags: ["origin", "memory"], clip: "IMG_0196" },
    { id: "daqing", rank: "7", suit: "♥", label: "oil plain", chapter: "ch02", date: "2024-07-02", tags: ["north", "route"], clip: "IMG_7948" },
    { id: "qiqihar", rank: "Q", suit: "♥", label: "city edge", chapter: "ch02", date: "2024-07-03", tags: ["north", "route"], clip: "IMG_8033" },
    { id: "nogps", rank: "K", suit: "♥", label: "NO GPS", chapter: "ch02", date: "2024-07-04", tags: ["glitch", "lost", "signal"], clip: "IMG_8084" },
    { id: "grass", rank: "3", suit: "♥", label: "too green", chapter: "ch02", date: "2024-07-07", tags: ["green", "lost"], clip: "IMG_8300" },
    { id: "baiyin", rank: "A", suit: "♦", label: "1723m", chapter: "ch03", date: "2025-07-04", tags: ["altitude", "salary"], clip: "IMG_3484" },
    { id: "gulang", rank: "7", suit: "♦", label: "Gulang", chapter: "ch03", date: "2025-07-05", tags: ["route", "altitude"], clip: "IMG_3549" },
    { id: "yangxiang", rank: "Q", suit: "♦", label: "3119m", chapter: "ch03", date: "2025-07-06", tags: ["route", "altitude"], clip: "IMG_3612" },
    { id: "qilian", rank: "K", suit: "♦", label: "3752m", chapter: "ch03", date: "2025-07-07", tags: ["altitude", "weight"], clip: "IMG_3810" },
    { id: "xining", rank: "3", suit: "♦", label: "05:47 road", chapter: "ch03", date: "2025-07-09", tags: ["route", "morning"], clip: "IMG_3940" },
    { id: "ascot", rank: "A", suit: "♣", label: "Ascot", chapter: "ch04", date: "2025-08-22", tags: ["brisbane", "arrival"], clip: "IMG_5523" },
    { id: "morning", rank: "7", suit: "♣", label: "07:10", chapter: "ch04", date: "2025-08-23", tags: ["sun", "commute"], clip: "IMG_5521" },
    { id: "river", rank: "Q", suit: "♣", label: "river mesh", chapter: "ch04", date: "2026-05-14", tags: ["river", "motion"], clip: "IMG_6010" },
    { id: "morningside", rank: "K", suit: "♣", label: "Morningside", chapter: "ch04", date: "2026-05-14", tags: ["brisbane", "routine"], clip: "IMG_3483" },
    { id: "sun", rank: "3", suit: "♣", label: "sun fixed", chapter: "ch04", date: "2026-05-14", tags: ["sun", "glare"], clip: "IMG_5671" },
    { id: "blur", rank: "J", suit: "♠", label: "blur", chapter: "ch00", date: "2024-01-01", tags: ["blur", "memory"] },
    { id: "clear", rank: "J", suit: "♦", label: "clear", chapter: "ch00", date: "2026-05-14", tags: ["clear", "system"] },
    { id: "deadline", rank: "9", suit: "♦", label: "deadline", chapter: "ch03", date: "2025-07-01", tags: ["deadline", "weight"] },
    { id: "freedom", rank: "9", suit: "♥", label: "freedom", chapter: "ch02", date: "2024-07-04", tags: ["freedom", "lost"] },
  ];
}

function renderArchiveCard(entry, index) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "playing-card archive-card";
  if (entry.suit === "♥" || entry.suit === "♦") card.classList.add("is-red");
  card.dataset.rank = entry.rank;
  card.dataset.suit = entry.suit;
  card.style.setProperty("--x", `${(index % 6) * 88}px`);
  card.style.setProperty("--y", `${Math.floor(index / 6) * 72}px`);
  card.innerHTML = `
    <span class="card-corner">${entry.rank}${entry.suit}</span>
    <strong>${entry.label}</strong>
    <em>${entry.date.slice(2, 10).replaceAll("-", ".")}</em>
  `;
  return card;
}

function evaluateArchiveSet(cards) {
  if (cards.length < 2 || cards.length > 3) {
    return { ok: false, message: "Two or three cards. The table dislikes monologues." };
  }
  const hasGlitch = cards.some((entry) => entry.tags.includes("glitch"));
  const sameRank = cards.length === 2 && cards[0].rank === cards[1].rank;
  const sameSuit = cards.length === 2 && cards[0].suit === cards[1].suit;
  const contradiction = cards.length === 2 && isCardContradiction(cards[0], cards[1]);
  const route = cards.length === 3 && cards.every((entry) => entry.chapter === cards[0].chapter) && cards[0].chapter !== "ch00";
  const sequence = cards.length === 3 && [...cards].sort((a, b) => a.date.localeCompare(b.date)).every((entry, index) => entry === cards[index]);

  if (hasGlitch && cards.length === 2) {
    return {
      ok: true,
      name: "glitch",
      order: 4,
      signal: -22,
      drift: 28,
      flash: true,
      chart: cards.some((entry) => entry.id === "nogps") ? "glitch" : null,
      message: "Glitch accepted. The rule was not fixed in place.",
    };
  }
  if (route) {
    return {
      ok: true,
      name: `${cards[0].chapter.toUpperCase()} route`,
      order: 22,
      signal: cards[0].chapter === "ch02" ? -8 : 5,
      drift: cards[0].chapter === "ch04" ? 12 : 6,
      chart: cards[0].chapter === "ch03" ? "altitude" : null,
      message: `${cards[0].chapter.toUpperCase()} route filed. ${cards[0].chapter === "ch02" ? "grass accepts no border." : "not a solution, just a line."}`,
    };
  }
  if (sequence) {
    return { ok: true, name: "chronology", order: 18, signal: 4, drift: 4, message: "Chronology behaved for one turn." };
  }
  if (contradiction) {
    return { ok: true, name: "contradiction", order: 8, signal: -3, drift: 18, message: `${cards[0].label} and ${cards[1].label}: both kept.` };
  }
  if (sameRank || sameSuit) {
    return { ok: true, name: sameRank ? "rank" : "suit", order: 10, signal: 3, drift: 3, message: sameRank ? "Same rank. A coincidence made useful." : "Same suit. A small shelf in the archive." };
  }
  return { ok: false, message: "No rule held. Try a suit, a rank, a route, or a contradiction." };
}

function isCardContradiction(a, b) {
  const pairs = [
    ["freedom", "deadline"],
    ["signal", "lost"],
    ["blur", "clear"],
    ["arrival", "routine"],
    ["window", "route"],
    ["sun", "night"],
  ];
  return pairs.some(([left, right]) =>
    (a.tags.includes(left) && b.tags.includes(right)) ||
    (a.tags.includes(right) && b.tags.includes(left))
  );
}

function cardsMeter(label, value) {
  return `<div><span>${label}</span><b>${tenBar(value / 100)}</b></div>`;
}

function cardsSummary(cs, reason) {
  const mood = cs.drift > 70 ? "drifting" : cs.order > 70 ? "almost organized" : cs.signal < 35 ? "low signal" : "locally stable";
  const last = cs.played.slice(-3).join(" / ") || "none";
  return [
    `SESSION SUMMARY - ${reason}`,
    `routes/rules made: ${cs.moves}`,
    `last sets: ${last}`,
    `archive mood: ${mood}`,
    "nothing solved. table lighter.",
  ].join("\n");
}

function shuffleCards(cards) {
  const next = [...cards];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function openHiddenChartWindow(mode = "motion") {
  const existing = findWindowById("chart");
  if (existing) {
    restoreDesktopWindow(existing);
    bringWindowForward(existing);
    renderHiddenChart(existing, mode);
    return existing;
  }
  const shell = document.createElement("div");
  shell.className = "chart-panel os-window-body";
  shell.innerHTML = `
    <div class="chart-toolbar">
      <div>chart.tmp</div>
      <span>hidden line data</span>
    </div>
    <canvas class="chart-canvas" width="560" height="260"></canvas>
    <div class="chart-tabs">
      <button data-chart="luminance">lum</button>
      <button data-chart="motion">motion</button>
      <button data-chart="glitch">glitch</button>
      <button data-chart="altitude">alt</button>
    </div>
    <pre class="chart-caption"></pre>
  `;
  const win = createSizedDesktopWindow("chart.tmp", shell, "desktop-window-chart");
  shell.querySelectorAll("[data-chart]").forEach((button) => {
    button.addEventListener("click", () => renderHiddenChart(win, button.dataset.chart));
  });
  mountDesktopWindow(win, { id: "chart", kind: "object", ...placeInSafeArea(610, 430, 0.68, 0.22, contentSafeRect(18)) });
  requestAnimationFrame(() => renderHiddenChart(win, mode));
  return win;
}

function renderHiddenChart(win, mode = "motion") {
  const canvas = win.querySelector(".chart-canvas");
  const caption = win.querySelector(".chart-caption");
  if (!canvas || !caption) return;
  const ctx = canvas.getContext("2d");
  const clips = Object.keys(state.signal || {}).sort((a, b) => String(state.signal[a].local_time).localeCompare(String(state.signal[b].local_time)));
  const points = clips.map((clip) => {
    const sig = state.signal[clip] || {};
    const value = {
      luminance: sig.rgb?.luminance_mean,
      motion: sig.rgb?.motion_score,
      glitch: sig.glitch_weight,
      altitude: sig.altitude_m,
    }[mode];
    return { clip, value: Number(value) };
  }).filter((point) => Number.isFinite(point.value));
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFF4D7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(74,62,42,0.22)";
  ctx.lineWidth = 1;
  for (let x = 30; x < canvas.width; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 18); ctx.lineTo(x, canvas.height - 28); ctx.stroke();
  }
  for (let y = 30; y < canvas.height; y += 44) {
    ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(canvas.width - 18, y); ctx.stroke();
  }
  ctx.strokeStyle = currentChapterColor();
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = 28 + (index / Math.max(1, points.length - 1)) * (canvas.width - 56);
    const ratio = (point.value - min) / Math.max(0.0001, max - min);
    const y = canvas.height - 30 - ratio * (canvas.height - 54);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.fillStyle = "#1A1208";
  ctx.font = "10px IBM Plex Mono, monospace";
  ctx.fillText(`${mode.toUpperCase()} / ${points.length} clips / min ${min.toFixed(3)} / max ${max.toFixed(3)}`, 28, 16);
  caption.textContent = `${mode} is not an explanation. It is only what the phone admitted.`;
  win.querySelectorAll("[data-chart]").forEach((button) => button.classList.toggle("is-active", button.dataset.chart === mode));
}

function newChessState() {
  return {
    board: [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ],
    turn: "white",
    selected: null,
    captured: { white: [], black: [] },
    aiThinking: false,
    message: "White to move. The archive waits for a first gesture.",
    moveLog: [],
  };
}

function renderChess(win) {
  const cs = win.chessState;
  const board = win.querySelector(".chess-board");
  const captured = win.querySelector(".chess-captured");
  const message = win.querySelector(".chess-message");
  const turn = win.querySelector(".chess-footer span");
  board.innerHTML = "";
  cs.board.forEach((row, y) => {
    row.forEach((piece, x) => {
      const square = document.createElement("button");
      square.type = "button";
      square.className = "chess-square";
      square.classList.toggle("is-dark", (x + y) % 2 === 1);
      square.classList.toggle("is-selected", cs.selected?.x === x && cs.selected?.y === y);
      square.textContent = chessGlyph(piece);
      square.addEventListener("click", () => handleChessSquare(win, x, y));
      board.appendChild(square);
    });
  });
  message.textContent = cs.message || "Move a piece.";
  captured.textContent = [
    `captured white: ${cs.captured.white.map(chessGlyph).join(" ") || "—"}`,
    `captured black: ${cs.captured.black.map(chessGlyph).join(" ") || "—"}`,
    `last moves: ${cs.moveLog.slice(-3).join(" / ") || "—"}`,
  ].join("\n");
  turn.textContent = cs.aiThinking ? "BLACK THINKING..." : `${cs.turn.toUpperCase()}'S TURN / no check detection`;
}

function handleChessSquare(win, x, y) {
  const cs = win.chessState;
  if (cs.aiThinking || cs.turn !== "white") return;
  const piece = cs.board[y][x];
  if (!cs.selected) {
    if (piece && chessColor(piece) === cs.turn) {
      cs.selected = { x, y };
      cs.message = `Selected ${chessGlyph(piece)} at ${chessSquareName(x, y)}. Choose where time should move it.`;
    } else {
      cs.message = "That square is quiet. Choose one of the white pieces.";
    }
    renderChess(win);
    return;
  }
  const from = cs.selected;
  const moving = cs.board[from.y][from.x];
  if (from.x === x && from.y === y) {
    cs.selected = null;
    renderChess(win);
    return;
  }
  if (piece && chessColor(piece) === cs.turn) {
    cs.selected = { x, y };
    cs.message = `Selected ${chessGlyph(piece)} at ${chessSquareName(x, y)}.`;
    renderChess(win);
    return;
  }
  if (isLegalChessMove(cs.board, from.x, from.y, x, y)) {
    applyChessMoveToState(cs, { sx: from.x, sy: from.y, tx: x, ty: y, captures: !!piece });
    cs.selected = null;
    cs.aiThinking = true;
    renderChess(win);
    setTimeout(() => {
      if (!document.body.contains(win) || !win.chessState || win.chessState !== cs) return;
      const aiMove = getAIMove(cs.board, 2);
      if (aiMove) applyChessMoveToState(cs, aiMove);
      else cs.message = "Black has no obvious reply. The board exhales.";
      cs.aiThinking = false;
      cs.turn = "white";
      renderChess(win);
    }, 500);
    return;
  }
  cs.selected = null;
  cs.message = `Illegal path from ${chessSquareName(from.x, from.y)} to ${chessSquareName(x, y)}. The archive refuses that edit.`;
  renderChess(win);
}

function applyChessMoveToState(cs, move) {
  const moving = cs.board[move.sy][move.sx];
  const target = cs.board[move.ty][move.tx];
  if (target) cs.captured[chessColor(target)].push(target);
  cs.board[move.ty][move.tx] = promoteChessPiece(moving, move.ty);
  cs.board[move.sy][move.sx] = "";
  cs.turn = chessColor(moving) === "white" ? "black" : "white";
  const notation = `${chessGlyph(moving)} ${chessSquareName(move.sx, move.sy)}→${chessSquareName(move.tx, move.ty)}${target ? ` takes ${chessGlyph(target)}` : ""}`;
  cs.moveLog.push(notation);
  cs.message = chessColor(moving) === "white"
    ? `${notation}. The page notices: a small decision has become visible.`
    : `${notation}. Black answers from the other side of the window.`;
}

function chessSquareName(x, y) {
  return `${"abcdefgh"[x] || "?"}${8 - y}`;
}

function promoteChessPiece(piece, y) {
  if (piece === "P" && y === 0) return "Q";
  if (piece === "p" && y === 7) return "q";
  return piece;
}

function chessGlyph(piece) {
  return {
    K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
    k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
  }[piece] || "";
}

function chessColor(piece) {
  return piece === piece.toUpperCase() ? "white" : "black";
}

function isLegalChessMove(board, sx, sy, tx, ty) {
  const piece = board[sy][sx];
  if (!piece || (sx === tx && sy === ty)) return false;
  const target = board[ty]?.[tx];
  if (typeof target === "undefined" || (target && chessColor(target) === chessColor(piece))) return false;
  const dx = tx - sx;
  const dy = ty - sy;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  const lower = piece.toLowerCase();
  if (lower === "p") {
    const dir = chessColor(piece) === "white" ? -1 : 1;
    const start = chessColor(piece) === "white" ? 6 : 1;
    if (dx === 0 && dy === dir && !target) return true;
    if (dx === 0 && sy === start && dy === dir * 2 && !target && !board[sy + dir][sx]) return true;
    return adx === 1 && dy === dir && !!target;
  }
  if (lower === "n") return (adx === 1 && ady === 2) || (adx === 2 && ady === 1);
  if (lower === "k") return adx <= 1 && ady <= 1;
  if (lower === "b") return adx === ady && chessPathClear(board, sx, sy, tx, ty);
  if (lower === "r") return (dx === 0 || dy === 0) && chessPathClear(board, sx, sy, tx, ty);
  if (lower === "q") return (adx === ady || dx === 0 || dy === 0) && chessPathClear(board, sx, sy, tx, ty);
  return false;
}

function chessPathClear(board, sx, sy, tx, ty) {
  const stepX = Math.sign(tx - sx);
  const stepY = Math.sign(ty - sy);
  let x = sx + stepX;
  let y = sy + stepY;
  while (x !== tx || y !== ty) {
    if (board[y][x]) return false;
    x += stepX;
    y += stepY;
  }
  return true;
}

function getAIMove(board, depth = 2) {
  const moves = getAllLegalMoves(board, "black");
  if (!moves.length) return null;
  let bestMove = moves[0];
  let bestScore = -Infinity;
  let alpha = -Infinity;
  const beta = Infinity;
  moves.forEach((move) => {
    const nextBoard = applyChessMoveToBoard(board, move);
    const score = minimaxChess(nextBoard, depth - 1, false, alpha, beta);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    alpha = Math.max(alpha, bestScore);
  });
  return bestMove;
}

function minimaxChess(board, depth, maximizingBlack, alpha, beta) {
  if (depth <= 0) return evaluateChessBoard(board);
  const color = maximizingBlack ? "black" : "white";
  const moves = getAllLegalMoves(board, color);
  if (!moves.length) return evaluateChessBoard(board);
  if (maximizingBlack) {
    let best = -Infinity;
    for (const move of moves) {
      best = Math.max(best, minimaxChess(applyChessMoveToBoard(board, move), depth - 1, false, alpha, beta));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }
  let best = Infinity;
  for (const move of moves) {
    best = Math.min(best, minimaxChess(applyChessMoveToBoard(board, move), depth - 1, true, alpha, beta));
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

function getAllLegalMoves(board, color) {
  const moves = [];
  for (let sy = 0; sy < 8; sy += 1) {
    for (let sx = 0; sx < 8; sx += 1) {
      const piece = board[sy][sx];
      if (!piece || chessColor(piece) !== color) continue;
      for (let ty = 0; ty < 8; ty += 1) {
        for (let tx = 0; tx < 8; tx += 1) {
          if (!isLegalChessMove(board, sx, sy, tx, ty)) continue;
          moves.push({ sx, sy, tx, ty, captures: !!board[ty][tx] });
        }
      }
    }
  }
  return moves.sort((a, b) => Number(b.captures) - Number(a.captures));
}

function applyChessMoveToBoard(board, move) {
  const next = board.map((row) => [...row]);
  const moving = next[move.sy][move.sx];
  next[move.ty][move.tx] = promoteChessPiece(moving, move.ty);
  next[move.sy][move.sx] = "";
  return next;
}

function evaluateChessBoard(board) {
  const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  return board.flat().reduce((score, piece) => {
    if (!piece) return score;
    const value = values[piece.toLowerCase()] || 0;
    return score + (chessColor(piece) === "black" ? value : -value);
  }, 0);
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
  const openCount = state.desktopWindows.filter(isWindowVisible).length + (isSearchWindowOpen() ? 1 : 0);
  shell.innerHTML = `
    <div class="profiler-head">
      <div>PROFILER</div>
      <span>${state.chapter.toUpperCase()} / ${state.currentClip || "NO CLIP"}</span>
    </div>
    <div class="profiler-grid">
      ${profilerMeter("CLIPS READ", clipsRead, 46)}
      ${profilerMeter("TEXT SEEN", textSeen, textTotal)}
      ${profilerMeter("WINDOWS", openCount, 8)}
      ${profilerMeter("TIME", Math.min(sessionSeconds(), 600), 600)}
    </div>
    <div class="profiler-process">
      <div><span>CHAPTERS</span><b>5</b></div>
      <div><span>CLIPS</span><b>46</b></div>
      <div><span>LOCATIONS</span><b>47</b></div>
      <div><span>OBJECTS</span><b>6</b></div>
      <div><span>FRAGMENTS</span><b>12</b></div>
      <div><span>DURATION</span><b>${sessionDuration()}</b></div>
    </div>
    <pre class="profiler-log">STATUS     RUNNING
MEMORY     OK
LAST SEEN  ${state.currentClip || "—"}
SESSION    LOCAL</pre>`;
}

function profilerMeter(label, current, total) {
  const ratio = Math.max(0, Math.min(1, current / Math.max(1, total)));
  const pct = Math.round(ratio * 100);
  return `<section class="profiler-meter">
    <div><span>${label}</span><b>${pct}%</b></div>
    <i style="--meter:${pct}%"></i>
    <code>${tenBar(ratio)}</code>
  </section>`;
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
  prev.addEventListener("click", () => turnNewsPage(win, -1));
  next.addEventListener("click", () => turnNewsPage(win, 1));
  footer.append(prev, next, Object.assign(document.createElement("span"), { textContent: `page ${win.newsPage} / ${total}` }));
  const scrollArea = document.createElement("div");
  scrollArea.className = "news-scroll";
  scrollArea.append(hrNode(), bodyWrap);
  shell.append(header, subtitle, scrollArea, footer);
}

function turnNewsPage(win = findWindowById("news"), direction = 1) {
  if (!win) return;
  const key = currentNewsKey();
  const content = window.NEWS_CONTENT?.[key] || window.NEWS_CONTENT?.CH00;
  const total = content?.pages || 1;
  win.newsPage = direction > 0
    ? (win.newsPage >= total ? 1 : win.newsPage + 1)
    : (win.newsPage <= 1 ? total : win.newsPage - 1);
  renderNewsWindow(win);
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
      tile.style.filter = "grayscale(100%) brightness(0.6) contrast(1.2) invert(0)";
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
  const label = L.marker([center.lat, center.lon], {
    interactive: false,
    icon: L.divIcon({
      className: "map-city-label",
      html: center.city || "",
      iconSize: [90, 16],
      iconAnchor: [-8, 8],
    }),
  }).addTo(map);
  win.leafletMap = map;
  win.mapMarker = marker;
  win.mapLabel = label;
  win.mapResizeObserver = new ResizeObserver(() => {
    setTimeout(() => map.invalidateSize(), 0);
  });
  win.mapResizeObserver.observe(win);
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
  if (win.mapLabel) {
    win.mapLabel.setLatLng(latLng);
    win.mapLabel.setIcon(L.divIcon({
      className: "map-city-label",
      html: center.city || "",
      iconSize: [90, 16],
      iconAnchor: [-8, 8],
    }));
  }
  if (fly) win.leafletMap.flyTo(latLng, center.zoom, { duration: 1.5 });
  else win.leafletMap.setView(latLng, center.zoom);
}

function teardownMapWindow(win) {
  win?.mapResizeObserver?.disconnect();
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
    "05 SEP 2025  06:26  BRISBANE",
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
    "meiyou_lajitong",
    "daohang_shixiao",
    "lekai_5112",
    "langshan",
    "dongjing_guangxue",
    "gongzi_maipiao",
    "dulun_wushifasheng",
    "jiyi_bianma",
    "xue_qian_xue_hou",
  ];
  return [...articles].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

function eyuListDate(article) {
  return {
    kaishi_sheying: "Sep 2024",
    shicha_diyi_juan: "Jan 2025",
    meiyou_lajitong: "May 2025",
    daohang_shixiao: "Jul 2024",
    lekai_5112: "Oct 2024",
    langshan: "2024",
    dongjing_guangxue: "Jan 2025",
    gongzi_maipiao: "Jul 2025",
    dulun_wushifasheng: "May 2026",
    jiyi_bianma: "Jan 2025",
    xue_qian_xue_hou: "2025",
  }[article.id] || article.date || "";
}

function eyuListTitle(article) {
  return {
    shicha_diyi_juan: "时差里的第一卷",
    dongjing_guangxue: "东京光学 50mm F2，和公园",
    jiyi_bianma: "漆黑的记忆编码",
    meiyou_lajitong: "没有垃圾桶的房间",
    daohang_shixiao: "导航失效的一点小事",
    gongzi_maipiao: "第一笔工资买掉了",
    dulun_wushifasheng: "渡轮上的无事发生",
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
  const target = event.target;
  const isTyping = target?.matches?.("input, textarea, [contenteditable='true']");
  const focused = document.querySelector(".desktop-window.is-focused");
  if (!isTyping && event.key === " ") {
    event.preventDefault();
    toggleMainVideoPlayback();
    return;
  }
  if (focused?.dataset.windowId === "news" && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    turnNewsPage(focused, event.key === "ArrowRight" ? 1 : -1);
    return;
  }
  if (event.key.toLowerCase() === "n" && state.chapter === "ch01") {
    triggerNyeInterrupt();
  }
  if (event.key === "Escape" && dom.interruptStage.classList.contains("is-active")) {
    exitInterrupt();
  }
}

function handleFirstUserInteraction() {
  state.userInteracted = true;
  state.mutedForAutoplay = false;
  dom.video.muted = false;
  dom.interruptVideo.muted = false;
  dom.video.volume = state.settings.audio.video;
  dom.interruptVideo.volume = state.settings.audio.video;
  dom.body.classList.add("is-unmuted");
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
    const weekday = now.toLocaleDateString("en-US", { weekday: "short" });
    const month = now.toLocaleDateString("en-US", { month: "short" });
    const day = String(now.getDate()).padStart(2, "0");
    const time = now.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: false });
    dom.clock.textContent = `${weekday} ${month} ${day} ${time}`;
    updateSystemReadout();
  };
  tick();
  setInterval(tick, 1000);
}

function updateSystemReadout() {
  if (!dom.systemReadout) return;
  dom.systemReadout.textContent = [
    "SYSTEM",
    `CHAPTER ${state.chapter.toUpperCase()}`,
    `CLIP    ${state.currentClip || "----"}`,
    `UPTIME  ${sessionDuration()}`,
    "MEM     OK",
  ].join("\n");
}

function runLocating() {
  startCh00BootLog();
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
      showCh00OnboardingDialog();
    }
  }

  requestAnimationFrame(step);
}

function startCh00BootLog() {
  if (!dom.ch00BootLog) return;
  clearInterval(state.ch00BootLogTimer);
  const entries = buildBootSequence().filter((entry) => entry.text !== "");
  const lines = [];
  let index = 0;
  dom.ch00BootLog.textContent = "";
  state.ch00BootLogTimer = setInterval(() => {
    lines.push(entries[index % entries.length].text);
    dom.ch00BootLog.textContent = lines.slice(-24).join("\n");
    dom.ch00BootLog.scrollTop = dom.ch00BootLog.scrollHeight;
    index += 1;
  }, 70);
}

function stopCh00BootLog() {
  clearInterval(state.ch00BootLogTimer);
  state.ch00BootLogTimer = null;
}

function showCh00OnboardingDialog() {
  stopCh00BootLog();
  showSystemDialog("■ in_praise_of_time", [
    "This is an archive.",
    "46 clips. 47 locations.",
    "2024 – 2026.",
    "",
    "Double-click desktop objects to open.",
    "Windows can be moved and resized.",
    "Type \"shutdown\" to end.",
  ], () => {
    sessionStorage.setItem("onboarding_ch01", "1");
    hardCut(() => activateChapter("ch01"));
  });
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
  if (chapter !== "ch00") stopCh00BootLog();

  if (chapter === "ch00") {
    dom.signalAcquired.classList.remove("is-active");
    dom.video.pause();
    dom.video.removeAttribute("src");
    dom.video.load();
    clearVideoHold();
    clearNarrativeTimers();
    hideNarrativeText();
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

function showSystemDialog(title, lines, onOk) {
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
  dialog.querySelector("button").addEventListener("click", () => {
    dialog.remove();
    if (onOk) onOk();
  });
  document.body.appendChild(dialog);
  dialog.querySelector("button").focus();
}

function updateDesktopObjectVisibility(chapter) {
  updateDockState();
}

function setPalette(spec) {
  dom.root.style.setProperty("--chapter-primary", spec.primary);
  dom.root.style.setProperty("--chapter-secondary", spec.secondary);
  dom.root.style.setProperty("--chapter-tertiary", spec.tertiary || "#888888");
}

function updateChrome(spec) {
  dom.chapterLabel.textContent = `${spec.code} / ${spec.label}`;
  dom.coordinates.textContent = spec.coordinates;
}

function updateNav(chapter) {
  dom.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.chapter === chapter);
  });
}

function setClip(clipKey) {
  if (!clipKey || !state.signal[clipKey]) return;
  clearVideoHold();
  state.currentClip = clipKey;
  const clip = state.signal[clipKey];

  applyVideoLayoutForClip(clipKey);
  dom.video.dataset.clip = clipKey;
  dom.video.loop = false;
  dom.video.muted = state.mutedForAutoplay;
  dom.video.volume = state.settings.audio.video;
  dom.video.src = clip.filename;
  dom.video.load();
  dom.video.play().catch(() => {});

  updateMonitor(clip);
  updateRouteCurrent();
  updateAmbientGain(clip);
  handleGpsLost(clipKey);
  showNextNarrativeText();
  updateVideoControls();
  updateFinderWindow();
  updateSystemReadout();
}

function applyVideoLayoutForClip(clipKey) {
  const shell = dom.crtShell;
  if (!shell) return;
  clearTimeout(state.ch04DriftTimer);
  state.ch04DriftTimer = null;
  shell.tabIndex = 0;
  shell.style.transition = "none";
  shell.style.right = "";
  shell.style.bottom = "";
  const safe = contentSafeRect(14);
  const setBox = (width, left, top) => {
    const height = width * 9 / 16 + 24;
    const fitted = fitRect(width, height, safe);
    const pos = clampToRect(left, top, fitted.width, fitted.height, safe);
    shell.style.width = `${Math.round(fitted.width)}px`;
    shell.style.left = `${pos.left}px`;
    shell.style.top = `${pos.top}px`;
    shell.style.transform = "none";
  };
  if (state.chapter === "ch01") {
    const box = placeInSafeArea(620, 372, 0.18, 0.05, safe);
    setBox(box.width, box.left, box.top);
    return;
  }
  if (state.chapter === "ch02") {
    if (state.clipIndex === 0) {
      const box = placeInSafeArea(720, 440, 0.18, 0.24, safe);
      setBox(box.width, box.left, box.top);
    } else {
      const width = randomInt(620, Math.min(780, safe.right - safe.left - 40));
      setBox(width, randomBetween(safe.left + 80, safe.right - width - 80), randomBetween(safe.top + 70, safe.bottom - width * 9 / 16 - 90));
    }
    return;
  }
  if (state.chapter === "ch03") {
    const chartRight = safe.left + Math.min(500, (safe.right - safe.left) * 0.34);
    const width = Math.min(720, Math.max(660, (safe.right - chartRight) * 0.62));
    const left = chartRight + ((safe.right - chartRight) - width) / 2;
    const top = safe.top + Math.max(38, (safe.bottom - safe.top - (width * 9 / 16 + 24)) * 0.20);
    setBox(width, left, top);
    return;
  }
  if (state.chapter === "ch04") {
    if (state.clipIndex === 0) {
      const box = placeInSafeArea(680, 406, 0.20, 0.12, safe);
      setBox(box.width, box.left, box.top);
    } else {
      const width = randomInt(520, Math.min(720, safe.right - safe.left - 40));
      setBox(width, randomBetween(safe.left + 120, safe.right - width - 60), randomBetween(safe.top + 55, safe.bottom - width * 9 / 16 - 80));
    }
    state.ch04DriftTimer = setTimeout(() => driftCh04VideoWindow(), 10000);
    return;
  }
  const box = placeInSafeArea(520, 316, 0.34, 0.28, safe);
  setBox(box.width, box.left, box.top);
}

function driftCh04VideoWindow() {
  if (state.chapter !== "ch04" || !dom.crtShell) return;
  const rect = dom.crtShell.getBoundingClientRect();
  const safe = contentSafeRect(8);
  const distance = 30;
  const angle = Math.random() * Math.PI * 2;
  const next = clampToRect(rect.left + Math.cos(angle) * distance, rect.top + Math.sin(angle) * distance, rect.width, rect.height, safe);
  dom.crtShell.style.transition = "left 12s linear, top 12s linear";
  dom.crtShell.style.left = `${next.left}px`;
  dom.crtShell.style.top = `${next.top}px`;
}

function randomInt(min, max) {
  return Math.round(randomBetween(min, max));
}

function randomBetween(min, max) {
  return min + Math.random() * Math.max(0, max - min);
}

function onVideoEnded() {
  if (state.wasInterrupted) return;
  startVideoHold();
}

function startVideoHold() {
  clearVideoHold();
  state.isVideoHold = true;
  dom.crtFrame.classList.add("is-holding");
  updateVideoControls();
  state.videoHoldTimer = setTimeout(finishVideoHold, 1500);
}

function clearVideoHold() {
  clearTimeout(state.videoHoldTimer);
  state.videoHoldTimer = null;
  state.isVideoHold = false;
  dom.crtFrame?.classList.remove("is-holding");
}

function finishVideoHold() {
  if (!state.isVideoHold) return;
  clearVideoHold();
  advanceClip();
}

function toggleMainVideoPlayback() {
  if (state.isVideoHold) {
    finishVideoHold();
    return;
  }
  if (dom.video.paused) dom.video.play().catch(() => {});
  else dom.video.pause();
  updateVideoControls();
}

function updateVideoControls() {
  if (!dom.videoToggle || !dom.videoTime) return;
  dom.videoToggle.textContent = dom.video.paused || state.isVideoHold ? "[▶]" : "[‖]";
  dom.videoTime.textContent = `${formatMediaTime(dom.video.currentTime)} / ${formatMediaTime(dom.video.duration)}`;
}

function formatMediaTime(seconds) {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function showNextNarrativeText() {
  clearNarrativeTimers();
  hideNarrativeText();
  const chapter = state.chapter;
  const texts = NARRATIVE_TEXTS[chapter] || [];
  if (!texts.length) return;
  const next = nextTextIndex(chapter, texts.length);
  const target = narrativeTargetForText(chapter, next);
  if (!target) return;
  const content = texts[next % texts.length];
  const body = target.querySelector("[data-text-body]") || target.querySelector(":scope > div:last-child") || target;
  body.textContent = content;
  positionNarrativeTarget(target, chapter, next);
  target.classList.remove("is-fading");
  target.classList.add("is-visible", "is-entering");
  requestAnimationFrame(() => target.classList.remove("is-entering"));
  state.textTimer = setTimeout(() => {
    target.classList.add("is-fading");
    state.textFadeTimer = setTimeout(() => {
      target.classList.remove("is-visible", "is-fading");
      body.textContent = "";
      if (state.chapter === chapter) showNextNarrativeText();
    }, 800);
  }, 7000);
}

function nextTextIndex(chapter, count) {
  const last = state.textCycle[chapter] ?? -1;
  if (count <= 1) {
    state.textCycle[chapter] = 0;
    return 0;
  }
  let next = (last + 1) % count;
  if (next === last) next = (next + 1) % count;
  state.textCycle[chapter] = next;
  return next;
}

function narrativeTargetsForChapter(chapter) {
  if (chapter === "ch01") return [...document.querySelectorAll(".text-slot")];
  if (chapter === "ch02") return [document.querySelector(".text-slot-top")].filter(Boolean);
  if (chapter === "ch03") {
    const selectors = state.currentClip === "IMG_3810" || state.currentClip === "IMG_3773"
      ? ".ch03-box-c"
      : ".ch03-box-a, .ch03-box-b";
    return [...document.querySelectorAll(selectors)];
  }
  if (chapter === "ch04") return [...document.querySelectorAll(".ch04-box")];
  return [];
}

function narrativeTargetForText(chapter, index) {
  if (chapter === "ch01") return document.querySelector(".text-slot-top");
  if (chapter === "ch02") return document.querySelector(".text-slot-top");
  if (chapter === "ch03") {
    if (index === 0) return document.querySelector(".ch03-box-a");
    if (index === 1) return document.querySelector(".ch03-box-b");
    return document.querySelector(".ch03-box-c");
  }
  if (chapter === "ch04") return document.querySelector(".ch04-box");
  return null;
}

function positionNarrativeTarget(target, chapter, index) {
  const safe = contentSafeRect(18);
  if (chapter === "ch01") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    const controlRect = document.getElementById("video-control-bar")?.getBoundingClientRect();
    const width = Math.min(660, Math.max(420, (safe.right - safe.left) * 0.44));
    const estimatedHeight = 98;
    const left = videoRect
      ? videoRect.left + Math.max(0, (videoRect.width - width) / 2)
      : safe.left + 44;
    const top = controlRect ? controlRect.bottom + 18 : safe.top + 58;
    const pos = clampToRect(left, top, width, estimatedHeight, safe);
    Object.assign(target.style, { left: `${pos.left}px`, top: `${pos.top}px`, right: "", bottom: "", transform: "", maxWidth: `${width}px` });
    return;
  }
  if (chapter === "ch02") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    let left = safe.left + 30;
    let top = safe.top + 30;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      left = randomInt(safe.left + 24, Math.max(safe.left + 30, safe.right - 500));
      top = randomInt(safe.top + 24, Math.max(safe.top + 40, safe.bottom - 190));
      if (!videoRect || left + 460 < videoRect.left || left > videoRect.right || top + 150 < videoRect.top || top > videoRect.bottom) break;
    }
    const pos = clampToRect(left, top, 460, 160, safe);
    Object.assign(target.style, { left: `${pos.left}px`, top: `${pos.top}px`, right: "", bottom: "", transform: "", maxWidth: "460px" });
    return;
  }
  if (chapter === "ch04") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    const width = Math.min(440, Math.max(340, (safe.right - safe.left) * 0.30));
    const left = videoRect ? videoRect.left + videoRect.width * 0.58 : safe.right - width - 150;
    const top = videoRect ? videoRect.bottom + 26 : safe.top + 86;
    const pos = clampToRect(left, top, width, 140, safe);
    Object.assign(target.style, { left: `${pos.left}px`, right: "", bottom: "", top: `${pos.top}px`, transform: "", maxWidth: `${width}px` });
    return;
  }
  if (chapter === "ch03") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    const chartRight = safe.left + Math.min(520, (safe.right - safe.left) * 0.36);
    const x = chartRight + 48;
    const width = Math.min(540, Math.max(360, safe.right - x - 34));
    const y = videoRect ? videoRect.bottom + 26 : safe.bottom - 150;
    const pos = clampToRect(x, y, width, 128, safe);
    Object.assign(target.style, { left: `${pos.left}px`, top: `${pos.top}px`, right: "", bottom: "", transform: "", maxWidth: `${width}px` });
  }
}

function altitudeToViewportY(altitude) {
  const safe = contentSafeRect(18);
  const top = safe.top;
  const height = Math.max(420, safe.bottom - safe.top);
  const ratio = Math.max(0, Math.min(1, (Number(altitude) - 1400) / (4000 - 1400)));
  return top + height - 40 - ratio * (height - 80);
}

function clearNarrativeTimers() {
  clearTimeout(state.textTimer);
  clearTimeout(state.textFadeTimer);
  state.textTimer = null;
  state.textFadeTimer = null;
}

function hideNarrativeText() {
  document.querySelectorAll(".text-slot, .boxed-text").forEach((node) => {
    node.classList.remove("is-visible", "is-fading");
  });
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
  const returnChapter = CHAPTERS[state.chapter] && state.chapter !== "ch00" ? state.chapter : "ch04";
  const returnSpec = CHAPTERS[returnChapter];
  const hasCurrentClip = returnSpec?.clips.includes(state.currentClip);
  state.interruptReturn = {
    chapter: returnChapter,
    clip: hasCurrentClip ? state.currentClip : returnSpec?.clips[0],
    clipIndex: hasCurrentClip ? state.clipIndex : 0,
    time: hasCurrentClip ? dom.video.currentTime || 0 : 0,
  };
  state.previousChapter = state.interruptReturn.chapter;
  state.chapter = "int";
  sessionStorage.setItem("last_chapter", returnChapter);
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
  const local = clipDisplayTime(clip);
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
  renderMonitorWindow(findWindowById("monitor"), clip);
}

function renderMonitorWindow(win, clip) {
  if (!win || !clip) return;
  const rgb = clip.rgb || {};
  const fields = {
    clip: clip.clip || "----",
    local: `${clipDisplayTime(clip)} / ${(clip.location || "----").replace("New York City, US", "NYC")}`,
    gps: clip.glitch_weight >= 1 ? "NO GPS" : `SIG ${(1 - clip.glitch_weight).toFixed(2)}`,
    altitude: Number.isFinite(clip.altitude_m) ? `${Math.round(clip.altitude_m)}m` : "----",
    log: [
      `chapter: ${state.chapter.toUpperCase()}`,
      `ios: ${clip.ios || "----"}`,
      `file: ${clip.filename || "----"}`,
      `place: ${clip.location || "----"}`,
    ].join("\n"),
  };
  Object.entries(fields).forEach(([key, value]) => {
    const node = win.querySelector(`[data-monitor-field="${key}"]`);
    if (node) node.textContent = value;
  });
  const meters = {
    SIGNAL: 1 - (Number(clip.glitch_weight) || 0),
    LUMINANCE: Number(rgb.luminance_mean) || 0,
    MOTION: Math.min(1, (Number(rgb.motion_score) || 0) * 4),
    GLITCH: Number(clip.glitch_weight) || 0,
    "RMS PEAK": Math.min(1, (Number(clip.rms_peak) || 0) * 3),
  };
  Object.entries(meters).forEach(([label, value]) => {
    const meter = win.querySelector(`[data-monitor-meter="${label}"]`);
    if (!meter) return;
    const clamped = Math.max(0, Math.min(1, value));
    meter.querySelector("b").textContent = clamped.toFixed(2);
    meter.querySelector("i").style.setProperty("--meter", `${Math.round(clamped * 100)}%`);
  });
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

  // Sequential altitude profile: X = clip index (0…N-1), Y = altitude
  const clips = CHAPTERS.ch03.clips
    .map((key) => state.signal[key])
    .filter(Boolean);

  const SVG_W = 320;
  const SVG_H = Math.max(500, window.innerHeight - 100);
  const PAD_L = 52;
  const PAD_R = 16;
  const PAD_T = 36;
  const PAD_B = 44;
  const chartW = SVG_W - PAD_L - PAD_R;
  const chartH = SVG_H - PAD_T - PAD_B;

  dom.route.setAttribute("viewBox", `0 0 ${SVG_W} ${SVG_H}`);

  const ns = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };

  const MIN_ALT = 1400;
  const MAX_ALT = 4100;
  const mapX = (i) => PAD_L + (clips.length < 2 ? chartW / 2 : (i / (clips.length - 1)) * chartW);
  const mapY = (alt) => PAD_T + chartH - ((alt - MIN_ALT) / (MAX_ALT - MIN_ALT)) * chartH;

  // Chart title
  const title = el("text", { x: PAD_L, y: 18, class: "route-title" });
  title.textContent = "ALTITUDE PROFILE / CH03";
  dom.route.appendChild(title);

  // Horizontal grid lines + Y-axis labels
  [1500, 2000, 2500, 3000, 3500, 4000].forEach((alt) => {
    const y = mapY(alt);
    dom.route.appendChild(el("line", {
      x1: PAD_L, y1: y, x2: PAD_L + chartW, y2: y,
      class: "route-grid-line"
    }));
    const lbl = el("text", { x: PAD_L - 6, y: y + 4, class: "route-axis-label", "text-anchor": "end" });
    lbl.textContent = `${alt}`;
    dom.route.appendChild(lbl);
  });

  // Y-axis unit label
  const unitLbl = el("text", {
    x: 10, y: PAD_T + chartH / 2, class: "route-axis-label",
    "text-anchor": "middle",
    transform: `rotate(-90, 10, ${PAD_T + chartH / 2})`
  });
  unitLbl.textContent = "ALT (m)";
  dom.route.appendChild(unitLbl);

  // Y axis line
  dom.route.appendChild(el("line", {
    x1: PAD_L, y1: PAD_T, x2: PAD_L, y2: PAD_T + chartH,
    class: "route-axis-line"
  }));

  // X axis line
  dom.route.appendChild(el("line", {
    x1: PAD_L, y1: PAD_T + chartH, x2: PAD_L + chartW, y2: PAD_T + chartH,
    class: "route-axis-line"
  }));

  if (clips.length === 0) return;

  const pts = clips.map((clip, i) => ({
    clip,
    x: mapX(i),
    y: mapY(Number(clip.altitude_m || clip.altitude || MIN_ALT)),
    i,
  }));

  // Filled area under curve
  const areaPoints =
    `${PAD_L},${PAD_T + chartH} ` +
    pts.map((p) => `${p.x},${p.y}`).join(" ") +
    ` ${PAD_L + chartW},${PAD_T + chartH}`;
  dom.route.appendChild(el("polygon", { points: areaPoints, class: "route-area" }));

  // Polyline
  dom.route.appendChild(el("polyline", {
    points: pts.map((p) => `${p.x},${p.y}`).join(" "),
    class: "route-line"
  }));

  // Dots + time labels (alternating above/below)
  pts.forEach((p, i) => {
    const isCurrent = p.clip.clip === state.currentClip;
    const dot = el("circle", {
      cx: p.x, cy: p.y,
      r: isCurrent ? "7" : "4",
      class: `route-dot${isCurrent ? " is-current" : ""}`,
      "data-clip": p.clip.clip,
    });
    dom.route.appendChild(dot);

    // Show time label every other point to avoid clutter
    if (i % 2 === 0 || isCurrent || clips.length <= 6) {
      const timeStr = clipDisplayLocalTime(p.clip)?.slice(11, 16) || "--:--";
      const above = i % 2 === 0;
      const lbl = el("text", {
        x: p.x, y: p.y + (above ? -10 : 16),
        class: `route-label${isCurrent ? " route-label-current" : ""}`,
        "text-anchor": "middle",
      });
      lbl.textContent = timeStr;
      dom.route.appendChild(lbl);
    }
  });
}

function updateRouteCurrent() {
  if (state.chapter !== "ch03") return;
  [...dom.route.querySelectorAll(".route-dot")].forEach((dot) => {
    const current = dot.dataset.clip === state.currentClip;
    dot.classList.toggle("is-current", current);
    dot.setAttribute("r", current ? "6" : "5");
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
