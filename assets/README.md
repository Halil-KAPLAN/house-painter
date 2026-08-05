# assets/ — Orijinal Fotoğraflar (SİLMEYİN)

Bu klasördeki JPEG dosyaları, Bülent Usta'nın gönderdiği fotoğrafların **tek
orijinal kopyasıdır**. Başka hiçbir yerde yedeği yoktur.

## Neden duruyor?

Sitede kullanılan `src/assets/isler/*.webp` dosyaları bunlardan **üretilmiş
kayıplı kopyalardır**: en uzun kenar 1600px'e düşürülmüş, kalite 82 WebP.

Orijinaller silinirse şunlar bir daha yapılamaz:

- Optimizasyon ayarını değiştirip (daha yüksek kalite, farklı boyut) yeniden üretmek
- Farklı bir kırpma almak (örn. hero için yatay kesit)
- İleride WebP'den daha iyi bir format çıkarsa (AVIF vb.) ona geçmek
- Baskı/afiş gibi yüksek çözünürlük gerektiren bir iş yapmak

## Yayınlanan siteyi büyütür mü?

**Hayır.** Bu klasör `public/` veya `src/` içinde değil; Astro build çıktısına
(`dist/`) hiç girmez. Ziyaretçiler bu dosyaları indirmez. Tek maliyeti git
deposunda ~1.2 MB yer kaplamasıdır.

## Yeni fotoğraf eklerken

1. Orijinali bu klasöre koyun
2. `scripts/prepare-images.mjs` içindeki `RENAME_MAP`'e anlamlı bir ad ekleyin
3. `npm run images` çalıştırın → `src/assets/isler/` altında WebP üretilir
4. `src/data/works.ts` içine görseli, başlığını ve `alt` metnini ekleyin
