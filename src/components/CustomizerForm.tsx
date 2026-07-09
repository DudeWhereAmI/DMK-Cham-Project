import React, { useState, useEffect } from 'react';
import { Product, ElementProfile, CustomizationState, BaseStyle, CharmItem, ElementType } from '../types';
import { checkIsInitiallySoldOut, checkIsSoldOut, checkIsCharmSoldOut } from '../lib/inventory';
import { ELEMENTS, BASE_STYLES, CHARMS, LETTERING_PRICING } from '../data';
import { ArrowLeft, Star } from 'lucide-react';

const toEnglishOnly = (str: string, maxLen: number): string => {
  if (!str) return '';
  
  // Convert Vietnamese accents to English equivalents
  let res = str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/đ/g, 'd');
    
  // Explicit mapping just in case normalize didn't catch everything or for safe fallback
  const map: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'đ': 'd'
  };
  
  let finalStr = '';
  for (let i = 0; i < res.length; i++) {
    const char = res[i];
    finalStr += map[char] || char;
  }

  // strip any remaining non-english-alphanumeric characters, including spaces
  return finalStr.replace(/[^a-z0-9]/g, '').slice(0, maxLen);
};

interface CustomizerFormProps {
  product: Product;
  customization: CustomizationState;
  onUpdate: (updater: Partial<CustomizationState>) => void;
  onBackToShop: () => void;
  onAddToCart: (quantity?: number) => void;
  onBuyNow?: (quantity?: number) => void;
  totalPrice: number;
  basePrice: number;
  lang?: 'vi' | 'en';
  mode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided';
  activeTab?: 'p1' | 'p2';
  onTabChange?: (tab: 'p1' | 'p2') => void;
}

