const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

const target = `export const fetchInventoryFromFirestore = async () => {
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
    // If getting admin doc or anything else entirely fails, return initial inventory
    return JSON.parse(JSON.stringify(INITIAL_INVENTORY));
  }
};`;

const replacement = `const parseFirestoreResponse = (fields: any): any => {
  if (!fields) return null;
  const res: any = {};
  for (const key in fields) {
    if (fields[key].integerValue !== undefined) {
      res[key] = parseInt(fields[key].integerValue, 10);
    } else if (fields[key].mapValue) {
      res[key] = parseFirestoreResponse(fields[key].mapValue.fields);
    }
  }
  return res;
};

export const fetchInventoryFromFirestore = async () => {
  let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
  let history: any[] = [];
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    
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
    console.warn("Failed to fetch inventory via Firebase SDK, attempting REST API fallback...", err);
    try {
      const res = await fetch("https://firestore.googleapis.com/v1/projects/gen-lang-client-0149031439/databases/ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d/documents/admin/inventory");
      if (res.ok) {
        const data = await res.json();
        if (data.fields) {
          const products = parseFirestoreResponse(data.fields.products?.mapValue?.fields);
          const charms = parseFirestoreResponse(data.fields.charms?.mapValue?.fields);
          if (products) baseInv.products = products;
          if (charms) baseInv.charms = charms;
          
          saveInventory(baseInv);
          // Note: we skip history array parsing here since it's complex and not needed for basic checkout UI
          return baseInv;
        }
      }
    } catch(restErr) {
      console.warn("REST API fallback also failed:", restErr);
    }
    
    // If EVERYTHING fails, at least save the INITIAL_INVENTORY so we don't have nulls,
    // and components can render something.
    saveInventory(baseInv);
    return baseInv;
  }
};`;

code = code.replace(target, replacement);

fs.writeFileSync('src/lib/inventory.ts', code);
console.log("Patched fetchInventoryFromFirestore with REST API fallback");
