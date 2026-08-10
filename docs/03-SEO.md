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

0. ⚠️ **ÖNCE BUNU YAPIN — `netlify.toml`'daki `noindex` bloğunu silin.**

   Site şu an `bulent-usta.netlify.app` adresinde bir **ön izleme** olarak duruyor
   ve `netlify.toml` her sayfaya `X-Robots-Tag: noindex, nofollow` gönderiyor.
   Bu bilerek yapıldı: Google ön izlemeyi indekslerse, gerçek site yayına girdiğinde
   kendi sitemizle yinelenen içerik olarak rekabet eder.

   Kendi alan adı bağlandıktan sonra:
   - `netlify.toml` içindeki "YAYIN ÖNCESİ SİLİNECEK BÖLÜM" bloğunu tamamen silin
   - `src/config/site.ts` → `SITE.url` ve `astro.config.mjs` → `site` alanlarını
     gerçek alan adıyla güncelleyin
   - `public/robots.txt` içindeki sitemap adresini güncelleyin
   - Netlify'da alan adını **birincil (primary)** yapın; böylece `.netlify.app`
     adresi otomatik olarak alan adına yönlenir ve iki adres birden indekslenmez
   - Yeniden derleyip yayınlayın, ardından Search Console'dan taratın

   **Bu adım atlanırsa yapılan tüm SEO çalışması boşa gidebilir.**

> **Sıra bilinçli:** Business Profile doğrulaması günler–haftalar sürüyor, o yüzden
> ÖNCE onu başlatın. Search Console 5 dakikalık iş, bekleme süresi yok.

### 1. Google Business Profile — EN ÖNEMLİ ADIM

[business.google.com](https://business.google.com) → **İşletmenizi Google'a ekleyin**

**İşletme bilgileri**
| Alan | Değer (siteyle birebir aynı olmalı) |
|---|---|
| İşletme adı | `Bülent Usta Boya` |
| Birincil kategori | **Boyacı** |
| Ek kategoriler | Ev tadilat hizmeti · Sıvacı |
| Telefon | `+90 537 525 21 20` |
| Web sitesi | `https://boyacibulentusta.com` |
| Adres | `Sırasöğütler Mah. Aydınlar Cad. 1665. Sk. No: 11 Daire 1, 41700 Darıca / Kocaeli` |

**"Müşteriler işletmenize geliyor mu?"** sorusuna **HAYIR** deyin → *hizmet bölgesi
işletmesi* olarak kaydolur. Ardından hizmet bölgelerini girin:
Darıca · Gebze · Çayırova · Tuzla · Pendik · Kartal

Adresi haritada göstermek zorunlu değil (doğrulama için gerekli ama gizlenebilir).
Sitede zaten yayında olduğu için göstermek de sorun değil — karar sizin.

**Doğrulama:** Genelde video doğrulama isteniyor. Hazır olun: boya malzemeleri,
merdiven, mala gibi ekipmanlar + iş yaptığınız yer + kesintisiz tek çekim.
Bu aşama **günler sürebilir**, o yüzden ilk bunu başlatın.

**Onaylandıktan sonra:**
- `assets/` içindeki 11 fotoğrafın **aynısını** buraya da yükleyin
- Hizmetler listesine 7 hizmeti tek tek ekleyin (`SERVICES` dizisindekiler)
- Açıklama alanına sitedeki kısa tanıtımı yazın

### 2. Google Search Console

[search.google.com/search-console](https://search.google.com/search-console)

1. **Add property** → soldaki **Domain** kutusunu seçin (tüm alt alan adlarını ve
   http/https'i birden kapsar) → `boyacibulentusta.com`
2. Google bir **TXT kaydı** verir. Cloudflare → `boyacibulentusta.com` → **DNS** →
   **Records** → **Add record**:
   - Type: `TXT` · Name: `@` · Content: Google'ın verdiği `google-site-verification=...`
   - (TXT kayıtlarında proxy seçeneği yoktur, bulut sorunu olmaz)
3. Cloudflare'de **Save** → Search Console'da **Verify** (1–2 dakika sürebilir)
4. Sol menü **Sitemaps** → `sitemap-index.xml` yazıp **Submit**
5. Üstteki arama kutusuna `https://boyacibulentusta.com/` yazıp **Request indexing**

### 3. Bing Webmaster Tools

[bing.com/webmasters](https://www.bing.com/webmasters) → **Import from Google
Search Console**. 2 dakika, sıfır ek iş. Türkiye'de Bing payı küçük ama bedava.

### 4. NAP tutarlılığı

İsim / Adres / Telefon; site, Business Profile, sosyal medya ve yerel rehberlerde
**harfi harfine aynı** olmalı. "Cad." yerine "Caddesi" yazmak bile tutarsızlık sayılır.

### 5. Gerçek yorum toplayın — en yüksek getirili aksiyon

Business Profile onaylandıktan sonra panelde **"Yorum isteyin"** bölümünden kısa
bağlantıyı alın (`g.page/r/...` biçiminde). Sonra:

- **Zamanlama:** İşi teslim ettiğiniz an, müşteri memnun ve evi tertemiz görmüşken
- **Yöntem:** WhatsApp'tan bağlantıyı gönderin, "iki dakikanızı alır" deyin
- **Hedef:** İlk 5–10 yorum en kritik; sıfırdan üçe çıkmak, on beşten yirmiye
  çıkmaktan çok daha değerli

> ⛔ **Yorum satın almayın, indirim karşılığı yorum istemeyin.** Google'ın politikasına
> aykırı; tespit edilirse profil askıya alınır ve kazanılan sıralama sıfırlanır.
> Bir de sahte yorumlar birbirine benzer, müşteri de anlıyor.

### 6. Yerel rehberler

sahibinden.com hizmet, armut.com, bulurum.com gibi platformlara **aynı NAP** ile kayıt.

### 7. İlk 3 ay: veriye göre düzeltin

Search Console → **Performance** sekmesinde hangi kelimelerden gösterim aldığınızı
izleyin. Beklemediğiniz bir kelimeden trafik geliyorsa o konuda içerik güçlendirilir.
Tahminle değil gerçek arama verisiyle karar verin.

### Sonra siteye eklenecek (yorumlar gelince)

Gerçek yorumlar toplandığında siteye yorumlar bölümü + `aggregateRating` yapısal
verisi eklenebilir. Bunlar **bilerek** eklenmedi — uydurma puan Google spam
politikası ihlali. Detay: `04-BEKLEYEN-BILGI.md` madde 6.
Ayrıca "Google'da bize yorum yapın" butonu eklenebilir (bağlantı gelince).
