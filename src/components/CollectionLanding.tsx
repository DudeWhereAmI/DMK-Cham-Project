import React, { useState } from 'react';
import { ELEMENTS, getProductBasePrice } from '../data';
import { checkIsSoldOut, checkIsCharmSoldOut } from '../lib/inventory';

const isElementProductSoldOut = (elementId: string, productId: string) => {
  const normElement = elementId.toUpperCase() as any;
  if (checkIsCharmSoldOut(normElement)) return true;
  const categoryId = productId === 'guong' ? 'mirror' : (productId === 'kep-2' ? 'clip-2' : 'clip-1');
  return checkIsSoldOut(categoryId, normElement);
};

interface CollectionLandingProps {
  lang: 'vi' | 'en';
  onNavigateCustomizer: (elementId: string, productId: string) => void;
  initialElementId?: string;
}

export const CollectionLanding: React.FC<CollectionLandingProps> = ({
  lang,
  onNavigateCustomizer,
  initialElementId
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(
    initialElementId ? Math.max(0, ELEMENTS.findIndex(e => e.type === initialElementId)) : 0
  );
  const [selectedProductIds, setSelectedProductIds] = useState<Record<string, string>>({});

  const handleProductSelect = (elementId: string, productId: string) => {
    setSelectedProductIds(prev => ({ ...prev, [elementId]: productId }));
  };

  const getSelectedProduct = (elementId: string) => {
    return selectedProductIds[elementId] || 'kep-1';
  };

  React.useEffect(() => {
    if (initialElementId) {
      const idx = ELEMENTS.findIndex(e => e.type === initialElementId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [initialElementId]);

  return (
    <div className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
      {ELEMENTS.map((element, index) => {
        const isActive = activeIndex === index;
        
        return (
          <div
            key={element.type}
            onClick={() => setActiveIndex(index)}
            className={`
              relative flex flex-col md:flex-row items-center justify-center 
              transition-all duration-700 ease-in-out overflow-hidden cursor-pointer
              ${isActive ? "min-h-[100vh] h-max md:h-auto py-12 md:py-0 md:flex-[4] flex-shrink-0" : "h-[80px] min-h-[80px] md:h-auto md:flex-1 flex-shrink-0"}
            `}
            style={{ 
              backgroundColor: isActive ? element.colorHex : `${element.colorHex}40`,
            }}
          >
            {/* Background elements when active */}
            {isActive && (
              <div 
                className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(to bottom right, ${element.gradientFrom}, ${element.gradientTo})`
                }}
              />
            )}

            {/* Inactive State Content */}
            <div className={`
              absolute inset-0 flex md:flex-col items-center justify-center transition-opacity duration-500
              ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}>
              <h3 className="transform md:-rotate-90 text-2xl md:text-3xl font-extrabold text-[#00687A] opacity-50 whitespace-nowrap tracking-widest uppercase">
                0{index + 1}
              </h3>
            </div>

            {/* Active State Content */}
            <div className={`
              w-full h-max min-h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-8 md:p-12 z-10 transition-opacity duration-700 delay-300
              ${isActive ? 'opacity-100' : 'opacity-0 hidden'}
            `}>
              
              {/* Left text */}
              <div className="flex-1 flex flex-col items-start gap-4 z-30 relative">
                <div className="flex items-end gap-6 mb-2">
                  <span className="text-5xl md:text-6xl font-black" style={{ color: '#00687A' }}>0{index + 1}</span>
                  <div className="flex flex-col items-start pb-1">
                    <span className="text-[#00687A]/80 text-xs font-bold uppercase mb-0.5">{lang === 'vi' ? 'Giá Chỉ Từ' : 'Starts At'}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[#00687A] text-xl font-black tracking-tight leading-none">
                          {new Intl.NumberFormat('vi-VN').format(getProductBasePrice('kep-1', element.type) + 10000)}<span className="text-xs underline ml-0.5">đ</span>
                          <span className="text-[10px] ml-1 font-medium">(Kẹp)</span>
                        </span>
                      </div>
                      <div className="w-[1px] h-6 bg-[#00687A]/20"></div>
                      <div className="flex flex-col">
                        <span className="text-[#00687A] text-xl font-black tracking-tight leading-none">
                          {new Intl.NumberFormat('vi-VN').format(getProductBasePrice('guong', element.type) + 10000)}
                          <span className="text-xs underline ml-0.5">đ</span>
                          <span className="text-[10px] ml-1 font-medium">(Gương)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#00687A] uppercase tracking-wider leading-tight">
                  {lang === 'vi' ? element.nameVi : element.nameEn}
                </h2>
                <p className="text-base md:text-lg text-[#00687A]/90 max-w-sm font-semibold leading-relaxed">
                  {lang === 'vi' ? element.descriptionVi : element.description}
                </p>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'kep-1', label: lang === 'vi' ? 'Kẹp Ánh Mây' : 'Cloud Glow Clip' },
                      { id: 'kep-2', label: lang === 'vi' ? 'Kẹp Pha Lê' : 'Crystal Clip' },
                      { id: 'guong', label: lang === 'vi' ? 'Gương' : 'Mirror' },
                    ].map(opt => {
                      const isOptSoldOut = isElementProductSoldOut(element.type, opt.id);
                      return (
                        <button
                          key={opt.id}
                          disabled={isOptSoldOut}
                          onClick={(e) => { e.stopPropagation(); handleProductSelect(element.type, opt.id); }}
                          className={`px-4 py-2 text-xs font-bold uppercase rounded-sm border transition-all cursor-pointer ${
                            isOptSoldOut
                              ? 'bg-gray-100/50 text-gray-400 border-gray-200/50 cursor-not-allowed line-through'
                              : getSelectedProduct(element.type) === opt.id
                              ? 'bg-[#00687A] text-white border-[#00687A] shadow-md font-extrabold scale-105'
                              : 'bg-white/80 backdrop-blur-sm text-[#00687A] border-[#00687A]/30 hover:bg-white hover:text-[#00687A] shadow-sm font-semibold'
                          }`}
                        >
                          {opt.label} {isOptSoldOut && (lang === 'vi' ? '(Hết Hàng)' : '(Sold Out)')}
                        </button>
                      );
                    })}
                  </div>
                  {(() => {
                    const isCurrentSoldOut = isElementProductSoldOut(element.type, getSelectedProduct(element.type));
                    return (
                      <button
                        disabled={isCurrentSoldOut}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateCustomizer(element.type.toLowerCase(), getSelectedProduct(element.type));
                        }}
                        className={`px-8 py-4 rounded-full font-bold text-base uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 max-w-xs whitespace-nowrap mt-2 ${
                          isCurrentSoldOut
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                            : 'bg-white text-[#00687A] hover:shadow-2xl hover:-translate-y-1'
                        }`}
                      >
                        {isCurrentSoldOut 
                          ? (lang === 'vi' ? 'Hết Hàng' : 'Sold Out') 
                          : (lang === 'vi' ? 'Thiết Kế Ngay' : 'Customize Now')} 
                        {!isCurrentSoldOut && <span className="text-xl">→</span>}
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Center Image (Layering) */}
              <div className="flex-none md:flex-[2] w-full min-h-[300px] h-auto md:h-full flex items-center justify-center relative md:min-h-[400px] ">
                {/* Beige tone circular highlight behind guardian */}
                <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />

                {/* Guardian Image */}
                {(() => {
                  const isWaterOrFire = element.type === 'THUY' || element.type === 'HOA';
                    const imgSizeClass = isWaterOrFire
    ? 'w-[90%] h-[90%] md:w-[125%] md:h-[125%] max-w-[400px] md:max-w-[1150px]'
    : 'w-[100%] h-[100%] md:w-[130%] md:h-[130%] max-w-[450px] md:max-w-[1200px]';
                    const imgScaleClass = isWaterOrFire
    ? 'scale-[1.0] md:scale-[1.75] lg:scale-[1.95] hover:scale-[1.05] md:hover:scale-[1.8] lg:hover:scale-[2.0]'
    : 'scale-[1.0] md:scale-[1.95] lg:scale-[2.2] hover:scale-[1.05] md:hover:scale-[2.0] lg:hover:scale-[2.25]';
                  const imgTranslateClass = isWaterOrFire
                    ? 'translate-x-6 md:translate-x-12 lg:translate-x-8'
                    : 'translate-x-6 md:translate-x-12 lg:translate-x-10';
                  const isSoldOut = isElementProductSoldOut(element.type, getSelectedProduct(element.type));

                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={element.guardianImg} 
                        alt={element.guardianEn} 
                        className={`${imgSizeClass} object-contain drop-shadow-2xl mix-blend-multiply animate-float ${imgScaleClass} ${imgTranslateClass} z-20 transition-all duration-700 ease-out ${isSoldOut ? 'opacity-40 grayscale' : ''}`}
                       referrerPolicy="no-referrer"  />
                      {isSoldOut && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                          <div className="bg-red-600/90 text-white font-black text-sm sm:text-lg tracking-[0.2em] px-4 py-2 transform -rotate-12 border-2 border-red-500 shadow-2xl backdrop-blur-sm">
                            {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>



            </div>
          </div>
        );
      })}
    </div>
  );
};
