const fs = require('fs');
let content = fs.readFileSync('src/components/CollectionChamToi.tsx', 'utf8');

// The replacement logic to remove the product selector and simplify
const newComponent = `export const CollectionChamToi: React.FC<CollectionChamToiProps> = ({
  lang,
  onNavigateCustomizer,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  return (
    <div className="w-full h-[80vh] min-h-[700px] overflow-hidden flex flex-col md:flex-row">
      {FONTS.map((font, index) => {
        const isActive = activeIndex === index;
        const images = font.id === 'embossed' ? Object.values(MIRROR_IMAGES_CHU_NOI) : Object.values(MIRROR_IMAGES_LINH_VAT);
        
        return (
          <div
            key={font.id}
            onClick={() => setActiveIndex(index)}
            className={\`
              relative flex flex-col md:flex-row items-center justify-center 
              transition-all duration-1000 ease-in-out overflow-hidden cursor-pointer
              \${isActive ? 'flex-[4]' : 'flex-1'}
            \`}
            style={{ 
              backgroundColor: isActive ? font.colorHex : \`\${font.colorHex}40\`,
            }}
          >
            {/* Background elements when active */}
            {isActive && (
              <div 
                className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                  background: \`linear-gradient(to bottom right, \${font.gradientFrom}, \${font.gradientTo})\`
                }}
              />
            )}

            {/* Inactive State Content */}
            <div className={\`
              absolute inset-0 flex items-center justify-center transition-opacity duration-700
              \${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            \`}>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#00687A] opacity-50 whitespace-nowrap tracking-widest uppercase">
                0{index + 1}
              </h3>
            </div>

            {/* Active State Content */}
            <div className={\`
              w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-1000 delay-300
              \${isActive ? 'opacity-100' : 'opacity-0 hidden'}
            \`}>
              
              {/* Left text */}
              <div className="flex-1 flex flex-col items-start gap-4 z-30 relative md:mt-0 mt-8">
                <div className="flex items-end gap-6 mb-2">
                  <span className="text-5xl md:text-6xl font-black" style={{ color: '#00687A' }}>0{index + 1}</span>
                  <div className="flex flex-col items-start pb-1">
                    <span className="text-[#00687A]/80 text-xs font-bold uppercase mb-0.5">{lang === 'vi' ? 'Giá Gương Chỉ Từ' : 'Mirrors Start At'}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[#00687A]/50 text-xs font-bold line-through">
                          {new Intl.NumberFormat('vi-VN').format(getProductBasePrice('guong') + (font.id === 'sticker' ? 3000 : 5000))}đ
                        </span>
                        <span className="text-[#00687A] text-xl font-black tracking-tight leading-none">
                          {new Intl.NumberFormat('vi-VN').format(Math.round((getProductBasePrice('guong') + (font.id === 'sticker' ? 3000 : 5000)) * 0.9))}<span className="text-xs underline ml-0.5">đ</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold text-[#00687A] uppercase tracking-wider leading-tight">
                  {lang === 'vi' ? font.nameVi : font.nameEn}
                </h2>
                <p className="text-base md:text-lg text-[#00687A]/90 max-w-sm font-semibold leading-relaxed">
                  {lang === 'vi' ? font.descVi : font.descEn}
                </p>

                <div className="flex flex-col gap-4 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateCustomizer(font.id, 'guong');
                    }}
                    className="px-6 py-3 rounded-full bg-white text-[#00687A] font-bold text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 max-w-xs whitespace-nowrap mt-2"
                  >
                    {lang === 'vi' ? 'Thiết Kế Ngay' : 'Customize Now'} <span className="text-xl">→</span>
                  </button>
                </div>
              </div>

              {/* Center Images */}
              <div className="flex-[2] h-full flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[400px]">
                <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />
                
                <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center group">
                  {images.map((imgUrl, i) => {
                    const rotations = ['-rotate-12', '-rotate-6', 'rotate-0', 'rotate-6', 'rotate-12'];
                    const hoverRotations = ['group-hover:-rotate-12', 'group-hover:-rotate-6', 'group-hover:rotate-0', 'group-hover:rotate-6', 'group-hover:rotate-12'];
                    const translations = ['-translate-x-16', '-translate-x-8', 'translate-x-0', 'translate-x-8', 'translate-x-16'];
                    const hoverTranslations = ['group-hover:-translate-x-32', 'group-hover:-translate-x-16', 'group-hover:translate-x-0', 'group-hover:translate-x-16', 'group-hover:translate-x-32'];
                    
                    return (
                      <img 
                        key={i}
                        src={imgUrl}
                        alt={\`Sample \${i+1}\`} 
                        className={\`absolute w-2/3 h-2/3 object-contain drop-shadow-2xl mix-blend-multiply z-\${20 + i} transition-all duration-700 ease-out \${rotations[i]} \${translations[i]} \${hoverRotations[i]} \${hoverTranslations[i]} group-hover:scale-110\`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
`;

const newFileContent = content.replace(/export const CollectionChamToi: React\.FC<CollectionChamToiProps> = \(\{[\s\S]*?^};\n/m, newComponent);
fs.writeFileSync('src/components/CollectionChamToi.tsx', newFileContent);
