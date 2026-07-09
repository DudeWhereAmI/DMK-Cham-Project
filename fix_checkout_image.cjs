const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

if (!content.includes('MIRROR_IMAGES_CHU_NOI')) {
  content = content.replace(
    "import { X, CheckCircle, Tag, Copy, ShieldCheck, MapPin, UploadCloud } from 'lucide-react';",
    "import { X, CheckCircle, Tag, Copy, ShieldCheck, MapPin, UploadCloud } from 'lucide-react';\nimport { MIRROR_IMAGES_CHU_NOI, MIRROR_IMAGES_LINH_VAT } from '../data';"
  );
}

const mirrorImageLogic = `
                     {(() => {
                        let imageUrl = item.product?.images?.[item.customization?.element] || item.product?.image || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm';
                        if (item.product?.id === 'guong') {
                          const isZodiacMode = item.customization?.selectedZodiacCharmId;
                          const element = item.customization?.element || 'KIM';
                          const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
                          imageUrl = mirrorMap[element];
                        }
                        return <img src={imageUrl} alt={item.product?.name} className="w-full h-full object-contain mix-blend-multiply" />;
                     })()}
`;

const replaceImg = /<img\s+src=\{item\.product\?\.images\?\.\[item\.customization\?\.element\][\s\S]*?className="w-full h-full object-contain mix-blend-multiply"\s*\/>/;
content = content.replace(replaceImg, mirrorImageLogic);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
