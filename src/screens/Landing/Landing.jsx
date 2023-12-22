import React, { useState, useEffect } from "react";
import "./landing.css";
import Navbar from "../../NavBar/Navbar";
import RouteList from "../../RouteList/RouteList";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { dbRef } from "../../firebaseConfig";

export default function Landing() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  console.log(rides);

  const decline = async (requestId) => {
    try {
      const requestRef = doc(dbRef, "requests", requestId);
      const docSnap = await getDoc(requestRef);

      if (docSnap.exists()) {
        const requestData = docSnap.data(); // Use the .data() method to access fields
        const docID = requestData.docID;
        const user = requestData.user;
        // Perform deletion
        await deleteDoc(requestRef);

        const routeRef = doc(dbRef, "routes", docID);
        // Removing 'user' from the 'riders' array
        await updateDoc(routeRef, {
          riders: arrayRemove(user),
          seats: increment(1),
        });
      } else {
        console.log("No such document!");
      }

      console.log("Request declined");
    } catch (error) {
      console.error("Error updating request: ", error);
    }
  };

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
        const currentTime = new Date();

        let ridesList = rideSnapshot.docs.map((doc) => {
          const firestoreTime = doc.data().time.toDate();
          return {
            id: doc.id,
            ...doc.data(),
            time: firestoreTime,
            differenceInHours: (firestoreTime - currentTime) / (1000 * 60 * 60), // Difference in hours
          };
        });
        // ridesList1: Rides more than 8 hours away and scheduled for 7:30 AM
        let ridesList0 = ridesList.filter((ride) => {
          const isSevenThirtyAM =
            ride.time.getHours() === 7 && ride.time.getMinutes() === 30;
          return ride.driveremail == auth.currentUser.email;
        });
        let ridesList1 = ridesList0.filter((ride) => {
          const isSevenThirtyAM =
            ride.time.getHours() === 7 && ride.time.getMinutes() === 30;
          return (
            ride.differenceInHours > 8 &&
            isSevenThirtyAM &&
            ride.driveremail == auth.currentUser.email
          );
        });

        let ridesList2 = ridesList0.filter((ride) => {
          const isFiveThirtyPM =
            ride.time.getHours() === 17 && ride.time.getMinutes() === 30;
          return ride.differenceInHours > 1 && isFiveThirtyPM;
        });

        let declinedList1 = ridesList0.filter((ride) => {
          const isFiveThirtyPM =
            ride.time.getHours() === 17 && ride.time.getMinutes() === 30;
          return ride.differenceInHours < 1 && isFiveThirtyPM;
        });

        let declinedList2 = ridesList0.filter((ride) => {
          const isSevenThirtyAM =
            ride.time.getHours() === 7 && ride.time.getMinutes() === 30;
          return ride.differenceInHours < 8 && isSevenThirtyAM;
        });
        console.log("ridesList0");
        console.log(ridesList0);
        let combinedRidesList = ridesList1.concat(ridesList2);
        let combinedDeclinedList = declinedList1.concat(declinedList2);
        // Decline each ride in ridesList1
        console.log("combinedDeclinedList");
        console.log(combinedDeclinedList);
        combinedDeclinedList.forEach((ride) => {
          console.log("ride");
          console.log(ride);
          decline(ride.id);
        });

        // Update the local state with rides that are not 8 hours later
        setRides(combinedRidesList);
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
