import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const Auth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = () => {
      if (auth.currentUser == null) {
        // No user is signed in, redirect to the login page
        navigate("/login");
      } else {
        // No user is signed in, redirect to the login page
        navigate("/");
      }
    };

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div>
      <InfinitySpin width="200" color="black" />
    </div>
  );
};

export default Auth;