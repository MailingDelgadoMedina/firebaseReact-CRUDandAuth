import React, { useEffect, useState } from "react";
import "../App.css";
//import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, useAuth, upload } from "../firebase";
import { deleteUser } from "firebase/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Profile() {
  const currentUser = useAuth();
  const [myMessage, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagen, setImagen] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );

  const handleChange = (e) => {
    const targetFiles = e.target.files[0];
    if (targetFiles) {
      setImagen(targetFiles);
    }
  };

  const handleClick = () => {
    upload(imagen, currentUser, setLoading);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const deleteU = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        window.location.reload();
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <img src={photoURL} alt="Avatar" className="avatar" />
        <h1>{currentUser?.displayName}</h1>
        <h3>{currentUser?.email}</h3>
      </div>
      <div className="form">
        <input type="file" onChange={handleChange} />

        <button disabled={loading} onClick={handleClick}>
          Upload
        </button>

        <button onClick={deleteU}>Delete</button>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
