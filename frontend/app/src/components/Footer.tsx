import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // <footer classNameName="text-gray-600 body-font">ASS .inc</footer>
    <ul style={{ listStyleType: "none" }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/LocationPosts">LocationPosts</Link>
      </li>
    </ul>
  );
}

export default Footer;
