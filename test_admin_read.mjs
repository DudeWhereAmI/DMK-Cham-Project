import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
    const snap = await getDoc(docRef);
    console.log("Admin doc exists:", snap.exists());
  } catch (err) {
    console.error("Admin doc error:", err.code);
  }
}
test();
