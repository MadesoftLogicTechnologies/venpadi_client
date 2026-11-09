import fs from "fs";
import path from "path";

const svgPath = path.resolve("public/images/how-it-works-go-live.svg");
const outJpg = path.resolve("public/images/how-it-works-go-live-bg.jpg");
const svg = fs.readFileSync(svgPath, "utf8");

const m = svg.match(/xlink:href="data:image\/jpeg;base64,([A-Za-z0-9+/=]+)"/);
if (!m) {
  console.error("Embedded JPEG not found");
  process.exit(1);
}

fs.writeFileSync(outJpg, Buffer.from(m[1], "base64"));
console.log("Wrote", outJpg, "bytes", Buffer.from(m[1], "base64").length);