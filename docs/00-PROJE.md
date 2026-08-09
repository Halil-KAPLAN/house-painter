# 00 — Proje Genel Bakış

## Amaç

Boya ustası Bülent için **yerel SEO odaklı** tanıtım sitesi. Site dekoratif bir vitrin
değil, müşteri getiren bir araç: birisi Google'da "Darıca boyacı" aradığında üst sıralarda
çıkmak ve telefonun çalmasını sağlamak.

## Kimlik

| Alan | Değer |
|---|---|
| Ad | Bülent (soyadı bekleniyor — `docs/04-BEKLEYEN-BILGI.md`) |
| Meslek | Boya ustası / alçı-saten uygulaması |
| Telefon | +90 537 525 21 20 |
| Ana bölge | Darıca, Gebze, Çayırova (Kocaeli) |
| İkincil bölge | Tuzla, Pendik, Kartal (Marmaray hattı, Anadolu yakası) |
| Adres | Bekleniyor |
| Alan adı | Bekleniyor — şimdilik placeholder |

## Teknoloji

| Katman | Seçim | Sürüm |
|---|---|---|
| Framework | Astro (statik) | 7.x |
| CSS | Tailwind (CSS-first `@theme`) | 4.x |
| Görsel | sharp → WebP + Astro `<Picture>` | 0.35.x |
| Sitemap | @astrojs/sitemap | 3.x |
| Dil | TypeScript (strict) | — |
| Hosting | Cloudflare Pages (planlanan) | — |

## Kaynak Malzeme

- `assets/` — 11 adet iş fotoğrafı (WhatsApp, 1200×1600 / 1600×1200 JPEG). **Dokunulmaz.**
- ~~`notes.txt`~~ — kaldırıldı (2026-08-05). Ustanın kendi ağzından yazdığı ham metin
  **birebir** `02-ICERIK.md` içindeki "EK — Ustanın Orijinal Anlatımı" bölümüne taşındı.
  9 adımlık "Çalışma Sürecimiz" bölümünün kaynağıdır.

## Mimari Kararlar (Karar Günlüğü)

Format: `TARİH — KARAR — NEDEN`

