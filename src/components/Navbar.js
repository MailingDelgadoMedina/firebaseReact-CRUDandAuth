import React, { useEffect } from "react";
import { useAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  //Protected Route hook
  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="nav">
      <a href="/" className="items">
        Home
      </a>
      {currentUser && (
        <>
          <a href="/createpost" className="items">
            Create Post
          </a>
          <a href="/profile" className="items">
            Profile
          </a>
        </>
      )}
    </div>
  );
}

export default Navbar;
