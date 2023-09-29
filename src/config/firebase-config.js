// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE_joqdKutlRdLG3pIuQd0e9fdVsYkFZY",
  authDomain: "expense-tracker-88fa9.firebaseapp.com",
  projectId: "expense-tracker-88fa9",
  storageBucket: "expense-tracker-88fa9.appspot.com",
  messagingSenderId: "334413734159",
  appId: "1:334413734159:web:de69a308aeb94abd1d1e7a",
  measurementId: "G-5166CKH0JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);