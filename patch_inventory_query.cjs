const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

// Add missing imports
code = code.replace(
  `import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';`,
  `import { doc, getDoc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';`
);

// Update fetchInventoryFromFirestore to use the query
code = code.replace(
  `    const ordersSnap = await getDocs(collection(db, 'orders'));`,
  `    const q = query(collection(db, 'orders'), where('createdAt', '>=', Timestamp.fromMillis(lastUpdatedMs)));\n    const ordersSnap = await getDocs(q);`
);

fs.writeFileSync('src/lib/inventory.ts', code);
console.log('Patched imports and query successfully');
