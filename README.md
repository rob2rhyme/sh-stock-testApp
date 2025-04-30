# Smokers Haven Inventory

A responsive inventory management system tailored for Smokers Haven, designed to streamline product tracking, monitor expiry dates, and provide stock level alerts.

---

## 🚀 Live Demo

View it at: [sh-stock-tracking.vercel.app](https://sh-stock-tracking.vercel.app)

---

🛠 Technologies Used
✅ Next.js + React 19
✅ Firebase Firestore
✅ TypeScript
✅ CSS Modules

## 🔥 Firebase Integration

This app now uses **Firebase Firestore** as its primary database.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (if needed)
3. Enable **Cloud Firestore** from the Build tab
4. Create and download a **Service Account Key**:
   - Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the file as `serviceAccountKey.json` in the root folder

5. ⚠️ Add this to `.gitignore`:

🗂 Project Structure
sh-stock-tracking/
├── public/                 # Static assets (logo, favicon, etc.)
├── src/
│   ├── components/         # Header, Footer, TabPanel
│   ├── data/               # JSON data files (local import source)
│   ├── pages/              # index.tsx and dynamic pages
│   ├── styles/             # CSS modules
│   └── utils/              # firebase.ts setup
├── scripts/                # Data import utilities
├── serviceAccountKey.json  # 🔐 (ignored) Firebase admin key
├── .gitignore
├── README.md
├── package.json
└── vercel.json
