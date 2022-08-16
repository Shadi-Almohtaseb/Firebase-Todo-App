// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "reel-ig.firebaseapp.com",
  projectId: "reel-ig",
  storageBucket: "reel-ig.appspot.com",
  messagingSenderId: "114846184311",
  appId: "1:114846184311:web:b40f7574d22daf2e5be772",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
