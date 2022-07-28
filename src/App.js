import React, { useState, useRef } from "react";
import "./App.css";
import { auth, provider } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";

function App() {
  const [user, loading, error] = useAuthState(auth); //hook #1 check if my user is logged render the information
  const emailRef = useRef("");
  const passRef = useRef("");

  const [myMessage, setMessage] = useState(""); //hook #2 render the message state

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((result) => {
        // console.log(result);
        setMessage("I am logged!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((result) => {
        // console.log(result);
        setMessage("I am logged!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const googleProvider = (e) => {
    // e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        setMessage("I am logged!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("You Logged out!");
        setMessage("You logged Out!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const resetP = () => {
    sendPasswordResetEmail(auth, emailRef.current.value);
    alert(
      `If you have an account associated with us you will receive an email reset link to  "${emailRef.current.value}".`
    );
  };

  const handleChange = () => {
    setMessage("I was checked!");
  };

  return (
    <div className="app">
      <Navbar />

      <div className="header">
        <h1>{user?.displayName}</h1>

        {!user && (
          <>
            <img
              className="avatar"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            />
          </>
        )}
        {user && <img src={user?.photoURL} alt="Avatar" className="avatar" />}

        <p>{myMessage}</p>

        {/* <input type="checkbox" onChange={handleChange}  /> */}

        {!user && (
          <>
            <input type="text" placeholder="email" ref={emailRef} />
            <input ref={passRef} type="text" placeholder="password" />
            <a className="resetP" onClick={resetP}>
              Forgot password?
            </a>
            <button onClick={signIn}>Sign in</button>
            <button onClick={register}>Register</button>

            <button onClick={googleProvider}>Google Login</button>
          </>
        )}
        {user && (
          <>
            <button onClick={logOut}>Sign Out</button>
          </>
        )}
      </div>

      <hr />

      {user && <Blog />}
    </div>
  );
}

export default App;
