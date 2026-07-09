const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const getElementImage = `const getCheckoutItemImage = (item: CartItem): string => {
  const product = item.product;
  const customization = item.customization || {};
  const element = customization.element || 'KIM';
  
  if (product?.id === 'guong') {
    const isZodiacMode = !!customization.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[element] || product.images?.['none'] || '';
  }

  // Combo logic: use the clip sample image based on base product
  const hasZodiacCharm = !!customization.selectedZodiacCharmId;
  const letteringStyle = customization.letteringStyle;
  const textStyleOption = customization.textStyleOption;

  if (letteringStyle && product.imagesWithText) {
    const exactKey = \`\${letteringStyle}-\${textStyleOption || ''}\`;
    if (product.imagesWithText[exactKey] && product.imagesWithText[exactKey][element]) {
      return product.imagesWithText[exactKey][element];
    }
    if (letteringStyle === 'sticker') {
       if (product.imagesWithText['sticker-silver'] && product.imagesWithText['sticker-silver'][element]) return product.imagesWithText['sticker-silver'][element];
       if (product.imagesWithText['sticker-gold'] && product.imagesWithText['sticker-gold'][element]) return product.imagesWithText['sticker-gold'][element];
       if (product.imagesWithText['embossed-white'] && product.imagesWithText['embossed-white'][element]) return product.imagesWithText['embossed-white'][element];
       if (product.imagesWithText['embossed-pink'] && product.imagesWithText['embossed-pink'][element]) return product.imagesWithText['embossed-pink'][element];
    } else if (letteringStyle === 'embossed') {
       if (product.imagesWithText['embossed-white'] && product.imagesWithText['embossed-white'][element]) return product.imagesWithText['embossed-white'][element];
       if (product.imagesWithText['embossed-pink'] && product.imagesWithText['embossed-pink'][element]) return product.imagesWithText['embossed-pink'][element];
       if (product.imagesWithText['sticker-silver'] && product.imagesWithText['sticker-silver'][element]) return product.imagesWithText['sticker-silver'][element];
       if (product.imagesWithText['sticker-gold'] && product.imagesWithText['sticker-gold'][element]) return product.imagesWithText['sticker-gold'][element];
    }
  }

  if (hasZodiacCharm && product.imagesWithCharm && product.imagesWithCharm[element]) {
    return product.imagesWithCharm[element];
  }
  
  return product.images?.[element] || product.image || product.images?.['none'] || Object.values(product.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm';
};`;

if (!content.includes('getCheckoutItemImage')) {
  content = content.replace(
    'const CheckoutPage: React.FC<CheckoutPageProps> = ({',
    `${getElementImage}\n\nexport const CheckoutPage: React.FC<CheckoutPageProps> = ({`
  );
  content = content.replace(
    /\{\(\(\) => \{\s*let imageUrl = item\.product\?\.images\?\.\[item\.customization\?\.element\][\s\S]*?return <img src=\{imageUrl\} alt=\{item\.product\?\.name\} className="w-full h-full object-contain mix-blend-multiply" \/>;\s*\}\)\(\)\}/g,
    '<img src={getCheckoutItemImage(item)} alt={item.product?.name} className="w-full h-full object-contain mix-blend-multiply" />'
  );
  content = content.replace(
    'export const CheckoutPage',
    'const CheckoutPage'
  );
  content = content.replace(
    /const CheckoutPage: React\.FC<CheckoutPageProps> = \(\{\n/g,
    'export const CheckoutPage: React.FC<CheckoutPageProps> = ({\n'
  );
  
  // Need to fix if export was replaced multiple times
  content = content.replace(/export export const/g, 'export const');
  
  fs.writeFileSync('src/components/CheckoutPage.tsx', content);
}
