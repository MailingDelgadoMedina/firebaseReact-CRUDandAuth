import React from "react";

function Navbar() {
  return (
    <div className="nav">
      <a href="/" className="items">
        Home
      </a>
      <a href="/profile" className="items">
        Profile
      </a>
      <a href="/blog" className="items">
        Blog
      </a>
    </div>
  );
}

export default Navbar;
