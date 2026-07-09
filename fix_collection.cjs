const fs = require('fs');
let content = fs.readFileSync('src/components/CollectionChamToi.tsx', 'utf8');

const regex = /if \(isGuong\) \{[\s\S]*?\}\s*const transformClass/m;
content = content.replace(regex, `const transformClass`);

fs.writeFileSync('src/components/CollectionChamToi.tsx', content);
