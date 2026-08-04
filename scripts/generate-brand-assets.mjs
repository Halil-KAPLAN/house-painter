/**
 * Marka görsellerini üretir:
 *   public/apple-touch-icon.png  (180×180) — iOS ana ekran ikonu
 *   public/og-image.jpg          (1200×630) — WhatsApp/Facebook paylaşım görseli
 *
 * OG görseli önemlidir: site linki WhatsApp'ta paylaşıldığında görünen karttır.
 * Boyacılık işinde iş büyük ölçüde WhatsApp üzerinden yürüdüğü için bu kartın
 * düzgün görünmesi doğrudan tıklamaya etki eder.
 *
 * Çalıştırma: npm run brand
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOURCE_PHOTO = path.join(ROOT, 'src', 'assets', 'isler', 'antre-koridor-boyama.webp');

const BRAND = '#2f4bbd';
/** _base.css --color-accent-600 ile aynı ton — beyaz metinle 4.7:1 kontrast */
const ACCENT = '#d24200';

/** Apple touch icon — favicon.svg ile aynı tasarım, PNG olarak */
const ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BRAND}"/>
  <g fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="14" width="30" height="12" rx="3"/>
    <path d="M42 20h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H33a3 3 0 0 0-3 3v3"/>
    <rect x="25" y="39" width="10" height="13" rx="3"/>
  </g>
</svg>`;

/** OG kartının üzerine binen metin katmanı */
const OG_OVERLAY = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="perde" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#12172b" stop-opacity="0.95"/>
      <stop offset="55%"  stop-color="#12172b" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#12172b" stop-opacity="0.45"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#perde)"/>

  <!-- Logo işareti -->
  <g transform="translate(72, 66)">
    <rect width="64" height="64" rx="15" fill="${BRAND}"/>
    <g transform="translate(0,0)" fill="none" stroke="#ffffff" stroke-width="4"
       stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="14" width="30" height="12" rx="3"/>
      <path d="M42 20h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H33a3 3 0 0 0-3 3v3"/>
      <rect x="25" y="39" width="10" height="13" rx="3"/>
    </g>
  </g>
  <text x="154" y="93" font-family="Segoe UI, Arial, sans-serif" font-size="27"
        font-weight="700" fill="#ffffff">Bülent Usta</text>
  <text x="154" y="121" font-family="Segoe UI, Arial, sans-serif" font-size="17"
        font-weight="600" fill="#9db4ee" letter-spacing="1.6">DARICA BOYACI</text>

  <!-- Ana başlık -->
  <text x="72" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="60"
        font-weight="700" fill="#ffffff">Eşyalarınıza Zarar</text>
  <text x="72" y="342" font-family="Segoe UI, Arial, sans-serif" font-size="60"
        font-weight="700" fill="#ffffff">Vermeden, <tspan fill="${ACCENT}">Tertemiz</tspan></text>
  <text x="72" y="414" font-family="Segoe UI, Arial, sans-serif" font-size="60"
        font-weight="700" fill="${ACCENT}">Teslim</text>

  <!-- Alt bilgi -->
  <text x="72" y="478" font-family="Segoe UI, Arial, sans-serif" font-size="25"
        fill="#c9d5f2">İç cephe boyama · Alçı ve saten · Eşyalı ev boyama</text>

  <!-- Telefon rozeti -->
  <rect x="72" y="514" width="330" height="60" rx="30" fill="${ACCENT}"/>
  <text x="237" y="553" font-family="Segoe UI, Arial, sans-serif" font-size="26"
        font-weight="700" fill="#ffffff" text-anchor="middle">0537 525 21 20</text>

  <!-- Bölge rozeti -->
  <rect x="424" y="514" width="340" height="60" rx="30" fill="none"
        stroke="#ffffff" stroke-opacity="0.32" stroke-width="2"/>
  <text x="594" y="553" font-family="Segoe UI, Arial, sans-serif" font-size="22"
        font-weight="600" fill="#ffffff" text-anchor="middle">Darıca · Gebze · Çayırova</text>
</svg>`;

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });

  // 1. Apple touch icon
  const icon = await sharp(Buffer.from(ICON_SVG)).png().toBuffer();
  await writeFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), icon);

  // 2. OG paylaşım görseli — gerçek iş fotoğrafı + metin katmanı
  const photo = await readFile(SOURCE_PHOTO);
  const og = await sharp(photo)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([{ input: Buffer.from(OG_OVERLAY), top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(PUBLIC_DIR, 'og-image.jpg'), og);

  console.log(
    `✓ apple-touch-icon.png (${Math.round(icon.length / 1024)} KB)\n` +
      `✓ og-image.jpg 1200×630 (${Math.round(og.length / 1024)} KB)`,
  );
}

main().catch((err) => {
  console.error('✗ Marka görseli üretilemedi:', err);
  process.exit(1);
});
