const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const districtToAddressRegex = /<select[\s\S]*?name="district"[\s\S]*?<\/select>[\s\S]*?<input[\s\S]*?name="address"[\s\S]*?\/>/;
const match = content.match(districtToAddressRegex);

if (match) {
  const replacement = `<select 
                      name="district" 
                      value={formData.district} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                    >
                      <option value="">{lang === 'vi' ? 'Chọn Quận/Huyện' : 'Select District'}</option>
                      {useOldAddress ? (
                        <>
                          {['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Tân', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Thủ Đức'].map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      ) : (
                        <>
                          {Object.keys(NEW_WARDS).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      )}
                      <option value="Khác">Khác</option>
                      <option value="Ngoài tỉnh">Ngoài tỉnh</option>
                    </select>

                    {!useOldAddress && formData.district && NEW_WARDS[formData.district] && (
                      <select 
                        name="ward" 
                        value={formData.ward} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm mt-3"
                      >
                        <option value="">{lang === 'vi' ? 'Chọn Phường/Xã' : 'Select Ward'}</option>
                        {NEW_WARDS[formData.district].map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    )}

                    <input 
                      type="text" 
                      name="address"
                      placeholder={lang === 'vi' ? (useOldAddress ? 'Địa chỉ chi tiết (Số nhà, Tên đường, Phường)' : 'Địa chỉ chi tiết (Số nhà, Tên đường)') : 'Detailed Address'} 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={\`w-full px-4 py-3 border \${addressWarning ? 'border-amber-400' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#990000] text-sm \${!useOldAddress && formData.district && NEW_WARDS[formData.district] ? 'mt-3' : 'mt-0'}\`}
                    />`;
                    
  content = content.replace(match[0], replacement);
  fs.writeFileSync('src/components/CheckoutPage.tsx', content);
  console.log("Success");
} else {
  console.log("Not found");
}
