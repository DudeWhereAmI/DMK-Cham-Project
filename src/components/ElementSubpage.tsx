import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ElementSubpageProps {
  elementId: string;
  lang: 'vi' | 'en';
  onNavigateBack: () => void;
  onEnterShop: () => void;
}

const elementsData = [
  {
    id: 'kim',
    nameVi: 'Trắng Kim Cương (Mệnh Kim)',
    nameEn: 'Opaline White (Metal)',
    descVi: 'Đại diện cho sự rõ ràng, sắc bén và tinh tế tối giản.',
    descEn: 'Represents pristine clarity, sharpness, and minimalist sophistication.',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/kim.png',
    slides: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/kim%20.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/KIM.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/kim%20.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/KIM.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/1.png',
    ],
    bgColor: 'bg-[#F2F4F8]',
    textColor: 'text-[#00687A]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Pha Lê (Crystal)", desc: "Trong suốt, lấp lánh và thuần khiết. Biểu tượng cho một nguồn năng lượng sạch, giúp thanh lọc tâm trí và mang lại sự sáng suốt phù hợp với Mệnh Kim." },
        { name: "Kẹp Xà Cừ (Mother of Pearl)", desc: "Mang nét đẹp cổ điển, sang trọng bắt sáng thanh lịch, như kim loại quý. Phù hợp cho những ngày bạn cần sự điềm tĩnh và thu hút may mắn." }
      ],
      limited: "Để phá cách, The Harmony chuyển màu linh hoạt giúp Mệnh Kim giao thoa vạn vật, tỏa sáng vượt qua ranh giới khi bước ra ánh sáng."
    },
    materialsEn: {
      title: "Recommended Synergistic Materials",
      items: [
        { name: "Crystal", desc: "Transparent and pure. A symbol of clean energy, purifying the mind and bringing clarity suited for the Metal element." },
        { name: "Mother of Pearl", desc: "Classic luxury with an elegant light-catching effect. Perfect for days requiring calmness and neatness." }
      ],
      limited: "For a creative twist, The Harmony shifts colors smoothly, helping Metal harmonize with all elements when exposed to the sun."
    }
  },
  {
    id: 'moc',
    nameVi: 'Xanh Lục Bảo (Mệnh Mộc)',
    nameEn: 'Sage Green (Wood)',
    descVi: 'Năng lượng của sự sinh trưởng, chữa lành và khởi đầu tươi mới.',
    descEn: 'The energy of growth, holistic healing, and fresh beginnings.',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/m%E1%BB%99c.png',
    slides: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/m%E1%BB%99c.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/m%E1%BB%99c%20.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/m%E1%BB%99c.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/m%E1%BB%99c.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-28.png',
    ],
    bgColor: 'bg-[#E3F2CE]/30',
    textColor: 'text-[#5B7536]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Vỏ Sò Ánh Nhũ (Seashell)", desc: "Hơi thở tự nhiên của biển cả (Thủy sinh Mộc). Vân vỏ tự nhiên độc bản dành riêng cho những tâm hồn khao khát sinh trưởng, tươi mới và hanh thông." },
        { name: "Kẹp Pha Lê (Crystal)", desc: "Như dòng nước trong lành tưới tiêu vạn vật, pha lê thuần khiết là điểm tựa cho sự sinh sôi vững chãi của Mộc." }
      ],
      limited: "Phiên bản The Harmony (Cánh tiên) nạp năng lượng mặt trời chuyển hóa rực rỡ, tượng trưng cho quá trình quang hợp vươn mình của Mộc."
    },
    materialsEn: {
      title: "Recommended Synergistic Materials",
      items: [
        { name: "Seashell of Shimmering", desc: "The natural breath of the ocean (Water nourishes Wood). Unique patterns for souls desiring fresh growth and prosperity." },
        { name: "Crystal", desc: "Like clear water nourishing all things, pure crystal is the anchor for Wood's steady blossoming." }
      ],
      limited: "The Harmony edition relies on the sun to transform beautifully, symbolizing Wood's upward growth and photosynthesis."
    }
  },
  {
    id: 'thuy',
    nameVi: 'Xanh Biển Thẳm (Mệnh Thủy)',
    nameEn: 'Ocean Aquamarine (Water)',
    descVi: 'Đại diện cho sự sâu sắc, trực giác nhạy bén và dòng chảy hanh thông.',
    descEn: 'Represents profound depth, keen intuition, and a prosperous flow.',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/thu%E1%BB%B7%20.png',
    slides: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/thu%E1%BB%B7.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/thu%E1%BB%B7.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/thu%E1%BB%B7.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/thu%E1%BB%B7.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-24.png',
    ],
    bgColor: 'bg-[#D1ECFC]/30',
    textColor: 'text-[#2A658A]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Vỏ Sò Ánh Nhũ (Seashell)", desc: "Hiện thân chân thực nhất cho Thủy. Mang hơi thở tự do của biển cả cùng đường vân lấp lánh như sóng nước, hỗ trợ dòng chảy từ trường mạnh mẽ." },
        { name: "Kẹp Pha Lê (Crystal)", desc: "Kim sinh Thủy - sự trong nhẵn của pha lê thúc đẩy nguồn chảy Thủy được hanh thông nhất, thanh lọc tâm trí nhẹ nhàng mỗi ngày." }
      ],
      limited: "The Harmony mang tới một mặt hồ quang phổ đa sắc. Phá bỏ rập khuôn để tự do làm chủ cuộc đời mình, như nước lan tỏa vạn mạch."
    },
    materialsEn: {
      title: "Recommended Synergistic Materials",
      items: [
        { name: "Seashell of Shimmering", "desc": "The truest embodiment of Water. Bearing the free breath of the sea and wave-like patterns to empower your energetic flow." },
        { name: "Crystal", "desc": "Metal nourishes Water - the smoothness of crystal ensures the smoothest flow, gently purifying the mind every day." }
      ],
      limited: "The Harmony presents a multi-colored shimmering surface. Break the mold to freely master your life, just like water spreading boundlessly."
    }
  },
  {
    id: 'hoa',
    nameVi: 'Đỏ Hồng Hoang (Mệnh Hỏa)',
    nameEn: 'Warm Rose (Fire)',
    descVi: 'Đánh thức ngọn lửa đam mê, sự tự tin và sức hút nổi bật.',
    descEn: 'Awakens the flame of passion, self-confidence, and striking charisma.',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/ho%E1%BA%A3.png',
    slides: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/ho%E1%BA%A3.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/ho%E1%BA%A3.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/ho%E1%BA%A3.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/ho%E1%BA%A3.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-25.png',
    ],
    bgColor: 'bg-[#FADBDC]/30',
    textColor: 'text-[#A8323E]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Limited 'The Harmony'", desc: "Là chân ái của hệ Hỏa. Thiết kế chỉ tỏa sáng rực rỡ và chuyển hóa đa tầng nhất khi đón đủ ánh nắng mặt trời, nạp hỏa khí uy lực cho sự nhiệt huyết." },
        { name: "Kẹp Xà Cừ (Mother of Pearl)", desc: "Mang nét đẹp cổ điển, đóng vai trò như tĩnh lại ngọn lửa quá mãnh liệt. Khuyên dùng cho những ngày Hỏa cần sự điềm tĩnh và bớt bốc đồng." }
      ],
      limited: "Bạn là ngọn lửa, và kẹp The Harmony là tuyên ngôn khi bạn can đảm vươn ra khỏi rập khuôn, chiếu sáng rực rỡ con đường riêng của chính mình."
    },
    materialsEn: {
      title: "Recommended Synergistic Materials",
      items: [
        { name: "Limited 'The Harmony'", desc: "The ultimate match for Fire. It shines and transforms the most when bathing in sunlight, fueling your inner enthusiasm." },
        { name: "Mother of Pearl", desc: "Classic beauty that serves to temper an overly fierce flame. Recommended for days when Fire needs more calmness and less impulsivity." }
      ],
      limited: "You are the flame, and The Harmony clip is a declaration of stepping out of the box, brightly lighting your very own path."
    }
  },
  {
    id: 'tho',
    nameVi: 'Vàng Hổ Phách (Mệnh Thổ)',
    nameEn: 'Champagne Sand (Earth)',
    descVi: 'Mang lại cảm giác vững chãi, bình yên, là bệ phóng cho sự an tâm.',
    descEn: 'Brings a sense of grounding and peace, serving as a foundation for security.',
    guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/th%E1%BB%95.png',
    slides: [
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/th%E1%BB%95.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/th%E1%BB%95.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/th%E1%BB%95.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/th%E1%BB%95.png',
      'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LIMITED%20EDITION/DMK%20%20BRAND%20ELEMENT%20-27.png',
    ],
    bgColor: 'bg-[#F5EAD4]/50',
    textColor: 'text-[#8A6A2C]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Xà Cừ (Mother of Pearl)", desc: "Sự thầm lặng mà toát lên sang trọng của xà cừ khắc họa chính xác bản chất vững chãi, bình yên của nền đất Thổ. Là bệ phóng hoàn hảo cho mọi điểm tựa." },
        { name: "Kẹp Pha Lê (Crystal)", desc: "Phá bỏ đi sự khô khan của nền đất, một viên pha lê trong tinh khiết sẽ tạo nên vòng xoáy năng lượng mềm mại và sáng suốt hơn." }
      ],
      limited: "Kẹp The Harmony với tia đổi màu dưới ánh nắng (Hỏa sinh Thổ) được đề xuất cho Thổ trong những ngày cần cởi bỏ vùng an toàn, tỏa sáng."
    },
    materialsEn: {
      title: "Recommended Synergistic Materials",
      items: [
        { name: "Mother of Pearl", desc: "The quiet yet luxurious shimmer of mother of pearl perfectly depicts the grounding, peaceful nature of Earth. A perfect foundation." },
        { name: "Crystal", desc: "Breaking Earth's dryness, a pure crystal creates a softer and more insightful energy vortex." }
      ],
      limited: "The Harmony clip, shifting beautifully under sunlight (Fire nourishes Earth), is highly recommended when Earth needs to step out of comfort zones."
    }
  }
];

