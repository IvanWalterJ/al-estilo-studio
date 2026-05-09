/* eslint-disable @typescript-eslint/no-require-imports */
const heicConvert = require("heic-convert");
const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const ARTISTS_DIR = path.resolve(__dirname, "../public/images/artists-gallery");

const SOURCES = [
  { slug: "el-gringo", folder: "Gringo", name: "El Gringo" },
  { slug: "doblemme", folder: "Doblemme", name: "Doblemme" },
  { slug: "manen-tatts", folder: "Manen", name: "Manen Tatts" },
  { slug: "nxn-tatuero", folder: "Nxn tatuero", name: "Nxn Tatuero" },
];

const MAX_DIM = 1600;
const JPEG_QUALITY = 88;
const HAMMING_THRESHOLD = 6;

async function aHash(buffer) {
  const { data } = await sharp(buffer)
    .rotate()
    .resize(8, 8, { fit: "fill" })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const avg = data.reduce((s, v) => s + v, 0) / data.length;
  let hash = 0n;
  for (let i = 0; i < data.length; i++) {
    if (data[i] >= avg) hash |= 1n << BigInt(i);
  }
  return hash;
}

function hammingDistance(a, b) {
  let x = a ^ b;
  let count = 0;
  while (x) {
    count += Number(x & 1n);
    x >>= 1n;
  }
  return count;
}

async function decodeToJpegBuffer(filePath) {
  const inBuf = await fs.readFile(filePath);
  if (/\.heic$/i.test(filePath)) {
    try {
      const out = await heicConvert({
        buffer: inBuf,
        format: "JPEG",
        quality: 0.95,
      });
      return Buffer.from(out);
    } catch {
      // Fallback: archivo con extensión .HEIC pero contenido JPEG/PNG
      try {
        await sharp(inBuf).metadata();
        return inBuf;
      } catch (err) {
        throw new Error(
          `no es HEIC válido y sharp tampoco pudo leerlo: ${err.message}`
        );
      }
    }
  }
  return inBuf;
}

async function processArtist({ slug, folder, name }) {
  const inDir = path.join(ROOT, folder);
  const outDir = path.join(ARTISTS_DIR, slug);
  await fs.mkdir(outDir, { recursive: true });

  for (const f of await fs.readdir(outDir)) {
    await fs.unlink(path.join(outDir, f));
  }

  const allFiles = await fs.readdir(inDir);
  const files = allFiles
    .filter((f) => /\.(heic|jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`\n━━━ ${name} (${files.length} archivos)`);

  const items = [];
  for (const f of files) {
    const inPath = path.join(inDir, f);
    try {
      const buf = await decodeToJpegBuffer(inPath);
      const meta = await sharp(buf).rotate().metadata();
      const hash = await aHash(buf);
      items.push({
        name: f,
        buf,
        width: meta.width,
        height: meta.height,
        hash,
        area: (meta.width || 0) * (meta.height || 0),
      });
    } catch (err) {
      console.error(`  ✗ no se pudo leer ${f}: ${err.message}`);
    }
  }

  // Group near-duplicates
  const groups = [];
  for (const it of items) {
    let g = null;
    for (const grp of groups) {
      if (hammingDistance(it.hash, grp.repHash) <= HAMMING_THRESHOLD) {
        g = grp;
        break;
      }
    }
    if (g) g.items.push(it);
    else groups.push({ repHash: it.hash, items: [it] });
  }

  const picks = groups.map((g) =>
    g.items.slice().sort((a, b) => b.area - a.area)[0]
  );

  const dupCount = items.length - groups.length;
  console.log(
    `  → ${groups.length} tatuajes únicos (agrupados ${dupCount} duplicados)`
  );
  for (const g of groups) {
    if (g.items.length > 1) {
      const kept = g.items.slice().sort((a, b) => b.area - a.area)[0].name;
      console.log(
        `    agrupados: ${g.items.map((x) => x.name).join(", ")} → ${kept}`
      );
    }
  }

  const results = [];
  for (let i = 0; i < picks.length; i++) {
    const it = picks[i];
    const outName = `${slug}-${String(i + 1).padStart(2, "0")}.jpg`;
    const outPath = path.join(outDir, outName);
    const outBuf = await sharp(it.buf)
      .rotate()
      .resize({
        width: MAX_DIM,
        height: MAX_DIM,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(outPath, outBuf);
    const finalMeta = await sharp(outBuf).metadata();
    results.push({
      src: `/images/artists-gallery/${slug}/${outName}`,
      alt: `Tatuaje por ${name}`,
      width: finalMeta.width,
      height: finalMeta.height,
    });
    console.log(
      `  ✓ ${it.name} → ${outName} (${finalMeta.width}×${finalMeta.height})`
    );
  }

  return { slug, gallery: results };
}

async function main() {
  const out = {};
  for (const s of SOURCES) {
    const r = await processArtist(s);
    out[r.slug] = r.gallery;
  }
  const outFile = path.join(__dirname, "artist-galleries.json");
  await fs.writeFile(outFile, JSON.stringify(out, null, 2));
  console.log(`\n✅ Listo. Output: ${path.relative(ROOT, outFile)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
