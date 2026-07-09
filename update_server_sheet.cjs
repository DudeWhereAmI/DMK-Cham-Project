const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /deliveryMethod === 'direct' \? 'UEH - Cơ sở B - 279 Nguyễn Tri Phương, Phường Diên Hồng, TP\.HCM' : \`\$\{customerInfo\.address\}, \$\{customerInfo\.ward\}, \$\{customerInfo\.district\}, \$\{customerInfo\.province\}\`,/;
const replacement = "deliveryMethod === 'direct' ? 'UEH - Cơ sở B - 279 Nguyễn Tri Phương, Phường Diên Hồng, TP.HCM' : `${customerInfo.address}${customerInfo.ward ? `, ${customerInfo.ward}` : ''}, ${customerInfo.district}${customerInfo.province ? `, ${customerInfo.province}` : ''}`,";

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
