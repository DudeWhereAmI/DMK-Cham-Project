const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const regex = /placeholder=\{lang === 'vi' \? \(useOldAddress \? 'Địa chỉ chi tiết \(Số nhà, Tên đường, Phường\)' : 'Địa chỉ chi tiết \(Số nhà, Tên đường\)'\) : 'Detailed Address'\}/;
const replacement = `placeholder={lang === 'vi' ? (useOldAddress || !NEW_WARDS[formData.district] ? 'Địa chỉ chi tiết (Số nhà, Tên đường, Phường)' : 'Địa chỉ chi tiết (Số nhà, Tên đường)') : 'Detailed Address'}`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
