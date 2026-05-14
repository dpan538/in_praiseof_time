"""
analyze_footage.py
==================
For: in_praise_of_time project
Task: Scan a video folder, extract metadata + keyframes, output a structured report

USAGE
-----
    python analyze_footage.py --input /path/to/your/video/folder --output ./footage_report

REQUIREMENTS
------------
    pip install ffmpeg-python Pillow
    # ffmpeg must also be installed on your system:
    # macOS:  brew install ffmpeg
    # Ubuntu: sudo apt install ffmpeg

WHAT IT DOES
------------
1. Walks the input folder recursively, finds all video files
2. For each video:
   - Extracts metadata (duration, resolution, fps, codec, creation time if available)
   - Captures 4 keyframes: at 10%, 30%, 60%, 85% of duration
   - Saves frames as JPEGs into output/frames/<video_name>/
3. Writes a Markdown report: footage_report/REPORT.md
   - Structured for Claude to read and build narrative from
4. Writes a JSON index: footage_report/index.json
   - Machine-readable, for later use in the web project

OUTPUT STRUCTURE
----------------
footage_report/
├── REPORT.md          ← send this to Claude
├── index.json         ← for web project reference
└── frames/
    ├── video_name_1/
    │   ├── frame_10pct.jpg
    │   ├── frame_30pct.jpg
    │   ├── frame_60pct.jpg
    │   └── frame_85pct.jpg
    └── video_name_2/
        └── ...
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from datetime import datetime

# ── supported extensions ──────────────────────────────────────────────────────
VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv', '.m4v', '.wmv', '.flv',
                    '.webm', '.mts', '.m2ts', '.3gp', '.hevc'}

# ── helpers ───────────────────────────────────────────────────────────────────


def check_ffmpeg():
    """Abort early if ffmpeg / ffprobe aren't available."""
    for tool in ('ffmpeg', 'ffprobe'):
        result = subprocess.run(['which', tool], capture_output=True)
        if result.returncode != 0:
            sys.exit(f"[ERROR] '{tool}' not found. Install ffmpeg first.\n"
                     f"  macOS:  brew install ffmpeg\n"
                     f"  Ubuntu: sudo apt install ffmpeg")


