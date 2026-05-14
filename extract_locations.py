"""
extract_locations.py
====================
For: in_praise_of_time project
Task: Extract GPS coordinates + location names from video metadata
      Upgrades analyze_footage.py with geolocation data

USAGE
-----
    pip install reverse-geocoder timezonefinder pytz
    python3 extract_locations.py --input /path/to/video/folder --output ./footage_report

    # Optional: if you want richer place names (city/neighborhood level)
    pip install geopy
    python3 extract_locations.py --input /path/to/videos --output ./footage_report --rich

REQUIREMENTS
------------
    ffmpeg + ffprobe (already installed)
    pip install reverse-geocoder timezonefinder pytz geopy

WHAT IT DOES
------------
1. Reads ALL metadata fields from each video via ffprobe (not just basic ones)
2. Extracts GPS coordinates if present (iPhone MOV files usually have them)
3. Reverse-geocodes coordinates -> city / country / neighborhood
4. Corrects time-of-day using the LOCAL timezone of where it was shot
   (important: UTC timestamps shift significantly across timezones)
5. Outputs an enriched REPORT_locations.md grouped BY LOCATION
6. Also outputs location_index.json for use in the web project

NOTE ON GPS AVAILABILITY
------------------------
iPhone videos store GPS in QuickTime 'udta' atoms or as tags.
Not all clips will have GPS - depends on location permissions at time of recording.
Clips without GPS will be grouped as "location unknown".

OUTPUT
------
footage_report/
├── REPORT_locations.md     ← send this to Claude
└── location_index.json     ← for web project
"""

import argparse
import json
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from datetime import datetime, timezone

VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv', '.m4v', '.wmv',
                    '.flv', '.webm', '.mts', '.m2ts', '.hevc'}


# ── dependency check ──────────────────────────────────────────────────────────

def check_deps(rich=False):
    missing = []
    try:
        import reverse_geocoder
    except ImportError:
        missing.append('reverse-geocoder')
    try:
        import timezonefinder
    except ImportError:
        missing.append('timezonefinder')
    try:
        import pytz
    except ImportError:
        missing.append('pytz')
    if rich:
        try:
            import geopy
        except ImportError:
            missing.append('geopy')
    if missing:
        sys.exit(f"[ERROR] Missing packages. Run:\n  pip install {' '.join(missing)}")


def check_ffmpeg():
    for tool in ('ffmpeg', 'ffprobe'):
        result = subprocess.run(['which', tool], capture_output=True)
        if result.returncode != 0:
            sys.exit(f"[ERROR] '{tool}' not found.")


# ── GPS extraction ────────────────────────────────────────────────────────────

def parse_gps_string(gps_str: str):
    """
    Parse GPS strings from ffprobe. iPhone typically stores as:
    "+35.6762+139.6503+040.000/" (ISO 6709 format)
    or as separate lat/lon tags
    """
    if not gps_str:
        return None, None

    gps_str = gps_str.strip().rstrip('/')

    # ISO 6709 format: +35.6762+139.6503 or +35.6762+139.6503+040
    import re
    pattern = r'([+-]\d+\.?\d*)([+-]\d+\.?\d*)(?:[+-]\d+\.?\d*)?'
    match = re.match(pattern, gps_str)
    if match:
        try:
            lat = float(match.group(1))
            lon = float(match.group(2))
            if -90 <= lat <= 90 and -180 <= lon <= 180:
                return lat, lon
        except ValueError:
            pass

    return None, None


