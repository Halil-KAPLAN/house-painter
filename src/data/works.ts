/**
 * Galeri verisi — "Yaptığımız İşler".
 *
 * Görseller `import` edildiği için Astro build sırasında bunlardan responsive
 * srcset üretir (400/800/1600w) ve hash'li dosya adıyla yayınlar.
 *
 * `alt` metinleri sadece erişilebilirlik için değil, Google Görseller sıralaması
 * için de sinyaldir — her biri ne yapıldığını ve nerede yapıldığını anlatır.
 */

import type { ImageMetadata } from 'astro';

import doluDaireSalon from '@assets/isler/dolu-daire-salon-boyama.webp';
import esyaliEvOturmaOdasi from '@assets/isler/esyali-ev-oturma-odasi-boyama.webp';
import mutfakDuvarYuzey from '@assets/isler/mutfak-duvar-yuzey-hazirlik.webp';
import satenAlciUygulamasi from '@assets/isler/saten-alci-uygulamasi.webp';
import asmaTavanKartonpiyer from '@assets/isler/asma-tavan-kartonpiyer-boyama.webp';
import dukkanBoyamaHazirlik from '@assets/isler/dukkan-boyama-hazirlik.webp';
import isyeriZeminKoruma from '@assets/isler/isyeri-boyama-zemin-koruma.webp';
import cocukOdasiDekoratif from '@assets/isler/cocuk-odasi-dekoratif-boyama.webp';
import antreKoridor from '@assets/isler/antre-koridor-boyama.webp';
import mutfakTamamlandi from '@assets/isler/mutfak-boyama-tamamlandi.webp';
import mutfakEsyaKoruma from '@assets/isler/mutfak-boyama-esya-koruma.webp';

export const CATEGORIES = [
  { slug: 'tumu', label: 'Tümü' },
  { slug: 'konut', label: 'Konut' },
  { slug: 'isyeri', label: 'İş Yeri' },
  { slug: 'alci-saten', label: 'Alçı & Saten' },
  { slug: 'dekoratif', label: 'Dekoratif' },
] as const;

export type CategorySlug = Exclude<(typeof CATEGORIES)[number]['slug'], 'tumu'>;

export type Work = {
  /** site.ts içindeki workIds referansları bu id'yi kullanır */
  id: string;
  image: ImageMetadata;
  /** Galeri kartı başlığı */
  title: string;
  /** Kartın altındaki kısa açıklama */
  caption: string;
  /** Görsel alt metni — açıklayıcı ve konum bilgisi içerir */
  alt: string;
  category: CategorySlug;
  /** İşin hangi aşamasını gösterdiği */
  stage: 'hazirlik' | 'uygulama' | 'tamamlandi';
};

