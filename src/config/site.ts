/**
 * Sitenin TEK bilgi kaynağı.
 *
 * İsim, telefon, adres, alan adı, hizmet ve bölge listeleri buradan gelir.
 * Hiçbir sayfada bu bilgiler elle yazılmaz — bilgi değişince sadece bu dosya güncellenir
 * ve meta etiketler, schema.org, footer, iletişim sayfası otomatik yansır.
 *
 * Eksik bilgiler için: docs/04-BEKLEYEN-BILGI.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// İşletme kimliği
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  /** TODO(04-BEKLEYEN-BILGI): gerçek alan adı alınınca burayı ve astro.config.mjs'i güncelle */
  url: 'https://bulentboyaci.com',

  /** TODO(04-BEKLEYEN-BILGI): soyadı gelince "Bülent Soyad" olarak güncelle */
  name: 'Bülent Usta',
  legalName: 'Bülent Usta Boya',
  tagline: 'Darıca Boyacı',
  shortDescription:
    'Darıca, Gebze ve Çayırova’da iç cephe boyama, alçı ve saten uygulaması. ' +
    'Eşyalarınıza zarar vermeden, tertemiz teslim.',

  locale: 'tr_TR',
  lang: 'tr',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// İletişim
// ─────────────────────────────────────────────────────────────────────────────

export const CONTACT = {
  /** E.164 formatı — schema.org ve tel: linkleri için */
  phone: '+905375252120',
  /** Ekranda gösterilen okunabilir hâli */
  phoneDisplay: '0537 525 21 20',
  phoneDisplayFull: '+90 537 525 21 20',

  whatsapp: '905375252120',
  whatsappMessage: 'Merhaba, boya işi için fiyat almak istiyorum.',

  /** TODO(04-BEKLEYEN-BILGI): adres gelince doldur; boşken schema'ya eklenmez */
  address: {
    street: '',
    district: 'Darıca',
    city: 'Kocaeli',
    postalCode: '',
    country: 'TR',
  },

  /** TODO(04-BEKLEYEN-BILGI): tam adres gelince koordinat ekle */
  geo: null as { lat: number; lng: number } | null,

  /** TODO(04-BEKLEYEN-BILGI): kesin çalışma saatleri gelince güncelle */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '19:00' },
  ],
  openingHoursDisplay: 'Pazartesi – Cumartesi, 08:00 – 19:00',

  /** TODO(04-BEKLEYEN-BILGI): e-posta gelince doldur */
  email: '',
} as const;

