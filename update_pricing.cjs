const fs = require('fs');
let content = fs.readFileSync('src/components/CollectionChamToi.tsx', 'utf8');

content = content.replace(/\{font\.id !== 'sticker' && \(\s*<>\s*(<div className="w-\[1px\] h-6 bg-\[#00687A\]\/20"><\/div>)\s*(<div className="flex flex-col">[\s\S]*?<\/div>)\s*<\/>\s*\)\}/, 
`$1
$2`);

fs.writeFileSync('src/components/CollectionChamToi.tsx', content);
