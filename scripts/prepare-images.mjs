/**
 * assets/ → src/assets/isler/*.webp
 *
 * WhatsApp'tan gelen isimsiz JPEG'leri anlamlı adlarla WebP'ye çevirir.
 *
 * ⚠️ assets/ klasörü KAYNAKTIR — bu script oradan sadece OKUR, asla yazmaz/silmez.
 *    Optimizasyon ayarı değişirse baştan üretilebilsin diye orijinaller korunur.
 *
 * Çalıştırma: npm run images
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'assets');
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'isler');

/** En uzun kenar bu değere indirilir — Astro srcset'i buradan türetir */
const MAX_EDGE = 1600;
const QUALITY = 82;

/**
 * Orijinal WhatsApp dosya adı → SEO uyumlu yeni ad.
 * Adlar Türkçe karakter içermez, tire ayraçlıdır ve içeriği tarif eder;
 * dosya adı da Google Görseller için bir sıralama sinyalidir.
 */
const RENAME_MAP = {
  'WhatsApp Image 2026-08-04 at 22.03.54.jpeg': 'dolu-daire-salon-boyama',
  'WhatsApp Image 2026-08-04 at 22.04.07.jpeg': 'esyali-ev-oturma-odasi-boyama',
  'WhatsApp Image 2026-08-04 at 22.04.21.jpeg': 'mutfak-duvar-yuzey-hazirlik',
  'WhatsApp Image 2026-08-04 at 22.04.54.jpeg': 'saten-alci-uygulamasi',
  'WhatsApp Image 2026-08-04 at 22.05.09.jpeg': 'asma-tavan-kartonpiyer-boyama',
  'WhatsApp Image 2026-08-04 at 22.05.20.jpeg': 'dukkan-boyama-hazirlik',
  'WhatsApp Image 2026-08-04 at 22.05.50.jpeg': 'isyeri-boyama-zemin-koruma',
  'WhatsApp Image 2026-08-04 at 22.06.35.jpeg': 'cocuk-odasi-dekoratif-boyama',
  'WhatsApp Image 2026-08-04 at 22.07.17.jpeg': 'antre-koridor-boyama',
  'WhatsApp Image 2026-08-04 at 22.07.27.jpeg': 'mutfak-boyama-tamamlandi',
  'WhatsApp Image 2026-08-04 at 22.07.41.jpeg': 'mutfak-boyama-esya-koruma',
};

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`✗ Kaynak klasör bulunamadı: ${SRC_DIR}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  if (files.length === 0) {
    console.error('✗ assets/ içinde görsel bulunamadı.');
    process.exit(1);
  }

  let totalIn = 0;
  let totalOut = 0;
  const results = [];

  for (const file of files) {
    const newName = RENAME_MAP[file];

    if (!newName) {
      console.warn(`⚠ Eşleme yok, atlanıyor: ${file}`);
      console.warn('  → scripts/prepare-images.mjs içindeki RENAME_MAP\'e ekleyin.');
      continue;
    }

    const inputBuffer = await readFile(path.join(SRC_DIR, file));
    const image = sharp(inputBuffer).rotate(); // EXIF yönünü uygula
    const meta = await image.metadata();

    const outBuffer = await image
      .resize({
        width: meta.width >= meta.height ? MAX_EDGE : undefined,
        height: meta.height > meta.width ? MAX_EDGE : undefined,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer({ resolveWithObject: true });

    const outPath = path.join(OUT_DIR, `${newName}.webp`);
    await writeFile(outPath, outBuffer.data);

    totalIn += inputBuffer.length;
    totalOut += outBuffer.data.length;

    results.push({
      name: `${newName}.webp`,
      size: `${outBuffer.info.width}×${outBuffer.info.height}`,
      kb: Math.round(outBuffer.data.length / 1024),
      saved: `${Math.round((1 - outBuffer.data.length / inputBuffer.length) * 100)}%`,
    });
  }

  console.table(results);
  console.log(
    `\n✓ ${results.length} görsel → ${OUT_DIR}\n` +
      `  ${Math.round(totalIn / 1024)} KB → ${Math.round(totalOut / 1024)} KB ` +
      `(%${Math.round((1 - totalOut / totalIn) * 100)} kazanç)\n`,
  );
}

main().catch((err) => {
  console.error('✗ Görsel işleme hatası:', err);
  process.exit(1);
});
