const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const dataDir = path.join(__dirname, '../src/data');

const importData = async () => {
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const filePath = path.join(dataDir, file);
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(rawData);
    const topLevelKey = Object.keys(parsed)[0]; // e.g., fogerPod30k
    const items = parsed[topLevelKey];

    const category = file.replace('.json', ''); // filename without extension

    for (const product of items) {
      await db.collection('products').add({
        ...product,
        category,
      });
    }

    console.log(`✅ Imported ${items.length} items from ${file}`);
  }

  console.log('🎉 All data imported successfully!');
};

importData().catch((err) => {
  console.error('❌ Import failed:', err);
});

// run this command to import data: node scripts/import-to-firestore-old-version.js
// this is for this json format {
//   "cali8k": [
//    {
//       "flavor": "Frozen Peach",
//       "store": 0,
//       "home": 0,
//       "expiryDate": "n/a"
//     },
//       {
//       "flavor": "Maxican Mint",
//       "store": 0,
//       "home": 0,
//       "expiryDate": "n/a"
//     }
      
//   ]
// }
