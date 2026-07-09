const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

// 1. Update fetchInventoryFromFirestore
code = code.replace(
  /export const fetchInventoryFromFirestore = async \(\) => \{[\s\S]*?return inv;\n  \} catch \(err\) \{/,
`export const fetchInventoryFromFirestore = async () => {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    
    let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    let lastUpdatedMs = new Date('2026-07-01T00:00:00').getTime();
    let history = [];
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      baseInv = {
        products: data.products || baseInv.products,
        charms: data.charms || baseInv.charms
      };
      if (data.updatedAt) {
        lastUpdatedMs = new Date(data.updatedAt).getTime();
      }
      if (data.history) {
        history = data.history;
      }
    }
    
    const ordersSnap = await getDocs(collection(db, 'orders'));
    const fetchedOrders: any[] = [];
    ordersSnap.forEach((docSnap) => {
      fetchedOrders.push({ id: docSnap.id, ...docSnap.data() });
    });
    
    // Apply newer orders on top of baseInv
    const result = recalculateInventoryFromOrders(fetchedOrders, baseInv, lastUpdatedMs);
    const inv = result.inv;
    
    // Merge history
    const mergedHistory = [...result.history, ...history];
    
    saveInventory(inv);
    saveInventoryHistory(mergedHistory);
    
    return inv;
  } catch (err) {`
);

// 2. Update recalculateInventoryFromOrders signature and init
code = code.replace(
  `export const recalculateInventoryFromOrders = (orders: any[]) => {`,
  `export const recalculateInventoryFromOrders = (orders: any[], baseInv?: any, limitTimeMsOverride?: number) => {`
);

code = code.replace(
  `const inv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));`,
  `const inv = baseInv ? JSON.parse(JSON.stringify(baseInv)) : JSON.parse(JSON.stringify(INITIAL_INVENTORY));`
);

// 3. Update limitTimeMs
code = code.replace(
  `const limitTimeMs = new Date('2026-07-01T00:00:00').getTime();\n    if (orderTimeMs < limitTimeMs) return;`,
  `const limitTimeMs = limitTimeMsOverride !== undefined ? limitTimeMsOverride : new Date('2026-07-01T00:00:00').getTime();\n    if (orderTimeMs <= limitTimeMs) return;`
);

// 4. Update the actualCat assignment bug
code = code.replace(
  /const actualCat1 = \(cat === 'combo' && comboId === 'mirror_combo'\) \? 'mirror' : \(cat === 'combo' \? 'clip-1' : cat\);/g,
  `const actualCat1 = cat; // For combo products, cat already correctly holds clip-1 or clip-2 or mirror`
);

code = code.replace(
  /const actualCat2 = comboId === 'mirror_combo' \? 'mirror' : \(cat === 'combo' \? 'clip-1' : cat\);/g,
  `const actualCat2 = comboId === 'mirror_combo' ? 'mirror' : cat; // For combo products, cat already holds the base clip type`
);


fs.writeFileSync('src/lib/inventory.ts', code);
console.log('Patched successfully');
