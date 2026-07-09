const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

// 1. Remove the dots
const dotsRegex = /<div className="flex items-center gap-2\.5 z-30 pointer-events-auto">[\s\S]*?<\/div>/;
if (dotsRegex.test(content)) {
  content = content.replace(dotsRegex, '');
}

// 2. Adjust the image size
const oldImgClass = 'className="absolute w-full h-full max-w-[600px] object-contain drop-shadow-2xl mix-blend-multiply z-30 transition-transform duration-700 ease-out scale-100 md:scale-110 lg:scale-[1.15] hover:scale-110 md:hover:scale-[1.2] lg:hover:scale-[1.25]"';
const newImgClass = 'className="absolute w-[80%] h-[80%] md:w-[75%] md:h-[75%] max-w-[450px] object-contain drop-shadow-2xl mix-blend-multiply z-30 transition-transform duration-700 ease-out hover:scale-105"';

if (content.includes(oldImgClass)) {
  content = content.replace(oldImgClass, newImgClass);
}

fs.writeFileSync('src/components/LandingPage.tsx', content);