export const WORKS: Work[] = [
  {
    id: 'dolu-daire-salon',
    image: doluDaireSalon,
    title: 'Eşyalı dairede salon ve koridor boyası',
    caption:
      'Ev boşaltılmadan yapılan iç cephe boyaması. Eşyalar ortaya alınıp örtüldü, iş bitiminde ortalık süpürülüp teslim edildi.',
    alt: 'Eşyalı dairede tamamlanmış salon ve koridor boyası, beyaz duvarlar ve temiz süpürgelikler',
    category: 'konut',
    stage: 'tamamlandi',
  },
  {
    id: 'esyali-ev-oturma-odasi',
    image: esyaliEvOturmaOdasi,
    title: 'Oturma odası boyası — eşyalar korunarak',
    caption:
      'Kitaplık, masa ve koltuklar yerinde dururken tamamlanan oturma odası boyaması.',
    alt: 'Eşyalı oturma odasında tamamlanmış duvar ve tavan boyası, mobilyalar yerinde',
    category: 'konut',
    stage: 'tamamlandi',
  },
  {
    id: 'antre-koridor',
    image: antreKoridor,
    title: 'Antre ve koridor boyası',
    caption:
      'Dar koridorda iki kat boya. Kapı kasası ve süpürgelik hattı bantlanarak keskin kesim alındı.',
    alt: 'Beyaz boyanmış antre ve koridor, ahşap giriş kapısı ve temiz kesim yapılmış kapı kasası',
    category: 'konut',
    stage: 'tamamlandi',
  },
  {
    id: 'mutfak-boyama-tamamlandi',
    image: mutfakTamamlandi,
    title: 'Mutfak boyası — tamamlandı',
    caption:
      'Dolapların ve tavan kartonpiyerinin çevresinden temiz kesim alınarak bitirilen mutfak boyaması.',
    alt: 'Tamamlanmış mutfak boyası, beyaz dolaplar ve kartonpiyer çevresinde düzgün kesim',
    category: 'konut',
    stage: 'tamamlandi',
  },
  {
    id: 'mutfak-esya-koruma',
    image: mutfakEsyaKoruma,
    title: 'Mutfakta eşya koruması',
    caption:
      'Tezgâh, dolaplar ve beyaz eşya naylonla kapatıldıktan sonra boyaya başlanıyor.',
    alt: 'Boyama öncesi mutfakta tezgâh ve dolapların naylonla örtülerek korunması',
    category: 'konut',
    stage: 'hazirlik',
  },
  {
    id: 'mutfak-duvar-yuzey',
    image: mutfakDuvarYuzey,
    title: 'Boya öncesi yüzey durumu',
    caption:
      'Mutfak duvarında eski boyanın kabardığı bölge. Bu tür yüzeyler kazınıp yoklama yapılmadan boyanmaz.',
    alt: 'Mutfak duvarında boya öncesi tespit edilen kabarma ve yüzey bozukluğu',
    category: 'alci-saten',
    stage: 'hazirlik',
  },
  {
    id: 'saten-alci-uygulamasi',
    image: satenAlciUygulamasi,
    title: 'Saten alçı uygulaması',
    caption:
      'İş yerinde mala ile saten alçı çekimi. Yüzeyin pürüzsüz olması bu katmana bağlı.',
    alt: 'Usta mala ile duvara saten alçı çekerken, iş yeri boyama hazırlığı',
    category: 'alci-saten',
    stage: 'uygulama',
  },
  {
    id: 'asma-tavan-kartonpiyer',
    image: asmaTavanKartonpiyer,
    title: 'Asma tavan ve kartonpiyer boyası',
    caption:
      'Gizli ışık bandı ve kartonpiyer köşelerinde fırça ile keskin kesim, ardından iki kat boya.',
    alt: 'Boyanmış asma tavan ve kartonpiyer detayı, gizli ışık bandı köşesinde keskin kesim',
    category: 'konut',
    stage: 'tamamlandi',
  },
  {
    id: 'dukkan-boyama-hazirlik',
    image: dukkanBoyamaHazirlik,
    title: 'Dükkân boyamasında hazırlık',
    caption:
      'Vitrin önü ve zemin kapatıldı, malzemeler yerleştirildi. İş yerlerinde koruma evden daha kapsamlı olur.',
    alt: 'Dükkân boyaması öncesi zemin koruması, merdiven ve boya malzemeleri',
    category: 'isyeri',
    stage: 'hazirlik',
  },
  {
    id: 'isyeri-zemin-koruma',
    image: isyeriZeminKoruma,
    title: 'İş yerinde zemin koruması',
    caption:
      'Geniş hacimli iş yerinde tüm zemin örtüldükten sonra alçı ve boya aşamasına geçildi.',
    alt: 'İş yeri boyamasında tamamen örtülmüş zemin, alçı ve boya öncesi hazırlık',
    category: 'isyeri',
    stage: 'hazirlik',
  },
  {
    id: 'cocuk-odasi-dekoratif',
    image: cocukOdasiDekoratif,
    title: 'Çocuk odası dekoratif duvar boyası',
    caption:
      'Ev şeklinde yeşil ve mavi renk blokları, tavanda güneş ve bulut figürleri. Renk geçişleri bantla mühürlenerek keskin alındı.',
    alt: 'Çocuk odasında ev şeklinde yeşil ve mavi dekoratif duvar boyası, tavanda güneş ve bulut figürleri',
    category: 'dekoratif',
    stage: 'tamamlandi',
  },
];

export const getWork = (id: string) => WORKS.find((w) => w.id === id);
export const getWorks = (ids: string[]) =>
  ids.map(getWork).filter((w): w is Work => w !== undefined);
