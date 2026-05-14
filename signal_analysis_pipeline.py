import json
import math
import re
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from PIL import Image


VIDEO_EXTENSIONS = {
    ".mp4", ".mov", ".avi", ".mkv", ".m4v", ".wmv",
    ".flv", ".webm", ".mts", ".m2ts", ".3gp", ".hevc",
}


INPUT_DIR = Path("/Users/jarlgiovanni/Desktop/in_praiseof_time")
OUTPUT_DIR = Path("/Users/jarlgiovanni/Desktop/in_praiseof_time/signal_data")
LOCATION_INDEX = Path("/Users/jarlgiovanni/Desktop/in_praiseof_time/footage_report/location_index.json")


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def check_ffmpeg():
    for tool in ("ffmpeg", "ffprobe"):
        result = run(["which", tool])
        if result.returncode != 0:
            sys.exit(f"[ERROR] {tool} not found")


def clip_key(path):
    return path.stem


def video_files():
    return sorted(
        p for p in INPUT_DIR.rglob("*")
        if p.suffix.lower() in VIDEO_EXTENSIONS
        and not p.name.startswith(".")
        and "signal_data" not in p.parts
    )


def load_location_index():
    if not LOCATION_INDEX.exists():
        return {}
    with open(LOCATION_INDEX, "r", encoding="utf-8") as f:
        data = json.load(f)
    clips = {}
    for group in data.get("locations", {}).values():
        for item in group:
            clips[item.get("filename", "")] = item
            clips[Path(item.get("filename", "")).stem] = item
    return clips


def parse_altitude(raw):
    if not raw:
        return None
    match = re.match(
        r"([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)?/?",
        str(raw).strip(),
    )
    if not match or not match.group(3):
        return None
    try:
        return float(match.group(3))
    except ValueError:
        return None


def accuracy_to_glitch(clip_meta):
    if not clip_meta or not clip_meta.get("has_gps"):
        return 1.0
    tags = clip_meta.get("all_tags", {})
    raw = tags.get("com.apple.quicktime.location.accuracy.horizontal")
    try:
        accuracy = float(raw)
    except (TypeError, ValueError):
        return 1.0
    if accuracy < 5:
        return 0.05
    if accuracy <= 20:
        return 0.2
    if accuracy <= 50:
        return 0.5
    return 1.0


def extract_sample_frames(video_path, frame_dir):
    frame_dir.mkdir(parents=True, exist_ok=True)
    pattern = str(frame_dir / "frame_%06d.jpg")
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        str(video_path),
        "-vf",
        "select='not(mod(n,10))',scale=320:-1",
        "-vsync",
        "vfr",
        "-q:v",
        "4",
        pattern,
        "-y",
    ]
    result = run(cmd)
    if result.returncode != 0:
        print(f"  [WARN] frame extraction failed for {video_path.name}: {result.stderr.strip()}")
    return sorted(frame_dir.glob("frame_*.jpg"))


def analyze_frames(video_path, out_json, frame_dir):
    out_json.parent.mkdir(parents=True, exist_ok=True)
    frames = extract_sample_frames(video_path, frame_dir)
    records = []
    prev_luma = None

    for idx, frame_path in enumerate(frames):
        with Image.open(frame_path) as img:
            arr = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0

        r = arr[:, :, 0]
        g = arr[:, :, 1]
        b = arr[:, :, 2]
        luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
        contrast = float(np.std(luma))
        motion = 0.0 if prev_luma is None else float(np.mean(np.abs(luma - prev_luma)))
        prev_luma = luma

        records.append({
            "frame_n": idx * 10,
            "r_mean": float(np.mean(r)),
            "g_mean": float(np.mean(g)),
            "b_mean": float(np.mean(b)),
            "luminance_mean": float(np.mean(luma)),
            "contrast": contrast,
            "motion_score": max(0.0, min(1.0, motion)),
        })

    payload = {
        "clip": clip_key(video_path),
        "frames": records,
    }
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    return payload


def extract_audio(video_path, wav_path):
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        str(video_path),
        "-vn",
        "-ac",
        "1",
        "-ar",
        "22050",
        "-acodec",
        "pcm_s16le",
        str(wav_path),
        "-y",
    ]
    result = run(cmd)
    if result.returncode != 0:
        return False
    return wav_path.exists()


def analyze_audio(video_path, wav_path, out_json):
    out_json.parent.mkdir(parents=True, exist_ok=True)
    ok = extract_audio(video_path, wav_path)
    rms_windows = []
    if ok:
        with wave.open(str(wav_path), "rb") as wf:
            sample_rate = wf.getframerate()
            samples = wf.readframes(wf.getnframes())
        audio = np.frombuffer(samples, dtype=np.int16).astype(np.float32) / 32768.0
        window = max(1, int(sample_rate * 0.1))
        for start in range(0, len(audio), window):
            chunk = audio[start:start + window]
            if len(chunk):
                rms_windows.append(float(np.sqrt(np.mean(chunk * chunk))))

    payload = {
        "clip": clip_key(video_path),
        "rms_windows": rms_windows,
    }
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    return payload


