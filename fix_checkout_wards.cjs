const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const NEW_WARDS_CODE = `
const NEW_WARDS: Record<string, string[]> = {
  'Quận 1': ['Phường Sài Gòn', 'Phường Tân Định', 'Phường Bến Thành', 'Phường Cầu Ông Lãnh'],
  'Quận 3': ['Phường Bàn Cờ', 'Phường Xuân Hòa', 'Phường Nhiêu Lộc'],
  'Quận 4': ['Phường Xóm Chiếu', 'Phường Khánh Hội', 'Phường Vĩnh Hội'],
  'Quận 5': ['Phường Chợ Quán', 'Phường An Đông', 'Phường Chợ Lớn'],
  'Quận 6': ['Phường Bình Tây', 'Phường Bình Tiên', 'Phường Bình Phú', 'Phường Phú Lâm'],
  'Quận 7': ['Phường Tân Thuận', 'Phường Phú Thuận', 'Phường Tân Mỹ', 'Phường Tân Hưng'],
  'Quận 8': ['Phường Chánh Hưng', 'Phường Phú Định', 'Phường Bình Đông'],
  'Quận 10': ['Phường Diên Hồng', 'Phường Vườn Lài', 'Phường Hòa Hưng'],
  'Quận 11': ['Phường Minh Phụng', 'Phường Bình Thới', 'Phường Hòa Bình', 'Phường Phú Thọ'],
  'Quận 12': ['Phường Đông Hưng Thuận', 'Phường Trung Mỹ Tây', 'Phường Tân Thới Hiệp', 'Phường Thới An', 'Phường An Phú Đông'],
  'Bình Tân': ['Phường An Lạc', 'Phường Bình Tân', 'Phường Tân Tạo', 'Phường Bình Trị Đông', 'Phường Bình Hưng Hòa'],
  'Bình Thạnh': ['Phường Gia Định', 'Phường Bình Thạnh', 'Phường Bình Lợi Trung', 'Phường Thạnh Mỹ Tây', 'Phường Bình Quới'],
  'Gò Vấp': ['Phường Hạnh Thông', 'Phường An Nhơn', 'Phường Gò Vấp', 'Phường An Hội Đông', 'Phường Thông Tây Hội', 'Phường An Hội Tây'],
  'Phú Nhuận': ['Phường Đức Nhuận', 'Phường Cầu Kiệu', 'Phường Phú Nhuận'],
  'Tân Bình': ['Phường Tân Sơn Hòa', 'Phường Tân Sơn Nhất', 'Phường Tân Hòa', 'Phường Bảy Hiền', 'Phường Tân Bình', 'Phường Tân Sơn'],
  'Tân Phú': ['Phường Tây Thạnh', 'Phường Tân Sơn Nhì', 'Phường Phú Thọ Hòa', 'Phường Tân Phú', 'Phường Phú Thạnh'],
  'TP. Thủ Đức': ['Phường Hiệp Bình', 'Phường Thủ Đức', 'Phường Tam Bình', 'Phường Linh Xuân', 'Phường Tăng Nhơn Phú', 'Phường Long Bình', 'Phường Long Phước', 'Phường Long Trường', 'Phường Cát Lái', 'Phường Bình Trưng', 'Phường Phước Long', 'Phường An Khánh']
};
`;

if (!content.includes('const NEW_WARDS')) {
  // insert after imports
  content = content.replace(/import .*?from .*?;\n/g, match => match);
  const lastImportIndex = content.lastIndexOf("from '");
  const nextNewline = content.indexOf('\n', lastImportIndex);
  
  content = content.slice(0, nextNewline + 1) + NEW_WARDS_CODE + content.slice(nextNewline + 1);
}

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
