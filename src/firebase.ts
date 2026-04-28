import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeySWpkm2XzbLL6uLCnbS9anPMbqrAkqg",
  authDomain: "akira-investiments.firebaseapp.com",
  projectId: "akira-investiments",
  storageBucket: "akira-investiments.firebasestorage.app",
  messagingSenderId: "701654686570",
  appId: "1:701654686570:web:e3a1b225a0a8897a14a313",
  measurementId: "G-DVZM4N93DY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
