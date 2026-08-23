export interface Master {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  rating: number;
  reviewsCount: number;
  photoUrl: string;
  bio: string;
  popularTags: string[];
}

export interface Service {
  id: string;
  title: string;
  category: 'soch' | 'soqol' | 'kompleks' | 'boshqa';
  price: number; // UZS
  durationMinutes: number;
  description: string;
  imageUrl: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  masterName: string;
  serviceTitle: string;
}

export const MASTERS: Master[] = [
  {
    id: 'master-any',
    name: 'Farqi yo\'q (Istalgan bo\'sh usta)',
    role: 'Tezkor Qabul',
    experienceYears: 7,
    specialty: 'Eng mos va bo\'sh usta avtomatik tanlanadi',
    rating: 5.0,
    reviewsCount: 990,
    photoUrl: '/images/hero.png',
    bio: 'Vaqtingizni tejang! Siz tanlagan vaqt slotida bo\'sh bo\'lgan eng sara usta sizni qabul qiladi.',
    popularTags: ['Tezkor Navbat', 'Vaqtni Tejash', 'Top Sifat']
  },
  {
    id: 'master-alex',
    name: 'Alexandre',
    role: 'Bosh Usta (Top Master)',
    experienceYears: 9,
    specialty: 'Klassik va Zamonaviy Fade, 9D Royal Soqol',
    rating: 5.0,
    reviewsCount: 342,
    photoUrl: '/images/masters/master-1.jpg',
    bio: 'Yevropa va Turkiya barbershop akademiya bitiruvchisi. Erkaklar uslubi va individual imidj bo\'yicha mutaxassis.',
    popularTags: ['Fade Specialist', 'Scissors Expert', 'VIP Styling']
  },
  {
    id: 'master-jasur',
    name: 'Jasur',
    role: 'Senior Barber & Razor Specialist',
    experienceYears: 7,
    specialty: 'Ustara Bilan Formalash va Hot Towel Shave',
    rating: 4.9,
    reviewsCount: 285,
    photoUrl: '/images/masters/master-2.jpg',
    bio: 'Xavfsiz ustara san\'atining ustasi. Yuz tuzilishiga mos soqol shakli va issiq sochiqli spatsial parvarish ustasi.',
    popularTags: ['Razor Master', 'Beard Spa', 'Precision Trim']
  },
  {
    id: 'master-samir',
    name: 'Samir',
    role: 'Modern Style & Hair Artist',
    experienceYears: 5,
    specialty: 'Taper Fade, Texturizing va Zamonaviy Kroy',
    rating: 4.9,
    reviewsCount: 198,
    photoUrl: '/images/masters/master-3.jpg',
    bio: 'Yoshlar va zamonaviy uslub shaydolari uchun eng sara dizaynlar hamda sochni teksturalash bo\'yicha profil.',
    popularTags: ['Texture Fade', 'Young Style', 'Creative Cut']
  },
  {
    id: 'master-bekzod',
    name: 'Bekzod',
    role: 'VIP Beard & Hair Groomer',
    experienceYears: 8,
    specialty: 'Klassik Scissors Cut & Premium Soqol Spa',
    rating: 5.0,
    reviewsCount: 310,
    photoUrl: '/images/masters/master-4.jpg',
    bio: 'Klassik erkaklar uslubi va premium soch parvarishi ustasi. Premium soqol shakllantirish bo\'yicha mutaxassis.',
    popularTags: ['Classic Master', 'VIP Grooming', 'Beard Styling']
  },
  {
    id: 'master-rustam',
    name: 'Rustam',
    role: 'Executive Barber & Fade Master',
    experienceYears: 6,
    specialty: 'Crop, Buzz Cut va Soch Rangini Kamuflyaj Qilish',
    rating: 4.8,
    reviewsCount: 215,
    photoUrl: '/images/masters/master-5.jpg',
    bio: 'Aniq va mukammal fade liniyalari hamda oq sochlarni sezdirmay kamuflyaj qilish bo\'yicha mahorat egasi.',
    popularTags: ['Fade Expert', 'Color Camo', 'Crop Style']
  },
  {
    id: 'master-timur',
    name: 'Timur',
    role: 'Gentlemen Stylist',
    experienceYears: 6,
    specialty: 'Bolalar va Yoshlar Soch Stili',
    rating: 4.9,
    reviewsCount: 176,
    photoUrl: '/images/masters/master-6.jpg',
    bio: 'Zamonaviy soch stili hamda yosh jentlmenlar uchun quvnoq va shinam muhitda uslub yaratuvchi usta.',
    popularTags: ['Kids Master', 'Gentlemen Cut', 'Trendy Style']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'royal-cut',
    title: '9D Erkaklar Soch Olishi',
    category: 'soch',
    price: 150000,
    durationMinutes: 40,
    description: 'Bosh yuvish, sochni fen bilan shakllantirish va teksturalash.',
    imageUrl: '/images/service-haircut.png',
    isPopular: true
  },
  {
    id: 'beard-royal-trim',
    title: '9D Soqol Modellashtirish & Spa',
    category: 'soqol',
    price: 100000,
    durationMinutes: 40,
    description: 'Hot Towel issiq sochiq, ustara bilan aniq konturlash va soqol parvarishi.',
    imageUrl: '/images/showroom.png',
    isPopular: true
  },
  {
    id: 'vip-full-combo',
    title: '9D VIP Kompleks (Soch + Soqol + Spa)',
    category: 'kompleks',
    price: 220000,
    durationMinutes: 80,
    description: '9D soch olish, soqol shakllantirish hamda yuz niqobi.',
    imageUrl: '/images/hero.png',
    isPopular: true
  },
  {
    id: 'kids-cut',
    title: 'Yosh Jentlmen Soch Stili (12 yoshgacha)',
    category: 'soch',
    price: 100000,
    durationMinutes: 40,
    description: 'Bolalar uchun qulay va shinam muhitda soch shakllantirish.',
    imageUrl: '/images/master-samir.png',
  },
  {
    id: 'face-black-mask',
    title: 'Yuz Parvarishi va Qora Niqob',
    category: 'boshqa',
    price: 70000,
    durationMinutes: 40,
    description: 'Teshiklarni tozalash, yuz terisini oziqlantirish.',
    imageUrl: '/images/master-jasur.png',
  },
  {
    id: 'grey-camouflage',
    title: 'Oq Soch / Soqol Kamuflyaji',
    category: 'boshqa',
    price: 120000,
    durationMinutes: 40,
    description: 'Oq sochlarni sezdirmay kamuflyaj qilish va rangni tenglashtirish.',
    imageUrl: '/images/master-alex.png',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Sardor Rahimxonov',
    avatar: 'SR',
    rating: 5,
    date: '2 kun oldin',
    comment: '9D Barbershop web sayti orqali bron qilish juda qulay. Alexandre usta belgilangan 40 minutlik vaqtida aniq qabul qildi. Uslub va muomala super!',
    masterName: 'Alexandre',
    serviceTitle: '9D VIP Kompleks'
  },
  {
    id: 'rev-2',
    name: 'Bexruz Umarov',
    avatar: 'BU',
    rating: 5,
    date: '1 hafta oldin',
    comment: 'Jasur ustaning hot towel shave xizmati va 9D Barbershop muhiti juda yuqori darajada. Rahmat!',
    masterName: 'Jasur',
    serviceTitle: '9D Soqol Modellashtirish'
  }
];

export const SHOP_INFO = {
  name: '9D BARBERSHOP',
  tagline: 'Zamonaviy raqamli uslub va oliy darajadagi erkaklar parvarishi',
  
  phone: '+998 90 123 45 67',
  phoneFormatted: '+998901234567',
  address: 'Toshkent sh., Mirabad tumani, Oybek ko\'chasi 24-uy',
  workingHours: 'Dushanba - Yakshanba: 09:00 - 21:00 (Dam olish kunlarisiz)',

  instagram: 'https://instagram.com/9dbarbershop.uz',
  telegram: 'https://t.me/9dbarbershop_admin',
  tiktok: 'https://tiktok.com/@9dbarbershop.uz',
  youtube: 'https://youtube.com/@9dbarbershop',
};

export const TIME_SLOTS = [
  '09:00', '09:40', '10:20', '11:00', '11:40', '12:20',
  '13:00', '13:40', '14:20', '15:00', '15:40', '16:20',
  '17:00', '17:40', '18:20', '19:00', '19:40', '20:20'
];
