import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface MaterialsSubpageProps {
  lang: 'vi' | 'en';
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const MaterialsSubpage: React.FC<MaterialsSubpageProps> = ({ lang, onNavigateHome, onNavigateShop }) => {
  const materialsData = [
    {
      id: 'mat-01',
      titleVi: 'Bộ Ba Kẹp Tóc Bản Mệnh – Định Hình Phong Cách',
      titleEn: 'The Three Elemental Styling Clips',
      nameVi: 'Kẹp Xà Cừ (Mother of Pearl)',
      nameEn: 'Mother of Pearl',
      descVi: 'Mang nét đẹp cổ điển, sang trọng với hiệu ứng bắt sáng thanh lịch. Phù hợp cho những ngày bạn cần sự điềm tĩnh, chỉn chu và thu hút may mắn một cách tinh tế.',
      descEn: 'Brings classic, luxurious beauty with an elegant light-catching effect. Perfect for days when you need calmness, neatness, and a subtle charm of luck.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-47.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/kim%20.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/m%E1%BB%99c.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/thu%E1%BB%B7.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/ho%E1%BA%A3.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/th%E1%BB%95.png'
      ],
    },
    {
      id: 'mat-02',
      titleVi: 'Bộ Ba Kẹp Tóc Bản Mệnh – Định Hình Phong Cách',
      titleEn: 'The Three Elemental Styling Clips',
      nameVi: 'Kẹp Pha Lê (Crystal)',
      nameEn: 'Crystal',
      descVi: 'Trong suốt, lấp lánh và thuần khiết. Biểu tượng cho một nguồn năng lượng sạch, giúp thanh lọc tâm trí, mang lại sự sáng suốt và nhẹ nhàng cho bạn mỗi ngày.',
      descEn: 'Transparent, sparkling, and pure. A symbol of clean energy, helping to purify the mind, bringing clarity and lightness to your every day.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-2.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/kim%20.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/m%E1%BB%99c.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/thu%E1%BB%B7.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/ho%E1%BA%A3.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/th%E1%BB%95.png'
      ],
    },
    {
      id: 'mat-03',
      titleVi: 'Bộ Ba Kẹp Tóc Bản Mệnh – Định Hình Phong Cách',
      titleEn: 'The Three Elemental Styling Clips',
      nameVi: 'Kẹp Vỏ Sò Ánh Nhũ (Seashell of Shimmering)',
      nameEn: 'Seashell of Shimmering',
      descVi: 'Mang hơi thở tự do của biển cả với những đường vân tự nhiên, độc bản. Dành riêng cho những tâm hồn phóng khoáng, thích sáng tạo và muốn tìm kiếm sự hanh thông, tươi mới.',
      descEn: 'Carries the free breath of the ocean with unique, natural patterns. Dedicated to open-minded souls who love creativity and seek a fresh, prosperous flow.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-3.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/KIM.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/m%E1%BB%99c.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/thu%E1%BB%B7.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/ho%E1%BA%A3.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/th%E1%BB%95.png'
      ],
    }
  ];

  const limitedData = {
    titleVi: 'Phiên bản giới hạn',
    titleEn: 'Limited Edition',
    nameVi: 'Kẹp Limited "The Harmony"',
    nameEn: 'Limited "The Harmony" Clip',
    subNameVi: '(Cánh Tiên Đổi Màu)',
    subNameEn: '(Color-changing wings)',
    descVi: 'Sự giao thoa của các Bản mệnh. Đây là thiết kế đặc biệt nhất tại CHẠM. Chiếc kẹp có khả năng thay đổi màu sắc theo ánh sáng và góc nhìn ẩn dụ cho sự chuyển dịch và giao thoa mượt mà giữa các dòng năng lượng Ngũ hành.',
    descEn: 'The intersection of the Elements. This is the most special design at CHẠM. The clip can change color depending on lighting and viewing angle, a metaphor for the smooth transition and harmony among the Five Elements energy flows.',
    descVi2: 'Điểm đặc biệt nhất của phiên bản này là chỉ khi bước ra ánh nắng mặt trời, chiếc kẹp mới bắt đầu chuyển mình và thay đổi màu sắc.',
    descEn2: 'The most special feature of this edition is that only when stepping out into the sunlight does the clip begin to transform and change colors.',
    highlightVi: 'Nó ẩn dụ cho chính hành trình của bạn — năng lượng nội tại và bản sắc độc bản của bạn chỉ thực sự tỏa sáng rực rỡ nhất khi bạn can đảm bước ra ngoài thế giới, đón lấy ánh mặt trời và làm chủ cuộc sống của chính mình. Một món đồ tối thượng dành cho những ai sở hữu cá tính mạnh mẽ, không thích sự rập khuôn.',
    highlightEn: 'It\'s a metaphor for your own journey — your internal energy and unique identity only truly shine their brightest when you have the courage to step out into the world, embrace the sun, and take mastery of your own life. An ultimate item for those with strong personalities who dislike conformity.',
    images: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/1.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-28.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-24.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-25.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-27.png'
    ]
  };

  const [activeIndices, setActiveIndices] = useState([0, 0, 0]);
  const [activeLimitedIndex, setActiveLimitedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices(prev => prev.map((idx, i) => (idx + 1) % materialsData[i].images.length));
      setActiveLimitedIndex(prev => (prev + 1) % limitedData.images.length);
    }, 4000); // Rotate images every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-serif pt-24 md:pt-32 pb-20 animate-fade-in relative z-0">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E28C9A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00687A]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Back Button */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-[#00687A]/70 hover:text-[#00687A] transition-colors mb-12 font-sans text-sm tracking-wide font-medium group relative z-20"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>{lang === 'vi' ? 'Quay lại Trang Chủ' : 'Back to Home'}</span>
        </button>

        <div className="text-center mb-16 relative">
             <div className="w-16 h-1 bg-[#00687A]/20 mx-auto mb-8 rounded-full" />
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00687A] uppercase tracking-tight mb-6">
                {lang === 'vi' ? 'Nguyên Vật Liệu' : 'Our Materials'}
             </h1>
             <p className="text-slate-600 italic text-lg md:text-xl font-light">
                {lang === 'vi' ? 'Khơi nguồn cảm hứng độc bản.' : 'Inspiring unique creations.'}
             </p>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-16 mb-24 max-w-5xl mx-auto overflow-hidden">
             <div className="mb-12">
               <h2 className="text-2xl md:text-3xl font-black text-[#00687A] uppercase tracking-wider mb-6 text-center">
                 {lang === 'vi' ? 'Bộ Ba Kẹp Tóc Bản Mệnh – Định Hình Phong Cách' : 'The Three Elemental Styling Clips'}
               </h2>
               <div className="w-12 h-[2px] bg-[#E28C9A] mx-auto mb-10" />
               
               <div className="space-y-16">
                 {materialsData.map((mat, index) => (
                   <div key={mat.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 group`}>
                     <div className="w-full md:w-5/12 overflow-hidden rounded-2xl relative shadow-md bg-slate-50 min-h-[300px]">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
                       {mat.images.map((img, imgIndex) => (
                          <img 
                            key={imgIndex}
                            src={img} 
                            alt={`${mat.id} - ${imgIndex}`} 
                            className={`absolute inset-0 w-full h-[300px] object-contain transition-all duration-1000 ease-in-out ${imgIndex === activeIndices[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            referrerPolicy="no-referrer"
                          />
                       ))}
                     </div>
                     <div className={`w-full md:w-7/12 ${index % 2 === 1 ? 'text-left md:text-right' : ''}`}>
                       <h3 className={`text-2xl font-bold text-[#00687A] mb-4 flex items-center ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'} gap-2`}>
                         {lang === 'vi' ? mat.nameVi : mat.nameEn}
                       </h3>
                       <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                         {lang === 'vi' ? mat.descVi : mat.descEn}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="mt-16 pt-16 border-t border-[#00687A]/10 bg-gradient-to-br from-slate-50 to-[#FADBDC]/20 -mx-8 md:-mx-16 px-8 md:px-16 pb-8 md:pb-16 rounded-b-[40px] relative">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E28C9A]/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="w-full md:w-1/2">
                       <div className="flex items-center gap-2 text-[#E28C9A] font-bold text-xs uppercase tracking-widest mb-4">
                         <Sparkles className="w-4 h-4" />
                         <span>{lang === 'vi' ? limitedData.titleVi : limitedData.titleEn}</span>
                       </div>
                       <h2 className="text-3xl lg:text-4xl font-black text-[#00687A] uppercase tracking-wider mb-6">
                         {lang === 'vi' ? limitedData.nameVi : limitedData.nameEn}
                         <span className="block text-[#E28C9A] text-lg lg:text-xl mt-2 tracking-wide font-normal font-serif">
                           {lang === 'vi' ? limitedData.subNameVi : limitedData.subNameEn}
                         </span>
                       </h2>
                       <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                         <p>{lang === 'vi' ? limitedData.descVi : limitedData.descEn}</p>
                         <p>{lang === 'vi' ? limitedData.descVi2 : limitedData.descEn2}</p>
                         <div className="bg-white p-6 rounded-2xl border border-[#00687A]/10 shadow-sm mt-6 italic relative overflow-hidden">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E28C9A]" />
                           {lang === 'vi' ? limitedData.highlightVi : limitedData.highlightEn}
                         </div>
                       </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative min-h-[400px] items-center">
                       <div className="absolute inset-0 bg-[#E28C9A]/20 blur-[60px] rounded-full scale-75 -z-10" />
                       {limitedData.images.map((img, imgIndex) => (
                          <img 
                            key={imgIndex}
                            src={img} 
                            alt={`Limited - ${imgIndex}`} 
                            className={`absolute w-full max-w-[400px] h-auto drop-shadow-2xl transition-all duration-1000 ease-in-out ${imgIndex === activeLimitedIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            referrerPolicy="no-referrer"
                          />
                       ))}
                    </div>
                  </div>
                </div>
             </div>
        </div>

        <div className="flex justify-center mt-12 mb-16 relative z-10">
          <button
            onClick={onNavigateShop}
            className="px-12 py-5 bg-[#00687A] text-white hover:bg-[#005260] font-sans font-bold text-sm tracking-widest uppercase rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3"
          >
            <span>{lang === 'vi' ? 'Tiếp tục Khám Phá' : 'Continue Shopping'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

