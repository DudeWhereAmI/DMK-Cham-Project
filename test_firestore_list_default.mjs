import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "gen-lang-client-0149031439",
  "apiKey": "AIzaSyD1Zr1s8_w95aqRNOWH__MPTkFx_Ixxdw0",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const q = query(collection(db, 'orders'), where('createdAt', '>=', Timestamp.fromMillis(Date.now() - 1000000)));
    const snap = await getDocs(q);
    console.log("Without auth query inventory on default: Success, size:", snap.size);
  } catch(err) {
    console.log("Without auth query inventory on default:", err.code);
  }
  process.exit(0);
}
test();
