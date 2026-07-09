import { MIRROR_IMAGES_LINH_VAT } from '../data';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Wand2, Shield, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  lang: 'vi' | 'en';
  onEnterShop: () => void;
  onNavigateElement?: (id: string) => void;
  onNavigateAbout?: () => void;
  onNavigateMaterials?: () => void;
  onNavigateCollection?: (collectionId: string) => void;
  onNavigateToChamToi?: (index: number) => void;
  onNavigateToChamToiGuong?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onEnterShop, onNavigateElement, onNavigateAbout, onNavigateMaterials, onNavigateCollection, onNavigateToChamToi, onNavigateToChamToiGuong }) => {
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
      descEn: '"CHẠM Tôi" is a collection for those who want to clearly affirm their personal identity. You can engrave your own name on hair clips or mirrors, turning a familiar daily accessory into an item with a unique mark. You will handpick small decorative charms, freely arranging them to suit your taste. Each finished product is a proud declaration that no two are alike.',
      images: [
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%205%20m%C3%A0u.png',
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/pha%20l%C3%AA%20ch%E1%BB%AF%20d%C3%A1n%205%20m%C3%A0u.png',
        [ // gương chữ nổi ring
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png'
        ]
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
        [ // 5 mascots circle
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png',
          'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png'
        ]
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
        'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A2NH%20COLLECTION%20CH%E1%BA%A0M%20%C4%90%C3%94I%20%E1%BB%9E%20TRANG%20CH%E1%BB%A6%20.png'
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
      guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png',
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
      guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png',
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
      guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png',
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
      guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png',
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
      guardianImg: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png',
      bgColor: 'hover:bg-gradient-to-br hover:from-[#F5EAD4]/35 hover:to-white hover:border-[#EADAB7]',
      glowColor: 'rgba(245, 234, 212, 0.45)'
    }
  ];

  // Materials Data for auto-switch
  const materialsData = [
    {
      id: 'mat-01',
      title: 'BỘ BA KẸP TÓC BẢN MỆNH – ĐỊNH HÌNH PHONG CÁCH',
      nameVi: 'Kẹp Pha Lê',
      nameEn: 'Crystal',
      descVi: 'Trong suốt, lấp lánh và thuần khiết. Biểu tượng cho một nguồn năng lượng sạch, giúp thanh lọc tâm trí, mang lại sự sáng suốt và nhẹ nhàng cho bạn mỗi ngày.',
      descEn: 'Transparent, sparkling, and pure. A symbol of clean energy, helping to purify the mind, bringing clarity and lightness to your every day.',
      image: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/pha%20l%C3%AA%20%E1%BA%A3nh%20tr%C6%A1n%205%20m%C3%A0u%20.png',
      glowColor: 'rgba(209, 236, 252, 0.4)'
    },
    {
      id: 'mat-02',
      title: 'BỘ BA KẸP TÓC BẢN MỆNH – ĐỊNH HÌNH PHONG CÁCH',
      nameVi: 'Kẹp Ánh Mây',
      nameEn: 'Cloud Glow Clip',
      descVi: 'Mang nét đẹp cổ điển, sang trọng với hiệu ứng bắt sáng thanh lịch. Phù hợp cho những ngày bạn cần sự điềm tĩnh, chỉn chu và thu hút may mắn một cách tinh tế.',
      descEn: 'Brings classic, luxurious beauty with an elegant light-catching effect. Perfect for days when you need calmness, neatness, and a subtle charm of luck.',
      image: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20%E1%BA%A3nh%20tr%C6%A1n%205%20m%C3%A0u%20.png',
      glowColor: 'rgba(230, 240, 240, 0.4)'
    }
  ];

  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);
  const [activeMirrorIndex, setActiveMirrorIndex] = useState(0);

  // Auto-switch mirror images
  useEffect(() => {
    const mirrorInterval = setInterval(() => {
      setActiveMirrorIndex(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(mirrorInterval);
  }, []);

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
      }, 1500);
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
    <div id="landing-page-view" className="font-serif text-[#00687A] animate-fade-in flex flex-col">
      
      {/* 1. INTERACTIVE HOVER HERO WITH CUSTOM BACKGROUND */}
      <section className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[650px] rounded-[32px] overflow-hidden group shadow-xl border border-[#00687A]/10 cursor-pointer mt-8 mb-0">
        
        {/* Actual Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ 
            backgroundImage: `url('https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')` 
          }}
        />

        {/* REVEAL ON HOVER BACKDROP OVERLAY */}
        <div className="absolute inset-0 bg-[#00687A]/85 backdrop-blur-sm opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-20 flex flex-col items-center justify-center p-6 md:p-12 text-center text-white space-y-6">
          
          <div className="space-y-4 max-w-3xl animate-fade-in translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            {/* Elegant Sub-branding Signature Accent */}
            <span className="text-base md:text-lg text-[#FFDBE9] font-sans font-bold uppercase tracking-widest mb-1 block">
              {lang === 'vi' ? 'Sắc màu bản mệnh...' : 'Touched by destiny...'}
            </span>
            
            {/* The main poetic Slogan */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase font-serif">
              {lang === 'vi' ? (
                <>Sắc Màu Bản Mệnh, <br /><span className="text-[#FFDBE9]">Khơi Mở Bản Sắc Riêng.</span></>
              ) : (
                <>Bespoke Alignment, <br /><span className="text-[#FFDBE9]">Tailored to Your Soul.</span></>
              )}
            </h1>



            <p className="text-base md:text-xl font-serif italic text-slate-100/95 leading-relaxed max-w-3xl mx-auto">
              {lang === 'vi' 
                ? '“Chạm” tin rằng mỗi phụ kiện đồng hành hằng ngày không nên chỉ là đồ vật vô tri. Khi sắc màu Ngũ Hành bên ngoài chạm đúng tần số năng lượng bên trong, bạn sẽ cảm giác an yên từng khoảnh khắc.'
                : '"Chạm" believes daily staples should transcend material indifference. When outer elements synchronize with your inner spiritual frequency, customized balance activates peace in every corner.'}
            </p>
          </div>

        </div>

      </section>

      {/* Marquee Divider 1 (Between Hero & Collections) - Perfectly Centered Reference Point */}
      <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden whitespace-nowrap py-8 flex items-center justify-center pointer-events-none select-none">
        <div className="inline-block animate-marquee">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'CÁC BỘ SƯU TẬP • '.repeat(10) : 'OUR COLLECTIONS • '.repeat(10)}
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'CÁC BỘ SƯU TẬP • '.repeat(10) : 'OUR COLLECTIONS • '.repeat(10)}
          </h2>
        </div>
      </div>

      {/* 2. CHẠM COLLECTIONS OVERVIEW */}
      <section id="collections-section" className="relative w-full flex flex-col items-center justify-center cursor-pointer" onClick={() => onNavigateCollection && onNavigateCollection(activeCollection.id)}>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">

          <div className="w-full flex justify-center items-center mt-4">
             {/* Dynamic Rotating Collection Area */}
             <div className="relative w-full max-w-7xl flex flex-col justify-between items-center min-h-[850px] xs:min-h-[800px] sm:min-h-[700px] md:min-h-[480px] lg:min-h-[500px] bg-white/95 backdrop-blur-md rounded-[32px] border border-white/50 shadow-lg overflow-hidden p-6 pt-10 pb-8">
               <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
               <div className="relative z-10 w-full flex-1 flex justify-center items-center">
                  {collectionsData.map((el, index) => {
                    const isActive = index === activeCollectionIndex;
                    return (
                      <div 
                        key={el.id} 
                        className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out p-6 pt-10 pb-8 ${isActive ? 'opacity-100 scale-100 z-20 translate-y-0' : 'opacity-0 scale-95 -z-10 translate-y-10 pointer-events-none'}`}
                      >
                        {/* Image Area */}
                        <div className="w-full md:w-[40%] flex justify-center relative min-h-[300px] items-center md:-translate-x-6 lg:-translate-x-16 xl:-translate-x-20">
                           {/* Ambient glow */}
                           <div 
                             className="absolute inset-0 rounded-full blur-[100px] opacity-40 -z-10 scale-125 transition-colors duration-1000"
                             style={{ backgroundColor: el.glowColor }}
                           />
                           
                           {/* Beige tone circular highlight to reduce emptiness */}
                           <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-[#E6D9C5]/40 blur-2xl -z-10 pointer-events-none" />

                           {/* We handle images gracefully if there are multiple */}
                           {el.images.length > 0 && (
                             <div className="relative w-full flex justify-center items-center gap-4">
                                {Array.isArray(el.images[subImageIndex]) ? (
                                  <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center animate-fade-in" key={`ring-${subImageIndex}`}>
                                    {(el.images[subImageIndex] as string[]).map((imgUrl, i, arr) => {
                                      const angle = (i * 360) / arr.length;
                                      return (
                                        <img 
                                          key={i}
                                          src={imgUrl} 
                                          alt={`${el.title} item ${i+1}`}
                                          referrerPolicy="no-referrer"
                                          className={`absolute h-auto object-contain drop-shadow-2xl transition-transform duration-500 ${
                                            subImageIndex === 0 ? 'w-[160px] md:w-[220px]' : 'w-[220px] md:w-[320px]'
                                          }`}
                                          style={{
                                            transform: `rotate(${angle}deg) translateY(${
                                              subImageIndex === 0 ? '-55%' : '-45%'
                                            }) rotate(${-angle}deg) rotate(${
                                              subImageIndex === 0 ? '0deg' : '15deg'
                                            })`,
                                            zIndex: 30 - i
                                          }}
                                         loading="lazy" />
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <img 
                                    src={el.images[subImageIndex] as string} 
                                    alt={el.title}
                                    referrerPolicy="no-referrer"
                                    className={`w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 animate-fade-in ${
                                      el.id === 'collection-01' && subImageIndex === 1
                                        ? 'max-w-[200px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px]' // Smaller size for crystal clip
                                        : 'max-w-[320px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[560px]'
                                    }`}
                                    key={`single-${subImageIndex}`} // force animation on swap
                                   loading="lazy" />
                                )}
                             </div>
                           )}
                        </div>
   
                        {/* Brief description box */}
                        <div className="w-full md:w-[60%] mt-8 md:mt-0 text-center md:text-left px-4 lg:pl-0 relative md:-translate-x-6 lg:-translate-x-16 xl:-translate-x-20">
                          <span className="px-5 py-2 rounded-full bg-[#00687A]/10 border border-[#00687A]/20 text-xs md:text-sm lg:text-base font-sans font-black uppercase tracking-widest text-[#00687A] shadow-sm inline-block mb-4">
                            {el.title}
                          </span>
                          
                          <div className="min-h-[140px] md:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#00687A] font-serif mb-3 leading-[1.2] uppercase text-balance">
                            {lang === 'vi' ? el.nameVi : el.nameEn}
                          </h3>
                          <p className="text-sm md:text-sm lg:text-base text-slate-700 font-serif leading-relaxed max-w-[700px] mx-auto md:mx-0 text-justify line-clamp-6">
                            {lang === 'vi' ? el.descVi : el.descEn}
                          </p>
                          </div>
                          <div className="mt-5 flex flex-col sm:flex-row items-center sm:justify-between gap-4 w-full max-w-[700px] mx-auto md:mx-0">
                            <div className="px-5 py-3 rounded-full bg-[#E28C9A] text-white flex items-center gap-2 font-sans font-black uppercase tracking-widest text-xs md:text-sm lg:text-base shadow-md hover:bg-[#00687A] transition-colors pointer-events-auto cursor-pointer">
                              <span>{lang === 'vi' ? 'Xem ngay' : 'Explore'}</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                            
                            {/* Pagination Indicators (Inline) */}
                            <div className="flex items-center gap-2.5 z-30 pointer-events-auto">
                              {materialsData.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMaterialIndex(dotIndex);
                                  }}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === activeMaterialIndex ? 'w-6 bg-[#E28C9A]' : 'w-1.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}`}
                                  aria-label={`Go to material ${dotIndex + 1}`}
                                />
                              ))}
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Marquee Divider 2 - Product Lines */}
      <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden whitespace-nowrap mt-10 md:mt-14 py-10 flex items-center justify-center pointer-events-none select-none">
        <div className="inline-block animate-marquee-slow">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'DÒNG SẢN PHẨM • '.repeat(10) : 'PRODUCT LINES • '.repeat(10)}
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'DÒNG SẢN PHẨM • '.repeat(10) : 'PRODUCT LINES • '.repeat(10)}
          </h2>
        </div>
      </div>

      {/* 3. PRODUCT LINES SECTION */}
      <section id="materials-section" className="relative w-full flex flex-col items-center justify-center cursor-pointer" onClick={() => onNavigateToChamToi && onNavigateToChamToi(1)}>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
          
          <div className="w-full flex justify-center items-center mt-4">
             <div className="relative w-full max-w-7xl flex flex-col justify-between items-center min-h-[540px] md:min-h-[480px] lg:min-h-[500px] bg-white/95 backdrop-blur-md rounded-[32px] border border-white/50 shadow-lg overflow-hidden p-6 pt-10 pb-8">
               <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
               <div className="relative z-10 w-full flex-1 flex justify-center items-center">
                  {materialsData.map((mat, index) => {
                    const isActive = index === activeMaterialIndex;
                    return (
                      <div 
                        key={mat.id} 
                        className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out px-4 ${isActive ? 'opacity-100 scale-100 z-20 translate-y-0' : 'opacity-0 scale-95 -z-10 translate-y-10 pointer-events-none'}`}
                      >
                        {/* Material Image */}
                        <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] items-center">
                           <div 
                             className="absolute inset-0 rounded-full blur-[100px] opacity-60 -z-10 scale-125 transition-colors duration-1000"
                             style={{ backgroundColor: mat.glowColor }}
                           />
                           <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />
                           <img 
                             src={mat.image} 
                             alt={lang === 'vi' ? mat.nameVi : mat.nameEn}
                             referrerPolicy="no-referrer"
                             className="w-[280px] md:w-[400px] lg:w-[500px] max-h-[350px] md:max-h-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            loading="lazy" />
                        </div>
  
                        {/* Brief description box */}
                        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6 relative">
                          <span className="px-8 py-3 rounded-full bg-[#00687A]/10 border border-[#00687A]/20 text-base md:text-xl font-sans font-black uppercase tracking-widest text-[#00687A] shadow-sm inline-flex items-center mb-6">
                            {lang === 'vi' ? 'Dòng sản phẩm' : 'Product Line'}
                          </span>
                          
                          <div className="min-h-[200px] md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl lg:text-[40px] font-black text-[#00687A] font-serif mb-4 leading-[1.1] uppercase text-balance">
                            {lang === 'vi' ? mat.nameVi : mat.nameEn}
                          </h3>
                          <p className="text-lg md:text-xl text-slate-700 font-serif leading-relaxed max-w-[500px] mx-auto md:mx-0 text-justify">
                            {lang === 'vi' ? mat.descVi : mat.descEn}
                          </p>
                          </div>
                          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 w-full max-w-[500px] mx-auto md:mx-0">
                            <div className="px-8 py-5 rounded-full bg-[#E28C9A] text-white flex items-center gap-2 font-sans font-black uppercase tracking-widest text-base md:text-lg shadow-md hover:bg-[#00687A] transition-colors pointer-events-auto cursor-pointer">
                              <span>{lang === 'vi' ? 'Khám phá ngay' : 'Explore Now'}</span>
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                            
                            
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3.5. GƯƠNG NGUYỆT VÂN SECTION */}
      <section id="mirror-section" className="relative w-full flex flex-col items-center justify-center cursor-pointer mt-16 md:mt-24" onClick={() => onNavigateToChamToiGuong && onNavigateToChamToiGuong()}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="w-full flex justify-center items-center mt-4">
             <div className="relative w-full max-w-7xl flex flex-col justify-between items-center min-h-[540px] md:min-h-[480px] lg:min-h-[500px] bg-white/95 backdrop-blur-md rounded-[32px] border border-white/50 shadow-lg overflow-hidden p-6 pt-10 pb-8">
               <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
               <div className="relative z-10 w-full flex-1 flex justify-center items-center">
                  
                  {/* Single mirror data switching images */}
                  <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out px-4 opacity-100 scale-100 z-20 translate-y-0">
                    {/* Mirror Images */}
                    <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] md:min-h-[400px] items-center">
                       <div 
                         className="absolute inset-0 rounded-full blur-[100px] opacity-60 -z-10 scale-125 transition-colors duration-1000"
                         style={{ backgroundColor: 'rgba(255, 235, 205, 0.4)' }}
                       />
                       <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />
                       
                       <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group">
                         <img 
                                  src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A3nh%20m%E1%BA%ABu%20g%C6%B0%C6%A1ng%205%20c%C3%A1i%20ch%E1%BB%AF%20n%E1%BB%95i%20.png"
                                  alt="5 Mirrors"
                                  referrerPolicy="no-referrer"
                                  className="absolute w-[80%] h-[80%] md:w-[75%] md:h-[75%] max-w-[450px] object-contain drop-shadow-2xl mix-blend-multiply z-30 transition-transform duration-700 ease-out hover:scale-105"
                                 loading="lazy" />
                       </div>
                    </div>
                    
                    {/* Brief description box */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6 relative">
                      <span className="px-8 py-3 rounded-full bg-[#00687A]/10 border border-[#00687A]/20 text-base md:text-xl font-sans font-black uppercase tracking-widest text-[#00687A] shadow-sm inline-flex items-center mb-6">
                        {lang === 'vi' ? 'Dòng sản phẩm' : 'Product Line'}
                      </span>
                      
                      <div className="min-h-[200px] md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl lg:text-[40px] font-black text-[#00687A] font-serif mb-4 leading-[1.1] uppercase text-balance">
                        {lang === 'vi' ? 'Gương Nguyệt Vân' : 'Gương Nguyệt Vân'}
                      </h3>
                      <p className="text-lg md:text-xl text-slate-700 font-serif leading-relaxed max-w-[500px] mx-auto md:mx-0 text-justify">
                        {lang === 'vi' 
                          ? 'Chiếc gương phụ kiện thanh lịch, chế tác từ thủy tinh tráng bạc độ phản chiếu cao tuyệt đối. Thiết kế nhỏ gọn với 5 phiên bản ngũ hành tinh tế.' 
                          : 'An elegant hand-held vanity mirror crafted with high-reflection glass. Compact design with 5 delicate elemental versions.'}
                      </p>
                      </div>
                      <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 w-full max-w-[500px] mx-auto md:mx-0">
                        <div className="px-8 py-5 rounded-full bg-[#E28C9A] text-white flex items-center gap-2 font-sans font-black uppercase tracking-widest text-base md:text-lg shadow-md hover:bg-[#00687A] transition-colors pointer-events-auto cursor-pointer">
                          <span>{lang === 'vi' ? 'Khám phá ngay' : 'Explore Now'}</span>
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>

               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Marquee Divider 3 (Between Materials & Encyclopedia) */}
      <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden whitespace-nowrap mt-10 md:mt-14 py-10 flex items-center justify-center pointer-events-none select-none">
        <div className="inline-block animate-marquee-slow">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'CHẠM NGŨ HÀNH • '.repeat(10) : 'THE FIVE ELEMENTS LIBRARY • '.repeat(10)}
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-widest font-sans text-[#00687A] uppercase inline-block opacity-90 pr-2">
            {lang === 'vi' ? 'CHẠM NGŨ HÀNH • '.repeat(10) : 'THE FIVE ELEMENTS LIBRARY • '.repeat(10)}
          </h2>
        </div>
      </div>

      {/* 4. FIVE ELEMENTS (NGŨ HÀNH) ENCYCLOPEDIA (AUTO-ROTATING BIG MASCOT) */}
      <section id="encyclopedia-section" className="relative w-full flex flex-col items-center justify-center cursor-pointer" onClick={() => onNavigateElement && onNavigateElement(activeElement.id)}>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
          
          <div className="w-full flex justify-center items-center mt-4">
             {/* Dynamic Rotating Mascot Area */}
             <div className="relative w-full max-w-7xl flex flex-col justify-between items-center min-h-[540px] md:min-h-[480px] lg:min-h-[500px] bg-white/95 backdrop-blur-md rounded-[32px] border border-white/50 shadow-lg overflow-hidden p-6 pt-10 pb-8">
               <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
               <div className="relative z-10 w-full flex-1 flex justify-center items-center">
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
                           
                           {/* Beige tone circular highlight behind mascot */}
                           <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />

                           <img 
                             src={el.guardianImg} 
                             alt={lang === 'vi' ? el.guardianVi : el.guardianEn}
                             referrerPolicy="no-referrer"
                             className="w-[280px] md:w-[400px] lg:w-[500px] max-h-[350px] md:max-h-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            loading="lazy" />
                        </div>
   
                        {/* Brief description box */}
                        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left px-6 relative">
                          <span className="px-8 py-3 rounded-full bg-[#00687A]/10 border border-[#00687A]/20 text-base md:text-xl font-sans font-black uppercase tracking-widest text-[#00687A] shadow-sm inline-flex items-center mb-6">
                            {lang === 'vi' ? 'Bản Mệnh' : 'Element'}
                          </span>
                          
                          <div className="min-h-[200px] md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl lg:text-[40px] font-black text-[#00687A] font-serif mb-4 leading-[1.1] uppercase text-balance">
                            {lang === 'vi' ? el.nameVi : el.nameEn}
                          </h3>
                          <p className="text-lg md:text-xl text-slate-700 font-serif leading-relaxed max-w-[500px] mx-auto md:mx-0 text-justify">
                            {lang === 'vi' ? el.descVi : el.descEn}
                          </p>
                          </div>
                          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 w-full max-w-[500px] mx-auto md:mx-0">
                            <div className="px-8 py-5 rounded-full bg-[#E28C9A] text-white flex items-center gap-2 font-sans font-black uppercase tracking-widest text-base md:text-lg shadow-md hover:bg-[#00687A] transition-colors pointer-events-auto cursor-pointer">
                              <span>{lang === 'vi' ? 'Khám phá ngay' : 'Explore Now'}</span>
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                            
                            {/* Pagination Indicators (Inline) */}
                            <div className="flex items-center gap-2.5 z-30 pointer-events-auto">
                              {elementsData.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveElementIndex(dotIndex);
                                  }}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === activeElementIndex ? 'w-6 bg-[#E28C9A]' : 'w-1.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}`}
                                  aria-label={`Go to element ${dotIndex + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT US (VE CHUNG TOI) SHORTCUT */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-center">
             <div 
               onClick={onNavigateAbout}
               className="relative overflow-hidden rounded-[32px] w-full max-w-6xl mx-auto h-[400px] md:h-[500px] group cursor-pointer shadow-lg border border-[#00687A]/10"
             >
                {/* Behind the scenes image background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url('https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1a5b754e8930371efb213eda348b1e56f82ec6ef/%E1%BA%A3nh%20n%E1%BB%81n%20c%C3%A2u%20chuy%E1%BB%87n%20.png')` 
                  }}
                />
                
                {/* REVEAL ON HOVER BACKDROP OVERLAY */}
                <div className="absolute inset-0 bg-[#00687A]/85 backdrop-blur-sm opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-20 flex flex-col items-center justify-center p-6 md:p-12 text-center text-white space-y-6">
                   
                   <div className="space-y-4 max-w-3xl animate-fade-in translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                     <span className="text-sm md:text-base font-sans font-black uppercase tracking-widest text-[#FFDBE9] mb-2 block">
                       {lang === 'vi' ? 'Hành Trình Dự Án' : 'Project Journey'}
                     </span>
                     <h3 className="text-3xl md:text-5xl font-black text-white font-serif tracking-tight">
                       {lang === 'vi' ? 'Về Chúng Tôi | Behind the scenes' : 'About Us | Behind the scenes'}
                     </h3>

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
