// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Deine Firebase-Konfiguration (aus der Firebase Console kopieren)
const firebaseConfig = {
  apiKey: "AIzaSyAfCwcuCgl1mX6SYi9JekWm2lCsZSWaQTs",
  authDomain: "thinknestdb.firebaseapp.com",
  projectId: "thinknestdb",
  storageBucket: "thinknestdb.firebasestorage.app",
  messagingSenderId: "115370648290",
  appId: "1:115370648290:web:17edf4910d318165c734bb",
  measurementId: "G-QMGY01E2K4"
};

// Prüfen, ob Firebase bereits initialisiert ist (wichtig für Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
//const analystics = getAnalytics(app);

export { auth };
