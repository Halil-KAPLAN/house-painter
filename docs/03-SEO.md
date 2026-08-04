# 03 — SEO Stratejisi

## Gerçekçi Beklenti (önce bunu okuyun)

Hiçbir teknik çalışma Google'da 1. sırayı **garanti edemez**. "Darıca boyacı" gibi yerel
aramalarda sıralamayı belirleyen üç şey vardır ve site bunlardan sadece biridir:

1. **Google Business Profile (Google Haritalar kaydı)** — yerel aramada **en belirleyici
   faktör.** Harita kutusu organik sonuçların üstünde çıkar. Site açılır açılmaz bu kayıt
   yapılmalı.
2. **Gerçek müşteri yorumları** — hem harita sıralamasını hem tıklama oranını belirler.
3. **Site** — teknik kalite, içerik derinliği, mobil hız. Bizim kontrolümüzdeki kısım.

Bu doküman 3. maddeyi mükemmele yakın yapar; 1 ve 2 için yayın sonrası aksiyon listesi
en altta.

---

## Anahtar Kelime → Sayfa Haritası

Her sayfa **tek bir ana** anahtar kelimeyi hedefler. İki sayfa aynı kelimeyi hedeflerse
birbirleriyle rekabet eder (keyword cannibalization) ve ikisi de düşer.

| Sayfa | Ana anahtar kelime | Destekleyici kelimeler |
|---|---|---|
| `/` | darıca boyacı | boya ustası darıca, darıca boya badana |
| `/hizmetler/ic-cephe-boyama` | iç cephe boyama darıca | ev boyama, daire boyama, oda boyama |
| `/hizmetler/alci-saten-uygulamasi` | saten alçı darıca | alçı sıva ustası, kaba alçı, alçı badana |
| `/hizmetler/dolu-daire-boyama` ⭐ | eşyalı ev boyama | taşınmadan ev boyatma, dolu daire boyama |
| `/hizmetler/dekoratif-boya` | çocuk odası duvar boyama | dekoratif boya, aksan duvar |
| `/hizmetler/isyeri-dukkan-boyama` | dükkan boyama gebze | ofis boyama, mağaza boyama |
| `/hizmetler/dis-cephe-boyama` | dış cephe boyama darıca | bina cephe boyası, apartman boyama |
| `/hizmetler/tavan-kartonpiyer-boyama` | tavan boyama | kartonpiyer boyama, asma tavan boyası |
| `/bolgeler/darica-boyaci` | darıca boyacı | darıca boya ustası, darıca badanacı |
| `/bolgeler/gebze-boyaci` | gebze boyacı | gebze boya ustası |
| `/bolgeler/cayirova-boyaci` | çayırova boyacı | şekerpınar boyacı |
| `/bolgeler/tuzla-boyaci` | tuzla boyacı | — |
| `/bolgeler/pendik-boyaci` | pendik boyacı | kurtköy boyacı, kaynarca boyacı |
| `/bolgeler/kartal-boyaci` | kartal boyacı | — |
| `/yaptigimiz-isler` | boyacı referans | boya öncesi sonrası |
| `/sikca-sorulan-sorular` | ev boyama kaç gün sürer | boya fiyatları, boya kaç kat |

### Long-tail fırsatı
`/hizmetler/dolu-daire-boyama` sayfası projenin en değerli varlığı. "Eşyalı ev boyama",
"taşınmadan ev boyatma" aramalarında rekabet düşük, niyet çok yüksek (bu aramayı yapan
kişi zaten boyatmaya karar vermiş). Ustanın bu konudaki anlatımı da çok detaylı — hem
özgün içerik hem gerçek uzmanlık.

---

## Teknik SEO Kontrol Listesi

### Her sayfada
- [ ] `<html lang="tr">`
- [ ] Benzersiz `<title>` — 50–60 karakter, ana kelime başta, marka sonda
- [ ] Benzersiz `<meta name="description">` — 140–160 karakter, çağrı içeren
- [ ] `<link rel="canonical">` — mutlak URL
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale=tr_TR`
- [ ] Twitter Card: `summary_large_image`
- [ ] **Tek `<h1>`**, altında hiyerarşik `h2`/`h3`
- [ ] Breadcrumb (görsel + `BreadcrumbList` şeması) — ana sayfa hariç

### Site geneli
- [ ] `sitemap-index.xml` (@astrojs/sitemap)
- [ ] `robots.txt` — sitemap adresini içerir
- [ ] 404 sayfası (yardımcı linklerle)
- [ ] İç linkleme: her hizmet sayfası ilgili bölge sayfalarına, her bölge sayfası ilgili
      hizmetlere link verir
- [ ] URL'ler Türkçe, kısa, tire ayraçlı, küçük harf, Türkçe karakter yok (`darica`, `alci`)

### Performans (Core Web Vitals)
- [ ] Sıfır client-side JavaScript (Astro varsayılanı)
- [ ] Tek self-hosted variable font, `preload` + `font-display: swap`
- [ ] Hero görseli: `loading="eager"` + `fetchpriority="high"`
- [ ] Diğer görseller: `loading="lazy"` + `decoding="async"`
- [ ] Tüm görsellerde `width`/`height` (CLS = 0)
- [ ] WebP + responsive `srcset`
- [ ] Kritik CSS inline (Astro otomatik yapar)

### Mobil
- [ ] `viewport` meta
- [ ] Mobilde sabit alt bar: [Ara] [WhatsApp]
- [ ] Dokunma hedefleri ≥ 44×44px
- [ ] Yatay kaydırma yok (375px'te test)
- [ ] `tel:` ve `https://wa.me/` linkleri

