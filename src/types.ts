export interface Product {
  id: string;
  name: string;
  vietnameseName: string;
  basePrice: number;
  description: string;
  vietnameseDescription?: string;
  category: 'clip-1' | 'clip-2' | 'clip-3' | 'limited' | 'mirror';
  defaultColor: string;
  images?: Record<string, string>; // e.g. { 'none': url, 'KIM': url, 'MOC': url... }
}

export type ElementType = 'KIM' | 'MOC' | 'THUY' | 'HOA' | 'THO';

export interface ElementProfile {
  type: ElementType;
  nameEn: string;
  nameVi: string;
  colorHex: string;
  gradientFrom: string;
  gradientTo: string;
  guardianEn: string;
  guardianVi: string;
  guardianEmoji: string;
  guardianImg?: string;
  description: string;
}

export type BaseStyleType = 'crystal' | 'motherOfPearl' | 'shimmerShell' | 'solarChange';

export interface BaseStyle {
  id: BaseStyleType;
  name: string;
  vietnameseName: string;
  priceModifier: number;
  description: string;
  textureClass: string;
}

export type CustomizationCategory = 'zodiac' | 'stickers';

export type LetteringStyle = 'sticker' | 'embossed';

export interface CharmItem {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'zodiac' | 'bow' | 'sea' | 'other' | 'regular' | 'stone';
  emoji?: string;
  imageUrl?: string;
  priceModifier: number;
  element?: ElementType;
}

export interface CustomizationState {
  productId: string;
  element: ElementType;
  baseStyle: BaseStyleType;
  customType: CustomizationCategory;
  text: string;
  letteringStyle: LetteringStyle;
  textColor: string;
  selectedZodiacCharmId: string;
  selectedStickerIds: string[];
  uploadedPhotoUrl?: string; // For embroidery sweatshirt simulation
  sunlightMode: boolean; // For "change color in the sun" demo
}

export interface CartItem {
  id: string;
  product: Product;
  customization: CustomizationState;
  finalPrice: number;
  quantity: number;
}
