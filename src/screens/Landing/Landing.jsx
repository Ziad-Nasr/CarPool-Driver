import React, { useState, useEffect } from "react";
import "./landing.css";
import Navbar from "../../NavBar/Navbar";
import RouteList from "../../RouteList/RouteList";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  console.log(rides);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch rides
        fetchRides();
      } else {
        // No user is signed in, redirect to the login page
        navigate("/");
      }
    });

    // Define fetchRides inside useEffect
    const fetchRides = async () => {
      try {
        const db = getFirestore();
        const ridesCollection = collection(db, "requests");
        const rideSnapshot = await getDocs(ridesCollection);
        const ridesList = rideSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRides(ridesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rides:", error);
        setLoading(false);
      }
    };

    // Return the unsubscribe function to clean up the subscription
    return () => unsubscribe();
  }, [auth, navigate]);

  return loading ? (
    <InfinitySpin className="loader" color="black" />
  ) : (
    <div>
      <Navbar />
      <RouteList initialRoutes={rides} />
    </div>
  );
}
