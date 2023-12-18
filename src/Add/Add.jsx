import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/Navbar";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./Add.css";
import { addDoc, collection } from "firebase/firestore";
import { dbRef } from "../firebaseConfig";
const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("AM");
  const auth = getAuth();
  const [ride, setRide] = useState({
    title: "",
    from: "",
    to: "",
    time: "",
    seats: 2,
    riders: [],
    state: "available",
    // Add other fields as necessary
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch rides
        console.log("logged in");
        setLoading(false);
      } else {
        // No user is signed in, redirect to the login page
        navigate("/");
      }
    });
  }, [auth, navigate]);

  const handleradio = (e) => {
    setTime(e.target.value);
    setRide({
      ...ride,
      time: e.target.value,
      driver: auth.currentUser.displayName,
    });
  };

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbRef, "routes"), ride);
      alert("Ride added successfully!");
      setRide({
        title: "",
        from: "",
        to: "",
        time: "",
        seats: "",
        // Reset other fields
      });
    } catch (error) {
      console.error("Error adding ride: ", error);
    }
  };

  return loading ? (
    <InfinitySpin className="loader" color="black" />
  ) : (
    <div>
      <Navbar />
      <div className="add-ride-container">
        <h2>Add a New Ride</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Ride Title"
            value={ride.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            value={ride.from}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={ride.to}
            onChange={handleChange}
            required
          />
          <div className="time">
            <div>
              <label htmlFor="AM">7:30</label>
              <input
                id="AM"
                type="radio"
                name="time"
                value="7:30"
                onChange={handleradio}
                checked={ride.time === "7:30"}
                required
              />
            </div>
            <div>
              <label htmlFor="PM">5:30</label>
              <input
                id="PM"
                type="radio"
                name="time"
                value="5:30"
                onChange={handleradio}
                checked={ride.time === "5:30"}
                required
              />
            </div>
          </div>
          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            value={ride.seats}
            onChange={handleChange}
            required
            max="5"
            min="1"
          />
          {/* Add other input fields as necessary */}
          <button type="submit" className="submit">
            Add Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
