import { doc, getDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './src/lib/firebase.js';

async function test() {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    console.log("admin/inventory exists?", docSnap.exists());
    const data = docSnap.data();
    console.log("inventory data:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