def get_metadata(video_path: Path) -> dict:
    """Use ffprobe to extract video metadata as a dict."""
    cmd = [
        'ffprobe', '-v', 'quiet',
        '-print_format', 'json',
        '-show_format', '-show_streams',
        str(video_path)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        return {}

    raw = json.loads(result.stdout)
    fmt = raw.get('format', {})
    streams = raw.get('streams', [])

    # find the first video stream
    video_stream = next(
        (s for s in streams if s.get('codec_type') == 'video'), {}
    )
    audio_stream = next(
        (s for s in streams if s.get('codec_type') == 'audio'), {}
    )

    duration = float(fmt.get('duration', 0))

    # parse fps fraction e.g. "30000/1001"
    fps_raw = video_stream.get('r_frame_rate', '0/1')
    try:
        num, den = fps_raw.split('/')
        fps = round(int(num) / int(den), 2) if int(den) else 0
    except Exception:
        fps = 0

    # creation time from tags
    tags = fmt.get('tags', {})
    creation_time = (
        tags.get('creation_time') or
        tags.get('date') or
        tags.get('com.apple.quicktime.creationdate') or
        'unknown'
    )

    # guess time-of-day from creation_time if possible
    time_of_day = 'unknown'
    if creation_time != 'unknown':
        try:
            dt_str = creation_time.replace('Z', '+00:00')
            dt = datetime.fromisoformat(dt_str)
            h = dt.hour
            if 5 <= h < 12:
                time_of_day = 'morning'
            elif 12 <= h < 17:
                time_of_day = 'afternoon'
            elif 17 <= h < 21:
                time_of_day = 'evening'
            else:
                time_of_day = 'night'
        except Exception:
            pass

    return {
        'filename': video_path.name,
        'path': str(video_path),
        'size_mb': round(int(fmt.get('size', 0)) / 1_048_576, 2),
        'duration_sec': round(duration, 2),
        'duration_human': f"{int(duration // 60)}m {int(duration % 60)}s",
        'width': video_stream.get('width', 'unknown'),
        'height': video_stream.get('height', 'unknown'),
        'fps': fps,
        'video_codec': video_stream.get('codec_name', 'unknown'),
        'audio_codec': audio_stream.get('codec_name', 'none'),
        'creation_time': creation_time,
        'time_of_day': time_of_day,
    }


def extract_frames(video_path: Path, output_dir: Path, duration: float) -> list[str]:
    """Extract 4 keyframes at 10/30/60/85% of the video duration."""
    output_dir.mkdir(parents=True, exist_ok=True)
    percentages = [0.10, 0.30, 0.60, 0.85]
    labels = ['frame_10pct', 'frame_30pct', 'frame_60pct', 'frame_85pct']
    saved = []

    for pct, label in zip(percentages, labels):
        timestamp = duration * pct
        out_path = output_dir / f"{label}.jpg"
        cmd = [
            'ffmpeg', '-ss', str(timestamp),
            '-i', str(video_path),
            '-vframes', '1',
            '-q:v', '3',           # JPEG quality 1-31, lower = better
            '-vf', 'scale=960:-1', # resize width to 960px, keep ratio
            str(out_path),
            '-y', '-loglevel', 'error'
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode == 0 and out_path.exists():
            saved.append(str(out_path))
        else:
            print(f"  [WARN] Could not extract frame at {pct*100:.0f}% for {video_path.name}")

    return saved


def format_duration(sec: float) -> str:
    m, s = divmod(int(sec), 60)
    h, m = divmod(m, 60)
    if h:
        return f"{h}h {m}m {s}s"
    return f"{m}m {s}s"


# ── main ──────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description='Analyze video footage for in_praise_of_time')
    parser.add_argument('--input',  '-i', required=True,
                        help='Path to folder containing video files')
    parser.add_argument('--output', '-o', default='./footage_report',
                        help='Output folder for report and frames (default: ./footage_report)')
    parser.add_argument('--no-frames', action='store_true',
                        help='Skip frame extraction (metadata only)')
    args = parser.parse_args()

    check_ffmpeg()

    input_dir = Path(args.input).expanduser().resolve()
    output_dir = Path(args.output).expanduser().resolve()
    frames_dir = output_dir / 'frames'
    output_dir.mkdir(parents=True, exist_ok=True)

    if not input_dir.exists():
        sys.exit(f"[ERROR] Input folder not found: {input_dir}")

    # ── collect all video files ───────────────────────────────────────────────
    video_files = sorted([
        p for p in input_dir.rglob('*')
        if p.suffix.lower() in VIDEO_EXTENSIONS and not p.name.startswith('.')
    ])

    if not video_files:
        sys.exit(f"[ERROR] No video files found in {input_dir}")

    print(f"\n[in_praise_of_time] Found {len(video_files)} video file(s) in {input_dir}\n")

    all_metadata = []
    total_duration = 0

    for i, vpath in enumerate(video_files, 1):
        print(f"[{i}/{len(video_files)}] Processing: {vpath.name}")

        meta = get_metadata(vpath)
        if not meta:
            print(f"  [SKIP] Could not read metadata")
            continue

        total_duration += meta['duration_sec']

        # frame extraction
        frame_paths = []
        if not args.no_frames and meta['duration_sec'] > 2:
            safe_name = vpath.stem.replace(' ', '_').replace('/', '_')
            frame_out = frames_dir / safe_name
            frame_paths = extract_frames(vpath, frame_out, meta['duration_sec'])
            print(f"  ✓ {len(frame_paths)} frames → {frame_out}")
        else:
            print(f"  ✓ metadata only")

        meta['frames'] = frame_paths
        all_metadata.append(meta)

    # ── write JSON index ──────────────────────────────────────────────────────
    index_path = output_dir / 'index.json'
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump({
            'project': 'in_praise_of_time',
            'scanned_at': datetime.now().isoformat(),
            'source_folder': str(input_dir),
            'total_clips': len(all_metadata),
            'total_duration_sec': round(total_duration, 2),
            'total_duration_human': format_duration(total_duration),
            'clips': all_metadata
        }, f, indent=2, ensure_ascii=False)

    # ── write Markdown report ─────────────────────────────────────────────────
    report_path = output_dir / 'REPORT.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# in_praise_of_time — Footage Report\n\n")
        f.write(f"**Scanned:** {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"**Source:** `{input_dir}`\n")
        f.write(f"**Total clips:** {len(all_metadata)}\n")
        f.write(f"**Total duration:** {format_duration(total_duration)}\n\n")
        f.write("---\n\n")

        # group by time of day
        groups = {'night': [], 'evening': [], 'afternoon': [], 'morning': [], 'unknown': []}
        for m in all_metadata:
            groups[m['time_of_day']].append(m)

        for tod in ['night', 'evening', 'afternoon', 'morning', 'unknown']:
            clips = groups[tod]
            if not clips:
                continue
            f.write(f"## {tod.upper()} ({len(clips)} clips)\n\n")
            for m in clips:
                f.write(f"### `{m['filename']}`\n\n")
                f.write(f"| Field | Value |\n|---|---|\n")
                f.write(f"| Duration | {m['duration_human']} |\n")
                f.write(f"| Resolution | {m['width']} × {m['height']} |\n")
                f.write(f"| FPS | {m['fps']} |\n")
                f.write(f"| Codec | {m['video_codec']} / {m['audio_codec']} |\n")
                f.write(f"| Size | {m['size_mb']} MB |\n")
                f.write(f"| Recorded | {m['creation_time']} |\n\n")

                if m['frames']:
                    f.write("**Frames extracted:**\n\n")
                    for fp in m['frames']:
                        rel = Path(fp).relative_to(output_dir)
                        f.write(f"- `{rel}`\n")
                    f.write("\n")

                f.write("**Notes for narrative (fill in manually or send frames to Claude):**\n\n")
                f.write("> _scene description, mood, sound environment, possible chapter assignment_\n\n")
                f.write("---\n\n")

    print(f"\n[DONE]")
    print(f"  Report  → {report_path}")
    print(f"  Index   → {index_path}")
    if not args.no_frames:
        print(f"  Frames  → {frames_dir}")
    print(f"\nNext step: send REPORT.md + selected frames to Claude.\n")


if __name__ == '__main__':
    main()
