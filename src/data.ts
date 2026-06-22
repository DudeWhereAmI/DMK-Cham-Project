import { Product, ElementProfile, BaseStyle, CharmItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'kep-1',
    name: 'Mother of Pearl Clip',
    vietnameseName: 'Kẹp Xà Cừ',
    basePrice: 30000,
    description: 'A premium glossy hair clip designed with comfortable dual-grip teeth.',
    vietnameseDescription: 'Dòng kẹp tóc cao cấp, răng kẹp kép êm ái chống gãy rụng. Tạo nếp chắc chắn cho phong thái hàng ngày.',
    category: 'clip-1',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-47.png',
      KIM: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/kim%20.png',
      MOC: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/m%E1%BB%99c.png',
      THUY: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/thu%E1%BB%B7.png',
      HOA: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/ho%E1%BA%A3.png',
      THO: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/th%E1%BB%95.png'
    }
  },
  {
    id: 'kep-2',
    name: 'Crystal Clip',
    vietnameseName: 'Kẹp Pha Lê',
    basePrice: 30000,
    description: 'Transparent, sparkling, and pure. A symbol of clean energy.',
    vietnameseDescription: 'Trong trẻo, lấp lánh và tinh khiết. Biểu tượng của dòng chảy năng lượng tích cực thanh sạch.',
    category: 'clip-2',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-2.png',
      KIM: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/kim%20.png',
      MOC: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/m%E1%BB%99c.png',
      THUY: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/thu%E1%BB%B7.png',
      HOA: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/ho%E1%BA%A3.png',
      THO: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/th%E1%BB%95.png'
    }
  },
  {
    id: 'kep-3',
    name: 'Seashell Clip',
    vietnameseName: 'Kẹp Vỏ Sò',
    basePrice: 30000,
    description: 'Carries the free breath of the ocean with unique, natural patterns.',
    vietnameseDescription: 'Mang hơi thở tự do của đại dương. Họa tiết vân tự nhiên độc bản không trộn lẫn trên từng phôi kẹp.',
    category: 'clip-3',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-3.png',
      KIM: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/KIM.png',
      MOC: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/m%E1%BB%99c.png',
      THUY: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/thu%E1%BB%B7.png',
      HOA: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/ho%E1%BA%A3.png',
      THO: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/th%E1%BB%95.png'
    }
  },
  {
    id: 'limited',
    name: 'Limited Edition "The Harmony"',
    vietnameseName: 'Kẹp Limited "The Harmony"',
    basePrice: 35000,
    description: 'Special edition color-shifting clip in the sun.',
    vietnameseDescription: 'Phiên bản đặc biệt giới hạn. Bí ẩn đổi màu phản quang rực rỡ khi tiếp xúc với ánh sáng mặt trời.',
    category: 'limited',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
      sunlight: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-28.png'
    }
  },
  {
    id: 'guong',
    name: 'Pocket Mirror',
    vietnameseName: 'Gương',
    basePrice: 25000,
    description: 'An elegant hand-held vanity mirror crafted with high-reflection glass.',
    vietnameseDescription: 'Chiếc gương phụ kiện thanh lịch, chế tác từ thủy tinh tráng bạc độ phản chiếu cao tuyệt đối.',
    category: 'mirror',
    defaultColor: '#AAD3EF',
    images: {
      none: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-46.png'
    }
  }
];

