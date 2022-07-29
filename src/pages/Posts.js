import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth, useAuth } from "../firebase";

function Posts() {
  const currentUser = useAuth();
  const postCollection = collection(db, "posts");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollection);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPost();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      {postList.map((post) => {
        return (
          <div className="createPost">
            <div className="cpContainer">
              <h1 className="h1">{post.title}</h1>
              <div className="postTextCont">{post.postTxt}</div>
              <h4>Author: @{post.author.name}</h4>
              <div className="deletePost">
                {currentUser && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
