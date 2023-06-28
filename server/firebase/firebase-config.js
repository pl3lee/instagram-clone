// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuDe3vN6rQd7R62A1-f0gXZS9dxUyURhU",
  authDomain: "instagram-clone-8545f.firebaseapp.com",
  projectId: "instagram-clone-8545f",
  storageBucket: "instagram-clone-8545f.appspot.com",
  messagingSenderId: "729802950829",
  appId: "1:729802950829:web:8a07a232993c805e26de24",
  measurementId: "G-B9KQEDBJDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)