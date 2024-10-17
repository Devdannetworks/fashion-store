// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9GxaQn1ATOucd_Gmi7Ghg95FH-zVChG0",
  authDomain: "e-commerce-app-c82d8.firebaseapp.com",
  databaseURL: "https://e-commerce-app-c82d8-default-rtdb.firebaseio.com",
  projectId: "e-commerce-app-c82d8",
  storageBucket: "e-commerce-app-c82d8.appspot.com",
  messagingSenderId: "837274214312",
  appId: "1:837274214312:web:73f1cc7528c47ae4d4c79d",
  measurementId: "G-EG8Q072DTP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, auth, db, storage, functions };
