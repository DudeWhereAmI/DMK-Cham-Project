const fs = require('fs');
const content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');
if (content.includes("['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Tân', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'TP. Thủ Đức']")) {
    console.log("Success");
}
