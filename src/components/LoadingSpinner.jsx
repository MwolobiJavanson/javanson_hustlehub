import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoadingSpinner = ({ size = "md", color = "primary", text = "Loading..." }) => {
  const sizeClass = size === "sm" ? "spinner-border-sm" : size === "lg" ? "spinner-border-lg" : "";

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`spinner-border text-${color} ${sizeClass}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <span className="ms-2">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;