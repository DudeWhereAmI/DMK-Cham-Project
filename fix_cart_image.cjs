const fs = require('fs');
const files = ['src/components/CartDrawer.tsx', 'src/components/CartPage.tsx', 'src/components/UserProfile.tsx'];

const getElementImage = `const getCartItemImage = (item: CartItem): string => {
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

  if (letteringStyle && product?.imagesWithText) {
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

  if (hasZodiacCharm && product?.imagesWithCharm && product.imagesWithCharm[element]) {
    return product.imagesWithCharm[element];
  }
  
  return product?.images?.[element] || product?.image || product?.images?.['none'] || Object.values(product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm';
};`;

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find where getCartItemImage is defined
    const oldFuncStart = content.indexOf('const getCartItemImage =');
    if (oldFuncStart !== -1) {
      // Find end of function
      let openBrackets = 0;
      let oldFuncEnd = -1;
      let started = false;
      for (let i = oldFuncStart; i < content.length; i++) {
        if (content[i] === '{') {
          openBrackets++;
          started = true;
        } else if (content[i] === '}') {
          openBrackets--;
        }
        if (started && openBrackets === 0) {
          oldFuncEnd = i + 1;
          break;
        }
      }
      if (oldFuncEnd !== -1) {
        // Also remove any trailing semicolon
        if (content[oldFuncEnd] === ';') oldFuncEnd++;
        
        const oldCode = content.substring(oldFuncStart, oldFuncEnd);
        content = content.replace(oldCode, getElementImage);
        fs.writeFileSync(file, content);
      }
    }
  }
}