export const ELEMENTS: ElementProfile[] = [
  {
    type: 'KIM',
    nameEn: 'Metal (Kim)',
    nameVi: 'Mệnh Kim',
    colorHex: '#F0F1F3', // White/Crystal/Silver
    gradientFrom: '#FFFFFF',
    gradientTo: '#D1D5DB',
    guardianEn: 'White Tiger',
    guardianVi: 'Hổ Trắng',
    guardianEmoji: '🐅',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/kim.png',
    description: 'Symbolizes purity, wisdom, and precise brilliance. Resonates with white, silver and pearlescent crystal textures.'
  },
  {
    type: 'MOC',
    nameEn: 'Wood (Mộc)',
    nameVi: 'Mệnh Mộc',
    colorHex: '#CEE0A1', // Light Olive Green
    gradientFrom: '#D1E7B0',
    gradientTo: '#A7C985',
    guardianEn: 'Green Dragon',
    guardianVi: 'Rồng Xanh',
    guardianEmoji: '🐉',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/m%E1%BB%99c.png',
    description: 'Symbolizes growth, healing, and absolute vitality. Thrives in soft light greens and pastel mint jade tones.'
  },
  {
    type: 'THUY',
    nameEn: 'Water (Thuỷ)',
    nameVi: 'Mệnh Thuỷ',
    colorHex: '#AAD3EF', // Soft Blue
    gradientFrom: '#CBE5FF',
    gradientTo: '#8FBFE5',
    guardianEn: 'Blue Whale',
    guardianVi: 'Cá Voi Xanh',
    guardianEmoji: '🐳',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/thu%E1%BB%B7%20.png',
    description: 'Symbolizes flow, harmony, and depth. Best expressed in ocean blues, glittering aquas, and deep clear lakes.'
  },
  {
    type: 'HOA',
    nameEn: 'Fire (Hoả)',
    nameVi: 'Mệnh Hoả',
    colorHex: '#F4C1C2', // Soft Pink / Rose
    gradientFrom: '#FFD3D4',
    gradientTo: '#E59CA0',
    guardianEn: 'Red Phoenix',
    guardianVi: 'Phượng Hoàng Đỏ',
    guardianEmoji: '🔥',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/ho%E1%BA%a3.png',
    description: 'Symbolizes warmth, absolute passion, and creative energy. Sparkles in beautiful rose pinks and coral amethysts.'
  },
  {
    type: 'THO',
    nameEn: 'Earth (Thổ)',
    nameVi: 'Mệnh Thổ',
    colorHex: '#EADAB7', // Warm Cream / Biscuit Amber
    gradientFrom: '#FFEED1',
    gradientTo: '#D3C29E',
    guardianEn: 'Yellow Unicorn',
    guardianVi: 'Kỳ Lân Vàng',
    guardianEmoji: '🦄',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/th%E1%BB%95.png',
    description: 'Symbolizes stability, nourishment, and connection. Grounded in shells, biscuits, honey beige and golden ambers.'
  }
];

export const BASE_STYLES: BaseStyle[] = [
  {
    id: 'crystal',
    name: 'Glitter Crystal',
    vietnameseName: 'Pha Lê lấp lánh',
    priceModifier: 0,
    description: 'A stellar glossy resin infused with micro-crystalline glitter clusters.',
    textureClass: 'bg-opacity-90 backdrop-blur-xs shadow-inner saturate-110'
  },
  {
    id: 'motherOfPearl',
    name: 'Opalescent Pearl',
    vietnameseName: 'Xà Cừ ánh xà',
    priceModifier: 5000,
    description: 'Swirled natural seashell flakes producing stunning multi-dimensional pastel shine.',
    textureClass: 'radial-gradient-pearl shadow-inner'
  },
  {
    id: 'shimmerShell',
    name: 'Glimmering Ribbed Shell',
    vietnameseName: 'Vỏ Sò Ánh Nhũ',
    priceModifier: 8000,
    description: 'Textured with high-shine pearl pigments and a premium ribbed shell design.',
    textureClass: 'linear-gradient-shimmer shadow-lg'
  },
  {
    id: 'solarChange',
    name: 'Sun-Activated Magic Shift',
    vietnameseName: 'Cánh Tiên Đổi Màu',
    priceModifier: 12000,
    description: 'Groundbreaking compound that changes colors in direct sunlight (try the Sunlight Toggle!).',
    textureClass: 'sunlight-transition'
  }
];

