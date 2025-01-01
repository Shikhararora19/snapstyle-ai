// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCQ64uXedVxMMPpH8NJDToPuYeIKyeOJY",
  authDomain: "snapstyle-ec7b3.firebaseapp.com",
  projectId: "snapstyle-ec7b3",
  storageBucket: "snapstyle-ec7b3.firebasestorage.app",
  messagingSenderId: "446440237010",
  appId: "1:446440237010:web:e6a551da0a7b959cf34a0b",
  measurementId: "G-2JJGNCM4YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
