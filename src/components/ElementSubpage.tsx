import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ElementSubpageProps {
  elementId: string;
  lang: 'vi' | 'en';
  onNavigateBack: () => void;
  onEnterShop: (productId: string) => void;
}

const elementsData = [
  {
    id: 'kim',
    nameVi: 'Trắng Kim Cương (Mệnh Kim)',
    nameEn: 'Opaline White (Metal)',
    descVi: 'Đại diện cho sự rõ ràng, sắc bén và tinh tế tối giản.',
    descEn: 'Represents pristine clarity, sharpness, and minimalist sophistication.',
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png',
    slides: [
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%202%20k%E1%BA%B9p%20pha%20l%C3%AA%20g%E1%BA%AFn%20ch%E1%BB%AF%20n%E1%BB%95i%20tr%E1%BA%AFng.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/KIM.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/kim%20.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/KIM.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
    ],
    bgColor: 'bg-[#F2F4F8]',
    textColor: 'text-[#00687A]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Pha Lê (Crystal)", desc: "Trong suốt, lấp lánh và thuần khiết. Biểu tượng cho một nguồn năng lượng sạch, giúp thanh lọc tâm trí và mang lại sự sáng suốt phù hợp với Mệnh Kim." },
        { name: "Kẹp Ánh Mây (Mother of Pearl)", desc: "Mang nét đẹp cổ điển, sang trọng bắt sáng thanh lịch, như kim loại quý. Phù hợp cho những ngày bạn cần sự điềm tĩnh và thu hút may mắn." }
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png',
    slides: [
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%202%20k%E1%BA%B9p%20pha%20l%C3%AA%20g%E1%BA%AFn%20ch%E1%BB%AF%20n%E1%BB%95i%20tr%E1%BA%AFng.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/m%E1%BB%99c%20.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/m%E1%BB%99c.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/m%E1%BB%99c.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png',
    slides: [
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%202%20k%E1%BA%B9p%20pha%20l%C3%AA%20g%E1%BA%AFn%20ch%E1%BB%AF%20n%E1%BB%95i%20tr%E1%BA%AFng.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%201/thu%E1%BB%B7.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/thu%E1%BB%B7.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/thu%E1%BB%B7.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/thu%E1%BB%B7.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png',
    slides: [
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%202%20k%E1%BA%B9p%20pha%20l%C3%AA%20g%E1%BA%AFn%20ch%E1%BB%AF%20n%E1%BB%95i%20tr%E1%BA%AFng.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/ho%E1%BA%A3.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/ho%E1%BA%A3.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/ho%E1%BA%A3.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png',
    ],
    bgColor: 'bg-[#FADBDC]/30',
    textColor: 'text-[#A8323E]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Limited 'The Harmony'", desc: "Là chân ái của hệ Hỏa. Thiết kế chỉ tỏa sáng rực rỡ và chuyển hóa đa tầng nhất khi đón đủ ánh nắng mặt trời, nạp hỏa khí uy lực cho sự nhiệt huyết." },
        { name: "Kẹp Ánh Mây (Mother of Pearl)", desc: "Mang nét đẹp cổ điển, đóng vai trò như tĩnh lại ngọn lửa quá mãnh liệt. Khuyên dùng cho những ngày Hỏa cần sự điềm tĩnh và bớt bốc đồng." }
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
    guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png',
    slides: [
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%202%20k%E1%BA%B9p%20%C3%A1nh%20m%C3%A2y%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/G%C6%AF%C6%A0NG/th%E1%BB%95.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%202/th%E1%BB%95.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%203/th%E1%BB%95.png',
      'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Ho%E1%BA%A3.png',
    ],
    bgColor: 'bg-[#F5EAD4]/50',
    textColor: 'text-[#8A6A2C]',
    materialsVi: {
      title: "Bộ chất liệu tương sinh đề xuất",
      items: [
        { name: "Kẹp Ánh Mây (Mother of Pearl)", desc: "Sự thầm lặng mà toát lên sang trọng của xà cừ khắc họa chính xác bản chất vững chãi, bình yên của nền đất Thổ. Là bệ phóng hoàn hảo cho mọi điểm tựa." },
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
  const rawEl = elementsData.find(e => e.id === elementId) || elementsData[0];
  const el = { ...rawEl, slides: rawEl.slides?.slice(0, 3) };
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSlideIndex(0); // Reset slide index on element change
  }, [elementId]);

  useEffect(() => {
    if (el.slides && el.slides.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % el.slides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [el, isHovered]);

  const handleEnterShop = () => {
    const productMapping = ['kep-1', 'guong', 'kep-2'];
    const selectedProductId = productMapping[activeSlideIndex] || 'kep-1';
    onEnterShop(selectedProductId);
  };

  // Extract just the short name (e.g., "KIM", "MỘC") for the large background text
  const bgText = lang === 'vi' 
    ? (el.id === 'kim' ? 'KIM' : el.id === 'moc' ? 'MỘC' : el.id === 'thuy' ? 'THỦY' : el.id === 'hoa' ? 'HỎA' : 'THỔ')
    : el.id.toUpperCase();

  return (
    <div 
      className={`relative min-h-[85vh] w-full rounded-[32px] overflow-hidden shadow-2xl animate-fade-in ${el.bgColor} flex flex-col items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Top Header / Navigation */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
        <button 
          onClick={onNavigateBack}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${el.textColor} hover:opacity-70 transition-opacity`}
        >
          <ArrowLeft className="w-5 h-5" />
          {lang === 'vi' ? 'Quay lại' : 'Back'}
        </button>
      </div>

      {/* HUGE Background Text (Layer 1) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <h1 
          className="text-[20vw] font-black uppercase text-white/90 leading-none m-0 p-0 transform scale-y-125 tracking-tighter"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
        >
          {bgText}
        </h1>
      </div>

      {/* Central Image (Layer 2) */}
      <div className="relative z-10 w-full max-w-[500px] aspect-square flex items-center justify-center mt-8 px-4">
        {el.slides && el.slides.length > 0 ? (
          <img 
            src={el.slides[activeSlideIndex]} 
            alt={el.nameEn} 
            className="w-[90%] h-[90%] object-contain drop-shadow-2xl animate-float transition-opacity duration-500 mix-blend-multiply -translate-y-12 md:-translate-y-24 translate-x-12 md:translate-x-24"
           referrerPolicy="no-referrer"  />
        ) : (
          <img 
            src={el.guardianImg} 
            alt={el.nameEn} 
            className="w-[75%] h-[75%] object-contain drop-shadow-2xl animate-float mix-blend-multiply -translate-y-12 md:-translate-y-24 translate-x-12 md:translate-x-24"
           referrerPolicy="no-referrer"  />
        )}
      </div>

      {/* Bottom Left Content (Layer 3) */}
      <div className="absolute bottom-12 left-12 max-w-sm z-20 hidden md:block">
        <h2 className={`font-serif text-3xl md:text-5xl font-black tracking-tight ${el.textColor} leading-tight mb-4`}>
          {lang === 'vi' ? el.nameVi : el.nameEn}
        </h2>
        <p className={`font-sans text-sm md:text-base ${el.textColor} opacity-90 leading-relaxed mb-6 font-medium`}>
          {lang === 'vi' ? el.descVi : el.descEn}
        </p>
        <button 
          onClick={handleEnterShop}
          className="px-8 py-3 bg-white rounded-full text-[#00687A] font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          {lang === 'vi' ? 'Xem Sản Phẩm' : 'See More'}
        </button>
      </div>

      {/* Bottom Right Controls / Info (Layer 3) */}
      <div className="absolute bottom-12 right-12 flex-col items-end gap-4 z-20 hidden md:flex">
        <div className="flex flex-col gap-3">
          {el.slides && el.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeSlideIndex === idx 
                  ? 'bg-white text-[#00687A] shadow-md scale-110' 
                  : 'bg-white/40 text-white hover:bg-white/60 backdrop-blur-sm'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout Fallback */}
      <div className="flex md:hidden flex-col items-center text-center p-6 mt-8 z-20 w-full relative bg-white/40 backdrop-blur-sm">
        <h2 className={`font-serif text-3xl font-black tracking-tight ${el.textColor} leading-tight mb-2`}>
          {lang === 'vi' ? el.nameVi : el.nameEn}
        </h2>
        <p className={`font-sans text-sm ${el.textColor} opacity-90 leading-relaxed mb-4`}>
          {lang === 'vi' ? el.descVi : el.descEn}
        </p>
        <button 
          onClick={handleEnterShop}
          className="px-8 py-3 bg-white rounded-full text-[#00687A] font-bold text-sm uppercase tracking-widest shadow-lg"
        >
          {lang === 'vi' ? 'Xem Sản Phẩm' : 'See More'}
        </button>

        <div className="flex gap-3 mt-6">
          {el.slides && el.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeSlideIndex === idx 
                  ? 'bg-white text-[#00687A] shadow-md scale-110' 
                  : 'bg-white/40 text-[#00687A] backdrop-blur-sm'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

