import React, { useState } from 'react';
import { Eye, Target, Award, Gem, Heart, Shield, Sparkles, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisionMissionProps {
  lang: 'vi' | 'en';
}

export const VisionMission: React.FC<VisionMissionProps> = ({ lang }) => {
  const content = {
    vi: {
      title: 'Tầm Nhìn, Sứ Mệnh & Giá Trị',
      subtitle: 'Kim chỉ nam trên con đường mang năng lượng cân bằng đến thế hệ trẻ.',
      visionTitle: 'TẦM NHÌN',
      visionText: 'CHẠM tiên phong thay đổi định kiến của giới trẻ về những vật dụng hằng ngày - để kẹp tóc không chỉ là kẹp tóc, gương không chỉ là gương. Chúng tôi hướng tới trở thành thương hiệu hàng đầu cho những ai muốn tìm kiếm các món đồ độc bản mang năng lượng bản mệnh và định hình phong cách cá nhân của riêng mình.',
      missionTitle: 'SỨ MỆNH',
      missionItems: [
        'Mang đến niềm vui qua trải nghiệm tự do sáng tạo, giúp người trẻ thổi hồn bản sắc, biến những món đồ thân thuộc thành tuyên ngôn cá tính của riêng mình.',
        'Cung cấp các dòng kẹp, gương thiết kế chuẩn sắc màu, đạt độ bền cao, tinh tế với mức giá hợp lý và dễ tiếp cận.',
        'Biến những vật dụng vô tri thành "món đồ hộ mệnh" nhỏ gọn, giúp người trẻ luôn chỉn chu về diện mạo và nhẹ nhàng, an tâm về tâm trí trong cuộc sống hằng ngày.'
      ],
      valuesTitle: 'GIÁ TRỊ CỐT LÕI',
      valuesLabel: 'Hành trình được soi sáng bởi hệ giá trị bền vững C-H-A-M:'
    },
    en: {
      title: 'Vision, Mission & Core Values',
      subtitle: 'The guiding light of CHẠM in bringing harmonized energy to the modern youth.',
      visionTitle: 'VISION',
      visionText: 'CHẠM pioneers a shift in how the modern youth perceive everyday items - ensuring that hair accessories and mirrors transcend their basic utility. We aspire to become the leading brand for individuals seeking custom pieces that reflect their intrinsic energy and define their unique personal identity.',
      missionTitle: 'MISSION',
      missionItems: [
        'We empower young people to infuse their own identity into familiar items, transforming everyday essentials into personal statements.',
        'We provide lines of hair claws and mirrors crafted with high durability, distinct design, and premium quality - all at a reasonable price.',
        'We turn ordinary objects into compact "good-luck charms," ensuring you step into each day with a polished look and a peaceful, confident mind.'
      ],
      valuesTitle: 'CORE VALUES',
      valuesLabel: 'Our journey is illuminated by the foundational C-H-A-M values:'
    }
  };

  const coreValues = [
    {
      letter: 'C',
      titleVi: 'Customization (Tính Cá Nhân Hóa)',
      titleEn: 'Customization',
      descVi: 'CHẠM không bán những sản phẩm rập khuôn. Ở đây, bạn luôn là người quyết định diện mạo của món đồ qua trải nghiệm tự decor, tạo ra những sản phẩm mang đậm gu thẩm mỹ cá nhân.',
      descEn: 'CHẠM rejects mass-produced, standardized products. Here, you are always the creator of your own items through a hands-on decorating experience, crafting pieces that uniquely reflect your personal aesthetic.',
      color: '#E28C9A',
      icon: Gem
    },
    {
      letter: 'H',
      titleVi: 'High-quality (Chất Lượng Vượt Trội)',
      titleEn: 'High-quality',
      descVi: 'Năng lượng tốt phải đi đôi với một sản phẩm tốt. CHẠM ở đây để mang tới những chiếc kẹp, chiếc gương có chất liệu bền bỉ, độ hoàn thiện cao và thiết kế khác biệt, xứng đáng với số tiền bạn bỏ ra.',
      descEn: 'Positive energy must go hand-in-hand with an exceptional product. CHẠM commits to delivering hair claws and mirrors made from durable materials, featuring premium finishes and distinct designs that truly value your investment.',
      color: '#EADAB7',
      icon: Shield
    },
    {
      letter: 'A',
      titleVi: 'Assist (Sự Đồng Hành Hỗ Trợ)',
      titleEn: 'Assist',
      descVi: 'Chúng tôi không chỉ bán một vật dụng vô tri. Mỗi sản phẩm được thiết kế chuẩn theo sắc màu bản mệnh, đóng vai trò như một người bạn đồng hành hỗ trợ năng lượng thầm lặng, đem lại sự nhẹ nhàng và an tâm cho bạn mỗi ngày.',
      descEn: 'We offer more than just sell inanimate objects. Every piece is curated to match your natal color scheme, serving as a silent companion that supports your energy, bringing peace of mind and comfort to your daily life.',
      color: '#68B2A0',
      icon: Heart
    },
    {
      letter: 'M',
      titleVi: 'Meaningful (Sự Ý Nghĩa)',
      titleEn: 'Meaningful',
      descVi: 'Biến thói quen kẹp tóc, soi gương vội vã hằng ngày thành một khoảnh khắc "chạm" ý nghĩa - nơi bạn dừng lại một giây để chăm sóc diện mạo và nạp lại năng lượng.',
      descEn: 'We transform the rushed, everyday routine of fixing your hair or checking the mirror into a meaningful moment of connection - a split second to check in on your look, pause, and recharge your inner light.',
      color: '#805C72',
      icon: Sparkles
    }
  ];

  const active = content[lang];

  return (
    <div id="vision-mission-page" className="md:px-4 max-w-4xl mx-auto py-8 md:py-14 animate-fade-in relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#E28C9A]/10">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl text-[#00687A] font-normal tracking-tight">
            {active.title}
          </h1>
          <p className="text-[#00687A]/70 text-xs md:text-sm mt-1">
            {active.subtitle}
          </p>
        </div>
      </div>

      {/* Grid: Vision & Mission column split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
        
        {/* Vision Card panel */}
        <div className="bg-[#FAF4EF] border border-[#E28C9A]/12 rounded-3xl p-8 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EADAB7]/8 rounded-full blur-2xl" />
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E28C9A]/20 flex items-center justify-center text-[#E28C9A] shadow-xs">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-coheading font-black tracking-widest text-[#00687A] text-sm md:text-md uppercase">
              {active.visionTitle}
            </h2>
            <p className="text-[#00687A]/80 text-sm md:text-base leading-relaxed text-justify font-serif">
              {active.visionText}
            </p>
          </div>
          <div className="pt-6 relative z-10">
            <div className="h-[1px] w-12 bg-[#EADAB7]" />
          </div>
        </div>

        {/* Mission Card panel */}
        <div className="bg-[#FBF5F2] border border-[#E28C9A]/12 rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-xs">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#E28C9A]/6 rounded-full blur-2xl" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E28C9A]/20 flex items-center justify-center text-[#E28C9A] shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-coheading font-black tracking-widest text-[#00687A] text-sm md:text-md uppercase">
              {active.missionTitle}
            </h2>
            
            <ul className="space-y-4">
              {active.missionItems.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-xs md:text-sm text-[#00687A]/85 leading-relaxed text-justify font-serif">
                  <span className="text-[#E28C9A] font-bold text-xs shrink-0 mt-0.5">0{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Section: Core Values (C-H-A-M) layout */}
      <div className="space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <div className="inline-flex items-center justify-center bg-[#E28C9A]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border border-[#E28C9A]/15 text-[#E28C9A]">
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>Chữ Vàng Thương Hiệu</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#00687A] font-bold">
            {active.valuesTitle}
          </h2>
          <p className="text-[#00687A]/75 text-xs md:text-sm font-medium">
            {active.valuesLabel}
          </p>
        </div>

        {/* Four Column Bento Grid of C-H-A-M elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div 
                key={val.letter} 
                className="group bg-white hover:bg-[#FBF5F2]/40 transition-colors duration-400 p-6 md:p-8 rounded-3xl border border-slate-200/50 flex flex-col justify-between space-y-4 shadow-3xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-4xl md:text-5xl font-black font-serif italic selection:bg-slate-300"
                      style={{ color: val.color }}
                    >
                      {val.letter}
                    </span>
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shadow-3xs group-hover:scale-105 transition-transform"
                      style={{ color: val.color, backgroundColor: `${val.color}10` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-[#00687A] tracking-wider uppercase font-coheading mt-2">
                    {lang === 'vi' ? val.titleVi : val.titleEn}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[#00687A]/80 leading-relaxed text-justify font-serif">
                    {lang === 'vi' ? val.descVi : val.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
