import React from "react";
import "./RouteList.css";
const RouteList = (props) => {
  const routes = [
    {
      title: "ziad",
      source: "henak",
      id: 1,
      destination: "City A",
      departure: "10:00 AM",
      seats: 3,
    },
    {
      title: "ziad",
      source: "henak",
      id: 1,
      destination: "City A",
      departure: "10:00 AM",
      seats: 3,
    },
    {
      title: "ziad",
      source: "henak",
      id: 1,
      destination: "City A",
      departure: "10:00 AM",
      seats: 3,
    },
    {
      title: "ziad",
      source: "henak",
      id: 1,
      destination: "City A",
      departure: "10:00 AM",
      seats: 3,
    },
    // ... other routes
  ];

  return (
    <div className="routes-container">
      {routes.map((route) => (
        <div key={route.id} className="route-card">
          <div className="route-info">
            <h3>Title: {route.title}</h3>{" "}
            {/* Assuming you have a title in your route data */}
            <p>
              <b>Source:</b> {route.source}
            </p>{" "}
            {/* Replace with your actual source field */}
            <p>
              <b>Destination:</b> {route.destination}
            </p>
            <p>
              <b>Departure:</b> {route.departure}
            </p>
          </div>
          <div className="route-actions">
            <button className="confirm-btn">Confirm</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteList;
