const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

content = content.replace(
  "setFormData(prev => ({ ...prev, district: '' }));",
  "setFormData(prev => ({ ...prev, district: '', ward: '' }));"
);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
