// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBHwCbSkArL1Ef7GKDzyrU9sFF9ZaNBtOo",
  authDomain: "lab-firebase-885f2.firebaseapp.com",
  projectId: "lab-firebase-885f2",
  storageBucket: "lab-firebase-885f2.appspot.com",
  messagingSenderId: "362228509037",
  appId: "1:362228509037:web:3f2f54adb8f4774ea09264"
});

const db = getFirestore(firebaseApp);
export default db;