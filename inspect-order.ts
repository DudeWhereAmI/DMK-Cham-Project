import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp();
const db = getFirestore(app, 'ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d');

async function main() {
  const orderId = 't7l1wOPeXHyGvzjQHbmL';
  const orderRef = db.collection('orders').doc(orderId);
  const snap = await orderRef.get();
  if (snap.exists) {
    console.log('ORDER DATA SUCCESS:');
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log('Order not found in Firestore.');
  }
}

main().catch(console.error);
