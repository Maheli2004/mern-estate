// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-16dac.firebaseapp.com",
  projectId: "mern-estate-16dac",
  storageBucket: "mern-estate-16dac.appspot.com",
  messagingSenderId: "222548170787",
  appId: "1:222548170787:web:8316581292714a72633996"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);