import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCG8mGHHt1LxMuP73CRSqU_ok2WWHU88s8",
  authDomain: "reflex-game-cfdf5.firebaseapp.com",
  databaseURL: "https://reflex-game-cfdf5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "reflex-game-cfdf5",
  storageBucket: "reflex-game-cfdf5.firebasestorage.app",
  messagingSenderId: "242623165165",
  appId: "1:242623165165:web:83395e59282189f627d2e4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);