---

## Yapısal Veri (JSON-LD)

### `HousePainter` — her sayfada (footer'da)
schema.org hiyerarşisi: `LocalBusiness` › `HomeAndConstructionBusiness` › `HousePainter`.
Genel `LocalBusiness` yerine bunu kullanmak Google'a mesleği net bildirir.

```
@type: HousePainter
name, image, logo, url, telephone
address (PostalAddress)      ← adres gelince
geo (GeoCoordinates)         ← adres gelince
areaServed: [Darıca, Gebze, Çayırova, Tuzla, Pendik, Kartal]
openingHoursSpecification    ← saatler gelince
priceRange: "₺₺"
hasOfferCatalog: 7 hizmet
```

### Sayfa tipine göre ek şemalar
| Sayfa | Şema |
|---|---|
| Hizmet sayfaları | `Service` (+ `areaServed`, `provider`) |
| SSS | `FAQPage` |
| Galeri | `ImageObject` |
| Tüm alt sayfalar | `BreadcrumbList` |
| Ana sayfa | `WebSite` |

### ⛔ Eklenmeyecek
`aggregateRating` ve `Review` — **gerçek müşteri yorumu olmadan eklenmeyecek.**
Uydurma puan işaretlemesi Google'ın yapısal veri spam politikasını ihlal eder; tespit
edilirse sitenin *tüm* zengin sonuçları kapatılır. Ayrıca ziyaretçiyi yanıltır.
Gerçek yorum toplandığında eklenir → `04-BEKLEYEN-BILGI.md`.

---

## Doorway Page Uyarısı (bölge sayfaları)

6 bölge sayfası yazılacak. **Aynı metnin ilçe adı değiştirilmiş hâli Google'ın "doorway
page" tanımına girer ve manuel işlem (ceza) sebebidir.**

Her bölge sayfasında zorunlu olarak farklı olacaklar:
- O ilçenin gerçek mahalle listesi
- O ilçedeki bina stoğuna özgü teknik not (Darıca'da eski bina → yoklama/çatlak;
  Gebze'de yeni site → alçı+saten; Çayırova Şekerpınar → iş yeri)
- Farklı iş örneği fotoğrafları
- Farklı giriş paragrafı ve farklı SSS vurgusu

Şablon (layout) paylaşılabilir; **metin paylaşılamaz.**

---

## Yayın Sonrası Aksiyonlar

> Bunlar kodla yapılamaz ama sıralama için koddan daha önemlidir.

1. **Google Business Profile açın** — google.com/business
   - Kategori: "Boyacı" (birincil), "Ev tadilat hizmeti" (ikincil)
   - Hizmet bölgesi işletmesi olarak kaydolun (adres göstermek zorunda değilsiniz)
   - Aynı 11 fotoğrafı buraya da yükleyin
   - Telefonu siteyle **birebir aynı** yazın
2. **Google Search Console** — mülk doğrulayın, `sitemap-index.xml` gönderin
3. **Bing Webmaster Tools** — Search Console'dan içe aktarma ile 2 dakika
4. **NAP tutarlılığı** — İsim/Adres/Telefon; site, Google Business, sosyal medya ve
   yerel rehberlerde **harfi harfine aynı** olmalı. Tutarsızlık yerel SEO'yu düşürür.
5. **Gerçek yorum toplayın** — işi teslim ederken müşteriye Google yorum linkini
   gönderin. Yerel sıralamada en yüksek getirili tek aksiyon budur.
6. **Yerel rehberler** — sahibinden hizmet, armut.com, bulurum.com gibi platformlara
   aynı NAP ile kayıt
7. İlk 3 ay Search Console'da hangi kelimelerden gösterim aldığını izleyin, içeriği
   gerçek arama verisine göre güncelleyin.
