const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

// Insert useOldAddress state
if (!content.includes('const [useOldAddress')) {
  content = content.replace(
    'const [addressWarning, setAddressWarning] = useState<string | null>(null);',
    'const [addressWarning, setAddressWarning] = useState<string | null>(null);\n  const [useOldAddress, setUseOldAddress] = useState(false);'
  );
}

// Modify deliveryMethod validation logic
const submitLogicOld = /if \(deliveryMethod === 'online'\) \{\s*const hcmcDistricts = \['Quận 1', 'Quận 3 \(Phường Võ Thị Sáu\)', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 8', 'Quận 10 \(Phường Diên Hồng\)', 'Quận 11', 'Tân Bình', 'Tân Phú', 'Phú Nhuận', 'Gò Vấp', 'Bình Thạnh', 'Thủ Đức \(Phường An Khánh\/Thủ Thiêm\)'\];\s*if \(\!hcmcDistricts\.includes\(formData\.district\)\) \{\s*alert\(lang === 'vi' \? 'Xin lỗi, chúng tôi hiện tại chỉ hỗ trợ vận chuyển nội thành TP\.HCM\.' : 'Sorry, we currently only support shipping within inner HCMC\.'\);\s*return;\s*\}\s*\}/;

const submitLogicNew = `if (deliveryMethod === 'online') {
      if (formData.district === 'Ngoài tỉnh') {
        alert(lang === 'vi' ? 'Xin lỗi, chúng tôi hiện tại không hỗ trợ giao hàng ngoài tỉnh.' : 'Sorry, we currently do not support out-of-province shipping.');
        return;
      }
      if (!formData.district) {
        alert(lang === 'vi' ? 'Vui lòng chọn quận/huyện.' : 'Please select a district.');
        return;
      }
    }`;

content = content.replace(submitLogicOld, submitLogicNew);

// Replace district alias checking
const validateOld = /if \(\(name === 'address' \|\| name === 'district'\) && deliveryMethod === 'online' && newForm\.district && newForm\.district !== 'Ngoại Thành'\) \{[\s\S]*?else \{\s*setAddressWarning\(null\);\s*\}\s*\}/;

const validateNew = `if ((name === 'address' || name === 'district') && deliveryMethod === 'online' && newForm.district && newForm.district !== 'Ngoài tỉnh' && newForm.district !== 'Khác') {
        const addressLower = newForm.address.toLowerCase();
        let aliases: string[] = [];
        const dLower = newForm.district.toLowerCase();
        
        if (dLower.includes('quận 1') && !dLower.includes('11') && !dLower.includes('10') && !dLower.includes('12')) aliases = ['quận 1', 'quan 1', 'q1', 'q.1'];
        else if (dLower.includes('quận 2')) aliases = ['quận 2', 'quan 2', 'q2', 'q.2', 'thủ đức', 'thu duc'];
        else if (dLower.includes('quận 3')) aliases = ['quận 3', 'quan 3', 'q3', 'q.3'];
        else if (dLower.includes('quận 4')) aliases = ['quận 4', 'quan 4', 'q4', 'q.4'];
        else if (dLower.includes('quận 5')) aliases = ['quận 5', 'quan 5', 'q5', 'q.5'];
        else if (dLower.includes('quận 6')) aliases = ['quận 6', 'quan 6', 'q6', 'q.6'];
        else if (dLower.includes('quận 7')) aliases = ['quận 7', 'quan 7', 'q7', 'q.7'];
        else if (dLower.includes('quận 8')) aliases = ['quận 8', 'quan 8', 'q8', 'q.8'];
        else if (dLower.includes('quận 9')) aliases = ['quận 9', 'quan 9', 'q9', 'q.9', 'thủ đức', 'thu duc'];
        else if (dLower.includes('quận 10')) aliases = ['quận 10', 'quan 10', 'q10', 'q.10'];
        else if (dLower.includes('quận 11')) aliases = ['quận 11', 'quan 11', 'q11', 'q.11'];
        else if (dLower.includes('quận 12')) aliases = ['quận 12', 'quan 12', 'q12', 'q.12'];
        else if (dLower.includes('tân bình')) aliases = ['tân bình', 'tan binh', 'q. tân bình', 'q tan binh'];
        else if (dLower.includes('tân phú')) aliases = ['tân phú', 'tan phu', 'q. tân phú', 'q tan phu'];
        else if (dLower.includes('phú nhuận')) aliases = ['phú nhuận', 'phu nhuan', 'q. phú nhuận', 'q phu nhuan'];
        else if (dLower.includes('gò vấp')) aliases = ['gò vấp', 'go vap', 'q. gò vấp', 'q go vap'];
        else if (dLower.includes('bình thạnh')) aliases = ['bình thạnh', 'binh thanh', 'q. bình thạnh', 'q binh thanh'];
        else if (dLower.includes('thủ đức')) aliases = ['thủ đức', 'thu duc', 'tp thủ đức', 'tp. thủ đức', 'q2', 'quận 2', 'q9', 'quận 9'];
        else aliases = [dLower];
        
        const hasMatch = newForm.address.trim() === '' || aliases.some(alias => addressLower.includes(alias));
        if (!hasMatch) {
          setAddressWarning(lang === 'vi' ? \`Địa chỉ dường như không khớp với \${newForm.district}. Vui lòng kiểm tra lại.\` : \`Address doesn't seem to match \${newForm.district}. Please check again.\`);
        } else {
          setAddressWarning(null);
        }
      } else {
        setAddressWarning(null);
      }`;
      
content = content.replace(validateOld, validateNew);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
