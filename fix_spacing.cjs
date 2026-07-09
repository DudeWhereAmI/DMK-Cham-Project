const fs = require('fs');
let content = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

// Replace mt-3 with nothing for the ward select
content = content.replace(
  'className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm mt-3"',
  'className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"'
);

// Replace mt-3 / mt-0 logic for address input
content = content.replace(
  "className={`w-full px-4 py-3 border ${addressWarning ? 'border-amber-400' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#990000] text-sm ${!useOldAddress && formData.district && NEW_WARDS[formData.district] ? 'mt-3' : 'mt-0'}`}",
  "className={`w-full px-4 py-3 border ${addressWarning ? 'border-amber-400' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#990000] text-sm`}"
);

fs.writeFileSync('src/components/CheckoutPage.tsx', content);
