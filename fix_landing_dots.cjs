const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

// The material dots we accidentally removed
const materialDots = `<div className="flex items-center gap-2.5 z-30 pointer-events-auto">
                              {materialsData.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMaterialIndex(dotIndex);
                                  }}
                                  className={\`h-1.5 rounded-full transition-all duration-300 \${dotIndex === activeMaterialIndex ? 'w-6 bg-[#E28C9A]' : 'w-1.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}\`}
                                  aria-label={\`Go to material \${dotIndex + 1}\`}
                                />
                              ))}
                            </div>`;

// Insert it back below {/* Pagination Indicators (Inline) */} for Materials
content = content.replace(
  '{/* Pagination Indicators (Inline) */}',
  '{/* Pagination Indicators (Inline) */}\n                            ' + materialDots
);

// Now for the mirror dots. We want to remove them.
const mirrorDotsStr = `<div className="flex items-center gap-2.5 z-30 pointer-events-auto">
                          {[0, 1, 2].map((dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMirrorIndex(dotIndex);
                              }}
                              className={\`h-1.5 rounded-full transition-all duration-300 \${dotIndex === activeMirrorIndex ? 'w-6 bg-[#E28C9A]' : 'w-1.5 bg-[#00687A]/20 hover:bg-[#00687A]/40'}\`}
                              aria-label={\`Go to mirror image \${dotIndex + 1}\`}
                            />
                          ))}
                        </div>`;

content = content.replace(mirrorDotsStr, '');

fs.writeFileSync('src/components/LandingPage.tsx', content);
