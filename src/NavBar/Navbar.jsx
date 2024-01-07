import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Navbar.css";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.warn("Logged out");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error", error);
      });
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a>
            <Link to="/signup">Home</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/signup">Add Ride</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/signup">Your Rides</Link>
          </a>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
