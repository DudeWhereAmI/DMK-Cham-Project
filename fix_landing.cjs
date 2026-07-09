const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

// Replace the mirror section image display logic
const newMirrorDisplay = `{/* Mirror Images */}
                    <div className="w-full md:w-1/2 flex justify-center relative min-h-[300px] md:min-h-[400px] items-center">
                       <div 
                         className="absolute inset-0 rounded-full blur-[100px] opacity-60 -z-10 scale-125 transition-colors duration-1000"
                         style={{ backgroundColor: 'rgba(255, 235, 205, 0.4)' }}
                       />
                       <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full bg-[#E6D9C5]/40 blur-3xl -z-10 pointer-events-none" />
                       
                       <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center group">
                         {(() => {
                            const slides = [
                              Object.values(MIRROR_IMAGES_LINH_VAT), // Slide 0: 5 mirrors
                              [MIRROR_IMAGES_LINH_VAT.MOC, MIRROR_IMAGES_LINH_VAT.THUY, MIRROR_IMAGES_LINH_VAT.HOA], // Slide 1: 3 mirrors
                              [MIRROR_IMAGES_LINH_VAT.HOA, MIRROR_IMAGES_LINH_VAT.THO, MIRROR_IMAGES_LINH_VAT.KIM]  // Slide 2: 3 mirrors
                            ];
                            const images = slides[activeMirrorIndex % slides.length];
                            
                            if (images.length === 5) {
                              return images.map((imgUrl, i) => {
                                const rotations = ['-rotate-12', '-rotate-6', 'rotate-0', 'rotate-6', 'rotate-12'];
                                const hoverRotations = ['group-hover:-rotate-12', 'group-hover:-rotate-6', 'group-hover:rotate-0', 'group-hover:rotate-6', 'group-hover:rotate-12'];
                                const translations = ['-translate-x-20', '-translate-x-10', 'translate-x-0', 'translate-x-10', 'translate-x-20'];
                                const hoverTranslations = ['group-hover:-translate-x-32', 'group-hover:-translate-x-16', 'group-hover:translate-x-0', 'group-hover:translate-x-16', 'group-hover:translate-x-32'];
                                
                                return (
                                  <img 
                                    key={i}
                                    src={imgUrl}
                                    alt={\`Mirror \${i}\`}
                                    referrerPolicy="no-referrer"
                                    className={\`absolute w-3/4 h-3/4 object-contain drop-shadow-2xl mix-blend-multiply z-\${20 + i} transition-all duration-700 ease-out \${rotations[i]} \${translations[i]} \${hoverRotations[i]} \${hoverTranslations[i]} group-hover:scale-110\`}
                                  />
                                );
                              });
                            } else {
                              return images.map((imgUrl, i) => {
                                const rotations = ['-rotate-12', 'rotate-0', 'rotate-12'];
                                const hoverRotations = ['group-hover:-rotate-12', 'group-hover:rotate-0', 'group-hover:rotate-12'];
                                const translations = ['-translate-x-16', 'translate-x-0', 'translate-x-16'];
                                const hoverTranslations = ['group-hover:-translate-x-24', 'group-hover:translate-x-0', 'group-hover:translate-x-24'];
                                
                                return (
                                  <img 
                                    key={i}
                                    src={imgUrl}
                                    alt={\`Mirror \${i}\`}
                                    referrerPolicy="no-referrer"
                                    className={\`absolute w-3/4 h-3/4 object-contain drop-shadow-2xl mix-blend-multiply z-\${20 + i} transition-all duration-700 ease-out \${rotations[i]} \${translations[i]} \${hoverRotations[i]} \${hoverTranslations[i]} group-hover:scale-110\`}
                                  />
                                );
                              });
                            }
                         })()}
                       </div>
                    </div>`;

content = content.replace(
  /\{\/\* Mirror Images \*\/\}[\s\S]*?<\/div>(\s*)\{\/\* Brief description box \*\/}/,
  newMirrorDisplay + '$1{/* Brief description box */}'
);

content = content.replace(
  /\{\[0, 1, 2, 3, 4\]\.map\(\(dotIndex\) => \(/,
  '{[0, 1, 2].map((dotIndex) => ('
);

fs.writeFileSync('src/components/LandingPage.tsx', content);
