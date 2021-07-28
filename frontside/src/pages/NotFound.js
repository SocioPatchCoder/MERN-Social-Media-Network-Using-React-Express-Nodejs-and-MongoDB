import React from "react";
import "../styles/NotFound.css"
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <div className="notfound">
      <h2 className="notfound-text">Not Found</h2>
      <p className="notfound-found">Go to Home page 
      <Link to="/" className="notfound-link">  Here </Link>
      </p>
    </div>
  );
};

export default NotFound;
