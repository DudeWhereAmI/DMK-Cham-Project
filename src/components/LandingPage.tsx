import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Wand2, Shield, Heart } from 'lucide-react';

interface LandingPageProps {
  lang: 'vi' | 'en';
  onEnterShop: () => void;
  onNavigateElement?: (id: string) => void;
  onNavigateAbout?: () => void;
  onNavigateMaterials?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onEnterShop, onNavigateElement, onNavigateAbout, onNavigateMaterials }) => {
  // Collections data
  const collectionsData = [
    {
      id: 'collection-01',
      title: 'COLLECTION 01',
      nameVi: 'CHẠM TÔI',
      nameEn: 'CHẠM TÔI (TOUCH ME)',
      descVi: '"CHẠM Tôi" là bộ sưu tập dành cho những ai muốn khẳng định bản sắc cá nhân một cách rõ nét nhất. Tại đây, bạn có thể khắc tên riêng lên phôi kẹp tóc hoặc gương, biến một món phụ kiện quen thuộc hằng ngày thành một vật phẩm mang dấu ấn độc nhất. Bạn sẽ tự tay lựa chọn các món charm trang trí nhỏ, tự do sắp đặt vị trí và layout theo đúng gu thẩm mỹ của mình. Mỗi sản phẩm hoàn thiện chính là một lời khẳng định đầy kiêu hãnh rằng không ai giống ai, và chính sự khác biệt ấy mới làm nên giá trị độc bản của chính bạn.',
      descEn: '"CHẠM Tôi" is a collection for those who want to clearly affirm their personal identity. You can engrave your own name on hair clips or mirrors, turning a familiar daily accessory into an item with a unique mark. You will handpick small decorative charms, freely arranging them to suit your taste. Each finished product is a proud declaration that no two are alike.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/8c3283d652661f5c4524e67d35f7057b8c547916/M%E1%BA%AAU.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-46.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-47.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-2.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-3.png'
      ],
      glowColor: 'rgba(226, 140, 154, 0.4)'
    },
    {
      id: 'collection-02',
      title: 'COLLECTION 02',
      nameVi: 'CHẠM THẦN',
      nameEn: 'CHẠM THẦN (TOUCH SPIRIT)',
      descVi: 'Được tạo ra dành cho những tâm hồn tin vào nguồn năng lượng tích cực, "CHẠM Thần" là nơi bạn tìm thấy biểu tượng may mắn của riêng mình. Bạn sẽ lựa chọn linh vật đại diện chính xác cho cung mệnh (Kim - Mộc - Thủy - Hỏa - Thổ), sau đó toàn quyền quyết định vị trí gắn linh vật trên sản phẩm và phối thêm các món charm nhỏ xung quanh để hoàn thiện bố cục. Từ một món đồ trang trí, mỗi linh vật sẽ trở thành một người bạn đồng hành mang nguồn năng lượng lớn lao, luôn nạp thêm sự an tâm cho bạn.',
      descEn: 'Created for souls who believe in positive energy, "CHẠM Thần" is where you find your personal lucky symbol. You will choose the guardian representing your elemental destiny, deciding its position and decorating it with charms. From an ornament, each mascot becomes a companion carrying a massive energy force.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/Collection%2003.png'
      ],
      glowColor: 'rgba(0, 104, 122, 0.4)'
    },
    {
      id: 'collection-03',
      title: 'COLLECTION 03',
      nameVi: 'CHẠM ĐÔI',
      nameEn: 'CHẠM ĐÔI (TOUCH SYNERGY)',
      descVi: 'Là sự giao thoa hoàn chỉnh nhất tại CHẠM, bộ sưu tập này dung hòa trọn vẹn giữa bản sắc cá nhân bên ngoài và nguồn năng lượng bản mệnh bên trong. Bạn sẽ kết hợp cả Tên riêng lẫn Linh vật bản mệnh trên cùng một chiếc kẹp hoặc gương. Bằng việc tự tay bài trí, bạn đang tạo ra một bệ phóng tinh thần vững chãi, một phiên bản độc bản tối thượng thuộc về riêng bạn, đồng hành cùng bạn bước ra thế giới.',
      descEn: 'The most complete intersection at CHẠM, harmonizing personal identity and elemental energy. You will combine your Name and your Guardian on the same piece. By hand-arranging every detail, you are creating a solid spiritual foundation, an ultimate bespoke version belonging only to you.',
      images: [
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-46.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
        'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/Collection%2003.png'
      ],
      glowColor: 'rgba(234, 179, 8, 0.4)'
    }
  ];

  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(0);
  const [activeElementIndex, setActiveElementIndex] = useState(0);

  // Element data for decorative library cards
  const elementsData = [
    {
      id: 'kim',
      nameVi: 'Hành Kim',
      nameEn: 'Metal Element',
      colorVi: 'Trắng Trân Châu',
      colorEn: 'Opaline White',
      guardianVi: 'Thần thú Bạch Hổ (Hổ Trắng)',
      guardianEn: 'White Tiger (Bạch Hổ) Guardian',
      descVi: 'Đại diện cho sự sắc sảo, công minh và năng lượng thanh tẩy mạnh mẽ. Chiêu tài lộc và gia hộ bình an.',
      descEn: 'Represents precision, justice, and purifying energy. Attracts sharp focus and spiritual protection.',
      emoji: '🪙',
      guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/kim.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-white hover:to-slate-100/90 hover:border-[#CCD9D6]/50',
      glowColor: 'rgba(230, 240, 240, 0.4)'
    },
    {
      id: 'moc',
      nameVi: 'Hành Mộc',
      nameEn: 'Wood Element',
      colorVi: 'Xanh Lục Bảo',
      colorEn: 'Sage Green',
      guardianVi: 'Thần thú Thanh Long (Rồng Xanh)',
      guardianEn: 'Azure Dragon (Thanh Long) Guardian',
      descVi: 'Khơi nguồn sinh khí sinh sôi dồi dào, sự phát triển vững chãi và năng lượng xoa dịu chữa lành tinh thần.',
      descEn: 'Sources infinite vitality, steady physical/mental expansion, and deeply soothing holistic rejuvenation.',
      emoji: '🌿',
      guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/m%E1%BB%99c.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-[#E3F2CE]/35 hover:to-white hover:border-[#CEE0A1]',
      glowColor: 'rgba(227, 242, 206, 0.45)'
    },
    {
      id: 'thuy',
      nameVi: 'Hành Thủy',
      nameEn: 'Water Element',
      colorVi: 'Xanh Lam Aquamarine',
      colorEn: 'Ocean Aquamarine',
      guardianVi: 'Linh vật Thần Cá Voi Hộ Mệnh',
      guardianEn: 'Sacred Celestial Whale Guardian',
      descVi: 'Tượng trưng cho sự thông tuệ dạt dào, tính uyển chuyển thích ứng và xua tan những bế tắc tâm trí.',
      descEn: 'Symbolizes boundless wisdom, liquid adaptiveness, and washes away stubborn mental blockages.',
      emoji: '🌊',
      guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/thu%E1%BB%B7%20.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-[#D1ECFC]/35 hover:to-white hover:border-[#AAD3EF]',
      glowColor: 'rgba(209, 236, 252, 0.45)'
    },
    {
      id: 'hoa',
      nameVi: 'Hành Hỏa',
      nameEn: 'Fire Element',
      colorVi: 'Hồng San Hô / Đỏ Ấm',
      colorEn: 'Warm Rose / Aurora Coral',
      guardianVi: 'Thần thú Chu Tước (Phượng Hoàng)',
      guardianEn: 'Vermilion Phoenix (Chu Tước) Guardian',
      descVi: 'Khơi dậy ngọn lửa nhiệt huyết, đam mê bừng cháy, sức sáng tạo vô biên và sự tái sinh huy hoàng.',
      descEn: 'Ignites elements of passionate resolve, limitless creative warmth, and glorious renaissance.',
      emoji: '🔥',
      guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/ho%E1%BA%a3.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-[#FADBDC]/35 hover:to-white hover:border-[#E28C9A]',
      glowColor: 'rgba(250, 219, 220, 0.45)'
    },
    {
      id: 'tho',
      nameVi: 'Hành Thổ',
      nameEn: 'Earth Element',
      colorVi: 'Vàng Cát Ấm Áp',
      colorEn: 'Champagne Sand',
      guardianVi: 'Linh vật Thần Lân Cát Tường',
      guardianEn: 'Lucky Celestial Qilin Guardian',
      descVi: 'Nền tảng của sự vững chãi, bảo vệ tiền tài an ổn, bồi đắp lòng tin và sự kiên định thầm lặng.',
      descEn: 'The sanctuary of absolute groundness, consolidating wealth, fidelity, and silent perseverance.',
      emoji: '⛰️',
      guardianImg: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/LINH%20V%E1%BA%ACT/th%E1%BB%95.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-[#F5EAD4]/35 hover:to-white hover:border-[#EADAB7]',
      glowColor: 'rgba(245, 234, 212, 0.45)'
    }
  ];

  // Materials Data for auto-switch
  const materialsData = [
    {
      id: 'mat-01',
      title: 'BỘ BA KẸP TÓC BẢN MỆNH – ĐỊNH HÌNH PHONG CÁCH',
      nameVi: 'Kẹp Xà Cừ',
      nameEn: 'Mother of Pearl',
      descVi: 'Mang nét đẹp cổ điển, sang trọng với hiệu ứng bắt sáng thanh lịch. Phù hợp cho những ngày bạn cần sự điềm tĩnh, chỉn chu và thu hút may mắn một cách tinh tế.',
      descEn: 'Brings classic, luxurious beauty with an elegant light-catching effect. Perfect for days when you need calmness, neatness, and a subtle charm of luck.',
      image: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-47.png',
      glowColor: 'rgba(230, 240, 240, 0.4)'
    },
    {
      id: 'mat-02',
      title: 'BỘ BA KẸP TÓC BẢN MỆNH – ĐỊNH HÌNH PHONG CÁCH',
      nameVi: 'Kẹp Pha Lê',
      nameEn: 'Crystal',
      descVi: 'Trong suốt, lấp lánh và thuần khiết. Biểu tượng cho một nguồn năng lượng sạch, giúp thanh lọc tâm trí, mang lại sự sáng suốt và nhẹ nhàng cho bạn mỗi ngày.',
      descEn: 'Transparent, sparkling, and pure. A symbol of clean energy, helping to purify the mind, bringing clarity and lightness to your every day.',
      image: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-2.png',
      glowColor: 'rgba(209, 236, 252, 0.4)'
    },
    {
      id: 'mat-03',
      title: 'BỘ BA KẸP TÓC BẢN MỆNH – ĐỊNH HÌNH PHONG CÁCH',
      nameVi: 'Kẹp Vỏ Sò Ánh Nhũ',
      nameEn: 'Seashell of Shimmering',
      descVi: 'Mang hơi thở tự do của biển cả với những đường vân tự nhiên, độc bản. Dành riêng cho những tâm hồn phóng khoáng, thích sáng tạo và muốn tìm kiếm sự hanh thông, tươi mới.',
      descEn: 'Carries the free breath of the ocean with unique, natural patterns. Dedicated to open-minded souls who love creativity and seek a fresh, prosperous flow.',
      image: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/M%E1%BA%AAU-3.png',
      glowColor: 'rgba(245, 234, 212, 0.4)'
    },
    {
      id: 'mat-04',
      title: 'PHIÊN BẢN GIỚI HẠN',
      nameVi: 'Kẹp Limited "The Harmony" (Cánh Tiên Đổi Màu)',
      nameEn: 'Limited "The Harmony" Clip (Color-changing wings)',
      descVi: 'Sự giao thoa của các Bản mệnh. Chiếc kẹp có khả năng thay đổi màu sắc theo ánh sáng và góc nhìn ẩn dụ cho sự chuyển dịch và giao thoa mượt mà giữa các dòng năng lượng Ngũ hành. Chỉ khi bước ra ánh nắng mặt trời, chiếc kẹp mới bắt đầu chuyển mình.',
      descEn: 'The intersection of the Elements. The clip can change color depending on lighting and viewing angle, a metaphor for the smooth transition among the Five Elements. Only when stepping out into the sunlight does the clip begin to transform.',
      image: 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-48.png',
      glowColor: 'rgba(226, 140, 154, 0.4)'
    }
  ];

  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);

  // Auto-switch collections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCollectionIndex((prevIndex) => {
        setSubImageIndex(0);
        return (prevIndex + 1) % collectionsData.length;
      });
    }, 8000); // Switch every 8 seconds since there's more text
    return () => clearInterval(interval);
  }, [collectionsData.length]);

  // Handle inner image switching for each collection based on their multi-image requirements
  useEffect(() => {
    const activeCollection = collectionsData[activeCollectionIndex];
    if (activeCollection.images.length > 1) {
      const imgInterval = setInterval(() => {
        setSubImageIndex(prev => (prev + 1) % activeCollection.images.length);
      }, 2500);
      return () => clearInterval(imgInterval);
    }
  }, [activeCollectionIndex, collectionsData]);

  // Auto-switch elements
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveElementIndex((prevIndex) => (prevIndex + 1) % elementsData.length);
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(interval);
  }, [elementsData.length]);

  // Auto-switch materials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMaterialIndex((prevIndex) => (prevIndex + 1) % materialsData.length);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval);
  }, [materialsData.length]);

  const activeCollection = collectionsData[activeCollectionIndex];
  const activeElement = elementsData[activeElementIndex];

  return (
    <div id="landing-page-view" className="space-y-16 py-4 font-serif text-[#00687A] animate-fade-in">
      
      {/* 1. INTERACTIVE HOVER HERO WITH CUSTOM BACKGROUND */}
      <section className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[650px] rounded-[32px] overflow-hidden group shadow-xl border border-[#00687A]/10 cursor-pointer">
        
        {/* Actual Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ 
            backgroundImage: `url('https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')` 
          }}
        />

        {/* REVEAL ON HOVER BACKDROP OVERLAY */}
        <div className="absolute inset-0 bg-[#00687A]/85 backdrop-blur-sm opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-20 flex flex-col items-center justify-center p-6 md:p-12 text-center text-white space-y-6">
          
          <div className="space-y-4 max-w-3xl animate-fade-in translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            {/* Elegant Sub-branding Signature Accent */}
            <span className="text-sm md:text-md text-[#FFDBE9] font-script italic block text-3xl font-normal lowercase tracking-wide mb-1">
              {lang === 'vi' ? 'Sắc màu bản mệnh...' : 'Touched by destiny...'}
            </span>
            
            {/* The main poetic Slogan */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-serif">
              {lang === 'vi' ? (
                <>Sắc Màu Bản Mệnh, <br /><span className="text-[#FFDBE9]">Khơi Mở Bản Sắc Riêng.</span></>
              ) : (
                <>Bespoke Alignment, <br /><span className="text-[#FFDBE9]">Tailored to Your Soul.</span></>
              )}
            </h1>

            <div className="h-[2px] w-20 bg-[#FFDBE9]/40 mx-auto my-3" />

            <p className="text-sm md:text-lg font-serif italic text-slate-100/90 leading-relaxed max-w-2xl mx-auto">
              {lang === 'vi' 
                ? '“Chạm” tin rằng mỗi phụ kiện đồng hành hằng ngày không nên chỉ là đồ vật vô tri. Khi sắc màu Ngũ Hành bên ngoài chạm đúng tần số năng lượng bên trong, bạn sẽ cảm giác vạn sự cát tường, an yên từng khoảnh khắc.'
                : '"Chạm" believes daily staples should transcend material indifference. When outer elements synchronize with your inner spiritual frequency, customized balance activates peace in every corner.'}
            </p>
          </div>

          {/* Action trigger button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const el = document.getElementById('encyclopedia-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white text-[#00687A] hover:bg-[#FFDBE9] font-sans font-bold text-xs md:text-sm tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer z-30 opacity-0 group-hover:opacity-100 delay-200 translate-y-4 group-hover:translate-y-0 mt-4"
          >
            <Wand2 className="w-4 h-4 text-[#E28C9A]" />
            <span>{lang === 'vi' ? 'Khám Phá Các Bộ Sưu Tập' : 'Explore Collections'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </section>

      {/* 2. CHẠM COLLECTIONS OVERVIEW */}
      <section id="collections-section" className="relative py-16 mt-8 w-full border-y border-[#00687A]/10 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center justify-center cursor-pointer" onClick={onEnterShop}>
        
        {/* Background Image highly transparent */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.05]"
          style={{ 
            backgroundImage: `url('https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')` 
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
          
          <div className="text-center space-y-2 max-w-xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-serif text-[#00687A] uppercase whitespace-nowrap">
              {lang === 'vi' ? 'Các Bộ Sưu Tập' : 'Our Collections'}
            </h2>
            <div className="h-[1px] w-12 bg-[#00687A]/30 mx-auto mt-6"></div>
          </div>

          <div className="w-full flex justify-center items-center mt-4">
             {/* Dynamic Rotating Collection Area */}
             <div className="relative w-full max-w-5xl flex justify-center items-center min-h-[500px] border border-[#00687A]/15 rounded-[40px] bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md shadow-sm p-8 py-12">
                {collectionsData.map((el, index) => {
                  const isActive = index === activeCollectionIndex;
                  return (
                    <div 
                      key={el.id} 
                      className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out px-4 py-8 ${isActive ? 'opacity-100 scale-100 z-20 translate-y-0' : 'opacity-0 scale-95 -z-10 translate-y-10 pointer-events-none'}`}
                    >
                      {/* Image Area */}
                      <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] items-center">
                         {/* Ambient glow */}
                         <div 
                           className="absolute inset-0 rounded-full blur-[100px] opacity-40 -z-10 scale-125 transition-colors duration-1000"
                           style={{ backgroundColor: el.glowColor }}
                         />
                         
                         {/* We handle images gracefully if there are multiple */}
                         {el.images.length > 0 && (
                           <div className="relative w-full flex justify-center items-center gap-4">
                              {el.id === 'collection-03' ? (
                                // Custom double image render layout for collection 3
                                <div className="flex items-center gap-2">
                                  <img 
                                    src={el.images[0]} // Mirror is always static
                                    alt="Mirror"
                                    referrerPolicy="no-referrer"
                                    className="w-[140px] md:w-[220px] h-auto object-contain drop-shadow-xl z-20"
                                  />
                                  <img 
                                    src={el.images[subImageIndex === 0 ? 1 : (subImageIndex % (el.images.length - 1)) + 1]} 
                                    alt="Clip"
                                    referrerPolicy="no-referrer"
                                    className="w-[140px] md:w-[220px] h-auto object-contain drop-shadow-xl animate-fade-in"
                                    key={subImageIndex} // force re-render for animation
                                  />
                                </div>
                              ) : (
                                <img 
                                  src={el.images[subImageIndex]} 
                                  alt={el.title}
                                  referrerPolicy="no-referrer"
                                  className="w-[280px] md:w-[450px] lg:w-[500px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 animate-fade-in"
                                  key={subImageIndex} // force animation on swap
                                />
                              )}
                           </div>
                         )}
                      </div>

                      {/* Brief description box */}
                      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6 lg:pl-10">
                        <span className="text-xs font-sans font-black uppercase tracking-widest text-[#E28C9A] mb-2 block">
                          {el.title}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black text-[#00687A] font-serif mb-6 leading-none">
                          {lang === 'vi' ? el.nameVi : el.nameEn}
                        </h3>
                        <p className="text-[13px] md:text-[15px] text-slate-700 font-serif leading-relaxed text-justify max-w-[480px] mx-auto md:mx-0">
                          {lang === 'vi' ? el.descVi : el.descEn}
                        </p>
                        <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-[#E28C9A] font-sans font-bold uppercase tracking-widest text-xs animate-pulse cursor-pointer hover:text-[#00687A] transition-colors">
                          <span>{lang === 'vi' ? 'Thiết kế sản phẩm' : 'Customize now'}</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12 z-20">
            {collectionsData.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCollectionIndex(index);
                  setSubImageIndex(0);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeCollectionIndex ? 'w-8 bg-[#E28C9A]' : 'w-2.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}`}
                aria-label={`Go to collection ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. FIVE ELEMENTS (NGŨ HÀNH) ENCYCLOPEDIA (AUTO-ROTATING BIG MASCOT) */}
      <section id="encyclopedia-section" className="relative py-16 w-full overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center cursor-pointer" onClick={() => onNavigateElement && onNavigateElement(activeElement.id)}>
        
        {/* Background Image highly transparent */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.03]"
          style={{ 
            backgroundImage: `url('https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')` 
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          
          <div className="text-center space-y-2 max-w-xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-serif text-[#00687A] uppercase whitespace-nowrap">
              {lang === 'vi' ? 'Tri Thức Chạm Ngũ Hành' : 'The Five Elements Library'}
            </h2>
            <div className="h-[1px] w-12 bg-[#00687A]/30 mx-auto mt-6"></div>
          </div>

          <div className="w-full flex justify-center items-center mt-4">
             {/* Dynamic Rotating Mascot Area */}
             <div className="relative w-full max-w-5xl flex justify-center items-center min-h-[450px] border border-[#00687A]/15 rounded-[40px] bg-gradient-to-b from-white/60 to-white/20 backdrop-blur-md shadow-sm p-8 py-12">
                {elementsData.map((el, index) => {
                  const isActive = index === activeElementIndex;
                  return (
                    <div 
                      key={el.id} 
                      className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 scale-100 z-20 translate-y-0' : 'opacity-0 scale-95 -z-10 translate-y-10 pointer-events-none'}`}
                    >
                      {/* Giant Mascot Image */}
                      <div className="w-full md:w-1/2 flex justify-center relative">
                         {/* Ambient glow matching the element */}
                         <div 
                           className="absolute inset-0 rounded-full blur-[100px] opacity-60 -z-10 scale-125 transition-colors duration-1000"
                           style={{ backgroundColor: el.glowColor.replace('0.4', '0.6').replace('0.45', '0.6') }}
                         />
                         <img 
                           src={el.guardianImg} 
                           alt={lang === 'vi' ? el.guardianVi : el.guardianEn}
                           referrerPolicy="no-referrer"
                           className="w-[280px] md:w-[450px] lg:w-[500px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                         />
                      </div>

                      {/* Brief description box */}
                      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6">
                        <span className="text-sm font-sans font-black uppercase tracking-widest text-[#E28C9A] mb-2 block">
                          {el.emoji} {lang === 'vi' ? 'Bản Mệnh' : 'Element'}
                        </span>
                        <h3 className="text-4xl md:text-6xl font-black text-[#00687A] font-serif mb-4 leading-none">
                          {lang === 'vi' ? el.nameVi : el.nameEn}
                        </h3>
                        <p className="text-base md:text-xl text-slate-600 font-serif leading-relaxed italic max-w-md mx-auto md:mx-0">
                          {lang === 'vi' ? el.descVi : el.descEn}
                        </p>
                        <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-[#E28C9A] font-sans font-bold uppercase tracking-widest text-sm animate-pulse cursor-pointer hover:text-[#00687A] transition-colors">
                          <span>{lang === 'vi' ? 'Xem chi tiết' : 'View Details'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12 z-20">
            {elementsData.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveElementIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeElementIndex ? 'w-8 bg-[#E28C9A]' : 'w-2.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}`}
                aria-label={`Go to element ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. MATERIALS (NGUYÊN VẬT LIỆU) SWITCH-UP */}
      <section id="materials-section" className="relative py-16 w-full border-b border-[#00687A]/10 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center cursor-pointer" onClick={() => onNavigateMaterials && onNavigateMaterials()}>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          
          <div className="text-center space-y-2 max-w-xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-serif text-[#00687A] uppercase whitespace-nowrap">
              {lang === 'vi' ? 'Nguyên Vật Liệu' : 'Our Materials'}
            </h2>
            <div className="h-[1px] w-12 bg-[#00687A]/30 mx-auto mt-6"></div>
          </div>

          <div className="w-full flex justify-center items-center mt-4">
             {/* Dynamic Rotating Material Area */}
             <div className="relative w-full max-w-5xl flex justify-center items-center min-h-[450px] border border-[#00687A]/15 rounded-[40px] bg-gradient-to-b from-slate-50 to-white shadow-sm p-8 py-12 overflow-hidden">
                {materialsData.map((mat, index) => {
                  const isActive = index === activeMaterialIndex;
                  return (
                    <div 
                      key={mat.id} 
                      className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out px-4 py-8 ${isActive ? 'opacity-100 scale-100 z-20 translate-y-0' : 'opacity-0 scale-95 -z-10 translate-y-10 pointer-events-none'}`}
                    >
                      {/* Material Image */}
                      <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] items-center">
                         {/* Ambient glow matching the material */}
                         <div 
                           className="absolute inset-0 rounded-full blur-[100px] opacity-60 -z-10 scale-125 transition-colors duration-1000"
                           style={{ backgroundColor: mat.glowColor }}
                         />
                         <img 
                           src={mat.image} 
                           alt={lang === 'vi' ? mat.nameVi : mat.nameEn}
                           referrerPolicy="no-referrer"
                           className="w-[280px] md:w-[400px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                         />
                      </div>

                      {/* Brief description box */}
                      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6 lg:pl-10">
                        <span className="text-[10px] md:text-xs font-sans font-black uppercase tracking-widest text-[#E28C9A] mb-3 block">
                          {mat.title}
                        </span>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#00687A] font-serif mb-6 leading-tight">
                          {lang === 'vi' ? mat.nameVi : mat.nameEn}
                        </h3>
                        <p className="text-[13px] md:text-[15px] text-slate-700 font-serif leading-relaxed text-justify max-w-[480px] mx-auto md:mx-0">
                          {lang === 'vi' ? mat.descVi : mat.descEn}
                        </p>
                        <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-[#E28C9A] font-sans font-bold uppercase tracking-widest text-xs animate-pulse cursor-pointer hover:text-[#00687A] transition-colors">
                          <span>{lang === 'vi' ? 'Xem chi tiết' : 'View Details'}</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12 z-20">
            {materialsData.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMaterialIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeMaterialIndex ? 'w-8 bg-[#E28C9A]' : 'w-2.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}`}
                aria-label={`Go to material ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. ABOUT US (VE CHUNG TOI) SHORTCUT */}
      <section className="bg-white border-y border-[#00687A]/10 py-16 px-4">
        <div className="max-w-6xl mx-auto flex justify-center">
             <div 
               onClick={onNavigateAbout}
               className="relative overflow-hidden rounded-[32px] w-full max-w-6xl mx-auto h-[400px] md:h-[500px] group cursor-pointer shadow-lg border border-[#00687A]/10"
             >
                {/* Behind the scenes image background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url('https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')` 
                  }}
                />
                
                {/* REVEAL ON HOVER BACKDROP OVERLAY */}
                <div className="absolute inset-0 bg-[#00687A]/85 backdrop-blur-sm opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-20 flex flex-col items-center justify-center p-6 md:p-12 text-center text-white space-y-6">
                   
                   <div className="space-y-4 max-w-3xl animate-fade-in translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                     <span className="text-xs font-sans font-black uppercase tracking-widest text-[#FFDBE9] font-script italic mb-2 block">
                       {lang === 'vi' ? 'Hành Trình Dự Án' : 'Project Journey'}
                     </span>
                     <h3 className="text-3xl md:text-5xl font-black text-white font-serif tracking-tight">
                       {lang === 'vi' ? 'Về Chúng Tôi | Behind the scenes' : 'About Us | Behind the scenes'}
                     </h3>
                     <div className="h-[2px] w-20 bg-[#FFDBE9]/40 mx-auto my-3" />
                     <p className="text-white/90 text-sm md:text-lg font-serif italic max-w-2xl mx-auto">
                       {lang === 'vi' 
                         ? 'Khám phá câu chuyện đằng sau những chế tác thủ công mang tính cá nhân hóa, từ ý tưởng nguyên bản đến thành phẩm gửi trao trên tay bạn.' 
                         : 'Discover the story behind personalized craftsmanship, from original concepts to the finished pieces delivered into your hands.'}
                     </p>
                   </div>

                   <button
                     className="px-8 py-4 bg-white text-[#00687A] hover:bg-[#FFDBE9] font-sans font-bold text-xs md:text-sm tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer z-30 opacity-0 group-hover:opacity-100 delay-200 translate-y-4 group-hover:translate-y-0 mt-4"
                   >
                      <span>{lang === 'vi' ? 'Tìm Hiểu Thêm' : 'Find out more'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                   </button>
                </div>
             </div>
        </div>
      </section>

    </div>
  );
};
