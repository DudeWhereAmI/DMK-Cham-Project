const fs = require('fs');
let serverCode = fs.readFileSync('server.ts', 'utf8');

const oldApi = `      // We do a merge true to safely update
      await docRef.set({
        products: newInventory.products,
        charms: newInventory.charms,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // If there's history, we can prepend it. It's better to just update the doc history or rely on client's passed history
      if (historyLog) {
         const snap = await docRef.get();
         let existingHistory = [];
         if (snap.exists) {
            existingHistory = snap.data().history || [];
         }
         existingHistory.unshift(historyLog);
         await docRef.set({ history: existingHistory }, { merge: true });
      }`;

const newApi = `      const updateData = {
        products: newInventory.products,
        charms: newInventory.charms,
        updatedAt: new Date().toISOString()
      };
      if (req.body.history) {
        updateData.history = req.body.history;
      }
      
      await docRef.set(updateData, { merge: true });`;

serverCode = serverCode.replace(oldApi, newApi);
fs.writeFileSync('server.ts', serverCode);
console.log("Patched server.ts api");
