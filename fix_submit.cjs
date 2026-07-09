const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const regex = /if \(!formData\.district\) \{\n\s*alert\(lang === 'vi' \? 'Vui lòng chọn quận\/huyện\.' : 'Please select a district\.'\);\n\s*return;\n\s*\}/;
const replacement = `if (!formData.district) {
        alert(lang === 'vi' ? 'Vui lòng chọn quận/huyện.' : 'Please select a district.');
        return;
      }
      if (!useOldAddress && NEW_WARDS[formData.district] && !formData.ward) {
        alert(lang === 'vi' ? 'Vui lòng chọn phường/xã.' : 'Please select a ward.');
        return;
      }`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
