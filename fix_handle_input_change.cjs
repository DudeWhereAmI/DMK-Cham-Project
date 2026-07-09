const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const regex = /setFormData\(prev => \{\n\s*const newForm = \{ \.\.\.prev, \[name\]: value \};\n\s*\n\s*\/\/ Address validation/;
const replacement = `setFormData(prev => {
      const newForm = { ...prev, [name]: value };
      
      if (name === 'district') {
        newForm.ward = '';
      }
      
      // Address validation`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
