import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJIEBuEnUjCoyuI2lCgPjejPOOd_sBIQs",
  authDomain: "rnauthvideo-6a4cf.firebaseapp.com",
  projectId: "rnauthvideo-6a4cf",
  storageBucket: "rnauthvideo-6a4cf.appspot.com",
  messagingSenderId: "41652110566",
  appId: "1:41652110566:web:e4fa2b00d95c0aec0a2727"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);