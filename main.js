const MANIFEST_URL = "signal_data/MANIFEST.json";
const MEDIA_ARCHIVE_URL = "signal_data/media_archive_index.json";
const GITHUB_MEDIA_BASE_URL = "https://media.githubusercontent.com/media/dpan538/in_praiseof_time/main/";
const ROOT_ARCHIVE_MEDIA_RE = /\.(mov|mp4|m4v|webm|jpg|jpeg|png|gif|webp|heic)$/i;

function isProductionArchiveHost() {
  return /(^|\.)inpraiseoftime\.site$/.test(location.hostname) || /(^|\.)vercel\.app$/.test(location.hostname);
}

function archiveMediaSrc(file) {
  if (!file || typeof file !== "string") return file;
  if (/^(https?:|data:|blob:)/i.test(file)) return file;
  if (!isProductionArchiveHost()) return file;
  if (file.includes("/") || !ROOT_ARCHIVE_MEDIA_RE.test(file)) return file;
  return `${GITHUB_MEDIA_BASE_URL}${encodeURIComponent(file)}`;
}

function safeSessionArray(key) {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    sessionStorage.removeItem(key);
    return [];
  }
}

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
    label: "HOMETOWN",
    primary: "#FFB02E",
    secondary: "#1A1208",
    coordinates: "31.9840, 120.9316",
    clips: [],
  },
  ch04: {
    code: "CHAPTER 04",
    label: "ASCENT",
    primary: "#45D7D0",
    secondary: "#323232",
    tertiary: "#888888",
    coordinates: "37.3300, 101.4005",
    clips: ["IMG_3484", "IMG_3549", "IMG_3551", "IMG_3567", "IMG_3612", "IMG_3618", "IMG_3626", "IMG_3676", "IMG_3682", "IMG_3727", "IMG_3773", "IMG_3798", "IMG_3810", "IMG_3840", "IMG_3940", "IMG_8863"],
  },
  ch05: {
    code: "CHAPTER 05",
    label: "BRISBANE",
    primary: "#F39A13",
    secondary: "#1A1208",
    coordinates: "-27.4431, 153.0639",
    clips: ["IMG_5523", "IMG_5521", "IMG_5671", "IMG_6010", "IMG_3483"],
  },
  ch06: {
    code: "CHAPTER 06",
    label: "AFTERIMAGE",
    primary: "#F0F0F0",
    secondary: "#1A1208",
    coordinates: "NO GPS / AFTER SEEING",
    clips: [],
  },
  after: {
    code: "CHAPTER AFTER",
    label: "TXT",
    primary: "#F0F0F0",
    secondary: "#1A1208",
    coordinates: "TEXT STILL RUNNING",
    clips: [],
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

const AUTO_CHAPTER_ORDER = ["ch01", "ch02", "ch03", "ch04", "ch05", "ch06", "after"];

const BOOT_SEQUENCE_BASE = [
  { text: "in_praise_of_time", delay: 0 },
  { text: "v1.0.0", delay: 600 },
  { text: "", delay: 400 },
  { text: "loading archive...", delay: 200 },
  { text: "MANIFEST.json        OK", delay: 500 },
  { text: "environment.json     OK", delay: 200 },
];

const CH00_LOCATING_DURATION = 10000;
const CH00_COORDINATE_WINDOW = 2400;
const CH00_MONOLOGUE_INTERVAL = 2300;
const CH00_MONOLOGUE_LINES = [
  "重新确定位置。",
  "房间还暗着。\n坐标先醒。",
  "窗外有河，有雪，有一条没有说完的路。",
  "我把黑影放回墙上。\n把时间放回地图里。",
];

const CH00_LOCATION_SCAN = [
  { label: "Manhattan / same window", lat: 40.7194, lon: -73.9896, note: "room, glass, winter" },
  { label: "Daqing / oil plain", lat: 46.5893, lon: 125.1038, note: "north route" },
  { label: "Arxan / border end", lat: 47.1770, lon: 119.9436, note: "signal loss" },
  { label: "Nantong / hometown", lat: 31.9839, lon: 120.9318, note: "low water" },
  { label: "Qilian corridor", lat: 37.8752, lon: 101.9346, note: "ascent file" },
  { label: "Mt. Tai / night climb", lat: 36.2043, lon: 117.0843, note: "stone steps" },
  { label: "Brisbane River", lat: -27.4431, lon: 153.0639, note: "south light" },
  { label: "Melbourne / after road", lat: -37.8123, lon: 144.9734, note: "extension" },
];

const CH00_TERMS = [
  "datum",
  "projection",
  "latitude",
  "longitude",
  "altitude",
  "meridian",
  "plain",
  "border",
  "river",
  "home",
  "route",
  "ascent",
  "south light",
  "after road",
  "in praise of time",
];

const SHUTDOWN_TEXT = "in_praise_of_time  —  session ended";
const SHUTDOWN_SUBTEXT = "2024 – 2026";
const SHUTDOWN_FINAL = "daipan.art  /  daipan.ink";

const DATE_OVERRIDES = {
  IMG_6010: "2026-05-14T00:23:36+1000",
};

const EXTRA_SIGNAL_ENTRIES = {
  IMG_3626: {
    clip: "IMG_3626",
    filename: "IMG_3626.MOV",
    rgb: { luminance_mean: 0.45, contrast: 0.18, motion_score: 0.08 },
    rms_peak: 0.04,
    glitch_weight: 0.05,
    altitude_normalized: 0.51,
    altitude_m: 2823.835,
    ios: "18.1.1",
    local_time: "2025-07-06 13:44",
    time_of_day: "afternoon",
    location: "Qilian corridor, CN",
    lat: 37.8752,
    lon: 101.9346,
  },
  IMG_3676: {
    clip: "IMG_3676",
    filename: "IMG_3676.MOV",
    rgb: { luminance_mean: 0.42, contrast: 0.16, motion_score: 0.07 },
    rms_peak: 0.04,
    glitch_weight: 0.05,
    altitude_normalized: 0.44,
    altitude_m: 2575.376,
    ios: "18.1.1",
    local_time: "2025-07-06 19:46",
    time_of_day: "evening",
    location: "Qilian corridor, CN",
    lat: 37.8949,
    lon: 101.8205,
  },
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
    "低地。\nlow light。\n回来的感觉。",
    "南通 / 淮安 / 常熟\n水汽很慢。\n生活没有标题。",
    "home is not a pin.\n故乡不是坐标。\nただ一个方向。",
    "白花。\n晚饭。\nold table, new dust.",
    "无坐标。\nno signal.\n还是能到。",
    "coffee stain\n纸边\n门口的风。",
    "not a journey.\n只是回来一下。\n停一会儿。",
    "低海拔。\nlow altitude.\n心跳很近。",
    "室内光。\nsoft bowl.\n小小的晚饭。",
    "一张桌子。\none chair.\nまだ在这里。",
    "打印纸。\n白墙。\nwater in the room.",
    "return file\n未命名\n生活本身。",
    "ordinary proof.\n普通证据。\nふつう 的光。",
    "没有远方。\nno destination.\n只是生活。",
    "窗很亮。\n人很安静。\n稍微停住。",
    "HOMETOWN\n小声一点。\nlow, lower.",
  ],
  ch04: [
    "salary -> ticket -> altitude\n很普通。\n有一点冷。",
    "Baiyin.\nGulang.\nthin road.",
    "门源 / 张掖 / 祁连\nnames before air.",
    "空気 稀薄。\n但是很好呼吸。\n身体变轻。",
    "3752m\n声音变小。\n名字也轻。",
    "red earth.\nwhite sky.\n继续上升。",
    "expectation has weight.\n期待 有重量。\n不是隐喻。",
    "山路八小时。\narrival: almost nothing.\nそれでいい。",
    "stone ticket wind.\n石头 / 票根 / 风。",
    "青海的星星。\ntoo bright.\n太明确。",
    "ASCENT\n不是证明。\njust pressure.",
    "route line\nbody line\n呼吸很短。",
    "wind archive\n山口\nafter salary.",
    "high place.\nlow voice.\n轻くなる。",
  ],
  ch05: [
    "brown river.\nwhite sun.\n没有人等。",
    "one hour plus.\nnothing to do.\n水替我走。",
    "too bright.\n太直接。\n影が足りない。",
    "07:10\nferry breath\n河也很困。",
    "not bad.\nnot good.\nただ明るい。",
    "Hamilton -> UQ\nsoft engine\n水面很脏。",
    "south light.\n陌生的热。\n新的夏天。",
    "blur was mercy.\n模糊曾经很好。\nやさしい 失败。",
    "no one waits.\n正好。\n有点不安。",
    "-27.443\n日常坐标\ndaily south.",
    "river skin\nbrown / gold / grey.",
    "three readings.\nthree cities.\n同一本书不回来。",
    "April road.\nVictoria dusk.\n南方又远了一点。",
    "Melbourne plate.\nYarra line.\nnot another chapter.",
    "Queensland return.\n回到热。\nback to glare.",
    "sun remains.\n我先移开眼睛。\n太晃。",
    "ferry delay\napproved blank\n空白 被允许。",
    "BRISBANE\n水慢。\nlight refuses shade.",
  ],
  ch06: [
    "AFTERIMAGE\n残光\nまだ visible.",
    "black room.\nwhite flower.\n小杯子。",
    "after color\nafter map\nafter saying yes.",
    "窗。\n花。\n床边的灰。",
    "slow button.\nsmall click.\n低速生活。",
    "水落下去。\ncoffee bloom.\n早晨变慢。",
    "grey is not empty.\n灰不是少。\n余白 很多。",
    "no GPS.\nno proof.\nstill there.",
    "table light\nskin edge\n暗い白.",
    "Rousseau, maybe.\n自然太远。\n杯子比较近。",
    "Benjamin, maybe.\n复制的午後。\nstill warm.",
    "Schopenhauer, maybe.\n世界很薄。\nshadow remains.",
    "grain.\n反差。\n藏起来的温度。",
    "after seeing\n看完以后\n眼睛还在。",
    "not conclusion.\n只是小问题。\ncoffee / black / dust.",
    "mono morning\nwithout answer\n白い 静默.",
    "flowers on desk.\n不是纪念。\n只是放着。",
    "AFTERIMAGE\n轻一点。\n不要结束得太像结束。",
  ],
};

const CH04_QINGHAI_TEXTS = NARRATIVE_TEXTS.ch04;
const TAI_ASCENT_KEYS = new Set(["IMG_8863", "IMG_8869", "IMG_8920", "IMG_8921", "IMG_8928"]);
const CH04_TAI_TEXTS = [
  "泰山夜里。\nsteps, breath, no answer.",
  "石阶。\n冷风。\n手电照到下一段路。",
  "1508m\ncold morning\n再上去一次。",
  "人群还没有出现。\n山已经醒了。\nただ cold.",
  "夜爬不需要旁证。\n每一级石阶都单独成立。\n不要解释。",
  "sunrise file\nstone gate\n脚先记住。",
  "泰安很低。\n山顶很冷。\n中间全是台阶。",
];

const MONOLOGUE_TEXTS = {
  ch01: [
    "I stayed because leaving also needed a reason.\n窗外每一分钟都像别人的节日。",
    "The room is not lonely.\nIt is just measured by one body.",
    "纽约没有回答。\n它只把光放在玻璃上，然后继续。",
    "A window can become a calendar\nwhen nothing else agrees to begin.",
  ],
  ch02: [
    "地图缩小以后，草原看起来很好理解。\n身体不是这样。",
    "No signal is not silence.\nIt is the phone admitting distance.",
    "北方把名字拉长。\n城市、油田、边境，都慢慢变成风。",
    "我不想把辽阔写成浪漫。\n辽阔有时候只是无法求助。",
  ],
  ch03: [
    "回来不是事件。\n回来只是把杯子放回桌上。",
    "Hometown is a low sound.\n不需要证明，也很难描述。",
    "水汽、白墙、晚饭。\n生活用很小的东西保存人。",
    "不是寻找过去。\n只是让今天靠近一点。",
  ],
  ch04: [
    "上升不是胜利。\n只是呼吸被迫变得诚实。",
    "High place, small voice.\n海拔把身体里的废话拿走。",
    "路的尽头没有答案。\n只有更薄的空气和更清楚的脚步。",
    "山不是象征。\n山只是很重，所以期待也变重。",
  ],
  ch05: [
    "The river keeps its own schedule.\n我只是短暂坐在旁边。",
    "南方的光太直接。\n有些事情因此看不清。",
    "A ferry is a soft delay.\n它允许一天没有结论。",
    "水面很脏，也很亮。\n这两件事不冲突。",
  ],
  ch06: [
    "After seeing, the eye keeps working.\n残光比结论慢一点。",
    "黑白不是减少。\n只是把噪音放到别处。",
    "There is no last image.\n只有下一次回头时还在的灰。",
    "看完以后，生活继续变小。\n杯子、花、影子，都还够用。",
  ],
};

const CHAPTER_MEDIA_ARCHIVES = {
  ch01: [
    mediaEntry("IMG_3647.JPG", "NYC umbrella", "2024-04-13 / 40.7128, -74.0002"),
    mediaEntry("IMG_4597.jpg", "NYC print table", "2024-11-19 / 40.7426, -73.9951"),
    mediaEntry("IMG_4245.jpg", "window ice", "2024-05-03 / no GPS"),
  ],
  ch03: [
    mediaEntry("IMG_1745.JPG", "Nantong / room", "2025-05-07 / 31.9837, 120.9316"),
    mediaEntry("IMG_1752.JPG", "Nantong / portrait", "2025-05-07 / 31.9839, 120.9326"),
    mediaEntry("IMG_1755.JPG", "Nantong / prints", "2025-05-07 / 31.9838, 120.9316"),
    mediaEntry("IMG_1771.JPG", "Nantong / night", "2025-05-07 / 31.9838, 120.9316"),
    mediaEntry("IMG_2026.jpg", "Nantong / small object", "2025-05-13 / 31.9842, 120.9317"),
    mediaEntry("IMG_0995.jpg", "Nantong / return", "2026-02-26 / 31.9839, 120.9318"),
    mediaEntry("IMG_2875.jpg", "Huai'an / portrait", "2025-06-14 / 33.5570, 119.0439"),
    mediaEntry("IMG_2888.JPG", "Huai'an / large format", "2025-06-14 / 33.5569, 119.0440"),
    mediaEntry("IMG_2895.jpg", "Huai'an / print", "2025-06-14 / 33.5569, 119.0439"),
    mediaEntry("IMG_6657.jpg", "Changshu / table", "2025-10-02 / 31.7451, 120.9344"),
    mediaEntry("1dx-42.JPG", "no-coordinate / coffee", "2026-02-27 / no GPS"),
    mediaEntry("1dx-43.JPG", "no-coordinate / toy", "2026-02-27 / no GPS"),
    mediaEntry("1dx-50.JPG", "no-coordinate / night food", "2026-02-27 / no GPS"),
  ],
  ch04: [
    mediaEntry("IMG_3626.MOV", "Qilian road video", "2025-07-06 / 2824m"),
    mediaEntry("IMG_3676.MOV", "Qilian mirror video", "2025-07-06 / 2575m"),
    mediaEntry("IMG_3701.jpg", "Qinghai / window", "2025-07-07 / 2584m"),
    mediaEntry("IMG_3818.JPG", "Xining / corridor", "2025-07-08 / 2451m"),
    mediaEntry("IMG_3856.JPG", "Qinghai / shadow", "2025-07-08 / 2662m"),
    mediaEntry("IMG_3861.JPG", "Qinghai / sign", "2025-07-08 / 2669m"),
    mediaEntry("IMG_8869.JPG", "Mt Tai night", "2025-12-23 / 504m"),
    mediaEntry("IMG_8920.JPG", "Mt Tai snow", "2025-12-24 / 1487m"),
    mediaEntry("IMG_8921.JPG", "Mt Tai city lights", "2025-12-24 / 1506m"),
    mediaEntry("IMG_8928.JPG", "Mt Tai morning", "2025-12-24 / 1508m"),
  ],
  ch05: [
    mediaEntry("IMG_5058.JPG", "Brisbane / dark light", "2025-08-06 / -27.4435, 153.0854"),
    mediaEntry("IMG_5071.jpg", "Brisbane / bus", "2025-08-06 / -27.4751, 153.0337"),
    mediaEntry("IMG_5764.jpg", "Brisbane / water", "2025-08-29 / -27.4970, 153.0198"),
    mediaEntry("IMG_7435.jpg", "Brisbane / river", "2025-11-07 / -27.4506, 153.0519"),
    mediaEntry("IMG_7533.jpg", "Brisbane / print", "2025-11-12 / -27.4790, 153.0258"),
    mediaEntry("IMG_7543.jpg", "Brisbane / table", "2025-11-13 / -27.4991, 153.0154"),
    mediaEntry("IMG_7547.jpg", "Brisbane / east", "2025-11-13 / -27.4460, 153.0815"),
    mediaEntry("IMG_7597.JPG", "Brisbane / night", "2025-11-14 / -27.4434, 153.0854"),
    mediaEntry("IMG_2009.JPG", "Victoria / dusk", "2026-04-06 / -36.7272, 146.9604"),
    mediaEntry("IMG_2094.JPG", "Victoria / road", "2026-04-07 / -36.4369, 146.3334"),
    mediaEntry("IMG_2118.jpg", "Melbourne / plate", "2026-04-08 / -37.8123, 144.9734"),
    mediaEntry("IMG_2157.jpg", "Queensland / hill", "2026-04-09 / -27.9502, 153.1811"),
    mediaEntry("IMG_5671.mov", "Brisbane / night return", "2026-05-14 / -27.4157, 153.0587"),
    mediaEntry("IMG_6010.mov", "Brisbane / river night", "2026-05-14 / -27.4622, 153.0513"),
    mediaEntry("IMG_3483.mov", "Morningside / morning", "2026-05-14 / -27.4434, 153.0853"),
  ],
  ch06: [
    mediaEntry("QS1-07.JPG", "small body / window", "2026-01-22 / no GPS"),
    mediaEntry("QS1-08.JPG", "small body / table", "2026-01-22 / no GPS"),
    mediaEntry("QS1-21.JPG", "small body / ground", "2026-01-22 / no GPS"),
    mediaEntry("_K336876.JPG", "mono / night", "2026-02-07 / no GPS"),
    mediaEntry("_K336892.JPG", "mono / late", "2026-02-08 / no GPS"),
    mediaEntry("_K336976.JPG", "mono / flowers", "2026-02-11 / no GPS"),
    mediaEntry("_K337013.JPG", "mono / window", "2026-02-16 / no GPS"),
    mediaEntry("_K337090.JPG", "mono / bed", "2026-02-18 / no GPS"),
    mediaEntry("_K337101.JPG", "mono / table", "2026-02-18 / no GPS"),
    mediaEntry("_K337154.JPG", "mono / after", "2026-02-19 / no GPS"),
    mediaEntry("_K337602.DNG", "mono DNG / tree", "2026-05-03 / no GPS"),
  ],
  after: [],
};

const CHAPTER_MEDIA_SEQUENCES = {
  ch01: [
    videoEntry("IMG_1401"),
    videoEntry("IMG_1410"),
    mediaEntry("IMG_3647.JPG", "NYC umbrella", "2024-04-13 / 40.7128, -74.0002"),
    videoEntry("IMG_2140"),
    videoEntry("IMG_2361"),
    mediaEntry("IMG_4597.jpg", "NYC print table", "2024-11-19 / 40.7426, -73.9951"),
    videoEntry("IMG_4700"),
    videoEntry("IMG_1448"),
    videoEntry("IMG_1565"),
    mediaEntry("IMG_4245.jpg", "window ice", "2024-05-03 / no GPS"),
    videoEntry("IMG_1627"),
  ],
  ch03: CHAPTER_MEDIA_ARCHIVES.ch03,
  ch04: [
    videoEntry("IMG_3484"),
    videoEntry("IMG_3549"),
    videoEntry("IMG_3551"),
    videoEntry("IMG_3567"),
    mediaEntry("IMG_3626.MOV", "Qilian road video", "2025-07-06 / 2824m"),
    videoEntry("IMG_3612"),
    videoEntry("IMG_3618"),
    mediaEntry("IMG_3676.MOV", "Qilian mirror video", "2025-07-06 / 2575m"),
    mediaEntry("IMG_3701.jpg", "Qinghai / window", "2025-07-07 / 2584m"),
    videoEntry("IMG_3682"),
    videoEntry("IMG_3727"),
    mediaEntry("IMG_3818.JPG", "Xining / corridor", "2025-07-08 / 2451m"),
    videoEntry("IMG_3773"),
    videoEntry("IMG_3798"),
    videoEntry("IMG_3810"),
    mediaEntry("IMG_3856.JPG", "Qinghai / shadow", "2025-07-08 / 2662m"),
    mediaEntry("IMG_3861.JPG", "Qinghai / sign", "2025-07-08 / 2669m"),
    videoEntry("IMG_3840"),
    videoEntry("IMG_3940"),
    videoEntry("IMG_8863"),
    mediaEntry("IMG_8869.JPG", "Mt Tai night", "2025-12-23 / 504m"),
    mediaEntry("IMG_8920.JPG", "Mt Tai snow", "2025-12-24 / 1487m"),
    mediaEntry("IMG_8921.JPG", "Mt Tai city lights", "2025-12-24 / 1506m"),
    mediaEntry("IMG_8928.JPG", "Mt Tai morning", "2025-12-24 / 1508m"),
  ],
  ch05: [
    mediaEntry("IMG_5058.JPG", "Brisbane / dark light", "2025-08-06 / -27.4435, 153.0854"),
    mediaEntry("IMG_5071.jpg", "Brisbane / bus", "2025-08-06 / -27.4751, 153.0337"),
    videoEntry("IMG_5523"),
    videoEntry("IMG_5521"),
    mediaEntry("IMG_5764.jpg", "Brisbane / water", "2025-08-29 / -27.4970, 153.0198"),
    mediaEntry("IMG_7435.jpg", "Brisbane / river", "2025-11-07 / -27.4506, 153.0519"),
    mediaEntry("IMG_7533.jpg", "Brisbane / print", "2025-11-12 / -27.4790, 153.0258"),
    mediaEntry("IMG_2009.JPG", "Victoria / dusk", "2026-04-06 / -36.7272, 146.9604"),
    mediaEntry("IMG_2094.JPG", "Victoria / road", "2026-04-07 / -36.4369, 146.3334"),
    mediaEntry("IMG_2118.jpg", "Melbourne / plate", "2026-04-08 / -37.8123, 144.9734"),
    mediaEntry("IMG_2157.jpg", "Queensland / hill", "2026-04-09 / -27.9502, 153.1811"),
    videoEntry("IMG_5671"),
    videoEntry("IMG_6010"),
    videoEntry("IMG_3483"),
  ],
  ch06: CHAPTER_MEDIA_ARCHIVES.ch06,
};

