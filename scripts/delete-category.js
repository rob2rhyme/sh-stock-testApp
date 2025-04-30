const admin = require('firebase-admin');
const { FieldPath } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const deleteUncategorized = async () => {
  const snapshot = await db
    .collection('products')
    .where('category', '==', null) // only works for missing fields
    .get();

  if (snapshot.empty) {
    console.log('⚠️ No uncategorized documents found.');
    return;
  }

  console.log(`⚠️ Deleting ${snapshot.size} uncategorized documents...`);

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  console.log('✅ Deletion complete.');
};

deleteUncategorized().catch((err) => {
  console.error('❌ Error deleting uncategorized docs:', err);
});
