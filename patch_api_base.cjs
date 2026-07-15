const fs = require('fs');

const filesToUpdate = [
  'src/components/CheckoutPage.tsx',
  'src/components/ContactUs.tsx',
  'src/components/UserProfile.tsx',
  'src/lib/inventory.ts'
];

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add API_BASE definition if not exists
  if (!content.includes('VITE_API_BASE_URL')) {
    const importRegex = /import .*?;/g;
    let lastImportIndex = 0;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }
    
    content = content.slice(0, lastImportIndex) + "\n\nconst API_BASE = import.meta.env.VITE_API_BASE_URL || '';\n" + content.slice(lastImportIndex);
  }
  
  // Replace fetch('/api/...) with fetch(`${API_BASE}/api/...`)
  content = content.replace(/fetch\('(\/api\/[^']+)'/g, "fetch(`${API_BASE}$1`");
  
  fs.writeFileSync(file, content);
  console.log(`Updated API paths in ${file}`);
}
