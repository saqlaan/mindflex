import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtadbDDCX6efwn2rMROQ3tW_FpIM_ieTw",
  authDomain: "mindlex-d1481.firebaseapp.com",
  projectId: "mindlex-d1481",
  storageBucket: "mindlex-d1481.firebasestorage.app",
  messagingSenderId: "691297373888",
  appId: "1:691297373888:web:8161b065774456ec706725",
  measurementId: "G-1CRVKG8Y2P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