export const CHARMS: CharmItem[] = [
  // Zodiac Guardians
  {
    id: 'zodiac-kim',
    name: 'White Tiger Moon',
    vietnameseName: 'Bạch Hổ (Kim)',
    category: 'zodiac',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/kim.png',
    priceModifier: 5000,
    element: 'KIM'
  },
  {
    id: 'zodiac-moc',
    name: 'Green Dragon Cloud',
    vietnameseName: 'Thanh Long (Mộc)',
    category: 'zodiac',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/m%E1%BB%99c.png',
    priceModifier: 5000,
    element: 'MOC'
  },
  {
    id: 'zodiac-thuy',
    name: 'Starry Blue Whale',
    vietnameseName: 'Huyền Vũ - Cá Voi (Thủy)',
    category: 'zodiac',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/thu%E1%BB%B7%20.png',
    priceModifier: 5000,
    element: 'THUY'
  },
  {
    id: 'zodiac-hoa',
    name: 'Red Phoenix Flame',
    vietnameseName: 'Chu Tước (Hỏa)',
    category: 'zodiac',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/ho%E1%BA%a3.png',
    priceModifier: 5000,
    element: 'HOA'
  },
  {
    id: 'zodiac-tho',
    name: 'Yellow Qilin Spark',
    vietnameseName: 'Kỳ Lân (Thổ)',
    category: 'zodiac',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/th%E1%BB%95.png',
    priceModifier: 5000,
    element: 'THO'
  },
  // Nơ trang trí
  {
    id: 'bow-white',
    name: 'White Bow',
    vietnameseName: 'Nơ trắng',
    category: 'bow',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-29.png',
    priceModifier: 5000
  },
  {
    id: 'bow-pink',
    name: 'Pink Bow',
    vietnameseName: 'Nơ hồng',
    category: 'bow',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-30.png',
    priceModifier: 5000
  },
  {
    id: 'bow-stone',
    name: 'Stone Bow',
    vietnameseName: 'Nơ đá',
    category: 'bow',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-35.png',
    priceModifier: 5000
  },
  // Biển Cả
  {
    id: 'sea-starwhite',
    name: 'White Starfish',
    vietnameseName: 'Sao biển trắng',
    category: 'sea',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-31.png',
    priceModifier: 5000
  },
  {
    id: 'sea-shell',
    name: 'Shell',
    vietnameseName: 'Vỏ sò',
    category: 'sea',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-32.png',
    priceModifier: 5000
  },
  {
    id: 'sea-snail',
    name: 'Snail Shell',
    vietnameseName: 'Vỏ ốc',
    category: 'sea',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-33.png',
    priceModifier: 5000
  },
  // Khác
  {
    id: 'other-heart',
    name: 'Heart',
    vietnameseName: 'Trái tim',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-34.png',
    priceModifier: 10000
  },
  {
    id: 'other-butterfly',
    name: 'Butterfly',
    vietnameseName: 'Bươm bướm',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-36.png',
    priceModifier: 10000
  },
  {
    id: 'other-brightmoon',
    name: 'Bright Moon',
    vietnameseName: 'Trăng sáng',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-37.png',
    priceModifier: 5000
  },
  {
    id: 'other-goldenmoon',
    name: 'Golden Moon',
    vietnameseName: 'Trăng vàng',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-39.png',
    priceModifier: 5000
  },
  {
    id: 'other-brightstar',
    name: 'Bright Star',
    vietnameseName: 'Sao sáng',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-38.png',
    priceModifier: 5000
  },
  {
    id: 'other-goldenstar',
    name: 'Golden Star',
    vietnameseName: 'Sao vàng',
    category: 'other',
    imageUrl: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/BRAND%20ELEMENT/ELEMENT%20TRANG%20TR%C3%8D/DMK%20%20BRAND%20ELEMENT%20-40.png',
    priceModifier: 5000
  }
];

export const LETTERING_PRICING = {
  sticker: 3000,    // 'Chữ dán'
  embossed: 5000,  // 'Chữ nổi' (3D)
};
