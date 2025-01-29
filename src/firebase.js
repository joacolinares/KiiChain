import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCfDjvQz7vIBUgpbcvTXSc1Bm-YOKid_iY",
//   authDomain: "tex54-a7ef4.firebaseapp.com",
//   projectId: "tex54-a7ef4",
//   storageBucket: "tex54-a7ef4.appspot.com",
//   messagingSenderId: "111750633925",
//   appId: "1:111750633925:web:6f1de390b1669c08a153ac"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAgwl2nNf4uvb7wf9it4JPs43yJwCm1Rbg",
  authDomain: "texid-596e8.firebaseapp.com",
  projectId: "texid-596e8",
  storageBucket: "texid-596e8.appspot.com",
  messagingSenderId: "1065327659914",
  appId: "1:1065327659914:web:d568360c9a47204fa19673",
  measurementId: "G-QFNW5XXQHC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app); // Inicializar Firebase Storage
export { auth,db, storage }; // Asegúrate de exportar storage


