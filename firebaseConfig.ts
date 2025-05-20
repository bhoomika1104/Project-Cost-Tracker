// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCnImZwmOZhkxpea2CcI23fbn9rQ6e5_6I",
  authDomain: "costtracker-ac355.firebaseapp.com",
  projectId: "costtracker-ac355",
  storageBucket: "costtracker-ac355.firebasestorage.app",
  messagingSenderId: "343932567295",
  appId: "1:343932567295:web:388a6943aeef19f10b16ca",
  measurementId: "G-QEEJQ2899G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);