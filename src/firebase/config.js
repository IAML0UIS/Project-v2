// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARys7Y7FoM1CaMpJ1elTf0L_RTo6t5rhg",
  authDomain: "vitalsave-a8313.firebaseapp.com",
  projectId: "vitalsave-a8313",
  storageBucket: "vitalsave-a8313.appspot.com",
  messagingSenderId: "111087257983",
  appId: "1:111087257983:web:2982e1cffee95bad05324a"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth( firebaseApp );

export const firebaseBD = getFirestore( firebaseApp );
