const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const selectHTML = `<select 
                      name="district" 
                      value={formData.district} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                    >
                      <option value="">{lang === 'vi' ? 'Chọn Quận (Nội thành TP.HCM)' : 'Select District (Inner HCMC)'}</option>
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 3 (Phường Võ Thị Sáu)">Quận 3 (Phường Võ Thị Sáu)</option>
                      <option value="Quận 4">Quận 4</option>
                      <option value="Quận 5">Quận 5</option>
                      <option value="Quận 6">Quận 6</option>
                      <option value="Quận 8">Quận 8</option>
                      <option value="Quận 10 (Phường Diên Hồng)">Quận 10 (Phường Diên Hồng)</option>
                      <option value="Quận 11">Quận 11</option>
                      <option value="Tân Bình">Tân Bình</option>
                      <option value="Tân Phú">Tân Phú</option>
                      <option value="Phú Nhuận">Phú Nhuận</option>
                      <option value="Gò Vấp">Gò Vấp</option>
                      <option value="Bình Thạnh">Bình Thạnh</option>
                      <option value="Thủ Đức (Phường An Khánh/Thủ Thiêm)">Thủ Đức (Phường An Khánh/Thủ Thiêm)</option>
                    </select>`;

const newSelectHTML = `
                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <input 
                        type="checkbox" 
                        id="useOldAddress" 
                        checked={useOldAddress} 
                        onChange={(e) => {
                          setUseOldAddress(e.target.checked);
                          setFormData(prev => ({ ...prev, district: '' }));
                        }} 
                        className="w-4 h-4 text-[#00687A] border-gray-300 rounded focus:ring-[#00687A]"
                      />
                      <label htmlFor="useOldAddress" className="text-sm font-medium text-gray-700 cursor-pointer">
                        {lang === 'vi' ? 'Dùng địa chỉ cũ trước sáp nhập' : 'Use old address before merge'}
                      </label>
                    </div>
                    
                    <select 
                      name="district" 
                      value={formData.district} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                    >
                      <option value="">{lang === 'vi' ? 'Chọn Quận/Huyện' : 'Select District'}</option>
                      {useOldAddress ? (
                        <>
                          {['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Phú Nhuận', 'Gò Vấp', 'Tân Bình', 'Tân Phú', 'Thủ Đức'].map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      ) : (
                        <>
                          {['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Phú Nhuận', 'Gò Vấp', 'Tân Bình', 'Tân Phú', 'TP. Thủ Đức'].map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      )}
                      <option value="Khác">Khác</option>
                      <option value="Ngoài tỉnh">Ngoài tỉnh</option>
                    </select>
`;

content = content.replace(selectHTML, newSelectHTML);
fs.writeFileSync('src/components/CheckoutPage.tsx', content);
