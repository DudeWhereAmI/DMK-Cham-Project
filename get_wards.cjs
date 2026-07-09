const https = require('https');
https.get('https://tuoitre.vn/tp-hcm-sap-nhap-phuong-xa-tu-ngay-nao-thu-tuc-giay-to-cua-nguoi-dan-se-ra-sao-20241108155554625.htm', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const text = data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const matches = text.match(/thành phường [A-ZÀ-Ỹa-zà-ỹ ]+/gi);
    console.log(matches ? [...new Set(matches)] : 'No matches');
  });
}).on('error', err => console.log(err));
