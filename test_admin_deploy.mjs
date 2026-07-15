import admin from 'firebase-admin';
import fs from 'fs';

// Init admin
admin.initializeApp({
  projectId: "gen-lang-client-0149031439"
});

const rules = fs.readFileSync('firestore.rules', 'utf8');

async function test() {
  try {
    const db = admin.firestore();
    db.settings({ databaseId: 'ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d' });
    
    // Deploying via REST API? No, firebase-admin doesn't deploy rules.
    console.log("We can't deploy via admin easily");
  } catch(err) {
    console.log(err);
  }
}
test();
