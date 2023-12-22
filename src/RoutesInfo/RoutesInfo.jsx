import React, { useState } from "react";
import "./RoutesInfo.css";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, dbRef } from "../firebaseConfig";

const RouteInfo = ({ initialRoutes }) => {
  const [routes, setRoutes] = useState(initialRoutes || []);
  console.log(auth.currentUser.displayName);

  return (
    <div className="routes-container">
      {routes
        .filter((routes) => routes.driver === auth.currentUser.displayName)
        .map((routes) => (
          <div className="route-card">
            <div className="route-info">
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
                <b>Time:</b> {routes.time}
              </p>
              <p>
                <b>State:</b> {routes.state}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RouteInfo;
