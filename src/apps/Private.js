import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home/Home";
import { Posts } from "../pages/Posts/Posts";
import { Profile } from "../pages/Profile/Profile";

export const Private = () => {

  return (
    <div>
      <Header />
      <div className="p-3">
        <Routes>
          <Route index='/' element={<Home/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </div>
  );
};
