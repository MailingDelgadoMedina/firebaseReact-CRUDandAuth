import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [postTxt, setPostTxt] = useState("");
  const navigate = useNavigate();
  const postCollection = collection(db, "posts");

  //function Create doc
  const createPost = async () => {
    await addDoc(postCollection, {
      title,
      postTxt,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
    // window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <div className="createPost">
        <div className="cpContainer">
          <h1 className="h1">Create Post</h1>
          <div className="inputGp ">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="title"
              placeholder="Title"
              type="text"
            />
          </div>
          <div className="inputGp">
            <textarea
              onChange={(e) => {
                setPostTxt(e.target.value);
              }}
              name="posts"
              placeholder="Post ..."
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <button onClick={createPost}>Post</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreatePost;
