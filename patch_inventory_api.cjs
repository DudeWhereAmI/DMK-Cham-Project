const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

const oldCode = `    const docRef = doc(db, 'admin', 'inventory');
    await setDoc(docRef, {
      products: inv.products,
      charms: inv.charms,
      history: history || getInventoryHistory(),
      updatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    if (err.code !== 'permission-denied') {
      console.warn("Failed to save inventory to Firestore:", err);
      throw err;
    }
  }`;

const newCode = `    const docRef = doc(db, 'admin', 'inventory');
    await setDoc(docRef, {
      products: inv.products,
      charms: inv.charms,
      history: history || getInventoryHistory(),
      updatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      // Fallback: Use backend API to update inventory since guest doesn't have write access
      try {
        await fetch('/api/update-inventory-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            newInventory: inv,
            history: history || getInventoryHistory()
          })
        });
      } catch (backendErr) {
        console.warn("Backend inventory update also failed:", backendErr);
      }
    } else {
      console.warn("Failed to save inventory to Firestore:", err);
      throw err;
    }
  }`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/lib/inventory.ts', code);
console.log("Patched inventory.ts");
