const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

const regex = /<div className="flex items-center gap-2\.5 z-30 pointer-events-auto">\s*\{\[0, 1, 2\]\.map\(\(dotIndex\) => \([\s\S]*?\}\)\)\}\s*<\/div>/;
content = content.replace(regex, '');

fs.writeFileSync('src/components/LandingPage.tsx', content);
