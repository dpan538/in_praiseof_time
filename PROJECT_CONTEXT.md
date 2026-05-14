# in_praise_of_time — PROJECT CONTEXT v2
# Last updated: 2026-05-14
# Source of truth for all Codex builds.
# Claude writes all narrative text. Codex builds all code.
# Do not fill text slots. Do not invent audio files.

---

## Project Identity

A personal web-based visual narrative by Dai Pan (潘岱).
Not a travel diary. Not a game. Not a documentary.
A record of waiting, displacement, and the texture of time in specific places.

Single-page. One continuous visual field. No page navigation.
Chapters are states, not pages. Transitions are hard cuts, not fades.

---

## File Structure (current)

```
in_praiseof_time/
├── index.html
├── styles.css
├── main.js
├── beishang.txt          ← full 北上 essay, readable source
├── PROJECT_CONTEXT.md    ← this file
├── signal_data/
│   ├── MANIFEST.json     ← per-clip signal values, source of truth for all visual fx
│   ├── glitch_weights.json
│   ├── altitude_index.json
│   ├── ios_timeline.json
│   ├── rgb_motion/       ← per-clip RGB histogram JSONs
│   ├── audio_waveforms/  ← per-clip RMS JSONs
│   ├── frame_samples/    ← extracted keyframes
│   └── audio_wav/        ← extracted audio files
└── footage_report/
    ├── REPORT.md
    ├── REPORT_locations.md
    └── index.json
```