| Tarih | Karar | Neden |
|---|---|---|
| 2026-08-05 | Framework olarak Astro seçildi (Next.js yerine) | Statik HTML + sıfır JS üretir; yerel işletme sitesinde tek kritik metrik SEO ve açılış hızı. React'in getireceği ~90KB bundle'ın hiçbir karşılığı yok. |
| 2026-08-05 | Tailwind 4 CSS-first kullanılıyor, `tailwind.config.js` yok | Tailwind 4'te tema `@theme` ile CSS'te tanımlanıyor. Kullanıcının "tema `_base.css`'te toplansın" isteğiyle birebir örtüşüyor. |
| 2026-08-05 | Tek sayfa yerine ~19 sayfalı yapı | Google her sayfayı ayrı bir hedef olarak indeksler. "Gebze boyacı" ve "çocuk odası boyama" tek sayfada rekabet edemez, ayrı sayfalarda eder. |
| 2026-08-05 | Bölge/hizmet sayfaları dinamik route (`[bolge].astro`) ile üretiliyor | 13 sayfa için kopya dosya yerine tek şablon + veri dosyası; bakım tek noktadan. |
| 2026-08-05 | Bölge sayfalarının **metinleri** özgün yazılıyor, sadece şablon paylaşılıyor | Aynı metnin ilçe adı değiştirilmiş hâli Google'ın "doorway page" tanımına girer ve cezalandırılır. |
| 2026-08-05 | `aggregateRating` / müşteri yorumu **eklenmedi** | Gerçek yorum yok. Uydurma puan işaretlemesi Google spam politikası ihlali; tespit edilirse tüm zengin sonuçlar kapatılır. Gerçek yorum toplandığında eklenecek. |
| 2026-08-05 | Orijinal `assets/` korunuyor, WebP kopyalar `src/assets/isler/` içine üretiliyor | Kaynak kaybı riskini sıfırlar; optimizasyon ayarları değişirse baştan üretilebilir. |
| 2026-08-05 | `schema.org/HousePainter` tipi kullanıldı (genel `LocalBusiness` yerine) | schema.org'un boyacıya özel alt tipi; Google'a mesleği tam olarak bildirir. |
| 2026-08-05 | Harici font yerine **sistem font yığını** | Markalı font indirmenin bu sitede görsel karşılığı yok ama maliyeti var: ek network isteği + FOUT riski. Sistem fontu anında render edilir. `_base.css` → `--font-sans` değiştirilerek her an eklenebilir. |
| 2026-08-05 | `inlineStylesheets: 'always'` — CSS HTML'e gömüldü | Render-blocking istek kalktı, LCP 2.75 sn → 1.29 sn (%53). Ziyaretçilerin çoğu Google'dan **tek** sayfaya gelip arıyor; ilk açılış hızı sayfalar arası CSS önbelleğinden değerli. |
| 2026-08-05 | CTA turuncusu ve WhatsApp yeşili **koyulaştırıldı** | Orijinal tonlar beyaz metinle 3.6:1 ve 2.3:1 kontrast veriyordu (WCAG AA 4.5 ister). Güneş altında telefonda okunmuyordu. Renk kimliği korundu, tonlar koyulaştırıldı. |
| 2026-08-05 | Ana sayfa ve Darıca bölge sayfası **farklı kelime** hedefliyor | İkisi de "Darıca boyacı" hedefleseydi birbirini bastırırdı (keyword cannibalization). Ana sayfa "Darıca boyacı", bölge sayfası "Darıca boya badana ustası" + mahalle ekseni. |
| 2026-08-05 | Galeri filtresi ve lightbox **JavaScript'siz** (radio + `:has()`, `:target`) | Sitenin tamamı sıfır JS ile çalışıyor; galeri için JS eklemek bu avantajı bozardı. |
| 2026-08-05 | Yüzen WhatsApp butonu sadece `md` ve üzeri | Mobilde ekran altında zaten [Ara] [WhatsApp] barı var; ikisi birden gösterilirse üst üste biner. Böylece her ekranda kalıcı WhatsApp erişimi olur, tekrar olmaz. |
| 2026-08-05 | İletişim **formu yok**, telefon/WhatsApp öne alındı | Statik sitede form sunucu/servis bağımlılığı demek. Ayrıca bu işte müşteri form doldurmuyor, doğrudan arıyor. |
| 2026-08-05 | `tsconfig.json`'dan **`baseUrl` kaldırıldı**, import'lar alias'a geçirildi | `baseUrl` TypeScript 6.0'da kullanımdan kalktı, 7.0'da çalışmayı bırakacak. `paths` onsuz da çalışıyor (yollar tsconfig dizinine göre çözülür). Aynı anda 27 dosyadaki `../../` import'ları `@config/`, `@components/` gibi alias'lara çevrildi — hem tutarlılık hem okunabilirlik. ⚠️ `ignoreDeprecations` ile susturmak yanlış olurdu: sorunu ertelemiş olurduk. |
| 2026-08-05 | Sayfa zemini beyazdan **kum/bej** tonuna çevrildi (`--color-sand-*`) | Boya-badana işine yakışan sıcak bir zemin; ekranda beyazdan yumuşak ve beyaz kartların öne çıkmasını sağlıyor. Kum tonları `@theme` içinde tek yerde; zemini değiştirmek için 4 değer yeterli. |
| 2026-08-05 | Kum zemin geçişinde `text-ink-500` → `text-ink-600` | `ink-500` kum üzerinde 4.18:1 kalıyordu (WCAG AA 4.5 ister). Zemin değişince kontrast yeniden ölçüldü ve metin tonu bir kademe koyulaştırıldı. 6 sayfa tipinde Lighthouse Erişilebilirlik **100** korundu. |
| 2026-08-05 | **Çalışma saatleri siteden tamamen kaldırıldı** | Gösterilen saat doğrulanmamış bir varsayımdı. Yanlış saat müşteriyi yanıltır ve schema.org'a uydurma veri yazar. `site.ts` → `openingHours` boş; bileşenler boşken hiç göstermiyor, şemaya da eklemiyor. Gerçek saat gelince iki alan doldurulunca geri gelir. |
| 2026-08-05 | Galerideki tüm işler **"Tamamlandı"** rozetiyle gösteriliyor | Fotoğrafların bir kısmı hazırlık/uygulama anını gösterse de hepsi teslim edilmiş işler. Rozet karenin anını değil işin durumunu bildiriyor; çelişmesin diye ilgili açıklamalar geçmiş zamana çevrildi. |
| 2026-08-05 | `notes.txt` kaldırıldı, ham metin `02-ICERIK.md`'ye taşındı | Kök dizin sadeleşti ama kaynak metin kaybolmadı — birebir kopyası "EK — Ustanın Orijinal Anlatımı" bölümünde. |
| 2026-08-09 | Adres eklendi; harita **tıklayınca yüklenen** `<details>` içine alındı | Doğrudan gömülü Google haritası, sayfa açılır açılmaz ziyaretçiye izleme çerezi (`NID`, `__Secure-3PSID`) bırakıyordu: Lighthouse En İyi Uygulamalar 100 → **77** düştü ve KVKK açısından çerez onayı gerektiren bir durum oluştu. Kapalı `<details>` içindeki `loading="lazy"` iframe hiç istek atmıyor (ağ izlemesiyle doğrulandı: 0 Google isteği); kullanıcı açınca yükleniyor. Skor 100'e döndü. |
| 2026-08-09 | Hero scrim'i açıldı (0.92→0.70 / 0.78→0.50 / 0.45→0.14) + `.hero-text` gölgesi eklendi | Fotoğraf çok koyu görünüyordu. Perde açılınca beyaz metnin kontrastı riske girdiğinden metne gölge eklendi. ⚠️ Lighthouse fotoğraf üzerindeki kontrastı ÖLÇEMEZ (belirsiz sayıp atlar), bu yüzden gerçek piksel ölçümü yapıldı: hero görseli canvas'a çizilip metin alanındaki pikseller scrim alfasıyla kompozit edildi. Masaüstü en düşük 6.34 / mobil 7.68 — her ikisi de WCAG AA eşiğinin (4.5) üzerinde, %100 geçiş. |
| 2026-08-05 | Hero fotoğrafı: ustanın saten alçı çekerken göründüğü kare, **yatay aynalanmış** (`-scale-x-100`) | Orijinalde usta kadrajın solunda; metin bloğu da solda olduğu için tam altında kalıyordu. Aynalayınca sağa geçip scrim'in açıldığı tarafta net görünüyor. İnsan öğesi içeren tek fotoğrafımız — çalışan usta görüntüsü güven açısından bitmiş bir odadan güçlü. |
| 2026-08-05 | Hero görselinde `layout="none"` kullanıldı | Astro'nun responsive stili `height: auto` dayatıp `size-full`i eziyordu; görsel kendi oranında uzayıp bölümden taşıyor ve ortası değil ÜST kısmı görünüyordu — `object-center` işe yaramıyordu. Bu prop stil enjeksiyonunu kapatır, srcset üretimini etkilemez. |
| 2026-08-05 | `assets/` klasörü **KORUNDU** (silinmedi) | Fotoğrafların tek orijinal kopyası orada; `src/assets/isler/*.webp` bunlardan üretilmiş kayıplı türevler. Silinirse farklı kalite/kırpma/format bir daha üretilemez. Build çıktısına girmediği için yayınlanan siteyi büyütmüyor. Gerekçe `assets/README.md`'ye de yazıldı. |

