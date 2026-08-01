/**
 * Rewrites everything under public/ as WebP at sensible widths.
 *
 *   node scripts/optimize-images.mjs           # report what would change
 *   node scripts/optimize-images.mjs --write   # actually write the .webp files
 *   node scripts/optimize-images.mjs --write --prune   # ...and delete the originals
 *
 * Source photos come straight off a phone at 4000px and several megabytes.
 * Nothing on the site displays an image wider than ~1600 CSS pixels, so the
 * rules below cap each directory at what it actually needs. Directories whose
 * components pass a `sizes` attribute get multiple widths for srcset; the rest
 * get a single file.
 */
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = "public"
const WRITE = process.argv.includes("--write")
const PRUNE = process.argv.includes("--prune")

const DEFAULT_QUALITY = 78

/** First matching rule wins. */
const RULES = [
  // Gallery photography, rendered through components that declare `sizes`.
  // Photographs hide compression far better than UI does, so they go lower.
  {
    match: /^public\/(hexafall-2-0|acehack-5-0|journey)\//,
    widths: [640, 1024, 1400],
    quality: 70,
  },

  // Project screenshots — single width, displayed at most ~900px wide. These
  // contain small UI text, which is exactly what low quality smears.
  { match: /^public\/projects\//, widths: [1440], quality: 82 },

  // Portrait: biggest on-screen box is the 460px about-section image.
  { match: /^public\/kalyan-manna\./, widths: [960], quality: 80 },

  // Wordmarks render at 55px and 220px.
  { match: /^public\/logo(-white)?\./, widths: [256], quality: 90 },
]

// Kept as PNG: it is the favicon and the apple-touch-icon, and Safari still
// wants a real PNG there. It only gets resized and recompressed.
const KEEP_AS_PNG = new Map([["public/logo-with-bg.png", 512]])

function toPosix(p) {
  return p.split(path.sep).join("/")
}

function collect(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collect(full, out)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(toPosix(full))
  }
  return out
}

function ruleFor(file) {
  return RULES.find((rule) => rule.match.test(file))
}

/** `public/a/b.jpg` + 1024 -> `public/a/b-1024.webp` (largest width drops the suffix). */
function targetFor(file, width, isPrimary) {
  const dir = path.posix.dirname(file)
  const base = path.posix.basename(file).replace(/\.(jpe?g|png)$/i, "")
  return isPrimary
    ? `${dir}/${base}.webp`
    : `${dir}/${base}-${width}.webp`
}

let before = 0
let after = 0
const written = []
const skipped = []

for (const file of collect(ROOT)) {
  const original = fs.statSync(file).size
  before += original

  const keepPng = KEEP_AS_PNG.get(file)

  if (keepPng !== undefined) {
    if (WRITE) {
      const buffer = await sharp(file)
        .resize({ width: keepPng, height: keepPng, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer()
      fs.writeFileSync(file, buffer)
      after += buffer.length
    }
    written.push(`${file} (png, <=${keepPng}px)`)
    continue
  }

  const rule = ruleFor(file)

  if (!rule) {
    skipped.push(file)
    after += original
    continue
  }

  const meta = await sharp(file).metadata()
  const widths = rule.widths.filter((w) => w <= meta.width)

  // Never upscale: an image narrower than the smallest rule keeps its own width.
  if (widths.length === 0) widths.push(meta.width)

  const primary = Math.max(...widths)

  for (const width of widths) {
    const target = targetFor(file, width, width === primary)
    const buffer = await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: rule.quality ?? DEFAULT_QUALITY })
      .toBuffer()

    if (WRITE) fs.writeFileSync(target, buffer)

    after += buffer.length
    written.push(`${target} ${(buffer.length / 1024).toFixed(0)}KB`)
  }

  if (WRITE && PRUNE) fs.unlinkSync(file)
}

for (const line of written) console.log("  " + line)
if (skipped.length) console.log("\nno rule (left alone):\n  " + skipped.join("\n  "))

console.log(
  `\n${WRITE ? "wrote" : "would write"} ${written.length} files` +
    `\nbefore: ${(before / 1024 / 1024).toFixed(1)}MB` +
    `\nafter:  ${(after / 1024 / 1024).toFixed(1)}MB` +
    `\nsaved:  ${(((before - after) / before) * 100).toFixed(1)}%` +
    (WRITE ? "" : "\n\n(dry run — pass --write to apply)")
)
