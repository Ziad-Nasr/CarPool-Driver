import React, { useState } from "react";
import "./RoutesInfo.css";

import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, dbRef } from "../firebaseConfig";

const RouteInfo = ({ initialRoutes }) => {
  const [routes, setRoutes] = useState(initialRoutes || []);
  console.log(auth.currentUser.displayName);

  const run = async (document) => {
    try {
      const db = getFirestore();
      const rideRef = doc(db, "routes", document);
      await updateDoc(rideRef, { state: "running" });
      setRoutes(
        routes.map((route) => {
          if (route.id === document) {
            return { ...route, state: "running" };
          }
          return route;
        })
      );
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  const done = async (document) => {
    try {
      const db = getFirestore();
      const rideRef = doc(db, "routes", document);
      await updateDoc(rideRef, { state: "completed" });
      setRoutes(
        routes.map((route) => {
          if (route.id === document) {
            return { ...route, state: "completed" };
          }
          return route;
        })
      );
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  return (
    <div className="rcontainer">
      {routes
        .filter((routes) => routes.driver === auth.currentUser.displayName)
        .map((routes) => (
          <div className="rcard">
            <div className="rinfo">
              <p>
                <b>Title:</b> {routes.title}
              </p>
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
                  ? new Date(routes.time.toDate()).toLocaleTimeString()
                  : "Loading..."}
              </p>
              <p>
                <b>State:</b> {routes.state}
              </p>
              <div className="ractions">
                {routes.state !== "completed" && routes.state !== "running" && (
                  <button className="run-btn" onClick={() => run(routes.id)}>
                    Running
                  </button>
                )}
              </div>
              <div className="ractions">
                {routes.state !== "completed" && (
                  <button className="cmp-btn" onClick={() => done(routes.id)}>
                    Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RouteInfo;
