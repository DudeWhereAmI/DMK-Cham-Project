const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

const replacement = `{(() => {
                            const slides = [
                              Object.values(MIRROR_IMAGES_LINH_VAT), // Slide 0: 5 mirrors
                              [MIRROR_IMAGES_LINH_VAT.MOC, MIRROR_IMAGES_LINH_VAT.THUY, MIRROR_IMAGES_LINH_VAT.HOA], // Slide 1: 3 mirrors
                              [MIRROR_IMAGES_LINH_VAT.HOA, MIRROR_IMAGES_LINH_VAT.THO, MIRROR_IMAGES_LINH_VAT.KIM]  // Slide 2: 3 mirrors
                            ];
                            const images = slides[activeMirrorIndex % slides.length];
                            
                            if (images.length === 5) {
                              return (
                                <img 
                                  src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A3nh%20m%E1%BA%ABu%20g%C6%B0%C6%A1ng%205%20c%C3%A1i%20ch%E1%BB%AF%20n%E1%BB%95i%20.png"
                                  alt="5 Mirrors"
                                  referrerPolicy="no-referrer"
                                  className="absolute w-full h-full max-w-[600px] object-contain drop-shadow-2xl mix-blend-multiply z-30 transition-transform duration-700 ease-out scale-110 md:scale-[1.2] lg:scale-[1.3] group-hover:scale-125 md:group-hover:scale-[1.35] lg:group-hover:scale-[1.45]"
                                />
                              );
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
                                    className={\`absolute w-[95%] h-[95%] object-contain drop-shadow-2xl mix-blend-multiply z-\${20 + i} transition-all duration-700 ease-out \${rotations[i]} \${translations[i]} \${hoverRotations[i]} \${hoverTranslations[i]} group-hover:scale-110\`}
                                  />
                                );
                              });
                            }
                         })()}`;

const originalRegex = /\{\(\(\) => \{[\s\S]*?const slides = \[[\s\S]*?\}\)\(\)\}/;
content = content.replace(originalRegex, replacement);

fs.writeFileSync('src/components/LandingPage.tsx', content);
