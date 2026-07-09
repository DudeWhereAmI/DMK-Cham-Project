const fs = require('fs');

const getCartItemImageCode = `const getCartItemImage = (item: CartItem): string => {
  if (item.product?.category === 'mirror' || item.product?.id === 'guong') {
    const isZodiacMode = item.customization?.customType === 'zodiac' || !!item.customization?.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[item.customization?.element] || item.product?.images?.['none'] || '';
  }
  return item.product?.images?.[item.customization?.element] || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || '';
};`;

['src/components/CartDrawer.tsx', 'src/components/CartPage.tsx', 'src/components/CheckoutPage.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /const getCartItemImage = \([\s\S]*?\};/;
    if (regex.test(content)) {
      content = content.replace(regex, getCartItemImageCode);
      fs.writeFileSync(file, content);
    }
  }
});
