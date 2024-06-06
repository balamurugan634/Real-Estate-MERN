// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import dotenv from 'dotenv'
// dotenv.config({path:'./.env'})
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyA0aFHZovMtbsGiZvsug_xg3irHAuMCW5c",
  authDomain: "mern-estate-87cbc.firebaseapp.com",
  projectId: "mern-estate-87cbc",
  storageBucket: "mern-estate-87cbc.appspot.com",
  messagingSenderId: "85728284907",
  appId: "1:85728284907:web:842e15930011e7be95aeae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);