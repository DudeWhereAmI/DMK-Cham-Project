const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const wardRegex = /\{!useOldAddress && formData\.district && NEW_WARDS\[formData\.district\] && \([\s\S]*?<\/select>\n\s*\)\}/;
const newWardCode = `{!useOldAddress && formData.district !== 'Khác' && formData.district !== 'Ngoài tỉnh' && (
                      <select 
                        name="ward" 
                        value={formData.ward} 
                        onChange={handleInputChange} 
                        required 
                        disabled={!formData.district || !NEW_WARDS[formData.district]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                      >
                        <option value="">{lang === 'vi' ? 'Chọn Phường/Xã' : 'Select Ward'}</option>
                        {formData.district && NEW_WARDS[formData.district] && NEW_WARDS[formData.district].map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    )}`;

if (wardRegex.test(content)) {
  content = content.replace(wardRegex, newWardCode);
} else {
  console.log("Could not find ward select");
}

const addressRegex = /placeholder=\{lang === 'vi' \? \(useOldAddress \|\| !NEW_WARDS\[formData\.district\] \? 'Địa chỉ chi tiết \(Số nhà, Tên đường, Phường\)' : 'Địa chỉ chi tiết \(Số nhà, Tên đường\)'\) : 'Detailed Address'\}/;
const newAddressCode = `placeholder={lang === 'vi' ? (useOldAddress || formData.district === 'Khác' || formData.district === 'Ngoài tỉnh' ? 'Địa chỉ chi tiết (Số nhà, Tên đường, Phường)' : 'Địa chỉ chi tiết (Số nhà, Tên đường)') : 'Detailed Address'}`;

if (addressRegex.test(content)) {
  content = content.replace(addressRegex, newAddressCode);
} else {
  console.log("Could not find address placeholder");
}

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
console.log("Done");
