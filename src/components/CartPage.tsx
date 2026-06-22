import React from 'react';
import { CartItem } from '../types';
import { ELEMENTS, CHARMS, PRODUCTS } from '../data';
import { Trash2, Plus, Minus, ChevronRight, Heart } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  lang: 'vi' | 'en';
  globalDiscountCode: string;
  setGlobalDiscountCode: (code: string) => void;
  isGlobalDiscountApplied: boolean;
  setIsGlobalDiscountApplied: (applied: boolean) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigateToCheckout: () => void;
  onNavigateHome: () => void;
  onAddToCart: (item: CartItem) => void; // for Why Not Add
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  lang,
  globalDiscountCode,
  setGlobalDiscountCode,
  isGlobalDiscountApplied,
  setIsGlobalDiscountApplied,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToCheckout,
  onNavigateHome,
  onAddToCart
}) => {
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  };
  
  const handleApplyDiscount = () => {
    if (globalDiscountCode.trim().toUpperCase() === 'CHAMISBYEUCOHOA') {
      setIsGlobalDiscountApplied(true);
      alert(lang === 'vi' ? 'Áp dụng mã giảm giá thành công!' : 'Discount applied successfully!');
    } else {
      setIsGlobalDiscountApplied(false);
      alert(lang === 'vi' ? 'Mã giảm giá không hợp lệ.' : 'Invalid discount code.');
    }
  };

  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 uppercase tracking-wide">
          {lang === 'vi' ? `Giỏ Hàng Của Bạn (${cart.length} Sản Phẩm)` : `My Bag (${cart.length} Item${cart.length !== 1 ? 's' : ''})`}
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-6xl block mb-4">🛍️</span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your bag is empty'}
            </h2>
            <p className="text-gray-500 mb-6">
              {lang === 'vi' ? 'Hãy khám phá các sản phẩm nổi bật của chúng tôi.' : 'Explore our featured products.'}
            </p>
            <button
              onClick={onNavigateHome}
              className="px-8 py-3 bg-[#990000] text-white font-bold rounded-full uppercase tracking-wider hover:bg-[#800000] transition"
            >
              {lang === 'vi' ? 'Tiếp Tục Mua Sắm' : 'Continue Shopping'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map(item => {
                const elementProfile = ELEMENTS.find((e) => e.type === item.customization.element);
                const charmProfile = CHARMS.find((c) => c.id === item.customization.selectedZodiacCharmId);

                return (
                  <div key={item.id} className="flex gap-6 p-4 rounded-xl border border-gray-200">
                    {/* Image */}
                    <div className="w-32 h-32 bg-[#F5F5F5] rounded-lg shrink-0 overflow-hidden flex items-center justify-center p-2">
                      <img 
                         src={item.product?.images?.[item.customization?.color] || item.product?.image || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm'} 
                         alt={item.product?.name} 
                         className="w-full h-full object-contain mix-blend-multiply"
                       />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                          {lang === 'vi' ? item.product.vietnameseName : item.product.name}
                        </h3>
                        <span className="font-bold text-lg text-gray-900">
                          {formatVND(item.finalPrice)}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p>
                           {elementProfile && (lang === 'vi' ? elementProfile.nameVi : elementProfile.nameEn)} 
                           {charmProfile && ` - ${lang === 'vi' ? charmProfile.vietnameseName : charmProfile.name}`}
                        </p>
                        {item.customization.text && (
                          <p>
                            {lang === 'vi' ? 'Khắc chữ' : 'Engraving'}: "{item.customization.text}" ({item.customization.letteringStyle === 'embossed' ? (lang === 'vi' ? 'nổi' : '3D') : (lang === 'vi' ? 'dán' : 'sticker')})
                          </p>
                        )}
                        {item.product.category === 'sweatshirt' && item.customization.uploadedPhotoUrl && (
                          <p>
                            📸 {lang === 'vi' ? 'Hình ảnh đính kèm' : 'Image attached'}
                          </p>
                        )}
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {/* QTY & Actions */}
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-gray-600">Qty:</span>
                             <div className="flex items-center bg-gray-100 rounded-md">
                               <button 
                                 onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                 className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition text-gray-600 rounded-l-md"
                               >
                                 <Minus className="w-4 h-4" />
                               </button>
                               <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                               <button 
                                 onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                 className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition text-gray-600 rounded-r-md"
                               >
                                 <Plus className="w-4 h-4" />
                               </button>
                             </div>
                           </div>
                           <button 
                             onClick={() => onRemoveItem(item.id)}
                             className="text-sm font-bold text-gray-500 hover:text-red-600 transition underline underline-offset-2"
                           >
                             {lang === 'vi' ? 'XÓA SẢN PHẨM' : 'REMOVE ITEM'}
                           </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-[400px] shrink-0">
              <div className="bg-[#F5F5F5] rounded-xl p-6 space-y-6 sticky top-28">
                {/* Promo Code */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={globalDiscountCode}
                      onChange={(e) => setGlobalDiscountCode(e.target.value)}
                      placeholder={lang === 'vi' ? 'Nhập mã giảm giá' : 'Enter voucher code'}
                      className="flex-1 bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#990000] focus:border-[#990000] uppercase"
                      disabled={isGlobalDiscountApplied}
                    />
                    {!isGlobalDiscountApplied ? (
                      <button 
                         onClick={handleApplyDiscount}
                         className="px-6 bg-[#C49A9A] hover:bg-[#A97575] text-white font-bold text-sm rounded-md transition uppercase tracking-wider"
                      >
                        {lang === 'vi' ? 'Áp Dụng' : 'Apply'}
                      </button>
                    ) : (
                      <button 
                         onClick={() => {
                           setIsGlobalDiscountApplied(false);
                           setGlobalDiscountCode('');
                         }}
                         className="px-6 bg-[#d1d1d1] hover:bg-[#990000] text-gray-700 hover:text-white font-bold text-sm rounded-md transition uppercase tracking-wider"
                      >
                        {lang === 'vi' ? 'Hủy' : 'Remove'}
                      </button>
                    )}
                  </div>
                  {isGlobalDiscountApplied && (
                    <div className="text-xs text-green-600 font-bold ml-1">
                      {lang === 'vi' ? '✓ Đã áp dụng mã giảm 20%' : '✓ 20% discount applied'}
                    </div>
                  )}
                </div>

                {/* Subtotal */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
                    <span>{formatVND(calculateSubtotal())}</span>
                  </div>
                  {isGlobalDiscountApplied && (
                    <div className="flex justify-between items-center text-green-600 font-bold text-sm">
                      <span>{lang === 'vi' ? 'Giảm giá (20%)' : 'Discount (20%)'}</span>
                      <span>-{formatVND(calculateSubtotal() * 0.2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">{lang === 'vi' ? 'Tổng cộng:' : 'Total:'}</span>
                    <span className="text-lg font-bold text-gray-900">{formatVND(isGlobalDiscountApplied ? calculateSubtotal() * 0.8 : calculateSubtotal())}</span>
                  </div>
                </div>

                <button
                  onClick={onNavigateToCheckout}
                  className="w-full py-4 bg-[#990000] hover:bg-[#800000] text-white font-bold text-base uppercase rounded-full transition cursor-pointer tracking-wider"
                >
                  {lang === 'vi' ? 'Tới trang thanh toán' : 'Proceed to Checkout'}
                </button>

                {/* Returns Info Accordion (Static for now) */}
                <div className="border-t border-gray-300 pt-4 mt-6">
                  <button className="w-full flex justify-between items-center text-sm font-bold text-gray-900 uppercase tracking-wider group cursor-pointer">
                    {lang === 'vi' ? 'Đổi trả và hoàn tiền' : 'Returns and refunds'}
                    <Plus className="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Not Add Section */}
        {cart.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wider mb-8">
              {lang === 'vi' ? 'Có thể bạn sẽ thích?' : 'Why Not Add?'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center border border-gray-100">
                    <img 
                      src={product.images['none'] || Object.values(product.images)[0] || ''} 
                      alt={lang === 'vi' ? product.vietnameseName : product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                      <Heart className="w-6 h-6" />
                    </button>
                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => {
                         e.stopPropagation();
                         onAddToCart({
                            id: `${product.id}-${Date.now()}`,
                            product: product,
                            customization: {
                               element: 'KIM',
                               baseStyle: 'classic',
                               selectedZodiacCharmId: null,
                               text: '',
                               letteringStyle: 'sticker',
                               sunlightMode: false,
                               selectedStickerIds: []
                            },
                            finalPrice: product.basePrice,
                            quantity: 1
                         });
                      }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-[#990000] text-white flex items-center justify-center rounded hover:bg-[#800000] transition"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#990000] transition line-clamp-2">
                    {lang === 'vi' ? product.vietnameseName : product.name}
                  </h3>
                  <p className="font-bold text-gray-600 mt-1">
                    {formatVND(product.basePrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
