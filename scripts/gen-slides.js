import fs from "node:fs"
import path from "node:path"

const PUBLIC = path.join(process.cwd(), "public", "photos")
const OUT = path.join(process.cwd(), "app", "photo-slides.ts")
const SUPABASE_URL = "https://nqqdbcfyqbrdaiadsjcx.supabase.co/storage/v1/object/public/photos"

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".avif"])
const files = fs
  .readdirSync(PUBLIC)
  .filter((f) => exts.has(path.extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))

const lines = files.map((f, i) => {
  const n = i + 1
  return `  { image: "${SUPABASE_URL}/${f}?width=600", title: "Photo ${n}", caption: "Photo ${n} of ${files.length}" }`
})

const content = `// AUTO-GENERATED. Do not edit — run \`node scripts/gen-slides.js\` instead.
// Source: public/photos/*. Drop your photos in public/photos, re-run the script.

export const PHOTO_SLIDES = [
${lines.join(",\n")}
]

export const PHOTO_COUNT = ${files.length}
`

fs.writeFileSync(OUT, content)
console.log(`Wrote ${OUT} with ${files.length} slides.`)