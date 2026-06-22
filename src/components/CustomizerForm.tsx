import React, { useState } from 'react';
import { Product, ElementProfile, CustomizationState, BaseStyle, CharmItem } from '../types';
import { ELEMENTS, BASE_STYLES, CHARMS, LETTERING_PRICING } from '../data';
import { ArrowLeft, Star } from 'lucide-react';

interface CustomizerFormProps {
  product: Product;
  customization: CustomizationState;
  onUpdate: (updater: Partial<CustomizationState>) => void;
  onBackToShop: () => void;
  onAddToCart: () => void;
  onBuyNow?: () => void;
  totalPrice: number;
  lang?: 'vi' | 'en';
}

export const CustomizerForm: React.FC<CustomizerFormProps> = ({
  product,
  customization,
  onUpdate,
  onBackToShop,
  onAddToCart,
  onBuyNow,
  totalPrice,
  lang = 'en',
}) => {
  const [isPersonaliseExpanded, setIsPersonaliseExpanded] = useState(false);

  // Find current element profile helper

  const currentElement = ELEMENTS.find((e) => e.type === customization.element) || ELEMENTS[0];

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
       return;
    }
    const newStickers = [...current, id];
    const charms = newStickers.map(sId => CHARMS.find(c => c.id === sId));
    const regularCount = charms.filter(c => c?.category === 'regular').length;
    const stoneCount = charms.filter(c => c?.category === 'stone').length;
    
    const isValid = 
      (regularCount <= 2 && stoneCount <= 1) || 
      (stoneCount <= 2 && regularCount === 0) || 
      (regularCount <= 3 && stoneCount === 0);
    
    if (isValid) {
      onUpdate({ selectedStickerIds: newStickers });
    } else {
      alert(lang === 'vi' ? 'Đã đạt giới hạn sticker miễn phí' : 'Free sticker limit reached');
    }
  };

  return (
    <div id="customizer-options" className="w-full flex flex-col justify-between min-h-full bg-white rounded-sm">
      <div className="space-y-6 lg:pb-16 px-6 pt-6">
        
        {/* Product Header */}
        <div>
          <button 
            onClick={onBackToShop}
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold text-[#990000] hover:text-[#990000]/80 transition mb-4 uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{lang === 'vi' ? 'Quay Lại' : 'Back'}</span>
          </button>

          <p className="text-[10px] font-black text-[#990000] tracking-wider uppercase mb-1.5">
            {lang === 'vi' ? 'SẢN PHẨM BÁN CHẠY' : 'BEST SELLER'}
          </p>
          
          <h1 className="text-2xl md:text-3xl font-medium text-[#00687A] leading-tight">
            {lang === 'vi' ? product.vietnameseName : product.name}
          </h1>
          
          <p className="text-lg md:text-xl font-bold mt-2">
            {formatVND(totalPrice)}
          </p>

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

        {/* 1. SECTOR COLOR & NGŨ HÀNH SWATCH SELECTOR (Always Visible) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block">
              {lang === 'vi' ? '1. MÀU BẢN MỆNH NGŨ HÀNH' : '1. ELEMENT COLOR (NGŨ HÀNH)'}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-[#00687A] text-[9px] font-bold uppercase rounded-sm border border-gray-200">
              {lang === 'vi' ? currentElement.nameVi : currentElement.nameEn}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {ELEMENTS.map((el) => {
              const worksAsActive = customization.element === el.type;
              return (
                <button
                  key={el.type}
                  type="button"
                  onClick={() => onUpdate({ element: el.type })}
                  className={`relative flex flex-col items-center justify-center p-2 border transition-all duration-200 cursor-pointer rounded-sm ${
                    worksAsActive 
                      ? 'border-[#00687A] bg-gray-50' 
                      : 'border-slate-200 bg-transparent hover:border-[#00687A] hover:bg-[#00687A]/5'
                  }`}
                >
                  <span 
                    className="w-5 h-5 rounded-full shadow-sm mb-1 border border-slate-200"
                    style={{ backgroundColor: el.colorHex }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-tight text-gray-800">
                    {el.type}
                  </span>
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
              onClick={() => setIsPersonaliseExpanded(true)}
              className="w-full py-3.5 bg-[#B09B8B] hover:bg-[#A08B7B] transition-colors text-white font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 rounded-sm cursor-pointer"
            >
              <span>{lang === 'vi' ? 'THIẾT KẾ PHIÊN BẢN CỦA BẠN' : 'GET YOUR BESPOKE ITEM'}</span>
              <span className="text-lg leading-none">&rarr;</span>
            </button>
          ) : (
            <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
              
              {/* 2. ENGRAVING TEXT & FONT STYLE */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                  {lang === 'vi' ? `2. TÊN HAY KÝ TỰ (+${formatVND(LETTERING_PRICING.sticker)})` : `2. ADD NAME (+${formatVND(LETTERING_PRICING.sticker)})`}
                </span>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={12}
                    value={customization.text}
                    onChange={(e) => onUpdate({ text: e.target.value })}
                    placeholder={lang === 'vi' ? 'TÊN' : 'NAME'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm uppercase tracking-wider text-sm font-bold placeholder:text-gray-400 focus:border-[#00687A] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    {(customization.text || '').length}/12
                  </span>
                </div>

                {/* Lettering style */}
                {product.category !== 'sweatshirt' && (
                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                      {lang === 'vi' ? 'CHỌN DẠNG FONT CHỮ' : 'SELECT KIT FONT'}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => onUpdate({ letteringStyle: 'sticker' })}
                        className={`py-3 px-2 text-[10px] font-bold uppercase rounded-sm border transition-colors cursor-pointer ${
                          customization.letteringStyle === 'sticker'
                            ? 'bg-gray-50 border-[#00687A] text-[#00687A] shadow-inner'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#00687A] hover:bg-[#00687A]/5'
                        }`}
                      >
                        {lang === 'vi' ? 'DÁN CHÌM NHŨ' : 'FLAT STICKER'}
                      </button>
                      <button 
                        onClick={() => onUpdate({ letteringStyle: 'embossed' })}
                        className={`py-3 px-2 text-[10px] font-bold uppercase rounded-sm border transition-colors cursor-pointer ${
                          customization.letteringStyle === 'embossed'
                            ? 'bg-gray-50 border-[#00687A] text-[#00687A] shadow-inner'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#00687A] hover:bg-[#00687A]/5'
                        }`}
                      >
                        {lang === 'vi' ? 'NỔI ACRYLIC' : '3D EMBOSSED'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. SELECTION DYNAMIC CHARMS / ORNAMENTS */}
              {product.category !== 'sweatshirt' && (
                <div className="pt-2 space-y-4">
                  
                  {/* CHARM - ZODIAC */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                       {lang === 'vi' ? '3. CHỌN CHARM - TÙY CHỌN' : '3. CHOOSE CHARM - OPTIONAL'}
                    </span>
                    <details className="group border border-gray-200 bg-white rounded-sm">
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                        <span>{lang === 'vi' ? 'CHỌN CHARM' : 'CHOOSE CHARM'}</span>
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
                        {CHARMS.filter(c => c.category === 'zodiac').map((charm) => (
                           <label key={charm.id} className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                             <input type="radio" className="hidden" checked={customization.selectedZodiacCharmId === charm.id} onChange={() => onUpdate({ selectedZodiacCharmId: charm.id })} />
                             {charm.imageUrl ? (
                               <div className="w-14 h-14 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden"><img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.75] hover:scale-[2] transition-transform duration-300" /></div>
                             ) : <span className="text-4xl">{charm.emoji}</span>}
                             <div className="flex flex-col flex-1">
                               <span className="font-bold text-xs uppercase">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                               <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(charm.priceModifier)})</span>
                             </div>
                             {(customization.selectedZodiacCharmId === charm.id) && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                           </label>
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* DECORATIONS */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00687A] block mb-2">
                       {lang === 'vi' ? '4. TRANG TRÍ - TÙY CHỌN' : '4. DECORATIONS - OPTIONAL'}
                    </span>
                    <div className="space-y-2">
                       {[
                         { id: 'bow', labelVi: 'NƠ TRANG TRÍ', labelEn: 'BOWS' },
                         { id: 'sea', labelVi: 'BIỂN CẢ', labelEn: 'OCEAN DECO' },
                         { id: 'other', labelVi: 'KHÁC', labelEn: 'OTHERS' }
                       ].map(group => {
                         const groupCharms = CHARMS.filter(c => c.category === group.id);
                         if(groupCharms.length === 0) return null;
                         return (
                            <details key={group.id} className="group border border-gray-200 bg-white rounded-sm">
                              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-3 text-xs uppercase text-gray-800">
                                <span>{lang === 'vi' ? group.labelVi : group.labelEn}</span>
                                <span className="transition group-open:rotate-180">
                                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>
                                </span>
                              </summary>
                              <div className="border-t border-gray-200 mt-2 bg-gray-50 flex flex-col">
                                {groupCharms.map((charm) => {
                                   const isSelected = customization.selectedStickerIds.includes(charm.id);
                                   return (
                                     <label key={charm.id} className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200/50">
                                       <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleSticker(charm.id)} />
                                       {charm.imageUrl ? (
                                         <div className="w-14 h-14 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden"><img src={charm.imageUrl} alt="" className="w-full h-full object-cover scale-[1.75] hover:scale-[2] transition-transform duration-300" /></div>
                                       ) : <span className="text-4xl">{charm.emoji}</span>}
                                       <div className="flex flex-col flex-1">
                                         <span className="font-bold text-xs uppercase">{lang === 'vi' ? charm.vietnameseName : charm.name}</span>
                                         {charm.priceModifier > 0 && <span className="text-[10px] text-gray-500 font-bold">(+{formatVND(charm.priceModifier)})</span>}
                                       </div>
                                       {isSelected && <Star className="w-4 h-4 text-[#00687A] fill-current" />}
                                     </label>
                                   );
                                })}
                              </div>
                            </details>
                         );
                       })}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsPersonaliseExpanded(false)}
                    className="text-[10px] text-gray-500 underline uppercase tracking-wide mt-4 w-full text-right hover:text-[#00687A] cursor-pointer"
                  >
                    {lang === 'vi' ? 'Đóng tùy chọn thiết kế' : 'Close personalisation'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pricing summary & Add to bag button */}
      <div className="bg-white border-t border-gray-200 p-6 flex flex-col gap-4 w-full mt-auto">
        <div className="flex items-end justify-between">
          <span className="text-sm font-bold text-[#00687A] uppercase tracking-wider">{lang === 'vi' ? 'Tổng phụ' : 'Subtotal'}</span>
          <span className="text-xl font-bold text-[#990000]">{formatVND(totalPrice)}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button 
            onClick={onAddToCart}
            className="py-3.5 bg-white hover:bg-[#00687A]/5 text-[#00687A] font-bold uppercase tracking-wider text-[11px] rounded-sm transition-colors border border-[#00687A]/30 hover:border-[#00687A] cursor-pointer"
          >
            {lang === 'vi' ? 'THÊM VÀO GIỎ' : 'ADD TO BAG'}
          </button>
          
          <button 
            onClick={() => {
              if (onBuyNow) {
                onBuyNow();
              } else {
                onAddToCart();
              }
            }}
            className="py-3.5 bg-[#990000] hover:bg-[#7a0000] text-white font-bold uppercase tracking-wider text-[11px] rounded-sm transition-colors shadow-xs cursor-pointer"
          >
            {lang === 'vi' ? 'MUA NGAY' : 'BUY NOW'}
          </button>
        </div>
      </div>

    </div>
  );
};
