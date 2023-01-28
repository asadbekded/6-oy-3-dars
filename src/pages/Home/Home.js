import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const mode = useSelector((state) => state.mode.mode);

  return (
    <div>
      <h2 style={{ color: mode ? "#fff" : "#333" }}>Home Page</h2>
    </div>
  );
};
