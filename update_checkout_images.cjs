const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

// Insert getCartItemImage function
const getCartItemImageCode = `
const getCartItemImage = (item: CartItem): string => {
  if (item.product?.category === 'mirror' || item.product?.id === 'guong') {
    const isZodiacMode = item.customization?.customType === 'zodiac' || !!item.customization?.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[item.customization?.element] || item.product?.images?.['none'] || '';
  }
  return item.product?.images?.[item.customization?.element] || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || '';
};
`;

if (!content.includes('const getCartItemImage =')) {
  // insert after NEW_WARDS
  content = content.replace(/};\n/, '};\n' + getCartItemImageCode);
}

// Fix image display in CheckoutPage
content = content.replace(
  /\{\(\(\) => \{\n\s*let imageUrl = item\.product\?\.images\?\.\[item\.customization\?\.element\] \|\| item\.product\?\.image \|\| item\.product\?\.images\?\.\['none'\] \|\| Object\.values\(item\.product\?\.images \|\| \{\}\)\[0\] \|\| 'https:\/\/via\.placeholder\.com\/150\?text=Chạm';\n\s*if \(item\.product\?\.id === 'guong'\) \{\n\s*const isZodiacMode = item\.customization\?\.selectedZodiacCharmId;\n\s*const element = item\.customization\?\.element \|\| 'KIM';\n\s*const mirrorMap = isZodiacMode \? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;\n\s*imageUrl = mirrorMap\[element\];\n\s*\}\n\s*return <img src=\{imageUrl\} alt=\{item\.product\?\.name\} className="w-full h-full object-contain mix-blend-multiply" \/>;\n\s*\}\)\(\)\}/g,
  '<img src={getCartItemImage(item)} alt={item.product?.name} className="w-full h-full object-contain mix-blend-multiply" />'
);

// Add itemImageUrl to the payload
content = content.replace(
  /customization: item\.customization,\n\s*images: item\.product\?\.images\n\s*\};/g,
  `customization: item.customization,
              images: item.product?.images,
              itemImageUrl: getCartItemImage(item)
            };`
);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
