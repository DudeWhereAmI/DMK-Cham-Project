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
    const data = snap.data();
    console.log('ORDER ID:', orderId);
    console.log('STATUS:', data.status);
    console.log('SUBTOTAL:', data.subtotal);
    console.log('TOTAL:', data.total);
    console.log('ITEMS:');
    data.items.forEach((item, idx) => {
      console.log(`\n--- Item ${idx + 1} ---`);
      console.log('Product ID:', item.product?.id);
      console.log('Product Name:', item.product?.name);
      console.log('Product Vietnamese Name:', item.product?.vietnameseName);
      console.log('Customization:', JSON.stringify(item.customization, null, 2));
      console.log('Quantity:', item.quantity);
    });
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
