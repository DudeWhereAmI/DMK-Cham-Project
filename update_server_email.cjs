const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /let elementImgUrl = '';\n\s*if \(item\.customization && item\.customization\.element && item\.images && item\.images\[item\.customization\.element\]\) \{\n\s*elementImgUrl = item\.images\[item\.customization\.element\];\n\s*\} else if \(item\.images && Object\.values\(item\.images\)\.length > 0\) \{\n\s*elementImgUrl = Object\.values\(item\.images\)\[0\] as string;\n\s*\}/g;
const replacement = `let elementImgUrl = item.itemImageUrl || '';
        if (!elementImgUrl) {
          if (item.customization && item.customization.element && item.images && item.images[item.customization.element]) {
            elementImgUrl = item.images[item.customization.element];
          } else if (item.images && Object.values(item.images).length > 0) {
            elementImgUrl = Object.values(item.images)[0] as string;
          }
        }`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
