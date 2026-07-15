import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  projectId: "gen-lang-client-0149031439",
  clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);
db.settings({ databaseId: 'ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d' });

async function test() {
  try {
    const docRef = db.collection('admin').doc('inventory');
    const snap = await docRef.get();
    console.log("Admin get doc:", snap.exists);
    await docRef.set({ test_admin: true }, { merge: true });
    console.log("Admin set doc success!");
  } catch(err) {
    console.log("Admin failed:", err);
  }
}
test();
