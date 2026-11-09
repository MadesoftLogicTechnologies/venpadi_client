import fs from "fs";
import path from "path";

const transcript = path.resolve(
  "C:/Users/USER/.cursor/projects/c-Users-USER-Desktop-Madesoft-venpadi-client/agent-transcripts/ec8f9ac3-8591-4bac-846d-69a19a003736/ec8f9ac3-8591-4bac-846d-69a19a003736.jsonl",
);
const out = path.resolve("public/images/how-it-works-go-live.svg");

const raw = fs.readFileSync(transcript, "utf8");
const marker = "filter0_d_800_9341";
const startMarker = "<svg width=";

let best = null;
for (const line of raw.split("\n")) {
  if (!line.includes(marker) || !line.includes(startMarker)) continue;
  const start = line.indexOf(startMarker);
  if (start < 0) continue;
  const end = line.indexOf("</svg>", start);
  if (end < 0) continue;
  const svg = line.slice(start, end + 6);
  // Unescape JSON string escapes if present
  let cleaned = svg
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\\\/g, "\\");
  if (!cleaned.startsWith("<svg")) continue;
  if (!best || cleaned.length > best.length) best = cleaned;
}

if (!best) {
  console.error("SVG not found");
  process.exit(1);
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, best, "utf8");
console.log("Wrote", out, "bytes", best.length);