const QINGHAI_ALTITUDE_POINTS = [
  { clip: "IMG_3484", time: "07/04 17:57", place: "Baiyin", altitude: 1724 },
  { clip: "IMG_3549", time: "07/05 20:24", place: "Gulang", altitude: 1909 },
  { clip: "IMG_3551", time: "20:40", place: "Gulang", altitude: 1861 },
  { clip: "IMG_3567", time: "07/06 10:21", place: "Yangxiang", altitude: 1953 },
  { clip: "IMG_3626", time: "13:44", place: "Qilian rd.", altitude: 2824 },
  { clip: "IMG_3612", time: "12:09", place: "Yangxiang", altitude: 3119 },
  { clip: "IMG_3618", time: "12:58", place: "pass down", altitude: 2270 },
  { clip: "IMG_3676", time: "19:46", place: "Qilian rd.", altitude: 2575 },
  { clip: "IMG_3682", time: "20:03", place: "Dongtan", altitude: 2635 },
  { clip: "IMG_3727", time: "07/07 12:15", place: "Nanfeng", altitude: 2801 },
  { clip: "IMG_3773", time: "18:17", place: "Qingshizui", altitude: 3408 },
  { clip: "IMG_3798", time: "20:17", place: "Qilian pass", altitude: 3492 },
  { clip: "IMG_3810", time: "20:31", place: "max 3753m", altitude: 3753 },
  { clip: "IMG_3840", time: "07/08 13:56", place: "Dongxia", altitude: 3168 },
  { clip: "IMG_3940", time: "07/09 05:47", place: "Gandi", altitude: 3227 },
];

const TAI_ALTITUDE_POINTS = [
  { clip: "IMG_8863", time: "12/23 22:02", place: "Tai'an base", altitude: 197 },
  { clip: "IMG_8869", time: "23:10", place: "stairs", altitude: 504 },
  { clip: "IMG_8920", time: "06:36", place: "south gate", altitude: 1487 },
  { clip: "IMG_8921", time: "06:39", place: "summit light", altitude: 1506 },
  { clip: "IMG_8928", time: "07:26", place: "morning", altitude: 1508 },
];

function mediaEntry(file, label, meta) {
  const key = file.replace(/\.[^.]+$/, "");
  return { type: /\.(mov|mp4|m4v)$/i.test(file) ? "video" : "photo", key, file, label, meta };
}

function videoEntry(key) {
  return { type: "video", key };
}

const MAP_CENTERS = {
  CH00: { lat: 40.7194, lon: -73.9896, zoom: 14, city: "Manhattan / Lower East Side" },
  CH01: { lat: 40.7194, lon: -73.9896, zoom: 14, city: "Manhattan / Lower East Side" },
  CH02: { lat: 48.9213, lon: 117.1130, zoom: 8, city: "Arxan / Greater Khingan Range" },
  CH03: { lat: 31.984, lon: 120.932, zoom: 9, city: "Nantong / Jiangsu hometown line" },
  CH04: { lat: 37.3784, lon: 101.4117, zoom: 8, city: "Qilian corridor / Qinghai-Gansu" },
  CH05: { lat: -27.443, lon: 153.064, zoom: 8, city: "Brisbane River / Queensland" },
  CH06: {
    lat: 32.3840,
    lon: 119.4409,
    zoom: 7,
    city: "Nantong / Hefei / Yancheng",
    places: [
      { label: "Nantong", lat: 31.9839, lon: 120.9318 },
      { label: "Hefei", lat: 31.8206, lon: 117.2272 },
      { label: "Yancheng", lat: 33.3474, lon: 120.1636 },
    ],
  },
  AFTER: { lat: -27.443, lon: 153.064, zoom: 2, city: "after" },
  INT: { lat: 36.2043, lon: 117.0843, zoom: 11, city: "Mount Tai / Tai'an" },
};

const SABINE_ANALYSIS_TEXT = `Analysis of "The Abduction of the Sabine Women"

The painting "The Abduction of the Sabine Women" illustrates a fictional historical scene based on a Roman legend story. They invited their neighbors, the Sabines, to Rome only to forcibly take their young women as their wives.

The work adopts a diagonally focused composition, with Romulus held aloft as a conducting figure on the left side, drawing the viewer's attention to the principal action. The diagonal structure establishes the fundamental tension between stability and chaos that characterizes the entire work. This tension is shown through the interrelation of space, gesture, color and contrast throughout the painting.

The painting's composition is organized along two direct diagonals that create dynamic visual collides. A powerful diagonal forms from the upper left to the lower right through women in blue and green and a warrior in yellow leather armor with a knife in his hand. The elderly people kneeling in orange and gray robes takes place in the lower right corner. The child in white on the ground and the old woman in red with a white turban create a spatial opening which leads the vision to another diagonal. This relationship extends from the lower corner on the left to the black doorways of the buildings on the upper right side.

The visual center is not prominently centric in the painting, but rather distributed across these diagonal axes, creating multiple focal points that draw the viewer's eye across different spatial planes. The foreground presents immediate dramatic resistance between weak women and strong warriors, while the middle ground extends this narrative with other struggling figures. Looking at the distant fighting people in the background, particularly toward the right side of the painting, you can find their twisted limbs expressing a sense of chaos and movement to compare with the frozen moment of fear and potential injury in the foreground. These indistinguishable spatial layers create depth that enforces the sense of an impactive event rather than a single moment.

Poussin's use of rhythmic lines is evident in the fluid, but also systematically controlled gestures of the figures, similar to our impression of classical sculptures. The poses of the characters are artistically processed to evoke an elaborate moving tension. It aims to create multiple lines that guide the viewer's eyes through the composition. These lines create several oval patterns that move your tension along the figures into the background of the dark door, reinforcing the visual impact through limbs and fluttering clothes. The twisted and stacked bodies make people devote more interest to the details of the muscle and emotions behind. Columns and masonry in the background provide stability in the middle ground in contrast to the chaos among the figures.

Pure, bright colors are utilized throughout the main characters' clothes in the painting. The color palette is composed of bold primary colors - red, blue, and yellow, carefully arranged and concentrated in the foreground. The women are dressed in blue, creating a visual distinction between them and warriors in yellow armor. In the middle and far foreground, though less pure, the colors remain bright enough to differentiate figures from the crowd, creating variations so our eyes move across, into space. This also adds complexity, makes a bit of chaos among the order. These solid colors form a triangular framework with three points – Romulus in red, warriors in yellow, and women in blue. The woman on the left struggles in a warrior's arms, her clothes's brightness separates her from the middle ground. This emphasizes the Sabine women's vulnerability and their distinction from the warriors.

In this painting, Poussin skillfully uses dull gray tones to emphasize the chaotic nature of the scene. Particularly notable is the dark architectural structure in the upper right part, which occupies nearly one-fourth of the entire painting. This predominantly dark-toned architecture with completely black interior spaces creates an impressive contrast against the bright sky and the vivid colors of the figures' clothing. Such pure darkness evokes a sense of mystery and oppression, indicating an unknown, ominous presence. The serious geometric forms of the architecture further demonstrate similar visual opinion, establishing a powerful contrast with the chaotic movement of the human figures below. The dark architectural order against the bright, dynamic disorder of the abduction heightens the emotional tension throughout the composition.

Additionally, the use of pure colors in the costumes unavoidably conveys a romantic beauty and uncontrolled disengagement. The free viewing angle gives the classical visual art a newer combination of elements to meet the comprehend perspectives of people from various backgrounds and contexts. The architectural precision represents Roman civilization and order, while the gestures and colors embody inestimable desires and violence. The painting invites viewers to consider how societies interplay chaos and stability, encourages contemplation of narrative and personal interpretation to remind us of the extreme power, gender, love and fear.`;

const CH01_DOCUMENTS = {
  "doc-absurd": {
    filename: "The Absurd.pdf",
    type: "pdf",
    meta: "PDF / extracted preview / March 2025",
    title: "The Absurd",
    preview: `The  Absurd

Dancing,  she  dances,  is  the  absurd,  the  absurd  and  more,
Like clouds your polished mind changes shape forevermore.

People shift names and faces as days unfold,
When I ask who they were, they turn away cold,
How impossible to guess!
What do they ask anymore?`,
  },
  "doc-film-review": {
    filename: "Film Review 1_Dai Pan.docx",
    type: "docx",
    meta: "DOCX / extracted preview / April 2025",
    title: "Film Review 1",
    preview: `Eternal sunshine of the spotless mind is always considered as a romantic science fiction movie about amnestics, human memories and social relationships. It reveals that impulsive behaviors of men and women in emotional relationships may have irreparable consequences, and remembers that the effects of social relationships are not one-way but complementary.

Set in an ordinary version of New York City, Eternal Sunshine of the Spotless Mind begins just before Valentine's Day. Joel, a quiet and introspective man, decides to reconcile with his ex-girlfriend Clementine. However, he discovered she no longer remembers him.`,
  },
  "doc-aiweiwei": {
    filename: "Ai Weiwei's _Child's Play_ Exhibition_Dai Pan_2_3.pdf",
    type: "pdf",
    meta: "PDF / extracted preview / April 2025",
    title: "Child's Play",
    preview: `Ai Weiwei's "Child's Play" Exhibition

Ai Weiwei remains one of the most forward-thinking global artists today and the individual who undertakes the greatest humanity art legacy from the Asian context. Considering his large exhibition in 2014, where he created portraits of political prisoners using toy bricks, garnered significant attention.

He continues using this impressive stylistic medium approach in Child's Play.`,
  },
  "doc-edit": {
    filename: "My edit of Dai Pan.docx",
    type: "docx",
    meta: "DOCX / extracted preview / April 2025",
    title: "My edit of Dai Pan",
    preview: `Dai Pan,

I started to simply rewrite a version of the review using fragments from your text but decided you would learn more if you did more yourself. So I used my readings to begin to establish themes derived from your draft, then using them as a structural elements as well as the basis for content; more suggestive than directive.

Once you have written something, like a draft - and you already have - the simplest way to create structure is to go back through your draft to identify your themes or points of interpretation you wish to make, whether they originate from  you or from another source.`,
  },
  "doc-pirouette": {
    filename: "Dai Pan_Pirouette_ Turning Points in Design.docx",
    type: "docx",
    meta: "DOCX / extracted preview / April 2025",
    title: "Pirouette",
    preview: `Pirouette: Turning Points in Design is an exhibition located on the north side of the museum that divides a large exhibition hall into sections. The concrete idea of 'Pirouette: Turning Points in Design' is to illustrate how design has evolved from functional objects into a complex reflection of cultural, political, and aesthetic turning points throughout modern history.

The exhibition as a whole chooses a neat partition, and most of the physical products are concentrated in the main area of the exhibition hall.`,
  },
  "doc-becoming": {
    filename: "Becoming Animal_Dai Pan.pdf",
    type: "pdf",
    meta: "PDF / extracted preview / March 2025",
    title: "Becoming Animal",
    preview: `Becoming  Animal

Lyne  Lapointe  combines  artificial  materials  with  artificially  collected  natural  materials  in the exhibition "Becoming Animal" to form an expression between painting and installation art.

Her works aim to explore the conceptuality and functionality of individuals and spaces in the social sense.`,
  },
};

const TRASH_ITEMS = [
  {
    id: "freedom-wanted",
    filename: "想要自由.txt",
    type: "text",
    content: [
      "想要自由。",
      "",
      "这句话被放进垃圾桶，不是因为它不成立。",
      "只是因为它太容易被说出口。",
      "",
      "自由不是离开所有人，",
      "也不是把门关上以后假装自己没有重量。",
      "",
      "我只是想在某些时刻，",
      "可以不解释自己为什么站在那里。",
    ],
  },
  {
    id: "freedom-forbidden",
    filename: "不该有自由.txt",
    type: "text",
    content: [
      "不该有自由。",
      "",
      "这句话看起来像惩罚，",
      "其实更像一种害怕。",
      "",
      "如果选择真的存在，",
      "错误就不能再完全推给别人。",
      "",
      "于是我把它也存下来：",
      "一份相反的备忘录，",
      "提醒自己不要把恐惧误认成秩序。",
    ],
  },
  {
    id: "freedom-still",
    filename: "还是应该有.txt",
    type: "text",
    content: [
      "还是应该有。",
      "",
      "不是很多。",
      "不是完全。",
      "也不是一种漂亮的口号。",
      "",
      "只是应该有一点可以移动的余地。",
      "可以反悔的余地。",
      "可以晚一点回答的余地。",
      "",
      "哪怕最后什么都没有改变，",
      "那一点余地也不能被提前删除。",
    ],
  },
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
  { date: "2025-07-09", label: "Gansu-Qinghai traverse ends" },
  { date: "2025-07-21", label: "UQ orientation Brisbane" },
  { date: "2025-07-28", label: "UQ classes begin" },
  { date: "2025-08-22", label: "first Brisbane clip (Ascot)" },
  { date: "2025-12-23", label: "Mt Tai night climb" },
  { date: "2026-05-14", label: "most recent clips (Brisbane)" },
];

