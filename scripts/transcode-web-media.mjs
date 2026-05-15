import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const outDir = join(root, "web-media");
mkdirSync(outDir, { recursive: true });

const sources = readdirSync(root)
  .filter((file) => /\.(mov|mp4|m4v|webm)$/i.test(file))
  .sort((a, b) => a.localeCompare(b));

const scale =
  "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'";

for (const source of sources) {
  const output = join(outDir, `${basename(source, extname(source))}.mp4`);
  const sourcePath = join(root, source);
  const args = [
    "-hide_banner",
    "-y",
    "-i",
    sourcePath,
    "-map",
    "0:v:0",
    "-map",
    "0:a?",
    "-vf",
    scale,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-profile:v",
    "high",
    "-level",
    "4.1",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-ac",
    "2",
    "-movflags",
    "+faststart",
    output,
  ];

  console.log(`transcoding ${source} -> web-media/${basename(output)}`);
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
  const mb = (statSync(output).size / 1024 / 1024).toFixed(1);
  console.log(`done web-media/${basename(output)} (${mb}MB)`);
}
