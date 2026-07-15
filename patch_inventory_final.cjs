const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

// Strip out orders logic from fetchInventoryFromFirestore
const fetchStart = 'export const fetchInventoryFromFirestore = async () => {';
const fetchEndStr = '    // If getting admin doc or anything else entirely fails, return initial inventory';
const newFetch = `export const fetchInventoryFromFirestore = async () => {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    
    let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    let history = [];
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      baseInv = {
        products: data.products || baseInv.products,
        charms: data.charms || baseInv.charms
      };
      if (data.history) {
        history = data.history;
      }
    }
    
    saveInventory(baseInv);
    saveInventoryHistory(history);
    return baseInv;
  } catch (err: any) {
    if (err.code !== 'permission-denied') {
      console.warn("Failed to fetch real orders for inventory calculation from Firestore:", err);
    }
`;
const firstPart = code.substring(0, code.indexOf(fetchStart));
const lastPart = code.substring(code.indexOf(fetchEndStr));
code = firstPart + newFetch + lastPart;

// Remove saveInventoryToFirestore calls from processOrderInventory and recalculateInventoryFromOrders
code = code.replace(/saveInventoryToFirestore\(inv, updatedHistory\)\.catch\(\(\) => \{\}\);/g, '');
code = code.replace(/saveInventoryToFirestore\(inv, newHistory\)\.catch\(\(\) => \{\}\);/g, '');

fs.writeFileSync('src/lib/inventory.ts', code);
console.log("Patched inventory.ts logic");
