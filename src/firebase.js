
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvfp2GPEMm--Qs7tJ4BRfLD--xGlYxrz4",
    authDomain: "final405project.firebaseapp.com",
    projectId: "final405project",
    storageBucket: "final405project.appspot.com",
    messagingSenderId: "288216182892",
    appId: "1:288216182892:web:4dbdaa6ce288d4c9ea2849",
    
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
