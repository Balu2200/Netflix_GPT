// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-3Mb2uutmKU8MfcMs1SrdH4gyYRMHXiw",
  authDomain: "netflixgpt-330cf.firebaseapp.com",
  projectId: "netflixgpt-330cf",
  storageBucket: "netflixgpt-330cf.firebasestorage.app",
  messagingSenderId: "693094006923",
  appId: "1:693094006923:web:7ea0cfdc167ecabefdd48e",
  measurementId: "G-KT46KJ1HZF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
