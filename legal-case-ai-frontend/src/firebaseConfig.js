// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "legalcaseai-9c00f.firebaseapp.com",
  projectId: "legalcaseai-9c00f",
  storageBucket: "legalcaseai-9c00f.firebasestorage.app",
  messagingSenderId: "1084120648951",
  appId: "1:1084120648951:web:d48bdddb03cbc4900497f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

