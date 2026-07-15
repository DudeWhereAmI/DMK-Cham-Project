const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const importAdmin = `import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
`;
serverCode = serverCode.replace('import dotenv from "dotenv";', importAdmin + 'import dotenv from "dotenv";');

const initAdmin = `
let adminDb = null;
try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const serviceAccount = {
      projectId: "gen-lang-client-0149031439",
      clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\\n/g, '\\n'),
    };
    const adminApp = initializeApp({
      credential: cert(serviceAccount)
    });
    adminDb = getFirestore(adminApp);
    adminDb.settings({ databaseId: 'ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d' });
    console.log("Firebase Admin initialized for inventory updates");
  }
} catch (err) {
  console.error("Failed to initialize Firebase Admin:", err);
}
`;

serverCode = serverCode.replace('async function startServer() {', initAdmin + '\nasync function startServer() {');

const apiEndpoint = `
  // API route to update inventory as admin
  app.post("/api/update-inventory-admin", async (req, res) => {
    try {
      if (!adminDb) {
        return res.status(500).json({ error: "Admin DB not initialized" });
      }
      const { newInventory, historyLog } = req.body;
      if (!newInventory) {
        return res.status(400).json({ error: "Missing newInventory" });
      }
      const docRef = adminDb.collection('admin').doc('inventory');
      
      // We do a merge true to safely update
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
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Failed to update inventory as admin:", error);
      return res.status(500).json({ error: "Failed to update inventory" });
    }
  });
`;

serverCode = serverCode.replace('  // API route to send email', apiEndpoint + '\n  // API route to send email');

fs.writeFileSync('server.ts', serverCode);
console.log("Patched server.ts");
