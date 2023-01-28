import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const Public = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between  shadow bg-primary p-3">
        <Link className="text-white" to="/">
          LOGO
        </Link>
        <div className="d-flex align-items-center">
          <Link to="/login" className="btn btn-dark">
            Sign In
          </Link>
          <Link to="/register" className="btn btn-light ms-4">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="p-3">
        <Routes>
          <Route path="/" element={<h3>Public home</h3>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};
