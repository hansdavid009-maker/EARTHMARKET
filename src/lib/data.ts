import { Product, DictionaryWord, ExchangeTransaction, Order } from '@/types';

export const INITIAL_EXCHANGE_RATE = 2325; // 1 CNY = 2325 IDR
export const DEFAULT_EXCHANGE_FEE_IDR = 10000;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'china-universal-travel-adapter',
    name: 'Universal Travel Adapter China Type A/I (Fast Charge 65W GaN)',
    nameZh: '中国标准多功能转换插头',
    category: 'Travel',
    priceIdr: 125000,
    priceCny: 54,
    rating: 4.8,
    reviewsCount: 128,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'Adapter serbaguna kompatibel dengan stopkontak standar China (Colokan Type A/I 3-pin miring & 2-pin pipih). Dilengkapi 2 port USB-C GaN 65W dan 2 USB-A untuk charge laptop, smartphone, dan powerbank sekaligus tanpa adaptor tambahan.',
    features: [
      'Kompatibel stopkontak seluruh daratan China, Hong Kong & Makau',
      'Proteksi lonjakan arus (Surge Protection 1000 Joules)',
      'Dual Port USB-C Power Delivery 65W GaN Technology',
      'Material tahan api polikarbonat bersertifikat CCC'
    ],
    specs: {
      'Tegangan': '100V - 250V AC',
      'Maksimal Daya': '2500W Max',
      'Berat': '145 gram',
      'Garansi': '1 Tahun'
    }
  },
  {
    id: 'prod-2',
    slug: 'china-travel-esim-unlimited-vpn',
    name: 'China Unlimited eSIM Data 10 Days (Built-in VPN No Block Google/WA)',
    nameZh: '中国大陆高速免翻墙数据流量卡',
    category: 'Gadget',
    priceIdr: 210000,
    priceCny: 90,
    rating: 4.9,
    reviewsCount: 312,
    stock: 999,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    description: 'eSIM resmi roaming high-speed China Unicom & China Mobile. Otomatis bypass Great Firewall tanpa perlu aplikasi VPN tambahan. Langsung aktif untuk WhatsApp, Instagram, Google Maps, dan Gmail.',
    features: [
      'Bypass Great Firewall (Akses lancar WA, IG, Youtube, Google)',
      'Jaringan 5G/4G LTE China Unicom & China Mobile',
      'QR Code dikirim instan via email',
      'Masa aktif 10 Hari kuota unthrottled'
    ],
    specs: {
      'Jaringan': '5G / 4G LTE Roaming',
      'Cakupan': 'Mainland China, Hong Kong, Macau',
      'Aktivasi': 'Instan via QR Code',
      'Masa Berlaku': '10 Hari sejak aktivasi'
    }
  },
  {
    id: 'prod-3',
    slug: 'ai-smart-voice-translator-two-way',
    name: 'Smart AI Voice Translator Device IDR-Mandarin Offline & Online',
    nameZh: '双向智能AI同声翻译器',
    category: 'Gadget',
    priceIdr: 750000,
    priceCny: 323,
    rating: 4.7,
    reviewsCount: 89,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    description: 'Alat penerjemah suara cerdas saku dua arah (Indonesia ↔ Mandarin) dengan akurasi 98%. Mendukung penerjemahan suara real-time, kamera penerjemah teks menu restoran/rambu jalan offline.',
    features: [
      'Terjemahan 2 arah instan respon 0.2 detik',
      'Mode offline tanpa internet untuk 16 bahasa utama',
      'Kamera OCR 8MP untuk membaca menu dan plang jalan Hanzi',
      'Layar sentuh IPS 3.0 inch jernih'
    ],
    specs: {
      'Baterai': '1500mAh (Standby 7 hari)',
      'Bahasa': '138 Bahasa Online, 16 Offline',
      'Kamera': '8 Megapixel autofocus',
      'Konektivitas': 'WiFi & Hotspot'
    }
  },
  {
    id: 'prod-4',
    slug: 'premium-cabin-travel-backpack-waterproof',
    name: 'RedMandarin Cabin Pro Travel Backpack 35L Anti-Theft Waterproof',
    nameZh: '商务旅行多功能防盗背包',
    category: 'Travel',
    priceIdr: 395000,
    priceCny: 170,
    rating: 4.8,
    reviewsCount: 76,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Tas ransel kabin dirancang khusus untuk mobilitas tinggi di bandara dan stasiun kereta cepat (CRH) China. Kapasitas 35L setara koper mini 20 inch, tahan air dan resleting tersembunyi anti maling.',
    features: [
      'Ukuran kabin pesawat (Flight approved 35L)',
      'Kompartemen terpisah laptop hingga 17 inch dengan bantalan empuk',
      'Bahan Oxford Fabric water-repellent tahan hujan',
      'Tali pengait koper (luggage strap) dan port charging USB eksternal'
    ],
    specs: {
      'Dimensi': '48 x 32 x 20 cm',
      'Kapasitas': '35 Liter',
      'Material': 'High-density Oxford Cloth',
      'Warna': 'Matte Black'
    }
  },
  {
    id: 'prod-5',
    slug: 'authentic-chinese-tie-guan-yin-tea',
    name: 'Authentic Premium Tie Guan Yin Oolong Tea Gift Box 250g',
    nameZh: '安溪铁观音特级特制乌龙茶礼盒',
    category: 'Souvenir',
    priceIdr: 285000,
    priceCny: 123,
    rating: 4.9,
    reviewsCount: 154,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Teh Oolong Tie Guan Yin asli dari perkebunan Anxi, Fujian. Aroma bunga anggrek yang harum alami dan cita rasa lembut manis di tenggorokan (Hui Gan). Dikemas dalam kotak kaleng eksklusif warna merah marun mewah.',
    features: [
      '100% Daun teh pilihan daun musim semi Anxi',
      'Aroma anggrek floral tahan hingga 7 kali seduhan',
      'Kemasan foil kedap udara higienis di dalam kaleng mewah',
      'Sangat cocok sebagai oleh-oleh bingkisan keluarga atau mitra bisnis'
    ],
    specs: {
      'Berat Bersih': '250 gram (32 sachet individu)',
      'Asal': 'Anxi, Fujian, China',
      'Masa Simpan': '24 Bulan',
      'Suhu Seduh': '95°C - 100°C'
    }
  },
  {
    id: 'prod-6',
    slug: 'chinese-silk-handicraft-scarf',
    name: 'Hangzhou 100% Mulberry Silk Scarf Classical Oriental Print',
    nameZh: '杭州特产100%天然桑蚕丝国风真丝丝巾',
    category: 'Fashion',
    priceIdr: 340000,
    priceCny: 146,
    rating: 4.8,
    reviewsCount: 65,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80',
    description: 'Syal sutra sutera asli 100% dari kota sutra legendaris Hangzhou. Tekstur sangat halus, jatuh sempurna, dan motif lukisan tinta tradisional China (Guofeng) yang anggun.',
    features: [
      '100% Sutra Murbei Murni (Grade 6A Mulberry Silk)',
      'Pinggiran dijahit tangan rapi (Hand-rolled edges)',
      'Pewarna alami ramah lingkungan tahan luntur',
      'Termasuk gift box eksklusif bersertifikat'
    ],
    specs: {
      'Ukuran': '90 x 90 cm',
      'Komposisi': '100% Mulberry Silk',
      'Asal': 'Hangzhou, Zhejiang',
      'Perawatan': 'Dry clean atau cuci tangan lembut'
    }
  },
  {
    id: 'prod-7',
    slug: 'smart-temperature-display-vacuum-flask',
    name: 'Smart LED Temperature Display Vacuum Flask Stainless 316 500ml',
    nameZh: '智能数显保温杯316医用不锈钢',
    category: 'Travel',
    priceIdr: 165000,
    priceCny: 71,
    rating: 4.7,
    reviewsCount: 198,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80',
    description: 'Termos cerdas dengan sensor suhu sentuh di tutup botol. Terbuat dari Stainless Steel SUS316 food-grade medis (lebih tinggi dari SUS304 biasa). Wajib dimiliki saat bepergian di China yang terbiasa dengan air hangat/teh.',
    features: [
      'Layar LED sentuh indikator suhu real-time tanpa charge',
      'Insulasi termal ganda tahan panas/dingin hingga 24 jam',
      'Dilengkapi saringan teh stainless steel bawaan',
      'Tutup anti bocor dengan silicone seal food-grade'
    ],
    specs: {
      'Kapasitas': '500 ml',
      'Material': 'SUS 316 Medical-grade Inner Liner',
      'Tahan Panas': 'Hingga 24 Jam',
      'Warna': 'China Red, Obsidian Black'
    }
  },
  {
    id: 'prod-8',
    slug: 'chinese-calligraphy-brush-starter-set',
    name: 'Traditional Chinese Calligraphy Brush & Inkstone Master Set',
    nameZh: '文房四宝初学精美礼盒套装',
    category: 'Souvenir',
    priceIdr: 220000,
    priceCny: 95,
    rating: 4.9,
    reviewsCount: 42,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80',
    description: 'Empat Pusaka Ruang Belajar (Four Treasures of the Study / 文房四宝): Kuas bulu serigala & kambing, bak tinta (inkstone), balok tinta pinus, dan kertas Xuan. Sangat cocok untuk pecinta seni budaya Mandarin.',
    features: [
      '4 kuas kaligrafi berbagai ukuran untuk karakter Hanzi',
      'Batu asah tinta alami (Natural Inkslab)',
      'Kertas latihan magic water-cloth (bisa dipakai ribuan kali)',
      'Kotak brokat satin merah tradisional'
    ],
    specs: {
      'Isi Paket': '4 Kuas, 1 Bak Tinta, 1 Balok Tinta, 1 Dudukan Kuas, Kertas',
      'Dimensi Box': '31 x 14 x 4 cm',
      'Cocok Untuk': 'Pemula & Kaligrafer Menengah'
    }
  }
];

