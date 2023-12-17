import React, { useState, useEffect } from "react";
import "./landing.css";
import Navbar from "../../NavBar/Navbar";
import RouteList from "../../RouteList/RouteList";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";

export default function Landing() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const db = getFirestore();
        const ridesCollection = collection(db, "routes");
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

    fetchRides();
  }, []);
  return loading ? (
    <InfinitySpin className="loader" color="black" />
  ) : (
    <div>
      <Navbar />
      <RouteList />
    </div>
  );
}
