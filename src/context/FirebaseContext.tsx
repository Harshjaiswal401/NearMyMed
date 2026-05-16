import {
  createContext,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";

  const firebaseConfig = {
  apiKey: "AIzaSyCUjFBVlwo3jlbPaqrwMR-DJ4460Fq2Ztg",
  authDomain: "near-my-med-48081.firebaseapp.com",
  projectId: "near-my-med-48081",
  storageBucket: "near-my-med-48081.firebasestorage.app",
  messagingSenderId: "817375587419",
  appId: "1:817375587419:web:3dcd96f9e43e46e013e37e",
  measurementId: "G-NL306L09DC"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirebaseContext = createContext({db});

export const FirebaseProvider = ({children,}: any) => {

    return (
        <FirebaseContext.Provider value={{ db }}>
        {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);