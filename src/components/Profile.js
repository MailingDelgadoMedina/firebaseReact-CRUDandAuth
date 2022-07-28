import React, { useEffect, useState } from "react";
import "../App.css";
//import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import { useAuth, upload } from "../firebase";
import { deleteUser } from "firebase/auth";
import Navbar from "./Navbar";

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

  const user = auth.currentUser;
  const deleteU = (e) => {
    e.preventDefault();
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container">
      <Navbar />

      <input type="file" onChange={handleChange} />

      <button disabled={loading} onClick={handleClick}>
        Upload
      </button>
    </div>
  );
}

export default Profile;