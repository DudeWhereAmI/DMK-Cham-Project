const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  `fetchInventoryFromFirestore().then(() => {`,
  `fetchInventoryFromFirestore().then((res) => { console.log("Inventory loaded:", res);`
);

code = code.replace(
  `console.warn("Failed to fetch shared inventory from Firestore at startup:", err);`,
  `console.warn("Failed to fetch shared inventory from Firestore at startup:", err); alert("Inventory fetch failed: " + err.message);`
);

fs.writeFileSync('src/App.tsx', code);
