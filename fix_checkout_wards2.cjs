const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const regex = /\{\[\'Quận 1\', \'Quận 3\', \'Quận 4\', \'Quận 5\', \'Quận 6\', \'Quận 7\', \'Quận 8\', \'Quận 10\', \'Quận 11\', \'Quận 12\', \'Bình Thạnh\', \'Phú Nhuận\', \'Gò Vấp\', \'Tân Bình\', \'Tân Phú\', \'TP\. Thủ Đức\'\]\.map/;

if (regex.test(content)) {
  content = content.replace(regex, "{['Quận 1', 'Quận 3 (Phường Võ Thị Sáu)', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 8', 'Quận 10 (Phường Diên Hồng)', 'Quận 11', 'Tân Bình', 'Tân Phú', 'Phú Nhuận', 'Gò Vấp', 'Bình Thạnh', 'Thủ Đức (Phường An Khánh/Thủ Thiêm)'].map");
  fs.writeFileSync('src/components/CheckoutPage.tsx', content);
  console.log('Fixed wards');
} else {
  console.log('Not found');
}
