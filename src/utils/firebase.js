// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTlRcSGlMp_WcMNQUdgRGSd6JhBRPKqrU",
  authDomain: "netflixgpt-485fb.firebaseapp.com",
  projectId: "netflixgpt-485fb",
  storageBucket: "netflixgpt-485fb.firebasestorage.app",
  messagingSenderId: "1048095667958",
  appId: "1:1048095667958:web:793390b571941cd2631ed7",
  measurementId: "G-BMKR0R5Y7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
