import React, { useState } from 'react';
import { CartItem, ElementType } from '../types';
import { ELEMENTS, CHARMS, BASE_STYLES } from '../data';
import { X, Trash2, Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';

const MIRROR_IMAGES_CHU_NOI: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95(1).png'
};

const MIRROR_IMAGES_LINH_VAT: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20M%E1%BB%99c.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Th%E1%BB%95.png'
};

const getCartItemImage = (item: CartItem): string => {
  if (item.product?.category === 'mirror' || item.product?.id === 'guong') {
    const isZodiacMode = item.customization?.customType === 'zodiac' || !!item.customization?.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[item.customization?.element] || item.product?.images?.['none'] || '';
  }
  return item.product?.images?.[item.customization?.element] || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || '';
};

const getTextColorName = (color?: string, lang: 'vi' | 'en' = 'vi') => {
  if (!color) return '';
  const map: Record<string, { vi: string; en: string }> = {
    silver: { vi: 'Bạc', en: 'Silver' },
    gold: { vi: 'Vàng', en: 'Gold' },
    white: { vi: 'Trắng', en: 'White' },
    pink: { vi: 'Hồng', en: 'Pink' }
  };
  return map[color] ? ` - ${map[color][lang]}` : '';
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  lang: 'vi' | 'en';
  onNavigateReturnPolicy?: () => void;
  onNavigateToCheckout: () => void;
  onNavigateToCart: () => void;
  onNavigateHome?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  onNavigateReturnPolicy,
  onNavigateToCheckout,
  onNavigateToCart,
  onNavigateHome
}) => {
  // Helpers
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  };

  const getElementBadgeColor = (type: ElementType) => {
    switch (type) {
      case 'KIM': return 'bg-[#F0F1F3] text-slate-800';
      case 'MOC': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'THUY': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'HOA': return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'THO': return 'bg-amber-50 text-[#8B5A2B] border-amber-200';
      default: return 'bg-slate-50 text-slate-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      {/* Black backdrop click handler */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Main Drawer Shell */}
      <div className="relative w-full max-w-md h-full bg-white flex flex-col justify-between shadow-2xl z-10 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#990000] flex items-center justify-between text-white">
          <h3 className="font-bold text-[15px] uppercase tracking-wider">
            {lang === 'vi' ? `GIỎ HÀNG (${cart.length} SẢN PHẨM)` : `MY BAG (${cart.length} ITEM${cart.length !== 1 ? 'S' : ''})`}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-sm hover:bg-white/10 transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Container based on Step */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* EMPTY STATE */}
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 animate-fade-in">
              <span className="text-5xl">🛍️</span>
              <div>
                <h4 className="font-bold text-slate-700">
                  {lang === 'vi' ? 'Giỏ Hàng Trống' : 'Empty Bag'}
                </h4>
                <p className="text-xs text-slate-400 max-w-[240px] mx-auto mt-1 leading-relaxed font-serif">
                  {lang === 'vi' 
                    ? 'Bạn chưa thiết kế món phụ kiện nào. Hãy ghé thăm cửa hàng ngay!' 
                    : 'You haven\'t added any items yet. Go to shop!'}
                </p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  onNavigateHome?.();
                }}
                className="px-5 py-2.5 bg-[#00687A] text-white rounded-xl text-xs font-semibold hover:bg-[#00687A]/90 transition cursor-pointer font-sans tracking-wide"
              >
                {lang === 'vi' ? 'Tiếp Tục Mua Sắm' : 'Continue Shopping'}
              </button>
            </div>
          )}

          {/* CART LISTING */}
          {cart.length > 0 && (
            <div className="space-y-4">
              {cart.map((item) => {
                const elementProfile = ELEMENTS.find((e) => e.type === item.customization.element);
                const charmProfile = CHARMS.find((c) => c.id === item.customization.selectedZodiacCharmId);

                return (
                  <div 
                    key={item.id} 
                    id={`cart-item-${item.id}`}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex gap-4 relative transition-all"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-lg bg-[#F5F5F5] flex items-center justify-center relative shrink-0 overflow-hidden">
                      <img 
                         src={getCartItemImage(item)} 
                         alt={item.product?.name} 
                         className="w-full h-full object-cover mix-blend-multiply"
                        referrerPolicy="no-referrer"  />
                    </div>

                    {/* Specifications detail listing */}
                    <div className="flex-1 space-y-1 min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2 pr-5">
                            {(() => {
                              let itemName = lang === 'vi' ? item.product.vietnameseName : item.product.name;
                              if (item.customization.comboId === 'couple_combo') {
                                return lang === 'vi' ? `Combo Chạm Cùng Nhau (${itemName})` : `Couple Combo (${itemName})`;
                              } else if (item.customization.comboId === 'mirror_combo') {
                                return lang === 'vi' ? `Combo Chạm Ánh Nhìn (${itemName} & Gương)` : `Mirror Combo (${itemName} & Mirror)`;
                              }
                              return itemName;
                            })()}
                          </h4>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded transition absolute top-3 right-3"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[13px] font-black text-[#990000] block shrink-0 mt-1">
                            {formatVND(item.finalPrice)}
                        </span>
                      </div>

                      {/* Attribute Bullets */}
                      <div className="flex flex-col gap-0.5 items-start mt-1.5">
                        {item.customization.comboId ? (
                          <>
                            {/* Product 1 details */}
                            <span className="text-[11px] text-slate-500">
                              <span className="font-bold">{lang === 'vi' ? 'Sản phẩm 1' : 'Product 1'}:</span> {elementProfile && (lang === 'vi' ? elementProfile.nameVi : elementProfile.nameEn)} 
                              {charmProfile && ` - ${lang === 'vi' ? charmProfile.vietnameseName : charmProfile.name}`}
                              {item.customization.text && ` - "${item.customization.text}" (${item.customization.letteringStyle === 'embossed' ? (lang === 'vi' ? 'nổi' : '3D') : (lang === 'vi' ? 'dán' : 'sticker')}${getTextColorName(item.customization.textStyleOption, lang)})`}
                            </span>
                            {/* Product 2 details */}
                            <span className="text-[11px] text-slate-500">
                              <span className="font-bold">{lang === 'vi' ? 'Sản phẩm 2' : 'Product 2'}:</span> {(() => {
                                const partnerElement = item.customization.partnerElement;
                                const partnerElementProfile = ELEMENTS.find(e => e.type === partnerElement);
                                const charmProfile2 = CHARMS.find((c) => c.id === item.customization.selectedZodiacCharmId2);
                                const text2 = item.customization.text2;
                                const letteringStyle2 = item.customization.letteringStyle2;
                                return (
                                  <>
                                    {partnerElementProfile ? (lang === 'vi' ? partnerElementProfile.nameVi : partnerElementProfile.nameEn) : ''}
                                    {charmProfile2 ? ` - ${lang === 'vi' ? charmProfile2.vietnameseName : charmProfile2.name}` : ''}
                                    {text2 ? ` - "${text2}" (${letteringStyle2 === 'embossed' ? (lang === 'vi' ? 'nổi' : '3D') : (lang === 'vi' ? 'dán' : 'sticker')}${getTextColorName(item.customization.textStyleOption2, lang)})` : ''}
                                  </>
                                );
                              })()}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {elementProfile && (lang === 'vi' ? elementProfile.nameVi : elementProfile.nameEn)} 
                              {charmProfile && ` - ${lang === 'vi' ? charmProfile.vietnameseName : charmProfile.name}`}
                            </span>

                            {item.customization.text && (
                              <span className="text-[11px] text-slate-500 line-clamp-1">
                                {lang === 'vi' ? 'Khắc chữ' : 'Text'}: "{item.customization.text}" ({item.customization.letteringStyle === 'embossed' ? (lang === 'vi' ? 'nổi (acrylic)' : '3D (acrylic)') : (lang === 'vi' ? 'dán' : 'sticker')}{getTextColorName(item.customization.textStyleOption, lang)})
                              </span>
                            )}
                          </>
                        )}
                        {item.product.category === 'sweatshirt' && item.customization.uploadedPhotoUrl && (
                          <span className="text-[11px] text-slate-500 line-clamp-1">
                            📸 {lang === 'vi' ? 'Đã tải ảnh' : 'Image attached'}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center pt-2">
                        <div className="flex items-center gap-3 border border-slate-300 rounded-md p-1 bg-white">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="border-t border-slate-100 bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">
            <div className="flex items-center justify-between mb-4">
               <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                 {lang === 'vi' ? 'Tổng tiền' : 'Subtotal'}
               </span>
               <span className="text-xl font-black text-[#990000]">
                 {formatVND(calculateSubtotal())}
               </span>
            </div>

            <div className="flex gap-3">
               <button
                 onClick={() => {
                   onClose();
                   onNavigateToCart();
                 }}
                 className="hidden py-3.5 bg-[#F2F2F2] hover:bg-[#E5E5E5] text-gray-900 font-bold text-[13px] tracking-wider uppercase rounded-full transition items-center justify-center cursor-pointer font-sans"
               >
                 <span>{lang === 'vi' ? 'Xem Giỏ Hàng' : 'View Bag'}</span>
               </button>
               <button
                 onClick={onNavigateToCheckout}
                 className="flex-1 py-3.5 bg-[#990000] hover:bg-[#800000] text-white font-bold text-[13px] tracking-wider uppercase rounded-full transition flex items-center justify-center cursor-pointer font-sans"
               >
                 <span>{lang === 'vi' ? 'Thanh Toán' : 'Checkout'}</span>
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
