import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./screens/Login/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./screens/Signup/Signup";
import Auth from "./screens/Auth/Auth";
import Add from "./Add/Add";
import Rides from "./Rides/Rides";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="colored" />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/add" element={<Add />} />
          <Route path="/rides" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
