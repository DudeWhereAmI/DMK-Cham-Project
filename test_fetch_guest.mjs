import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "gen-lang-client-0149031439",
  "appId": "1:1053325771454:web:0c86a8fae3721202e2d4ef",
  "apiKey": "AIzaSyD1Zr1s8_w95aqRNOWH__MPTkFx_Ixxdw0",
  "authDomain": "gen-lang-client-0149031439.firebaseapp.com",
  "storageBucket": "gen-lang-client-0149031439.firebasestorage.app",
  "messagingSenderId": "1053325771454",
  "measurementId": "G-6V71DS7F59",
  "databaseId": "ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d",
  "firestoreDatabaseId": "ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function test() {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    console.log("admin/inventory exists?", docSnap.exists());
    
    let lastUpdatedMs = new Date('2026-07-01T00:00:00').getTime();
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("last updated:", data.updatedAt);
      if (data.updatedAt) {
        lastUpdatedMs = new Date(data.updatedAt).getTime();
      }
    }

    const q = query(collection(db, 'orders'), where('createdAt', '>=', Timestamp.fromMillis(lastUpdatedMs)));
    const ordersSnap = await getDocs(q);
    console.log("orders count:", ordersSnap.size);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
