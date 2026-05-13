import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogoutComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      try {
        await axios.get("https://jmwolobi.alwaysdata.net/api/logout");
      } catch (err) {
        console.error("Logout request failed", err);
      }

      navigate("/login", { replace: true });
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center p-4">
        <h1 className="h4 fw-bold mb-3">Signing out...</h1>
        <p className="text-muted">Redirecting to login page.</p>
      </div>
    </div>
  );
}
