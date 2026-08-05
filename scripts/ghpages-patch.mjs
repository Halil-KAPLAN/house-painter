/**
 * GEÇİCİ TEST YAYINI İÇİN — sadece GitHub Pages dağıtımında çalışır.
 *
 * Site asıl olarak kendi alan adında (örn. bulentusta.com) KÖKTE yayınlanacak.
 * Kaynak kod ona göre yazılmıştır: bağlantılar `/hizmetler` gibi kökten başlar.
 *
 * GitHub Pages proje sayfası ise alt klasörde durur:
 *     https://halil-kaplan.github.io/house-painter/
 * Orada `/hizmetler` bağlantısı alan adının köküne gider ve 404 verir.
 *
 * Bu script `dist/` çıktısını dağıtımdan HEMEN ÖNCE düzeltir.
 * `src/` içinde hiçbir şeye dokunmaz — gerçek alan adına geçilince bu script
 * hiç çalıştırılmaz ve proje olması gerektiği gibi kalır.
 *
 * Ayrıca test sitesini arama motorlarına KAPATIR. Bu şart:
 * indekslenen bir test kopyası, ileride gerçek site yayına girdiğinde
 * kendi sitemizle "yinelenen içerik" olarak rekabet eder.
 *
 * Çalıştırma:  node scripts/ghpages-patch.mjs /house-painter
 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const BASE = (process.argv[2] || '/house-painter').replace(/\/$/, '');

if (!BASE.startsWith('/')) {
  console.error(`✗ Base yolu "/" ile başlamalı. Verilen: ${BASE}`);
  process.exit(1);
}

/** dist/ altındaki dosyaları uzantıya göre topla */
async function walk(dir, exts, acc = []) {
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    if ((await stat(full)).isDirectory()) await walk(full, exts, acc);
    else if (exts.some((e) => entry.endsWith(e))) acc.push(full);
  }
  return acc;
}

/**
 * Kök-göreli bir yolu base ile öneklendirir.
 * `//cdn...` (protokol-göreli) ve zaten öneklenmiş yollar atlanır.
 */
const prefix = (url) => {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  if (url === BASE || url.startsWith(`${BASE}/`)) return url;
  return `${BASE}${url}`;
};

function patchHtml(html) {
  let out = html;

  // href="/..." ve src="/..."
  out = out.replace(/\b(href|src)="(\/[^"]*)"/g, (_m, attr, url) => `${attr}="${prefix(url)}"`);

  // srcset="/a.webp 640w, /b.webp 1024w"
  out = out.replace(/\bsrcset="([^"]+)"/g, (_m, value) => {
    const patched = value
      .split(',')
      .map((part) => {
        const trimmed = part.trim();
        const [url, ...rest] = trimmed.split(/\s+/);
        return [prefix(url), ...rest].join(' ');
      })
      .join(', ');
    return `srcset="${patched}"`;
  });

  // Arama motorlarına kapat — test kopyası indekslenmemeli
  out = out.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/g,
    '<meta name="robots" content="noindex, nofollow" />',
  );

  return out;
}

async function main() {
  const htmlFiles = await walk(DIST, ['.html']);

  let linkCount = 0;
  for (const file of htmlFiles) {
    const before = await readFile(file, 'utf8');
    const after = patchHtml(before);
    if (after !== before) {
      await writeFile(file, after);
      linkCount += (before.match(/\b(?:href|src)="\//g) || []).length;
    }
  }

  // robots.txt — tüm siteyi tara-dışı bırak
  await writeFile(
    path.join(DIST, 'robots.txt'),
    [
      '# GEÇİCİ TEST YAYINI — arama motorlarına kapalı.',
      '# Asıl site kendi alan adında yayınlanacak; bu kopyanın indekslenmesi',
      '# yinelenen içerik sorunu yaratır.',
      'User-agent: *',
      'Disallow: /',
      '',
    ].join('\n'),
  );

  // GitHub Pages, alt çizgiyle başlayan klasörleri (Astro'nun _astro/) Jekyll
  // sanıp yok sayar. Bu boş dosya Jekyll işlemesini kapatır.
  await writeFile(path.join(DIST, '.nojekyll'), '');

  console.log(
    `✓ GitHub Pages yaması uygulandı\n` +
      `  base            : ${BASE}\n` +
      `  düzeltilen HTML : ${htmlFiles.length} dosya, ~${linkCount} bağlantı\n` +
      `  robots.txt      : Disallow: / (indekslemeye kapalı)\n` +
      `  .nojekyll       : oluşturuldu\n`,
  );
}

main().catch((err) => {
  console.error('✗ Yama uygulanamadı:', err);
  process.exit(1);
});
