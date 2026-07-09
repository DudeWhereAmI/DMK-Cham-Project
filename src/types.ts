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
  imagesTilted?: Record<string, string>; // e.g. { 'KIM': url, 'MOC': url... }
  imagesWithCharm?: Record<string, string>; // e.g. { 'KIM': url, 'MOC': url... }
  imagesWithText?: Record<string, Record<string, string>>; // e.g. { 'sticker-silver': { 'KIM': url }, 'embossed-pink': { 'KIM': url } }
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
  descriptionVi: string;
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
  category: 'zodiac' | 'bow' | 'sea' | 'other' | 'regular' | 'stone' | 'bow-small' | 'bow-big' | 'sticker-deco';
  emoji?: string;
  imageUrl?: string;
  priceModifier: number;
  element?: ElementType;
}

export interface CustomizationState {
  productId: string;
  element: ElementType;
  partnerElement?: ElementType;
  comboId?: 'couple_combo' | 'mirror_combo';
  baseStyle: BaseStyleType;
  customType: CustomizationCategory;
  text: string;
  textStyleOption?: string; // 'silver' | 'gold' | 'white' | 'pink'
  letteringStyle?: LetteringStyle;
  textColor: string;
  selectedZodiacCharmId: string;
  selectedStickerIds: string[];
  // Separate customization fields for Product 2 (for combos/couple items)
  text2?: string;
  textStyleOption2?: string;
  letteringStyle2?: LetteringStyle;
  selectedZodiacCharmId2?: string;
  selectedStickerIds2?: string[];
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
