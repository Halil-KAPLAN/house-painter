// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// NOT: Alan adı değiştiğinde burayı VE src/config/site.ts → SITE.url alanını güncelle.
// Sitemap, canonical ve Open Graph adresleri buradan üretilir.
const SITE_URL = 'https://boyacibulentusta.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',

  build: {
    // /hizmetler/ic-cephe-boyama.html yerine klasör yapısı → temiz URL
    format: 'directory',
    // CSS'i HTML içine göm: render-blocking istek ortadan kalkar.
    // Ziyaretçilerin çoğu Google'dan tek sayfaya gelip arıyor; ilk açılış hızı
    // sayfalar arası CSS önbelleğinden daha değerli. (~31KB ham, gzip'te ~6KB)
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Ana sayfa ve ana bölge sayfaları daha yüksek öncelikli
        if (item.url === `${SITE_URL}/`) item.priority = 1.0;
        else if (/\/(hizmetler|bolgeler)$/.test(item.url)) item.priority = 0.9;
        else if (/\/bolgeler\/(darica|gebze|cayirova)-boyaci$/.test(item.url)) item.priority = 0.9;
        else if (/\/hizmetler\//.test(item.url)) item.priority = 0.8;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    // Astro'nun görsel servisi sharp kullanır → build sırasında WebP + srcset
    responsiveStyles: true,
    layout: 'constrained',
  },
});
