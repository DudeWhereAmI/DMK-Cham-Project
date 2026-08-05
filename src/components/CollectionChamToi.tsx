import React, { useState } from "react";
import {
  getProductBasePrice,
  PRODUCTS,
  MIRROR_IMAGES_CHU_NOI,
  MIRROR_IMAGES_LINH_VAT,
} from "../data";

interface FontProfile {
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

const FONTS: FontProfile[] = [
  {
    id: "embossed",
    nameVi: "Chữ Nổi",
    nameEn: "Embossed Text",
    descVi:
      "Font chữ nổi 3D sang trọng, tạo cảm giác liền mạch, độc đáo trên bề mặt chất liệu.",
    descEn:
      "Luxurious 3D embossed font, creating a seamless and unique feeling on the material surface.",
    colorHex: "#D1ECFC",
    gradientFrom: "#CBE5FF",
    gradientTo: "#8FBFE5",
    imgUrl:
      "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20n%E1%BB%95i%205%20m%C3%A0u.png",
  },
  {
    id: "sticker",
    nameVi: "Chữ Dán",
    nameEn: "Sticker Text",
    descVi:
      "Font chữ dạng dán tinh tế, gọn gàng, làm nổi bật thông điệp cá nhân mà không phá vỡ cấu trúc kẹp.",
    descEn:
      "Neat and delicate sticker font, highlighting your personal message without breaking the clip's structure.",
    colorHex: "#FADBDC",
    gradientFrom: "#FFD3D4",
    gradientTo: "#E59CA0",
    imgUrl:
      "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/pha%20l%C3%AA%20ch%E1%BB%AF%20d%C3%A1n%205%20m%C3%A0u.png",
  },
];

interface CollectionChamToiProps {
  lang: "vi" | "en";
  onNavigateCustomizer: (fontId: string, productId: string) => void;
  initialActiveIndex?: number;
  initialSelectedProductId?: string;
}

export const CollectionChamToi: React.FC<CollectionChamToiProps> = ({
  lang,
  onNavigateCustomizer,
  initialActiveIndex = 0,
  initialSelectedProductId,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [selectedProductIds, setSelectedProductIds] = useState<
    Record<string, string>
  >({
    embossed: initialSelectedProductId || "kep-1",
    sticker: "kep-1",
  });

  const handleProductSelect = (fontId: string, productId: string) => {
    setSelectedProductIds((prev) => ({ ...prev, [fontId]: productId }));
  };

  const getSelectedProduct = (fontId: string) => {
    return selectedProductIds[fontId] || "kep-1";
  };

    const getDisplayImage = (fontId: string, productId: string) => {
    // If the image doesn't load, we can use a more reliable single element image from data
    if (productId === "kep-1") {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Kim%20-%20G%C3%B3c%20th%E1%BA%B3ng.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20M%E1%BB%99c%20-%20G%C3%B3c%20nghi%C3%AAng.png";
    } else if (productId === "kep-2") {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20thu%E1%BB%B7.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Ho%E1%BA%A3%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png";
    } else {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png";
    }
  };

  return (
    <div className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
      {FONTS.map((font, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={font.id}
            onClick={() => setActiveIndex(index)}
            className={`
              relative flex flex-col md:flex-row items-center justify-center 
              transition-all duration-1000 ease-in-out overflow-hidden cursor-pointer
              ${isActive ? "min-h-[100vh] h-max md:h-auto py-12 md:py-0 md:flex-[4] flex-shrink-0" : "h-[80px] min-h-[80px] md:h-auto md:flex-1 flex-shrink-0"}
            `}
            style={{
              backgroundColor: isActive ? font.colorHex : `${font.colorHex}40`,
            }}
          >
            {/* Background elements when active */}
            {isActive && (
              <div
                className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(to bottom right, ${font.gradientFrom}, ${font.gradientTo})`,
                }}
              />
            )}

            {/* Inactive State Content */}
            <div
              className={`
              absolute inset-0 flex items-center justify-center transition-opacity duration-700
              ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#00687A] opacity-50 whitespace-nowrap tracking-widest uppercase">
                0{index + 1}
              </h3>
            </div>

            {/* Active State Content */}
            <div
              className={`
              w-full h-max min-h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-8 md:p-12 z-10 transition-opacity duration-1000 delay-300
              ${isActive ? "opacity-100" : "opacity-0 hidden"}
            `}
            >
              {/* Left text */}
              <div className="flex-1 flex flex-col items-start gap-4 z-30 relative mt-4 md:mt-0">
                <div className="flex items-end gap-6 mb-2">
                  <span
                    className="text-5xl md:text-6xl font-black"
                    style={{ color: "#00687A" }}
                  >
                    0{index + 1}
                  </span>
                  <div className="flex flex-col items-start pb-1">
                    <span className="text-[#00687A]/80 text-xs font-bold uppercase mb-0.5">
                      {lang === "vi" ? "Giá Chỉ Từ" : "Starts At"}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[#00687A] text-xl font-black tracking-tight leading-none">
                          {new Intl.NumberFormat("vi-VN").format(
                            getProductBasePrice("kep-1") +
                              (font.id === "sticker" ? 3000 : 5000),
                          )}
                          <span className="text-xs underline ml-0.5">đ</span>
                          <span className="text-[10px] ml-1 font-medium">
                            (Kẹp)
                          </span>
                        </span>
                      </div>

                      <div className="w-[1px] h-6 bg-[#00687A]/20"></div>
                      <div className="flex flex-col">
                        <span className="text-[#00687A] text-xl font-black tracking-tight leading-none">
                          {new Intl.NumberFormat("vi-VN").format(
                            getProductBasePrice("guong") +
                              (font.id === "sticker" ? 3000 : 5000),
                          )}
                          <span className="text-xs underline ml-0.5">đ</span>
                          <span className="text-[10px] ml-1 font-medium">
                            (Gương)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold text-[#00687A] uppercase tracking-wider leading-tight">
                  {lang === "vi" ? font.nameVi : font.nameEn}
                </h2>
                <p className="text-base md:text-lg text-[#00687A]/90 max-w-sm font-semibold leading-relaxed">
                  {lang === "vi" ? font.descVi : font.descEn}
                </p>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        id: "kep-1",
                        label:
                          lang === "vi" ? "Kẹp Ánh Mây" : "Cloud Glow Clip",
                      },
                      {
                        id: "kep-2",
                        label: lang === "vi" ? "Kẹp Pha Lê" : "Crystal Clip",
                      },
                      {
                        id: "guong",
                        label: lang === "vi" ? "Gương" : "Mirror",
                      },
                    ].filter(opt => font.id !== "sticker" || opt.id !== "guong").map((opt) => (
                      <button
                        key={opt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductSelect(font.id, opt.id);
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase rounded-sm border transition-all cursor-pointer ${getSelectedProduct(font.id) === opt.id ? "bg-[#00687A] text-white border-[#00687A] shadow-md font-extrabold scale-105" : "bg-white/80 backdrop-blur-sm text-[#00687A] border-[#00687A]/30 hover:bg-white hover:text-[#00687A] shadow-sm font-semibold"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateCustomizer(
                        font.id,
                        getSelectedProduct(font.id),
                      );
                    }}
                    className="px-6 py-3 rounded-full bg-white text-[#00687A] font-bold text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 max-w-xs whitespace-nowrap mt-2"
                  >
                    {lang === "vi" ? "Thiết Kế Ngay" : "Customize Now"}{" "}
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>

              {/* Center Image */}
              <div className="flex-none md:flex-[2] w-full min-h-[300px] h-auto md:h-full flex flex-col items-center justify-center relative md:min-h-[400px]">
                <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />

                <div className="flex-1 w-full flex items-center justify-center relative">
                  {(() => {
                    const selectedProductId = getSelectedProduct(font.id);
                    const isPhaLeDan =
                      font.id === "sticker" && selectedProductId === "kep-2";
                    const isGuong = selectedProductId === "guong";

                    const transformClass = isPhaLeDan
                      ? "scale-[0.8] md:scale-[0.85] lg:scale-[0.9] translate-x-0 md:translate-x-10 lg:translate-x-12 hover:scale-[0.56] md:hover:scale-[0.59] lg:hover:scale-[0.62] hover:translate-x-8 md:hover:translate-x-10 lg:hover:translate-x-12"
                      : "scale-100 md:scale-[1.2] lg:scale-[1.3] hover:scale-[1.15] md:hover:scale-[1.25] lg:hover:scale-[1.35]";

                    return (
                      <img
                        src={getDisplayImage(
                          font.id,
                          getSelectedProduct(font.id),
                        )}
                        alt={font.nameEn}
                        className={`w-full h-full max-w-[600px] md:max-w-[800px] object-contain drop-shadow-2xl mix-blend-multiply animate-float z-20 transition-transform duration-700 ease-out ${transformClass}`}
                       referrerPolicy="no-referrer"  />
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