export const INITIAL_DICTIONARY: DictionaryWord[] = [
  {
    id: 'dict-1',
    hanzi: '你好',
    pinyin: 'Nǐ hǎo',
    meaningId: 'Halo / Hai (Salam formal/umum)',
    category: 'Greetings',
    exampleZh: '你好，很高兴认识你。',
    examplePinyin: 'Nǐ hǎo, hěn gāoxìng rènshí nǐ.',
    exampleId: 'Halo, senang berkenalan denganmu.',
    notes: 'Bisa digunakan kapan saja untuk menyapa satu orang.'
  },
  {
    id: 'dict-2',
    hanzi: '谢谢',
    pinyin: 'Xièxie',
    meaningId: 'Terima kasih',
    category: 'Greetings',
    exampleZh: '非常感谢你的热心帮助！',
    examplePinyin: 'Fēicháng gǎnxiè nǐ de rèxīn bāngzhù!',
    exampleId: 'Terima kasih banyak atas bantuan tulusmu!',
    notes: 'Balasannya adalah 不客气 (Bú kèqi - Sama-sama).'
  },
  {
    id: 'dict-3',
    hanzi: '多少钱',
    pinyin: 'Duōshao qián',
    meaningId: 'Berapa harganya?',
    category: 'Shopping',
    exampleZh: '请问这个多少钱一件？',
    examplePinyin: 'Qǐngwèn zhège duōshao qián yí jiàn?',
    exampleId: 'Permisi, ini harganya berapa per buah?',
    notes: 'Kata kunci terpenting saat berbelanja di pasar atau mall di China.'
  },
  {
    id: 'dict-4',
    hanzi: '太贵了',
    pinyin: 'Tài guì le',
    meaningId: 'Terlalu mahal!',
    category: 'Shopping',
    exampleZh: '太贵了，可以便宜一点吗？',
    examplePinyin: 'Tài guì le, kěyǐ piányi yìdiǎn ma?',
    exampleId: 'Terlalu mahal, bisakah sedikit lebih murah?',
    notes: 'Gunakan saat menawar belanjaan di pasar malam.'
  },
  {
    id: 'dict-5',
    hanzi: '微信支付',
    pinyin: 'Wēixìn zhīfù',
    meaningId: 'WeChat Pay (Pembayaran via WeChat)',
    category: 'Money',
    exampleZh: '我可以用微信支付或者支付宝吗？',
    examplePinyin: 'Wǒ kěyǐ yòng Wēixìn zhīfù huòzhě Zhīfùbǎo ma?',
    exampleId: 'Bolehkah saya membayar pakai WeChat Pay atau Alipay?',
    notes: 'Metode pembayaran cashless utama di hampir seluruh daratan China.'
  },
  {
    id: 'dict-6',
    hanzi: '支付宝',
    pinyin: 'Zhīfùbǎo',
    meaningId: 'Alipay',
    category: 'Money',
    exampleZh: '请出示您的支付宝付款码。',
    examplePinyin: 'Qǐng chūshì nín de Zhīfùbǎo fùkuǎnmǎ.',
    exampleId: 'Silakan tunjukkan kode QR pembayaran Alipay Anda.',
    notes: 'Turis asing bisa menautkan kartu kredit Visa/Mastercard ke Alipay TourPass.'
  },
  {
    id: 'dict-7',
    hanzi: '服务员',
    pinyin: 'Fúwùyuán',
    meaningId: 'Pelayan restoran / staf layanan',
    category: 'Food',
    exampleZh: '服务员，请给我们看下菜单。',
    examplePinyin: 'Fúwùyuán, qǐng gěi wǒmen kàn xià càidān.',
    exampleId: 'Pelayan, tolong berikan kami daftar menu.',
    notes: 'Panggilan sopan universal untuk memanggil staf di restoran atau kafe.'
  },
  {
    id: 'dict-8',
    hanzi: '不要辣',
    pinyin: 'Bú yào là',
    meaningId: 'Jangan pedas / Tidak mau pedas',
    category: 'Food',
    exampleZh: '我不习惯吃辣，请做不辣的。',
    examplePinyin: 'Wǒ bù xíguàn chī là, qǐng zuò bú là de.',
    exampleId: 'Saya tidak terbiasa makan pedas, tolong buat yang tidak pedas.',
    notes: 'Sangat berguna di daerah kuliner pedas seperti Sichuan, Hunan, atau Chongqing.'
  },
  {
    id: 'dict-9',
    hanzi: '地铁站',
    pinyin: 'Dìtiě zhàn',
    meaningId: 'Stasiun Kereta Bawah Tanah / MRT / Subway',
    category: 'Transportation',
    exampleZh: '请问最近的地铁站在哪里？',
    examplePinyin: 'Qǐngwèn zuìjìn de dìtiě zhàn zài nǎlǐ?',
    exampleId: 'Permisi, stasiun subway terdekat ada di sebelah mana?',
    notes: 'Subway adalah transportasi paling efisien dan murah di kota besar China.'
  },
  {
    id: 'dict-10',
    hanzi: '高铁',
    pinyin: 'Gāotiě',
    meaningId: 'Kereta Cepat (High-Speed Train)',
    category: 'Transportation',
    exampleZh: '明天我们坐高铁去上海。',
    examplePinyin: 'Míngtiān wǒmen zuò gāotiě qù Shànghǎi.',
    exampleId: 'Besok kita naik kereta cepat menuju Shanghai.',
    notes: 'Jaringan kereta cepat terpanjang di dunia menghubungkan antar-kota dengan cepat.'
  },
  {
    id: 'dict-11',
    hanzi: '办理入住',
    pinyin: 'Bànlǐ rùzhù',
    meaningId: 'Check-in hotel',
    category: 'Hotel',
    exampleZh: '你好，我在网上预订了房间，办理入住。',
    examplePinyin: 'Nǐ hǎo, wǒ zài wǎngshàng yùdìng le fángjiān, bànlǐ rùzhù.',
    exampleId: 'Halo, saya sudah reservasi kamar secara online, mau check-in.',
    notes: 'Sediakan paspor asli Anda untuk proses registrasi tamu asing di hotel.'
  },
  {
    id: 'dict-12',
    hanzi: '救命',
    pinyin: 'Jiùmìng',
    meaningId: 'Tolong! (Keadaan darurat/bahaya)',
    category: 'Emergency',
    exampleZh: '救命！有人落水了！',
    examplePinyin: 'Jiùmìng! Yǒu rén luòshuǐ le!',
    exampleId: 'Tolong! Ada orang jatuh ke dalam air!',
    notes: 'Nomor darurat China: Polisi 110, Medis/Ambulans 120, Pemadam Kebakaran 119.'
  },
  {
    id: 'dict-13',
    hanzi: '合作愉快',
    pinyin: 'Hézuò yúkuài',
    meaningId: 'Senang bekerja sama / Kerjasama yang menyenangkan',
    category: 'Business',
    exampleZh: '希望我们未来的合作愉快！',
    examplePinyin: 'Xīwàng wǒmen wèilái de hézuò yúkuài!',
    exampleId: 'Semoga kerja sama kita di masa depan berjalan sukses dan menyenangkan!',
    notes: 'Ucapan umum setelah mencapai kesepakatan atau menandatangani kontrak bisnis.'
  },
  {
    id: 'dict-14',
    hanzi: '发票',
    pinyin: 'Fāpiào',
    meaningId: 'Faktur / Kwitansi resmi pajak',
    category: 'Business',
    exampleZh: '结账后能帮我们开一张发票吗？',
    examplePinyin: 'Jiézhàng hòu néng bāng wǒmen kāi yì zhāng fāpiào ma?',
    exampleId: 'Setelah pembayaran, bisakah buatkan kami faktur resmi?',
    notes: 'Wajib diminta untuk reimbursement biaya perjalanan bisnis kantor.'
  },
  {
    id: 'dict-15',
    hanzi: '登机口',
    pinyin: 'Dēngjī kǒu',
    meaningId: 'Pintu keberangkatan (Boarding Gate Bandara)',
    category: 'Airport',
    exampleZh: '这个航班在几号登机口登机？',
    examplePinyin: 'Zhège hángbān zài jǐ hào dēngjī kǒu dēngjī?',
    exampleId: 'Penerbangan ini boarding di gate nomor berapa?',
    notes: 'Periksa papan informasi bandara karena gate bisa berganti sewaktu-waktu.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-124',
    orderNumber: 'INV-2026-000124',
    createdAt: '2026-10-08 14:20',
    customerName: 'Budi Pratama',
    customerEmail: 'budi.pratama@example.com',
    customerPhone: '081234567890',
    shippingAddress: 'Jl. Sudirman No. 45, Tower Indah Lt. 12',
    shippingCity: 'Jakarta Selatan',
    postalCode: '12190',
    paymentMethod: 'Bank Transfer',
    items: [
      {
        id: 'prod-1',
        name: 'Universal Travel Adapter China Type A/I',
        quantity: 1,
        priceIdr: 125000,
        priceCny: 54,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-4',
        name: 'RedMandarin Cabin Pro Travel Backpack 35L',
        quantity: 1,
        priceIdr: 300000,
        priceCny: 129,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotalIdr: 425000,
    shippingIdr: 20000,
    totalIdr: 445000,
    totalCny: 191,
    status: 'Completed'
  },
  {
    id: 'ord-121',
    orderNumber: 'INV-2026-000121',
    createdAt: '2026-10-06 09:15',
    customerName: 'Siti Rahmawati',
    customerEmail: 'siti.r@example.com',
    customerPhone: '081987654321',
    shippingAddress: 'Jl. Diponegoro No. 88',
    shippingCity: 'Surabaya',
    postalCode: '60241',
    paymentMethod: 'E-Wallet (GoPay/OVO)',
    items: [
      {
        id: 'prod-2',
        name: 'China Unlimited eSIM Data 10 Days',
        quantity: 2,
        priceIdr: 210000,
        priceCny: 90,
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotalIdr: 420000,
    shippingIdr: 0,
    totalIdr: 420000,
    totalCny: 180,
    status: 'Processing'
  }
];

export const INITIAL_EXCHANGES: ExchangeTransaction[] = [
  {
    id: 'exc-101',
    date: '08 Oct 2026',
    fromCurrency: 'IDR',
    toCurrency: 'CNY',
    fromAmount: 1000000,
    toAmount: 425,
    rate: 2325,
    fee: 10000,
    status: 'Completed',
    accountName: 'Budi Pratama',
    accountNumber: 'Alipay: budi.cn26'
  },
  {
    id: 'exc-102',
    date: '05 Oct 2026',
    fromCurrency: 'IDR',
    toCurrency: 'CNY',
    fromAmount: 500000,
    toAmount: 210,
    rate: 2325,
    fee: 10000,
    status: 'Completed',
    accountName: 'Siti Rahmawati',
    accountNumber: 'WeChat: sitir_88'
  }
];
