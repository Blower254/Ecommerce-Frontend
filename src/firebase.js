// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import dotenv from 'dotenv';
import { getAuth } from "firebase/auth";
//import { getStorage } from "firebase/storage";

//dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKECT,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyDrrkTETQKb_XUlK4H8ILjVj7pklFGCQEA",
  authDomain: "ecommerce-base-18d74.firebaseapp.com",
  projectId: "ecommerce-base-18d74",
  storageBucket: "ecommerce-base-18d74.appspot.com",
  messagingSenderId: "1059361042590",
  appId: "1:1059361042590:web:01deabb29d2c4b3cc70b8f",
  measurementId: "G-HN6B9VZ21D"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);


export default app;