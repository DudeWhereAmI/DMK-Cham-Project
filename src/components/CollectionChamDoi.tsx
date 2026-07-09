import React, { useState } from 'react';
import { getProductBasePrice } from '../data';

interface StyleProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  colorHex: string;
  gradientFrom: string;
  gradientTo: string;
  imgUrl: string;
}

const STYLES: StyleProfile[] = [
  {
    id: 'kep-1',
    nameVi: 'Kẹp Ánh Mây',
    nameEn: 'Cloud Glow Clip',
    descVi: 'Chất liệu xà cừ thanh lịch, tỏa sáng nhẹ nhàng dưới mọi góc nhìn.',
    descEn: 'Elegant mother of pearl material, gently shining from every angle.',
    colorHex: '#E28C9A',
    gradientFrom: '#FFD3D4',
    gradientTo: '#E59CA0',
    imgUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BA%A1m%20%C4%91%C3%B4i%20.png'
  },
  {
    id: 'kep-2',
    nameVi: 'Kẹp Pha Lê',
    nameEn: 'Crystal Clip',
    descVi: 'Chất liệu pha lê trong suốt, lấp lánh sang trọng.',
    descEn: 'Transparent crystal material, sparkling with elegance.',
    colorHex: '#00687A',
    gradientFrom: '#008C9A',
    gradientTo: '#00485A',
    imgUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/pha%20l%C3%AA%20ch%E1%BA%A1m%20%C4%91%C3%B4i%20.png'
  }
];

interface CollectionChamDoiProps {
  lang: 'vi' | 'en';
  onNavigateCustomizer: (styleId: string, productId: string) => void;
}

export const CollectionChamDoi: React.FC<CollectionChamDoiProps> = ({
  lang,
  onNavigateCustomizer
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getFullSetPrice = (productId: string) => {
    const base = getProductBasePrice(productId, 'KIM');
    return base + 10000 + 3000; // base + zodiac charm (10k) + sticker text (3k)
  };

  return (
    <div className="w-full h-[80vh] min-h-[700px] overflow-hidden flex flex-col md:flex-row">
      {STYLES.map((style, index) => {
        const isActive = activeIndex === index;
        
        return (
          <div
            key={style.id}
            onClick={() => setActiveIndex(index)}
            className={`
              relative flex flex-col md:flex-row items-center justify-center 
              transition-all duration-1000 ease-in-out overflow-hidden cursor-pointer
              ${isActive ? 'flex-[4]' : 'flex-1'}
            `}
            style={{ 
              backgroundColor: isActive ? style.colorHex : `${style.colorHex}40`,
            }}
          >
            {/* Background elements when active */}
            {isActive && (
              <div 
                className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(to bottom right, ${style.gradientFrom}, ${style.gradientTo})`
                }}
              />
            )}

            {/* Inactive State Content */}
            <div className={`
              absolute inset-0 flex items-center justify-center transition-opacity duration-700
              ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white opacity-90 whitespace-nowrap tracking-widest uppercase mix-blend-overlay">
                0{index + 1}
              </h3>
            </div>

            {/* Active State Content */}
            <div className={`
              w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-1000 delay-300
              ${isActive ? 'opacity-100' : 'opacity-0 hidden'}
            `}>
              
              {/* Left text */}
              <div className="flex-1 flex flex-col items-start gap-4 z-30 relative md:mt-0 mt-8">
                <div className="flex items-end gap-6 mb-2">
                  <span className="text-5xl md:text-6xl font-black text-white mix-blend-overlay">0{index + 1}</span>
                  <div className="flex flex-col items-start pb-1">
                    <span className="text-white/80 text-xs font-bold uppercase mb-0.5">{lang === 'vi' ? 'Giá Chỉ Từ' : 'Starts At'}</span>
                    <div className="flex flex-col">
                      <span className="text-white text-xl font-black tracking-tight leading-none">
                        {new Intl.NumberFormat('vi-VN').format(getFullSetPrice(style.id))}<span className="text-xs underline ml-0.5">đ</span>
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wider leading-tight">
                  {lang === 'vi' ? style.nameVi : style.nameEn}
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-sm font-semibold leading-relaxed">
                  {lang === 'vi' ? style.descVi : style.descEn}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateCustomizer(style.id, style.id);
                  }}
                  className="mt-6 px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-base uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2 z-40 whitespace-nowrap"
                >
                  {lang === 'vi' ? 'Thiết Kế Ngay' : 'Customize Now'} <span className="text-xl">→</span>
                </button>
              </div>

              {/* Center Image (Layering) */}
              <div className="flex-[2] h-full flex items-center justify-center relative min-h-[300px] md:min-h-[400px]">
                
                {/* Beige tone circular highlight behind sample */}
                <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />

                {/* Sample Image */}
                <img 
                  src={style.imgUrl} 
                  alt={style.nameEn} 
                  className="w-full h-full max-w-[600px] md:max-w-[800px] object-contain drop-shadow-2xl mix-blend-multiply animate-float scale-110 md:scale-[1.2] lg:scale-[1.3] translate-x-3 md:translate-x-6 z-20 transition-transform duration-700 ease-out hover:scale-[1.15] md:hover:scale-[1.25] lg:hover:scale-[1.35]"
                 referrerPolicy="no-referrer"  loading="lazy" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
