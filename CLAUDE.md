# CLAUDE.md — AI Oturum Devri

> Bu dosyayı her oturumun **başında** oku. Amacı: yeni bir oturum veya farklı bir AI
> modeli, projeyi kaldığı yerden hatasız devam ettirebilsin.

## Proje Nedir?

Boya ustası **Bülent** için yerel SEO odaklı tanıtım sitesi. Hedef: Google'da
"Darıca boyacı", "Gebze boya ustası", "eşyalı ev boyama" gibi aramalarda üst sıralarda
çıkmak ve telefonun çalması. Bölge: Darıca / Gebze / Çayırova (ana) + Tuzla / Pendik /
Kartal (Marmaray hattı, Anadolu yakası).

## Çalışmaya Başlamadan Önce

1. **`docs/01-GOREVLER.md`** oku — nerede kaldığımızın tek gerçek kaynağı.
2. **`docs/00-PROJE.md`** karar günlüğüne bak — bir şey neden öyle yapılmış öğren.
3. **`docs/04-BEKLEYEN-BILGI.md`** oku — hangi bilgiler hâlâ placeholder.

## Bir İş Bitirdiğinde

1. `docs/01-GOREVLER.md` içindeki kutucuğu `- [x]` yap ve yanına tarih düş.
2. Mimari bir karar verdiysen `docs/00-PROJE.md` karar günlüğüne **bir satır** ekle.
3. Yeni bir eksik bilgi fark ettiysen `docs/04-BEKLEYEN-BILGI.md`'ye yaz.

## Değişmez Kurallar

| # | Kural |
|---|---|
| 1 | **`assets/` klasörünü SİLME.** Fotoğrafların tek orijinal kopyasıdır; `src/assets/isler/*.webp` bunlardan üretilmiş kayıplı türevlerdir. Build çıktısına girmez, siteyi büyütmez. Detay: `assets/README.md`. |
| 2 | **Renk, font, boşluk, gölge değerini bileşene hard-code etme.** Hepsi `src/styles/_base.css` içindeki `@theme` token'larından gelir. `bg-[#1e40af]` gibi keyfi değer yasak; `bg-brand-700` kullan. |
| 2b | **Sayfa zemini kum/bej** (`--color-sand-*`), beyaz değil. Bölüm zemini `bg-sand-100`, kenarlık `border-sand-200`, kartlar beyaz kalır (kum üzerinde öne çıksınlar). Zemini değiştirmek için `@theme`'deki 4 sand değeri yeterli — sonra kontrastı yeniden ölçün. |
| 3 | **İsim / telefon / adres / domain'i sayfaya elle yazma.** Tek kaynak `src/config/site.ts`. |
| 4 | **Site metinlerini `docs/02-ICERIK.md` ile senkron tut.** Metin oradan gelir, kod ile karışmaz. |
| 5 | **Sahte içerik üretme.** Uydurma müşteri yorumu, uydurma yıldız puanı (`aggregateRating`), uydurma "1500+ mutlu müşteri" istatistiği **yasak** — Google spam politikası ihlali ve ziyaretçiyi yanıltır. Gerçek veri gelene kadar o bölüm eklenmez. |
| 6 | **Bölge sayfaları birbirinin kopyası olamaz.** Aynı metnin ilçe adı değiştirilmiş hâli = "doorway page" = Google cezası. Her bölge sayfasında o ilçeye özgü mahalle, bina tipi ve iş örneği anlatımı olmalı. |
| 7 | Her sayfada **tek `h1`**, hiyerarşik `h2`/`h3`. |
| 8 | Her görselde açıklayıcı Türkçe `alt` + `width`/`height` (CLS önlemi). |
| 9 | **Mobile-first.** Önce 375px'te doğru görünsün, sonra `sm:`/`md:`/`lg:` ile büyüt. Dokunma hedefleri ≥ 44px. |
| 10 | **JavaScript eklemeyin.** Site şu an **0 KB client-side JS** ile çalışıyor. Menü `<details>`, SSS `<details>`, galeri filtresi `radio + :has()`, lightbox `:target` ile — hepsi JS'siz. Yeni bir etkileşim gerekirse önce CSS ile çözmeyi deneyin. |
| 11 | **Renk değiştirirken kontrastı ölçün — Lighthouse skoru düşmemeli.** CTA turuncusu ve WhatsApp yeşili WCAG AA (4.5:1) için bilerek koyulaştırıldı. Kum zemin üzerinde gövde metni **en az `ink-600`** olmalı (`ink-500` 4.18:1 ile kalıyor). Değişiklikten sonra Lighthouse'u 6 sayfa tipinde çalıştırın. |
| 12 | Yüzen WhatsApp butonu (`WhatsappFab.astro`) sadece `md` ve üzeri gösterilir — mobilde `MobileCallBar` zaten aynı işi yapar. İkisini birden açmayın, üst üste biner. |
| 13 | Yeni sayfa eklerken `BaseLayout`'a **benzersiz** `title` ve `description` verin; `npm run seo` kopyaları yakalar. |
| 14 | Import'larda **alias kullanın**, göreli yol değil: `@config/`, `@components/`, `@layouts/`, `@data/`, `@assets/`, `@styles/`. (Aynı klasördeki dosya için `./X.astro` normaldir.) `tsconfig.json`'a **`baseUrl` eklemeyin** — TypeScript 6.0'da kullanımdan kalktı, `paths` onsuz çalışıyor. |

## Teknoloji

- **Astro 7** — statik çıktı (`output: 'static'`), sıfır JS
- **Tailwind 4** — CSS-first, `@theme` ile; `tailwind.config.js` **yoktur**, tema `_base.css`'tedir
- **sharp** — görsel optimizasyonu (`scripts/prepare-images.mjs`)
- **@astrojs/sitemap** — otomatik sitemap

## Komutlar

```bash
npm run dev      # geliştirme sunucusu
npm run build    # dist/ üretimi
npm run preview  # build çıktısını önizle
npm run seo      # SEO denetimi: kopya meta, h1, alt, kırık link, doorway  ← build sonrası çalıştırın
npm run images   # assets/ → src/assets/isler/*.webp (görsel eklenince)
npm run brand    # favicon PNG + OG paylaşım kartı (marka/metin değişince)
npm run check    # TypeScript + Astro tip denetimi
```

**Değişiklik yaptıktan sonra her zaman:** `npm run build && npm run seo`

## Mevcut Durum

Faz 0–10 tamamlandı. Site yayına hazır. Ölçülen sonuçlar:
Lighthouse A11y/BP/SEO **100** · LCP **1.29 sn** · CLS **0.00** · **0 KB JS** · 21 sayfa.

Eksik olan tek şey gerçek bilgiler: soyadı, adres, alan adı → `docs/04-BEKLEYEN-BILGI.md`.

## Sayfa Yapısı (21 sayfa)

```
/                              ana sayfa
/hizmetler + 7 alt sayfa       [hizmet].astro (dinamik)
/bolgeler  + 6 alt sayfa       [bolge].astro  (dinamik, metinler ÖZGÜN)
/yaptigimiz-isler              galeri (filtre + lightbox, JS'siz)
/hakkimizda /iletisim /sikca-sorulan-sorular /404
```

Hizmet ve bölge içerikleri `src/config/site.ts` içindeki `SERVICES` ve `REGIONS`
dizilerinden gelir — yeni bir hizmet/bölge eklemek için sadece o diziye kayıt ekleyin,
sayfa otomatik üretilir.
