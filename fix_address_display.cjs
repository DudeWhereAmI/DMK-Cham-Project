const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

content = content.replace(
  '<p className="font-medium text-gray-900">{formData.address}, {formData.district}</p>',
  '<p className="font-medium text-gray-900">{formData.address}{formData.ward ? `, ${formData.ward}` : ""}, {formData.district}</p>'
);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
