import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ToastComponent = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`toast align-items-center text-white bg-${type} border-0 show mb-3`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ToastComponent;