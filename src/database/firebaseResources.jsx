// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "320420758826",
  appId: "1:320420758826:web:68dfeffe8aa9a6421e8a53",
  measurementId: "G-0E37NCB4CR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const analytics = getAnalytics(app);

export { database };