def get_full_metadata(video_path: Path) -> dict:
    """Extract ALL available metadata fields from video."""
    cmd = [
        'ffprobe', '-v', 'quiet',
        '-print_format', 'json',
        '-show_format',
        '-show_streams',
        '-show_chapters',
        str(video_path)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        return {}
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        return {}


def extract_gps_from_metadata(raw: dict) -> tuple:
    """Try multiple known GPS tag locations."""
    fmt_tags = raw.get('format', {}).get('tags', {})
    all_tags = {}
    for stream in raw.get('streams', []):
        all_tags.update(stream.get('tags', {}))
    all_tags.update(fmt_tags)

    for key in all_tags:
        key_lower = key.lower()
        if 'location' in key_lower or 'gps' in key_lower:
            val = all_tags[key]
            # Skip accuracy-only fields
            if 'accuracy' in key_lower:
                continue
            lat, lon = parse_gps_string(str(val))
            if lat is not None:
                return lat, lon, val  # lat, lon, raw_string

    return None, None, None


def reverse_geocode(lat: float, lon: float, rich: bool = False) -> dict:
    """Convert coordinates to place names."""
    import reverse_geocoder as rg

    results = rg.search((lat, lon), verbose=False)
    if not results:
        return {'city': 'unknown', 'country': 'unknown', 'name': 'unknown'}

    r = results[0]
    location = {
        'city': r.get('name', 'unknown'),
        'admin': r.get('admin1', ''),   # state/province
        'country': r.get('cc', 'unknown'),
        'name': f"{r.get('name', '')}, {r.get('cc', '')}".strip(', ')
    }

    if rich:
        try:
            from geopy.geocoders import Nominatim
            geolocator = Nominatim(user_agent="in_praise_of_time")
            loc = geolocator.reverse(f"{lat}, {lon}", language='en', timeout=5)
            if loc and loc.raw.get('address'):
                addr = loc.raw['address']
                location['neighborhood'] = (
                    addr.get('neighbourhood') or
                    addr.get('suburb') or
                    addr.get('quarter') or
                    addr.get('district') or ''
                )
                location['city'] = (
                    addr.get('city') or
                    addr.get('town') or
                    addr.get('village') or
                    location['city']
                )
                location['name'] = (
                    f"{location['neighborhood']}, {location['city']}"
                    if location['neighborhood']
                    else location['city']
                )
        except Exception:
            pass  # fall back to basic reverse geocode

    return location


def get_local_time(utc_str: str, lat: float, lon: float) -> dict:
    """Convert UTC timestamp to local time at the GPS coordinates."""
    try:
        from timezonefinder import TimezoneFinder
        import pytz

        tf = TimezoneFinder()
        tz_name = tf.timezone_at(lat=lat, lng=lon)
        if not tz_name:
            return {'local_time': utc_str, 'timezone': 'unknown', 'time_of_day': 'unknown'}

        tz = pytz.timezone(tz_name)
        # Parse UTC time
        dt_str = utc_str.replace('Z', '+00:00')
        dt_utc = datetime.fromisoformat(dt_str)
        if dt_utc.tzinfo is None:
            dt_utc = dt_utc.replace(tzinfo=timezone.utc)

        dt_local = dt_utc.astimezone(tz)
        h = dt_local.hour

        if 5 <= h < 12:
            tod = 'morning'
        elif 12 <= h < 17:
            tod = 'afternoon'
        elif 17 <= h < 21:
            tod = 'evening'
        else:
            tod = 'night'

        return {
            'local_time': dt_local.strftime('%Y-%m-%d %H:%M:%S'),
            'local_time_short': dt_local.strftime('%H:%M'),
            'timezone': tz_name,
            'time_of_day': tod,
            'hour': h
        }
    except Exception:
        return {'local_time': utc_str, 'timezone': 'error', 'time_of_day': 'unknown'}


# ── main processing ───────────────────────────────────────────────────────────

def process_video(video_path: Path, rich: bool) -> dict:
    raw = get_full_metadata(video_path)
    if not raw:
        return None

    fmt = raw.get('format', {})
    tags = fmt.get('tags', {})
    streams = raw.get('streams', [])

    video_stream = next((s for s in streams if s.get('codec_type') == 'video'), {})
    audio_stream = next((s for s in streams if s.get('codec_type') == 'audio'), {})

    duration = float(fmt.get('duration', 0))

    fps_raw = video_stream.get('r_frame_rate', '0/1')
    try:
        num, den = fps_raw.split('/')
        fps = round(int(num) / int(den), 2) if int(den) else 0
    except Exception:
        fps = 0

    creation_time = (
        tags.get('creation_time') or
        tags.get('date') or
        tags.get('com.apple.quicktime.creationdate') or
        'unknown'
    )

    # GPS
    lat, lon, gps_raw = extract_gps_from_metadata(raw)
    has_gps = lat is not None

    location = {}
    local_time_info = {}

    if has_gps:
        location = reverse_geocode(lat, lon, rich=rich)
        if creation_time != 'unknown':
            local_time_info = get_local_time(creation_time, lat, lon)
    else:
        # Fall back to UTC-based time of day
        if creation_time != 'unknown':
            try:
                dt_str = creation_time.replace('Z', '+00:00')
                dt = datetime.fromisoformat(dt_str)
                h = dt.hour
                if 5 <= h < 12:
                    tod = 'morning (UTC - no GPS)'
                elif 12 <= h < 17:
                    tod = 'afternoon (UTC - no GPS)'
                elif 17 <= h < 21:
                    tod = 'evening (UTC - no GPS)'
                else:
                    tod = 'night (UTC - no GPS)'
                local_time_info = {
                    'local_time': creation_time,
                    'local_time_short': '??:??',
                    'timezone': 'UTC (no GPS)',
                    'time_of_day': tod,
                    'hour': h
                }
            except Exception:
                pass

    # collect all tags for transparency
    all_tags_dump = {}
    for stream in streams:
        all_tags_dump.update(stream.get('tags', {}))
    all_tags_dump.update(tags)

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
        'creation_time_utc': creation_time,
        'has_gps': has_gps,
        'gps_raw': gps_raw,
        'lat': lat,
        'lon': lon,
        'location': location,
        'local_time': local_time_info,
        'all_tags': all_tags_dump,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input',  '-i', required=True)
    parser.add_argument('--output', '-o', default='./footage_report')
    parser.add_argument('--rich', action='store_true',
                        help='Use Nominatim for neighborhood-level names (slower, needs internet)')
    args = parser.parse_args()

    check_ffmpeg()
    check_deps(rich=args.rich)

    input_dir = Path(args.input).expanduser().resolve()
    output_dir = Path(args.output).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    video_files = sorted([
        p for p in input_dir.rglob('*')
        if p.suffix.lower() in VIDEO_EXTENSIONS and not p.name.startswith('.')
    ])

    if not video_files:
        sys.exit(f"[ERROR] No video files found in {input_dir}")

    print(f"\n[in_praise_of_time] Processing {len(video_files)} clips...\n")

    results = []
    for i, vpath in enumerate(video_files, 1):
        print(f"[{i}/{len(video_files)}] {vpath.name} ...", end=' ')
        meta = process_video(vpath, rich=args.rich)
        if meta:
            results.append(meta)
            gps_status = f"GPS: {meta['lat']:.4f}, {meta['lon']:.4f}" if meta['has_gps'] else "no GPS"
            loc_name = meta['location'].get('name', '') if meta['has_gps'] else '-'
            print(f"✓  {gps_status}  {loc_name}")
        else:
            print("✗ skipped")

    # ── group by location ─────────────────────────────────────────────────────
    by_location = defaultdict(list)
    for m in results:
        if m['has_gps']:
            key = m['location'].get('name', 'unknown')
        else:
            key = 'NO GPS - location unknown'
        by_location[key].append(m)

    # ── write JSON ────────────────────────────────────────────────────────────
    index_path = output_dir / 'location_index.json'
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump({
            'project': 'in_praise_of_time',
            'scanned_at': datetime.now().isoformat(),
            'total_clips': len(results),
            'clips_with_gps': sum(1 for m in results if m['has_gps']),
            'locations': {k: v for k, v in by_location.items()},
        }, f, indent=2, ensure_ascii=False, default=str)

    # ── write Markdown report ─────────────────────────────────────────────────
    report_path = output_dir / 'REPORT_locations.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# in_praise_of_time — Location Report\n\n")
        f.write(f"**Scanned:** {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"**Total clips:** {len(results)}\n")
        f.write(f"**Clips with GPS:** {sum(1 for m in results if m['has_gps'])}\n")
        f.write(f"**Locations found:** {len([k for k in by_location if 'NO GPS' not in k])}\n\n")
        f.write("---\n\n")

        for loc_name in sorted(by_location.keys()):
            clips = by_location[loc_name]
            f.write(f"## 📍 {loc_name}  ({len(clips)} clips)\n\n")

            # show map link if we have GPS
            sample = next((c for c in clips if c['has_gps']), None)
            if sample:
                lat, lon = sample['lat'], sample['lon']
                f.write(f"[View on map](https://www.google.com/maps?q={lat},{lon})\n\n")

            for m in sorted(clips, key=lambda x: x['creation_time_utc']):
                local = m['local_time']
                time_display = local.get('local_time', m['creation_time_utc'])
                tod = local.get('time_of_day', 'unknown')
                tz = local.get('timezone', '')
                time_short = local.get('local_time_short', '??:??')

                f.write(f"### `{m['filename']}`\n\n")
                f.write(f"| Field | Value |\n|---|---|\n")
                f.write(f"| Local time | {time_display} ({tz}) |\n")
                f.write(f"| Time of day | **{tod}** - {time_short} local |\n")
                f.write(f"| Duration | {m['duration_human']} |\n")
                f.write(f"| Resolution | {m['width']} × {m['height']} @ {m['fps']}fps |\n")
                f.write(f"| Size | {m['size_mb']} MB |\n")
                if m['has_gps']:
                    f.write(f"| Coordinates | {m['lat']:.5f}, {m['lon']:.5f} |\n")

                f.write("\n**All metadata tags:**\n\n```\n")
                for k, v in sorted(m['all_tags'].items()):
                    f.write(f"{k}: {v}\n")
                f.write("```\n\n")
                f.write("**Narrative notes:**\n\n")
                f.write("> _chapter assignment, mood, scene description_\n\n")
                f.write("---\n\n")

    print(f"\n[DONE]")
    print(f"  Location report -> {report_path}")
    print(f"  Location index  -> {index_path}")
    gps_count = sum(1 for m in results if m['has_gps'])
    no_gps = len(results) - gps_count
    print(f"\n  {gps_count} clips had GPS data")
    if no_gps:
        print(f"  {no_gps} clips had NO GPS - will need manual location tagging")
    print()


if __name__ == '__main__':
    main()
