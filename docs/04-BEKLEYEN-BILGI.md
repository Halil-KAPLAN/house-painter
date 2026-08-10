# 04 — Bekleyen Bilgiler

> Bu bilgiler henüz elimizde yok. Site **placeholder** değerlerle çalışıyor; bilgi
> geldiğinde çoğu için tek dosya (`src/config/site.ts`) güncellenir ve tüm siteye
> (meta etiketler, schema.org, footer, iletişim sayfası) otomatik yansır.

---

## 🔴 Kritik — yayından önce mutlaka

### 1. Soyadı
- **Şu anki placeholder:** `Bülent Usta` (soyadı yok)
- **Nereye yansır:** Site adı, logo, `<title>` sonekleri, schema `name`, footer, OG etiketleri
- **Güncellenecek yer:** `src/config/site.ts` → `owner.fullName`, `brand.name`

### 2. ✅ Adres — GELDİ (2026-08-09)
- **Değer:** Sırasöğütler Mah. Aydınlar Cad. 1665. Sk. No: 11 Daire 1, 41700 Darıca / Kocaeli
- **Koordinat:** 40.7882631, 29.387068 — harita iğnesi yazılı adresle **aynı binayı**
  gösteriyor (ilk verilen No: 8 bilgisi 2026-08-09'da No: 11 olarak düzeltildi)
- **Nereye yansıdı:** `HousePainter` schema `address` + `geo` + `hasMap`,
  iletişim sayfası (gömülü harita + yol tarifi butonu), footer
- **Kaynak:** `src/config/site.ts` → `CONTACT.address`, `CONTACT.geo`, `CONTACT.maps`
- ⚠️ **NAP kuralı:** Bu adres Google Business Profile ve tüm rehberlerde **harfi
  harfine aynı** yazılmalı; farklı yazım yerel sıralamayı düşürür.

### 3. Alan adı (domain)
- **Şu anki placeholder:** `https://bulentboyaci.com` (varsayım)
- **Nereye yansır:** `astro.config.mjs` `site`, canonical, sitemap, OG `url`, robots.txt
- **Güncellenecek yer:** `src/config/site.ts` → `url` **ve** `astro.config.mjs` → `site`
- **Öneri:** İçinde bölge veya meslek geçen kısa bir ad — `bulentboyaci.com`,
  `daricaboyaci.com`, `bulentustaboya.com`. `.com` tercih edilmeli.

---

## 🟡 Önemli — sayfa kalitesini yükseltir

### 4. Çalışma saatleri
- **Nereye yansır:** schema `openingHoursSpecification`, iletişim sayfası
- Örn. "Pazartesi–Cumartesi 08:00–19:00, Pazar kapalı"

### 5. Kaç yıllık tecrübe
- **Nereye yansır:** Hero alt metni, hakkımızda sayfası — güven veren en güçlü ifade
- ⚠️ Uydurulmayacak. Bilgi gelmezse bu ifade siteye hiç girmez.

### 6. Gerçek müşteri yorumları
- **Nereye yansır:** Yorumlar bölümü + schema `aggregateRating`/`Review`
- ⚠️ **Uydurma yorum veya puan kesinlikle eklenmeyecek.** Google spam politikası ihlali
  olur ve sitenin tüm zengin sonuçları kapatılır. Gerçek yorum toplanana kadar bu bölüm
  siteye eklenmiyor.
- **Nasıl toplanır:** İş teslim edilirken müşteriye Google yorum linki gönderilir.

---

## 🟢 Opsiyonel

### 7. E-posta adresi
- İletişim sayfası ve schema `email`

### 8. Logo
- Şu an metin tabanlı bir marka işareti kullanılıyor. Gerçek logo gelirse
  `public/logo.svg` olarak eklenir, schema `logo` alanına bağlanır.

### 9. Sosyal medya hesapları
- Instagram / Facebook varsa schema `sameAs` dizisine eklenir — Google'a marka
  doğrulaması sağlar.

### 10. Ek iş fotoğrafları
- Şu an 11 fotoğraf var. Özellikle **öncesi–sonrası çiftleri** çok değerli olur;
  hem ziyaretçiyi ikna eder hem galeriye ayrı bir bölüm açar.

---

## ✅ Elimizde Olanlar

| Bilgi | Değer | Kaynak |
|---|---|---|
| Ad | Bülent | kullanıcı |
| Telefon | +90 537 525 21 20 | ustanın anlatımı (`02-ICERIK.md` EK) |
| Meslek | Boya ustası, alçı-saten uygulaması | ustanın anlatımı (`02-ICERIK.md` EK) |
| Ana bölge | Darıca, Gebze, Çayırova | kullanıcı |
| İkincil bölge | Tuzla, Pendik, Kartal (Marmaray hattı) | kullanıcı |
| İş anlatımı | 9 adımlık süreç | ustanın anlatımı (`02-ICERIK.md` EK) |
| Fotoğraflar | 11 adet | `assets/` |
| Git deposu | `https://github.com/Halil-KAPLAN/house-painter.git` | kullanıcı |

---

## Bilgi Geldiğinde Yapılacaklar

1. `src/config/site.ts` içindeki ilgili alanı doldur
2. Domain değiştiyse `astro.config.mjs` → `site` alanını da güncelle
3. `npm run build` çalıştır, `dist/` içinde canonical ve schema'ları kontrol et
4. Bu dosyada ilgili maddeyi ✅ olarak işaretle
5. `docs/01-GOREVLER.md` ilgili kutucuğu işaretle
