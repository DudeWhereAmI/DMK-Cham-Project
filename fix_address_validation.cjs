const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const oldVal = `if ((name === 'address' || name === 'district') && deliveryMethod === 'online' && newForm.district && newForm.district !== 'Ngoài tỉnh' && newForm.district !== 'Khác') {`;
const newVal = `if (useOldAddress && (name === 'address' || name === 'district') && deliveryMethod === 'online' && newForm.district && newForm.district !== 'Ngoài tỉnh' && newForm.district !== 'Khác') {`;

content = content.replace(oldVal, newVal);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
