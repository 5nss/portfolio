// Lists the files in public/previews and writes content/previews.json.
// Runs automatically before `npm run dev` and `npm run build`.
//
// Name each file after its GitHub repo:
//   public/previews/fixflow.png   -> screenshot shown on the FixFlow card
//   public/previews/fixflow.mp4   -> short clip that plays when the card is hovered
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname } from "node:path";

const DIR = "public/previews";
const IMAGES = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif", ".gif"]);
const VIDEOS = new Set([".mp4", ".webm"]);

if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const manifest = {};
for (const file of readdirSync(DIR).sort()) {
  const ext = extname(file).toLowerCase();
  const repo = basename(file, extname(file)).toLowerCase();
  if (IMAGES.has(ext)) (manifest[repo] ??= {}).image = `/previews/${file}`;
  else if (VIDEOS.has(ext)) (manifest[repo] ??= {}).video = `/previews/${file}`;
}

writeFileSync("content/previews.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`[previews] ${Object.keys(manifest).length} project preview(s) found`);
