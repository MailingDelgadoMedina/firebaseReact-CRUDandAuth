// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import{getStorage, getDownloadURL, ref, uploadBytes} from "firebase/storage"
import{v4}from "uuid";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBssAbfTJkgFoe5JXVq-GuCX62EdSa4iLY",
  authDomain: "myapp-firebase-717ef.firebaseapp.com",
  projectId: "myapp-firebase-717ef",
  storageBucket: "myapp-firebase-717ef.appspot.com",
  messagingSenderId: "1043569679437",
  appId: "1:1043569679437:web:bdf139eb0a6c6b09f91004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const popUp = signInWithPopup();
const storage = getStorage(app);

export {provider, auth, popUp};


//custom Hook

export function useAuth(){
  const [currentUser, setCurrentUser]= useState();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  },[])

  return currentUser;
}

//storage 

export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, currentUser.uid + v4() );
setLoading(true);
 await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
updateProfile(currentUser,{photoURL});

  setLoading(false);
  alert("File Uploaded!!!")
}