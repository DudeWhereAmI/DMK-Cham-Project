import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Product, ElementProfile, CustomizationState, CharmItem, ElementType } from '../types';
import { checkIsSoldOut } from '../lib/inventory';
import { Search, ChevronLeft, ChevronRight, X, Box } from 'lucide-react';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

const MIRROR_IMAGES_CHU_NOI: Record<ElementType, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95.png', // Tên file bị lỗi trên github nhưng là của Mộc
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95(1).png'
};

const MIRROR_IMAGES_LINH_VAT: Record<ElementType, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20M%E1%BB%99c.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Th%E1%BB%95.png'
};

const getImgSizeClass = (
  elType?: string,
  isDoubleSided?: boolean,
  isPhaLeClipMirrorCombo?: boolean
) => {
  if (isPhaLeClipMirrorCombo) {
    return 'w-[125%] h-[125%] max-w-[135%]';
  }
  if (isDoubleSided) {
    return 'w-[200%] h-[200%] max-w-[250%]';
  }
  switch(elType) {
    case 'THUY': return 'w-[90%] h-[90%]';
    case 'HOA': return 'w-[70%] h-[70%]';
    default: return 'w-[85%] h-[85%]';
  }
};



interface ProductVisualizerProps {
  product: Product;
  element: ElementProfile;
  customization: CustomizationState;
  selectedCharms: CharmItem[];
  onUpdateCustomization: (updater: Partial<CustomizationState>) => void;
  mode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided';
  lang?: 'vi' | 'en';
  activeTab?: 'p1' | 'p2';
  onTabChange?: (tab: 'p1' | 'p2') => void;
}

const getElementImage = (elementType: string, product: Product, hasZodiacCharm: boolean, letteringStyle?: string, textStyleOption?: string) => {
  if (letteringStyle && product.imagesWithText) {
    const exactKey = `${letteringStyle}-${textStyleOption || ''}`;
    if (product.imagesWithText[exactKey] && product.imagesWithText[exactKey][elementType]) {
      return product.imagesWithText[exactKey][elementType];
    }
    
    // Fallback for this element
    if (letteringStyle === 'sticker') {
       if (product.imagesWithText['sticker-silver'] && product.imagesWithText['sticker-silver'][elementType]) return product.imagesWithText['sticker-silver'][elementType];
       if (product.imagesWithText['sticker-gold'] && product.imagesWithText['sticker-gold'][elementType]) return product.imagesWithText['sticker-gold'][elementType];
       
       // Fallback to embossed if sticker is not available
       if (product.imagesWithText['embossed-white'] && product.imagesWithText['embossed-white'][elementType]) return product.imagesWithText['embossed-white'][elementType];
       if (product.imagesWithText['embossed-pink'] && product.imagesWithText['embossed-pink'][elementType]) return product.imagesWithText['embossed-pink'][elementType];
    } else if (letteringStyle === 'embossed') {
       if (product.imagesWithText['embossed-white'] && product.imagesWithText['embossed-white'][elementType]) return product.imagesWithText['embossed-white'][elementType];
       if (product.imagesWithText['embossed-pink'] && product.imagesWithText['embossed-pink'][elementType]) return product.imagesWithText['embossed-pink'][elementType];
       
       // Fallback to sticker if embossed is not available
       if (product.imagesWithText['sticker-silver'] && product.imagesWithText['sticker-silver'][elementType]) return product.imagesWithText['sticker-silver'][elementType];
       if (product.imagesWithText['sticker-gold'] && product.imagesWithText['sticker-gold'][elementType]) return product.imagesWithText['sticker-gold'][elementType];
    }
  }

  if (hasZodiacCharm && product.imagesWithCharm && product.imagesWithCharm[elementType]) {
    return product.imagesWithCharm[elementType];
  }
  
  if (product.images && product.images[elementType]) return product.images[elementType];
  
  return null;
};

