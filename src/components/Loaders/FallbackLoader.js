import React from "react";
import "./FallbackLoader.css";

function FallbackLoader({ title = "" }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{title}</p>
    </div>
  );
}

export default FallbackLoader;