export const CustomizerForm: React.FC<CustomizerFormProps> = ({
  product,
  customization,
  onUpdate,
  onBackToShop,
  onAddToCart,
  onBuyNow,
  totalPrice,
  basePrice,
  lang = 'en',
  mode = 'full',
  activeTab = 'p1',
  onTabChange,
}) => {
  const [isPersonaliseExpanded, setIsPersonaliseExpanded] = useState(mode !== 'full');
  const [warning, setWarning] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setQuantity(1);
  }, [product.id, mode]);

  const handleQuantityChange = (val: number) => {
    setQuantity(prev => Math.max(1, prev + val));
  };

  useEffect(() => {
    if (mode !== 'full') {
      setIsPersonaliseExpanded(true);
    }
  }, [mode]);

  // Find current element profile helper

  const currentElement = ELEMENTS.find((e) => e.type === customization.element) || ELEMENTS[0];

  const getUpdatedElementForStyle = (style: 'sticker' | 'embossed', color: string) => {
    const exactKey = `${style}-${color}`;
    const availableElements = product.imagesWithText?.[exactKey] ? Object.keys(product.imagesWithText[exactKey]) : [];
    if (availableElements.length > 0 && !availableElements.includes(customization.element)) {
      return availableElements[0];
    }
    return customization.element;
  };

  const getUpdatedPartnerElementForStyle = (style: 'sticker' | 'embossed', color: string) => {
    const exactKey = `${style}-${color}`;
    const availableElements = product.imagesWithText?.[exactKey] ? Object.keys(product.imagesWithText[exactKey]) : [];
    const currentPartner = customization.partnerElement || 'KIM';
    if (availableElements.length > 0 && !availableElements.includes(currentPartner)) {
      return availableElements[0];
    }
    return currentPartner;
  };

  const hasAddOns = !!(
    customization.letteringStyle ||
    customization.selectedZodiacCharmId ||
    (customization.selectedStickerIds && customization.selectedStickerIds.length > 0) ||
    customization.letteringStyle2 ||
    customization.selectedZodiacCharmId2 ||
    (customization.selectedStickerIds2 && customization.selectedStickerIds2.length > 0)
  );

  // Helper to format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Let's filter charms based on customization type
  const displayedCharms = CHARMS.filter((c) => {
    if (customization.customType === 'zodiac') {
      return c.category === 'zodiac';
    } else if (customization.customType === 'stickers') {
      return c.category === 'regular' || c.category === 'stone';
    }
    return false;
  });

  const toggleSticker = (id: string) => {
    const current = customization.selectedStickerIds || [];
    if (current.includes(id)) {
       onUpdate({ selectedStickerIds: current.filter(x => x !== id) });
       setWarning(null);
       return;
    }

    const maxCharms = customization.letteringStyle === 'embossed' ? 1 : 2;
    
    if (current.length < maxCharms) {
      onUpdate({ selectedStickerIds: [...current, id] });
      setWarning(null);
    } else {
      setWarning(lang === 'vi' ? `Bạn chỉ được chọn tối đa ${maxCharms} charm cho loại chữ này!` : `You can only select up to ${maxCharms} charms for this lettering style!`);
      // Auto-hide after 3.5 seconds
      setTimeout(() => setWarning(null), 3500);
    }
  };

  const toggleSticker2 = (id: string) => {
    const current = customization.selectedStickerIds2 || [];
    if (current.includes(id)) {
       onUpdate({ selectedStickerIds2: current.filter(x => x !== id) });
       setWarning(null);
       return;
    }

    const maxCharms = customization.letteringStyle2 === 'embossed' ? 1 : 2;
    
    if (current.length < maxCharms) {
      onUpdate({ selectedStickerIds2: [...current, id] });
      setWarning(null);
    } else {
      setWarning(lang === 'vi' ? `Bạn chỉ được chọn tối đa ${maxCharms} charm cho loại chữ này!` : `You can only select up to ${maxCharms} charms for this lettering style!`);
      // Auto-hide after 3.5 seconds
      setTimeout(() => setWarning(null), 3500);
    }
  };

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleAddToCartSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.reportValidity()) return;
    onAddToCart(quantity);
  };

  const handleBuyNowSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.reportValidity()) return;
    if (onBuyNow) {
      onBuyNow(quantity);
    } else {
      onAddToCart(quantity);
    }
  };

  return (
    <form ref={formRef} id="customizer-options" onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col justify-between min-h-full bg-white rounded-sm">
      <div className="space-y-6 lg:pb-16 px-6 pt-6">
        
        {/* Product Header */}
        <div>
          <button 
            type="button"
            onClick={onBackToShop}
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold text-[#990000] hover:text-[#990000]/80 transition mb-4 uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{lang === 'vi' ? 'Quay Lại' : 'Back'}</span>
          </button>

          <p className="text-[10px] font-black text-[#990000] tracking-wider uppercase mb-1.5">
            {lang === 'vi' ? 'SẢN PHẨM BÁN CHẠY' : 'BEST SELLER'}
          </p>
          
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-medium text-[#00687A] leading-tight flex-1">
              {(() => {
                let pName = lang === 'vi' ? product.vietnameseName : product.name;
                if (customization.comboId === 'couple_combo') {
                  return lang === 'vi' ? `Combo Chạm Cùng Nhau (${pName})` : `Couple Combo (${pName})`;
                } else if (customization.comboId === 'mirror_combo') {
                  return lang === 'vi' ? `Combo Chạm Ánh Nhìn (${pName} & Gương)` : `Mirror Combo (${pName} & Mirror)`;
                }
                return pName;
              })()}
            </h1>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-sm p-1 select-none shrink-0 shadow-xs">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-200/50 rounded-sm transition cursor-pointer text-base font-bold"
              >
                -
              </button>
              <span className="text-xs font-bold text-gray-800 min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-200/50 rounded-sm transition cursor-pointer text-base font-bold"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <p className="text-lg md:text-xl font-bold text-[#00687A]">
              {formatVND(basePrice * quantity)}
            </p>
          </div>

          {/* Mock Reviews */}
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-600 underline cursor-pointer">
            <div className="flex text-black">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span>{lang === 'vi' ? '0 Đánh giá' : '0 Reviews'}</span>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200/60" />

        {mode === 'couple' && (
          <div className="flex gap-1.5 p-1 bg-gray-100 rounded-sm mb-4">
            <button
              type="button"
              onClick={() => onTabChange?.('p1')}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-sm transition-all cursor-pointer ${
                activeTab === 'p1'
                  ? 'bg-white text-[#00687A] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {lang === 'vi' ? 'Sản Phẩm 1' : 'Product 1'}
            </button>
            <button
              type="button"
              onClick={() => onTabChange?.('p2')}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-sm transition-all cursor-pointer ${
                activeTab === 'p2'
                  ? 'bg-white text-[#00687A] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {lang === 'vi' ? 'Sản Phẩm 2' : 'Product 2'}
            </button>
          </div>
        )}

        {/* 1. SECTOR COLOR & NGŨ HÀNH SWATCH SELECTOR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block">
              {lang === 'vi' ? '1. MÀU BẢN MỆNH NGŨ HÀNH' : '1. ELEMENT COLOR (NGŨ HÀNH)'}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-[#00687A] text-[9px] font-bold uppercase rounded-sm border border-gray-200">
              {lang === 'vi' 
                ? (activeTab === 'p1' ? currentElement.nameVi : (customization.partnerElement ? ELEMENTS.find(e => e.type === customization.partnerElement)?.nameVi : '?'))
                : (activeTab === 'p1' ? currentElement.nameEn : (customization.partnerElement ? ELEMENTS.find(e => e.type === customization.partnerElement)?.nameEn : '?'))}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {ELEMENTS.map((el) => {
              const isP1 = activeTab === 'p1' || mode !== 'couple';
              const worksAsActive = isP1 ? customization.element === el.type : customization.partnerElement === el.type;
              
              const productCategory = isP1 ? product.category : (customization.comboId === 'mirror_combo' ? 'mirror' : product.category);
              const isElementSoldOut = checkIsSoldOut(productCategory, el.type);
              
              return (
                <button
                  key={isP1 ? el.type : `partner-${el.type}`}
                  type="button"
                  onClick={() => {
                    if (isElementSoldOut) return;
                    isP1 ? onUpdate({ element: el.type }) : onUpdate({ partnerElement: el.type });
                  }}
                  className={`relative flex flex-col items-center justify-center p-2 border transition-all duration-200 cursor-pointer rounded-sm ${
                    isElementSoldOut
                      ? 'opacity-30 cursor-not-allowed border-slate-100 bg-gray-50'
                      : worksAsActive 
                        ? 'border-[#00687A] bg-[#00687A]/5' 
                        : 'border-slate-200 bg-transparent hover:border-[#00687A] hover:bg-[#00687A]/5'
                  }`}
                  disabled={isElementSoldOut}
                >
                  <span 
                    className="w-5 h-5 rounded-full shadow-sm mb-1 border border-slate-200"
                    style={{ backgroundColor: el.colorHex }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-tight text-gray-800">
                    {el.type}
                  </span>
                  {isElementSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-red-500/50 rotate-45" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200/60" />

        {/* Accordion List for Personalization */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00687A] transition-colors">
              {lang === 'vi' ? 'CÁ NHÂN HÓA SẢN PHẨM - TÙY CHỌN' : 'PERSONALISE YOUR ITEM - OPTIONAL'}
            </h3>
            <p className="text-[13px] text-gray-600 mt-1">
              {lang === 'vi' ? 'Tùy chỉnh sản phẩm hoặc tạo ra món quà hoàn hảo nhất.' : 'Personalise your item or create the perfect gift.'}
            </p>
          </div>
          
          {!isPersonaliseExpanded ? (
            <button 
              type="button"
              onClick={() => setIsPersonaliseExpanded(true)}
              className="w-full py-3.5 bg-[#B09B8B] hover:bg-[#A08B7B] transition-colors text-white font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 rounded-sm cursor-pointer"
            >
              <span>{lang === 'vi' ? 'THIẾT KẾ PHIÊN BẢN CỦA BẠN' : 'GET YOUR BESPOKE ITEM'}</span>
              <span className="text-lg leading-none">&rarr;</span>
            </button>
          ) : (
            <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
              
              {/* 2. ENGRAVING TEXT & FONT STYLE */}
              {(mode === 'full' || mode === 'font-only' || mode === 'couple' || mode === 'double-sided') && (
              <div className="space-y-4">
                {mode === 'couple' ? (
                  <>
                    {/* PRODUCT 1 ENGRAVING */}
                    <div className={activeTab === 'p2' ? 'hidden' : `p-3 bg-gray-50/50 border border-gray-100 rounded-sm ${product.category === 'mirror' && !!customization.selectedZodiacCharmId ? 'opacity-50 pointer-events-none' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                        {lang === 'vi' ? '2. KHẮC TÊN' : '2. ENGRAVING'}
                        {customization.letteringStyle && ` (+${formatVND(LETTERING_PRICING[customization.letteringStyle])})`}
                      </span>
                      
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={customization.letteringStyle === 'embossed' ? 6 : 8}
                          value={customization.text}
                          onChange={(e) => {
                            const maxLen = customization.letteringStyle === 'embossed' ? 6 : 8;
                            const cleaned = toEnglishOnly(e.target.value, maxLen);
                            onUpdate({ text: cleaned });
                          }}
                          placeholder={lang === 'vi' ? 'nhập tên (không dấu)' : 'enter name'}
                          disabled={!customization.letteringStyle}
                          required={!!customization.letteringStyle}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          inputMode="url"
                          className={`w-full px-4 py-3 bg-white border rounded-sm lowercase tracking-wider text-sm font-bold placeholder:text-gray-400 placeholder:uppercase focus:outline-none transition-colors ${
                            !customization.letteringStyle 
                              ? 'opacity-50 cursor-not-allowed border-gray-200' 
                              : 'border-gray-200 focus:border-[#00687A]'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                          {(customization.text || '').length}/{customization.letteringStyle === 'embossed' ? 6 : 8}
                        </span>
                      </div>

                      {/* Font selector for Prod 1 */}
                      <div className="mt-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                          {lang === 'vi' ? 'CHỌN FONT CHỮ & MÀU SẮC' : 'SELECT FONT STYLE & COLOR'}
                        </span>
                        <details className="group border border-gray-200 bg-white rounded-sm">
                          <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                            <span>
                              {(() => {
                                if (!customization.letteringStyle) {
                                  return lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING';
                                }
                                const styleLabel = customization.letteringStyle === 'sticker'
                                  ? (lang === 'vi' ? 'CHỮ DÁN' : 'FLAT STICKER')
                                  : (lang === 'vi' ? 'CHỮ NỔI' : '3D EMBOSSED');
                                const colorLabel = customization.textStyleOption === 'silver' ? (lang === 'vi' ? 'MÀU BẠC' : 'SILVER')
                                                 : customization.textStyleOption === 'gold' ? (lang === 'vi' ? 'MÀU VÀNG' : 'GOLD')
                                                 : customization.textStyleOption === 'white' ? (lang === 'vi' ? 'MÀU TRẮNG' : 'WHITE')
                                                 : customization.textStyleOption === 'pink' ? (lang === 'vi' ? 'MÀU HỒNG' : 'PINK')
                                                 : (lang === 'vi' ? 'CHƯA CHỌN MÀU' : 'COLOR NOT SELECTED');
                                return `${styleLabel} - ${colorLabel}`;
                              })()}
                            </span>
                            <span className="transition group-open:rotate-180">
                              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                            </span>
                          </summary>
                          
                          <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                            {/* WITHOUT LETTERING */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={!customization.letteringStyle} 
                                onChange={() => onUpdate({ letteringStyle: undefined, text: '', textStyleOption: undefined })} 
                              />
                              <div className="w-5 h-5 rounded-full border border-dashed border-gray-400 flex items-center justify-center text-gray-400 text-[10px] font-bold">✕</div>
                              <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING'}</span>
                              {(!customization.letteringStyle) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>

                            {/* 3D EMBOSSED - WHITE */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={customization.letteringStyle === 'embossed' && customization.textStyleOption === 'white'} 
                                onChange={() => onUpdate({ 
                                  letteringStyle: 'embossed', 
                                  text: (customization.text || '').slice(0, 6), 
                                  selectedStickerIds: (customization.selectedStickerIds || []).slice(0, 1),
                                  textStyleOption: 'white',
                                  element: getUpdatedElementForStyle('embossed', 'white') as ElementType
                                })} 
                              />
                              <div className="w-5 h-5 rounded-sm bg-white border border-gray-300 shadow-[1px_1px_0px_#ccc] flex items-center justify-center text-[10px] font-black text-gray-700">A</div>
                              <div className="flex flex-col flex-1">
                                <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU TRẮNG' : '3D EMBOSSED - WHITE'}</span>
                                <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                              </div>
                              {(customization.letteringStyle === 'embossed' && customization.textStyleOption === 'white') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>

                            {/* 3D EMBOSSED - PINK */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={customization.letteringStyle === 'embossed' && customization.textStyleOption === 'pink'} 
                                onChange={() => onUpdate({ 
                                  letteringStyle: 'embossed', 
                                  text: (customization.text || '').slice(0, 6), 
                                  selectedStickerIds: (customization.selectedStickerIds || []).slice(0, 1),
                                  textStyleOption: 'pink',
                                  element: getUpdatedElementForStyle('embossed', 'pink') as ElementType
                                })} 
                              />
                              <div className="w-5 h-5 rounded-sm bg-pink-100 border border-pink-300 shadow-[1px_1px_0px_#db2777] flex items-center justify-center text-[10px] font-black text-pink-600">A</div>
                              <div className="flex flex-col flex-1">
                                <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU HỒNG' : '3D EMBOSSED - PINK'}</span>
                                <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                              </div>
                              {(customization.letteringStyle === 'embossed' && customization.textStyleOption === 'pink') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>
                            {product.category !== 'mirror' && (
                              <>
                                {/* FLAT STICKER - SILVER */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle === 'sticker' && customization.textStyleOption === 'silver'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle: 'sticker', 
                                      text: (customization.text || '').slice(0, 8), 
                                      textStyleOption: 'silver',
                                      element: getUpdatedElementForStyle('sticker', 'silver') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 border border-gray-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU BẠC' : 'FLAT STICKER - SILVER'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle === 'sticker' && customization.textStyleOption === 'silver') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>

                                {/* FLAT STICKER - GOLD */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle === 'sticker' && customization.textStyleOption === 'gold'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle: 'sticker', 
                                      text: (customization.text || '').slice(0, 8), 
                                      textStyleOption: 'gold',
                                      element: getUpdatedElementForStyle('sticker', 'gold') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU VÀNG' : 'FLAT STICKER - GOLD'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle === 'sticker' && customization.textStyleOption === 'gold') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>
                              </>
                            )}
                          </div>
                        </details>
                      </div>
                    </div>

                    {/* PRODUCT 2 ENGRAVING */}
                    <div className={activeTab === 'p1' ? 'hidden' : `p-3 bg-gray-50/50 border border-gray-100 rounded-sm ${mode === 'couple' && customization.comboId === 'mirror_combo' && !!customization.selectedZodiacCharmId2 ? 'opacity-50 pointer-events-none' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                        {lang === 'vi' ? '2. KHẮC TÊN' : '2. ENGRAVING'}
                        {customization.letteringStyle2 && ` (+${formatVND(LETTERING_PRICING[customization.letteringStyle2])})`}
                      </span>
                      
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={customization.letteringStyle2 === 'embossed' ? 6 : 8}
                          value={customization.text2 || ''}
                          onChange={(e) => {
                            const maxLen = customization.letteringStyle2 === 'embossed' ? 6 : 8;
                            const cleaned = toEnglishOnly(e.target.value, maxLen);
                            onUpdate({ text2: cleaned });
                          }}
                          placeholder={lang === 'vi' ? 'nhập tên (không dấu)' : 'enter name'}
                          disabled={!customization.letteringStyle2}
                          required={!!customization.letteringStyle2}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          inputMode="url"
                          className={`w-full px-4 py-3 bg-white border rounded-sm lowercase tracking-wider text-sm font-bold placeholder:text-gray-400 placeholder:uppercase focus:outline-none transition-colors ${
                            !customization.letteringStyle2 
                              ? 'opacity-50 cursor-not-allowed border-gray-200' 
                              : 'border-gray-200 focus:border-[#00687A]'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                          {(customization.text2 || '').length}/{customization.letteringStyle2 === 'embossed' ? 6 : 8}
                        </span>
                      </div>

                      {/* Font selector for Prod 2 */}
                      <div className="mt-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                          {lang === 'vi' ? 'CHỌN FONT CHỮ & MÀU SẮC' : 'SELECT FONT STYLE & COLOR'}
                        </span>
                        <details className="group border border-gray-200 bg-white rounded-sm">
                          <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                            <span>
                              {(() => {
                                if (!customization.letteringStyle2) {
                                  return lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING';
                                }
                                const styleLabel = customization.letteringStyle2 === 'sticker'
                                  ? (lang === 'vi' ? 'CHỮ DÁN' : 'FLAT STICKER')
                                  : (lang === 'vi' ? 'CHỮ NỔI' : '3D EMBOSSED');
                                const colorLabel = customization.textStyleOption2 === 'silver' ? (lang === 'vi' ? 'MÀU BẠC' : 'SILVER')
                                                 : customization.textStyleOption2 === 'gold' ? (lang === 'vi' ? 'MÀU VÀNG' : 'GOLD')
                                                 : customization.textStyleOption2 === 'white' ? (lang === 'vi' ? 'MÀU TRẮNG' : 'WHITE')
                                                 : customization.textStyleOption2 === 'pink' ? (lang === 'vi' ? 'MÀU HỒNG' : 'PINK')
                                                 : (lang === 'vi' ? 'CHƯA CHỌN MÀU' : 'COLOR NOT SELECTED');
                                return `${styleLabel} - ${colorLabel}`;
                              })()}
                            </span>
                            <span className="transition group-open:rotate-180">
                              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                            </span>
                          </summary>
                          
                          <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                            {/* WITHOUT LETTERING */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={!customization.letteringStyle2} 
                                onChange={() => onUpdate({ letteringStyle2: undefined, text2: '', textStyleOption2: undefined })} 
                              />
                              <div className="w-5 h-5 rounded-full border border-dashed border-gray-400 flex items-center justify-center text-gray-400 text-[10px] font-bold">✕</div>
                              <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING'}</span>
                              {(!customization.letteringStyle2) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>

                            {/* 3D EMBOSSED - WHITE */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={customization.letteringStyle2 === 'embossed' && customization.textStyleOption2 === 'white'} 
                                onChange={() => onUpdate({ 
                                  letteringStyle2: 'embossed', 
                                  text2: (customization.text2 || '').slice(0, 6), 
                                  selectedStickerIds2: (customization.selectedStickerIds2 || []).slice(0, 1),
                                  textStyleOption2: 'white',
                                  partnerElement: getUpdatedPartnerElementForStyle('embossed', 'white') as ElementType
                                })} 
                              />
                              <div className="w-5 h-5 rounded-sm bg-white border border-gray-300 shadow-[1px_1px_0px_#ccc] flex items-center justify-center text-[10px] font-black text-gray-700">A</div>
                              <div className="flex flex-col flex-1">
                                <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU TRẮNG' : '3D EMBOSSED - WHITE'}</span>
                                <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                              </div>
                              {(customization.letteringStyle2 === 'embossed' && customization.textStyleOption2 === 'white') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>

                            {/* 3D EMBOSSED - PINK */}
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={customization.letteringStyle2 === 'embossed' && customization.textStyleOption2 === 'pink'} 
                                onChange={() => onUpdate({ 
                                  letteringStyle2: 'embossed', 
                                  text2: (customization.text2 || '').slice(0, 6), 
                                  selectedStickerIds2: (customization.selectedStickerIds2 || []).slice(0, 1),
                                  textStyleOption2: 'pink',
                                  partnerElement: getUpdatedPartnerElementForStyle('embossed', 'pink') as ElementType
                                })} 
                              />
                              <div className="w-5 h-5 rounded-sm bg-pink-100 border border-pink-300 shadow-[1px_1px_0px_#db2777] flex items-center justify-center text-[10px] font-black text-pink-600">A</div>
                              <div className="flex flex-col flex-1">
                                <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU HỒNG' : '3D EMBOSSED - PINK'}</span>
                                <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                              </div>
                              {(customization.letteringStyle2 === 'embossed' && customization.textStyleOption2 === 'pink') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>
                            {customization.comboId !== 'mirror_combo' && (
                              <>
                                {/* FLAT STICKER - SILVER */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle2 === 'sticker' && customization.textStyleOption2 === 'silver'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle2: 'sticker', 
                                      text2: (customization.text2 || '').slice(0, 8), 
                                      textStyleOption2: 'silver',
                                      partnerElement: getUpdatedPartnerElementForStyle('sticker', 'silver') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 border border-gray-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU BẠC' : 'FLAT STICKER - SILVER'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle2 === 'sticker' && customization.textStyleOption2 === 'silver') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>

                                {/* FLAT STICKER - GOLD */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle2 === 'sticker' && customization.textStyleOption2 === 'gold'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle2: 'sticker', 
                                      text2: (customization.text2 || '').slice(0, 8), 
                                      textStyleOption2: 'gold',
                                      partnerElement: getUpdatedPartnerElementForStyle('sticker', 'gold') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU VÀNG' : 'FLAT STICKER - GOLD'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle2 === 'sticker' && customization.textStyleOption2 === 'gold') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>
                              </>
                            )}
                          </div>
                        </details>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                      {mode === 'font-only'
                        ? (lang === 'vi' ? `2. TÊN (+${formatVND(LETTERING_PRICING[customization.letteringStyle || 'sticker'])})` : `2. NAME (+${formatVND(LETTERING_PRICING[customization.letteringStyle || 'sticker'])})`)
                        : (lang === 'vi' ? `2. TÊN${customization.letteringStyle ? ` (+${formatVND(LETTERING_PRICING[customization.letteringStyle])})` : ''}` : `2. NAME${customization.letteringStyle ? ` (+${formatVND(LETTERING_PRICING[customization.letteringStyle])})` : ''}`)}
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={customization.letteringStyle === 'embossed' ? 6 : 8}
                        value={customization.text}
                        onChange={(e) => {
                          const maxLen = customization.letteringStyle === 'embossed' ? 6 : 8;
                          const cleaned = toEnglishOnly(e.target.value, maxLen);
                          onUpdate({ text: cleaned });
                        }}
                        placeholder={lang === 'vi' ? 'nhập tên (không dấu)' : 'enter name'}
                        disabled={!customization.letteringStyle}
                        required={!!customization.letteringStyle}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="url"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-sm lowercase tracking-wider text-sm font-bold placeholder:text-gray-400 placeholder:uppercase focus:outline-none transition-colors ${
                          !customization.letteringStyle 
                            ? 'opacity-50 cursor-not-allowed border-gray-200' 
                            : 'border-gray-200 focus:border-[#00687A]'
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                        {(customization.text || '').length}/{customization.letteringStyle === 'embossed' ? 6 : 8}
                      </span>
                    </div>

                    {/* Lettering style */}
                    <div className="mt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                        {lang === 'vi' ? 'CHỌN FONT CHỮ & MÀU SẮC' : 'SELECT FONT STYLE & COLOR'}
                      </span>
                      <details className="group border border-gray-200 bg-white rounded-sm">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                          <span>
                            {(() => {
                              if (!customization.letteringStyle) {
                                return lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING';
                              }
                              const styleLabel = customization.letteringStyle === 'sticker'
                                ? (lang === 'vi' ? 'CHỮ DÁN' : 'FLAT STICKER')
                                : (lang === 'vi' ? 'CHỮ NỔI' : '3D EMBOSSED');
                              const colorLabel = customization.textStyleOption === 'silver' ? (lang === 'vi' ? 'MÀU BẠC' : 'SILVER')
                                               : customization.textStyleOption === 'gold' ? (lang === 'vi' ? 'MÀU VÀNG' : 'GOLD')
                                               : customization.textStyleOption === 'white' ? (lang === 'vi' ? 'MÀU TRẮNG' : 'WHITE')
                                               : customization.textStyleOption === 'pink' ? (lang === 'vi' ? 'MÀU HỒNG' : 'PINK')
                                               : (lang === 'vi' ? 'CHƯA CHỌN MÀU' : 'COLOR NOT SELECTED');
                              return `${styleLabel} - ${colorLabel}`;
                            })()}
                          </span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                        </summary>
                        
                        <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                          {/* WITHOUT LETTERING */}
                          <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                            <input 
                              type="radio" 
                              className="hidden" 
                              checked={!customization.letteringStyle} 
                              onChange={() => onUpdate({ letteringStyle: undefined, text: '', textStyleOption: undefined })} 
                            />
                            <div className="w-5 h-5 rounded-full border border-dashed border-gray-400 flex items-center justify-center text-gray-400 text-[10px] font-bold">✕</div>
                            <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHỮ' : 'WITHOUT LETTERING'}</span>
                            {(!customization.letteringStyle) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                          </label>

                            {/* 3D EMBOSSED - WHITE */}
                          <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                            <input 
                              type="radio" 
                              className="hidden" 
                              checked={customization.letteringStyle === 'embossed' && customization.textStyleOption === 'white'} 
                              onChange={() => onUpdate({ 
                                letteringStyle: 'embossed', 
                                text: (customization.text || '').slice(0, 6), 
                                selectedStickerIds: (customization.selectedStickerIds || []).slice(0, 1),
                                textStyleOption: 'white',
                                element: getUpdatedElementForStyle('embossed', 'white') as ElementType
                              })} 
                            />
                            <div className="w-5 h-5 rounded-sm bg-white border border-gray-300 shadow-[1px_1px_0px_#ccc] flex items-center justify-center text-[10px] font-black text-gray-700">A</div>
                            <div className="flex flex-col flex-1">
                              <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU TRẮNG' : '3D EMBOSSED - WHITE'}</span>
                              <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                            </div>
                            {(customization.letteringStyle === 'embossed' && customization.textStyleOption === 'white') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                          </label>

                          {/* 3D EMBOSSED - PINK */}
                          <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                            <input 
                              type="radio" 
                              className="hidden" 
                              checked={customization.letteringStyle === 'embossed' && customization.textStyleOption === 'pink'} 
                              onChange={() => onUpdate({ 
                                letteringStyle: 'embossed', 
                                text: (customization.text || '').slice(0, 6), 
                                selectedStickerIds: (customization.selectedStickerIds || []).slice(0, 1),
                                textStyleOption: 'pink',
                                element: getUpdatedElementForStyle('embossed', 'pink') as ElementType
                              })} 
                            />
                            <div className="w-5 h-5 rounded-sm bg-pink-100 border border-pink-300 shadow-[1px_1px_0px_#db2777] flex items-center justify-center text-[10px] font-black text-pink-600">A</div>
                            <div className="flex flex-col flex-1">
                              <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ NỔI - MÀU HỒNG' : '3D EMBOSSED - PINK'}</span>
                              <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['embossed'])})</span>
                            </div>
                            {(customization.letteringStyle === 'embossed' && customization.textStyleOption === 'pink') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                          </label>
                            {product.category !== 'mirror' && (
                              <>
                                {/* FLAT STICKER - SILVER */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle === 'sticker' && customization.textStyleOption === 'silver'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle: 'sticker', 
                                      text: (customization.text || '').slice(0, 8), 
                                      textStyleOption: 'silver',
                                      element: getUpdatedElementForStyle('sticker', 'silver') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 border border-gray-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU BẠC' : 'FLAT STICKER - SILVER'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle === 'sticker' && customization.textStyleOption === 'silver') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>

                                {/* FLAT STICKER - GOLD */}
                                <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                  <input 
                                    type="radio" 
                                    className="hidden" 
                                    checked={customization.letteringStyle === 'sticker' && customization.textStyleOption === 'gold'} 
                                    onChange={() => onUpdate({ 
                                      letteringStyle: 'sticker', 
                                      text: (customization.text || '').slice(0, 8), 
                                      textStyleOption: 'gold',
                                      element: getUpdatedElementForStyle('sticker', 'gold') as ElementType
                                    })} 
                                  />
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border border-amber-300" />
                                  <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? 'CHỮ DÁN - MÀU VÀNG' : 'FLAT STICKER - GOLD'}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(LETTERING_PRICING['sticker'])})</span>
                                  </div>
                                  {(customization.letteringStyle === 'sticker' && customization.textStyleOption === 'gold') && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                </label>
                              </>
                            )}
                        </div>
                      </details>
                    </div>
                  </>
                )}
              </div>
              )}

              {/* 3. SELECTION DYNAMIC CHARMS / ORNAMENTS */}
              <div className="pt-2 space-y-4">
                
                {/* CHARM - ZODIAC */}
                {(mode === 'full' || mode === 'charm-only' || mode === 'couple' || mode === 'double-sided') && (
                <div>
                  {mode === 'couple' ? (
                    <div className="space-y-4">
                      {/* PRODUCT 1 CHARM */}
                      <div className={activeTab === 'p2' ? 'hidden' : `block ${product.category === 'mirror' && !!customization.letteringStyle ? 'opacity-50 pointer-events-none' : ''}`}>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                          {lang === 'vi' ? '3. CHARM' : '3. CHARM'}
                        </span>
                        <details className="group border border-gray-200 bg-white rounded-sm">
                          <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                            <span>
                              {(() => {
                                const selected = CHARMS.find(c => c.id === customization.selectedZodiacCharmId);
                                if (selected) {
                                  return `${lang === 'vi' ? '': ''} ${lang === 'vi' ? selected.vietnameseName : selected.name}`;
                                }
                                return lang === 'vi' ? 'CHỌN CHARM' : 'CHOOSE CHARM';
                              })()}
                            </span>
                            <span className="transition group-open:rotate-180">
                              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                            </span>
                          </summary>
                          <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col max-h-60 overflow-y-auto">
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                               <input type="radio" className="hidden" checked={!customization.selectedZodiacCharmId} onChange={() => onUpdate({ selectedZodiacCharmId: '' })} />
                               <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHARM' : 'WITHOUT CHARM'}</span>
                               {(!customization.selectedZodiacCharmId) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>
                            {CHARMS.filter(c => c.category === 'zodiac').map((charm) => {
                               const isSoldOut = charm.element && checkIsCharmSoldOut(charm.element);
                               return (
                               <label key={`p1-${charm.id}`} className={`flex items-center gap-3 p-2.5 border-b border-gray-200/50 ${isSoldOut ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-100'}`}>
                                 <input type="radio" disabled={!!isSoldOut} className="hidden" checked={customization.selectedZodiacCharmId === charm.id} onChange={() => onUpdate({ selectedZodiacCharmId: charm.id, ...(charm.element ? { element: charm.element } : {}) })} />
                                 {charm.imageUrl ? (
                                   <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative">
                                     <img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.5] hover:scale-[1.75] transition-transform duration-300"  referrerPolicy="no-referrer"  loading="lazy" />
                                     {isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}
                                   </div>
                                 ) : <span className="text-3xl relative">{charm.emoji}{isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}</span>}
                                 <div className="flex flex-col flex-1">
                                   <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                                   <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(charm.priceModifier)})</span>
                                 </div>
                                 {(customization.selectedZodiacCharmId === charm.id) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                               </label>
                             )})}
                          </div>
                        </details>
                      </div>

                      {/* PRODUCT 2 CHARM */}
                      <div className={activeTab === 'p1' ? 'hidden' : `block mt-4 ${mode === 'couple' && customization.comboId === 'mirror_combo' && !!customization.letteringStyle2 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                          {lang === 'vi' ? '3. CHARM' : '3. CHARM'}
                        </span>
                        <details className="group border border-gray-200 bg-white rounded-sm">
                          <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                            <span>
                              {(() => {
                                const selected = CHARMS.find(c => c.id === customization.selectedZodiacCharmId2);
                                if (selected) {
                                  return `${lang === 'vi' ? '': ''} ${lang === 'vi' ? selected.vietnameseName : selected.name}`;
                                }
                                return lang === 'vi' ? 'CHỌN CHARM' : 'CHOOSE CHARM';
                              })()}
                            </span>
                            <span className="transition group-open:rotate-180">
                              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                            </span>
                          </summary>
                          <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col max-h-60 overflow-y-auto">
                            <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                               <input type="radio" className="hidden" checked={!customization.selectedZodiacCharmId2} onChange={() => onUpdate({ selectedZodiacCharmId2: '' })} />
                               <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHARM' : 'WITHOUT CHARM'}</span>
                               {(!customization.selectedZodiacCharmId2) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                            </label>
                            {CHARMS.filter(c => c.category === 'zodiac').map((charm) => {
                               const isSoldOut = charm.element && checkIsCharmSoldOut(charm.element);
                               return (
                               <label key={`p2-${charm.id}`} className={`flex items-center gap-3 p-2.5 border-b border-gray-200/50 ${isSoldOut ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-100'}`}>
                                 <input type="radio" disabled={!!isSoldOut} className="hidden" checked={customization.selectedZodiacCharmId2 === charm.id} onChange={() => onUpdate({ selectedZodiacCharmId2: charm.id, ...(charm.element ? { partnerElement: charm.element } : {}) })} />
                                 {charm.imageUrl ? (
                                   <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative">
                                     <img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.5] hover:scale-[1.75] transition-transform duration-300"  referrerPolicy="no-referrer"  loading="lazy" />
                                     {isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}
                                   </div>
                                 ) : <span className="text-3xl relative">{charm.emoji}{isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}</span>}
                                 <div className="flex flex-col flex-1">
                                   <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                                   <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(charm.priceModifier)})</span>
                                 </div>
                                 {(customization.selectedZodiacCharmId2 === charm.id) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                               </label>
                             )})}
                          </div>
                        </details>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                         {mode === 'charm-only' 
                           ? (lang === 'vi' ? '2. CHỌN CHARM' : '2. CHOOSE CHARM')
                           : (lang === 'vi' ? '3. CHARM' : '3. CHARM')}
                      </span>
                      <details className="group border border-gray-200 bg-white rounded-sm">
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                          <span>
                            {(() => {
                              const selected = CHARMS.find(c => c.id === customization.selectedZodiacCharmId);
                              if (selected) {
                                return `${lang === 'vi' ? 'ĐÃ CHỌN: ' : 'SELECTED: '} ${lang === 'vi' ? selected.vietnameseName : selected.name}`;
                              }
                              return lang === 'vi' ? 'CHỌN CHARM' : 'CHOOSE CHARM';
                            })()}
                          </span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                        </summary>
                        <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                          <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                             <input type="radio" className="hidden" checked={!customization.selectedZodiacCharmId} onChange={() => onUpdate({ selectedZodiacCharmId: '' })} />
                             <span className="font-bold text-xs uppercase flex-1">{lang === 'vi' ? 'KHÔNG CHỌN CHARM' : 'WITHOUT CHARM'}</span>
                             {(!customization.selectedZodiacCharmId) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                          </label>
                          {CHARMS.filter(c => c.category === 'zodiac').map((charm) => {
                             const isSoldOut = charm.element && checkIsCharmSoldOut(charm.element);
                             return (
                             <label key={charm.id} className={`flex items-center gap-3 p-2.5 border-b border-gray-200/50 ${isSoldOut ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-100'}`}>
                               <input type="radio" disabled={!!isSoldOut} className="hidden" checked={customization.selectedZodiacCharmId === charm.id} onChange={() => onUpdate({ selectedZodiacCharmId: charm.id, ...(charm.element ? { element: charm.element } : {}) })} />
                               {charm.imageUrl ? (
                                 <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative">
                                   <img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.5] hover:scale-[1.75] transition-transform duration-300"  referrerPolicy="no-referrer"  loading="lazy" />
                                   {isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}
                                 </div>
                               ) : <span className="text-3xl relative">{charm.emoji}{isSoldOut && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-red-500/50 rotate-45" /></div>}</span>}
                               <div className="flex flex-col flex-1">
                                 <span className="font-bold text-xs uppercase text-gray-800">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                                 <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(charm.priceModifier)})</span>
                               </div>
                               {(customization.selectedZodiacCharmId === charm.id) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                             </label>
                           )})}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
                )}

                {/* DECORATIONS */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                     {lang === 'vi' ? '4. TRANG TRÍ - TÙY CHỌN' : '4. DECORATIONS - OPTIONAL'}
                  </span>
                  
                   <div className="space-y-2">
                     {(() => {
                       const isCurrentlyClip = (() => {
                         if (mode === 'couple') {
                           if (activeTab === 'p1') {
                             return product.category !== 'mirror';
                           } else {
                             return customization.comboId !== 'mirror_combo';
                           }
                         }
                         return product.category !== 'mirror';
                       })();

                       const currentLetteringStyle = (mode === 'couple' && activeTab === 'p2')
                         ? customization.letteringStyle2
                         : customization.letteringStyle;

                       const groups = [];

                       if (!currentLetteringStyle || currentLetteringStyle === 'embossed') {
                         groups.push({
                           id: isCurrentlyClip ? 'bow-small' : 'bow-big',
                           labelVi: isCurrentlyClip ? 'STICKER NỔI (NƠ NHỎ)' : 'STICKER NỔI (NƠ TO)',
                           labelEn: isCurrentlyClip ? 'EMBOSSED STICKERS (SMALL BOW)' : 'EMBOSSED STICKERS (BIG BOW)'
                         });
                       }

                       if (isCurrentlyClip && (!currentLetteringStyle || currentLetteringStyle === 'sticker')) {
                         groups.push({
                           id: 'sticker-deco',
                           labelVi: 'STICKER DÁN',
                           labelEn: 'STICKERS'
                         });
                       }

                       return groups.map(group => {
                         const groupCharms = CHARMS.filter(c => c.category === group.id);
                         if (groupCharms.length === 0) return null;
                         return (
                           <details key={group.id} className="group border border-gray-200 bg-white rounded-sm">
                             <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                               <span>
                                 {(() => {
                                   const activeStickers = (mode === 'couple' && activeTab === 'p2')
                                     ? (customization.selectedStickerIds2 || [])
                                     : (customization.selectedStickerIds || []);
                                   const selectedInGroup = groupCharms.filter(c => activeStickers.includes(c.id));
                                   const groupLabel = lang === 'vi' ? group.labelVi : group.labelEn;
                                   return selectedInGroup.length > 0 
                                     ? `${groupLabel} (${selectedInGroup.map(c => lang === 'vi' ? c.vietnameseName : c.name).join(', ')})`
                                     : groupLabel;
                                 })()}
                               </span>
                               <span className="transition group-open:rotate-180">
                                 <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                               </span>
                             </summary>
                             <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                               {groupCharms.map((charm) => {
                                  const activeStickers = (mode === 'couple' && activeTab === 'p2')
                                    ? (customization.selectedStickerIds2 || [])
                                    : (customization.selectedStickerIds || []);
                                  const isSelected = activeStickers.includes(charm.id);
                                  return (
                                    <label key={charm.id} className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                      <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={isSelected} 
                                        onChange={() => (mode === 'couple' && activeTab === 'p2') ? toggleSticker2(charm.id) : toggleSticker(charm.id)} 
                                      />
                                      {charm.imageUrl ? (
                                        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden"><img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.75] hover:scale-[2] transition-transform duration-300"  referrerPolicy="no-referrer"  loading="lazy" /></div>
                                      ) : <span className="text-4xl">{charm.emoji}</span>}
                                      <div className="flex flex-col flex-1">
                                        <span className="font-bold text-xs uppercase">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                                        {/* Tạm thời miễn phí, ko display giá */}
                                      </div>
                                      {isSelected && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                    </label>
                                  );
                               })}
                             </div>
                           </details>
                         );
                       });
                     })()}
                   </div>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => setIsPersonaliseExpanded(false)}
                className="text-[10px] text-gray-500 underline uppercase tracking-wide mt-4 w-full text-right hover:text-[#00687A] cursor-pointer"
              >
                {lang === 'vi' ? 'Đóng tùy chọn thiết kế' : 'Close personalisation'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pricing summary & Add to bag button */}
      <div className="bg-white border-t border-gray-200 p-6 flex flex-col gap-4 w-full mt-auto">
        {warning && (
          <div className="bg-[#990000]/5 text-[#990000] text-xs font-bold p-3 rounded-sm border border-[#990000]/10 text-center animate-pulse">
            {warning}
          </div>
        )}
        
        {(() => {
          const productCategoryP1 = product.category;
          const productCategoryP2 = customization.comboId === 'mirror_combo' ? 'mirror' : product.category;
          const isSoldOutP1 = checkIsSoldOut(productCategoryP1, customization.element);
          const isSoldOutP2 = mode === 'couple' && customization.partnerElement && checkIsSoldOut(productCategoryP2, customization.partnerElement);
          const isAnySoldOut = isSoldOutP1 || isSoldOutP2;

          return (
            <>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-end justify-between w-full">
            <span className="text-sm font-bold text-[#00687A] uppercase tracking-wider">{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#990000]">{formatVND(totalPrice * quantity)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button 
            type="button"
            onClick={handleAddToCartSubmit}
            disabled={isAnySoldOut}
            className={`py-3.5 font-bold uppercase tracking-wider text-[11px] rounded-sm transition-colors border ${isAnySoldOut ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white hover:bg-[#00687A]/5 text-[#00687A] border-[#00687A]/30 hover:border-[#00687A] cursor-pointer'}`}
          >
            {isAnySoldOut ? (lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT') : (lang === 'vi' ? 'THÊM VÀO GIỎ' : 'ADD TO BAG')}
          </button>
          
          <button 
            type="button"
            onClick={handleBuyNowSubmit}
            disabled={isAnySoldOut}
            className={`py-3.5 font-bold uppercase tracking-wider text-[11px] rounded-sm transition-colors shadow-xs ${isAnySoldOut ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#990000] hover:bg-[#7a0000] text-white cursor-pointer'}`}
          >
            {isAnySoldOut ? (lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT') : (lang === 'vi' ? 'MUA NGAY' : 'BUY NOW')}
          </button>
        </div>
            </>
          );
        })()}
      </div>

    </form>
  );
};