export const ElementSubpage: React.FC<ElementSubpageProps> = ({ elementId, lang, onNavigateBack, onEnterShop }) => {
  const el = elementsData.find(e => e.id === elementId) || elementsData[0];
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSlideIndex(0); // Reset slide index on element change
  }, [elementId]);

  useEffect(() => {
    if (el.slides && el.slides.length > 0) {
      const interval = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % el.slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [el]);

  return (
    <div className={`min-h-[80vh] rounded-[32px] overflow-hidden shadow-lg border border-[#00687A]/5 animate-fade-in ${el.bgColor} flex flex-col md:flex-row max-w-7xl mx-auto items-stretch`}>
      {/* Left Content Area (Text) - Narrower */}
      <div className="w-full md:w-[40%] flex shrink-0 flex-col justify-center p-8 md:p-16 space-y-8 relative z-10">
        <button 
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00687A]/60 hover:text-[#00687A] transition-colors font-coheading mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'vi' ? 'Quay lại' : 'Back'}
        </button>

        <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${el.textColor} leading-tight`}>
          {lang === 'vi' ? el.nameVi : el.nameEn}
        </h1>

        <p className="font-serif text-lg md:text-xl xl:text-2xl text-slate-700 leading-relaxed max-w-xl text-justify">
          {lang === 'vi' ? el.descVi : el.descEn}
        </p>

        <div className="pt-6 border-t border-[#00687A]/10 mt-6 flex-1 overflow-y-auto max-h-[35vh] pr-2 custom-scrollbar">
          {lang === 'vi' ? (
            <div className="space-y-3 text-[11px] md:text-[13px] text-slate-700 font-serif leading-relaxed text-justify mb-6">
              <h3 className="font-bold text-[#00687A] uppercase text-[11px] md:text-xs tracking-wider font-coheading">
                {el.materialsVi?.title || "Bộ chất liệu tương sinh đề xuất"}
              </h3>
              <ul className="space-y-2">
                {el.materialsVi?.items?.map((item: any, idx: number) => (
                  <li key={idx}>
                    <strong className="text-[#00687A]">{item.name}:</strong> {item.desc}
                  </li>
                ))}
              </ul>
              
              {el.materialsVi?.limited && (
                <>
                  <h3 className="font-bold text-[#00687A] uppercase text-[11px] md:text-xs tracking-wider pt-2 border-t border-[#00687A]/10 mt-4 font-coheading flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Phiên bản giới hạn: "The Harmony"
                  </h3>
                  <div className="italic bg-white/40 p-2 md:p-3 rounded-xl border-l-[3px] border-[#00687A]/30 shadow-sm text-[11px] md:text-xs">
                    &rarr; {el.materialsVi.limited}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3 text-[11px] md:text-[13px] text-slate-700 font-serif leading-relaxed text-justify mb-6">
              <h3 className="font-bold text-[#00687A] uppercase text-[11px] md:text-xs tracking-wider font-coheading">
                {el.materialsEn?.title || "Recommended Synergistic Materials"}
              </h3>
              <ul className="space-y-2">
                {el.materialsEn?.items?.map((item: any, idx: number) => (
                  <li key={idx}>
                    <strong className="text-[#00687A]">{item.name}:</strong> {item.desc}
                  </li>
                ))}
              </ul>
              
              {el.materialsEn?.limited && (
                <>
                  <h3 className="font-bold text-[#00687A] uppercase text-[11px] md:text-xs tracking-wider pt-2 border-t border-[#00687A]/10 mt-4 font-coheading flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Limited Edition: "The Harmony"
                  </h3>
                  <div className="italic bg-white/40 p-2 md:p-3 rounded-xl border-l-[3px] border-[#00687A]/30 shadow-sm text-[11px] md:text-xs">
                    &rarr; {el.materialsEn.limited}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Image Slider Area - Much larger */}
      <div className="w-full md:w-[60%] flex shrink-0 relative group min-h-[400px] md:min-h-full">
        {/* Ambient glow backdrop */}
        <div className="absolute inset-0 bg-white/40 blur-[80px] rounded-full scale-75 group-hover:scale-110 transition-transform duration-1000 -z-10" />
        
        {el.slides && el.slides.length > 0 ? (
          <div className="relative w-full h-full flex items-center justify-center p-8 bg-white/20 backdrop-blur-sm border-l border-white/40 overflow-hidden">
             {/* Slider Area */}
             <div className="absolute inset-0 group-hover:blur-md group-hover:opacity-30 transition-all duration-700 z-0">
               {el.slides.map((slideUrl, idx) => {
                 const isActive = idx === activeSlideIndex;
                 const isMirror = slideUrl.includes('G%C6%AF%C6%A0NG');
                 const isKimMirror = isMirror && el.id === 'kim';
                 const isOtherMirror = isMirror && el.id !== 'kim';

                 return (
                    <img 
                      key={slideUrl}
                      src={slideUrl} 
                      referrerPolicy="no-referrer"
                      alt={`Slide ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${isKimMirror ? 'object-cover' : isOtherMirror ? 'object-contain scale-[0.85] md:scale-[0.75]' : 'object-contain scale-[0.8] md:scale-[0.7]'}`}
                    />
                 );
               })}
             </div>

             {/* Hover Massive Mascot (Centered) */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ease-out z-30 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 drop-shadow-2xl">
               <img 
                 src={el.guardianImg} 
                 referrerPolicy="no-referrer"
                 alt="Guardian Mascot Hover"
                 className="w-[280px] md:w-[380px] lg:w-[480px] h-auto object-contain"
               />
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   onEnterShop();
                 }}
                 className="mt-6 px-8 py-3 bg-white/90 backdrop-blur-md text-[#00687A] hover:bg-white font-coheading font-bold text-[11px] md:text-xs tracking-widest uppercase rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer pointer-events-auto border border-[#00687A]/30"
               >
                 <Sparkles className="w-4 h-4" />
                 <span>{lang === 'vi' ? 'Thiết Kế Sản Phẩm Mệnh Này' : 'Customize This Element'}</span>
               </button>
             </div>

             {/* Pagination Nodes Only - Button Removed For Normal State */}
             <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-end gap-5 z-20 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
               <div className="flex justify-center gap-2">
                 {el.slides.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={(e) => {
                       e.stopPropagation();
                       setActiveSlideIndex(idx);
                     }}
                     className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${idx === activeSlideIndex ? 'w-6 bg-[#00687A]' : 'w-2 bg-[#00687A]/20 hover:bg-[#00687A]/50'}`}
                     aria-label={`Slide ${idx + 1}`}
                   />
                 ))}
               </div>
             </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-12 relative bg-white/20 backdrop-blur-sm border-l border-white/40">
            <img 
              src={el.guardianImg} 
              alt={lang === 'vi' ? el.nameVi : el.nameEn}
              referrerPolicy="no-referrer"
              className="relative z-10 w-full max-w-[400px] lg:max-w-[600px] h-auto object-contain drop-shadow-2xl transition-transform duration-1000 ease-out hover:scale-110 hover:-translate-y-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

