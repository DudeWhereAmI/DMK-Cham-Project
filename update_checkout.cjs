const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

// Update districts array
content = content.replace(
  "const hcmcDistricts = ['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 8', 'Quận 10 (Phường Diên Hồng)', 'Quận 11', 'Tân Bình', 'Tân Phú', 'Phú Nhuận', 'Gò Vấp', 'Bình Thạnh', 'Thủ Đức'];",
  "const hcmcDistricts = ['Quận 1', 'Quận 3 (Phường Võ Thị Sáu)', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 8', 'Quận 10 (Phường Diên Hồng)', 'Quận 11', 'Tân Bình', 'Tân Phú', 'Phú Nhuận', 'Gò Vấp', 'Bình Thạnh', 'Thủ Đức (Phường An Khánh/Thủ Thiêm)'];"
);

// Update switch cases
content = content.replace(
  "case 'Quận 3': aliases = ['quận 3', 'quan 3', 'q3', 'q.3']; break;",
  "case 'Quận 3 (Phường Võ Thị Sáu)': aliases = ['quận 3', 'quan 3', 'q3', 'q.3', 'võ thị sáu', 'vo thi sau']; break;"
);
content = content.replace(
  "case 'Thủ Đức': aliases = ['thủ đức', 'thu duc', 'tp thủ đức', 'tp thu duc']; break;",
  "case 'Thủ Đức (Phường An Khánh/Thủ Thiêm)': aliases = ['thủ đức', 'thu duc', 'an khánh', 'an khanh', 'thủ thiêm', 'thu thiem']; break;"
);

// Update options in dropdown
content = content.replace(
  '<option value="Quận 3">Quận 3</option>',
  '<option value="Quận 3 (Phường Võ Thị Sáu)">Quận 3 (Phường Võ Thị Sáu)</option>'
);
content = content.replace(
  '<option value="Thủ Đức">Thủ Đức</option>',
  '<option value="Thủ Đức (Phường An Khánh/Thủ Thiêm)">Thủ Đức (Phường An Khánh/Thủ Thiêm)</option>'
);

// Change logic to use RegExp for exact word boundaries to avoid partial matches
// Actually includes is fine, but to be sure:
content = content.replace(
  "const hasMatch = newForm.address.trim() === '' || aliases.some(alias => addressLower.includes(alias));",
  "const hasMatch = newForm.address.trim() === '' || aliases.some(alias => addressLower.includes(alias));"
);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
