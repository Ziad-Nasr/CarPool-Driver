import React, { useState } from "react";
import "./RouteList.css";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, dbRef } from "../firebaseConfig";

const RouteList = ({ initialRoutes }) => {
  const [routes, setRoutes] = useState(initialRoutes || []);

  const approve = async (requestId) => {
    try {
      const requestRef = doc(dbRef, "requests", requestId);
      await deleteDoc(requestRef);
      console.log("Request approved");
    } catch (error) {
      console.error("Error updating request: ", error);
    }
    setRoutes((prevRoutes) =>
      prevRoutes.filter((route) => route.id !== requestId)
    );
  };

  const decline = async (requestId) => {
    try {
      const requestRef = doc(dbRef, "requests", requestId);

      const docSnap = await getDoc(requestRef);
      if (docSnap.exists()) {
        // Get the "user" value
        const docID =
          docSnap._document.data.value.mapValue.fields.docID.stringValue;
        const user =
          docSnap._document.data.value.mapValue.fields.user.stringValue;
        // Perform deletion
        await deleteDoc(requestRef);
        const routeRef = doc(dbRef, "routes", docID);

        // Removing 'user' from the 'riders' array
        await updateDoc(routeRef, {
          riders: arrayRemove(user),
          seats: increment(1),
        });
        // Update the local state (if needed)

        setRoutes((prevRoutes) =>
          prevRoutes.filter((route) => route.id !== requestId)
        );
      } else {
        console.log("No such document!");
      }

      console.log("Request approved");
    } catch (error) {
      console.error("Error updating request: ", error);
    }
    console.log("declined");
  };

  return (
    <div className="routes-container">
      {routes
        .filter((routes) => routes.driver === auth.currentUser.displayName)
        .map((routes) => (
          <div className="route-card">
            <div className="route-info">
              <h3>Title: {routes.title}</h3>
              {/* Assuming you have a title in your route data */}
              <p>
                <b>Source:</b> {routes.from}
              </p>
              {/* Replace with your actual source field */}
              <p>
                <b>Destination:</b> {routes.to}
              </p>
              <p>
                <b>Seats Left:</b> {routes.seats}
              </p>
              <p>
                <b>Time:</b>{" "}
                {routes.time
                  ? new Date(routes.time).toLocaleTimeString()
                  : "Loading..."}
              </p>
              <p>
                <b>user:</b> {routes.name}
              </p>
              <div className="route-actions">
                <button
                  className="confirm-btn"
                  onClick={() => approve(routes.id)}
                >
                  Confirm
                </button>
                <button
                  className="decline-btn"
                  onClick={() => decline(routes.id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RouteList;