## Yol Haritası

Detaylı görev listesi: **`01-GOREVLER.md`**

| Faz | İçerik | Durum |
|---|---|---|
| 0 | Takip sistemi (`docs/`, `CLAUDE.md`) | ✅ |
| 1 | Astro + Tailwind kurulumu, `site.ts` | ✅ |
| 2 | `_base.css` teması, layout, header/footer | ✅ |
| 3 | Görsel optimizasyonu, `works.ts` | ✅ |
| 4 | Ana sayfa | ✅ |
| 5 | Galeri | ✅ |
| 6 | Hizmet sayfaları | ✅ |
| 7 | Bölge sayfaları | ✅ |
| 8 | Hakkımızda / İletişim / SSS | ✅ |
| 9 | Teknik SEO cilası | ✅ |
| 10 | Doğrulama | ✅ |
| — | **Yayın** (domain + hosting + Google Business Profile) | ⏳ bilgi bekleniyor |

## Ölçülen Sonuçlar (2026-08-05)

| Metrik | Değer |
|---|---|
| Sayfa sayısı | 21 |
| Lighthouse Erişilebilirlik | **100** |
| Lighthouse En İyi Uygulamalar | **100** |
| Lighthouse SEO | **100** |
| LCP (4× CPU + Slow 4G) | **1.38 sn** |
| CLS | **0.00** |
| Client-side JavaScript | **0 KB** |
| İç bağlantı / kırık | 953 / **0** |
| Bölge sayfaları benzerliği | ort. %39 (eşik %65) |

## İlgili Dosyalar

- `01-GOREVLER.md` — kutucuklu iş listesi (nerede kaldık)
- `02-ICERIK.md` — tüm site metinleri
- `03-SEO.md` — anahtar kelime haritası + yayın sonrası aksiyonlar
- `04-BEKLEYEN-BILGI.md` — eksik bilgiler
