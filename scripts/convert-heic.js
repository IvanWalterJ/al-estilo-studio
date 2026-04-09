const heicConvert = require('heic-convert')
const fs = require('fs/promises')
const path = require('path')

const INPUT_DIR = path.resolve(__dirname, '../../Estudio -20260408T190901Z-3-001/Estudio/El estudio Imagenes')
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/studio')

async function convertAll() {
  const files = await fs.readdir(INPUT_DIR)
  const heicFiles = files.filter(f => f.toLowerCase().endsWith('.heic'))

  console.log(`Found ${heicFiles.length} HEIC files to convert...`)

  for (const file of heicFiles) {
    const inputPath = path.join(INPUT_DIR, file)
    const outputName = file.replace(/\.heic$/i, '.jpg')
    const outputPath = path.join(OUTPUT_DIR, outputName)

    try {
      const inputBuffer = await fs.readFile(inputPath)
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.92,
      })
      await fs.writeFile(outputPath, Buffer.from(outputBuffer))
      console.log(`✓ Converted: ${file} → ${outputName}`)
    } catch (err) {
      console.error(`✗ Failed: ${file}`, err.message)
    }
  }

  console.log('Done converting HEIC files.')
}

convertAll().catch(console.error)
