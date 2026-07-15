import React, { useState } from 'react';
import { Product, ElementType } from '../types';
import { PRODUCTS, ELEMENTS, getProductBasePrice } from '../data';
import { checkIsSoldOut } from '../lib/inventory';
import { Heart, Plus, ChevronDown } from 'lucide-react';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

interface ShopGridProps {
  onSelectProduct: (product: Product, elementOverride?: ElementType, customizerMode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided') => void;
  lang: 'vi' | 'en';
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  initialFilter?: string;
  onNavigate?: (view: string) => void;
}

export const ShopGrid: React.FC<ShopGridProps> = ({ 
  onSelectProduct, 
  lang, 
  wishlistIds = [], 
  onToggleWishlist,
  initialFilter = 'all',
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filters mapping
  const FILTER_OPTIONS = [
    {
      title: lang === 'vi' ? 'BỘ SƯU TẬP' : 'COLLECTIONS',
      options: [
        { id: 'cham_toi', label: lang === 'vi' ? 'Chạm Tôi' : 'Touch Me' },
        { id: 'cham_than', label: lang === 'vi' ? 'Chạm Thần' : 'Touch Spirit' },
        { id: 'cham_doi', label: lang === 'vi' ? 'Chạm Đôi' : 'Touch Us' },
      ]
    },
    {
      title: lang === 'vi' ? 'COMBO' : 'COMBO',
      options: [
        { id: 'combo_guong', label: lang === 'vi' ? 'Combo Gương' : 'Mirror Combo' },
        { id: 'combo_doi', label: lang === 'vi' ? 'Combo Đôi' : 'Couple Combo' },
      ]
    }
  ];

  interface DisplayItem {
    product: Product;
    elementOverride?: ElementType;
    titleOverride?: string;
    imageOverride?: string;
    customizerMode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided';
  }

  // Helper to get filtered products
  const getFilteredProducts = (): DisplayItem[] => {
    let baseProducts = PRODUCTS.filter(p => p.id !== 'limited' && p.id !== 'kep-3');

    const chamThanItems: DisplayItem[] = ELEMENTS.map(el => ({
      product: PRODUCTS[0],
      elementOverride: el.type,
      titleOverride: lang === 'vi' ? el.nameVi : el.nameEn,
      imageOverride: el.guardianImg,
      customizerMode: 'charm-only'
    }));

    const comboGuongItems: DisplayItem[] = baseProducts.filter(p => p.category === 'mirror').map(p => ({ product: p, customizerMode: 'couple' }));

    const comboDoiItems: DisplayItem[] = [
      { product: PRODUCTS[0], titleOverride: lang === 'vi' ? 'Combo Ta Có Nhau (Kim - Mộc)' : 'Couple Combo (Metal - Wood)', customizerMode: 'couple' },
      { product: PRODUCTS[1], titleOverride: lang === 'vi' ? 'Combo Ta Có Nhau (Thủy - Hỏa)' : 'Couple Combo (Water - Fire)', customizerMode: 'couple' }
    ];

    const chamDoiItems: DisplayItem[] = [
      { product: PRODUCTS[0], titleOverride: lang === 'vi' ? 'Kẹp Chạm Đôi Tiêu Chuẩn' : 'Standard Double Touch', customizerMode: 'double-sided' },
      { product: PRODUCTS[1], titleOverride: lang === 'vi' ? 'Kẹp Chạm Đôi Cao Cấp' : 'Premium Double Touch', customizerMode: 'double-sided' }
    ];

    const chamToiItems: DisplayItem[] = baseProducts.map(p => ({ product: p, customizerMode: 'font-only' }));

    if (activeFilter === 'cham_than') return chamThanItems;
    if (activeFilter === 'combo_guong') return comboGuongItems;
    if (activeFilter === 'combo_doi') return comboDoiItems;
    if (activeFilter === 'cham_doi') return chamDoiItems;
    if (activeFilter === 'cham_toi') return chamToiItems;

    // Default 'all' - combine everything
    return [
      ...chamToiItems,
      ...chamThanItems,
      ...chamDoiItems,
      ...comboDoiItems,
      ...comboGuongItems
    ];
  };

  const displayItems = getFilteredProducts();

  const handleProductClick = (prod: Product, elementOverride?: ElementType, customizerMode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided') => {
    onSelectProduct(prod, elementOverride, customizerMode);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white min-h-[80vh]">
      
      {/* Breadcrumbs */}
      <div className="w-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500 mb-8 flex items-center gap-2">
        <span 
          className="cursor-pointer hover:text-gray-900 transition-colors"
          onClick={() => onNavigate && onNavigate('home')}
        >
          {lang === 'vi' ? 'TRANG CHỦ' : 'HOME'}
        </span>
        <span>/</span>
        <span 
          className="cursor-pointer hover:text-gray-900 transition-colors"
          onClick={() => setActiveFilter('all')}
        >
          {lang === 'vi' ? 'SẢN PHẨM' : 'SHOP'}
        </span>
        <span>/</span>
        <span className="text-gray-900">
          {activeFilter === 'all' 
            ? (lang === 'vi' ? 'Tất Cả Sản Phẩm' : 'All Products')
            : FILTER_OPTIONS.flatMap(g => g.options).find(o => o.id === activeFilter)?.label
          }
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-56 shrink-0 flex flex-col gap-6">
          <div className="hidden lg:flex flex-col gap-6 sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#00687A] border-b border-[#00687A]/10 pb-3">
              {lang === 'vi' ? 'LỌC SẢN PHẨM' : 'FILTER PRODUCTS'}
            </h3>
            
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-left text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === 'all' ? 'text-[#E28C9A] translate-x-2' : 'text-gray-500 hover:text-[#00687A] hover:translate-x-1'
              }`}
            >
              {lang === 'vi' ? 'Tất Cả Sản Phẩm' : 'All Products'}
            </button>

            {FILTER_OPTIONS.map(group => (
              <div key={group.title} className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{group.title}</h4>
                <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                  {group.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setActiveFilter(opt.id)}
                      className={`text-left text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeFilter === opt.id ? 'text-[#E28C9A] translate-x-2' : 'text-gray-500 hover:text-[#00687A] hover:translate-x-1'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="font-bold text-sm uppercase tracking-widest text-[#00687A]">
              {lang === 'vi' ? 'Lọc Sản Phẩm' : 'Filter Products'}
            </span>
            <ChevronDown className={`w-5 h-5 text-[#00687A] transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile Filter Dropdown */}
          {isSidebarOpen && (
            <div className="lg:hidden flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <button
                onClick={() => { setActiveFilter('all'); setIsSidebarOpen(false); }}
                className={`text-left text-xs font-bold uppercase tracking-wider ${
                  activeFilter === 'all' ? 'text-[#E28C9A]' : 'text-gray-600'
                }`}
              >
                {lang === 'vi' ? 'Tất Cả Sản Phẩm' : 'All Products'}
              </button>
              {FILTER_OPTIONS.map(group => (
                <div key={`mobile-${group.title}`} className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{group.title}</h4>
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                    {group.options.map(opt => (
                      <button
                        key={`mobile-${opt.id}`}
                        onClick={() => { setActiveFilter(opt.id); setIsSidebarOpen(false); }}
                        className={`text-left text-xs font-bold uppercase tracking-wider ${
                          activeFilter === opt.id ? 'text-[#E28C9A]' : 'text-gray-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Horizontal Filters (Pills) */}
          <div className="w-full flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === 'all'
                  ? 'bg-[#00687A] text-white border-[#00687A]'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {lang === 'vi' ? 'TẤT CẢ' : 'ALL'}
            </button>
            {FILTER_OPTIONS.flatMap(g => g.options).map(opt => (
              <button
                key={`pill-${opt.id}`}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === opt.id
                    ? 'bg-[#00687A] text-white border-[#00687A]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Master Carousel */}
          <div className="w-full relative group/master">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 pt-4 no-scrollbar items-center px-2 md:px-6">
            {displayItems.length === 0 && (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center opacity-50">
                <p className="text-lg font-medium">{lang === 'vi' ? 'Không tìm thấy sản phẩm nào' : 'No products found'}</p>
              </div>
            )}
            
            {displayItems.map((item, index) => {
              const { product: prod, elementOverride, titleOverride, imageOverride } = item;
              const isWished = wishlistIds.includes(prod.id);
              const transName = titleOverride || (lang === 'vi' ? prod.vietnameseName : prod.name);
              
              // Determine the image to show
              let imgSrc = prod.images?.['none'] 
                ? prod.images['none'] 
                : (prod.category.startsWith('clip') || prod.category === 'limited' ? dmkBrandElement1 : mirrorVintage);
                
              if (elementOverride && prod.images?.[elementOverride]) {
                imgSrc = prod.images[elementOverride];
              }
              if (imageOverride) {
                imgSrc = imageOverride;
              }

              // Determine base price based on mirror MOC/THUY rule
              const trueBasePrice = getProductBasePrice(prod.id, elementOverride || 'KIM');
              
              const isItemSoldOut = checkIsSoldOut(prod.category, elementOverride || 'KIM');

              return (
                <div 
                  key={`${prod.id}-${elementOverride || 'default'}-${index}`}
                  className="group cursor-pointer flex flex-col relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] snap-center"
                  onClick={() => handleProductClick(prod, elementOverride)}
                >
                  <div className="relative aspect-[3/4] bg-[#F9F9F9] rounded-3xl overflow-hidden mb-6 shadow-sm border border-gray-100 group-hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-2 flex items-center justify-center">
                    {/* Organic circular beige highlight behind image */}
                    <div className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full bg-[#E6D9C5]/45 blur-2xl z-0 pointer-events-none" />

                    <img 
                      src={imgSrc}
                      alt={transName}
                      className={`w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none drop-shadow-xl z-10 relative ${isItemSoldOut ? 'opacity-50 grayscale' : ''}`}
                      referrerPolicy="no-referrer"
                      draggable={false}
                     />
                    
                    {isItemSoldOut && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="bg-red-600/90 text-white font-black text-sm md:text-lg tracking-[0.2em] px-4 py-2 transform -rotate-12 border-2 border-red-500 shadow-2xl backdrop-blur-sm">
                          {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
                        </div>
                      </div>
                    )}
                    
                    {/* Add to Wishlist */}
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(prod.id);
                      }}
                      className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-all z-10 hover:bg-white hover:scale-110"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors ${isWished ? 'fill-[#E28C9A] text-[#E28C9A]' : 'text-gray-400 hover:text-[#E28C9A]'}`} 
                        strokeWidth={2} 
                      />
                    </button>
                    
                    {/* Hover Action Overlay */}
                    <div className="absolute inset-x-0 bottom-8 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                      <button
                        className="bg-[#00687A] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl hover:bg-[#00485A] hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                        onClick={(e) => { e.stopPropagation(); handleProductClick(prod, elementOverride, item.customizerMode); }}
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'vi' ? 'Thiết Kế Ngay' : 'Customize Now'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center px-4">
                    <h3 className="text-lg md:text-xl font-black text-[#00687A] uppercase tracking-widest mb-3 transition-colors min-h-[48px] flex items-center">
                      {transName}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-[#00687A] leading-none">
                        {new Intl.NumberFormat('vi-VN').format(trueBasePrice)}
                        <span className="text-sm underline ml-0.5 translate-y-[-2px] inline-block">đ</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>

    </div>
  );
};
