/**
 * Build çıktısını (dist/) denetler.
 *
 * Kontroller:
 *   1. Her sayfanın title/description/canonical'ı benzersiz mi
 *   2. Title ve description uzunlukları arama sonuçlarında kesilmiyor mu
 *   3. Her sayfada tam bir <h1> var mı
 *   4. Görsellerde alt metni eksik mi
 *   5. Bölge sayfaları birbirinin kopyası mı (doorway page denetimi)
 *   6. JSON-LD geçerli JSON mu
 *   7. İç bağlantılar kırık mı (var olmayan sayfaya link)
 *   8. Satır içi etiketlerin etrafında boşluk kaybolmuş mu ("detay?Çünkü" gibi)
 *   9. Uzun çizgiye bitişik metin var mı ("Ustası —Eşyalarınıza" gibi)
 *
 * Çalıştırma: npm run seo
 */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const LIMITS = {
  titleMin: 30,
  titleMax: 65,
  descMin: 110,
  descMax: 165,
};

const problems = [];
const warnings = [];

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

/** dist/ altındaki tüm .html dosyalarını bul */
async function findHtml(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await findHtml(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

/** Karşılaştırma için metni normalize et (etiketleri at, boşlukları sadeleştir) */
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** İki metnin kelime bazlı benzerlik oranı (Jaccard) */
function similarity(a, b) {
  const setA = new Set(a.toLowerCase().split(' ').filter((w) => w.length > 3));
  const setB = new Set(b.toLowerCase().split(' ').filter((w) => w.length > 3));
  const inter = [...setA].filter((w) => setB.has(w)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}

async function main() {
  const files = await findHtml(DIST);
  const pages = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const url = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/(index)?\.html$/, '');

    const page = {
      url: url === '/' ? '/' : url.replace(/\/$/, ''),
      /** Ham HTML — sonraki kontroller yeniden okumasın (404 gibi dosya adları farklı olabilir) */
      raw: html,
      title: pick(html, /<title>([^<]*)<\/title>/i),
      desc: pick(html, /<meta name="description" content="([^"]*)"/i),
      canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
      h1s: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].length,
      noindex: /content="noindex/.test(html),
      imgsNoAlt: [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)].length,
      jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
        (m) => m[1],
      ),
      links: [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)]
        .map((m) => m[1])
        .filter((h) => h.startsWith('/') && !h.startsWith('//')),
      text: textOf(html),
    };
    pages.push(page);

    const at = `${page.url}`;

    // 1 & 2 — title
    if (!page.title) problems.push(`${at} — <title> yok`);
    else if (page.title.length > LIMITS.titleMax)
      warnings.push(`${at} — title ${page.title.length} karakter (>${LIMITS.titleMax}), Google kesebilir`);
    else if (page.title.length < LIMITS.titleMin)
      warnings.push(`${at} — title ${page.title.length} karakter, kısa`);

    if (!page.desc) problems.push(`${at} — meta description yok`);
    else if (page.desc.length > LIMITS.descMax)
      warnings.push(`${at} — description ${page.desc.length} karakter (>${LIMITS.descMax}), kesilebilir`);
    else if (page.desc.length < LIMITS.descMin)
      warnings.push(`${at} — description ${page.desc.length} karakter, kısa`);

    if (!page.canonical) problems.push(`${at} — canonical yok`);

    // 3 — h1
    if (page.h1s === 0) problems.push(`${at} — <h1> yok`);
    else if (page.h1s > 1) problems.push(`${at} — ${page.h1s} adet <h1> var, tek olmalı`);

    // 4 — alt
    if (page.imgsNoAlt > 0) problems.push(`${at} — ${page.imgsNoAlt} görselde alt metni yok`);

    // 6 — JSON-LD
    for (const raw of page.jsonLd) {
      try {
        JSON.parse(raw);
      } catch {
        problems.push(`${at} — JSON-LD geçersiz JSON`);
      }
    }
    if (page.jsonLd.length === 0 && !page.noindex)
      warnings.push(`${at} — JSON-LD yok`);
  }

  // 1 — benzersizlik
  for (const field of ['title', 'desc', 'canonical']) {
    const seen = new Map();
    for (const p of pages) {
      const v = p[field];
      if (!v) continue;
      if (seen.has(v)) problems.push(`Kopya ${field}: "${v.slice(0, 55)}…" → ${seen.get(v)} ve ${p.url}`);
      else seen.set(v, p.url);
    }
  }

  // 5 — doorway page denetimi (bölge sayfaları birbirine ne kadar benziyor)
  const regionPages = pages.filter((p) => p.url.startsWith('/bolgeler/') && p.url !== '/bolgeler');
  const pairs = [];
  for (let i = 0; i < regionPages.length; i++) {
    for (let j = i + 1; j < regionPages.length; j++) {
      const sim = similarity(regionPages[i].text, regionPages[j].text);
      pairs.push({ a: regionPages[i].url, b: regionPages[j].url, sim });
      if (sim > 0.8)
        problems.push(
          `Doorway riski: ${regionPages[i].url} ve ${regionPages[j].url} %${Math.round(sim * 100)} benzer`,
        );
      else if (sim > 0.65)
        warnings.push(
          `${regionPages[i].url} ↔ ${regionPages[j].url} %${Math.round(sim * 100)} benzer — özgünleştirilebilir`,
        );
    }
  }

  // 7 — kırık iç bağlantı
  const known = new Set(pages.map((p) => p.url));
  const staticFiles = new Set(
    (await readdir(path.join(ROOT, 'public'))).map((f) => `/${f}`),
  );
  let linkCount = 0;
  for (const p of pages) {
    for (const raw of p.links) {
      linkCount++;
      const target = raw.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
      if (known.has(target) || staticFiles.has(target)) continue;
      problems.push(`${p.url} — kırık iç bağlantı: ${raw}`);
    }
  }

  // 8 — satır içi etiket etrafında kaybolan boşluk
  //
  // Astro, `</strong>` ile sonraki satırdaki metin arasındaki satır sonunu kırpar;
  // sonuç "detay?Çünkü" gibi bitişik çıkar. Çözüm: etiketten sonra {' '} koymak.
  //
  // Sadece düz metin içinde kullanılan etiketler taranır. `span` bilerek DIŞARIDA:
  // rozet/sayaç gibi flex çocuklarında kullanılıyor ve orada boşluğu `gap` veriyor.
  const INLINE = 'strong|em|b|i|a|code|small';
  const YAPISIK_KAPANIS = new RegExp(`</(?:${INLINE})>(?=[A-Za-zÇĞİÖŞÜçğıöşü0-9])`, 'g');
  const YAPISIK_ACILIS = new RegExp(`[A-Za-zÇĞİÖŞÜçğıöşü0-9](?=<(?:${INLINE})[ >])`, 'g');

  for (const p of pages) {
    for (const re of [YAPISIK_KAPANIS, YAPISIK_ACILIS]) {
      for (const m of p.raw.matchAll(re)) {
        const parca = p.raw.slice(Math.max(0, m.index - 45), m.index + 45).replace(/\s+/g, ' ');
        problems.push(`${p.url} — satır içi etikette boşluk kaybolmuş: …${parca}…`);
      }
    }
  }

  // 9 — uzun çizgiye (—) bitişik metin
  //
  // 8. kontrol `span` etiketini hariç tuttuğu için (rozet/sayaç gibi flex
  // çocuklarında yanlış alarm veriyordu) bir hata kaçmıştı: ana sayfanın h1'i
  // "Boya Ustası —Eşyalarınıza" diye bitişik çıkıyordu.
  //
  // Bu kontrol etiketlere değil ÜRETİLEN METNE bakar, o yüzden hangi etiketin
  // kullanıldığından bağımsız çalışır.
  //
  // Sadece uzun çizgi (—) taranır. Kısa çizgi (–) sayı aralıklarında boşluksuz
  // kullanılır ("2–3 gün", "5–7 gün") ve bu DOĞRU yazımdır; taranırsa yanlış
  // alarm verir.
  const CIZGI_YAPISIK = /[\p{L}\p{N}]—|—[\p{L}\p{N}]/gu;

  for (const p of pages) {
    for (const m of p.text.matchAll(CIZGI_YAPISIK)) {
      const parca = p.text.slice(Math.max(0, m.index - 45), m.index + 45);
      problems.push(`${p.url} — uzun çizgiye bitişik metin (boşluk eksik): …${parca}…`);
    }
  }

  // Rapor
  console.log(`\n📄 ${pages.length} sayfa, ${linkCount} iç bağlantı denetlendi\n`);

  if (pairs.length) {
    const max = pairs.reduce((a, b) => (a.sim > b.sim ? a : b));
    const avg = pairs.reduce((s, p) => s + p.sim, 0) / pairs.length;
    console.log(
      `🗺  Bölge sayfaları benzersizliği: ortalama %${Math.round(avg * 100)} benzerlik, ` +
        `en yüksek %${Math.round(max.sim * 100)} (${max.a} ↔ ${max.b})\n`,
    );
  }

  if (warnings.length) {
    console.log(`⚠️  ${warnings.length} uyarı:`);
    warnings.forEach((w) => console.log(`   · ${w}`));
    console.log('');
  }

  if (problems.length) {
    console.log(`❌ ${problems.length} sorun:`);
    problems.forEach((p) => console.log(`   · ${p}`));
    console.log('');
    process.exit(1);
  }

  console.log('✅ Tüm SEO kontrolleri geçti.\n');
}

main().catch((err) => {
  console.error('✗ Denetim hatası:', err);
  process.exit(1);
});
