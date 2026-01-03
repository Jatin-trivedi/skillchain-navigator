import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOQmJvwUrTuC2hpxFRbt-r5k7r_FJF7Gs",
  authDomain: "issuer-student-portal.firebaseapp.com",
  projectId: "issuer-student-portal",
  storageBucket: "issuer-student-portal.firebasestorage.app",
  messagingSenderId: "914142148898",
  appId: "1:914142148898:web:a16c2ad6621de8de508d7b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
