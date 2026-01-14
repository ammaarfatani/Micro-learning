import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGvkqzC-n2CNFoykKRKa0MCQkoaPlYY9Q",
  authDomain: "micro-learning-151fe.firebaseapp.com",
  projectId: "micro-learning-151fe",
  storageBucket: "micro-learning-151fe.firebasestorage.app",
  messagingSenderId: "824313724960",
  appId: "1:824313724960:web:5c8bdd7b37186e1f7dfc45"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
