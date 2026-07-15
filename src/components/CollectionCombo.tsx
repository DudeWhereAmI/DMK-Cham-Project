import React, { useState } from 'react';
import { getProductBasePrice } from '../data';
import newComboImage from '../assets/images/regenerated_image_1782808812744.png';

interface ComboProfile {
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

const COMBOS: ComboProfile[] = [
  {
    id: 'mirror_combo',
    nameVi: 'Chạm Ánh Nhìn',
    nameEn: 'Touch of Glance',
    descVi: 'Sự kết hợp hoàn hảo giữa hai thiết kế gương soi và kẹp tóc, tiếp nối phong cách chạm khắc hai mặt đầy tinh tế và cá tính.',
    descEn: 'A perfect pairing of two mirror and hair clip designs, continuing the delicate and expressive double-sided engraving style.',
    colorHex: '#00687A',
    gradientFrom: '#008C9A',
    gradientTo: '#00485A',
    imgUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@8c3283d652661f5c4524e67d35f7057b8c547916/M%E1%BA%AAU.png'
  },
  {
    id: 'couple_combo',
    nameVi: 'Chạm Cùng Nhau',
    nameEn: 'Touch Together',
    descVi: 'Sự cộng hưởng từ bộ đôi kẹp tóc, đánh thức và lan tỏa nguồn năng lượng tích cực bên trong bạn. Kết nối những bản thể độc bản qua thiết kế chạm khắc tinh tế, lan tỏa tần số an yên và đồng hành trên hành trình khẳng định cá tính.',
    descEn: 'The resonance from the hair clip duo, awakening and spreading positive energy within you. Connecting unique individual frequencies through delicate engraved designs, spreading harmonized peace and accompanying you on the journey of self-expression.',
    colorHex: '#E28C9A',
    gradientFrom: '#FFD3D4',
    gradientTo: '#E59CA0',
    imgUrl: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@8c3283d652661f5c4524e67d35f7057b8c547916/M%E1%BA%AAU.png'
  }
];

interface CollectionComboProps {
  lang: 'vi' | 'en';
  onNavigateCustomizer: (comboId: string, clipStyleId: string) => void;
}

export const CollectionCombo: React.FC<CollectionComboProps> = ({
  lang,
  onNavigateCustomizer
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [comboClipSelections, setComboClipSelections] = useState<Record<string, string>>({
    'couple_combo': 'kep-1', // Default Xà Cừ
    'mirror_combo': 'kep-2'  // Default Pha Lê
  });

  const handleClipSelect = (e: React.MouseEvent, comboId: string, clipId: string) => {
    e.stopPropagation();
    setComboClipSelections(prev => ({ ...prev, [comboId]: clipId }));
  };

  const getComboPrice = (comboId: string) => {
    const selectedClipId = comboClipSelections[comboId];
    if (comboId === 'couple_combo') {
      return getProductBasePrice(selectedClipId) * 2;
    } else {
      return getProductBasePrice(selectedClipId) + getProductBasePrice('guong');
    }
  };

  const getComboImage = (comboId: string) => {
    if (comboId === 'couple_combo') {
      return newComboImage;
    } else {
      return 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A3nh%20combo%20ch%E1%BA%A1m%20c%C3%B9ng%20nhau%20.png';
    }
  };

  return (
    <div className="w-full h-[80vh] min-h-[700px] overflow-hidden flex flex-col md:flex-row gap-2">
      {COMBOS.filter(combo => combo.id !== 'couple_combo').map((combo, index) => {
        const isActive = activeIndex === index;
        const currentPrice = getComboPrice(combo.id);
        const selectedClip = comboClipSelections[combo.id];
        
        return (
          <div
            key={combo.id}
            onClick={() => setActiveIndex(index)}
            className={`
              relative flex flex-col md:flex-row items-center justify-center 
              transition-all duration-1000 ease-in-out overflow-hidden cursor-pointer
              ${isActive ? 'flex-[4]' : 'flex-1'}
            `}
            style={{ 
              backgroundColor: isActive ? combo.colorHex : `${combo.colorHex}40`,
            }}
          >
            {/* Background elements when active */}
            {isActive && (
              <div 
                className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(to bottom right, ${combo.gradientFrom}, ${combo.gradientTo})`
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
                        {new Intl.NumberFormat('vi-VN').format(currentPrice)}<span className="text-xs underline ml-0.5">đ</span>
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wider leading-tight">
                  {lang === 'vi' ? combo.nameVi : combo.nameEn}
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-sm font-semibold leading-relaxed">
                  {lang === 'vi' ? combo.descVi : combo.descEn}
                </p>
                
                {/* Material Selector */}
                <div className="flex flex-col gap-2 mt-2 w-full max-w-[300px]">
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                    {lang === 'vi' ? 'Chọn loại kẹp' : 'Select Clip Style'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleClipSelect(e, combo.id, 'kep-1')}
                      className={`flex-1 py-2 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all border ${selectedClip === 'kep-1' ? 'bg-white text-[#990000] border-white shadow-md' : 'bg-transparent text-white/80 border-white/40 hover:bg-white/10'}`}
                    >
                      {lang === 'vi' ? 'Kẹp Ánh Mây' : 'Cloud Glow Clip'}
                    </button>
                    <button
                      onClick={(e) => handleClipSelect(e, combo.id, 'kep-2')}
                      className={`flex-1 py-2 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all border ${selectedClip === 'kep-2' ? 'bg-white text-[#990000] border-white shadow-md' : 'bg-transparent text-white/80 border-white/40 hover:bg-white/10'}`}
                    >
                      {lang === 'vi' ? 'Kẹp Pha Lê' : 'Crystal Clip'}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateCustomizer(combo.id, selectedClip);
                  }}
                  className="mt-4 px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-base uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
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
                  src={getComboImage(combo.id)} 
                  alt={combo.nameEn} 
                  className="w-[100%] h-[100%] max-w-[500px] md:max-w-[600px] object-contain drop-shadow-2xl mix-blend-multiply animate-float scale-110 z-20 translate-x-0 -translate-y-4 md:-translate-x-2 md:-translate-y-6 lg:-translate-x-4 lg:-translate-y-8 -rotate-3"
                 referrerPolicy="no-referrer"  />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
