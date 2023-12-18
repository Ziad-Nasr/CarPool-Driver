import React, { useState } from "react";
import "./RouteList.css";

import { doc, updateDoc } from "firebase/firestore";
import { auth, dbRef } from "../firebaseConfig";

const RouteList = ({ initialRoutes }) => {
  const [routes, setRoutes] = useState(initialRoutes || []);
  console.log(auth.currentUser.displayName);
  const approve = async (requestId) => {
    try {
      const requestRef = doc(dbRef, "routes", requestId);
      await updateDoc(requestRef, {
        state: "approved",
      });
      console.log("Request approved");
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) =>
          route.id === requestId ? { ...route, state: "approved" } : route
        )
      ); // Add any additional actions you want to perform after approval
    } catch (error) {
      console.error("Error updating request: ", error);
    }
  };
  const decline = async (requestId) => {
    try {
      const requestRef = doc(dbRef, "routes", requestId);
      await updateDoc(requestRef, {
        state: "available",
      });
      console.log("Request approved");
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) =>
          route.id === requestId ? { ...route, state: "available" } : route
        )
      ); // Add any additional actions you want to perform after approval
    } catch (error) {
      console.error("Error updating request: ", error);
    }
    console.log("declined");
  };

  return (
    <div className="routes-container">
      {routes
        .filter(
          (routes) =>
            routes.state === "requested" &&
            routes.driver === auth.currentUser.displayName
        )
        .map((routes) => (
          <div className="route-card">
            <div className="route-info">
              <h3>Title: {routes.title}</h3>{" "}
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
                <b>Time:</b> {routes.time}
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