const state = {
  signal: {},
  mediaArchiveEntries: [],
  chapter: "ch00",
  previousChapter: "ch01",
  clipIndex: 0,
  mediaIndex: 0,
  photoPositionIndex: 0,
  currentClip: null,
  currentMediaItem: null,
  previousClip: null,
  wasInterrupted: false,
  videoHoldTimer: null,
  photoTimer: null,
  photoLoadToken: 0,
  isVideoHold: false,
  textTimer: null,
  textFadeTimer: null,
  narrativeCurrent: null,
  monologueTimer: null,
  monologueFadeTimer: null,
  monologueToken: 0,
  ch00BootLogTimer: null,
  ch00LocationTimer: null,
  ch00Timers: [],
  ch00RunToken: 0,
  afterTimers: [],
  ch04DriftTimer: null,
  textCycle: {
    ch01: -1,
    ch02: -1,
    ch03: -1,
    ch04: -1,
    ch05: -1,
    ch06: -1,
    after: -1,
  },
  monologueCycle: {
    ch01: -1,
    ch02: -1,
    ch03: -1,
    ch04: -1,
    ch05: -1,
    ch06: -1,
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
    clipsRead: new Set(safeSessionArray("clips_read")),
    textSeen: new Set(safeSessionArray("text_seen")),
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
  bootTitleCard: document.getElementById("boot-title-card"),
  mobileArchiveGate: document.getElementById("mobile-archive-gate"),
  ch00BootLog: document.getElementById("ch00-boot-log"),
  ch00Monologue: document.getElementById("ch00-monologue"),
  ch00LocationPanel: document.getElementById("ch00-location-panel"),
  ch00InstrumentPanel: document.getElementById("ch00-instrument-panel"),
  ch00LoadFill: document.getElementById("ch00-load-fill"),
  ch00LoadPercent: document.getElementById("ch00-load-percent"),
  ch00Axis: document.getElementById("ch00-axis"),
  ch00Term: document.getElementById("ch00-term"),
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
  photo: document.getElementById("chapter-photo"),
  monologue: document.getElementById("monologue-text"),
  crtFrame: document.getElementById("crt-frame"),
  crtShell: document.getElementById("crt-shell"),
  afterFileText: document.getElementById("after-file-text"),
  videoToggle: document.getElementById("video-toggle"),
  videoTime: document.getElementById("video-time"),
  monitor: document.getElementById("signal-monitor"),
  mediaArchive: document.getElementById("chapter-media-archive"),
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
  state.signal = await loadSignalManifest();
  Object.assign(state.signal, EXTRA_SIGNAL_ENTRIES);
  state.mediaArchiveEntries = await loadMediaArchiveIndex();
  window.SIGNAL = state.signal;
  dom.video.muted = true;
  dom.interruptVideo.muted = true;
  prepareVideoElement(dom.video);
  prepareVideoElement(dom.interruptVideo);
  loadSubdermalText();

  bindEvents();
  startClock();
  setupVideoObserver();
  setupAudioUnlock();
  setupDesktopObjects();
  const bootSignature = bootSessionSignature();
  if (sessionStorage.getItem("booted") !== bootSignature) dom.body.classList.add("is-booting");
  setupOperatingSystem();
  restoreStickyNotes();
  resizeTexture();
  if (sessionStorage.getItem("booted") === bootSignature) {
    dom.body.classList.add("has-booted");
    const chapter = initialChapterFromLocation() || "ch01";
    if (chapter === "ch01") sessionStorage.setItem("onboarding_ch01", "1");
    if (shouldUseMobileArchiveGate()) showMobileArchiveGate();
    else if (chapter === "int") activateChapter("ch04");
    else {
      activateChapter(CHAPTERS[chapter] ? chapter : "ch01");
    }
  } else {
    await playBootSequence();
    await playBootTitleCard();
    sessionStorage.setItem("booted", bootSignature);
    hideBootScreen();
    sessionStorage.setItem("onboarding_ch01", "1");
    if (shouldUseMobileArchiveGate()) showMobileArchiveGate();
    else activateChapter(initialChapterFromLocation() || "ch01");
  }
}

function shouldUseMobileArchiveGate() {
  return window.matchMedia("(max-width: 860px)").matches;
}

function showMobileArchiveGate() {
  dom.body.classList.add("mobile-archive-gate-active");
  dom.mobileArchiveGate?.setAttribute("aria-hidden", "false");
  dom.video.pause();
  dom.interruptVideo.pause();
}

function hideMobileArchiveGate() {
  dom.body.classList.remove("mobile-archive-gate-active");
  dom.mobileArchiveGate?.setAttribute("aria-hidden", "true");
}

function syncMobileArchiveGate() {
  if (shouldUseMobileArchiveGate()) {
    showMobileArchiveGate();
    return;
  }
  if (!dom.body.classList.contains("mobile-archive-gate-active")) return;
  hideMobileArchiveGate();
  const chapter = initialChapterFromLocation() || sessionStorage.getItem("last_chapter") || "ch01";
  activateChapter(CHAPTERS[chapter] && chapter !== "int" ? chapter : "ch01");
}

function initialChapterFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const queryChapter = params.get("chapter") || params.get("ch");
  const hashChapter = window.location.hash.replace(/^#\/?/, "");
  const candidate = String(queryChapter || hashChapter || "").toLowerCase();
  return CHAPTERS[candidate] ? candidate : null;
}

async function loadSubdermalText() {
  try {
    const response = await fetch("beishang.txt");
    if (!response.ok) throw new Error(`beishang ${response.status}`);
    const text = await response.text();
    dom.subdermalText.textContent = Array.from({ length: 10 }, () => text).join("\n\n");
  } catch (err) {
    console.warn("beishang text unavailable", err);
    dom.subdermalText.textContent = "in_praise_of_time\nshadow / delay / open file\n";
  }
}

async function loadSignalManifest() {
  try {
    const response = await fetch(MANIFEST_URL);
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    const manifest = await response.json();
    return manifest && typeof manifest === "object" ? manifest : {};
  } catch (err) {
    console.warn("signal manifest unavailable", err);
    return {};
  }
}

function bindEvents() {
  window.addEventListener("resize", () => {
    resizeTexture();
    positionDesktopIcons();
    state.desktopWindows.forEach(constrainDesktopWindow);
    if (state.currentClip) applyVideoLayoutForClip(state.currentClip);
    if (dom.body.classList.contains("has-booted")) syncMobileArchiveGate();
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
  dom.video.addEventListener("loadedmetadata", () => {
    updateVideoControls();
    syncNarrativeToVideoDuration();
  });
  dom.video.addEventListener("timeupdate", () => {
    trackClipReadProgress();
    updateVideoControls();
  });
  dom.video.addEventListener("play", updateVideoControls);
  dom.video.addEventListener("pause", updateVideoControls);
  dom.video.addEventListener("error", () => showVideoCompatMessage(dom.video, state.currentClip));
  dom.interruptVideo.addEventListener("error", () => showVideoCompatMessage(dom.interruptVideo, "INTERRUPT"));
  dom.photo?.addEventListener("load", () => {
    dom.crtFrame?.classList.remove("is-photo-loading");
  });
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

function prepareVideoElement(video) {
  if (!video) return;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "metadata";
}

function showVideoCompatMessage(video, clipKey) {
  const shell = video?.closest?.(".crt-shell, .interrupt-window");
  if (!shell || shell.querySelector(".video-compat-note")) return;
  const note = document.createElement("div");
  note.className = "video-compat-note";
  note.textContent = `This browser cannot decode ${clipKey || "this"} media. Safari usually handles the archive MOV files best; Edge may need MP4 transcodes.`;
  shell.appendChild(note);
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

async function playBootTitleCard() {
  if (!dom.bootTitleCard) return;
  dom.bootScreen?.classList.remove("is-active");
  dom.bootScreen?.setAttribute("aria-hidden", "true");
  dom.bootTitleCard.classList.add("is-active");
  dom.bootTitleCard.setAttribute("aria-hidden", "false");
  await wait(1500);
  dom.bootTitleCard.classList.add("is-leaving");
  await wait(760);
  dom.bootTitleCard.classList.remove("is-active", "is-leaving");
  dom.bootTitleCard.setAttribute("aria-hidden", "true");
}

function buildBootSequence() {
  const bootFiles = buildBootFileIndex();
  const groups = groupBootFiles(bootFiles);
  return [
    ...BOOT_SEQUENCE_BASE,
    { text: "", delay: 200 },
    { text: "scanning project files...", delay: 260 },
    ...formatBootFileGroup("core interface", groups.core),
    ...formatBootFileGroup("signal data", groups.data),
    ...formatBootFileGroup("chapter media", groups.media),
    ...formatBootFileGroup("desktop documents", groups.documents),
    ...formatBootFileGroup("search / rights", groups.meta),
    ...formatBootFileGroup("external libraries", groups.external),
    { text: "", delay: 80 },
    { text: `all ${bootFiles.length} referenced files indexed   ✓`, delay: 300 },
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
    { text: "document_texts.js      ✓  (desktop docs)", delay: 70 },
    { text: "", delay: 120 },
    { text: "system ready.", delay: 600 },
    { text: "locating...", delay: 600 },
  ];
}

function buildBootFileIndex() {
  const entries = [];
  const seen = new Set();
  const add = (file, group = "core", detail = "") => {
    if (!file || typeof file !== "string") return;
    const normalized = file.trim();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    entries.push({ file: normalized, group, detail });
  };

  [
    "index.html",
    "styles.css",
    "main.js",
    "browser_compat.js",
    "news_content.js",
    "eyu_articles.js",
    "document_texts.js",
  ].forEach((file) => add(file, "core"));

  [
    MANIFEST_URL,
    MEDIA_ARCHIVE_URL,
    "signal_data/environment.json",
    "beishang.txt",
    "README.txt",
    "一切都会好起来的.txt",
  ].forEach((file) => add(file, "data"));

  Object.values(state.signal || {}).forEach((clip) => {
    add(clip?.filename, "media", clip?.clip || "");
  });

  Object.values(EXTRA_SIGNAL_ENTRIES || {}).forEach((clip) => {
    add(clip?.filename, "media", clip?.clip || "");
  });

  Object.values(CHAPTER_MEDIA_ARCHIVES || {}).flat().forEach((item) => {
    add(item.file || item.filename, "media", item.label || item.key || "");
  });

  Object.values(CHAPTER_MEDIA_SEQUENCES || {}).flat().forEach((item) => {
    if (item.file) add(item.file, "media", item.label || item.key || "");
    if (item.key && state.signal?.[item.key]?.filename) {
      add(state.signal[item.key].filename, "media", item.key);
    }
  });

  [
    ...QINGHAI_ALTITUDE_POINTS,
    ...TAI_ALTITUDE_POINTS,
  ].forEach((point) => {
    if (point.clip && state.signal?.[point.clip]?.filename) add(state.signal[point.clip].filename, "media", point.place);
  });

  Object.values(CH01_DOCUMENTS || {}).forEach((doc) => add(doc.filename, "documents", doc.title || doc.type));
  TRASH_ITEMS.forEach((item) => add(item.filename, "documents", item.type));

  [
    "OBJECTS_INDEX.txt",
    "FREE_SPACE_NOTE.txt",
    "ROUTE_CACHE.txt",
  ].forEach((file) => add(file, "documents"));

  [
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
    "index.html.md",
    "LICENSE.md",
    "COPYRIGHT.md",
    "NOTICE.md",
    "SECURITY.md",
    "vercel.json",
    ".github/CODEOWNERS",
  ].forEach((file) => add(file, "meta"));

  [
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
    "https://unpkg.com/@phosphor-icons/web",
    "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js",
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ].forEach((file) => add(file, "external"));

  return entries;
}

function groupBootFiles(files) {
  return files.reduce((map, entry) => {
    if (!map[entry.group]) map[entry.group] = [];
    map[entry.group].push(entry);
    return map;
  }, { core: [], data: [], media: [], documents: [], meta: [], external: [] });
}

function formatBootFileGroup(title, files = []) {
  if (!files.length) return [];
  return [
    { text: "", delay: 70 },
    { text: `${title}...`, delay: 180 },
    ...files.map((entry, index) => ({
      text: formatBootFileLine(entry, index + 1, files.length),
      delay: bootFileDelay(entry),
    })),
  ];
}

function formatBootFileLine(entry, index, total) {
  const ordinal = `${String(index).padStart(3, "0")}/${String(total).padStart(3, "0")}`;
  const file = compactBootPath(entry.file).padEnd(44, " ").slice(0, 44);
  const detail = entry.detail ? `  ${String(entry.detail).slice(0, 28)}` : "";
  return `${ordinal}  ${file} ✓${detail}`;
}

function compactBootPath(file) {
  return file
    .replace(/^https:\/\/fonts\.googleapis\.com\/css2\?family=/, "google-fonts:")
    .replace(/^https:\/\/unpkg\.com\//, "unpkg:")
    .replace(/^https:\/\/cdn\.jsdelivr\.net\/npm\//, "jsdelivr:")
    .replace(/^https:\/\/\{s\}\.tile\.openstreetmap\.org\//, "osm-tiles:");
}

function bootFileDelay(entry) {
  if (entry.group === "media") return 34;
  if (entry.group === "external") return 42;
  return 46;
}

function bootSessionSignature() {
  const files = buildBootFileIndex().map((entry) => entry.file).sort();
  return `file-index-v3:${files.length}:${files.join("|").length}`;
}

function buildCh00GeoSequence() {
  const lats = CH00_LOCATION_SCAN.map((point) => point.lat);
  const lons = CH00_LOCATION_SCAN.map((point) => point.lon);
  const latBand = `${Math.min(...lats).toFixed(4)} -> ${Math.max(...lats).toFixed(4)}`;
  const lonBand = `${Math.min(...lons).toFixed(4)} -> ${Math.max(...lons).toFixed(4)}`;

  return [
    { text: "position routine          manual" },
    { text: "datum                     WGS84" },
    { text: "projection                equirectangular / loose" },
    { text: `latitude band             ${latBand}` },
    { text: `longitude band            ${lonBand}` },
    { text: `route points              ${CH00_LOCATION_SCAN.length}` },
    { text: "" },
    ...CH00_LOCATION_SCAN.map(formatCh00GeoLine),
    { text: "" },
    { text: "anchor                    40.7194N 073.9896W" },
    { text: "altitude memory           sea level / highland / river" },
    { text: "map status                not exact, still useful" },
    { text: "location nearly confirmed..." },
  ];
}

function formatCh00GeoLine(point) {
  const latSuffix = point.lat >= 0 ? "N" : "S";
  const lonSuffix = point.lon >= 0 ? "E" : "W";
  const lat = `${Math.abs(point.lat).toFixed(4)}${latSuffix}`;
  const lon = `${Math.abs(point.lon).toFixed(4)}${lonSuffix}`;
  return {
    text: `PIN  ${point.label.padEnd(26, " ")} ${lat.padStart(9, " ")} ${lon.padStart(10, " ")}  ${point.note}`,
  };
}

function formatAltitudeCompact(value) {
  const altitude = Number(value);
  if (!Number.isFinite(altitude)) return "----m";
  return `${Math.round(altitude)}m`.padStart(5, " ");
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
    sabine:   { right: 20, top: 518 },
    "doc-absurd":      { right: 360, top: 48 },
    "doc-film-review": { right: 180, top: 48 },
    "doc-aiweiwei":    { right: 360, top: 190 },
    "doc-edit":        { right: 180, top: 190 },
    "doc-pirouette":   { right: 360, top: 350 },
    "doc-becoming":    { right: 180, top: 350 },
  };
  dom.desktopIcons.forEach((icon) => {
    if (icon.dataset.dragged === "1") return;
    const pos = positions[icon.dataset.object] || { right: 18, top: 70 };
    const width = icon.classList.contains("desktop-icon-ch01-doc") ? 166 : 92;
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
    sabine: buildSabineWindow,
  };
  const builder = builders[type] || (CH01_DOCUMENTS[type] ? () => buildCh01DocumentWindow(type) : null);
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
    sabine: { left: 360, top: 120 },
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
    ["map", "MAP", "ph-map-trifold"],
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
    showDockTooltip(state.dockApps.get("eyu"), "available in CHAPTER 01, 05, 06, and AFTER");
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
  return state.chapter === "ch01" || state.chapter === "ch05" || state.chapter === "ch06" || state.chapter === "after";
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
    map: placeInSafeArea(720, 650, 0.52, 0.08, safe),
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
  input.placeholder = "search encyclopedia…";
  const scope = Object.assign(document.createElement("span"), { className: "search-system-scope", textContent: "ENCYCLOPEDIA" });
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
    const matches = sortEncyclopediaEntries(allMatches);
    results.innerHTML = "";
    detail.innerHTML = "";
    footer.textContent = `${matches.length} entries`;

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
          raw.term_type,
          raw.term_category,
          raw.region,
        ].filter((value) => value && value !== "—").join(" / ") || "encyclopedia entry",
      });
      const preview = Object.assign(document.createElement("span"), {
        className: "search-result-preview",
        textContent: raw.preview || raw.definition || raw.one_fact || "",
      });
      button.append(title, meta, preview);
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
  const eyebrow = Object.assign(document.createElement("div"), {
    className: "search-detail-eyebrow",
    textContent: [raw.term_type || "TERM", raw.term_category].filter(Boolean).join(" / "),
  });
  const title = Object.assign(document.createElement("h2"), { className: "search-detail-heading", textContent: entry.label });
  detail.append(eyebrow, title);

  const table = document.createElement("div");
  table.className = "search-system-table";
  [
    ["TYPE", raw.term_type],
    ["CATEGORY", raw.term_category],
    ["PLACE", raw.region || raw.location_name],
    ["PERIOD", extractSearchDate(raw)],
    ["COORDINATES", extractEnvironmentCoordinates(raw)],
    ["ALTITUDE", extractEnvironmentAltitude(raw)],
    ["OTHER NAMES", formatLexiconList(raw.aliases, 8)],
    ["RELATED", formatLexiconList(raw.related_terms, 8)],
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
    textContent: formatSearchValue(raw.definition || raw.one_fact || raw.preview),
  }));
  detail.appendChild(Object.assign(document.createElement("p"), {
    className: "search-system-note",
    textContent: formatSearchValue(raw.encyclopedia_note || raw.source_note || raw.narrative_note || "No additional note."),
  }));
  const more = document.createElement("button");
  more.type = "button";
  more.className = "search-more-button";
  more.textContent = "[more]";
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
  const archiveEntries = (state.mediaArchiveEntries || [])
    .filter((entry) => entry.coordinates)
    .map(makeMediaSearchEntry);
  const environmentEntries = Object.keys(env)
    .filter((group) => group.startsWith("GROUP_"))
    .flatMap((group) => Object.entries(env[group] || {}).map(([key, raw]) => makeEnvironmentLexiconEntry(group, key, raw)));
  state.environmentEntries = sortEncyclopediaEntries(dedupeLexiconEntries([
    ...makeEncyclopediaCoreEntries(),
    makeSearchTextEntry(),
    ...archiveEntries,
    ...environmentEntries,
  ]));
  return state.environmentEntries;
}

async function loadMediaArchiveIndex() {
  try {
    const response = await fetch(MEDIA_ARCHIVE_URL);
    if (!response.ok) throw new Error(`media index ${response.status}`);
    const entries = await response.json();
    return Array.isArray(entries) ? entries : [];
  } catch (err) {
    console.warn("media archive index unavailable", err);
    return [];
  }
}

function makeMediaSearchEntry(entry) {
  const raw = mediaEntryToSearchRaw(entry);
  return {
    key: entry.id || String(entry.title || "").replace(/\W+/g, "_").toUpperCase(),
    group: "GROUP_MEDIA_ARCHIVE",
    raw,
    label: entry.location_name || entry.title || "Encyclopedia entry",
    search: [
      entry.date_context,
      entry.visible_surface,
      entry.location_name,
      entry.camera,
      entry.source_note,
      ...(entry.search_terms || []),
    ].filter(Boolean).join(" ").toLowerCase(),
  };
}

function mediaEntryToSearchRaw(entry) {
  const coordinates = entry.coordinates || null;
  const hasCoordinates = Boolean(coordinates);
  return {
    full_name: entry.location_name || entry.title,
    term_type: hasCoordinates ? "PLACE" : "OBJECT",
    term_category: encyclopediaCategoryFromArchive(entry),
    date_context: entry.date_context,
    region: entry.location_name || "unmapped object",
    terrain: entry.visible_surface,
    light_note: entry.camera,
    signal_coverage: entry.signal_coverage || entry.coordinates_status,
    preview: encyclopediaPreview(entry.one_fact || entry.narrative_note || entry.visible_surface),
    definition: encyclopediaDefinitionFromArchive(entry),
    one_fact: entry.one_fact,
    encyclopedia_note: entry.source_note || "",
    coordinates,
    coordinates_verified: coordinates
      ? { status: "matched_from_media_metadata", manifest: coordinates }
      : { status: entry.coordinates_status || "no_coordinates" },
    altitude: Number.isFinite(Number(entry.altitude_m)) ? { meters: Number(entry.altitude_m), status: "media_metadata" } : null,
    location_name: entry.location_name,
    source_note: entry.source_note,
    aliases: entry.search_terms || lexiconAliasesFromName(entry.location_name || entry.title, entry.id || ""),
    related_terms: [entry.location_name, ...(entry.search_terms || [])].filter(Boolean),
  };
}

function makeSearchTextEntry() {
  return makeLexiconEntry({
    key: "IN_PRAISE_OF_SHADOWS",
    label: "In Praise of Shadows",
    type: "BOOK",
    category: "essay / aesthetics",
    date: "1933",
    region: "Japan",
    definition: "In Praise of Shadows is a 1933 essay by Jun'ichiro Tanizaki on aesthetics, architecture, light, darkness, lacquerware, interiors, and the cultural value of shadow.",
    note: "The title is often associated with Japanese aesthetics and with a preference for dimness, patina, indirect light, and incomplete visibility.",
    aliases: ["in praise of shadow", "Tanizaki Junichiro", "谷崎润一郎", "阴翳礼赞", "shadow", "shadows"],
    related: ["Japanese aesthetics", "shadow", "architecture", "lacquerware"],
  });
}

function makeEnvironmentLexiconEntry(group, key, raw) {
  const label = shortLexiconName(raw.full_name || key.replaceAll("_", " "));
  const type = inferEnvironmentTermType(group, raw);
  return makeLexiconEntry({
    key,
    group,
    label,
    type,
    category: type === "ROUTE" ? "route" : "place",
    date: raw.date_context || raw.local_time || raw.time_context,
    region: encyclopediaRegion(raw.full_name || label),
    coordinates: raw.coordinates_verified?.manifest || raw.coordinates_verified?.requested || raw.coordinates,
    altitude: raw.altitude || raw.altitude_verified,
    definition: encyclopediaDefinitionFromEnvironment(raw, label, type),
    note: raw.source_note || raw.narrative_note,
    aliases: lexiconAliasesFromName(raw.full_name || label, key),
    related: [raw.terrain, raw.light_note, raw.signal_coverage].filter(Boolean),
    sourceNote: raw.source_note,
  });
}

function makeEncyclopediaCoreEntries() {
  const fixed = [
    {
      key: "ENCYCLOPEDIA_PLAYING_CARDS",
      label: "Playing cards",
      type: "OBJECT",
      category: "game equipment",
      definition: "Playing cards are portable game objects, usually arranged as a deck with suits and ranks, used for games, divination, probability exercises, and symbolic systems.",
      note: "A standard modern French-suited deck has spades, hearts, diamonds, and clubs, but many regional decks use different suit systems.",
      aliases: ["cards", "deck", "poker cards", "扑克牌", "卡牌"],
      related: ["poker", "suits", "rank", "chance"],
    },
    {
      key: "ENCYCLOPEDIA_CHESS",
      label: "Chess",
      type: "GAME",
      category: "board game",
      definition: "Chess is a two-player strategy board game played on an 8 by 8 grid with pieces that move by fixed rules, aiming to checkmate the opposing king.",
      note: "Its modern international form developed from older South Asian and Persian board-game traditions.",
      aliases: ["chess", "国际象棋", "棋"],
      related: ["board game", "strategy", "king", "checkmate"],
    },
    {
      key: "ENCYCLOPEDIA_DIARY",
      label: "Diary",
      type: "TEXT FORM",
      category: "personal writing",
      definition: "A diary is a dated form of personal writing that records events, observations, moods, routines, and private reflections.",
      note: "Diary writing can be documentary, literary, administrative, or fragmentary.",
      aliases: ["diary", "journal", "日记", "博客"],
      related: ["blog", "memoir", "dated writing"],
    },
    {
      key: "ENCYCLOPEDIA_TXT_FILE",
      label: "TXT file",
      type: "FILE FORMAT",
      category: "plain text",
      definition: "A TXT file is a plain-text file format that stores characters without rich formatting, images, or document layout.",
      note: "Its simplicity makes it readable across many systems and useful for notes, logs, drafts, and minimal documents.",
      aliases: ["txt", "plain text", "text file", "纯文本"],
      related: ["ASCII", "Unicode", "log file"],
    },
    {
      key: "ENCYCLOPEDIA_ABDUCTION_SABINE_WOMEN",
      label: "The Abduction of the Sabine Women",
      type: "ARTWORK / SUBJECT",
      category: "Roman legend in painting",
      definition: "The Abduction of the Sabine Women is a Roman legendary subject often represented in European art, depicting the seizure of Sabine women by Romans after the founding of Rome.",
      note: "Nicolas Poussin painted major versions of the subject, using classical composition to organize violence, gesture, architecture, and color.",
      aliases: ["Sabine Women", "Rape of the Sabine Women", "Poussin", "Roman legend"],
      related: ["Rome", "Sabines", "classical painting"],
    },
    ...makeHiddenEncyclopediaEntries(),
    ...makeCameraLexiconEntries(),
  ];

  return fixed.map((entry) => makeLexiconEntry(entry));
}

function makeHiddenEncyclopediaEntries() {
  return [
    {
      key: "ENCYCLOPEDIA_MONOCHROME_SENSOR",
      label: "Monochrome sensor",
      type: "TECHNOLOGY",
      category: "camera sensor",
      definition: "A monochrome sensor records luminance without a color filter array, producing black-and-white image data directly.",
      note: "Because it does not divide incoming light through color filters, it can produce a distinct tonal response compared with converted color files.",
      aliases: ["black-and-white sensor", "B&W sensor", "monochrome camera"],
      related: ["digital camera", "luminance", "black-and-white photography"],
    },
    {
      key: "ENCYCLOPEDIA_FILM_GRAIN",
      label: "Film grain",
      type: "IMAGE PROPERTY",
      category: "analog photography",
      definition: "Film grain is the visible texture produced by light-sensitive silver halide crystals or dye clouds in photographic film.",
      note: "Grain size and character vary with film stock, exposure, processing, enlargement, and scanning.",
      aliases: ["grain", "颗粒", "silver halide"],
      related: ["negative film", "film scanning", "darkroom"],
    },
    {
      key: "ENCYCLOPEDIA_NEGATIVE_FILM",
      label: "Negative film",
      type: "MATERIAL",
      category: "analog photography",
      definition: "Negative film records light and color as inverted tonal values, producing a negative image that is later printed, scanned, or digitally inverted.",
      note: "Color negative film generally has wide exposure latitude, while black-and-white negative film can be processed in many developers.",
      aliases: ["film negative", "底片", "胶片"],
      related: ["film grain", "film scanning", "darkroom"],
    },
    {
      key: "ENCYCLOPEDIA_FILM_SCANNING",
      label: "Film scanning",
      type: "PROCESS",
      category: "analog-to-digital photography",
      definition: "Film scanning converts photographic film into digital image files using a scanner, camera scanning setup, or lab scanning system.",
      note: "Scanning choices affect sharpness, dust visibility, color interpretation, dynamic range, and apparent grain.",
      aliases: ["scan", "scanning negatives", "扫底", "胶片扫描"],
      related: ["negative film", "digital image", "photography"],
    },
    {
      key: "ENCYCLOPEDIA_LIGHT_METER",
      label: "Light meter",
      type: "TOOL",
      category: "photography",
      definition: "A light meter measures scene brightness or incident light to help determine exposure settings such as aperture, shutter speed, and ISO.",
      note: "Modern cameras usually contain built-in meters, but handheld meters remain useful in studio, cinema, and large-format work.",
      aliases: ["metering", "测光", "exposure meter"],
      related: ["exposure", "aperture", "shutter speed"],
    },
    {
      key: "ENCYCLOPEDIA_FLASH_PHOTOGRAPHY",
      label: "Flash photography",
      type: "TECHNIQUE",
      category: "photography",
      definition: "Flash photography uses a brief burst of artificial light to illuminate a scene, freeze motion, or alter contrast and shadow.",
      note: "On-camera flash often creates direct frontal light, hard shadows, reflective glare, and a distinct snapshot look.",
      aliases: ["flash", "闪光灯", "strobe"],
      related: ["exposure", "night photography", "light meter"],
    },
    {
      key: "ENCYCLOPEDIA_FOCAL_LENGTH",
      label: "Focal length",
      type: "OPTICAL TERM",
      category: "photography",
      definition: "Focal length is an optical measurement, usually in millimeters, that describes a lens's angle of view and magnification on a given camera format.",
      note: "Short focal lengths appear wide; long focal lengths narrow the field of view and enlarge distant subjects.",
      aliases: ["50mm", "28mm", "lens length", "焦距"],
      related: ["lens", "angle of view", "bokeh"],
    },
    {
      key: "ENCYCLOPEDIA_BOKEH",
      label: "Bokeh",
      type: "IMAGE PROPERTY",
      category: "photography",
      definition: "Bokeh refers to the visual quality of out-of-focus areas in a photograph, especially blurred highlights and background rendering.",
      note: "Bokeh depends on lens design, aperture shape, focus distance, background distance, and optical aberrations.",
      aliases: ["background blur", "散景", "out-of-focus rendering"],
      related: ["focal length", "aperture", "lens"],
    },
    {
      key: "ENCYCLOPEDIA_LUCKY_5112",
      label: "Lucky 5112",
      type: "FILM STOCK",
      category: "Chinese photographic film",
      definition: "Lucky 5112 is a Chinese black-and-white motion-picture or photographic film stock often discussed through its contrast, grain, age, and repackaged-roll behavior.",
      note: "Expired or bulk-loaded film can vary noticeably because storage and handling change the final image.",
      aliases: ["乐凯5112", "Lucky film", "5112"],
      related: ["negative film", "film grain", "film scanning"],
    },
    {
      key: "ENCYCLOPEDIA_FUJIFILM_ACROS",
      label: "Fujifilm Neopan Acros",
      type: "FILM STOCK",
      category: "black-and-white film",
      definition: "Fujifilm Neopan Acros is a black-and-white film line known for fine grain, smooth tonality, and controlled reciprocity characteristics.",
      note: "Acros is often associated with clean tonal separation and a refined black-and-white look.",
      aliases: ["Acros", "Neopan Acros", "富士 Acros"],
      related: ["black-and-white film", "film grain", "Foma 100"],
    },
    {
      key: "ENCYCLOPEDIA_FOMA_100",
      label: "Foma 100",
      type: "FILM STOCK",
      category: "black-and-white film",
      definition: "Foma 100 is a black-and-white photographic film made by Foma Bohemia, commonly used for its traditional grain and affordable availability.",
      note: "It is often chosen for everyday analog photography and darkroom experimentation.",
      aliases: ["Fomapan 100", "Foma100", "福马100"],
      related: ["negative film", "film grain", "darkroom"],
    },
    {
      key: "ENCYCLOPEDIA_KODAK_VISION3_5219",
      label: "Kodak Vision3 5219",
      type: "FILM STOCK",
      category: "motion-picture film",
      definition: "Kodak Vision3 5219 is a 500T color negative motion-picture film stock designed for tungsten-balanced low-light cinematography.",
      note: "When repurposed for still photography, it is often processed through cinema-film workflows or remjet-removal services.",
      aliases: ["5219", "Vision3 500T", "Kodak 500T"],
      related: ["motion-picture film", "negative film", "Kodak Vision3 5213"],
    },
    {
      key: "ENCYCLOPEDIA_KODAK_VISION3_5213",
      label: "Kodak Vision3 5213",
      type: "FILM STOCK",
      category: "motion-picture film",
      definition: "Kodak Vision3 5213 is a 200T color negative motion-picture film stock with tungsten balance and moderate sensitivity.",
      note: "Like other cinema stocks, it can be bulk-loaded or repackaged for still-camera use.",
      aliases: ["5213", "Vision3 200T", "Kodak 200T"],
      related: ["motion-picture film", "Kodak Vision3 5219", "negative film"],
    },
    {
      key: "ENCYCLOPEDIA_NIKON_F80",
      label: "Nikon F80",
      type: "CAMERA",
      category: "35mm film SLR",
      definition: "Nikon F80 is a 35mm autofocus film SLR camera introduced by Nikon, positioned as an advanced consumer body with automatic exposure and autofocus features.",
      note: "It is also known as the N80 in some markets.",
      aliases: ["Nikon N80", "F80", "尼康F80"],
      related: ["35mm film", "Nikon F4", "autofocus"],
    },
    {
      key: "ENCYCLOPEDIA_NIKON_F4",
      label: "Nikon F4",
      type: "CAMERA",
      category: "35mm professional film SLR",
      definition: "Nikon F4 is a professional 35mm autofocus film SLR camera introduced by Nikon in the late 1980s.",
      note: "It combines electronic automation with many physical controls and compatibility with a wide range of Nikon F-mount lenses.",
      aliases: ["F4", "尼康F4", "Nikon professional SLR"],
      related: ["35mm film", "Nikon F80", "F-mount"],
    },
    {
      key: "ENCYCLOPEDIA_KONICA_GENBA_KANTOKU_28HG",
      label: "Konica Genba Kantoku 28HG",
      type: "CAMERA",
      category: "rugged compact film camera",
      definition: "Konica Genba Kantoku 28HG is a rugged 35mm compact camera with a wide-angle lens, associated with construction-site or field-use durability.",
      note: "Its Japanese name is often translated as something like site supervisor or field supervisor.",
      aliases: ["现场监督28HG", "Genba Kantoku", "Konica 28HG"],
      related: ["35mm film", "compact camera", "flash photography"],
    },
    {
      key: "ENCYCLOPEDIA_TOPCOR_50MM_F2",
      label: "Tokyo Kogaku Topcor 50mm F2",
      type: "LENS",
      category: "standard lens",
      definition: "Tokyo Kogaku Topcor 50mm F2 is a standard photographic lens associated with Tokyo Kogaku and the Topcon camera system.",
      note: "Older standard lenses are often discussed through rendering qualities such as contrast, flare, swirl, and out-of-focus character.",
      aliases: ["Topcor 50mm F2", "东京光学 50mm F2", "Topcon lens"],
      related: ["focal length", "bokeh", "lens rendering"],
    },
    {
      key: "ENCYCLOPEDIA_LOWER_EAST_SIDE",
      label: "Lower East Side",
      type: "PLACE",
      category: "New York neighborhood",
      region: "Manhattan, New York City",
      definition: "The Lower East Side is a neighborhood in Manhattan historically shaped by immigration, tenements, small businesses, nightlife, art spaces, and dense street life.",
      note: "Its street grid and storefront scale make it highly legible as a walking neighborhood.",
      aliases: ["LES", "下东城", "Lower East Side Manhattan"],
      related: ["Ludlow Street", "Stanton Street", "Rivington Street"],
    },
    {
      key: "ENCYCLOPEDIA_LUDLOW_STREET",
      label: "Ludlow Street",
      type: "PLACE",
      category: "street",
      region: "Lower East Side, Manhattan",
      definition: "Ludlow Street is a north-south street in Manhattan's Lower East Side, associated with storefronts, apartments, bars, restaurants, and street-level urban life.",
      note: "It runs through a dense part of the neighborhood between Houston Street and Canal Street.",
      aliases: ["Ludlow", "Ludlow St"],
      related: ["Lower East Side", "Stanton Street", "Rivington Street"],
    },
    {
      key: "ENCYCLOPEDIA_STANTON_STREET",
      label: "Stanton Street",
      type: "PLACE",
      category: "street",
      region: "Lower East Side, Manhattan",
      definition: "Stanton Street is an east-west street on Manhattan's Lower East Side, crossing a neighborhood known for dense residential blocks and small storefronts.",
      note: "It is one of the named streets that helps locate the Lower East Side street grid.",
      aliases: ["Stanton", "Stanton St"],
      related: ["Lower East Side", "Ludlow Street", "Rivington Street"],
    },
    {
      key: "ENCYCLOPEDIA_RIVINGTON_STREET",
      label: "Rivington Street",
      type: "PLACE",
      category: "street",
      region: "Lower East Side, Manhattan",
      definition: "Rivington Street is an east-west street in Manhattan's Lower East Side, known for residential buildings, restaurants, shops, and nightlife.",
      note: "Together with Ludlow and Stanton, it names a recognizable section of the neighborhood.",
      aliases: ["Rivington", "Rivington St"],
      related: ["Lower East Side", "Ludlow Street", "Stanton Street"],
    },
    {
      key: "ENCYCLOPEDIA_JERSEY_CITY",
      label: "Jersey City",
      type: "PLACE",
      category: "city",
      region: "New Jersey, United States",
      definition: "Jersey City is a city in Hudson County, New Jersey, located across the Hudson River from Lower Manhattan.",
      note: "Its waterfront and transit links connect it closely to New York City commuting patterns.",
      aliases: ["JC", "Hudson County", "新泽西"],
      related: ["PATH train", "Hudson River", "New York City"],
    },
    {
      key: "ENCYCLOPEDIA_COPENHAGEN_AIRPORT",
      label: "Copenhagen Airport",
      type: "PLACE",
      category: "airport",
      region: "Kastrup, Denmark",
      definition: "Copenhagen Airport, also called Kastrup Airport, is the main international airport serving Copenhagen and the surrounding region.",
      note: "It functions as a major Nordic transfer airport.",
      aliases: ["Kastrup Airport", "CPH", "Københavns Lufthavn", "哥本哈根机场"],
      related: ["airport transit", "Denmark", "layover"],
    },
    {
      key: "ENCYCLOPEDIA_BRISBANE_RIVER",
      label: "Brisbane River",
      type: "PLACE",
      category: "river",
      region: "Queensland, Australia",
      definition: "The Brisbane River is a major river in South East Queensland flowing through the city of Brisbane toward Moreton Bay.",
      note: "It shapes the city's ferry routes, bridges, flood history, and riverside urban development.",
      aliases: ["布里斯班河"],
      related: ["Brisbane", "CityCat", "Moreton Bay"],
    },
    {
      key: "ENCYCLOPEDIA_CITYCAT",
      label: "CityCat",
      type: "TRANSPORT",
      category: "ferry service",
      region: "Brisbane, Queensland",
      definition: "CityCat is Brisbane's high-speed catamaran ferry service operating along the Brisbane River.",
      note: "It is both public transport and a way to experience the river geography of the city.",
      aliases: ["Brisbane CityCat", "ferry", "布里斯班渡轮"],
      related: ["Brisbane River", "public transport", "catamaran"],
    },
    {
      key: "ENCYCLOPEDIA_YARRA_RIVER",
      label: "Yarra River",
      type: "PLACE",
      category: "river",
      region: "Victoria, Australia",
      definition: "The Yarra River flows through Melbourne and into Port Phillip Bay, forming a central geographic and cultural line through the city.",
      note: "Its lower urban section is closely tied to Melbourne's bridges, promenades, transport, and civic spaces.",
      aliases: ["Yarra", "雅拉河"],
      related: ["Melbourne", "Port Phillip Bay", "Victoria"],
    },
    {
      key: "ENCYCLOPEDIA_GREAT_ALPINE_ROAD",
      label: "Great Alpine Road",
      type: "ROUTE",
      category: "road",
      region: "Victoria, Australia",
      definition: "The Great Alpine Road is a scenic road route in Victoria crossing high-country landscapes between the Wangaratta area and East Gippsland.",
      note: "It is associated with mountain roads, seasonal weather, towns such as Bright, and access to alpine regions.",
      aliases: ["Victoria High Country road", "Alpine Road"],
      related: ["Bright", "Wangaratta", "Mount Hotham"],
    },
    {
      key: "ENCYCLOPEDIA_MOUNT_TAI",
      label: "Mount Tai",
      type: "PLACE",
      category: "sacred mountain",
      region: "Tai'an, Shandong, China",
      definition: "Mount Tai, or Taishan, is a historically important mountain in Shandong, long associated with imperial rites, pilgrimage, inscriptions, temples, and sunrise views.",
      note: "Its cultural status is as important as its physical summit.",
      aliases: ["Taishan", "泰山", "Tai Shan"],
      related: ["Tai'an", "Jade Emperor Peak", "pilgrimage"],
    },
    {
      key: "ENCYCLOPEDIA_LANGSHAN",
      label: "Langshan",
      type: "PLACE",
      category: "hill / scenic area",
      region: "Nantong, Jiangsu, China",
      definition: "Langshan, or Wolf Mountain, is a scenic hill area in Nantong near the Yangtze River, associated with temples, views, gardens, and local tourism.",
      note: "It is one of Nantong's best-known landscape and religious sites.",
      aliases: ["Wolf Mountain", "狼山", "Langshan Scenic Area"],
      related: ["Nantong", "Guangjiao Temple", "Yangtze River"],
    },
    {
      key: "ENCYCLOPEDIA_GUANGJIAO_TEMPLE",
      label: "Guangjiao Temple",
      type: "PLACE",
      category: "Buddhist temple",
      region: "Langshan, Nantong, Jiangsu",
      definition: "Guangjiao Temple is a Buddhist temple associated with the Langshan scenic area in Nantong.",
      note: "Temple names in scenic areas often connect religious practice, tourism, historical memory, and landscape viewing.",
      aliases: ["广教寺", "广教禅寺", "Guangjiao Chan Temple"],
      related: ["Langshan", "Nantong", "Buddhist temple"],
    },
    {
      key: "ENCYCLOPEDIA_HAO_RIVER",
      label: "Hao River",
      type: "PLACE",
      category: "urban river / moat",
      region: "Nantong, Jiangsu, China",
      definition: "Hao River is an urban river and historic moat landscape in Nantong, forming a recognizable ring-like water system in the city center.",
      note: "It is often used as a walking, leisure, and scenic route through the city.",
      aliases: ["濠河", "Haohe", "Nantong moat"],
      related: ["Nantong", "Sports Park", "urban river"],
    },
    {
      key: "ENCYCLOPEDIA_GRAND_CANAL",
      label: "Grand Canal",
      type: "PLACE / ROUTE",
      category: "canal system",
      region: "China",
      definition: "The Grand Canal is a vast historic canal system in China connecting major river basins, cities, transport routes, and cultural landscapes.",
      note: "In Jiangsu, canal cities often combine transport history, urban life, water management, and heritage tourism.",
      aliases: ["京杭大运河", "大运河", "China Grand Canal"],
      related: ["Huai'an", "canal", "water transport"],
    },
    {
      key: "ENCYCLOPEDIA_HULUN_LAKE",
      label: "Hulun Lake",
      type: "PLACE",
      category: "lake",
      region: "Inner Mongolia, China",
      definition: "Hulun Lake, also known as Dalai Lake, is a large freshwater lake in Inner Mongolia near the Hulunbuir grasslands.",
      note: "The surrounding region is associated with steppe ecology, borderland geography, and wide open grassland landscapes.",
      aliases: ["Dalai Lake", "呼伦湖", "达赉湖"],
      related: ["Hulunbuir", "Inner Mongolia", "grassland"],
    },
    {
      key: "ENCYCLOPEDIA_GENGHIS_KHAN_TETHERING_POST",
      label: "Genghis Khan's Tethering Post",
      type: "PLACE / LEGEND",
      category: "named site",
      region: "Hulun Lake area, Inner Mongolia",
      definition: "Genghis Khan's Tethering Post is a named site associated with local legend and commemoration around the Hulun Lake area.",
      note: "Such place names often combine tourism, oral history, monument culture, and regional identity.",
      aliases: ["成吉思汗拴马桩", "tethering post", "Genghis Khan site"],
      related: ["Hulun Lake", "Inner Mongolia", "Mongol history"],
    },
    {
      key: "ENCYCLOPEDIA_NANXIANG_ANCIENT_TOWN",
      label: "Nanxiang Ancient Town",
      type: "PLACE",
      category: "historic town",
      region: "Jiading District, Shanghai",
      definition: "Nanxiang Ancient Town is a historic town area in Shanghai's Jiading District, known for old streets, gardens, temples, and xiaolongbao food culture.",
      note: "It is one of the better-known historic-town destinations within greater Shanghai.",
      aliases: ["南翔古镇", "Nanxiang", "南翔"],
      related: ["Shanghai", "Jiading", "xiaolongbao"],
    },
    {
      key: "ENCYCLOPEDIA_SCHOOL_OF_VISUAL_ARTS",
      label: "School of Visual Arts",
      type: "INSTITUTION",
      category: "art school",
      region: "New York City",
      definition: "School of Visual Arts is a private art and design college in New York City with programs across visual art, design, film, photography, and related fields.",
      note: "Its Manhattan location connects studio education with New York's galleries, streets, and creative industries.",
      aliases: ["SVA", "纽约视觉艺术学院", "School of Visual Arts NYC"],
      related: ["New York City", "art school", "photography"],
    },
    {
      key: "ENCYCLOPEDIA_UNIVERSITY_OF_QUEENSLAND",
      label: "University of Queensland",
      type: "INSTITUTION",
      category: "university",
      region: "Brisbane, Queensland",
      definition: "The University of Queensland is a major Australian research university with its main campus at St Lucia in Brisbane.",
      note: "The St Lucia campus sits near a bend of the Brisbane River.",
      aliases: ["UQ", "昆士兰大学", "University of Queensland St Lucia"],
      related: ["Brisbane", "St Lucia", "Brisbane River"],
    },
  ];
}

function makeCameraLexiconEntries() {
  return [
    ["Apple iPhone 14", "CAMERA", "smartphone", "Apple iPhone 14 is a smartphone released in 2022 with integrated cameras and computational photography features.", ["iphone", "phone", "Apple"]],
    ["Canon EOS-1D X", "CAMERA", "digital SLR", "Canon EOS-1D X is a professional full-frame DSLR camera introduced by Canon as part of its EOS-1 series.", ["canon", "1dx", "EOS-1D X", "DSLR"]],
    ["PENTAX Q-S1", "CAMERA", "mirrorless camera", "PENTAX Q-S1 is a compact interchangeable-lens mirrorless camera in Ricoh's Pentax Q system.", ["pentax", "Q-S1", "QS1", "mirrorless"]],
    ["PENTAX K-3 Mark III Monochrome", "CAMERA", "monochrome digital SLR", "PENTAX K-3 Mark III Monochrome is a Ricoh Imaging digital SLR designed for black-and-white photography with a monochrome image sensor.", ["ricoh", "monochrome", "K-3", "black and white"]],
  ].map(([label, type, category, definition, aliases]) => ({
    key: `ENCYCLOPEDIA_${String(label).replace(/\W+/g, "_").toUpperCase()}`,
    label,
    type,
    category,
    definition,
    note: "Camera models are listed here as object names, not as project controls.",
    aliases,
    related: ["camera", "photography", "metadata"],
  }));
}

function makeLexiconEntry({ key, group = "ENCYCLOPEDIA", label, type, category, date, region, definition, note, coordinates, altitude, aliases = [], related = [], sourceNote = "" }) {
  const raw = {
    full_name: label,
    term_type: type || "ENTRY",
    term_category: category || "general",
    date_context: date || "—",
    region: region || "—",
    preview: encyclopediaPreview(definition || note || label),
    definition: definition || "Encyclopedia entry.",
    one_fact: definition || "Encyclopedia entry.",
    encyclopedia_note: note || "",
    coordinates,
    altitude,
    aliases,
    related_terms: related,
    source_note: sourceNote,
  };
  return {
    key,
    group,
    raw,
    label,
    search: [
      label,
      type,
      category,
      date,
      region,
      definition,
      note,
      sourceNote,
      ...aliases,
      ...related,
    ].filter(Boolean).join(" ").toLowerCase(),
  };
}

function renderSearchWindow(query, results, detail) {
  const entries = state.environmentEntries || [];
  const needle = query.trim().toLowerCase();
  const matches = entries.filter((entry) => !needle || entry.search.includes(needle));
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
  const altitude = raw.altitude_verified ?? raw.altitude;
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

function formatLexiconList(value, limit = 5) {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  if (!list.length) return "—";
  const shown = list.slice(0, limit).map((item) => String(item));
  const rest = list.length - shown.length;
  return rest > 0 ? `${shown.join("; ")}; +${rest}` : shown.join("; ");
}

function shortLexiconName(name) {
  const text = String(name || "").trim();
  if (!text) return "Untitled term";
  const cleaned = text
    .replace(/, People's Republic of China$/i, "")
    .replace(/, United States$/i, "")
    .replace(/, Australia$/i, "")
    .replace(/, Denmark$/i, "")
    .replace(/\s+specifically\s+.+$/i, "");
  const first = cleaned.split(",")[0]?.trim() || cleaned;
  return first.length > 68 ? `${first.slice(0, 65)}...` : first;
}

function lexiconAliasesFromName(name, key) {
  const text = String(name || "");
  const parts = text
    .split(/[,/()：:;|]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && part.length < 64);
  return [...new Set(parts)].slice(0, 10);
}

function inferEnvironmentTermType(group, raw) {
  const text = [group, raw.full_name, raw.terrain, raw.one_fact].filter(Boolean).join(" ").toLowerCase();
  if (text.includes("route") || text.includes("corridor") || text.includes("transit") || text.includes("path")) return "ROUTE";
  return "PLACE";
}

function encyclopediaCategoryFromArchive(entry) {
  const text = [entry.title, entry.location_name, entry.camera, entry.visible_surface].filter(Boolean).join(" ").toLowerCase();
  if (text.includes("canon") || text.includes("pentax") || text.includes("ricoh")) return "camera object";
  if (text.includes("mount tai") || text.includes("altitude") || text.includes("route")) return "place / mountain route";
  if (text.includes("victoria") || text.includes("melbourne") || text.includes("brisbane")) return "place / Australia";
  if (text.includes("nantong") || text.includes("huaian") || text.includes("changshu")) return "place / Jiangsu";
  return entry.coordinates ? "place" : "object";
}

function encyclopediaDefinitionFromArchive(entry) {
  const name = entry.location_name || entry.title || "This entry";
  if (entry.coordinates) {
    const altitude = Number.isFinite(Number(entry.altitude_m)) ? ` The recorded elevation is approximately ${Math.round(Number(entry.altitude_m))} meters.` : "";
    const source = entry.source_note ? ` ${entry.source_note}` : "";
    return `${name} is a place entry with coordinates ${entry.coordinates.lat.toFixed(5)}, ${entry.coordinates.lon.toFixed(5)}.${altitude}${source}`.trim();
  }
  return `${name} is an object entry without stable geographic coordinates.`.trim();
}

function encyclopediaDefinitionFromEnvironment(raw, label, type) {
  const where = raw.full_name || label;
  const surface = raw.one_fact || raw.terrain || raw.terrain_detail || "";
  const coords = extractEnvironmentCoordinates(raw);
  const altitude = extractEnvironmentAltitude(raw);
  const typeText = type === "ROUTE" ? "route or corridor" : "place";
  return `${where} is listed as a ${typeText}.${coords !== "—" ? ` Coordinates: ${coords}.` : ""}${altitude !== "—" ? ` Approximate altitude: ${altitude}.` : ""} ${surface}`.trim();
}

function encyclopediaRegion(name) {
  const text = String(name || "");
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) return parts.slice(1).join(", ");
  if (/Australia|Queensland|Victoria|Melbourne|Brisbane/i.test(text)) return "Australia";
  if (/China|Jiangsu|Gansu|Qinghai|Heilongjiang|Inner Mongolia|Shandong/i.test(text)) return "China";
  if (/New York|Brooklyn|Manhattan|Queens|Pennsylvania|New Jersey/i.test(text)) return "United States";
  return "—";
}

function encyclopediaPreview(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  return value.length > 150 ? `${value.slice(0, 147)}...` : value;
}

function coordinateStringToObject(value) {
  const match = String(value || "").match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;
  return { lat: Number(match[1]), lon: Number(match[2]) };
}

function dedupeLexiconEntries(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = `${entry.raw?.term_type || ""}:${String(entry.label || "").toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortEncyclopediaEntries(entries) {
  return [...entries].sort((a, b) => encyclopediaSortKey(a).localeCompare(encyclopediaSortKey(b), "en", {
    sensitivity: "base",
    numeric: true,
  }));
}

function encyclopediaSortKey(entry) {
  const label = String(entry?.label || "").trim();
  const asciiFirst = /^[A-Za-z0-9]/.test(label) ? "0" : "1";
  return `${asciiFirst}:${label}`;
}

function extractWhyStayed(raw) {
  const note = String(raw.narrative_note || "");
  if (note) return note;
  const chapter = raw.chapter_relevance || "";
  if (chapter === "CH01") return "because the room kept recording a night that did not move.";
  if (chapter === "CH02") return "because the map became less certain than the road.";
  if (chapter === "CH03") return "because ordinary life needed a place between departure and ascent.";
  if (chapter === "CH04") return "because the route had a measurable weight.";
  if (chapter === "CH05") return "because the commute repeated until it looked like evidence.";
  if (chapter === "CH06") return "because the camera kept looking after the trip ended.";
  if (String(chapter).includes("HOMETOWN")) return "because ordinary coordinates can carry more pressure than landmarks.";
  if (String(chapter).includes("ASCENT")) return "because altitude briefly made the route measurable.";
  if (String(chapter).includes("BRISBANE")) return "because the commute repeated until it looked like evidence.";
  if (String(chapter).includes("AFTERIMAGE")) return "because the camera kept looking after the map stopped helping.";
  if (chapter === "INT") return "because no reason was provided.";
  return "because it remained in the folder.";
}

function randomSearchAside(raw) {
  const options = [
    `related: ${formatLexiconList(raw.related_terms, 8)}`,
    `other names: ${formatLexiconList(raw.aliases, 8)}`,
    `source: ${formatSearchValue(raw.source_note)}`,
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
  let activeSection = "desktop";

  const sidebar = document.createElement("div");
  sidebar.className = "finder-sidebar";

  const main = document.createElement("div");
  main.className = "finder-main";

  const preview = document.createElement("aside");
  preview.className = "finder-preview";

  const statusbar = document.createElement("div");
  statusbar.className = "finder-statusbar";
  statusbar.textContent = "ready";

  const sections = [
    { key: "desktop", icon: "▣", label: "OBJECTS" },
    { key: "windows", icon: "⊡", label: "OPEN WINDOWS" },
    { key: "system",  icon: "◈", label: "SYSTEM" },
  ];

  function renderSection(key) {
    activeSection = key;
    layout.dataset.section = key;
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
        {
          icon: "▶",
          name: "NYE_3SEC.MOV",
          kind: "QuickTime Movie",
          kindShort: "Movie",
          id: "nye",
          size: "175.4 MB",
          status: "Readable",
          details: [
            ["Kind", "QuickTime Movie"],
            ["Size", "175.4 MB on disk"],
            ["Created", "2024-09-01 20:01:45"],
            ["Modified", "2024-09-02 10:01:45"],
            ["Duration", "00:03"],
            ["Codec", "HEVC / AAC"],
            ["Device", "iPhone / iOS 17.5.1"],
            ["Where", "~/Desktop/in_praiseof_time/IMG_1401.MOV"],
            ["Coordinates", "40.7141, -73.9735"],
            ["Permissions", "You can read and write"],
          ],
        },
        {
          icon: "▶",
          name: "NANXIANG.MOV",
          kind: "QuickTime Movie",
          kindShort: "Movie",
          id: "nanxiang",
          size: "2.7 MB",
          status: "Readable",
          details: [
            ["Kind", "QuickTime Movie"],
            ["Size", "2.7 MB on disk"],
            ["Created", "2024-01-12 20:55:17"],
            ["Modified", "2024-01-12 22:55:17"],
            ["Duration", "00:04"],
            ["Codec", "HEVC / AAC"],
            ["Device", "iPhone / iOS 16.6"],
            ["Where", "~/Desktop/in_praiseof_time/IMG_0196.MOV"],
            ["Coordinates", "31.2869, 121.3215"],
            ["Altitude", "11.7 m"],
          ],
        },
        {
          icon: "▶",
          name: "BRISBANE_WATER.MOV",
          kind: "QuickTime Movie",
          kindShort: "Movie",
          id: "brisbane",
          size: "52.0 MB",
          status: "Readable",
          details: [
            ["Kind", "QuickTime Movie"],
            ["Size", "52.0 MB on disk"],
            ["Created", "2025-08-22 17:20:13"],
            ["Modified", "2025-08-22 17:20:13"],
            ["Duration", "00:16"],
            ["Codec", "HEVC / AAC"],
            ["Device", "iPhone / iOS 18.1.1"],
            ["Where", "~/Desktop/in_praiseof_time/IMG_5523.MOV"],
            ["Coordinates", "-27.4431, 153.0639"],
            ["Altitude", "5.4 m"],
          ],
        },
        {
          icon: "?",
          name: "NO_GPS",
          kind: "Data Document",
          kindShort: "Data",
          id: "nogps",
          size: "metadata",
          status: "Partial",
          details: [
            ["Kind", "Data Document"],
            ["Size", "metadata record"],
            ["Created", "2024-07-04 01:46:56 UTC"],
            ["Modified", "2026-05-15 14:12:00"],
            ["Source File", "IMG_8084.MOV"],
            ["Location", "No GPS payload"],
            ["Altitude", "not available"],
            ["Signal", "location services unavailable"],
            ["Permissions", "Read only"],
          ],
        },
        {
          icon: "☰",
          name: "README.txt",
          kind: "Plain Text Document",
          kindShort: "Text",
          id: "readme",
          size: "4 KB",
          status: "Readable",
          details: [
            ["Kind", "Plain Text Document"],
            ["Size", "4 KB on disk"],
            ["Created", "2026-05-14 17:42:13"],
            ["Modified", "2026-05-14 17:42:13"],
            ["Encoding", "UTF-8 text"],
            ["Where", "~/Desktop/in_praiseof_time/README.txt"],
            ["Permissions", "You can read and write"],
          ],
        },
        {
          icon: "□",
          name: "The Abduction of the Sabine Women_Dai Pan_1_3.pdf",
          kind: "PDF Document",
          kindShort: "PDF",
          id: "sabine",
          size: "56 KB",
          status: "Readable",
          details: [
            ["Kind", "PDF Document"],
            ["Size", "56 KB on disk"],
            ["Created", "2025-04-15 01:45:59"],
            ["Modified", "2025-04-15 01:45:59"],
            ["Pages", "2"],
            ["Original", "The Abduction of the Sabine Women_Dai Pan_1_3.pdf"],
            ["Where", "~/Desktop/in_praiseof_time/"],
            ["Permissions", "You can read and write"],
          ],
        },
        {
          icon: "☰",
          name: "OBJECTS_INDEX.txt",
          kind: "Plain Text Document",
          kindShort: "Text",
          size: "1 KB",
          status: "Readable",
          details: [
            ["Kind", "Plain Text Document"],
            ["Size", "1 KB on disk"],
            ["Created", "2026-05-15 13:58:41"],
            ["Modified", "2026-05-15 15:08:10"],
            ["Encoding", "UTF-8 text"],
            ["Where", "~/Library/Application Support/in_praise/objects/"],
            ["Permissions", "You can read and write"],
          ],
          content: [
            "OBJECTS_INDEX.txt",
            "",
            "Name: OBJECTS_INDEX.txt",
            "Kind: Plain Text Document",
            "Size: 1 KB on disk",
            "Created: 2026-05-15 13:58:41",
            "Modified: 2026-05-15 15:08:10",
            "Encoding: UTF-8",
            "Where: ~/Library/Application Support/in_praise/objects/",
            "",
            "Inventory:",
            "QuickTime Movie      3 files",
            "Plain Text Document  3 files",
            "PDF Document         1 file",
            "Data Document        1 file",
            "Unreadable archive   3 files",
          ],
        },
        {
          icon: "☰",
          name: "FREE_SPACE_NOTE.txt",
          kind: "Plain Text Document",
          kindShort: "Text",
          size: "784b",
          status: "Readable",
          details: [
            ["Kind", "Plain Text Document"],
            ["Size", "784 bytes"],
            ["Created", "2026-05-15 14:02:12"],
            ["Modified", "2026-05-15 14:19:44"],
            ["Encoding", "UTF-8 text"],
            ["Where", "~/Desktop/in_praiseof_time/.system/notes/"],
            ["Permissions", "You can read and write"],
          ],
          content: [
            "FREE_SPACE_NOTE.txt",
            "",
            "Name: Macintosh HD",
            "Capacity: 994.66 GB",
            "Available: 112.26 GB",
            "Purgeable: not reported",
            "Format: APFS",
            "",
            "Note:",
            "The system can report available storage.",
            "It cannot report whether a file should be kept.",
          ],
        },
        {
          icon: "☰",
          name: "ROUTE_CACHE.txt",
          kind: "Plain Text Document",
          kindShort: "Text",
          size: "2.1k",
          status: "Readable",
          details: [
            ["Kind", "Plain Text Document"],
            ["Size", "2 KB on disk"],
            ["Created", "2026-05-15 14:03:50"],
            ["Modified", "2026-05-15 14:27:16"],
            ["Encoding", "UTF-8 text"],
            ["Where", "~/Library/Caches/in_praise/routes/"],
            ["Permissions", "You can read and write"],
          ],
          content: [
            "ROUTE_CACHE.txt",
            "",
            "Cached route names only. Not navigation data.",
            "",
            "2024-02  Lower East Side / New York City",
            "2024-07  Qiqihar -> Arxan -> Hulun Lake -> Jilin",
            "2025-07  Baiyin -> Gulang -> Qilian -> Xining",
            "2025-08  Hamilton -> UQ Lakes -> Brisbane River",
            "2026-04  Wangaratta -> Bright -> Melbourne -> Queensland",
            "",
            "Checksum: local-only",
            "Map provider: none",
          ],
        },
        {
          icon: "!",
          name: "IMG_8084.gps",
          kind: "GPS Sidecar File",
          kindShort: "Sidecar",
          size: "0b",
          status: "Unreadable",
          broken: true,
          details: [
            ["Kind", "GPS Sidecar File"],
            ["Size", "0 bytes"],
            ["Created", "2024-07-04 01:46:56 UTC"],
            ["Modified", "2026-05-15 14:22:08"],
            ["Source File", "IMG_8084.MOV"],
            ["Status", "No coordinate payload"],
            ["Error", "kCLLocationCoordinate2DInvalid"],
            ["Permissions", "Read only"],
          ],
          content: [
            "IMG_8084.gps",
            "",
            "Get Info",
            "Kind: GPS Sidecar File",
            "Size: 0 bytes",
            "Created: 2024-07-04 01:46:56 UTC",
            "Source file: IMG_8084.MOV",
            "Location field: null",
            "Altitude field: null",
            "",
            "The movie file is readable.",
            "The coordinate sidecar is empty.",
          ],
        },
        {
          icon: "!",
          name: "calendar_old.ics",
          kind: "iCalendar File",
          kindShort: "Calendar",
          size: "4k?",
          status: "Damaged",
          broken: true,
          details: [
            ["Kind", "iCalendar File"],
            ["Size", "4 KB, partial"],
            ["Created", "2024-07-04 00:00:00"],
            ["Modified", "2026-05-15 14:24:51"],
            ["Encoding", "UTF-8 / CRLF"],
            ["Status", "VEVENT body truncated"],
            ["Importer", "Calendar.app could not repair this file"],
          ],
          content: [
            "calendar_old.ics",
            "",
            "Kind: iCalendar File",
            "Size: 4 KB, partial",
            "Importer: Calendar.app",
            "Status: damaged",
            "",
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            "DTSTART:20240704",
            "SUMMARY:北上",
            "DESCRIPTION:[truncated]",
            "END:VEVENT",
            "",
            "Parser stopped before the return route.",
          ],
        },
        {
          icon: "!",
          name: "voice_note.aif",
          kind: "AIFF Audio File",
          kindShort: "Audio",
          size: "??",
          status: "Unreadable",
          broken: true,
          details: [
            ["Kind", "AIFF Audio File"],
            ["Size", "unknown"],
            ["Created", "2025-12-24 07:31:09"],
            ["Modified", "2026-05-15 14:26:05"],
            ["Sample Rate", "not available"],
            ["Channels", "not available"],
            ["Status", "header missing FORM chunk"],
          ],
          content: [
            "voice_note.aif",
            "",
            "Kind: AIFF Audio File",
            "Status: unreadable",
            "Error: Missing FORM chunk at byte 0.",
            "Sample rate: not available",
            "Channels: not available",
            "",
            "QuickTime Player cannot open this file.",
            "No transcript could be generated.",
          ],
        },
      ];
      main.appendChild(finderColumnHeader(["", "NAME", "KIND", "SIZE", ""]));
      files.forEach((f) => {
        const btn = document.createElement("div");
        btn.className = "finder-item";
        btn.tabIndex = 0;
        const iconEl = Object.assign(document.createElement("span"), { className: "finder-item-icon", textContent: f.icon });
        const nameEl = Object.assign(document.createElement("span"), { className: "finder-item-name", textContent: f.name });
        const metaEl = Object.assign(document.createElement("span"), { className: "finder-item-meta", textContent: f.kindShort || f.kind || "Document" });
        const sizeEl = Object.assign(document.createElement("span"), { className: "finder-item-size", textContent: f.size || "—" });
        const actionEl = document.createElement("button");
        actionEl.type = "button";
        actionEl.className = `finder-row-action${f.broken ? " is-broken" : ""}`;
        actionEl.textContent = f.broken ? "INFO" : "OPEN";
        btn.append(iconEl, nameEl, metaEl, sizeEl, actionEl);
        const action = () => openFinderObject(f);
        actionEl.addEventListener("click", (event) => {
          event.stopPropagation();
          action();
        });
        btn.addEventListener("click", () => {
          main.querySelectorAll(".finder-item").forEach((item) => item.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          setPreview(f.name, { icon: f.icon, kind: f.kind || "Document" }, f.details || [
            ["Kind", f.kind || "Document"],
            ["Status", f.status || (f.broken ? "Damaged" : "Readable")],
            ["Size", f.size || "—"],
          ], action);
          if (!f.id && (f.content || f.broken)) action();
        });
        btn.addEventListener("dblclick", action);
        btn.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") action();
        });
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
        main.appendChild(finderColumnHeader(["", "WINDOW", "STATE", "SIZE", ""]));
        openWins.forEach((w) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "finder-item";
          const iconEl = Object.assign(document.createElement("span"), { className: "finder-item-icon", textContent: "⊡" });
          const nameEl = Object.assign(document.createElement("span"), { className: "finder-item-name", textContent: w.name.toUpperCase() });
          const rect = w.ref.getBoundingClientRect();
          const metaEl = Object.assign(document.createElement("span"), { className: "finder-item-meta", textContent: "visible" });
          const sizeEl = Object.assign(document.createElement("span"), { className: "finder-item-size", textContent: `${Math.round(rect.width)}×${Math.round(rect.height)}` });
          btn.append(iconEl, nameEl, metaEl, sizeEl);
          const action = () => bringWindowForward(w.ref);
          btn.addEventListener("click", () => {
            main.querySelectorAll(".finder-item").forEach((item) => item.classList.remove("is-selected"));
            btn.classList.add("is-selected");
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
      const hardware = [
        ["MODEL", "MacBook Pro 13-inch, M1, 2020"],
        ["NAME", "Dai Pan MacBook Pro"],
        ["CHIP", "Apple M1"],
        ["MEMORY", "16 GB"],
        ["SERIAL", "C02DT••••KPF"],
      ];
      const software = [
        ["OS", "macOS Tahoe 26.4"],
        ["DISPLAY", "Built-in Retina 13.3 inch / 2560×1600"],
        ["STORAGE", "Macintosh HD / 112.26 GB available of 994.66 GB"],
        ["INPUT", "trackpad wheel preserved inside windows"],
      ];
      const runtime = [
        ["ARCHIVE", "in_praise_of_time"],
        ["UPTIME", sessionDuration()],
        ["ACTIVE", (state.chapter || "----").toUpperCase()],
        ["CURRENT", state.currentClip || state.currentMediaItem?.file || "----"],
        ["VIEWPORT", `${window.innerWidth} × ${window.innerHeight}`],
        ["PLATFORM", navigator.platform || "unknown"],
      ];
      appendFinderSystemGroup(main, "MACHINE", hardware);
      appendFinderSystemGroup(main, "SOFTWARE / DISPLAY", software);
      appendFinderSystemGroup(main, "ARCHIVE RUNTIME", runtime);
      setPreview("MacBook Pro", { icon: "◈", kind: "system profile" }, [
        ...hardware.slice(0, 4),
        ["OS", "macOS Tahoe 26.4"],
        ["INPUT", "native trackpad scroll"],
      ]);
      statusbar.textContent = "system profile / archive runtime";
    }
  }

  // Build sidebar
  const locHeader = Object.assign(document.createElement("div"), { className: "finder-section-label", textContent: "BROWSE" });
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
  win._finderRender = (key = activeSection) => renderSection(key);
  win._finderActiveSection = () => activeSection;
  return win;
}

function finderColumnHeader(labels) {
  const row = document.createElement("div");
  row.className = "finder-column-header";
  labels.forEach((label) => row.appendChild(Object.assign(document.createElement("span"), { textContent: label })));
  return row;
}

function appendFinderSystemGroup(parent, title, rows) {
  const heading = Object.assign(document.createElement("div"), { className: "finder-readout-heading", textContent: title });
  parent.appendChild(heading);
  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "finder-readout-row";
    const lblEl = Object.assign(document.createElement("span"), { className: "finder-readout-label", textContent: label });
    const valEl = Object.assign(document.createElement("span"), { className: "finder-readout-value", textContent: value });
    row.append(lblEl, valEl);
    parent.appendChild(row);
  });
}

function openFinderObject(item) {
  if (item.id) {
    openDesktopObject(item.id);
    return;
  }
  closeOldestWindowsForNewOne();
  const shell = document.createElement("pre");
  shell.className = `trash-doc finder-object-doc${item.broken ? " finder-object-broken" : ""}`;
  shell.textContent = (item.content || [item.note || "No readable content."]).join("\n");
  const win = createSizedDesktopWindow(item.name, shell, item.broken ? "desktop-window-object-broken" : "desktop-window-object-text");
  mountDesktopWindow(win, {
    id: `finder-${String(item.name).replace(/\W+/g, "-").toLowerCase()}`,
    kind: "object",
    left: 420 + Math.floor(Math.random() * 80),
    top: 160 + Math.floor(Math.random() * 80),
  });
}

function updateFinderWindow(win = findWindowById("finder")) {
  if (!win) return;
  if (win._finderRender) win._finderRender(win._finderActiveSection?.() || "desktop");
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
  const head = document.createElement("div");
  head.className = "note-head";
  head.innerHTML = `<div>NOTE.pad</div><span>local scratch file</span>`;
  const tools = document.createElement("div");
  tools.className = "note-tools";
  const textarea = document.createElement("textarea");
  textarea.spellcheck = false;
  textarea.setAttribute("autocorrect", "off");
  textarea.autocapitalize = "off";
  textarea.autocomplete = "off";
  textarea.placeholder = "type here...";
  textarea.value = sessionStorage.getItem("note_content") || "";
  const footer = document.createElement("div");
  footer.className = "note-footer";
  const stamp = document.createElement("button");
  stamp.type = "button";
  stamp.textContent = "[time]";
  const sticky = document.createElement("button");
  sticky.type = "button";
  sticky.textContent = "[sticky]";
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
  stamp.addEventListener("click", () => {
    const stampText = new Date().toLocaleString("en-AU", { hour12: false });
    textarea.setRangeText(`[${stampText}]`, textarea.selectionStart, textarea.selectionEnd, "end");
    update();
    textarea.focus();
  });
  sticky.addEventListener("click", () => {
    createStickyNote({ content: textarea.value.trim() || "new note" });
  });
  textarea.addEventListener("input", update);
  tools.append(stamp, sticky, clear);
  footer.append(
    Object.assign(document.createElement("span"), { textContent: "sessionStorage / autosaved" }),
    count
  );
  shell.append(head, tools, textarea, footer);
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
  (state.mediaArchiveEntries || []).forEach((entry) => {
    (entry.calendar_events || []).forEach((event) => {
      if (!event.date || !event.label) return;
      events[event.date] = events[event.date] || [];
      events[event.date].push(event.label);
    });
  });
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
    <span>five-card draw / click cards to hold</span>
  `;

  const table = document.createElement("div");
  table.className = "cards-table";
  const piles = document.createElement("div");
  piles.className = "cards-piles";
  const deckPile = document.createElement("div");
  deckPile.className = "cards-pile cards-deck-pile";
  const discardPile = document.createElement("div");
  discardPile.className = "cards-pile cards-discard-pile";
  piles.append(deckPile, discardPile);
  const hand = document.createElement("div");
  hand.className = "cards-hand";
  const log = document.createElement("pre");
  log.className = "cards-log";
  table.append(piles, hand, log);

  const footer = document.createElement("div");
  footer.className = "cards-footer";

  const status = document.createElement("div");
  status.className = "cards-status";
  const meters = document.createElement("div");
  meters.className = "cards-meters";

  const controls = document.createElement("div");
  controls.className = "cards-controls";
  const deal = Object.assign(document.createElement("button"), { type: "button", textContent: "[deal]" });
  const draw = Object.assign(document.createElement("button"), { type: "button", textContent: "[draw]" });
  const score = Object.assign(document.createElement("button"), { type: "button", textContent: "[score]" });
  const close = Object.assign(document.createElement("button"), { type: "button", textContent: "[close archive]" });
  controls.append(deal, draw, score, close);
  footer.append(status, meters, controls);

  const win = createSizedDesktopWindow("cards.app", shell, "desktop-window-cards");
  const cs = newCardsState();
  cs.hand = drawCards(cs, 5);
  cs.phase = "dealt";
  cs.rounds = 1;
  cs.log.push(`HAND 1: ${cardsNotation(cs.hand)}`);
  win.cardsState = cs;

  const render = (message = "Five cards dealt. Click cards to hold, then draw or score.") => {
    deckPile.innerHTML = `<b>DECK</b><span>${cs.deck.length}</span>`;
    discardPile.innerHTML = `<b>DISCARD</b><span>${cs.discard.length}</span>`;
    hand.innerHTML = "";
    cs.hand.forEach((entry, index) => {
      const card = renderPokerCard(entry, index);
      card.classList.toggle("is-held", cs.held.has(index));
      card.addEventListener("click", () => {
        if (cs.phase !== "dealt") return;
        if (cs.held.has(index)) cs.held.delete(index);
        else cs.held.add(index);
        render(`${entry.rank}${entry.suit} ${entry.label} ${cs.held.has(index) ? "held" : "released"}`);
      });
      hand.appendChild(card);
    });
    status.textContent = message;
    log.textContent = cs.log.join("\n") || "No hand yet.";
    meters.innerHTML = [
      cardsMeter("ORDER", cs.order),
      cardsMeter("SIGNAL", cs.signal),
      cardsMeter("DRIFT", cs.drift),
    ].join("");
  };

  deal.addEventListener("click", () => {
    Object.assign(cs, newCardsState());
    cs.hand = drawCards(cs, 5);
    cs.phase = "dealt";
    cs.rounds += 1;
    cs.log.push(`HAND ${cs.rounds}: ${cardsNotation(cs.hand)}`);
    render("Choose holds, then draw. Or score the first hand.");
  });

  draw.addEventListener("click", () => {
    if (cs.phase !== "dealt") {
      render(cs.phase === "idle" ? "Deal first." : "Only one draw per hand.");
      return;
    }
    cs.hand = cs.hand.map((entry, index) => {
      if (cs.held.has(index)) return entry;
      cs.discard.push(entry);
      return drawCards(cs, 1)[0];
    });
    cs.phase = "drawn";
    cs.log.push(`DRAW: held ${cs.held.size}, replaced ${5 - cs.held.size}`);
    render("Draw complete. Score the hand.");
  });

  score.addEventListener("click", () => {
    if (!cs.hand.length) {
      render("Deal first.");
      return;
    }
    const result = scorePokerHand(cs.hand);
    cs.phase = "scored";
    cs.order = Math.min(100, cs.order + result.order);
    cs.signal = Math.max(0, Math.min(100, cs.signal + result.signal));
    cs.drift = Math.min(100, cs.drift + result.drift);
    cs.log.push(`SCORE: ${result.name.toUpperCase()} / ${result.note}`);
    if (result.chart) setTimeout(() => openHiddenChartWindow(result.chart), 300);
    render(`${result.name}. ${result.note}`);
  });

  close.addEventListener("click", () => {
    cs.complete = true;
    render(cardsSummary(cs, "archive closed"));
  });

  shell.append(toolbar, table, footer);
  render();
  return win;
}

function newCardsState() {
  return {
    deck: shuffleCards(makePokerArchiveDeck()),
    hand: [],
    discard: [],
    held: new Set(),
    log: [],
    order: 0,
    signal: 70,
    drift: 0,
    rounds: 0,
    phase: "idle",
    complete: false,
  };
}

function makePokerArchiveDeck() {
  const suits = [
    { suit: "♠", theme: "WINDOW", chapter: "ch01" },
    { suit: "♥", theme: "SIGNAL", chapter: "ch02" },
    { suit: "♦", theme: "ALTITUDE", chapter: "ch04" },
    { suit: "♣", theme: "SUN", chapter: "ch05" },
  ];
  const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  const labels = {
    "A♠": "floor 18", "K♠": "NYE", "Q♠": "window", "J♠": "street", "10♠": "cold air",
    "A♥": "NO GPS", "K♥": "grass", "Q♥": "Arxan", "J♥": "Daqing", "10♥": "north",
    "A♦": "3752m", "K♦": "route", "Q♦": "salary", "J♦": "thin air", "10♦": "map",
    "A♣": "ferry", "K♣": "sun", "Q♣": "river", "J♣": "Ascot", "10♣": "glare",
  };
  return suits.flatMap(({ suit, theme, chapter }) => ranks.map((rank) => ({
    id: `${rank}${suit}`,
    rank,
    suit,
    theme,
    chapter,
    label: labels[`${rank}${suit}`] || theme.toLowerCase(),
  })));
}

function drawCards(cs, count) {
  if (cs.deck.length < count) {
    cs.deck = shuffleCards(cs.discard);
    cs.discard = [];
  }
  return cs.deck.splice(0, count).filter(Boolean);
}

function renderPokerCard(entry) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "playing-card poker-card";
  if (entry.suit === "♥" || entry.suit === "♦") card.classList.add("is-red");
  card.innerHTML = `
    <span class="card-corner">${entry.rank}${entry.suit}</span>
    <strong>${entry.suit}</strong>
    <em>${entry.label}</em>
  `;
  return card;
}

function cardsNotation(cards) {
  return cards.map((entry) => `${entry.rank}${entry.suit}`).join(" ");
}

function scorePokerHand(cards) {
  const rankOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const ranks = cards.map((entry) => entry.rank);
  const suits = cards.map((entry) => entry.suit);
  const counts = Object.values(ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b - a);
  const values = ranks.map((rank) => rankOrder.indexOf(rank)).sort((a, b) => a - b);
  const flush = suits.every((suit) => suit === suits[0]);
  const straight = values.every((value, index) => index === 0 || value === values[index - 1] + 1) ||
    ranks.sort().join(",") === ["A", "2", "3", "4", "5"].sort().join(",");
  const majority = cards.reduce((acc, entry) => {
    acc[entry.theme] = (acc[entry.theme] || 0) + 1;
    return acc;
  }, {});
  const theme = Object.entries(majority).sort((a, b) => b[1] - a[1])[0]?.[0] || "ARCHIVE";

  if (straight && flush) return pokerScore("straight flush", 34, 8, 12, `${theme} holds a clean line.`, "motion");
  if (counts[0] === 4) return pokerScore("four of a kind", 30, 6, 10, "Four copies of the same refusal.");
  if (counts[0] === 3 && counts[1] === 2) return pokerScore("full house", 26, 5, 9, "A room inside another room.");
  if (flush) return pokerScore("flush", 22, 3, 8, `${theme} takes the table.`, theme === "ALTITUDE" ? "altitude" : null);
  if (straight) return pokerScore("straight", 20, 4, 7, "Chronology briefly behaves.");
  if (counts[0] === 3) return pokerScore("three of a kind", 16, 2, 7, "Three marks agree.");
  if (counts[0] === 2 && counts[1] === 2) return pokerScore("two pair", 13, 1, 6, "Two small shelves.");
  if (counts[0] === 2) return pokerScore("pair", 9, 1, 4, "A coincidence stays.");
  return pokerScore("high card", 4, -2, 8, `${cardsNotation(cards)} remains unfiled.`);
}

function pokerScore(name, order, signal, drift, note, chart = null) {
  return { name, order, signal, drift, note, chart };
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
    { id: "nantong", rank: "A", suit: "♥", label: "Nantong", chapter: "ch03", date: "2025-05-07", tags: ["hometown", "life"] },
    { id: "huaian", rank: "Q", suit: "♥", label: "Huai'an", chapter: "ch03", date: "2025-06-14", tags: ["hometown", "portrait"] },
    { id: "nogps-home", rank: "J", suit: "♥", label: "no coord", chapter: "ch03", date: "2026-02-27", tags: ["hometown", "nogps"] },
    { id: "baiyin", rank: "A", suit: "♦", label: "1723m", chapter: "ch04", date: "2025-07-04", tags: ["altitude", "salary"], clip: "IMG_3484" },
    { id: "gulang", rank: "7", suit: "♦", label: "Gulang", chapter: "ch04", date: "2025-07-05", tags: ["route", "altitude"], clip: "IMG_3549" },
    { id: "yangxiang", rank: "Q", suit: "♦", label: "3119m", chapter: "ch04", date: "2025-07-06", tags: ["route", "altitude"], clip: "IMG_3612" },
    { id: "qilian", rank: "K", suit: "♦", label: "3752m", chapter: "ch04", date: "2025-07-07", tags: ["altitude", "weight"], clip: "IMG_3810" },
    { id: "taishan", rank: "3", suit: "♦", label: "Mt Tai", chapter: "ch04", date: "2025-12-23", tags: ["altitude", "night"], clip: "IMG_8863" },
    { id: "ascot", rank: "A", suit: "♣", label: "Ascot", chapter: "ch05", date: "2025-08-22", tags: ["brisbane", "arrival"], clip: "IMG_5523" },
    { id: "morning", rank: "7", suit: "♣", label: "07:10", chapter: "ch05", date: "2025-08-23", tags: ["sun", "commute"], clip: "IMG_5521" },
    { id: "river", rank: "Q", suit: "♣", label: "river mesh", chapter: "ch05", date: "2026-05-14", tags: ["river", "motion"], clip: "IMG_6010" },
    { id: "morningside", rank: "K", suit: "♣", label: "Morningside", chapter: "ch05", date: "2026-05-14", tags: ["brisbane", "routine"], clip: "IMG_3483" },
    { id: "victoria", rank: "3", suit: "♣", label: "Victoria", chapter: "ch05", date: "2026-04-06", tags: ["australia", "extension"] },
    { id: "blur", rank: "J", suit: "♠", label: "blur", chapter: "ch00", date: "2024-01-01", tags: ["blur", "memory"] },
    { id: "clear", rank: "J", suit: "♦", label: "clear", chapter: "ch00", date: "2026-05-14", tags: ["clear", "system"] },
    { id: "deadline", rank: "9", suit: "♦", label: "deadline", chapter: "ch04", date: "2025-07-01", tags: ["deadline", "weight"] },
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
      drift: cards[0].chapter === "ch05" ? 12 : 6,
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
  const last = cs.log.slice(-3).join(" / ") || "none";
  return [
    `SESSION SUMMARY - ${reason}`,
    `hands dealt: ${cs.rounds}`,
    `last table: ${last}`,
    `archive mood: ${mood}`,
    "the deck can be dealt again.",
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
      <span>${state.chapter.toUpperCase()} / ${currentMediaLabel()}</span>
    </div>
    <div class="profiler-grid">
      ${profilerMeter("CLIPS READ", clipsRead, 46)}
      ${profilerMeter("TEXT SEEN", textSeen, textTotal)}
      ${profilerMeter("WINDOWS", openCount, 8)}
      ${profilerMeter("TIME", Math.min(sessionSeconds(), 600), 600)}
    </div>
    <div class="profiler-process">
      <div><span>CHAPTERS</span><b>6</b></div>
      <div><span>CLIPS</span><b>46</b></div>
      <div><span>LOCATIONS</span><b>47</b></div>
      <div><span>OBJECTS</span><b>7</b></div>
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
  header.innerHTML = `
    <div>
      <div class="news-kicker">in_praise daily register</div>
      <div class="news-logo">NEWS</div>
    </div>
    <div class="news-issue">NO. ${issue}<br>${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</div>
  `;
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
  const headline = Object.assign(document.createElement("h2"), { textContent: content.headline });
  const meta = Object.assign(document.createElement("div"), { className: "news-meta", textContent: `${key} / page ${win.newsPage} of ${total}` });
  const text = document.createElement("div");
  text.className = "news-columns";
  String(body).split(/\n\s*\n/).filter(Boolean).forEach((para) => {
    const p = document.createElement("p");
    p.textContent = para.trim();
    text.appendChild(p);
  });
  article.append(headline, meta, text);
  const rail = document.createElement("aside");
  rail.className = "news-rail";
  rail.append(
    Object.assign(document.createElement("div"), { textContent: "WIRE" }),
    Object.assign(document.createElement("p"), { textContent: `${content.fig || "fig."} / ${content.pages || 1} page dispatch` }),
    Object.assign(document.createElement("p"), { textContent: "Filed locally. Verified only by recurrence." })
  );
  bodyWrap.append(figure, article, rail);
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
  const localWrap = document.createElement("section");
  localWrap.className = "map-view map-view-local";
  const localLabel = Object.assign(document.createElement("div"), { className: "map-view-label", textContent: "LOCAL CHAPTER MAP" });
  const canvas = document.createElement("div");
  canvas.className = "map-canvas map-canvas-local";
  localWrap.append(localLabel, canvas);
  const worldWrap = document.createElement("section");
  worldWrap.className = "map-view map-view-world";
  const worldLabel = Object.assign(document.createElement("div"), { className: "map-view-label", textContent: "WORLD ROUTE / ALL VISITED POINTS" });
  const worldCanvas = document.createElement("div");
  worldCanvas.className = "map-canvas map-canvas-world";
  worldWrap.append(worldLabel, worldCanvas);
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
  shell.append(localWrap, worldWrap, footer);
  const win = createSizedDesktopWindow("map", shell, "desktop-window-map");
  win.mapCanvas = canvas;
  win.mapWorldCanvas = worldCanvas;
  win.mapCoords = coords;
  win.localMapLabel = localLabel;
  win.worldMapLabel = worldLabel;
  zoomOut.addEventListener("click", () => {
    win.leafletMap?.zoomOut();
    win.worldMap?.zoomOut();
  });
  zoomIn.addEventListener("click", () => {
    win.leafletMap?.zoomIn();
    win.worldMap?.zoomIn();
  });
  requestAnimationFrame(() => initializeMapWindow(win));
  return win;
}

function initializeMapWindow(win) {
  if (!win?.mapCanvas) return;
  const center = currentMapCenter();
  if (!window.L) {
    win.mapCanvas.textContent = "Leaflet.js unavailable";
    if (win.mapWorldCanvas) win.mapWorldCanvas.textContent = "Leaflet.js unavailable";
    if (win.mapCoords) win.mapCoords.textContent = formatMapCoords(center);
    return;
  }
  const mapOptions = {
    zoomControl: false,
    attributionControl: false,
    worldCopyJump: true,
  };
  const map = L.map(win.mapCanvas, mapOptions).setView([center.lat, center.lon], center.zoom);
  const worldMap = L.map(win.mapWorldCanvas, mapOptions).setView([20, 35], 1);
  const addTiles = (target) => L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(target);
  addTiles(map);
  addTiles(worldMap);
  const applyTileFilter = () => {
    win.querySelectorAll(".leaflet-tile").forEach((tile) => {
      tile.style.filter = "grayscale(100%) brightness(0.6) contrast(1.2) invert(0)";
    });
  };
  map.on("load", applyTileFilter);
  map.on("tileload", applyTileFilter);
  worldMap.on("load", applyTileFilter);
  worldMap.on("tileload", applyTileFilter);
  const points = projectMapPoints();
  const pointLatLngs = points.map((point) => [point.lat, point.lon]);
  const route = L.polyline(pointLatLngs, {
    color: currentChapterColor(),
    weight: 1.5,
    opacity: 0.78,
  }).addTo(worldMap);
  const worldMarkers = points.map((point) => L.circleMarker([point.lat, point.lon], {
    radius: 3,
    weight: 1,
    color: "#000000",
    fillColor: currentChapterColor(),
    fillOpacity: 0.86,
  }).bindTooltip(point.label || point.key || "", {
    direction: "top",
    opacity: 0.9,
    sticky: true,
  }).addTo(worldMap));
  const worldCurrent = L.circleMarker([center.lat, center.lon], {
    radius: 8,
    weight: 2,
    color: "#000000",
    fillColor: currentChapterColor(),
    fillOpacity: 1,
  }).addTo(worldMap);
  if (pointLatLngs.length) {
    worldMap.fitBounds(pointLatLngs, { padding: [26, 26], maxZoom: 3 });
  }
  win.leafletMap = map;
  win.worldMap = worldMap;
  win.localLayer = null;
  win.worldRoute = route;
  win.worldMarkers = worldMarkers;
  win.worldCurrent = worldCurrent;
  win.mapResizeObserver = new ResizeObserver(() => {
    setTimeout(() => {
      map.invalidateSize();
      worldMap.invalidateSize();
    }, 0);
  });
  win.mapResizeObserver.observe(win);
  state.map.instance = map;
  state.map.marker = null;
  state.map.ready = true;
  updateMapWindow(win, false);
  [80, 300, 800].forEach((delay) => {
    setTimeout(() => {
      map.invalidateSize();
      worldMap.invalidateSize();
      fitLocalMap(win, currentMapCenter(), false);
      if (pointLatLngs.length) worldMap.fitBounds(pointLatLngs, { padding: [26, 26], maxZoom: 3 });
    }, delay);
  });
}

function updateMapWindow(win = findWindowById("map"), fly = true) {
  if (!win) return;
  const center = currentMapCenter();
  const places = currentMapPlaces(center);
  if (win.mapCoords) win.mapCoords.textContent = formatMapPlaceSummary(center);
  if (win.localMapLabel) win.localMapLabel.textContent = `LOCAL / ${center.city}`;
  if (!win.leafletMap) return;
  const latLng = [center.lat, center.lon];
  renderLocalMapPlaces(win, center, places);
  if (win.worldCurrent) {
    win.worldCurrent.setLatLng(latLng);
    win.worldCurrent.setStyle({ fillColor: currentChapterColor() });
  }
  if (win.worldRoute) win.worldRoute.setStyle({ color: currentChapterColor() });
  fitLocalMap(win, center, fly);
}

function currentMapPlaces(center = currentMapCenter()) {
  const places = Array.isArray(center.places) && center.places.length ? center.places : [center];
  return places
    .map((place) => ({
      label: place.label || center.city || "point",
      lat: Number(place.lat),
      lon: Number(place.lon),
    }))
    .filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lon));
}

function renderLocalMapPlaces(win, center, places = currentMapPlaces(center)) {
  if (!window.L || !win?.leafletMap) return;
  win.localLayer?.remove();
  const layer = L.layerGroup();
  if (places.length > 1) {
    L.polyline(places.map((place) => [place.lat, place.lon]), {
      color: currentChapterColor(),
      weight: 1.2,
      opacity: 0.55,
    }).addTo(layer);
  }
  places.forEach((place) => {
    L.circleMarker([place.lat, place.lon], {
      radius: places.length > 1 ? 6 : 7,
      weight: 2,
      color: "#000000",
      fillColor: currentChapterColor(),
      fillOpacity: 1,
    }).addTo(layer);
  });
  layer.addTo(win.leafletMap);
  win.localLayer = layer;
}

function fitLocalMap(win, center, fly = true) {
  if (!window.L || !win?.leafletMap) return;
  const places = currentMapPlaces(center);
  if (places.length > 1) {
    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lon]));
    win.leafletMap.fitBounds(bounds, { padding: [38, 38], maxZoom: center.zoom });
    return;
  }
  const latLng = [center.lat, center.lon];
  if (fly) win.leafletMap.flyTo(latLng, center.zoom, { duration: 1.5 });
  else win.leafletMap.setView(latLng, center.zoom);
}