def build_metadata_indices(files, location_by_clip):
    glitch = {}
    altitude_raw = {}
    ios_raw = {}

    for video_path in files:
        key = clip_key(video_path)
        meta = location_by_clip.get(video_path.name) or location_by_clip.get(key) or {}
        tags = meta.get("all_tags", {})
        glitch[key] = accuracy_to_glitch(meta)
        altitude_raw[key] = parse_altitude(tags.get("com.apple.quicktime.location.ISO6709"))
        ios_raw[key] = tags.get("com.apple.quicktime.software") or "unknown"

    valid_altitudes = [v for v in altitude_raw.values() if isinstance(v, (int, float)) and math.isfinite(v)]
    if valid_altitudes:
        alt_min = min(valid_altitudes)
        alt_max = max(valid_altitudes)
        span = alt_max - alt_min
    else:
        alt_min = 0.0
        span = 0.0

    altitude = {}
    for key, value in altitude_raw.items():
        normalized = 0.0 if value is None or span == 0 else (value - alt_min) / span
        altitude[key] = {
            "altitude_m": value,
            "normalized": float(max(0.0, min(1.0, normalized))),
        }

    def version_tuple(version):
        if version == "unknown":
            return (9999,)
        return tuple(int(part) for part in re.findall(r"\d+", version))

    versions = sorted(set(ios_raw.values()), key=version_tuple)
    denom = max(1, len(versions) - 1)
    ios = {}
    for key, version in ios_raw.items():
        ios[key] = {
            "ios": version,
            "version_index": float(versions.index(version) / denom),
        }

    return glitch, altitude, ios


def average_frame_values(rgb_payload):
    frames = rgb_payload.get("frames", [])
    if not frames:
        return {
            "r_mean": 0.0,
            "g_mean": 0.0,
            "b_mean": 0.0,
            "luminance_mean": 0.0,
            "contrast": 0.0,
            "motion_score": 0.0,
        }
    keys = ["r_mean", "g_mean", "b_mean", "luminance_mean", "contrast", "motion_score"]
    return {key: float(np.mean([frame.get(key, 0.0) for frame in frames])) for key in keys}


def build_manifest(files, location_by_clip, rgb_data, audio_data, glitch, altitude, ios):
    manifest = {}
    for video_path in files:
        key = clip_key(video_path)
        meta = location_by_clip.get(video_path.name) or location_by_clip.get(key) or {}
        frame_avg = average_frame_values(rgb_data.get(key, {}))
        rms = audio_data.get(key, {}).get("rms_windows", [])
        location = meta.get("location", {})
        local_time = meta.get("local_time", {})

        manifest[key] = {
            "clip": key,
            "filename": video_path.name,
            "rgb": frame_avg,
            "rms_peak": float(max(rms)) if rms else 0.0,
            "rms_mean": float(np.mean(rms)) if rms else 0.0,
            "glitch_weight": glitch.get(key, 1.0),
            "altitude_normalized": altitude.get(key, {}).get("normalized", 0.0),
            "altitude_m": altitude.get(key, {}).get("altitude_m"),
            "ios_version_index": ios.get(key, {}).get("version_index", 0.0),
            "ios": ios.get(key, {}).get("ios", "unknown"),
            "local_time": local_time.get("local_time") or meta.get("creation_time_utc"),
            "time_of_day": local_time.get("time_of_day"),
            "location": location.get("name") or "NO GPS - location unknown",
            "lat": meta.get("lat"),
            "lon": meta.get("lon"),
        }
    return manifest


def write_json(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)


def print_summary(manifest):
    print("\nSUMMARY")
    print("| Clip | Location | Lum | Contrast | Motion | RMS peak | Glitch | Alt norm | iOS idx |")
    print("|---|---|---:|---:|---:|---:|---:|---:|---:|")
    for key in sorted(manifest):
        item = manifest[key]
        rgb = item["rgb"]
        print(
            f"| {key} | {item['location']} | "
            f"{rgb['luminance_mean']:.3f} | {rgb['contrast']:.3f} | {rgb['motion_score']:.3f} | "
            f"{item['rms_peak']:.3f} | {item['glitch_weight']:.2f} | "
            f"{item['altitude_normalized']:.3f} | {item['ios_version_index']:.3f} |"
        )


def main():
    check_ffmpeg()
    files = video_files()
    if not files:
        sys.exit(f"[ERROR] No videos found in {INPUT_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    rgb_dir = OUTPUT_DIR / "rgb_motion"
    audio_json_dir = OUTPUT_DIR / "audio_waveforms"
    wav_dir = OUTPUT_DIR / "audio_wav"
    frame_dir = OUTPUT_DIR / "frame_samples"

    location_by_clip = load_location_index()
    glitch, altitude, ios = build_metadata_indices(files, location_by_clip)
    write_json(OUTPUT_DIR / "glitch_weights.json", glitch)
    write_json(OUTPUT_DIR / "altitude_index.json", altitude)
    write_json(OUTPUT_DIR / "ios_timeline.json", ios)

    rgb_data = {}
    audio_data = {}
    print(f"[signal] Processing {len(files)} clips")
    for index, video_path in enumerate(files, 1):
        key = clip_key(video_path)
        print(f"[{index}/{len(files)}] {video_path.name}")
        rgb_data[key] = analyze_frames(
            video_path,
            rgb_dir / f"{key}.json",
            frame_dir / key,
        )
        audio_data[key] = analyze_audio(
            video_path,
            wav_dir / f"{key}.wav",
            audio_json_dir / f"{key}.json",
        )

    manifest = build_manifest(files, location_by_clip, rgb_data, audio_data, glitch, altitude, ios)
    write_json(OUTPUT_DIR / "MANIFEST.json", manifest)

    print(f"\nWrote signal data to {OUTPUT_DIR}")
    print_summary(manifest)


if __name__ == "__main__":
    main()
