import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  projectId: "gen-lang-client-0149031439"
});
const db = getFirestore(app);
db.settings({ databaseId: 'ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d' });

async function test() {
  const snap = await db.collection('orders').limit(1).get();
  console.log("Found orders:", snap.size);
}
test().catch(console.error);
