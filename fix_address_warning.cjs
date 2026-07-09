const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const regex = /setUseOldAddress\(e\.target\.checked\);\n\s*setFormData\(prev => \(\{ \.\.\.prev, district: '', ward: '' \}\)\);/;
const replacement = `setUseOldAddress(e.target.checked);
                          setFormData(prev => ({ ...prev, district: '', ward: '' }));
                          setAddressWarning(null);`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