Video files: /Users/jarlgiovanni/Desktop/in_praiseof_time/*.MOV / *.mov
All iPhone 14, HEVC, mostly 4K 60fps.

---

## Technical Stack

- Vanilla HTML / CSS / JavaScript (primary)
- p5.js from CDN (Chapter 02 only, lazy-loaded)
- Web Audio API (audio layering)
- Font: IBM Plex Mono (Google Fonts)
- No React. No Vue. No bundler. No smooth-scroll CSS.
- Deploy target: Vercel static

---

## Color System

```
Global background:    #0a0a0a
Global text:          #F0F0F0

CH01 — THE SAME WINDOW
  Primary:   #FF2D55   magenta
  Secondary: #1A1A4E   deep blue

CH02 — NO SIGNAL
  Primary:   #FFE600   yellow
  Secondary: #0a0a0a

CH03 — ASCENT
  Primary:   #7ECECA   muted tiffany blue
  Secondary: #C8C800   dusty yellow
  Tertiary:  #888888   gray

CH04 — BRISBANE
  Primary:   #5A9E9E   darker tiffany blue
  Secondary: #555555   mid-gray
  Accent:    #D4A800   dull gold (unsettling, not warm)

INTERRUPT:
  Primary:   #4D4DFF   electric blue
```

---

## Typography

- IBM Plex Mono throughout
- All caps: chapter titles, system labels
- Sentence case: narrative text
- Left-aligned always
- ASCII box drawing for all structural borders (no CSS borders)
- Pipe | and dash - for system chrome

---

## Language Rules

Text is Chinese-English mixed. No fixed ratio. No translations.
Japanese kanji may appear within Chinese — semantic drift is intentional.
Examples of register:
  「時間」not「时间」— colder
  「孤独」untranslated
  「夜」narrower than "night", emptier than "夜晚"
  「消えた」can appear mid-Chinese sentence

Sentence structure:
  Can switch language mid-sentence
  Can switch mid-paragraph
  Never explained, never translated inline

---

## Architecture: Layer System

```
LAYER 0  Signal texture canvas     fixed, full viewport, z-index 0
LAYER 1  Subdermal text (北上)     fixed, full viewport, z-index 1, opacity 0.03
LAYER 2  Chapter video window      small CRT, center/offset
LAYER 3  Data readout panel        ASCII, real signal values from MANIFEST
LAYER 4  Narrative text            edge-positioned, film subtitle register
LAYER 5  p5.js particles           CH02 only
LAYER 6  Desktop objects           floating, draggable, z-index above video
LAYER 7  System chrome             always visible, top/bottom edges
```

---

## Signal Texture Engine (Layer 0)

Canvas fills full viewport. pointer-events: none. position: fixed.
Driven by MANIFEST.json values for current chapter's clips:
- Rectangle opacity = luminance_mean × 0.15
- Rectangle size variation = contrast value
- Color = chapter primary at 8% opacity
- Slow drift: ±2px over 3–8s per rectangle
- Chapter change: smooth transition over 2s

---

## Subdermal Text Layer (Layer 1) — BUILT

Source: beishang.txt (full 北上 essay)
CSS: position fixed, full viewport, opacity 0.03, font-size 11px,
     IBM Plex Mono, color #F0F0F0, overflow hidden, pointer-events none
Never changes across chapters. Always present.

Per-chapter fragments (separate nodes, own timing):

CH00: "这已经是我第四次开始回顾这些照片。"
      opacity 0.06, under coordinate numbers, covered as numbers populate

CH01: "那个抽屉里堆满了登机牌和票根。"
      bottom-right, opacity 0.12, font-size 10px, static

CH02 static: "在如此长时间的段落中，我写过许多东西，但无法与人分享。"
      under particle layer, opacity 0.08
      on particle exit: opacity → 0.25 for 1s, then back

CH02 GPS-lost (IMG_8084):
      Line 1: "草原太大。留下来的代价，不明。"  center, 0→0.6 over 2s
      Line 2: "绿色是那样的单纯，生命，顽强的跗骨之蛆。"  5s later, 0→0.5
      Line 1 fades as Line 2 appears. Never fully coexist.

CH03: "这原定是一趟找寻信仰的旅程。"  rotated 90°, right margin, opacity 0.10
      "我喜欢那些在长久的时间中并没有染上多余颜色的物件。"  left margin

CH04: "当你终于获得了看清世界的眼睛，也许，又开始想念那些厚重的镜片。"
      bottom edge, opacity 0.08

INTERRUPT (IMG_8863, 62s):
      Typewriter, bottom center, ~80% complete at 62s
      "在这种单纯面前，\n我如何是一个人？\n不是风中飘来的声音。"
      Hard cut exits mid-character. Text gone instantly.

---

## System Chrome (Layer 7, always visible)

Top-left:    IN_PRAISE_OF_TIME
Top-right:   current chapter label  e.g. CH.01 / THE SAME WINDOW
Bottom-left: real clock  HH:MM:SS local time
Bottom-right: coordinates of current chapter location
Left margin: vertical chapter nav
             CH.00 / CH.01 / CH.02 / CH.03 / CH.04 / INT
             current chapter highlighted in chapter primary color
All chrome: pipe | and dash - characters, no CSS borders

---

## Chapter 00 — LOCATING...

Full screen. No video.
Two columns: lat scanning → locks to 40.7194
             lon scanning → locks to -73.9896
iOS version scrolling below: "iOS 16.6 → 17.2 → 17.3 → 17.5 → 17.6 → 18.0 → 18.1 → 26.0"
"SIGNAL ACQUIRED" blinks once → hard cut to CH01 (one frame white noise)
CH00 fragment under numbers: "这已经是我第四次开始回顾这些照片。"

---

## Chapter 01 — THE SAME WINDOW

Location: NYC Lower East Side, Ludlow St 18F
Context: Sep 2024 – May 2025. No AC after September. Safety window cracked.
         Bar street below. Screaming until 5am. Glass breaking.
         Waiting for nothing specific.
Colors: #FF2D55 + #1A1A4E

CRT VIDEO WINDOW:
  ASCII box border. ~380px wide. Centered.
  Video: volume 0.2, loop.
  Scan lines: CSS repeating-linear-gradient, 2px.
  RGB split: idle animation every 8s, 0.3s duration.
  Glitch weight from MANIFEST drives frequency/intensity.

DATA READOUT PANEL (right of CRT):
  ┌─────────────────────────────┐
  │ SIGNAL MONITOR              │
  ├─────────────────────────────┤
  │ CLIP     │ IMG_XXXX         │
  │ LOCAL    │ HH:MM  CITY      │
  │ ALT      │ XXXm             │
  │ GPS ACC  │ XX.Xm  ▓▓▓░░    │
  │ LUM      │ X.XX   ▓▓░░░    │
  │ MOTION   │ X.XX   ▓░░░░    │
  │ GLITCH   │ X.XX   ▓▓▓░░    │
  │ RMS PEAK │ X.XX   ▓▓▓▓░    │
  │ iOS      │ XX.X.X           │
  └─────────────────────────────┘
  Block chars ▓░. Updates on clip change.

NARRATIVE TEXT SLOTS (edge positions, typewriter, speed = 1 - motion_score):
  <!-- CH01_TEXT_TOP -->
  <!-- CH01_TEXT_LEFT -->
  <!-- CH01_TEXT_BOTTOM -->
  <!-- CH01_TEXT_RIGHT -->

CURRENT TEXT (Claude-authored, do not modify):
  Top (very slow, motion 0.005):
    "September. 不准开冷气了。\n窗缝里进来的风\n比预期的要少。"
  Left (vertical drift):
    "40.7194° N\n−73.9896° W\nfloor 18"
  Bottom (subtitle register):
    "楼下有人在尖叫。\n这不是痛苦。\n或者也是。\n不确定。                    04:23"
  Right (tiny, near-invisible):
    "Still Life #21 —\n\"I pull up winter, from bed,\n The air conditioner walks beyond quilts.\""

NYE INTERRUPT (IMG_5811, 3sec):
  Trigger: automatic in clip sequence OR press 'N'
  1. Screen flashes white 1 frame
  2. CRT → IMG_5811, data panel updates
  3. Text center screen:
     "Dec 31  22:14\n同一个窗口。\n什么都没有发生，\n然后新年来了。"
  4. After 3s: hard cut back. No label change.

CLIPS (in order):
  IMG_0945  2024-02-10 15:42  NYC  17s
  IMG_3212  2024-03-30 10:39  NYC  6s
  IMG_1401  2024-09-01 20:01  NYC  16s
  IMG_1410  2024-09-02 20:31  NYC  10s
  IMG_2140  2024-09-14 23:05  NYC  10s
  IMG_2361  2024-09-20 22:49  NYC  20s
  IMG_4700  2024-11-21 22:37  NYC  15s
  IMG_5811  2024-12-31 22:14  NYC  3s   ← NYE INTERRUPT
  IMG_1448  2025-04-27 01:39  NYC  10s
  IMG_1565  2025-05-02 00:40  NYC  45s
  IMG_1627  2025-05-04 01:31  NYC  60s
  + NJ-adjacent:
  IMG_0902  Bensonhurst  5s
  IMG_1113  Jersey City  11s
  IMG_1043  Long Island City  12s
  IMG_2685  Fort Montgomery  10s
  IMG_2719  Cold Spring  4s

---

## Chapter 02 — NO SIGNAL

Location: Northeast China traverse, July 2024
Route: Shanghai (origin) → Daqing → Qiqihar → Arxan →
       Genghis Khan's Tethering Post → deeper north
Context: GPS lost in Arxan forest. Signal loss = suspension, not liberation.
         "On a prairie of green and cattle, to be left behind might be death."
         Chronologically before NYC — placed here as intrusion/memory.
Colors: #FFE600 + #0a0a0a

p5.js PARTICLE TEXT SYSTEM:
  Characters from CH02_TEXT drift, distort, flock, become birds, exit.
  Phases: DRIFT → DISTORT → FLOCK (boids) → EXIT
  GPS-lost moment (IMG_8084): all characters freeze mid-distort 3s
  Then GPS-lost text sequence activates (see Subdermal Text Layer above)
  Color: #FFE600 on #0a0a0a

PARTICLE TEXT CONTENT (Claude-authored):
  Phase 1: "大庆。齐齐哈尔。\n阿尔山。\n成吉思汗拴马桩。\n然后信号消えた。"
  Phase 2: "绿色太多。\n没有边界。\n自由和死亡的\n区别在于\n有没有人知道你在哪里。"
  Phase 3 (last readable before flock): "北上。"

CLIPS:
  IMG_0196  2024-01-12 20:55  Nanxiang Shanghai  10s  ← origin
  IMG_7948  2024-07-02 19:35  Dong'an  7s
  IMG_8033  2024-07-03 12:23  Damin  11s
  IMG_8084  2024-07-04 09:46  NO GPS (Qiqihar→Arxan road)  18s  ← signal lost
  IMG_8191  2024-07-05 20:49  Dalai Lake  30s
  IMG_8220  2024-07-05 23:14  Dalai  30s
  IMG_8224  2024-07-05 23:33  Dalai  25s
  IMG_8284  2024-07-06 23:37  Yirshi  30s
  IMG_8300  2024-07-07 13:47  Mositai  31s
  IMG_8722  2024-07-13 19:11  Jilin  10s

---

## Chapter 03 — ASCENT

Location: Gansu → Qilian Mountains → Qinghai, July 2025
Context: After graduation. After bank internship. First salary spent on this trip.
         NOT about altitude or freedom.
         About the framework of expectation.
         Being relied upon feels good. Being trusted is structure.
         Chose constraint willingly. Freedom and non-freedom run parallel.
         Without expectation there is no momentum.
Colors: #7ECECA + #C8C800 + #888888

GRID OVERLAY: CSS grid lines, rgba(126,206,202,0.15), always present in this chapter.

ALTITUDE ROUTE: SVG polyline, left side, labeled in meters.
  Dots for each clip. Current clip pulses in #7ECECA.
  Values from altitude_index.json.

DATA PANEL addition:
  │ ALTITUDE  │ XXXXm  ▓▓▓▓▓▓▓░░ │
  │ ASCENT    │ +XXXXm from start  │
  iOS: all 18.1.1 — note this stability.

TEXT ALWAYS IN BOXES (constraint aesthetic):
  <!-- CH03_TEXT_BOX_1 --> at 1723m
  <!-- CH03_TEXT_BOX_2 --> at 3408m
  <!-- CH03_TEXT_BOX_3 --> at 3752m (highest)

CURRENT TEXT (Claude-authored):
  [1723m] "银行给了我工资。\n我用它买了一张去西边的票。\n这是我第一次\n用自己的钱\n去一个没有人要我去的地方。"
  [3408m] "有路线。有地图。\n有人告诉我该往哪里走。\n我就往那里走。\n这不是没有选择。\n这是我选择了有选择。"
  [3752m] "空気が薄い。\n但很好呼吸。\n期待は重さがある。\n重さは証明だ。\n被人需要，\n是一种重量。\n我喜欢这种重量。"

CLIPS (altitude ascending):
  IMG_3484  1723m  Baiyin  17:57  10s
  IMG_3549  1908m  Gulang  20:24  15s
  IMG_3551  1860m  Gulang  20:40  13s
  IMG_3567  1952m  Yangxiang  10:21  13s
  IMG_3612  3119m  Yangxiang  12:09  21s
  IMG_3618  2269m  Yangxiang  12:58  15s
  IMG_3682  2635m  Dongtan  20:03  16s
  IMG_3727  2800m  Nanfeng  12:15  9s
  IMG_3773  3408m  Qingshizui  18:17  10s
  IMG_3798  3491m  Qingshizui  20:17  18s
  IMG_3810  3752m  Qingshizui  20:31  7s  ← highest
  IMG_3840  3167m  Dongxia  13:56  11s
  IMG_3940  3227m  Gandi/Xining  05:47  20s

---

## Chapter 04 — BRISBANE

Location: Ascot, Balmoral, Morningside, Brisbane, Aug 2025 – present
Context: Ferry to school: 1.5 hours each way.
         Sun on water. Can't sleep. Can't do anything.
         "A terrible place — terrible is not enough to say it."
         Never relaxed. Not hostile. Relentlessly uncomfortable.
Colors: #5A9E9E + #555555 + #D4A800 (dull gold, unsettling)

FERRY RHYTHM: scroll dampened by factor 0.4. Cannot be hurried.

SUN: radial gradient #D4A800 at 6% opacity, top-right corner. Does not move.

VIDEO: short clips in sequence. 1s desaturated hold between clips.

AUDIO: <!-- AUDIO_CH04: ferry_engine.mp3 → Web Audio API, gain 0.15, loop -->

TEXT SLOTS: <!-- CH04_TEXT_01 -->

CURRENT TEXT (Claude-authored):
  "船。\n一个半小时。\n什么都做不了，\n也无法睡觉。\n\n太阳让人感到\n不安。\n不是热。\n是它的存在方式。\n\nDiese Stadt ist nicht schlecht.\n「悪い」でもない。\n这个地方让人\n不放松。\n\n没有更准确的词了。"

CLIPS:
  IMG_5523  2025-08-22 17:20  Ascot  9s
  IMG_5521  2025-08-23 07:10  Ascot  5s
  IMG_5671  2026-05-14 00:23  Ascot  8s
  IMG_6010  2026-05-14 00:23  Balmoral  10s  ← highest motion (0.245)
  IMG_3483  2026-05-13 08:57  Morningside  7s

---

## Interrupt — MT. TAI

IMG_8863: 62s, Tai'an Shandong, 2025-12-23 22:02, alt 196m
Fullscreen. No system chrome except coordinates.
Coordinates: 36.2043° N  117.0843° E

Data panel (only):
  ALTITUDE: 196m / LOCAL: 22:02 / DATE: 2025-12-23 / iOS: 26.0.1

Text (typewriter, ~80% complete at 62s, hard cut mid-character):
  "在这种单纯面前，\n我如何是一个人？\n不是风中飘来的声音。"

Trigger: click INT in chapter nav, OR auto after 4min in CH04.
Exit: hard cut, or ESC.

---

## Desktop Objects (5 total)

All float within the visual field. Not navigation. Not new pages.
Draggable. Max 2 open simultaneously (oldest closes on third).
Appear/disappear instantly (no animation).
Hidden on mobile.

1. NYE_3SEC.MOV  [▶ MOV]  "IMG_5811 / 00:03"
   Window: plays once, auto-closes at 3s if not manually closed
   Title: "31 DEC 2024  22:14  NEW YORK"
   Signal: LUM 0.036  MOTION 0.005  GLITCH ██████████
   Text: "Dec 31  22:14\n同一个窗口。\n什么都没有发生，\n然后新年来了。"

2. NANXIANG.MOV  [▶ MOV]  "IMG_0196 / 00:10"
   Window: plays IMG_0196
   Title: "12 JAN 2024  20:55  SHANGHAI"
   Text slot: <!-- NANXIANG_TEXT -->
   Current: "去之前，\n回来看了一次。\n不是告别，\n是确认这里还在。"

3. BRISBANE_WATER.MOV  [▶ MOV]  "IMG_6010 / 00:10"
   Window: plays IMG_6010
   Title: "14 MAY 2026  00:23  BALMORAL"
   Text slot: <!-- BRISBANE_TEXT -->
   Current: "水在动。\n太阳在右上角，\n一直在那里。\n这里没有夜晚的意思，\n只是又一天结束了。"

4. NO_GPS  [? ---]  "IMG_8084 / SIGNAL LOST"
   Window: BLACK video area (no video plays)
   Title: "04 JUL 2024  09:46  QIQIHAR→ARXAN"
   Shows: GPS: NO SIGNAL / ALT: --- / GLITCH: ██████████ 1.00 / LUM: 0.479 / MOTION: 0.136
   Center of black: "草原太大。留下来的代价，不明。"
   No auto-close.

5. TRASH  [///]
   Opens: "TRASH — 3 items"
   Items:
     想要自由.txt → "想离开。\n想不被需要。\n想消えた在某个地方\n没有人知道我在哪里。\n这感觉很好。"
     不该有自由.txt → "有人在等我回邮件。\n有人需要我做决定。\ndeadline 是真实的。\n被依靠，\n这感觉也很好。"
     还是应该有.txt → opens empty (readonly textarea)
                       5s: status bar → "modified: never"
                       10s: status bar → "我没有加入他们。"
                       15s: status bar clears
                       early close stops sequence, reopen does not restart

---

## Audio System

Web Audio API. 3 gain nodes: gainVideo (0.2), gainExtract, gainAmbient.
Crossfade on chapter change: 2s.
RMS data from MANIFEST drives gainAmbient micro-variation:
  ambient_gain = base_gain + (rms_peak × 0.05)

Audio slots (TODO — files to be provided):
  <!-- AUDIO_CH01: nyc_ambient.mp3 -->
  <!-- AUDIO_CH02: steppe_wind.mp3 -->
  <!-- AUDIO_CH03: altitude_drone.mp3 -->
  <!-- AUDIO_CH04: ferry_engine.mp3 -->

---

## Narrative Text Register (Claude-authored, do not modify)

Writing style:
- Short sentences that cut without resolution
- Nouns juxtaposed without explaining relationship
- Objects carry emotion without becoming metaphors
- Tense drifts within a passage
- Subject often absent or dissolved
- Chinese-English-Japanese mixed, no fixed ratio, never translated inline
- Physical sensation described clinically, then abandoned

Do not make text lyrical, explanatory, or resolved.
Text sits at the edge of the video frame, not inside it.

Key source texts:
- Three Worlds poetry collection (daipan.ink)
- Still Life section (written in NYC)
- 北上 essay (beishang.txt)

---

## Build Phases (status)

Phase 1: Shell + CH00 — IN PROGRESS
Phase 2: CH01 CRT + data panel — IN PROGRESS
Phase 3: Signal texture canvas (Layer 0) — PENDING
Phase 4: CH02 particle system — PENDING
Phase 5: CH03 grid + altitude route — PENDING
Phase 6: CH04 ferry rhythm — PENDING
Phase 7: Interrupt system — PENDING
Phase 8: Audio system — PENDING
Phase 9: Desktop objects — PENDING
Subdermal text layer (Layer 1) — BUILT

---

## Key Signal Values (from MANIFEST.json)

Notable clips:
  IMG_1410  lum 0.010  motion 0.001  ← darkest, most static (NYC window)
  IMG_5811  glitch 1.00  lum 0.036   ← NYE, max glitch
  IMG_8084  glitch 1.00  NO GPS      ← signal lost, max glitch
  IMG_8863  duration 62s  ios 26.0.1 ← Mt. Tai, longest clip, newest iOS
  IMG_6010  motion 0.245             ← Brisbane, highest motion
  IMG_3810  altitude_norm 1.000      ← highest point, Qilian

NYC night group characteristic:
  luminance: 0.010–0.071 (very dark)
  motion: 0.001–0.005 (nearly static)
  rms_peak: up to 0.244 (sound exists despite still image)
  → sound/image separation is a physical fact of these clips, not a design choice

Qinghai altitude arc:
  Clean linear ascent from 0.459 → 1.000 normalized
  Can be rendered directly as route line without interpolation

iOS timeline across project:
  16.6 → 17.2 → 17.3 → 17.5 → 17.6 → 18.0 → 18.1 → 26.0
  CH03 entirely iOS 18.1.1 — single stable version, unlike other chapters

---

## What Codex Should NOT Do

- Fill text slots — Claude fills all narrative text
- Invent audio files — mark as TODO
- Add smooth scroll CSS globally
- Use React, Vue, or any bundler
- Create new pages — everything is one page, one field
- Add hover states to desktop icons
- Restart trash sequence on reopen
- Use border CSS for structural elements — use ASCII box drawing only
