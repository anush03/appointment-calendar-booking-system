// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCh0Ic0DUv1aOx4PqQ7dMgHdBjerRfWJSQ",
//   authDomain: "hospital-management-syst-b7431.firebaseapp.com",
//   projectId: "hospital-management-syst-b7431",
//   storageBucket: "hospital-management-syst-b7431.appspot.com",
//   messagingSenderId: "961858910930",
//   appId: "1:961858910930:web:3ddf0d43562cfc92768b0b",
//   measurementId: "G-LMXXGWD447",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD243JKIncJt1KdIPRJ1UhCItArX44QxE4",
  authDomain: "hos-man-sys.firebaseapp.com",
  projectId: "hos-man-sys",
  storageBucket: "hos-man-sys.appspot.com",
  messagingSenderId: "616721189148",
  appId: "1:616721189148:web:dfd0d1f88729e5c93912d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
