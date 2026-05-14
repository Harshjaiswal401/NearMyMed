import {
  createContext,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3o9oxIuOYb2WIGq86PQKMam_L3Khz2Ps",
  authDomain: "near-my-med.firebaseapp.com",
  projectId: "near-my-med",
  storageBucket: "near-my-med.firebasestorage.app",
  messagingSenderId: "803857186868",
  appId: "1:803857186868:web:b958e15ef89109be810a61",
  measurementId: "G-E56K8MDRGS"
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