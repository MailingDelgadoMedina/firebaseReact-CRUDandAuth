import React from "react";
import Navbar from "../components/Navbar";

function Blog() {
  return (
    <>
      <div className="createPost">
        <div className="cpContainer">
          <h1 className="h1">Create Post</h1>
          <div className="inputGp">
            <input placeholder="Title" type="text" />
          </div>
          <div className="inputGp">
            <textarea
              name="posts"
              placeholder="Post ..."
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <button>Post</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
