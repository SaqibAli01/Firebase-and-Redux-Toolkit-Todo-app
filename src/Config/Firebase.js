// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCm-v9RCCp9mdHGSjSZDICvOXkdXGs48T4",
    authDomain: "mytodo-d63b4.firebaseapp.com",
    projectId: "mytodo-d63b4",
    storageBucket: "mytodo-d63b4.appspot.com",
    messagingSenderId: "1069567226494",
    appId: "1:1069567226494:web:79a087254c1f89db125e2f"
  };



// Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);
 export const db = getFirestore(firebaseApp);
// const analytics = getAnalytics(app);