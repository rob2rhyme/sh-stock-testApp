// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcWVxdDe3BJPaTzBRCZdfraiTF_2p-L38",
  authDomain: "smokers-haven-inventory.firebaseapp.com",
  projectId: "smokers-haven-inventory",
  storageBucket: "smokers-haven-inventory.firebasestorage.app",
  messagingSenderId: "93729219083",
  appId: "1:93729219083:web:d41d5d6758ca1a32dcdd0e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