export const phoneHref = `tel:${CONTACT.phone}`;
export const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  CONTACT.whatsappMessage,
)}`;

// ─────────────────────────────────────────────────────────────────────────────
// Hizmetler
// ─────────────────────────────────────────────────────────────────────────────

export type Service = {
  slug: string;
  /** Menü ve kartlarda görünen kısa ad */
  title: string;
  /** Sayfanın h1 başlığı */
  heading: string;
  /** <title> etiketi — 50-60 karakter hedef */
  metaTitle: string;
  /** meta description — 140-160 karakter hedef */
  metaDescription: string;
  /** Kart açıklaması (1-2 cümle) */
  summary: string;
  /** Kart ikonu (inline SVG path adı — Icon.astro içinde tanımlı) */
  icon: string;
  /** Sayfanın giriş paragrafı */
  intro: string;
  /** Sayfa içi bölümler */
  sections: { heading: string; body: string[] }[];
  /** Bu hizmeti anlatan galeri görselleri (works.ts id'leri) */
  workIds: string[];
  /** Öne çıkan hizmet mi (ana sayfada üstte gösterilir) */
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: 'ic-cephe-boyama',
    title: 'İç Cephe Boyama',
    heading: 'İç Cephe Boyama — Darıca, Gebze ve Çayırova',
    metaTitle: 'İç Cephe Boyama Darıca | Ev ve Daire Boyama',
    metaDescription:
      'Darıca, Gebze ve Çayırova’da iç cephe boyama. Alçı, astar ve iki kat boya ile pürüzsüz duvarlar. Eşyalarınız korunur, ev tertemiz teslim edilir.',
    summary:
      'Salon, oda, koridor ve tavan boyası. Yüzey hazırlığından iki kat son kata kadar tam iş.',
    icon: 'roller',
    intro:
      'İç cephe boyama, bir evin görünüşünü en hızlı değiştiren iştir. Ama sonucu belirleyen boyanın kendisi değil, altındaki hazırlıktır. Duvar düzgün değilse en pahalı boya bile ışık aldığında dalgalı görünür.',
    sections: [
      {
        heading: 'Yüzey hazırlığı olmadan boya olmaz',
        body: [
          'Boyaya başlamadan önce duvarın durumuna bakarız. Eski boya kabarmışsa kazınır, çatlaklar ve delikler doldurulur, gerekiyorsa saten alçı çekilir. Bu adımlar atlandığında boya bir iki yıl içinde kabarır ya da çatlağın izi yeniden ortaya çıkar.',
          'Zımpara sonrası çıkan tozu tertemiz alırız. Toz kalan yüzeyde astar tutmaz, boya da astarın üstünde durmaz.',
        ],
      },
      {
        heading: 'Astar şart',
        body: [
          'Dyo Binder astar kullanıyoruz. Astar üç işi birden yapar: boyanın yüzeye tutunmasını sağlar, emiciliği dengeleyerek rengin her yerde eşit çıkmasını sağlar ve boya sarfiyatını ciddi biçimde düşürür.',
        ],
      },
      {
        heading: 'Neden iki kat?',
        body: [
          'Önce tavana iki kat, sonra duvarlara iki kat boya uygularız. Tek kat boya duvarı tam kapatmaz; gündüz ışığında altındaki renk ve izler belli olur. İki kat bizim standardımızdır, bu konuda pazarlık yapmıyoruz.',
        ],
      },
      {
        heading: 'Ne kadar sürer?',
        body: [
          'Sadece boya yapılacaksa 2+1 bir daire genellikle 2–3 günde biter. Alçı ve saten de çekilecekse alçının kuruması gerektiği için süre 5–7 güne çıkar. Keşifte size net gün söyleriz.',
        ],
      },
    ],
    workIds: ['dolu-daire-salon', 'antre-koridor', 'asma-tavan-kartonpiyer'],
    featured: true,
  },
  {
    slug: 'dolu-daire-boyama',
    title: 'Eşyalı Ev Boyama',
    heading: 'Eşyalı Ev Boyama — Taşınmadan, Eşyalarınıza Zarar Vermeden',
    metaTitle: 'Eşyalı Ev Boyama Darıca | Taşınmadan Daire Boyama',
    metaDescription:
      'Eşyalarınızı boşaltmadan ev boyuyoruz. Mobilyalar naylonla örtülür, zemin kapatılır, iş bitince ev süpürülüp teslim edilir. Darıca, Gebze, Çayırova.',
    summary:
      'Evi boşaltmanıza gerek yok. Eşyalar örtülür, zemin kapatılır, iş bitince ortalık süpürülüp teslim edilir.',
    icon: 'shield',
    intro:
      'Çoğu insan “boya yaptıracağım ama eşyaları nereye koyacağım” diye düşünüp işi erteler. Ertelemeye gerek yok. Dolu dairede çalışmak bizim en sık yaptığımız iş ve bunun düzgün bir yöntemi var.',
    sections: [
      {
        heading: 'Önce koruma, sonra boya',
        body: [
          'Eve girer girmez ilk işimiz korumaktır. Eşyaları odanın ortasına toplar, mavi naylonla baştan aşağı örteriz. Süpürgeliklere kâğıt bant çekilir, parkeler ve zemin naylonla kapatılır.',
          'Hiçbir yüzey açıkta kalmadan işe başlamayız. Boya damlası düşmesin diye alınan bu önlemler işin en önemli kısmıdır; boyamak zaten kolay olan taraftır.',
        ],
      },
      {
        heading: 'Oda oda çalışırız',
        body: [
          'Evin tamamını aynı anda kapatmak yerine oda oda ilerleriz. Böylece siz evde kalmaya devam edebilirsiniz — bir oda boyanırken diğerlerini normal şekilde kullanırsınız.',
          'Hangi odadan başlanacağını siz söylersiniz. Genelde en az kullanılan odadan başlayıp yatak odasını en sona bırakmak en rahatı oluyor.',
        ],
      },
      {
        heading: 'Koku ve kuruma',
        body: [
          'Su bazlı iç cephe boyalarında koku genellikle 24 saat içinde geçer. Pencereleri açık tutmak bu süreyi kısaltır. Çocuk odası ve yatak odalarında düşük kokulu boya tercih ediyoruz.',
        ],
      },
      {
        heading: 'Teslim',
        body: [
          'İş bitince naylonlar ve bantlar kaldırılır, ortalık süpürülür, eşyalar yerine konur. Evi geldiğimizden daha temiz teslim ederiz — bizim için işin bittiği an burasıdır.',
        ],
      },
    ],
    workIds: ['dolu-daire-salon', 'esyali-ev-oturma-odasi', 'mutfak-esya-koruma'],
    featured: true,
  },
  {
    slug: 'alci-saten-uygulamasi',
    title: 'Alçı ve Saten',
    heading: 'Alçı ve Saten Uygulaması',
    metaTitle: 'Saten Alçı Uygulaması Darıca | Alçı Sıva Ustası',
    metaDescription:
      'Kaba alçı, karışım alçısı ve saten alçı uygulaması. Pürüzsüz yüzey için doğru katman sırası. Darıca, Gebze, Çayırova ve çevresinde alçı ustası.',
    summary:
      'Kaba alçı, karışım ve saten alçı. Boyanın pürüzsüz durması bu katmanların kalitesine bağlıdır.',
    icon: 'trowel',
    intro:
      'Alçı işi boyanın altında kalır, kimse görmez — ama boyanın nasıl göründüğünü tamamen o belirler. Saten çekilmemiş bir duvara yapılan boya, ışık aldığında dalgalı ve gölgeli durur.',
    sections: [
      {
        heading: 'Katman sırası',
        body: [
          'Kaba sıvanın üzerine önce kaba alçı ve karışım alçısı çekilir. Bu, duvarın kalın dolgu katmanıdır ve yüzeyi kabaca düzler.',
          'Ardından saten alçı gelir. Saten en üstteki ince katmandır; yüzeyi pürüzsüz hâle getiren odur. Alçılama işi bu adımda tamamlanır.',
        ],
      },
      {
        heading: 'Kuruma, zımpara, toz alma',
        body: [
          'Alçı tam kurumadan zımpara yapılmaz. Kuruduktan sonra zımpara atılır ve çıkan toz tertemiz alınır. Bu üç adımın hiçbiri kısaltılamaz; kısaltıldığında sonuç boyada görünür.',
        ],
      },
      {
        heading: 'Yoklama',
        body: [
          'Zımparadan sonra duvarda kalan çatlaklar, delikler ve boşluklar doldurulur — buna yoklama diyoruz. Gözle görülmeyen kusurlar boyadan sonra ortaya çıkar, bu yüzden yoklama atlanmaz.',
          'Tamir yapılan yerlere tekrar zımpara atılır ve yüzey tam düz hâle getirilir. Ancak bundan sonra astara geçeriz.',
        ],
      },
    ],
    workIds: ['saten-alci-uygulamasi', 'isyeri-zemin-koruma', 'mutfak-duvar-yuzey'],
    featured: true,
  },
  {
    slug: 'tavan-kartonpiyer-boyama',
    title: 'Tavan ve Kartonpiyer',
    heading: 'Tavan, Asma Tavan ve Kartonpiyer Boyama',
    metaTitle: 'Tavan ve Kartonpiyer Boyama | Asma Tavan Darıca',
    metaDescription:
      'Tavan, asma tavan ve kartonpiyer boyama. Keskin köşeler, lekesiz beyaz, iki kat uygulama. Darıca, Gebze ve Çayırova’da tavan boyası.',
    summary:
      'Tavan, asma tavan ve kartonpiyer boyası. Keskin köşeler, lekesiz beyaz, iki kat uygulama.',
    icon: 'ceiling',
    intro:
      'Tavan bir odanın en çok göze çarpan ama en çok ihmal edilen yüzeyidir. Sararmış ya da leke izi olan bir tavan, duvarlar yeni boyandığında daha da belli olur.',
    sections: [
      {
        heading: 'Önce tavan, sonra duvar',
        body: [
          'Boyama sırası her zaman tavandan başlar. Tavan boyanırken duvarlara sıçrayan damlalar, sonradan yapılan duvar boyasının altında kalır. Ters sırada çalışıldığında duvarları ikinci kez düzeltmek gerekir.',
          'Tavana iki kat, ardından duvarlara iki kat uygularız.',
        ],
      },
      {
        heading: 'Kartonpiyer ve asma tavan köşeleri',
        body: [
          'Kartonpiyerin duvarla birleştiği köşe, işin en çok ustalık isteyen yeridir. Burada rulo çalışmaz; fırça ile temiz bir kesim gerekir. Keskin ve düz bir çizgi, bütün odanın düzgün görünmesini sağlar.',
          'Asma tavanlarda derz noktaları ayrıca dolgu ve zımpara ister; atlanırsa boyadan sonra derz izleri ortaya çıkar.',
        ],
      },
      {
        heading: 'Leke ve rutubet izleri',
        body: [
          'Su kaçağından kalan sarı lekeler normal boyayla kapanmaz; iki kat atsanız bile zamanla tekrar yüzeye vurur. Bu tür lekelerde önce leke kesici astar uygulanır, ardından boyaya geçilir.',
        ],
      },
    ],
    workIds: ['asma-tavan-kartonpiyer', 'antre-koridor'],
  },
  {
    slug: 'dekoratif-boya',
    title: 'Dekoratif ve Çocuk Odası',
    heading: 'Dekoratif Duvar Boyama ve Çocuk Odası',
    metaTitle: 'Çocuk Odası Duvar Boyama Darıca | Dekoratif Boya',
    metaDescription:
      'Çocuk odası duvar boyama, renkli geometrik desenler ve aksan duvar uygulamaları. Darıca, Gebze ve Çayırova’da dekoratif boya.',
    summary:
      'Çocuk odası desenleri, renkli aksan duvarlar, geometrik geçişler. Bantla keskin, temiz sınırlar.',
    icon: 'palette',
    intro:
      'Bir odayı tek renkle boyamak kolaydır. Zor olan, iki rengin birleştiği yerde çizginin jilet gibi düz çıkmasıdır. Dekoratif işlerde kaliteyi belirleyen tam olarak burasıdır.',
    sections: [
      {
        heading: 'Keskin geçişler',
        body: [
          'Renk geçişlerinde kâğıt bant kullanırız, ama bant tek başına yetmez. Bantın kenarı önce alttaki renkle mühürlenir; böylece üstteki renk bantın altına sızmaz ve kaldırdığınızda çizgi net çıkar.',
          'Ev şekli, üçgen, şerit gibi geometrik desenlerde ölçü ve şakül şart. Gözle çizilen bir desen duvarda eğri durur.',
        ],
      },
      {
        heading: 'Çocuk odasında boya seçimi',
        body: [
          'Çocuk odalarında su bazlı, düşük kokulu ve silinebilir boya tercih ediyoruz. Çocuk odası duvarları en çok kirlenen yüzeylerdir; silinebilir boya birkaç yıl daha uzun ömür verir.',
        ],
      },
      {
        heading: 'Aksan duvar',
        body: [
          'Bütün odayı renkli boyamak yerine tek bir duvarı öne çıkarmak hem daha ferah durur hem daha ekonomiktir. Genelde televizyon veya yatak başı duvarı seçilir.',
        ],
      },
    ],
    workIds: ['cocuk-odasi-dekoratif'],
  },
  {
    slug: 'isyeri-dukkan-boyama',
    title: 'İş Yeri ve Dükkân',
    heading: 'İş Yeri, Dükkân ve Ofis Boyama',
    metaTitle: 'Dükkan ve Ofis Boyama | İş Yeri Boyama Darıca',
    metaDescription:
      'Dükkân, ofis ve mağaza boyama. Mesai dışı ve hafta sonu çalışma imkânıyla işinizi aksatmadan. Darıca, Gebze ve Çayırova.',
    summary:
      'Dükkân, ofis ve mağaza boyama. Mesai dışı çalışabiliriz — işiniz aksamaz.',
    icon: 'store',
    intro:
      'İş yeri boyamasında en büyük mesele boya değil, zamanlamadır. Dükkân kapalı kaldığı her gün kayıptır. Bu yüzden planı işinize göre kurarız.',
    sections: [
      {
        heading: 'Mesai dışı ve hafta sonu',
        body: [
          'Gerektiğinde akşam saatlerinde veya hafta sonu çalışırız. Küçük dükkânlarda iş genelde bir hafta sonuna sığar; Pazartesi sabahı normal açılışınızı yaparsınız.',
        ],
      },
      {
        heading: 'Vitrin, zemin ve ekipman koruması',
        body: [
          'İş yerlerinde korunacak yüzey evden fazladır: vitrin camları, tezgâhlar, elektrik panoları, raflar. Hepsi naylon ve bantla kapatılır. Boya işi bittiğinde temizlik de bize aittir.',
        ],
      },
      {
        heading: 'Büyük hacimli alanlar',
        body: [
          'Geniş mağaza ve ofislerde yüzey alanı büyük olduğu için alçı ve saten aşaması daha uzun sürer. Bu tür işlerde günlük ilerleme planı çıkarır, hangi bölümün ne zaman biteceğini önceden söyleriz.',
        ],
      },
    ],
    workIds: ['dukkan-boyama-hazirlik', 'isyeri-zemin-koruma', 'saten-alci-uygulamasi'],
  },
  {
    slug: 'dis-cephe-boyama',
    title: 'Dış Cephe Boyama',
    heading: 'Dış Cephe Boyama',
    metaTitle: 'Dış Cephe Boyama Darıca, Gebze | Bina Cephe Boyası',
    metaDescription:
      'Bina ve site dış cephe boyama. Yüzey temizliği, çatlak tamiri, dış cephe astarı ve iki kat cephe boyası. Darıca, Gebze ve Çayırova.',
    summary:
      'Bina ve apartman dış cephesi. Yüzey temizliği, çatlak tamiri ve iki kat cephe boyası.',
    icon: 'building',
    intro:
      'Dış cephe boyası iç cephe boyasından farklı bir iştir. Yağmura, güneşe ve dona dayanması gerekir; bu yüzden hem malzeme hem yöntem başkadır.',
    sections: [
      {
        heading: 'Yüzey temizliği',
        body: [
          'Cephede yıllar içinde biriken toz, is ve yosun boyanın tutunmasını engeller. Boyamadan önce yüzey basınçlı su ile temizlenir ve tam kuruması beklenir.',
        ],
      },
      {
        heading: 'Çatlak tamiri',
        body: [
          'Cephedeki çatlaklar su alır; kışın donan su çatlağı büyütür. Bu yüzden boyadan önce çatlaklar açılır, uygun dolgu ile kapatılır. Üstünden boyanan bir çatlak bir sonraki kışa çıkmaz.',
        ],
      },
      {
        heading: 'Hava koşulu ve zamanlama',
        body: [
          'Dış cephe boyası yağmurlu havada, çok sıcakta veya don riski varken yapılmaz. Uygulama için ilkbahar ve sonbahar en verimli dönemlerdir.',
        ],
      },
      {
        heading: 'Apartman yönetimleriyle çalışma',
        body: [
          'Apartman ve site işlerinde yönetime yazılı, kalem kalem fiyat veririz: kaç metrekare, hangi malzeme, kaç kat. Karar toplantıda alınacağı için herkesin anlayabileceği bir teklif önemlidir.',
        ],
      },
    ],
    workIds: [],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

// ─────────────────────────────────────────────────────────────────────────────
// Hizmet bölgeleri
//
// ⚠️ Her bölgenin metni ÖZGÜN olmalı. Aynı metnin ilçe adı değiştirilmiş hâli
// Google'ın "doorway page" tanımına girer ve ceza sebebidir. Detay: docs/03-SEO.md
// ─────────────────────────────────────────────────────────────────────────────

export type Region = {
  slug: string;
  /** İlçe adı */
  name: string;
  city: string;
  /** 'primary' = ana hizmet bölgesi, 'secondary' = Marmaray hattı */
  tier: 'primary' | 'secondary';
  metaTitle: string;
  metaDescription: string;
  /** Sayfanın özgün giriş paragrafları */
  intro: string[];
  /** Bu ilçedeki bina stoğuna özgü teknik anlatım */
  localAngle: { heading: string; body: string[] };
  /** Gerçek mahalle listesi */
  neighbourhoods: string[];
  /** Bu bölgede öne çıkan hizmetler (service slug) */
  highlightServices: string[];
  /** Bu bölge sayfasında gösterilecek iş görselleri (works.ts id) */
  workIds: string[];
};

export const REGIONS: Region[] = [
  {
    slug: 'darica-boyaci',
    name: 'Darıca',
    city: 'Kocaeli',
    tier: 'primary',
    // NOT: Ana sayfa "Darıca Boyacı" kelimesini hedefliyor. Bu sayfa aynı kelimeyi
    // hedeflerse iki sayfa birbiriyle rekabet eder (keyword cannibalization).
    // Bu yüzden burada "boya badana ustası" + mahalle ekseni kullanılıyor.
    metaTitle: 'Darıca Boya Badana Ustası | Mahallelere Hizmet',
    metaDescription:
      'Darıca’da boya badana ustası. Bayramoğlu, Osmangazi, Emek ve tüm mahallelerde iç cephe boyama, alçı-saten ve eşyalı ev boyama. Aynı gün ücretsiz keşif.',
    intro: [
      'Darıca bizim merkezimiz. Burada oturuyor, burada çalışıyoruz — çağırdığınızda aynı gün gelip yerinde bakabiliyoruz.',
      'İlçedeki işlerin çoğu tek daire boyaması: aile büyümüş, ev sararmış, bir yenilemek gerekmiş. Bu işlerde ev genelde doludur ve müşteri taşınmak istemez. Biz de zaten dolu dairede çalışmaya alışkınız.',
    ],
    localAngle: {
      heading: 'Darıca’da bina stoğu ne istiyor?',
      body: [
        'Darıca’nın konut stoğunun önemli bir bölümü yirmi yıl ve üzeri binalardan oluşuyor. Bu binalarda en sık karşılaştığımız şey duvar çatlakları ve pencere kenarlarındaki rutubet izleri.',
        'Bu yüzden Darıca işlerinde yoklama aşamasına ayrı zaman ayırıyoruz: çatlaklar açılıp dolduruluyor, tamir yerlerine tekrar zımpara atılıyor. Üstünden geçilen bir çatlak, boyadan altı ay sonra yeniden ortaya çıkar.',
        'Rutubet izi olan tavanlarda normal boya yetmez; önce leke kesici astar uygulanır. Aksi hâlde sarı leke iki kat boyanın altından bile zamanla yüzeye vurur.',
      ],
    },
    neighbourhoods: [
      'Bayramoğlu', 'Osmangazi', 'Cami', 'Kazım Karabekir', 'Emek', 'Sırasöğütler',
      'Abdi İpekçi', 'Nenehatun', 'Piri Reis', 'Fevzi Çakmak', 'Yalı', 'Bağlarbaşı',
    ],
    highlightServices: ['dolu-daire-boyama', 'ic-cephe-boyama', 'alci-saten-uygulamasi'],
    workIds: ['dolu-daire-salon', 'esyali-ev-oturma-odasi', 'antre-koridor', 'mutfak-boyama-tamamlandi'],
  },
  {
    slug: 'gebze-boyaci',
    name: 'Gebze',
    city: 'Kocaeli',
    tier: 'primary',
    metaTitle: 'Gebze Boyacı | Daire ve Site Boyama — Bülent Usta',
    metaDescription:
      'Gebze’de boya ustası. Yeni daire teslim öncesi alçı, saten ve iki kat boya. İç cephe, dükkân ve ofis boyama. Ücretsiz keşif: 0537 525 21 20.',
    intro: [
      'Gebze, Darıca’dan sonra en yoğun çalıştığımız ilçe. Buradaki işlerin karakteri Darıca’dan belirgin biçimde farklı.',
      'Gebze’de son yıllarda çok sayıda yeni site ve rezidans yapıldı. Bu dairelerin çoğu kaba inşaat hâlinde teslim ediliyor ya da müteahhit boyası ile geliyor — ikisinde de taşınmadan önce ciddi bir alçı ve boya işi gerekiyor.',
    ],
    localAngle: {
      heading: 'Yeni dairede teslim öncesi iş',
      body: [
        'Yeni binalarda duvar genelde kaba sıva hâlindedir. Burada işin ağırlığı boyada değil alçıdadır: kaba alçı, karışım alçısı, ardından saten. Yüzey pürüzsüz hâle gelmeden boyaya geçmenin anlamı yok.',
        'Yeni binalarda ikinci mesele nem. Binanın inşaat nemi tam atmadan yapılan boya kabarır. Teslim yeni alınmışsa duvarın kuruma durumuna bakar, gerekiyorsa beklemenizi öneririz — bir hafta beklemek, bir yıl sonra baştan boyamaktan iyidir.',
        'Ev boş olduğu için Gebze işlerinde genellikle daha hızlı ilerleyebiliyoruz; komple bir daire alçı dâhil 5–7 günde teslim edilebiliyor.',
      ],
    },
    neighbourhoods: [
      'Osmanyılmaz', 'Hacı Halil', 'Mustafapaşa', 'Sultan Orhan', 'Barış', 'Güzeller',
      'Arapçeşme', 'Beylikbağı', 'Tatlıkuyu', 'Mevlana', 'Cumhuriyet', 'Yenikent',
    ],
    highlightServices: ['alci-saten-uygulamasi', 'ic-cephe-boyama', 'isyeri-dukkan-boyama'],
    workIds: ['saten-alci-uygulamasi', 'asma-tavan-kartonpiyer', 'isyeri-zemin-koruma', 'cocuk-odasi-dekoratif'],
  },
  {
    slug: 'cayirova-boyaci',
    name: 'Çayırova',
    city: 'Kocaeli',
    tier: 'primary',
    metaTitle: 'Çayırova Boyacı | Ev, Ofis ve Dükkan Boyama — Bülent Usta',
    metaDescription:
      'Çayırova ve Şekerpınar’da boya ustası. Daire boyama, ofis ve dükkân boyama, alçı-saten uygulaması. Mesai dışı çalışma imkânı: 0537 525 21 20.',
    intro: [
      'Çayırova’ya hem konut hem iş yeri işleri için gidiyoruz. İlçenin iki farklı yüzü var ve ikisi de farklı iş çıkarıyor.',
      'Konut tarafında yeni yapılmış apartmanlar ağırlıkta; Şekerpınar tarafında ise sanayi, ofis ve lojistik tesisleri yoğun.',
    ],
    localAngle: {
      heading: 'Şekerpınar tarafında iş yeri boyaması',
      body: [
        'Şekerpınar ve çevresindeki ofis ve depolarda en büyük mesele, işin çalışma düzenini bozmaması. Bu tür işleri genellikle mesai dışı saatlerde veya hafta sonu yapıyoruz; Pazartesi sabahı normal açılışınızı yapıyorsunuz.',
        'Ofis boyamalarında korunacak yüzey evden fazladır: elektrik panoları, kablo kanalları, cam bölmeler, tezgâhlar. Hepsi naylon ve bantla kapatılıyor.',
        'Konut tarafındaki yeni apartmanlarda ise iş daha çok teslim öncesi alçı-saten ve iki kat boya şeklinde ilerliyor.',
      ],
    },
    neighbourhoods: [
      'Akse', 'Şekerpınar', 'Özgürlük', 'Cumhuriyet', 'Emek', 'Atatürk', 'İnönü', 'Yeni Mahalle',
    ],
    highlightServices: ['isyeri-dukkan-boyama', 'ic-cephe-boyama', 'alci-saten-uygulamasi'],
    workIds: ['dukkan-boyama-hazirlik', 'isyeri-zemin-koruma', 'mutfak-boyama-tamamlandi'],
  },
  {
    slug: 'tuzla-boyaci',
    name: 'Tuzla',
    city: 'İstanbul',
    tier: 'secondary',
    metaTitle: 'Tuzla Boyacı | Ev ve Daire Boyama — Bülent Usta',
    metaDescription:
      'Tuzla’da boya ustası. İç cephe boyama, alçı ve saten, eşyalı ev boyama. Marmaray hattı üzerinden aynı gün keşif. 0537 525 21 20.',
    intro: [
      'Darıca’dan Tuzla’ya Marmaray ile ulaşım kolay olduğu için bu ilçeye düzenli iş alıyoruz.',
      'Tuzla’nın konut yapısı karışık: sahil ve İçmeler tarafında müstakil ev ve villa, iç kesimlerde apartman yoğunluğu var. İkisinin işi birbirinden farklı.',
    ],
    localAngle: {
      heading: 'Deniz kenarında nem ve tuz',
      body: [
        'Sahile yakın binalarda havanın nemi ve tuzu duvarda kendini gösterir. Özellikle kuzeye bakan dış duvarların iç yüzeyinde küf ve kabarma sık görülür.',
        'Bu yüzeylerde doğrudan boyaya geçmiyoruz. Önce kabaran boya kazınıyor, yüzey kurutuluyor, gerekiyorsa nem bariyerli astar uygulanıyor. Nem kaynağı giderilmeden yapılan boya bir kış çıkarmaz.',
        'Villa işlerinde ise iç mekân yüzey alanı büyük olduğu için planlama önemli; hangi bölümün hangi gün biteceğini önceden söylüyoruz.',
      ],
    },
    neighbourhoods: [
      'İçmeler', 'Aydınlı', 'Postane', 'Şifa', 'Mimar Sinan', 'Aydıntepe', 'Orhanlı', 'Cami',
    ],
    highlightServices: ['ic-cephe-boyama', 'dolu-daire-boyama', 'dis-cephe-boyama'],
    workIds: ['antre-koridor', 'mutfak-esya-koruma', 'dolu-daire-salon'],
  },
  {
    slug: 'pendik-boyaci',
    name: 'Pendik',
    city: 'İstanbul',
    tier: 'secondary',
    metaTitle: 'Pendik Boyacı | Daire ve Ev Boyama — Bülent Usta',
    metaDescription:
      'Pendik, Kurtköy ve Kaynarca’da boya ustası. İç cephe boyama, alçı-saten, eşyalı ev boyama. Ücretsiz keşif: 0537 525 21 20.',
    intro: [
      'Pendik’e Marmaray hattı üzerinden geliyoruz. İlçe geniş olduğu için iş de bölgeye göre değişiyor.',
      'Kurtköy ve Kaynarca tarafında yeni yapılmış siteler yoğun; sahil ve merkez tarafında ise daha eski apartman stoğu var.',
    ],
    localAngle: {
      heading: 'Aynı ilçede iki farklı iş',
      body: [
        'Kurtköy ve Kaynarca’daki yeni sitelerde iş genellikle teslim öncesi alçı-saten ve komple daire boyaması oluyor. Ev boş olduğu için hızlı ilerliyoruz.',
        'Merkez ve sahil tarafındaki eski binalarda ise ağırlık yenileme işlerinde: çatlak tamiri, eski boyanın kazınması, tavan lekelerinin kapatılması. Bu işler dolu dairede yapıldığı için koruma aşaması daha uzun sürüyor.',
        'Hangi bölge olursa olsun keşifte önce duvarın durumuna bakıyoruz; alçı gerekip gerekmediği ancak yerinde görülerek söylenebilir.',
      ],
    },
    neighbourhoods: [
      'Kaynarca', 'Velibaba', 'Çamçeşme', 'Esenyalı', 'Güzelyalı', 'Kurtköy',
      'Yenişehir', 'Fevzi Çakmak', 'Batı', 'Doğu',
    ],
    highlightServices: ['ic-cephe-boyama', 'alci-saten-uygulamasi', 'dolu-daire-boyama'],
    workIds: ['esyali-ev-oturma-odasi', 'asma-tavan-kartonpiyer', 'mutfak-duvar-yuzey'],
  },
  {
    slug: 'kartal-boyaci',
    name: 'Kartal',
    city: 'İstanbul',
    tier: 'secondary',
    metaTitle: 'Kartal Boyacı | Ev ve Daire Boyama — Bülent Usta',
    metaDescription:
      'Kartal’da boya ustası. Yeni daire ve yenileme işleri, alçı-saten uygulaması, eşyalı ev boyama. Ücretsiz keşif: 0537 525 21 20.',
    intro: [
      'Kartal, Marmaray hattı üzerinde geldiğimiz en uzak ilçe. Buraya genelde komple daire işleri için çağrılıyoruz.',
      'Son yıllarda kentsel dönüşümle çok sayıda eski bina yenilendi; ilçede hem yeni blok hem eski apartman bir arada.',
    ],
    localAngle: {
      heading: 'Kentsel dönüşüm sonrası yeni bloklar',
      body: [
        'Yenilenen bloklarda daireler çoğunlukla kaba hâlde teslim ediliyor. Buradaki iş baştan alçı: kaba alçı, karışım, saten, sonra astar ve iki kat boya.',
        'Yeni binada dikkat ettiğimiz şey inşaat nemi. Bina yeni bitmişse duvar hâlâ nem atıyor olabilir; bu nemin üzerine yapılan boya birkaç ay içinde kabarır. Keşifte duvarın durumuna bakıp gerekirse beklemenizi öneriyoruz.',
        'Eski apartmanlarda ise iş yenileme ağırlıklı ilerliyor: yoklama, tavan lekesi, kabarmış boyanın kazınması.',
      ],
    },
    neighbourhoods: [
      'Kordonboyu', 'Yakacık', 'Soğanlık', 'Cevizli', 'Orhantepe', 'Esentepe',
      'Uğur Mumcu', 'Atalar', 'Hürriyet', 'Çavuşoğlu',
    ],
    highlightServices: ['alci-saten-uygulamasi', 'ic-cephe-boyama', 'tavan-kartonpiyer-boyama'],
    workIds: ['saten-alci-uygulamasi', 'asma-tavan-kartonpiyer', 'antre-koridor'],
  },
];

export const getRegion = (slug: string) => REGIONS.find((r) => r.slug === slug);
export const PRIMARY_REGIONS = REGIONS.filter((r) => r.tier === 'primary');

/** schema.org areaServed için düz isim listesi */
export const AREA_SERVED = REGIONS.map((r) => r.name);

// ─────────────────────────────────────────────────────────────────────────────
// Çalışma süreci — notes.txt'teki ustanın anlatımından
// ─────────────────────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    title: 'Hazırlık ve koruma',
    body: 'Eşyalar odanın ortasına toplanır, mavi naylonla örtülür. Süpürgeliklere kâğıt bant çekilir, parkeler ve zemin naylonla kapatılır. Her yüzey kapatılmadan işe başlamayız.',
  },
  {
    title: 'Kaba alçı ve karışım alçısı',
    body: 'Kaba sıvanın üzerine kaba alçı ve karışım alçısı çekilir. Duvarın kalın dolgu katmanı burada oluşur.',
  },
  {
    title: 'Saten alçı',
    body: 'Yüzeyin pürüzsüz olması için saten alçı çekilir. Alçılama işi bu adımda tamamlanır; boyanın lekesiz durması bu katmana bağlıdır.',
  },
  {
    title: 'Kuruma, zımpara ve toz alma',
    body: 'Alçı tamamen kuruduktan sonra zımpara yapılır. Zımparadan çıkan toz tertemiz alınır — toz kalırsa astar tutmaz.',
  },
  {
    title: 'Yoklama',
    body: 'Duvardaki çatlaklar, delikler ve boşluklar doldurulur. Gözle görülmeyen kusurlar boyadan sonra ortaya çıkar; bu yüzden yoklama atlanmaz.',
  },
  {
    title: 'Yoklama zımparası',
    body: 'Tamir yapılan yerlere tekrar zımpara atılır, yüzey tam düz hâle getirilir.',
  },
  {
    title: 'Astar',
    body: 'Dyo Binder astar uygulanır. Astar boyanın tutunmasını sağlar, rengin eşit çıkmasına yardım eder ve boya sarfiyatını düşürür.',
  },
  {
    title: 'İki kat boya',
    body: 'Önce tavana iki kat, ardından duvarlara iki kat boya uygulanır. Tek kat asla yeterli olmaz; kapatıcılık ikinci katta oturur.',
  },
  {
    title: 'Toplama ve teslim',
    body: 'Naylonlar ve bantlar kaldırılır, ortalık süpürülür. Evi geldiğimizden daha temiz teslim ederiz.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sıkça sorulan sorular — FAQPage şeması için de kullanılır
// ─────────────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    q: 'Evimde eşyalar varken boya yapılabilir mi?',
    a: 'Evet, en sık yaptığımız iş bu. Eşyaları odanın ortasına toplar, mavi naylonla örteriz. Süpürgeliklere kâğıt bant çeker, zemini naylonla kapatırız. İş bitince naylonları kaldırır, ortalığı süpürüp teslim ederiz. Eşyalarınızı boşaltmanıza gerek yok.',
  },
  {
    q: 'Boya işi kaç gün sürer?',
    a: 'Dairenin büyüklüğüne ve alçı gerekip gerekmediğine bağlı. Sadece boya yapılacaksa 2+1 bir daire genelde 2–3 gün sürer. Alçı ve saten de çekilecekse alçının kuruması gerektiği için süre 5–7 güne çıkar. Keşifte size net gün söyleriz.',
  },
  {
    q: 'Keşif ücretli mi?',
    a: 'Hayır. Gelir, yerinde ölçer, ne yapılması gerektiğini anlatır ve net fiyat veririz. Keşif için ücret almıyoruz.',
  },
  {
    q: 'Neden iki kat boya yapıyorsunuz?',
    a: 'Tek kat boya duvarı tam kapatmaz; ışık aldığında altındaki renk ve izler belli olur. Tavana iki kat, duvara iki kat uygulamak bizim standardımız — bu konuda pazarlık yapmıyoruz.',
  },
  {
    q: 'Astar şart mı?',
    a: 'Şart. Astar boyanın yüzeye tutunmasını sağlar, sarfiyatı düşürür ve rengin eşit çıkmasını sağlar. Dyo Binder astar kullanıyoruz. Astarsız yapılan iş bir iki yıl içinde kabarır.',
  },
  {
    q: 'Boya kokusu ne kadar sürede geçer?',
    a: 'Su bazlı iç cephe boyalarında koku genelde 24 saat içinde geçer. Pencereleri açık tutmak süreyi kısaltır. Çocuk odası ve yatak odalarında düşük kokulu boya tercih ediyoruz.',
  },
  {
    q: 'Alçı ve saten farkı nedir?',
    a: 'Kaba alçı ve karışım alçısı duvarın kalın dolgu katmanıdır, yüzeyi düzler. Saten alçı ise en üstteki ince katmandır ve yüzeyi pürüzsüz hâle getirir. Saten çekilmeden yapılan boya ışıkta dalgalı görünür.',
  },
  {
    q: 'Hangi bölgelere geliyorsunuz?',
    a: 'Merkezimiz Darıca. Gebze ve Çayırova’da yoğun çalışıyoruz. Marmaray hattı boyunca Tuzla, Pendik ve Kartal’a da geliyoruz. Emin değilseniz arayın, konuşalım.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Ana menü
// ─────────────────────────────────────────────────────────────────────────────

export const NAV = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/yaptigimiz-isler', label: 'Yaptığımız İşler' },
  { href: '/bolgeler', label: 'Bölgeler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/sikca-sorulan-sorular', label: 'S.S.S.' },
  { href: '/iletisim', label: 'İletişim' },
] as const;
