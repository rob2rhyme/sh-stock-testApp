const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ File that contains a flat array of products
const fileName = 'pillow-talk-40k.json';
const filePath = path.join(__dirname, '../PillowTalk-40k.json');

const importFlatArray = async () => {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  const rawData = fs.readFileSync(filePath, 'utf8');
  const items = JSON.parse(rawData); // already an array

  for (const product of items) {
    await db.collection('products').add({
      ...product,
      categoryOrder: product.category.toLowerCase(), // optional UI sort field
    });
  }

  console.log(`✅ Imported ${items.length} products from ${fileName}`);
};

importFlatArray().catch((err) => {
  console.error('❌ Import failed:', err);
});

// run this command to import data: node scripts/import-single-file.js