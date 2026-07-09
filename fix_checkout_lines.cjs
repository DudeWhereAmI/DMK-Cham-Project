const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('<select') && lines[lines.indexOf(l) + 1].includes('name="district"'));
let end = start;
while (end < lines.length && !lines[end].includes('</select>')) {
  end++;
}

const newHTML = `
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

if (start !== -1 && end !== -1) {
  lines.splice(start, end - start + 1, newHTML);
  fs.writeFileSync('src/components/CheckoutPage.tsx', lines.join('\n'));
} else {
  console.log("Could not find select");
}

