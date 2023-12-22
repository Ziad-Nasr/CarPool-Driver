import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import "./Rides.css";
import RouteInfo from "../RoutesInfo/RoutesInfo";

const Rides = () => {
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
        const ridesCollection = collection(db, "routes");
        const usingQuery = query(
          ridesCollection,
          where("driveremail", "==", auth.currentUser.email)
        );
        const rideSnapshot = await getDocs(usingQuery);
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
      <RouteInfo initialRoutes={rides} />
    </div>
  );
};

export default Rides;
