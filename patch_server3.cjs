const fs = require('fs');
let serverCode = fs.readFileSync('server.ts', 'utf8');

const logic = `
// Helper to normalize element string
const normalizeElement = (s) => {
  if (!s) return s;
  s = s.toUpperCase();
  if (s.includes('KIM')) return 'KIM';
  if (s.includes('THỦY') || s.includes('THUY')) return 'THUY';
  if (s.includes('HỎA') || s.includes('HOA')) return 'HOA';
  if (s.includes('MỘC') || s.includes('MOC')) return 'MOC';
  if (s.includes('THỔ') || s.includes('THO')) return 'THO';
  return s;
};

async function decrementInventoryFromOrder(orderId, items) {
  if (!adminDb) return;
  try {
    const docRef = adminDb.collection('admin').doc('inventory');
    await adminDb.runTransaction(async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists) return;
      const inv = docSnap.data();
      let products = inv.products || {};
      let historyLogs = [];

      items.forEach(item => {
        const qty = item.quantity || 1;
        const cat = item.product?.category;
        if (!cat) return;
        const { element, partnerElement } = item.customization || {};
        let comboId = item.customization?.comboId;
        if (partnerElement && !comboId) comboId = 'mirror_combo';
        
        const normEl = normalizeElement(element);
        const normPartnerEl = normalizeElement(partnerElement);

        const actualCat1 = (cat === 'combo' && comboId === 'mirror_combo') ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);
        if (products[actualCat1] && products[actualCat1][normEl] !== undefined) {
          products[actualCat1][normEl] = Math.max(0, products[actualCat1][normEl] - qty);
          historyLogs.push({ category: actualCat1, item: normEl, qty, type: 'product' });
        }
        
        if (normPartnerEl) {
          const actualCat2 = comboId === 'mirror_combo' ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);
          if (products[actualCat2] && products[actualCat2][normPartnerEl] !== undefined) {
            products[actualCat2][normPartnerEl] = Math.max(0, products[actualCat2][normPartnerEl] - qty);
            historyLogs.push({ category: actualCat2, item: normPartnerEl, qty, type: 'product' });
          }
        }
        
        // charms
        const charmIds = [];
        if (item.customization?.selectedZodiacCharmId) charmIds.push(item.customization.selectedZodiacCharmId);
        if (item.customization?.selectedZodiacCharmId2) charmIds.push(item.customization.selectedZodiacCharmId2);
        
        let charms = inv.charms || {};
        charmIds.forEach(cId => {
          if (cId && charms[cId] !== undefined) {
            charms[cId] = Math.max(0, charms[cId] - qty);
            historyLogs.push({ category: 'charm', item: cId, qty, type: 'charm' });
          }
        });
        inv.charms = charms;
      });

      if (historyLogs.length > 0) {
        let history = inv.history || [];
        history.unshift({
          id: \`LOG-\${orderId}-\${Date.now()}\`,
          orderId: orderId,
          timestamp: new Date().toISOString(),
          decrements: historyLogs
        });
        transaction.update(docRef, { products, charms: inv.charms, history, updatedAt: new Date().toISOString() });
      }
    });
    console.log(\`Successfully decremented inventory for order \${orderId}\`);
  } catch (err) {
    console.error("Failed to decrement inventory in transaction:", err);
  }
}
`;

serverCode = serverCode.replace('  app.post("/api/record-preorder-sheet"', logic + '\n  app.post("/api/record-preorder-sheet"');

const callLogic = `
      // Format private key (replace literal \\n with actual newlines if needed)
`;

serverCode = serverCode.replace(callLogic, `      decrementInventoryFromOrder(orderId, items).catch(console.error);\n` + callLogic);

fs.writeFileSync('server.ts', serverCode);
console.log("Patched server.ts with decrementInventoryFromOrder");
