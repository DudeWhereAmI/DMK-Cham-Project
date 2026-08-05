import re

with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

# We'll just build a clean LandingPage component based on the collectionsData
new_component = """
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  lang: 'vi' | 'en';
  onEnterShop: () => void;
  onNavigateCollection?: (collectionId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onNavigateCollection }) => {
  // Collections data
  type ImageItem = string | string[];
  const collectionsData: {
    id: string;
    title: string;
    nameVi: string;
    nameEn: string;
    descVi: string;
    descEn: string;
    images: ImageItem[];
    glowColor: string;
  }[] = [
    {
      id: 'collection-01',
      title: 'COLLECTION 01',
      nameVi: 'CHẠM TÔI',
      nameEn: 'CHẠM TÔI (TOUCH ME)',
      descVi: '"CHẠM Tôi" là bộ sưu tập dành cho những ai muốn khẳng định bản sắc cá nhân một cách rõ nét nhất. Tại đây, bạn có thể khắc tên riêng lên phôi kẹp tóc hoặc gương, biến một món phụ kiện quen thuộc hằng ngày thành một vật phẩm mang dấu ấn độc nhất. Bạn sẽ tự tay lựa chọn các món charm trang trí nhỏ, tự do sắp đặt vị trí và layout theo đúng gu thẩm mỹ của mình. Mỗi sản phẩm hoàn thiện chính là một lời khẳng định đầy kiêu hãnh rằng không ai giống ai, và chính sự khác biệt ấy mới làm nên giá trị độc bản của chính bạn.',
      descEn: 'A collection for those who want to assert their personal identity most clearly. You can engrave your name on a hair clip or mirror, turning a daily accessory into a unique item.',
      images: [
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/pha%20l%C3%AA%20ch%E1%BB%AF%20d%C3%A1n%205%20m%C3%A0u.png'
      ],
      glowColor: 'rgba(236, 72, 153, 0.4)'
    },
    {
      id: 'collection-02',
      title: 'COLLECTION 02',
      nameVi: 'CHẠM THÂN',
      nameEn: 'CHẠM THÂN (TOUCH SPIRIT)',
      descVi: 'Khác với "CHẠM Tôi" tập trung vào cái tôi hữu hình, "CHẠM Thân" hướng bạn quay về với cội nguồn năng lượng vô hình của chính mình thông qua triết lý Ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ). Tại bộ sưu tập này, không có yếu tố tên riêng hay tùy chỉnh cá nhân. Thay vào đó, mỗi chiếc kẹp hoặc gương sẽ được thiết kế nguyên bản với biểu tượng Linh vật bản mệnh tương ứng với từng mệnh cách. Đây là một vật phẩm mang tính biểu tượng, như một tấm bùa bình an, giúp bạn tìm thấy sự cân bằng, vững chãi và cảm giác được bảo vệ từ sâu bên trong.',
      descEn: 'Unlike "Touch Me", this collection guides you back to your invisible energy roots through the Five Elements philosophy. Each item is designed with a Guardian symbol corresponding to your destiny element.',
      images: [
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png'
      ],
      glowColor: 'rgba(56, 189, 248, 0.4)'
    },
    {
      id: 'collection-03',
      title: 'COLLECTION 03',
      nameVi: 'CHẠM ĐÔI',
      nameEn: 'CHẠM ĐÔI (TOUCH SYNERGY)',
      descVi: 'Là sự giao thoa hoàn chỉnh nhất tại CHẠM, bộ sưu tập này dung hòa trọn vẹn giữa bản sắc cá nhân bên ngoài và nguồn năng lượng bản mệnh bên trong. Bạn sẽ kết hợp cả Tên riêng lẫn Linh vật bản mệnh trên cùng một chiếc kẹp hoặc gương. Bằng việc tự tay bài trí, bạn đang tạo ra một bệ phóng tinh thần vững chãi, một phiên bản độc bản tối thượng thuộc về riêng bạn, đồng hành cùng bạn bước ra thế giới.',
      descEn: 'The most complete intersection at CHẠM, harmonizing personal identity and elemental energy. You will combine your Name and your Guardian on the same piece.',
      images: [
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A2NH%20COLLECTION%20CH%E1%BA%A0M%20%C4%90%C3%94I%20%E1%BB%9E%20TRANG%20CH%E1%BB%A6%20.png'
      ],
      glowColor: 'rgba(234, 179, 8, 0.4)'
    }
  ];

  return (
    <div id="landing-page-view" className="font-serif text-[#00687A] animate-fade-in flex flex-col py-8 w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest font-sans text-[#00687A] mb-4">
          {lang === 'vi' ? 'Bộ Sưu Tập Của Chạm' : 'Chạm Collections'}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto italic font-serif">
          {lang === 'vi' ? 'Khám phá những câu chuyện độc bản qua từng bộ sưu tập được thiết kế riêng cho bạn.' : 'Discover unique stories through collections designed specifically for you.'}
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {collectionsData.map((el, index) => {
          const isEven = index % 2 === 0;
          return (
            <section 
              key={el.id} 
              className="relative w-full bg-white/95 backdrop-blur-md rounded-[32px] border border-white/50 shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigateCollection && onNavigateCollection(el.id)}
            >
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} p-6 md:p-10 lg:p-12 gap-8 items-center`}>
                
                {/* Image Area */}
                <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] items-center">
                   {/* Ambient glow */}
                   <div 
                     className="absolute inset-0 rounded-full blur-[100px] opacity-40 -z-10 scale-125 transition-colors duration-1000"
                     style={{ backgroundColor: el.glowColor }}
                   />
                   
                   {/* Beige tone circular highlight */}
                   <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-[#E6D9C5]/40 blur-2xl -z-10 pointer-events-none" />
                   
                   <div className="relative w-full flex justify-center items-center">
                     <img 
                        src={el.images[0] as string} 
                        alt={el.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto max-w-[320px] md:max-w-[400px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                   </div>
                </div>

                {/* Text Area */}
                <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
                  <span className="px-5 py-2 rounded-full bg-[#00687A]/10 border border-[#00687A]/20 text-xs md:text-sm lg:text-base font-sans font-black uppercase tracking-widest text-[#00687A] shadow-sm inline-block mb-4 self-center md:self-start">
                    {el.title}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#00687A] font-serif mb-4 leading-[1.2] uppercase text-balance">
                    {lang === 'vi' ? el.nameVi : el.nameEn}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-700 font-serif leading-relaxed max-w-[600px] mx-auto md:mx-0 text-justify">
                    {lang === 'vi' ? el.descVi : el.descEn}
                  </p>
                  
                  <div className="mt-8 flex justify-center md:justify-start">
                    <div className="px-6 py-3 rounded-full bg-[#E28C9A] text-white flex items-center gap-2 font-sans font-black uppercase tracking-widest text-sm md:text-base shadow-md group-hover:bg-[#00687A] transition-colors">
                      <span>{lang === 'vi' ? 'Xem ngay' : 'Explore'}</span>
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
"""

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(new_component)
