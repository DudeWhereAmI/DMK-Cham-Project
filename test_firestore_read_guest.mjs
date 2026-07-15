import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "gen-lang-client-0149031439",
  "apiKey": "AIzaSyD1Zr1s8_w95aqRNOWH__MPTkFx_Ixxdw0",
  "databaseId": "ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.databaseId);

async function test() {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const snap = await getDoc(docRef);
    console.log("Guest getDoc admin/inventory: Success, exists:", snap.exists());
  } catch(err) {
    console.log("Guest getDoc admin/inventory failed:", err.code, err.message);
  }
  process.exit(0);
}
test();
