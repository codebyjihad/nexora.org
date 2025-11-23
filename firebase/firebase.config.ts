// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKQA2aQbmWJf1nAleSGV2hH-b_SzV-pzY",
  authDomain: "nexora-auth-f8e77.firebaseapp.com",
  projectId: "nexora-auth-f8e77",
  storageBucket: "nexora-auth-f8e77.firebasestorage.app",
  messagingSenderId: "409596788064",
  appId: "1:409596788064:web:68400788231ad2b871b205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
