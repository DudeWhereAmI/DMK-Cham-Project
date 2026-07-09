import { Product, ElementProfile, BaseStyle, CharmItem } from './types';

export const MIRROR_IMAGES_CHU_NOI: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95(1).png'
};

export const MIRROR_IMAGES_LINH_VAT: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20M%E1%BB%99c.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Th%E1%BB%95.png'
};

export const getProductBasePrice = (productId: string, element?: string): number => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return 0;
  
  if (productId === 'guong') {
    if (element === 'MOC' || element === 'THUY') {
      return 30000;
    }
    return 35000;
  }
  
  return product.basePrice;
};

export const PRODUCTS: Product[] = [
  {
    id: 'kep-1',
    name: 'Cloud Glow Clip',
    vietnameseName: 'Kẹp Ánh Mây',
    basePrice: 40000,
    description: 'A premium glossy hair clip designed with comfortable dual-grip teeth.',
    vietnameseDescription: 'Dòng kẹp tóc cao cấp, răng kẹp kép êm ái chống gãy rụng. Tạo nếp chắc chắn cho phong thái hàng ngày.',
    category: 'clip-1',
    defaultColor: '#E28C9A',
    images: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Kim%20-%20G%C3%B3c%20th%E1%BA%B3ng.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/%C3%A1nh%20m%C3%A2y%20tr%C6%A1n%20m%E1%BB%99c.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/%C3%A1nh%20m%C3%A2y%20tr%C6%A1n%20thu%E1%BB%B7.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/%C3%A1nh%20m%C3%A2y%20tr%C6%A1n%20ho%E1%BA%A3.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/%C3%A1nh%20m%C3%A2y%20tr%C6%A1n%20th%E1%BB%95.png'
    },
    imagesTilted: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Kim%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20M%E1%BB%99c%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Thu%E1%BB%B7%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Ho%E1%BA%A3%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Th%E1%BB%95%20-%20G%C3%B3c%20nghi%C3%AAng.png'
    },
    imagesWithCharm: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20Kim%20-%20Linh%20v%E1%BA%ADt.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20M%E1%BB%99c%20-%20Linh%20v%E1%BA%ADt.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20Thu%E1%BB%B7%20-%20Linh%20v%E1%BA%ADt.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20Ho%E1%BA%A3%20-%20Linh%20v%E1%BA%ADt.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20Th%E1%BB%95%20-%20Linh%20v%E1%BA%ADt.png'
    },
    imagesWithText: {
      'sticker-gold': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20kim%20.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20m%E1%BB%99c%20.png.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20th%E1%BB%95.png'
      },
      'sticker-silver': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20kim%20.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20m%E1%BB%99c%20.png.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20th%E1%BB%95.png'
      },
      'embossed-white': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20kim.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20m%E1%BB%99c.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20th%E1%BB%95.png'
      },
      'embossed-pink': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20kim.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20m%E1%BB%99c.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%20th%E1%BB%95.png'
      }
    }
  },
  {
    id: 'kep-2',
    name: 'Crystal Clip',
    vietnameseName: 'Kẹp Pha Lê',
    basePrice: 40000,
    description: 'Transparent, sparkling, and pure. A symbol of clean energy.',
    vietnameseDescription: 'Trong trẻo, lấp lánh và tinh khiết. Biểu tượng của dòng chảy năng lượng tích cực thanh sạch.',
    category: 'clip-2',
    defaultColor: '#E28C9A',
    images: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20Kim-%20G%C3%B3c%20th%E1%BA%B3ng.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@551fe45a0b1804e001ab00f45068aba5439f6701/pha%20l%C3%AA%20tr%C6%A1n%20M%E1%BB%98C.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@551fe45a0b1804e001ab00f45068aba5439f6701/pha%20l%C3%AA%20tr%C6%A1n%20TH%E1%BB%A6Y.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@551fe45a0b1804e001ab00f45068aba5439f6701/pha%20l%C3%AA%20tr%C6%A1n%20H%E1%BB%8EA.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@551fe45a0b1804e001ab00f45068aba5439f6701/pha%20l%C3%AA%20tr%C6%A1n%20TH%E1%BB%94.png'
    },
    imagesTilted: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20Kim%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20M%E1%BB%99c%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20Thu%E1%BB%B7%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20Ho%E1%BA%A3%20-%20G%C3%B3c%20nghi%C3%AAng.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B8P%20PHA%20L%C3%8A/K%E1%BA%B9p%20kh%C3%B4ng%20ch%E1%BB%AF%20Pha%20L%C3%AA%20Th%E1%BB%95%20-%20G%C3%B3c%20nghi%C3%AAng.png'
    },
    imagesWithCharm: {
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Kim%20-%20Linh%20v%E1%BA%ADt.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20M%E1%BB%99c%20-%20Linh%20v%E1%BA%ADt.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Thu%E1%BB%B7%20-%20Linh%20v%E1%BA%ADt.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Ho%E1%BA%A3%20-%20Linh%20v%E1%BA%ADt.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/K%E1%BA%B9p%20m%E1%BA%ABu%20Linh%20v%E1%BA%ADt/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Th%E1%BB%95%20-%20Linh%20v%E1%BA%ADt.png'
    },
    imagesWithText: {
      'sticker-gold': {
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Ho%E1%BA%A3%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png',
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Kim%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Th%E1%BB%95%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png'
      },
      'sticker-silver': {
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20M%E1%BB%99c%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20b%E1%BA%A1c.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Thu%E1%BB%B7%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20b%E1%BA%A1c.png'
      },
      'embossed-white': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20kim.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20m%E1%BB%99c.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20th%E1%BB%95.png'
      },
      'embossed-pink': {
        KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20kim.png',
        MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20m%E1%BB%99c.png',
        THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20thu%E1%BB%B7.png',
        HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20ho%E1%BA%A3.png',
        THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20t%E1%BB%ABng%20c%C3%A1i/pha%20l%C3%AA%20ch%E1%BB%AF%20n%E1%BB%95i%20th%E1%BB%95.png'
      }
    }
  },
  /*
  {
    id: 'kep-3',
    name: 'Seashell Clip',
    vietnameseName: 'Kẹp Vỏ Sò',
    basePrice: 40000,
    description: 'Carries the free breath of the ocean with unique, natural patterns.',
    vietnameseDescription: 'Mang hơi thở tự do của đại dương. Họa tiết vân tự nhiên độc bản không trộn lẫn trên từng phôi kẹp.',
    category: 'clip-3',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-3.png',
      KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/KIM.png',
      MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/m%E1%BB%99c.png',
      THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/thu%E1%BB%B7.png',
      HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/ho%E1%BA%A3.png',
      THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/th%E1%BB%95.png'
    }
  },
  */
  {
    id: 'limited',
    name: 'Limited Edition "The Harmony"',
    vietnameseName: 'Kẹp Limited "The Harmony"',
    basePrice: 40000,
    description: 'Special edition color-shifting clip in the sun.',
    vietnameseDescription: 'Phiên bản đặc biệt giới hạn. Bí ẩn đổi màu phản quang rực rỡ khi tiếp xúc với ánh sáng mặt trời.',
    category: 'limited',
    defaultColor: '#E28C9A',
    images: {
      none: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
      sunlight: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-28.png'
    }
  },
  {
    id: 'guong',
    name: 'Gương Nguyệt Vân',
    vietnameseName: 'Gương Nguyệt Vân',
    basePrice: 35000,
    description: 'An elegant hand-held vanity mirror crafted with high-reflection glass.',
    vietnameseDescription: 'Chiếc gương phụ kiện thanh lịch, chế tác từ thủy tinh tráng bạc độ phản chiếu cao tuyệt đối.',
    category: 'mirror',
    defaultColor: '#AAD3EF',
    images: {
      none: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-46.png'
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png',
    description: 'Symbolizes purity, wisdom, and precise brilliance. Resonates with white, silver and pearlescent crystal textures.',
    descriptionVi: 'Đại diện cho sự thuần khiết, trí tuệ và ánh sáng tinh tế. Phù hợp với các chất liệu pha lê trắng, bạc và ngọc trai.'
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png',
    description: 'Symbolizes growth, healing, and absolute vitality. Thrives in soft light greens and pastel mint jade tones.',
    descriptionVi: 'Đại diện cho sự sinh trưởng, chữa lành và sức sống mãnh liệt. Nổi bật trong những sắc xanh ngọc bích, xanh nhạt pastel.'
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png',
    description: 'Symbolizes flow, harmony, and depth. Best expressed in ocean blues, glittering aquas, and deep clear lakes.',
    descriptionVi: 'Đại diện cho dòng chảy, sự tĩnh lặng và chiều sâu. Cảm nhận rõ nhất qua màu xanh đại dương, ánh xanh lấp lánh và hồ nước trong.'
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png',
    description: 'Symbolizes warmth, absolute passion, and creative energy. Sparkles in beautiful rose pinks and coral amethysts.',
    descriptionVi: 'Đại diện cho sự ấm áp, đam mê mãnh liệt và năng lượng sáng tạo. Tỏa sáng qua những sắc hồng rực rỡ và san hô nhiệt huyết.'
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png',
    description: 'Symbolizes stability, nourishment, and connection. Grounded in shells, biscuits, honey beige and golden ambers.',
    descriptionVi: 'Đại diện cho sự bền vững, nuôi dưỡng và gắn kết. Gần gũi qua những tông màu ấm như vỏ trai, màu be, mật ong và hổ phách.'
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
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png',
    priceModifier: 10000,
    element: 'KIM'
  },
  {
    id: 'zodiac-moc',
    name: 'Green Dragon Cloud',
    vietnameseName: 'Thanh Long (Mộc)',
    category: 'zodiac',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png',
    priceModifier: 10000,
    element: 'MOC'
  },
  {
    id: 'zodiac-thuy',
    name: 'Starry Blue Whale',
    vietnameseName: 'Huyền Vũ (Thủy)',
    category: 'zodiac',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png',
    priceModifier: 10000,
    element: 'THUY'
  },
  {
    id: 'zodiac-hoa',
    name: 'Red Phoenix Flame',
    vietnameseName: 'Chu Tước (Hỏa)',
    category: 'zodiac',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png',
    priceModifier: 10000,
    element: 'HOA'
  },
  {
    id: 'zodiac-tho',
    name: 'Yellow Qilin Spark',
    vietnameseName: 'Kỳ Lân (Thổ)',
    category: 'zodiac',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png',
    priceModifier: 10000,
    element: 'THO'
  },
  // Nơ trang trí
  // Small Bows (Nơ nhỏ) - Dùng cho kẹp
  {
    id: 'bow-small-1-pink',
    name: 'Pink Small Bow 1',
    vietnameseName: 'Nơ Nhỏ 1 hồng',
    category: 'bow-small',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%201%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png',
    priceModifier: 5000
  },
  {
    id: 'bow-small-1-white',
    name: 'White Small Bow 1',
    vietnameseName: 'Nơ Nhỏ 1 trắng',
    category: 'bow-small',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%201%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png',
    priceModifier: 5000
  },
  {
    id: 'bow-small-2-pink',
    name: 'Pink Small Bow 2',
    vietnameseName: 'Nơ Nhỏ 2 hồng',
    category: 'bow-small',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%202%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png',
    priceModifier: 5000
  },
  {
    id: 'bow-small-2-white',
    name: 'White Small Bow 2',
    vietnameseName: 'Nơ Nhỏ 2 trắng',
    category: 'bow-small',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%202%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png',
    priceModifier: 5000
  },
  // Big Bows (Nơ to) - Dùng cho gương
  {
    id: 'bow-big-1-pink',
    name: 'Pink Big Bow 1',
    vietnameseName: 'Nơ To 1 hồng',
    category: 'bow-big',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%201%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png',
    priceModifier: 10000
  },
  {
    id: 'bow-big-1-white',
    name: 'White Big Bow 1',
    vietnameseName: 'Nơ To 1 trắng',
    category: 'bow-big',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%201%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png',
    priceModifier: 10000
  },
  {
    id: 'bow-big-2-pink',
    name: 'Pink Big Bow 2',
    vietnameseName: 'Nơ To 2 hồng',
    category: 'bow-big',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%202%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png',
    priceModifier: 10000
  },
  {
    id: 'bow-big-2-white',
    name: 'White Big Bow 2',
    vietnameseName: 'Nơ To 2 trắng',
    category: 'bow-big',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%202%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png',
    priceModifier: 10000
  },
  // Sticker dán (Stickers)
  {
    id: 'sticker-sparkle-silver',
    name: 'Sparkle Sticker Silver',
    vietnameseName: 'Sticker dán Lấp lánh - Bạc',
    category: 'sticker-deco',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20L%E1%BA%A5p%20l%C3%A1nh%20-%20B%E1%BA%A1c.png',
    priceModifier: 3000
  },
  {
    id: 'sticker-sparkle-gold',
    name: 'Sparkle Sticker Gold',
    vietnameseName: 'Sticker dán Lấp lánh - Vàng',
    category: 'sticker-deco',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20L%E1%BA%A5p%20l%C3%A1nh%20-%20V%C3%A0ng.png',
    priceModifier: 3000
  },
  {
    id: 'sticker-moon-silver',
    name: 'Moon Sticker Silver',
    vietnameseName: 'Sticker dán mặt trăng - Bạc',
    category: 'sticker-deco',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20m%E1%BA%B7t%20tr%C4%83ng%20-%20B%E1%BA%A1c.png',
    priceModifier: 3000
  },
  {
    id: 'sticker-moon-gold',
    name: 'Moon Sticker Gold',
    vietnameseName: 'Sticker dán mặt trăng - Vàng',
    category: 'sticker-deco',
    imageUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20m%E1%BA%B7t%20tr%C4%83ng%20-%20V%C3%A0ng.png',
    priceModifier: 3000
  }
];

export const LETTERING_PRICING = {
  sticker: 3000,    // 'Chữ dán'
  embossed: 5000,  // 'Chữ nổi' (3D)
};
