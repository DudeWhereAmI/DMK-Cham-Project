import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function main() {
  const orderId = 't7l1wOPeXHyGvzjQHbmL';
  const docRef = doc(db, 'orders', orderId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    console.log('ORDER DATA SUCCESS:');
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log('Order not found in Firestore.');
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
