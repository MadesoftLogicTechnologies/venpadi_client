import fs from 'fs'

const path =
  'C:/Users/USER/.cursor/projects/c-Users-USER-Desktop-Madesoft-venpadi-client/agent-transcripts/ec8f9ac3-8591-4bac-846d-69a19a003736/compaction/segment_001.md'
const text = fs.readFileSync(path, 'utf8')
const marker = '<svg width="564" height="563"'
const start = text.indexOf(marker)
if (start < 0) {
  console.error('SVG start not found')
  process.exit(1)
}
const end = text.indexOf('</svg>', start)
if (end < 0) {
  console.error('SVG end not found')
  process.exit(1)
}
const svg = text.slice(start, end + 6)
const out =
  'c:/Users/USER/Desktop/Madesoft/venpadi_client/public/images/for-vendors-hero.svg'
fs.mkdirSync('c:/Users/USER/Desktop/Madesoft/venpadi_client/public/images', {
  recursive: true,
})
fs.writeFileSync(out, svg, 'utf8')
console.log('Wrote', out, 'bytes', svg.length)
