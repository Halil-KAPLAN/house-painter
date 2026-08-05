# 01 — Görevler (Nerede Kaldık?)

> **Bu dosya tek gerçek kaynaktır.** Bir iş bittiğinde kutucuğu `- [x]` yap ve yanına
> tarihi yaz. Yeni oturum buradan devam eder.

**Son güncelleme:** 2026-08-05
**Durum:** Faz 0–10 tamamlandı. Site yayına hazır; eksik olan tek şey gerçek
alan adı, soyadı ve adres bilgisi (`04-BEKLEYEN-BILGI.md`).

**Doğrulanmış sonuçlar (2026-08-05):**
- Lighthouse mobil: Erişilebilirlik **100** · En İyi Uygulamalar **100** · SEO **100**
- LCP 1.29 sn (4× CPU + Slow 4G kısıtı altında) · CLS **0.00**
- 21 sayfa, 953 iç bağlantı — kırık link yok, kopya meta yok
- Bölge sayfaları benzerliği ortalama %39 (doorway eşiği %65'in çok altında)

---

## Faz 0 — Takip Sistemi ✅

- [x] `CLAUDE.md` — AI oturum devri kuralları · 2026-08-05
- [x] `docs/00-PROJE.md` — genel bakış + karar günlüğü · 2026-08-05
- [x] `docs/01-GOREVLER.md` — bu dosya · 2026-08-05
- [x] `docs/02-ICERIK.md` — site metinleri · 2026-08-05
- [x] `docs/03-SEO.md` — anahtar kelime haritası · 2026-08-05
- [x] `docs/04-BEKLEYEN-BILGI.md` — eksik bilgi listesi · 2026-08-05

## Faz 1 — Proje Kurulumu ✅

- [x] Astro 7 projesi oluştur (TypeScript strict, statik çıktı)
- [x] Tailwind 4 entegrasyonu (`@tailwindcss/vite`)
- [x] `@astrojs/sitemap` kurulumu
- [x] `sharp` devDependency
- [x] `astro.config.mjs` — site url, sitemap, i18n `tr`
- [x] `src/config/site.ts` — isim/telefon/adres/domain/bölge/hizmet tek kaynağı
- [x] `.gitignore`, `package.json` script'leri (`dev`, `build`, `preview`, `images`)

## Faz 2 — Tema ve Layout ✅

- [x] `src/styles/_base.css` — `@theme` token'ları (renk, tipografi, boşluk, gölge)
- [x] `src/styles/_base.css` — `@layer base` (reset, başlık hiyerarşisi, focus, motion)
- [x] `src/styles/_base.css` — `@layer components` (`.btn-primary`, `.card`, `.section`…)
- [x] `src/layouts/BaseLayout.astro` — title/description/canonical/OG/Twitter prop'ları
- [x] `src/components/Seo.astro` — meta etiketleri
- [x] `src/components/JsonLd.astro` — `HousePainter` + `BreadcrumbList` şeması
- [x] `src/components/Header.astro` — mobil hamburger menü (JS'siz, `<details>` ile)
- [x] `src/components/Footer.astro` — NAP bilgisi, hizmet/bölge linkleri
- [x] `src/components/MobileCallBar.astro` — mobilde sabit [Ara] [WhatsApp] barı

## Faz 3 — Görseller ✅

- [x] `scripts/prepare-images.mjs` yaz (sharp: yeniden adlandır + WebP + max 1600px)
- [x] Script'i çalıştır → `src/assets/isler/` altında 11 WebP
- [x] `src/data/works.ts` — görsel + `alt` + başlık + kategori + bölge eşlemesi
- [x] OG paylaşım görseli (1200×630) üret

## Faz 4 — Ana Sayfa ✅

- [x] `Hero.astro` — başlık, alt metin, tıkla-ara + WhatsApp CTA, LCP görseli
- [x] `TrustStrip.astro` — güven şeridi (eşya koruma / tertemiz teslim / ücretsiz keşif)
- [x] `ServicesGrid.astro` — 7 hizmet kartı
- [x] `ProcessTimeline.astro` — ustanın anlatımından 9 adımlık süreç
- [x] `WorkPreview.astro` — galeriden 6 görsel + "tümünü gör"
- [x] `RegionsGrid.astro` — 6 ilçe + Marmaray hattı vurgusu
- [x] `Faq.astro` — 6-8 soru (`FAQPage` şeması ile)
- [x] `ContactCta.astro` — telefon / WhatsApp / çalışma saatleri
- [x] `src/pages/index.astro` — bölümleri birleştir

## Faz 5 — Galeri ✅

- [x] `src/pages/yaptigimiz-isler.astro` — responsive masonry (1/2/3 sütun)
- [x] Kategori filtresi (Konut / İş Yeri / Dekoratif / Alçı-Saten)
- [x] Lightbox (mümkünse JS'siz — native `<dialog>` veya CSS `:target`)
- [x] `ImageObject` yapısal verisi

## Faz 6 — Hizmet Sayfaları ✅

- [x] `src/pages/hizmetler/index.astro` — hub
- [x] `src/pages/hizmetler/[hizmet].astro` — dinamik şablon + `Service` şeması
- [x] İçerik: iç cephe boyama
- [x] İçerik: alçı & saten uygulaması
- [x] İçerik: dolu daire (eşyalı ev) boyama ← en güçlü fark
- [x] İçerik: dekoratif boya / çocuk odası
- [x] İçerik: iş yeri & dükkân boyama
- [x] İçerik: dış cephe boyama
- [x] İçerik: tavan & kartonpiyer boyama

## Faz 7 — Bölge Sayfaları ✅

> ⚠️ Her sayfanın metni **özgün** olacak. Kopya metin = doorway page = Google cezası.

- [x] `src/pages/bolgeler/index.astro` — hub
- [x] `src/pages/bolgeler/[bolge].astro` — dinamik şablon
- [x] İçerik: Darıca boyacı (mahalleler + eski bina/yoklama vurgusu)
- [x] İçerik: Gebze boyacı (yeni siteler + alçı-saten vurgusu)
- [x] İçerik: Çayırova boyacı
- [x] İçerik: Tuzla boyacı
- [x] İçerik: Pendik boyacı
- [x] İçerik: Kartal boyacı

## Faz 8 — Kurumsal Sayfalar ✅

- [x] `src/pages/hakkimizda.astro`
- [x] `src/pages/iletisim.astro` — tıkla-ara, WhatsApp, harita (adres gelince)
- [x] `src/pages/sikca-sorulan-sorular.astro` — `FAQPage` şeması

## Faz 9 — Teknik SEO ✅

- [x] `public/robots.txt`
- [x] `sitemap-index.xml` üretimini doğrula
- [x] `public/favicon.svg` + apple-touch-icon
- [x] `site.webmanifest`
- [x] `src/pages/404.astro`
- [x] ~~Font: self-hosted variable font + preload~~ → **Sistem font yığını tercih edildi.**
      Harici font indirmemek daha hızlı: sıfır network isteği, anında render, FOUT yok.
      Bir markalı font gerekirse `_base.css` → `--font-sans` değiştirilip `preload` eklenir.
- [x] `scripts/seo-check.mjs` — otomatik meta/başlık/link/doorway denetimi (`npm run seo`)
- [x] `scripts/generate-brand-assets.mjs` — favicon PNG + OG kartı (`npm run brand`)
- [x] `inlineStylesheets: 'always'` — render-blocking CSS kaldırıldı (LCP −53%)
- [x] Tüm sayfalarda benzersiz title/description kontrolü

## Faz 10 — Doğrulama ✅

- [x] `npm run build` hatasız — 21 sayfa
- [x] Lighthouse mobil: A11y **100** · Best Practices **100** · SEO **100**
      (6 sayfa tipinde ayrı ayrı ölçüldü: ana sayfa, hizmet, bölge, galeri, iletişim, hakkımızda)
- [x] Performans: LCP **1.29 sn**, CLS **0.00** (4× CPU + Slow 4G kısıtı, DevTools trace)
      · Not: Lighthouse'un *Performance* kategorisi bu araçla ölçülemiyor; onun
      yerine gerçek trace metrikleri (LCP/CLS) alındı. Yayından sonra PageSpeed
      Insights ile saha verisi de kontrol edilmeli.
- [x] 375 / 768 / 1440px kontrol — 12 sayfada yatay kaydırma **0px**
- [x] Dokunma hedefleri ≥ 44px (mobilde tüm bağlantı/buton/etiketler tarandı)
- [x] JSON-LD yapısal doğrulama — 5 sayfa tipi, geçerli JSON, beklenen tipler
      · ⚠️ **Bekliyor:** Google Rich Results Test yayından sonra çalıştırılmalı
      (canlı URL gerektirir) → `03-SEO.md` yayın sonrası listesi
- [x] Bölge sayfaları benzersizlik kontrolü — ortalama %39 benzerlik (doorway riski yok)
- [x] Kırık link kontrolü — 953 iç bağlantı, hepsi geçerli
- [x] `tel:` ve `wa.me` linkleri doğrulandı
- [x] `WhatsappFab.astro` — sağ altta sabit WhatsApp butonu (md+; mobilde alt bar devrede)

## Yayın Sonrası (site canlıya çıkınca)

> Detay: `03-SEO.md`

- [ ] Alan adı alındı ve `site.ts` güncellendi
- [ ] Cloudflare Pages / Netlify'a deploy
- [ ] **Google Business Profile açıldı** ← yerel aramada en etkili adım
- [ ] Google Search Console doğrulaması + sitemap gönderimi
- [ ] Bing Webmaster Tools
- [ ] Gerçek müşteri yorumları toplanmaya başlandı
