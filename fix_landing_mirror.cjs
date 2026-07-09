const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

const regex = /\{\(\(\) => \{[\s\S]*?const slides = \[[\s\S]*?\}\)\(\)\}/m;
content = content.replace(regex, `<img 
                                  src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A3nh%20m%E1%BA%ABu%20g%C6%B0%C6%A1ng%205%20c%C3%A1i%20ch%E1%BB%AF%20n%E1%BB%95i%20.png"
                                  alt="5 Mirrors"
                                  referrerPolicy="no-referrer"
                                  className="absolute w-full h-full max-w-[600px] object-contain drop-shadow-2xl mix-blend-multiply z-30 transition-transform duration-700 ease-out scale-100 md:scale-110 lg:scale-[1.15] hover:scale-110 md:hover:scale-[1.2] lg:hover:scale-[1.25]"
                                />`);

fs.writeFileSync('src/components/LandingPage.tsx', content);
