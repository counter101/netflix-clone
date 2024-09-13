import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC0UT4ycGt-IXM1Pxf1UzFyKKESBTOUkQY",
  authDomain: "netflix-clone-17353.firebaseapp.com",
  projectId: "netflix-clone-17353",
  storageBucket: "netflix-clone-17353.appspot.com",
  messagingSenderId: "565568350429",
  appId: "1:565568350429:web:685d6098d7b6260dbbd334"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name, 
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async ()=>{
  signOut(auth);
}

export {auth, db, login, signup,logout}