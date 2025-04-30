const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 🔐 Replace with your real service account file
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Folder containing the cleaned, flat product arrays
const dataDir = path.join(__dirname, '../src/data');

const importData = async () => {
  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const rawData = fs.readFileSync(filePath, 'utf8');
    const items = JSON.parse(rawData);

    if (!Array.isArray(items)) {
      console.warn(`❌ Skipping ${file}: Not a valid array.`);
      continue;
    }

    for (const item of items) {
      if (!item.flavor || !item.category) {
        console.warn(`⚠️ Skipping item with missing fields in ${file}:`, item);
        continue;
      }

      await db.collection('products').add(item);
    }

    console.log(`✅ Imported ${items.length} items from ${file}`);
  }

  console.log('🎉 All files imported successfully.');
};

importData().catch((err) => {
  console.error('❌ Import failed:', err);
});

// run this command to import data: node scripts/import-to-firestore.js
