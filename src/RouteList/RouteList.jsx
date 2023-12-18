import React from "react";
import "./RouteList.css";

import { doc, updateDoc } from "firebase/firestore";
import { dbRef } from "../firebaseConfig";

const RouteList = ({ routes }) => {
  // const routes = [
  //   {
  //     title: "ziad",
  //     source: "henak",
  //     id: 1,
  //     destination: "City A",
  //     departure: "10:00 AM",
  //     seats: 3,
  //   },
  //   {
  //     title: "ziad",
  //     source: "henak",
  //     id: 1,
  //     destination: "City A",
  //     departure: "10:00 AM",
  //     seats: 3,
  //   },
  //   {
  //     title: "ziad",
  //     source: "henak",
  //     id: 1,
  //     destination: "City A",
  //     departure: "10:00 AM",
  //     seats: 3,
  //   },
  //   {
  //     title: "ziad",
  //     source: "henak",
  //     id: 1,
  //     destination: "City A",
  //     departure: "10:00 AM",
  //     seats: 3,
  //   },
  //   {
  //     title: "ziad",
  //     source: "henak",
  //     id: 1,
  //     destination: "City A",
  //     departure: "10:00 AM",
  //     seats: 3,
  //   },
  // ... other routes
  // ];
  console.log(routes);
  const approve = (async) => {
    const requestRef = doc(dbRef, "requested", "LA");
    console.log("approved");
  };

  const decline = () => {
    console.log("declined");
  };

  return (
    <div className="routes-container">
      {routes.map((routes) => (
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
              <b>Departure:</b> {routes.time}
            </p>
            <p>
              <b>user:</b> {routes.name}
            </p>
            <div className="route-actions">
              <button className="confirm-btn" onClick={approve}>
                Confirm
              </button>
              <button className="decline-btn" onClick={decline}>
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