export const ProductVisualizer: React.FC<ProductVisualizerProps> = ({
  product,
  element,
  customization,
  selectedCharms,
  onUpdateCustomization,
  mode = 'full',
  lang = 'en',
  activeTab = 'p1',
  onTabChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeItem = activeTab === 'p1' ? 1 : 2;
  const [currentIndex2, setCurrentIndex2] = useState(0);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  
  // 3D Rotation State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!is3DMode) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !is3DMode) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation(prev => ({
      x: Math.max(-80, Math.min(80, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const getImagesForCategory = (
    category: string,
    itemNum: 1 | 2
  ) => {
    const imagesArr: string[] = [];
    const isClip = category.startsWith('clip') || category === 'limited';
    
    if (category === 'mirror') {
      if (mode === 'double-sided') {
        if (itemNum === 1) {
          imagesArr.push(MIRROR_IMAGES_LINH_VAT.KIM, MIRROR_IMAGES_LINH_VAT.MOC, MIRROR_IMAGES_LINH_VAT.THUY, MIRROR_IMAGES_LINH_VAT.HOA, MIRROR_IMAGES_LINH_VAT.THO);
        } else {
          imagesArr.push(MIRROR_IMAGES_CHU_NOI.KIM, MIRROR_IMAGES_CHU_NOI.MOC, MIRROR_IMAGES_CHU_NOI.THUY, MIRROR_IMAGES_CHU_NOI.HOA, MIRROR_IMAGES_CHU_NOI.THO);
        }
      } else {
        let hasLettering = itemNum === 1 ? !!customization.letteringStyle : !!customization.letteringStyle2;
        let hasZodiacCharm = itemNum === 1 ? !!customization.selectedZodiacCharmId : !!customization.selectedZodiacCharmId2;
        let isStickersOrText = itemNum === 1 ? (customization.customType === 'stickers' || customization.text) : (customization.customType === 'stickers' || customization.text2);
        
        if (mode === 'charm-only') {
          hasLettering = false;
          isStickersOrText = false;
          hasZodiacCharm = true;
        }

        if (hasLettering || isStickersOrText) {
          imagesArr.push(MIRROR_IMAGES_CHU_NOI.KIM, MIRROR_IMAGES_CHU_NOI.MOC, MIRROR_IMAGES_CHU_NOI.THUY, MIRROR_IMAGES_CHU_NOI.HOA, MIRROR_IMAGES_CHU_NOI.THO);
        } else if (hasZodiacCharm) {
          imagesArr.push(MIRROR_IMAGES_LINH_VAT.KIM, MIRROR_IMAGES_LINH_VAT.MOC, MIRROR_IMAGES_LINH_VAT.THUY, MIRROR_IMAGES_LINH_VAT.HOA, MIRROR_IMAGES_LINH_VAT.THO);
        } else {
          imagesArr.push(MIRROR_IMAGES_CHU_NOI.KIM, MIRROR_IMAGES_CHU_NOI.MOC, MIRROR_IMAGES_CHU_NOI.THUY, MIRROR_IMAGES_CHU_NOI.HOA, MIRROR_IMAGES_CHU_NOI.THO);
        }
      }
    } else if (product.images) {
      if (product.images['none']) imagesArr.push(product.images['none']);
      if (product.category === 'limited' && product.images['sunlight']) {
        imagesArr.push(product.images['sunlight']);
      }
      let hasZodiacCharm = itemNum === 1 ? !!customization.selectedZodiacCharmId : !!customization.selectedZodiacCharmId2;
      let letteringStyle = itemNum === 1 ? customization.letteringStyle : customization.letteringStyle2;
      let textStyleOption = itemNum === 1 ? customization.textStyleOption : customization.textStyleOption2;
      
      if (mode === 'font-only') {
         if (!letteringStyle) letteringStyle = 'embossed';
         if (!textStyleOption) textStyleOption = 'white';
      }

      if (mode === 'double-sided') {
         if (itemNum === 1) {
            hasZodiacCharm = true;
            letteringStyle = undefined;
            textStyleOption = undefined;
         } else {
            hasZodiacCharm = false;
            letteringStyle = customization.letteringStyle || 'sticker';
            textStyleOption = customization.textStyleOption || 'silver';
         }
      }
      
      ['KIM', 'MOC', 'THUY', 'HOA', 'THO'].forEach(elType => {
         const imgStr = getElementImage(elType, product, hasZodiacCharm, letteringStyle, textStyleOption);
         if (imgStr && imgStr !== product.images?.['none'] && imgStr !== product.images?.['sunlight'] && !imagesArr.includes(imgStr)) {
           imagesArr.push(imgStr);
         }
      });
    }
    
    if (imagesArr.length === 0) {
      imagesArr.push(isClip ? dmkBrandElement1 : mirrorVintage);
    }
    return imagesArr;
  };

  const category1 = product.category;
  const category2 = customization.comboId === 'mirror_combo' ? 'mirror' : product.category;
  
  const images1 = getImagesForCategory(category1, 1);
  const images2 = (mode === 'couple' || mode === 'double-sided') ? getImagesForCategory(category2, 2) : [];

  const activeImages = activeItem === 1 ? images1 : images2;
  const safeIndex = activeItem === 1 ? (currentIndex >= images1.length ? 0 : currentIndex) : (currentIndex2 >= images2.length ? 0 : currentIndex2);

  // Effect to switch to the element's image when element changes
  useEffect(() => {
    if (category1 === 'mirror') {
      const elTypes = ['KIM', 'MOC', 'THUY', 'HOA', 'THO'];
      const idx = elTypes.indexOf(element.type);
      if (idx !== -1 && idx < images1.length) setCurrentIndex(idx);
    } else if (element && element.type && product.images) {
      const hasZodiacCharm = mode === 'double-sided' ? true : !!customization.selectedZodiacCharmId;
      const letterStyle = mode === 'double-sided' ? undefined : customization.letteringStyle;
      const letterOption = mode === 'double-sided' ? undefined : customization.textStyleOption;
      const targetImg = getElementImage(element.type, product, hasZodiacCharm, letterStyle, letterOption);
      if (targetImg) {
        const idx = images1.indexOf(targetImg);
        if (idx !== -1) setCurrentIndex(idx);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.type, product.id, customization.customType, customization.selectedZodiacCharmId, customization.letteringStyle, customization.textStyleOption, images1.length, mode]);

  useEffect(() => {
    if (mode === 'couple' || mode === 'double-sided') {
      const partnerEl = mode === 'double-sided' ? element.type : (customization.partnerElement || 'KIM');
      if (category2 === 'mirror') {
        const elTypes = ['KIM', 'MOC', 'THUY', 'HOA', 'THO'];
        const idx = elTypes.indexOf(partnerEl);
        if (idx !== -1 && idx < images2.length) setCurrentIndex2(idx);
      } else if (partnerEl && product.images) {
        const hasZodiacCharm = mode === 'double-sided' ? false : !!customization.selectedZodiacCharmId2;
        const letterStyle = mode === 'double-sided' ? (customization.letteringStyle || 'sticker') : customization.letteringStyle2;
        const letterOption = mode === 'double-sided' ? (customization.textStyleOption || 'silver') : customization.textStyleOption2;
        const targetImg = getElementImage(partnerEl, product, hasZodiacCharm, letterStyle, letterOption);
        if (targetImg) {
          const idx = images2.indexOf(targetImg);
          if (idx !== -1) setCurrentIndex2(idx);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customization.partnerElement, element.type, product.id, customization.text2, customization.selectedZodiacCharmId2, customization.letteringStyle, customization.textStyleOption, customization.letteringStyle2, customization.textStyleOption2, images2.length, mode]);

  const goNext = () => activeItem === 1 ? setCurrentIndex((prev) => (prev + 1) % images1.length) : setCurrentIndex2((prev) => (prev + 1) % images2.length);
  const goPrev = () => activeItem === 1 ? setCurrentIndex((prev) => (prev - 1 + images1.length) % images1.length) : setCurrentIndex2((prev) => (prev - 1 + images2.length) % images2.length);

  const currentImage = images1[currentIndex >= images1.length ? 0 : currentIndex];
  let partnerImage = mode === 'couple' || mode === 'double-sided' ? images2[currentIndex2 >= images2.length ? 0 : currentIndex2] : currentImage;


  const getActiveElementType = (): string => {
    if (product.imagesWithCharm) {
      const foundKey = Object.keys(product.imagesWithCharm).find(key => product.imagesWithCharm?.[key] === currentImage);
      if (foundKey) return foundKey;
    }
    if (product.imagesWithText) {
      for (const styleKey in product.imagesWithText) {
        const foundKey = Object.keys(product.imagesWithText[styleKey]).find(key => product.imagesWithText![styleKey][key] === currentImage);
        if (foundKey) return foundKey;
      }
    }
    if (product.images) {
      const foundKey = Object.keys(product.images).find(key => product.images?.[key] === currentImage);
      if (foundKey && foundKey !== 'none' && foundKey !== 'sunlight') {
        return foundKey;
      }
    }
    return element?.type || 'HOA';
  };

  const getFullscreenImage = (): string => {
    const hasZodiacCharm = !!customization.selectedZodiacCharmId;
    if (isTilted && product.imagesTilted && !hasZodiacCharm) {
      const activeType = getActiveElementType();
      if (product.imagesTilted[activeType]) {
        return product.imagesTilted[activeType];
      }
    }
    return currentImage;
  };

  const isP1SoldOut = checkIsSoldOut(product.category, element.type);
  const isP2SoldOut = customization.partnerElement ? checkIsSoldOut(customization.comboId === 'mirror_combo' ? 'mirror' : product.category, customization.partnerElement) : false;

  const isPhaLeDan = product.id === 'kep-2' && customization.letteringStyle === 'sticker';
  const isPhaLeDan2 = product.id === 'kep-2' && customization.letteringStyle2 === 'sticker';

  const galleryView = (
    <div 
      className="relative w-full h-[350px] sm:h-[450px] lg:h-[calc(100vh-280px)] lg:max-h-[600px] bg-[#F3F3F3] rounded-sm flex items-center justify-center group overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <img 
        src={currentImage} 
        alt={product.name} 
        className={`${getImgSizeClass(element.type, false, activeItem === 1 && isPhaLeDan)} object-contain select-none transition-transform duration-100 ease-out ${isP1SoldOut ? 'opacity-50 grayscale' : ''}`}
        draggable={false}
        referrerPolicy="no-referrer"
       />
      {isP1SoldOut && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-red-600/90 text-white font-black text-2xl md:text-4xl tracking-[0.2em] px-8 py-3 transform -rotate-12 border-4 border-red-500 shadow-2xl backdrop-blur-sm">
            {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
          </div>
        </div>
      )}
      
      {/* Zoom Button */}
      <button 
        onClick={() => setIsFullscreen(true)}
        className="absolute top-4 right-4 p-2 bg-transparent hover:bg-black/5 rounded-full transition-colors"
      >
        <Search className="w-5 h-5 text-gray-800" strokeWidth={2} />
      </button>

      {/* Navigation Arrows */}
      {activeImages.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {activeImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === safeIndex ? 'bg-gray-800' : 'bg-gray-400/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  const p1ScaleClass = isPhaLeDan ? 'scale-100 group-hover:scale-105' : (mode === 'double-sided' ? 'scale-[0.85] group-hover:scale-[0.9]' : 'group-hover:scale-105');
  const p2ScaleClass = isPhaLeDan2 ? 'scale-100 group-hover:scale-105' : (mode === 'double-sided' ? 'scale-[0.85] group-hover:scale-[0.9]' : 'group-hover:scale-105');

  const coupleView = (
    <div className="relative flex flex-col md:flex-row items-stretch gap-4 w-full h-auto md:h-[400px] lg:h-[500px] p-4 bg-[#F3F3F3] rounded-xl overflow-hidden shadow-inner">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

      {/* Side 1 / Item 1 */}
      <div 
        className={`flex-1 flex flex-col gap-3 z-10 min-h-[300px] md:min-h-0 cursor-pointer rounded-xl transition-all duration-300 p-2 ${activeItem === 1 ? 'ring-2 ring-[#00687A] bg-white/40' : 'hover:bg-white/20'}`}
        onClick={() => onTabChange?.('p1')}
      >
        <h3 className="text-center font-bold text-[#00687A] text-xs sm:text-sm uppercase tracking-widest bg-white/80 py-2 rounded-full mx-auto px-6 shadow-sm">
          {mode === 'couple' 
            ? (lang === 'vi' ? `Sản phẩm 1 (${customization.text || element.type})` : `Item 1 (${customization.text || element.type})`) 
            : (lang === 'vi' ? `MẶT TRƯỚC (${element.type === 'THUY' ? 'THỦY' : element.type === 'MOC' ? 'MỘC' : element.type === 'HOA' ? 'HỎA' : element.type === 'THO' ? 'THỔ' : 'KIM'})` : `FRONT SIDE (${element.type})`)}
        </h3>
        <div className="relative w-full flex-1 bg-white/60 backdrop-blur-md border border-white/80 rounded-sm flex items-center justify-center overflow-hidden shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00687A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img src={currentImage} alt="Side 1" className={`${getImgSizeClass(element.type, mode === 'double-sided' || mode === 'couple', isPhaLeDan)} object-contain select-none transition-transform duration-700 ease-out ${p1ScaleClass} ${isP1SoldOut ? 'opacity-50 grayscale' : ''}`} referrerPolicy="no-referrer"  />
          {isP1SoldOut && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-red-600/90 text-white font-black text-sm sm:text-lg tracking-[0.2em] px-4 py-2 transform -rotate-12 border-2 border-red-500 shadow-2xl backdrop-blur-sm">
                {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side 2 / Item 2 */}
      <div 
        className={`flex-1 flex flex-col gap-3 z-10 min-h-[300px] md:min-h-0 cursor-pointer rounded-xl transition-all duration-300 p-2 ${activeItem === 2 ? 'ring-2 ring-[#E28C9A] bg-white/40' : 'hover:bg-white/20'}`}
        onClick={() => onTabChange?.('p2')}
      >
        <h3 className="text-center font-bold text-[#00687A] text-xs sm:text-sm uppercase tracking-widest bg-white/80 py-2 rounded-full mx-auto px-6 shadow-sm">
          {mode === 'couple' 
            ? (lang === 'vi' ? `Sản phẩm 2 (${customization.text2 || customization.partnerElement || '?'})` : `Item 2 (${customization.text2 || customization.partnerElement || '?'})`) 
            : (lang === 'vi' ? `MẶT SAU (${customization.text || 'chữ'})` : `BACK SIDE (${customization.text || 'text'})`)}
        </h3>
        <div className="relative w-full flex-1 bg-white/60 backdrop-blur-md border border-white/80 rounded-sm flex items-center justify-center overflow-hidden shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-tl from-[#E28C9A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img src={partnerImage} alt="Side 2" className={`${getImgSizeClass(mode === 'double-sided' ? element.type : customization.partnerElement, mode === 'double-sided' || mode === 'couple', isPhaLeDan2)} object-contain select-none transition-transform duration-700 ease-out ${p2ScaleClass} ${isP2SoldOut ? 'opacity-50 grayscale' : ''}`} referrerPolicy="no-referrer"  />
          {isP2SoldOut && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-red-600/90 text-white font-black text-sm sm:text-lg tracking-[0.2em] px-4 py-2 transform -rotate-12 border-2 border-red-500 shadow-2xl backdrop-blur-sm">
                {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col space-y-4">
      {mode === 'couple' || mode === 'double-sided' ? coupleView : galleryView}

      {/* Thumbnails */}
      {activeImages.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto py-2">
          {activeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (mode === 'double-sided') {
                  setCurrentIndex(idx);
                  setCurrentIndex2(idx);
                } else {
                  activeItem === 1 ? setCurrentIndex(idx) : setCurrentIndex2(idx);
                }
              }}
              className={`relative flex items-center justify-center flex-shrink-0 w-20 h-24 bg-[#F3F3F3] rounded-sm overflow-hidden border-2 transition-colors ${idx === safeIndex ? (activeItem === 1 ? 'border-[#00687A]' : 'border-[#E28C9A]') : 'border-transparent'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover scale-[1.2] select-none pointer-events-none origin-center" referrerPolicy="no-referrer"  />
            </button>
          ))}
        </div>
      )}


      {/* Fullscreen Overlay */}
      {isFullscreen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-[#F3F3F3]/95 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            setIsFullscreen(false);
            setIs3DMode(false);
            setIsTilted(false);
          }}
        >
          <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
            {(product.imagesTilted && !customization.selectedZodiacCharmId) && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsTilted(!isTilted); 
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-colors cursor-pointer ${isTilted ? 'bg-[#00687A] text-white hover:bg-[#005260]' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              >
                <span className="text-sm font-medium">
                  {isTilted ? (lang === 'vi' ? 'Góc Nghiêng' : 'Tilted View') : (lang === 'vi' ? 'Góc Thẳng' : 'Straight View')}
                </span>
              </button>
            )}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setIs3DMode(!is3DMode); 
                if (!is3DMode) {
                  setRotation({ x: 0, y: 0 });
                }
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-colors cursor-pointer ${is3DMode ? 'bg-[#00687A] text-white hover:bg-[#005260]' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
            >
              <Box className="w-5 h-5" />
              <span className="text-sm font-medium">3D Mode</span>
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setIsFullscreen(false); 
                setIs3DMode(false); 
                setIsTilted(false);
              }}
              className="p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          
          <div 
            className={`w-full h-full flex items-center justify-center relative ${is3DMode ? 'cursor-move' : ''}`}
            onClick={(e) => e.stopPropagation()} 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ perspective: '1000px', touchAction: 'none' }}
          >
            {is3DMode ? (
              <div 
                className="w-full h-full absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {/* Render multiple stacked images to create a fake 3D depth effect */}
                {[...Array(5)].map((_, i) => (
                  <img 
                    key={i}
                    src={getFullscreenImage()} 
                    alt={product.name} 
                    className={`w-full h-full absolute object-contain p-8 md:p-16 select-none pointer-events-none drop-shadow-2xl`}
                    referrerPolicy="no-referrer"
                    style={{
                      transform: `translateZ(${i * 5}px) scale(0.95)`,
                      opacity: i === 4 ? 1 : 0.4
                    }}
                   />
                ))}
              </div>
            ) : (
              <img 
                src={getFullscreenImage()} 
                alt={product.name} 
                className="w-full h-full object-contain p-8 md:p-16 select-none cursor-default transition-transform duration-100 ease-out"
                referrerPolicy="no-referrer"
               />
            )}
          </div>

          {is3DMode && (
            <div className="absolute bottom-12 w-full flex justify-center pointer-events-none">
              <div className="bg-black/50 text-white text-sm px-6 py-2 rounded-full backdrop-blur">
                Drag to rotate 3D view
              </div>
            </div>
          )}

          {activeImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all text-gray-800 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all text-gray-800 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator in Fullscreen */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {activeImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (mode === 'double-sided') {
                        setCurrentIndex(idx);
                        setCurrentIndex2(idx);
                      } else {
                        activeItem === 1 ? setCurrentIndex(idx) : setCurrentIndex2(idx);
                      }
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors shadow-sm cursor-pointer ${idx === safeIndex ? 'bg-[#00687A] scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