function teardownMapWindow(win) {
  win?.mapResizeObserver?.disconnect();
  if (win?.leafletMap) win.leafletMap.remove();
  if (win?.worldMap) win.worldMap.remove();
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

function projectMapPoints() {
  const seen = new Set();
  const points = [];
  const add = (point) => {
    const lat = Number(point.lat);
    const lon = Number(point.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const key = `${lat.toFixed(3)},${lon.toFixed(3)},${point.label || point.location || ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    points.push({
      lat,
      lon,
      label: point.label || point.location || point.clip || "point",
      time: point.time || point.local_time || "",
    });
  };
  Object.values(state.signal || {})
    .filter((clip) => Number.isFinite(Number(clip.lat)) && Number.isFinite(Number(clip.lon)))
    .sort((a, b) => String(a.local_time || "").localeCompare(String(b.local_time || "")))
    .forEach((clip) => add({
      lat: clip.lat,
      lon: clip.lon,
      label: clip.location || clip.clip,
      time: clip.local_time,
    }));
  Object.values(MAP_CENTERS).forEach((center) => {
    currentMapPlaces(center).forEach((place) => add({
      lat: place.lat,
      lon: place.lon,
      label: place.label,
    }));
  });
  CH00_LOCATION_SCAN.forEach(add);
  return points;
}

function currentChapterColor() {
  return getComputedStyle(dom.root).getPropertyValue("--chapter-primary").trim() || "#f0f0f0";
}

function formatMapCoords(center) {
  return `${center.lat.toFixed(5)}, ${center.lon.toFixed(5)}`;
}

function formatMapPlaceSummary(center) {
  const places = currentMapPlaces(center);
  if (places.length <= 1) return `${center.city}  ${formatMapCoords(center)}`;
  const coords = places
    .map((place) => `${place.label} ${place.lat.toFixed(4)}, ${place.lon.toFixed(4)}`)
    .join(" / ");
  return `${center.city}  ${coords}`;
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

function currentMediaLabel() {
  if (state.currentMediaItem?.type === "photo") return state.currentMediaItem.file || "PHOTO";
  return state.currentClip || "NO CLIP";
}

function sessionDuration() {
  const seconds = sessionSeconds();
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function buildVideoObjectWindow(title, clipKey, extraHtml, autoCloseMs = null) {
  const clip = state.signal[clipKey];
  if (!clip?.filename) {
    const fallback = document.createElement("pre");
    fallback.className = "trash-doc";
    fallback.textContent = `${title}\n\nsource unavailable\n${clipKey || "NO CLIP"}`;
    return createDesktopWindow(title, fallback);
  }
  const body = [
    `<div class="desktop-crt"><video playsinline webkit-playsinline preload="metadata"></video></div>`,
    `<div class="desktop-signal">${extraHtml}</div>`,
  ].join("");
  const win = createDesktopWindow(title, body);
  const video = win.querySelector("video");
  video.volume = state.settings.audio.video;
  video.loop = false;
  video.src = archiveMediaSrc(clip.filename);
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

function buildSabineWindow() {
  const shell = document.createElement("pre");
  shell.className = "trash-doc trash-doc-pdf sabine-doc";
  shell.textContent = window.CH01_DOCUMENT_TEXTS?.sabine?.content || SABINE_ANALYSIS_TEXT;
  return createSizedDesktopWindow("The Abduction of the Sabine Women_Dai Pan_1_3.pdf", shell, "desktop-window-document desktop-window-sabine");
}

function buildCh01DocumentWindow(id) {
  const doc = CH01_DOCUMENTS[id];
  if (!doc) return null;
  const shell = document.createElement("section");
  shell.className = `document-preview document-preview-${doc.type}`;

  const header = document.createElement("header");
  header.className = "document-preview-header";
  const title = Object.assign(document.createElement("div"), { className: "document-preview-title", textContent: doc.title });
  const meta = Object.assign(document.createElement("div"), { className: "document-preview-meta", textContent: doc.meta });
  header.append(title, meta);

  const body = document.createElement("div");
  body.className = "document-preview-body";
  const text = document.createElement("pre");
  text.className = "document-preview-text";
  const sourceText = window.CH01_DOCUMENT_TEXTS?.[id]?.content;
  text.textContent = sourceText || doc.preview;
  body.appendChild(text);

  const footer = document.createElement("footer");
  footer.className = "document-preview-footer";
  footer.append(
    Object.assign(document.createElement("span"), { textContent: doc.filename }),
    Object.assign(document.createElement("span"), { textContent: doc.type.toUpperCase() }),
    Object.assign(document.createElement("span"), {
      textContent: sourceText ? `${sourceText.length} chars` : "preview text",
    })
  );
  shell.append(header, body, footer);
  return createSizedDesktopWindow(doc.filename, shell, "desktop-window-document");
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
    "freedom-still": { left: 420, top: 360 },
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
  return [...articles].sort((a, b) => eyuSortTime(b) - eyuSortTime(a));
}

function eyuSortTime(article) {
  const override = {
    dulun_wushifasheng: "2026-05-01",
    meiyou_lajitong: "2025-05-01",
    xue_qian_xue_hou: "2025-02-01",
    shicha_diyi_juan: "2025-01-21",
    jiyi_bianma: "2025-01-14",
    dongjing_guangxue: "2025-01-10",
    gongzi_maipiao: "2025-07-01",
    langshan: "2024-11-01",
    lekai_5112: "2024-10-21",
    kaishi_sheying: "2024-09-10",
    daohang_shixiao: "2024-07-01",
  }[article.id];
  const raw = override || article.date || "";
  const match = String(raw).match(/(\d{4})(?:年|-)?\s*(\d{1,2})?(?:月|-)?\s*(\d{1,2})?/);
  if (!match) return 0;
  const year = Number(match[1]);
  const month = Number(match[2] || 1);
  const day = Number(match[3] || 1);
  return new Date(year, month - 1, day).getTime();
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
  if (state.chapter !== "ch05") return;
  if (event.ctrlKey || shouldAllowNativeWheel(event.target)) return;
  event.preventDefault();
  window.scrollBy(0, event.deltaY * 0.4);
}

function shouldAllowNativeWheel(target) {
  const node = target?.closest?.(".desktop-window, .calendar-scroll, .news-scroll, .finder-main, .finder-sidebar, .finder-preview, .search-system-results, .search-system-detail, .eyu-list, .eyu-article, .trash-doc, textarea");
  if (!node) return false;
  if (node.classList?.contains("desktop-window")) return true;
  return node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth;
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
  stopCh00VisualSequence();
  const token = ++state.ch00RunToken;
  const started = performance.now();
  const duration = CH00_LOCATING_DURATION;
  const coordinateStart = 1 - CH00_COORDINATE_WINDOW / duration;
  const targetLat = 40.7194;
  const targetLon = -73.9896;
  dom.chapter00?.classList.remove("is-scanning", "is-coordinate-active");
  dom.latScan.textContent = "00.0000";
  dom.lonScan.textContent = "000.0000";
  dom.signalAcquired?.classList.remove("is-active");
  startCh00Instruments();
  startCh00Monologue(token);
  startCh00LocationTicker(token);
  state.ch00Timers.push(setTimeout(() => {
    if (state.chapter === "ch00" && state.ch00RunToken === token) startCh00BootLog(token);
  }, 900));

  function step(now) {
    if (state.chapter !== "ch00" || state.ch00RunToken !== token) return;
    const t = Math.max(0, Math.min(1, (now - started) / duration));
    updateCh00Instruments(t);
    if (t < coordinateStart) {
      requestAnimationFrame(step);
      return;
    }
    dom.chapter00?.classList.add("is-coordinate-active", "is-scanning");
    const coordT = Math.max(0, Math.min(1, (t - coordinateStart) / (1 - coordinateStart)));
    const activeIndex = Math.max(0, Math.min(CH00_LOCATION_SCAN.length - 1, Math.floor(t * CH00_LOCATION_SCAN.length)));
    const activePoint = CH00_LOCATION_SCAN[activeIndex] || { lat: targetLat, lon: targetLon };
    const jitter = (1 - coordT) * 8;
    const anchorLat = coordT < 0.72 ? activePoint.lat : targetLat;
    const anchorLon = coordT < 0.72 ? activePoint.lon : targetLon;
    const lat = coordT < 0.94 ? anchorLat + (Math.random() - 0.5) * jitter : targetLat;
    const lon = coordT < 0.94 ? anchorLon + (Math.random() - 0.5) * jitter : targetLon;
    dom.latScan.textContent = lat.toFixed(4);
    dom.lonScan.textContent = lon.toFixed(4);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      dom.chapter00?.classList.remove("is-scanning");
      dom.signalAcquired.classList.add("is-active");
      startCh00DialogSequence(token);
    }
  }

  requestAnimationFrame(step);
}

function startCh00Instruments() {
  dom.chapter00?.classList.add("is-instrument-active");
  updateCh00Instruments(0);
}

function updateCh00Instruments(progress) {
  const pct = Math.max(0, Math.min(100, Math.round(progress * 100)));
  if (dom.ch00LoadFill) dom.ch00LoadFill.style.width = `${pct}%`;
  if (dom.ch00LoadPercent) dom.ch00LoadPercent.textContent = `${String(pct).padStart(2, "0")}%`;
  if (dom.ch00Axis) dom.ch00Axis.style.setProperty("--axis-shift", `${-Math.round(progress * 120)}px`);
  if (dom.ch00Term) {
    const index = Math.min(CH00_TERMS.length - 1, Math.floor(progress * CH00_TERMS.length));
    dom.ch00Term.textContent = CH00_TERMS[index];
  }
}

function startCh00Monologue(token) {
  if (!dom.ch00Monologue) return;
  dom.ch00Monologue.textContent = "";
  dom.ch00Monologue.classList.remove("is-visible");
  CH00_MONOLOGUE_LINES.forEach((line, index) => {
    state.ch00Timers.push(setTimeout(() => {
      if (state.chapter !== "ch00" || state.ch00RunToken !== token) return;
      dom.ch00Monologue.textContent = line;
      dom.ch00Monologue.classList.add("is-visible");
    }, index * CH00_MONOLOGUE_INTERVAL));
  });
  state.ch00Timers.push(setTimeout(() => {
    if (state.ch00RunToken !== token) return;
    dom.ch00Monologue?.classList.remove("is-visible");
  }, CH00_MONOLOGUE_LINES.length * CH00_MONOLOGUE_INTERVAL));
}

function startCh00LocationTicker(token) {
  if (!dom.ch00LocationPanel) return;
  let index = 0;
  dom.ch00LocationPanel.classList.add("is-active");
  const render = () => {
    if (state.chapter !== "ch00" || state.ch00RunToken !== token) return;
    const rows = Array.from({ length: 4 }, (_, offset) => {
      const point = CH00_LOCATION_SCAN[(index + offset) % CH00_LOCATION_SCAN.length];
      return [
        point.label,
        `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`,
        point.note,
      ].join("\n");
    });
    dom.ch00LocationPanel.textContent = rows.join("\n\n");
    index = (index + 1) % CH00_LOCATION_SCAN.length;
  };
  render();
  state.ch00LocationTimer = setInterval(render, 1150);
}

function startCh00BootLog(token = state.ch00RunToken) {
  if (!dom.ch00BootLog) return;
  clearInterval(state.ch00BootLogTimer);
  const entries = buildCh00GeoSequence().filter((entry) => entry.text !== "");
  const lines = [];
  let index = 0;
  dom.ch00BootLog.textContent = "";
  state.ch00BootLogTimer = setInterval(() => {
    if (state.chapter !== "ch00" || state.ch00RunToken !== token) {
      stopCh00BootLog();
      return;
    }
    if (index >= entries.length) {
      stopCh00BootLog();
      return;
    }
    lines.push(entries[index].text);
    dom.ch00BootLog.textContent = lines.slice(-34).join("\n");
    dom.ch00BootLog.scrollTop = dom.ch00BootLog.scrollHeight;
    index += 1;
  }, 58);
}

function stopCh00BootLog() {
  clearInterval(state.ch00BootLogTimer);
  state.ch00BootLogTimer = null;
}

function stopCh00VisualSequence() {
  state.ch00Timers.forEach((timer) => clearTimeout(timer));
  state.ch00Timers = [];
  clearInterval(state.ch00LocationTimer);
  state.ch00LocationTimer = null;
  stopCh00BootLog();
  dom.chapter00?.classList.remove("is-scanning", "is-coordinate-active", "is-instrument-active");
  updateCh00Instruments(0);
  dom.ch00Monologue?.classList.remove("is-visible");
  if (dom.ch00Monologue) dom.ch00Monologue.textContent = "";
  if (dom.ch00LocationPanel) {
    dom.ch00LocationPanel.textContent = "";
    dom.ch00LocationPanel.classList.remove("is-active");
  }
}

function startCh00DialogSequence(token) {
  state.ch00Timers.push(setTimeout(() => {
    if (state.chapter !== "ch00" || state.ch00RunToken !== token) return;
    showSystemDialog("■ location", ["Where you think they are?"], () => {
      if (state.chapter === "ch00" && state.ch00RunToken === token) showCh00ContinueDialog(token);
    }, { autoOkMs: 1350 });
  }, 520));
}

function showCh00ContinueDialog(token) {
  if (state.chapter !== "ch00" || state.ch00RunToken !== token) return;
  showSystemChoiceDialog("■ location", ["You are still with me, right?"], [
    {
      label: "[ YES ]",
      action: () => {
        const target = state.previousChapter && state.previousChapter !== "ch00" && CHAPTERS[state.previousChapter]
          ? state.previousChapter
          : "ch01";
        hardCut(() => activateChapter(target === "int" ? "ch04" : target));
      },
    },
    {
      label: "[ NO ]",
      action: () => hardCut(() => activateChapter("ch01")),
    },
  ]);
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
  state.mediaIndex = 0;
  state.photoPositionIndex = 0;
  state.textCycle[chapter] = -1;
  if (Object.prototype.hasOwnProperty.call(state.monologueCycle, chapter)) {
    state.monologueCycle[chapter] = -1;
  }
  state.wasInterrupted = false;
  clearAfterAnimation();

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
  dom.video.pause();
  if (chapter !== "ch00") stopCh00VisualSequence();

  if (chapter === "ch00") {
    dom.signalAcquired.classList.remove("is-active");
    dom.video.pause();
    dom.video.removeAttribute("src");
    dom.video.load();
    clearPhotoMedia();
    renderChapterArchive("ch00");
    clearVideoHold();
    clearNarrativeTimers();
    hideNarrativeText();
    clearMonologueTimers();
    hideMonologueText();
    setTextureChapter("ch00");
    runLocating();
    return;
  }

  setTextureChapter(chapter);
  const sequence = mediaSequenceForChapter(chapter);
  if (sequence.length) {
    clearNarrativeTimers();
    hideNarrativeText();
    setMediaItem(sequence[0]);
    startMonologueCycle(chapter);
    renderChapterArchive(chapter);
    renderAltitudeRoute();
    maybeStartP5(chapter);
    maybeStartCh04InterruptTimer(chapter);
    maybeShowOnboardingDialog(chapter);
    if (chapter === "after") renderAfterPage();
    return;
  }

  if (!spec.clips.length) {
    state.currentClip = null;
    dom.video.removeAttribute("src");
    dom.video.load();
    clearPhotoMedia();
    clearVideoHold();
    clearNarrativeTimers();
    hideNarrativeText();
    clearMonologueTimers();
    hideMonologueText();
    renderChapterArchive(chapter);
    showNextNarrativeText();
    startMonologueCycle(chapter);
    updateVideoControls();
    updateSystemReadout();
    maybeStartP5(chapter);
    maybeStartCh04InterruptTimer(chapter);
    if (chapter === "after") renderAfterPage();
    return;
  }
  setClip(spec.clips[0]);
  startMonologueCycle(chapter);
  renderChapterArchive(chapter);
  renderAltitudeRoute();
  maybeStartP5(chapter);
  maybeStartCh04InterruptTimer(chapter);
  maybeShowOnboardingDialog(chapter);
}

function renderAfterPage() {
  if (!dom.afterFileText) return;
  clearAfterAnimation();
  dom.afterFileText.className = "";
  dom.afterFileText.textContent = "loading...";
  fetch("一切都会好起来的.txt")
    .then((response) => response.ok ? response.text() : Promise.reject(new Error(`txt ${response.status}`)))
    .then((text) => {
      dom.afterFileText.textContent = text.trim();
      scheduleAfterAnimation(text.trim());
    })
    .catch(() => {
      const fallback = "一切都会好起来的。\n\nThis file is still open.";
      dom.afterFileText.textContent = fallback;
      scheduleAfterAnimation(fallback);
    });
}

function clearAfterAnimation() {
  state.afterTimers.forEach((timer) => clearTimeout(timer));
  state.afterTimers = [];
  if (dom.afterFileText) dom.afterFileText.className = "";
}

function scheduleAfterAnimation(text) {
  const original = String(text || "").trim();
  state.afterTimers.push(setTimeout(() => {
    if (state.chapter !== "after" || !dom.afterFileText) return;
    renderAfterFlyingText(original);
  }, 5000));
  state.afterTimers.push(setTimeout(() => {
    if (state.chapter !== "after" || !dom.afterFileText) return;
    setAfterFinalLine("一切都会好起来的。");
  }, 7200));
  state.afterTimers.push(setTimeout(() => {
    if (state.chapter !== "after" || !dom.afterFileText) return;
    animateAfterRewrite("一切都会好起来的。", "这就够了。");
  }, 12200));
}

function renderAfterFlyingText(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line || " ");
  dom.afterFileText.textContent = "";
  dom.afterFileText.className = "is-flying";
  lines.forEach((line, index) => {
    const span = document.createElement("span");
    span.textContent = line;
    const x = ((index % 3) - 1) * 12;
    const y = (index % 2 === 0 ? -1 : 1) * (6 + index);
    const r = ((index % 5) - 2) * 0.6;
    span.style.setProperty("--x", `${x}px`);
    span.style.setProperty("--y", `${y}px`);
    span.style.setProperty("--r", `${r}deg`);
    span.style.setProperty("--d", `${index * 0.045}s`);
    dom.afterFileText.appendChild(span);
  });
}

function setAfterFinalLine(line) {
  dom.afterFileText.className = "is-final";
  dom.afterFileText.textContent = line;
}

function animateAfterRewrite(from, to) {
  dom.afterFileText.className = "is-final is-typing";
  let current = String(from);
  const target = String(to);
  const deleteStep = () => {
    if (state.chapter !== "after" || !dom.afterFileText) return;
    if (current.length > 0) {
      current = current.slice(0, -1);
      dom.afterFileText.textContent = current;
      state.afterTimers.push(setTimeout(deleteStep, 90));
      return;
    }
    let index = 0;
    const typeStep = () => {
      if (state.chapter !== "after" || !dom.afterFileText) return;
      index += 1;
      dom.afterFileText.textContent = target.slice(0, index);
      if (index < target.length) state.afterTimers.push(setTimeout(typeStep, 130));
      else dom.afterFileText.className = "is-final";
    };
    state.afterTimers.push(setTimeout(typeStep, 240));
  };
  deleteStep();
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

function showSystemDialog(title, lines, onOk, options = {}) {
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
  let done = false;
  const handleOk = () => {
    if (done) return;
    done = true;
    dialog.remove();
    if (onOk) onOk();
  };
  dialog.querySelector("button").addEventListener("click", handleOk);
  document.body.appendChild(dialog);
  dialog.querySelector("button").focus();
  if (Number.isFinite(options.autoOkMs)) {
    setTimeout(() => {
      if (!document.body.contains(dialog)) return;
      dialog.classList.add("is-auto-clicking");
      setTimeout(handleOk, 650);
    }, options.autoOkMs);
  }
}

function showSystemChoiceDialog(title, lines, choices) {
  const existing = document.querySelector(".system-dialog");
  if (existing) existing.remove();
  const dialog = document.createElement("section");
  dialog.className = "system-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  const body = document.createElement("div");
  body.className = "system-dialog-body";
  const pre = document.createElement("pre");
  pre.textContent = `\n${lines.join("\n")}\n`;
  const actions = document.createElement("div");
  actions.className = "system-dialog-actions";
  choices.forEach((choice) => {
    const button = Object.assign(document.createElement("button"), {
      type: "button",
      textContent: choice.label,
    });
    button.addEventListener("click", () => {
      dialog.remove();
      choice.action?.();
    });
    actions.appendChild(button);
  });
  body.append(pre, actions);
  dialog.append(
    Object.assign(document.createElement("div"), { className: "system-dialog-title", textContent: title }),
    body
  );
  document.body.appendChild(dialog);
  actions.querySelector("button")?.focus();
}

function updateDesktopObjectVisibility(chapter) {
  updateDockState();
}

function renderChapterArchive(chapter = state.chapter) {
  if (!dom.mediaArchive) return;
  dom.mediaArchive.innerHTML = "";
  dom.mediaArchive.classList.remove("is-active");
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

function mediaSequenceForChapter(chapter = state.chapter) {
  return (CHAPTER_MEDIA_SEQUENCES[chapter] || []).filter((item) => {
    if (!item) return false;
    if (item.type !== "photo") return true;
    return /\.(jpe?g|png|gif|webp)$/i.test(item.file || "");
  });
}

function setMediaItem(item) {
  if (!item) return;
  clearTimeout(state.photoTimer);
  state.photoTimer = null;
  state.currentMediaItem = item;
  if (item.type === "video") {
    const key = item.key || item.file?.replace(/\.[^.]+$/, "");
    const spec = CHAPTERS[state.chapter];
    state.clipIndex = Math.max(0, spec?.clips?.indexOf(key) ?? 0);
    setClip(key);
    return;
  }
  setPhotoMedia(item);
}

function setPhotoMedia(item) {
  clearVideoHold();
  clearTimeout(state.photoTimer);
  state.photoTimer = null;
  const loadToken = ++state.photoLoadToken;
  state.currentMediaItem = item;
  state.currentClip = null;
  dom.video.pause();
  dom.video.removeAttribute("src");
  dom.video.load();
  dom.video.dataset.clip = "";
  dom.crtShell.dataset.mediaType = "photo";
  dom.crtFrame.classList.add("is-photo", "is-photo-loading");
  updateVideoControls();

  const loader = new Image();
  loader.decoding = "async";
  loader.onload = () => {
    if (loadToken !== state.photoLoadToken || state.currentMediaItem !== item) return;
    item.naturalWidth = loader.naturalWidth || 4;
    item.naturalHeight = loader.naturalHeight || 3;
    item.positionIndex = state.photoPositionIndex;
    state.photoPositionIndex += 1;
    applyPhotoLayout(item);
    dom.photo.alt = item.label || item.file || "archive photo";
    dom.photo.src = archiveMediaSrc(item.file);
    requestAnimationFrame(() => dom.crtFrame.classList.remove("is-photo-loading"));
    updateMonitorForPhoto(item);
    updateRouteCurrent();
    showNextNarrativeText();
    updateVideoControls();
    updateFinderWindow();
    updateSystemReadout();
    state.photoTimer = setTimeout(() => advanceClip(), photoDurationForChapter(state.chapter));
  };
  loader.onerror = () => {
    if (loadToken !== state.photoLoadToken || state.currentMediaItem !== item) return;
    item.naturalWidth = item.naturalWidth || 4;
    item.naturalHeight = item.naturalHeight || 3;
    item.positionIndex = state.photoPositionIndex;
    state.photoPositionIndex += 1;
    applyPhotoLayout(item);
    dom.photo.alt = item.label || item.file || "archive photo";
    dom.photo.src = archiveMediaSrc(item.file);
    dom.crtFrame.classList.remove("is-photo-loading");
    updateMonitorForPhoto(item);
    updateRouteCurrent();
    showNextNarrativeText();
    updateVideoControls();
    updateFinderWindow();
    updateSystemReadout();
    state.photoTimer = setTimeout(() => advanceClip(), photoDurationForChapter(state.chapter));
  };
  loader.src = archiveMediaSrc(item.file);
}

function clearPhotoMedia() {
  state.photoLoadToken += 1;
  clearTimeout(state.photoTimer);
  state.photoTimer = null;
  if (!dom.photo || !dom.crtFrame) return;
  dom.photo.removeAttribute("src");
  dom.photo.alt = "";
  dom.crtFrame.classList.remove("is-photo", "is-photo-loading");
  dom.crtFrame.style.width = "";
  dom.crtFrame.style.height = "";
  dom.crtShell?.removeAttribute("data-media-type");
}

function applyPhotoLayout(item) {
  const shell = dom.crtShell;
  if (!shell) return;
  const safe = contentSafeRect(14);
  const longEdge = plannedVideoShortEdgeForChapter(state.chapter, safe);
  const naturalW = item.naturalWidth || dom.photo.naturalWidth || 4;
  const naturalH = item.naturalHeight || dom.photo.naturalHeight || 3;
  const landscape = naturalW >= naturalH;
  const frameW = landscape ? longEdge : Math.round(longEdge * naturalW / naturalH);
  const frameH = landscape ? Math.round(longEdge * naturalH / naturalW) : longEdge;
  const scale = Math.min(
    1,
    (safe.right - safe.left) / frameW,
    (safe.bottom - safe.top - 30) / frameH
  );
  const displayW = Math.round(frameW * scale);
  const displayH = Math.round(frameH * scale);
  const totalH = displayH + 30;
  const positions = photoPositionsForChapter(state.chapter);
  const posIndex = Number.isFinite(item.positionIndex) ? item.positionIndex : state.mediaIndex;
  const posSpec = positions[posIndex % positions.length] || positions[0];
  const left = safe.left + (safe.right - safe.left - displayW) * posSpec.x;
  const top = safe.top + (safe.bottom - safe.top - totalH) * posSpec.y;
  const pos = clampToRect(left, top, displayW, totalH, safe);
  shell.style.transition = "none";
  shell.style.width = `${displayW}px`;
  shell.style.left = `${pos.left}px`;
  shell.style.top = `${pos.top}px`;
  shell.style.right = "";
  shell.style.bottom = "";
  shell.style.transform = "none";
  dom.crtFrame.style.width = `${displayW}px`;
  dom.crtFrame.style.height = `${displayH}px`;
}

function mediaShellRect() {
  const rect = dom.crtShell?.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  return rect;
}

function rectsOverlap(a, b, pad = 0) {
  if (!a || !b) return false;
  return !(
    a.left + a.width + pad < b.left ||
    b.left + b.width + pad < a.left ||
    a.top + a.height + pad < b.top ||
    b.top + b.height + pad < a.top
  );
}

function photoDurationForChapter(chapter) {
  if (chapter === "ch06") return 9800;
  if (chapter === "ch03") return 8600;
  if (chapter === "ch05") return 8200;
  return 7600;
}

function plannedVideoShortEdgeForChapter(chapter, safe = contentSafeRect(14)) {
  const stageW = Math.max(280, safe.right - safe.left);
  if (chapter === "ch03") {
    const videoWidth = Math.min(860, Math.max(720, stageW * 0.54));
    return Math.round(Math.max(360, Math.min(500, videoWidth * 9 / 16)));
  }
  if (chapter === "ch06") {
    const videoWidth = Math.min(900, Math.max(760, stageW * 0.58));
    return Math.round(Math.max(380, Math.min(520, videoWidth * 9 / 16)));
  }
  const videoWidth = {
    ch01: Math.min(680, Math.max(560, stageW * 0.40)),
    ch02: Math.min(760, Math.max(600, stageW * 0.44)),
    ch04: Math.min(700, Math.max(620, stageW * 0.42)),
    ch05: Math.min(760, Math.max(620, stageW * 0.44)),
  }[chapter] || 560;
  return Math.round(Math.max(300, Math.min(460, videoWidth * 9 / 16)));
}

function photoPositionsForChapter(chapter) {
  if (chapter === "ch03") return [
    { x: 0.62, y: 0.10 },
    { x: 0.42, y: 0.46 },
    { x: 0.70, y: 0.54 },
    { x: 0.18, y: 0.44 },
    { x: 0.50, y: 0.18 },
  ];
  if (chapter === "ch04") return [
    { x: 0.58, y: 0.08 },
    { x: 0.44, y: 0.36 },
    { x: 0.28, y: 0.58 },
    { x: 0.66, y: 0.48 },
  ];
  if (chapter === "ch05") return [
    { x: 0.18, y: 0.14 },
    { x: 0.62, y: 0.10 },
    { x: 0.50, y: 0.56 },
    { x: 0.30, y: 0.48 },
    { x: 0.72, y: 0.34 },
  ];
  if (chapter === "ch06") return [
    { x: 0.70, y: 0.10 },
    { x: 0.58, y: 0.36 },
    { x: 0.70, y: 0.56 },
    { x: 0.22, y: 0.44 },
    { x: 0.52, y: 0.16 },
  ];
  return [
    { x: 0.16, y: 0.12 },
    { x: 0.56, y: 0.16 },
    { x: 0.34, y: 0.56 },
    { x: 0.70, y: 0.46 },
  ];
}

function setClip(clipKey) {
  if (!clipKey || !state.signal[clipKey]) return;
  clearPhotoMedia();
  clearVideoHold();
  clearTimeout(state.photoTimer);
  state.photoTimer = null;
  state.currentMediaItem = { type: "video", key: clipKey };
  state.currentClip = clipKey;
  const clip = state.signal[clipKey];

  applyVideoLayoutForClip(clipKey);
  dom.video.dataset.clip = clipKey;
  dom.video.loop = false;
  dom.video.muted = state.mutedForAutoplay;
  dom.video.volume = state.settings.audio.video;
  dom.video.src = archiveMediaSrc(clip.filename);
  dom.video.load();
  dom.video.play().catch(() => {});

  updateMonitor(clip);
  updateRouteCurrent();
  updateAmbientGain(clip);
  handleGpsLost(clipKey);
  showNextNarrativeText();
  syncNarrativeToVideoDuration(clipKey);
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
  if (state.chapter === "ch04") {
    const chartRight = safe.left + Math.min(520, (safe.right - safe.left) * 0.36);
    const rightLane = Math.max(320, safe.right - chartRight - 24);
    const width = Math.min(720, Math.max(620, rightLane * 0.62));
    const left = chartRight + (rightLane - width) / 2;
    const top = safe.top + Math.max(38, (safe.bottom - safe.top - (width * 9 / 16 + 24)) * 0.20);
    setBox(width, left, top);
    return;
  }
  if (state.chapter === "ch05") {
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
  if (state.chapter !== "ch05" || !dom.crtShell) return;
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
  if (state.currentMediaItem?.type === "photo") {
    advanceClip();
    return;
  }
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
  if (state.currentMediaItem?.type === "photo") {
    dom.videoToggle.textContent = "[→]";
    dom.videoTime.textContent = `${state.currentMediaItem.label || "PHOTO"} / ${state.currentMediaItem.meta || state.currentMediaItem.file}`;
    return;
  }
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
  const texts = narrativeTextsForChapter(chapter);
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
  state.narrativeCurrent = { target, body, chapter };
  scheduleNarrativeFade(target, body, narrativeDurationForChapter(chapter));
}

function scheduleNarrativeFade(target, body, duration) {
  const current = state.narrativeCurrent;
  clearTimeout(state.textTimer);
  clearTimeout(state.textFadeTimer);
  state.textTimer = setTimeout(() => {
    if (state.narrativeCurrent !== current) return;
    target.classList.add("is-fading");
    state.textFadeTimer = setTimeout(() => {
      if (state.narrativeCurrent !== current) return;
      target.classList.remove("is-visible", "is-fading");
      body.textContent = "";
      state.narrativeCurrent = null;
    }, 800);
  }, duration);
}

function syncNarrativeToVideoDuration(clipKey = state.currentClip) {
  if (!state.narrativeCurrent) return;
  if (!clipKey || state.currentClip !== clipKey) return;
  if (state.currentMediaItem?.type === "photo") return;
  const duration = dom.video?.duration;
  if (!Number.isFinite(duration) || duration <= 0) return;
  const remaining = Math.max(0, duration - (dom.video.currentTime || 0));
  if (remaining <= 0) return;
  const fadeAfter = Math.max(narrativeDurationBaseForChapter(state.chapter), remaining * 1000 + 900);
  scheduleNarrativeFade(state.narrativeCurrent.target, state.narrativeCurrent.body, fadeAfter);
}

function narrativeTextsForChapter(chapter) {
  if (chapter === "ch04") {
    return isTaiAscentActive() ? CH04_TAI_TEXTS : CH04_QINGHAI_TEXTS;
  }
  return NARRATIVE_TEXTS[chapter] || [];
}

function isTaiAscentActive() {
  return TAI_ASCENT_KEYS.has(activeAltitudeKey());
}

function narrativeDurationForChapter(chapter) {
  const base = narrativeDurationBaseForChapter(chapter);
  if (state.currentMediaItem?.type === "photo") {
    return Math.max(base, photoDurationForChapter(chapter) - 500);
  }
  return base;
}

function narrativeDurationBaseForChapter(chapter) {
  if (chapter === "ch03") return 6200;
  if (chapter === "ch04") return 6600;
  if (chapter === "ch05") return 6400;
  if (chapter === "ch06") return 6200;
  return 7000;
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
  if (chapter === "ch04") {
    const selectors = state.currentClip === "IMG_3810" || state.currentClip === "IMG_3773"
      ? ".ch03-box-c"
      : ".ch03-box-a, .ch03-box-b";
    return [...document.querySelectorAll(selectors)];
  }
  if (chapter === "ch03") return [document.querySelector(".text-slot-top")].filter(Boolean);
  if (chapter === "ch05" || chapter === "ch06") return [...document.querySelectorAll(".ch04-box")];
  return [];
}

function narrativeTargetForText(chapter, index) {
  if (chapter === "ch01") return document.querySelector(".text-slot-top");
  if (chapter === "ch02") return document.querySelector(".text-slot-top");
  if (chapter === "ch04") {
    if (index === 0) return document.querySelector(".ch03-box-a");
    if (index === 1) return document.querySelector(".ch03-box-b");
    return document.querySelector(".ch03-box-c");
  }
  if (chapter === "ch03") return document.querySelector(".text-slot-top");
  if (chapter === "ch05" || chapter === "ch06") return document.querySelector(".ch04-box");
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
  if (chapter === "ch05") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    const width = Math.min(440, Math.max(340, (safe.right - safe.left) * 0.30));
    const left = videoRect ? videoRect.left + videoRect.width * 0.58 : safe.right - width - 150;
    const top = videoRect ? videoRect.bottom + 26 : safe.top + 86;
    const pos = clampToRect(left, top, width, 140, safe);
    Object.assign(target.style, { left: `${pos.left}px`, right: "", bottom: "", top: `${pos.top}px`, transform: "", maxWidth: `${width}px` });
    return;
  }
  if (chapter === "ch03") {
    positionFloatingTextAwayFromMedia(target, safe, index, {
      width: Math.min(500, Math.max(340, (safe.right - safe.left) * 0.30)),
      height: 176,
      candidates: [
        { x: 0.04, y: 0.08 },
        { x: 0.58, y: 0.10 },
        { x: 0.06, y: 0.58 },
        { x: 0.56, y: 0.60 },
        { x: 0.32, y: 0.08 },
      ],
    });
    return;
  }
  if (chapter === "ch06") {
    positionFloatingTextAwayFromMedia(target, safe, index, {
      width: Math.min(380, Math.max(300, (safe.right - safe.left) * 0.26)),
      height: 190,
      candidates: [
        { x: 0.04, y: 0.10 },
        { x: 0.60, y: 0.10 },
        { x: 0.06, y: 0.58 },
        { x: 0.54, y: 0.60 },
      ],
    });
    return;
  }
  if (chapter === "ch04") {
    const videoRect = dom.crtShell?.getBoundingClientRect();
    const chartRight = safe.left + Math.min(520, (safe.right - safe.left) * 0.36);
    const x = chartRight + 48;
    const width = Math.min(540, Math.max(360, safe.right - x - 34));
    const y = videoRect ? videoRect.bottom + 26 : safe.bottom - 150;
    const pos = clampToRect(x, y, width, 128, safe);
    Object.assign(target.style, { left: `${pos.left}px`, top: `${pos.top}px`, right: "", bottom: "", transform: "", maxWidth: `${width}px` });
  }
}

function positionFloatingTextAwayFromMedia(target, safe, index, config) {
  const mediaRect = mediaShellRect();
  const width = config.width;
  const height = config.height;
  const candidates = config.candidates || [{ x: 0.04, y: 0.10 }];
  const ordered = candidates.map((_, offset) => candidates[(index + offset) % candidates.length]);
  const fallback = ordered[0];
  let chosen = null;

  for (const candidate of ordered) {
    const left = safe.left + (safe.right - safe.left - width) * candidate.x;
    const top = safe.top + (safe.bottom - safe.top - height) * candidate.y;
    const pos = clampToRect(left, top, width, height, safe);
    if (!rectsOverlap({ left: pos.left, top: pos.top, width, height }, mediaRect, 34)) {
      chosen = { left: pos.left, top: pos.top };
      break;
    }
  }

  if (!chosen) {
    const left = safe.left + (safe.right - safe.left - width) * fallback.x;
    const top = safe.top + (safe.bottom - safe.top - height) * fallback.y;
    chosen = clampToRect(left, top, width, height, safe);
  }

  Object.assign(target.style, {
    left: `${chosen.left}px`,
    top: `${chosen.top}px`,
    right: "",
    bottom: "",
    transform: "",
    maxWidth: `${width}px`,
  });
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
  state.narrativeCurrent = null;
}

function hideNarrativeText() {
  document.querySelectorAll(".text-slot, .boxed-text").forEach((node) => {
    node.classList.remove("is-visible", "is-fading");
  });
}

function startMonologueCycle(chapter = state.chapter) {
  clearMonologueTimers();
  hideMonologueText();
  if (!dom.monologue || chapter === "ch00" || chapter === "after") return;
  const texts = MONOLOGUE_TEXTS[chapter] || [];
  if (!texts.length) return;

  const tick = () => {
    if (state.chapter !== chapter) return;
    showNextMonologueText(chapter);
    state.monologueTimer = setTimeout(tick, monologueIntervalForChapter(chapter));
  };
  state.monologueTimer = setTimeout(tick, 900);
}

function showNextMonologueText(chapter = state.chapter) {
  const texts = MONOLOGUE_TEXTS[chapter] || [];
  if (!dom.monologue || !texts.length) return;
  clearTimeout(state.monologueFadeTimer);
  const index = nextMonologueIndex(chapter, texts.length);
  const token = ++state.monologueToken;
  dom.monologue.textContent = texts[index % texts.length];
  positionMonologueText(dom.monologue, chapter, index);
  dom.monologue.classList.remove("is-fading");
  dom.monologue.classList.add("is-visible", "is-entering");
  requestAnimationFrame(() => dom.monologue?.classList.remove("is-entering"));
  state.monologueFadeTimer = setTimeout(() => {
    if (state.monologueToken !== token || state.chapter !== chapter) return;
    dom.monologue?.classList.add("is-fading");
    setTimeout(() => {
      if (state.monologueToken !== token || state.chapter !== chapter) return;
      dom.monologue?.classList.remove("is-visible", "is-fading");
    }, 800);
  }, monologueDurationForChapter(chapter));
}

function clearMonologueTimers() {
  clearTimeout(state.monologueTimer);
  clearTimeout(state.monologueFadeTimer);
  state.monologueTimer = null;
  state.monologueFadeTimer = null;
}

function hideMonologueText() {
  if (!dom.monologue) return;
  state.monologueToken += 1;
  dom.monologue.classList.remove("is-visible", "is-entering", "is-fading");
  dom.monologue.textContent = "";
}

function nextMonologueIndex(chapter, count) {
  const last = state.monologueCycle[chapter] ?? -1;
  if (count <= 1) {
    state.monologueCycle[chapter] = 0;
    return 0;
  }
  const next = (last + 1) % count;
  state.monologueCycle[chapter] = next;
  return next;
}

function monologueDurationForChapter() {
  return 12000;
}

function monologueIntervalForChapter() {
  return 13200;
}

function positionMonologueText(target, chapter, index) {
  const safe = contentSafeRect(22);
  const width = Math.min(360, Math.max(260, (safe.right - safe.left) * 0.28));
  const height = 120;
  const mediaRect = mediaShellRect();
  const shortTextRect = document.querySelector(".text-slot.is-visible, .boxed-text.is-visible")?.getBoundingClientRect();
  const candidates = monologuePositionsForChapter(chapter);
  const ordered = candidates.map((_, offset) => candidates[(index + offset) % candidates.length]);
  let chosen = null;

  for (const candidate of ordered) {
    const left = safe.left + (safe.right - safe.left - width) * candidate.x;
    const top = safe.top + (safe.bottom - safe.top - height) * candidate.y;
    const pos = clampToRect(left, top, width, height, safe);
    const rect = { left: pos.left, top: pos.top, width, height };
    if (rectsOverlap(rect, mediaRect, 38)) continue;
    if (rectsOverlap(rect, shortTextRect, 26)) continue;
    chosen = pos;
    break;
  }

  const fallback = chosen || clampToRect(
    safe.left + (safe.right - safe.left - width) * ordered[0].x,
    safe.top + (safe.bottom - safe.top - height) * ordered[0].y,
    width,
    height,
    safe
  );

  Object.assign(target.style, {
    left: `${fallback.left}px`,
    top: `${fallback.top}px`,
    right: "",
    bottom: "",
    transform: "",
    width: `${width}px`,
  });
}

function monologuePositionsForChapter(chapter) {
  if (chapter === "ch01") return [
    { x: 0.70, y: 0.12 },
    { x: 0.10, y: 0.60 },
    { x: 0.66, y: 0.68 },
  ];
  if (chapter === "ch02") return [
    { x: 0.66, y: 0.14 },
    { x: 0.08, y: 0.70 },
    { x: 0.58, y: 0.58 },
  ];
  if (chapter === "ch04") return [
    { x: 0.06, y: 0.14 },
    { x: 0.08, y: 0.68 },
    { x: 0.62, y: 0.72 },
  ];
  return [
    { x: 0.08, y: 0.16 },
    { x: 0.64, y: 0.16 },
    { x: 0.12, y: 0.70 },
    { x: 0.60, y: 0.66 },
  ];
}

function advanceClip() {
  if (state.wasInterrupted) return;
  const spec = CHAPTERS[state.chapter];
  if (!spec) return;

  if (state.chapter === "ch01" && state.currentClip === spec.interruptAfter) {
    triggerNyeInterrupt();
    return;
  }

  const sequence = mediaSequenceForChapter(state.chapter);
  if (sequence.length) {
    const nextIndex = state.mediaIndex + 1;
    if (nextIndex >= sequence.length) {
      advanceToNextChapter();
      return;
    }
    state.mediaIndex = nextIndex;
    setMediaItem(sequence[state.mediaIndex]);
    return;
  }

  if (!spec.clips.length) return;
  const nextClipIndex = state.clipIndex + 1;
  if (nextClipIndex >= spec.clips.length) {
    advanceToNextChapter();
    return;
  }
  state.clipIndex = nextClipIndex;
  setClip(spec.clips[state.clipIndex]);
}

function advanceToNextChapter() {
  const index = AUTO_CHAPTER_ORDER.indexOf(state.chapter);
  if (index < 0 || index >= AUTO_CHAPTER_ORDER.length - 1) {
    clearVideoHold();
    clearTimeout(state.photoTimer);
    state.photoTimer = null;
    return;
  }
  const nextChapter = AUTO_CHAPTER_ORDER[index + 1];
  clearVideoHold();
  clearTimeout(state.photoTimer);
  state.photoTimer = null;
  clearNarrativeTimers();
  hardCut(() => activateChapter(nextChapter));
}

function triggerNyeInterrupt() {
  if (state.wasInterrupted) return;
  state.wasInterrupted = true;
  state.previousClip = state.currentClip;
  hardCut(() => setClip("IMG_5811"));
  setTimeout(() => {
    hardCut(() => {
      state.wasInterrupted = false;
      advanceClip();
    });
  }, 3000);
}

function enterInterrupt() {
  if (state.chapter === "int") return;
  const returnChapter = CHAPTERS[state.chapter] && state.chapter !== "ch00" ? state.chapter : "ch05";
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
  dom.interruptVideo.src = archiveMediaSrc(clip.filename);
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
  const restore = state.interruptReturn || { chapter: "ch05" };
  hardCut(() => {
    activateChapter(restore.chapter || "ch05");
    if (restore.clip && state.signal[restore.clip]) {
      const spec = CHAPTERS[restore.chapter || "ch05"];
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
  const ascent = state.chapter === "ch04" && Number.isFinite(clip.altitude_m) ? `| ASCENT   | ${signed(Math.round(clip.altitude_m - 1723))}m from start |` : "";

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
    state.chapter === "ch04" ? row("ALTITUDE", `${Math.round(clip.altitude_m || 0)}m ${bar(clip.altitude_normalized)}`) : "",
    ascent,
    "+-----------------------------+",
  ].filter(Boolean).join("\n");
  renderMonitorWindow(findWindowById("monitor"), clip);
}

function updateMonitorForPhoto(item) {
  const file = item.file || "PHOTO";
  dom.monitor.textContent = [
    "+-----------------------------+",
    "| SIGNAL MONITOR              |",
    "+-----------------------------+",
    row("MEDIA", "PHOTO"),
    row("FILE", file),
    row("LOCAL", item.meta || "archive"),
    row("GPS SIG", item.meta?.includes("no GPS") ? "NO GPS" : "STILL"),
    row("LUM", "still frame"),
    row("MOTION", "0.00 ░░░░░"),
    row("GLITCH", "archived"),
    row("iOS", "----"),
    "+-----------------------------+",
  ].join("\n");
  renderMonitorWindow(findWindowById("monitor"), {
    clip: file.replace(/\.[^.]+$/, ""),
    filename: file,
    location: item.label || "archive photo",
    local_time: item.meta || "",
    glitch_weight: item.meta?.includes("no GPS") ? 1 : 0.25,
    altitude_m: null,
    rgb: {},
  });
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
  script.onerror = () => {
    console.warn("p5 unavailable; CH02 particle layer disabled");
    state.p5Loaded = false;
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
  if (dom.route) dom.route.innerHTML = "";
  dom.scale.innerHTML = "";
  if (state.chapter !== "ch04") return;

  renderSymbolicAltitudeRoute(dom.route);
}

function renderSymbolicAltitudeRoute(svg) {
  if (!svg) return;
  svg.innerHTML = "";
  const ns = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };
  const SVG_W = 360;
  const SVG_H = Math.max(620, window.innerHeight - 110);
  const PAD_L = 58;
  const PAD_R = 22;
  const PAD_T = 42;
  const PAD_B = 54;
  const chartW = SVG_W - PAD_L - PAD_R;
  const chartH = SVG_H - PAD_T - PAD_B;
  const activeKey = activeAltitudeKey();
  const MIN_ALT = 0;
  const MAX_ALT = 4100;
  const mapY = (alt) => PAD_T + chartH - ((alt - MIN_ALT) / (MAX_ALT - MIN_ALT)) * chartH;

  svg.setAttribute("viewBox", `0 0 ${SVG_W} ${SVG_H}`);

  const title = el("text", { x: PAD_L, y: 18, class: "route-title" });
  title.textContent = "ALTITUDE PROFILE / CH04";
  svg.appendChild(title);

  [0, 1500, 3000, 4100].forEach((alt) => {
    const y = mapY(alt);
    svg.appendChild(el("line", {
      x1: PAD_L, y1: y, x2: PAD_L + chartW, y2: y,
      class: "route-grid-line"
    }));
    const lbl = el("text", { x: PAD_L - 6, y: y + 4, class: "route-axis-label", "text-anchor": "end" });
    lbl.textContent = `${alt}`;
    svg.appendChild(lbl);
  });

  const unitLbl = el("text", {
    x: 10, y: PAD_T + chartH / 2, class: "route-axis-label",
    "text-anchor": "middle",
    transform: `rotate(-90, 10, ${PAD_T + chartH / 2})`
  });
  unitLbl.textContent = "ALT (m)";
  svg.appendChild(unitLbl);

  svg.appendChild(el("line", {
    x1: PAD_L, y1: PAD_T, x2: PAD_L, y2: PAD_T + chartH,
    class: "route-axis-line"
  }));

  svg.appendChild(el("line", {
    x1: PAD_L, y1: PAD_T + chartH, x2: PAD_L + chartW, y2: PAD_T + chartH,
    class: "route-axis-line"
  }));

  drawAltitudeSeries(svg, el, QINGHAI_ALTITUDE_POINTS, {
    activeKey,
    mapY,
    xStart: PAD_L,
    xEnd: PAD_L + chartW * 0.86,
    labelEvery: 2,
    lineClass: "route-line",
    dotClass: "route-dot",
    dotRadius: 4.5,
    currentRadius: 7,
    placeLabelIndexes: new Set([0, QINGHAI_ALTITUDE_POINTS.length - 1, 12]),
    placeBaseY: PAD_T + chartH + 20,
  });

  drawAltitudeSeries(svg, el, TAI_ALTITUDE_POINTS, {
    activeKey,
    mapY,
    xStart: PAD_L + chartW * 0.58,
    xEnd: PAD_L + chartW,
    labelEvery: 2,
    lineClass: "route-line-tai",
    dotClass: "route-dot route-dot-tai",
    dotRadius: 3.6,
    currentRadius: 5.8,
    placeLabelIndexes: new Set([0, TAI_ALTITUDE_POINTS.length - 1]),
    placeBaseY: mapY(0) - 8,
  });
}

function drawAltitudeSeries(svg, el, points, config) {
  const mapX = (i) => config.xStart + (points.length < 2 ? 0 : (i / (points.length - 1)) * (config.xEnd - config.xStart));
  const pts = points.map((point, i) => ({
    point,
    x: mapX(i),
    y: config.mapY(Number(point.altitude || 0)),
    i,
  }));

  svg.appendChild(el("polyline", {
    points: pts.map((p) => `${p.x},${p.y}`).join(" "),
    class: config.lineClass,
  }));

  pts.forEach((p, i) => {
    const isCurrent = p.point.clip === config.activeKey;
    svg.appendChild(el("circle", {
      cx: p.x,
      cy: p.y,
      r: isCurrent ? config.currentRadius : config.dotRadius,
      class: `${config.dotClass}${isCurrent ? " is-current" : ""}`,
      "data-clip": p.point.clip,
    }));

    if (i % config.labelEvery === 0 || isCurrent || points.length <= 5) {
      const label = el("text", {
        x: p.x,
        y: p.y + (i % 2 === 0 ? -10 : 15),
        class: `route-label${isCurrent ? " route-label-current" : ""}`,
        "text-anchor": "middle",
      });
      label.textContent = p.point.time;
      svg.appendChild(label);
    }

    if (config.placeLabelIndexes?.has(i) || isCurrent && p.point.place) {
      const place = el("text", {
        x: p.x,
        y: config.placeBaseY + (i % 2) * 14,
        class: `route-place-label${isCurrent ? " route-label-current" : ""}`,
        "text-anchor": "middle",
      });
      place.textContent = p.point.place;
      svg.appendChild(place);
    }
  });
}

function activeAltitudeKey() {
  if (state.currentClip) return state.currentClip;
  if (state.currentMediaItem?.key) return state.currentMediaItem.key;
  return state.currentMediaItem?.file?.replace(/\.[^.]+$/, "") || "";
}

function updateRouteCurrent() {
  if (state.chapter !== "ch04") return;
  const activeKey = activeAltitudeKey();
  [dom.route].filter(Boolean).forEach((svg) => [...svg.querySelectorAll(".route-dot")].forEach((dot) => {
    const current = dot.dataset.clip === activeKey;
    dot.classList.toggle("is-current", current);
    const base = dot.classList.contains("route-dot-tai") ? "3.6" : "4.5";
    const currentRadius = dot.classList.contains("route-dot-tai") ? "5.8" : "7";
    dot.setAttribute("r", current ? currentRadius : base);
  }));
}

function maybeStartCh04InterruptTimer(chapter) {
  clearTimeout(state.intTimer);
  state.ch04EnteredAt = chapter === "ch05" ? performance.now() : 0;
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
    ["CH01", "CH02", "CH03", "CH04", "CH05", "CH06", "INT", "EYU", "BEISHANG"].forEach((chapter) => {
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
