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

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = () => {
      if (auth.currentUser == null) {
        // No user is signed in, redirect to the login page
        navigate("/");
      } else {
        fetchRides();
      }
    };

    const fetchRides = async () => {
      try {
        const db = getFirestore();
        const ridesCollection = collection(db, "routes");
        const rideSnapshot = await getDocs(ridesCollection);
        const ridesList = rideSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(ridesList);
        setRides(ridesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rides:", error);
        setLoading(false);
      }
    };
    unsubscribe();
  }, []);
  return loading ? (
    <InfinitySpin className="loader" color="black" />
  ) : (
    <div>
      <Navbar />
      {console.log(rides[0]["title"])}
      <RouteList initialRoute={rides} />
    </div>
  );
}
