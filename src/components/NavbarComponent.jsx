import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
        >
          <span className="me-2">🇰🇪</span> JobHub Kenya
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarcollapse"
          aria-controls="navbarcollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarcollapse">
          {/* Left Side Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fs-6 fw-medium" to="/get_job">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item px-lg-2">
              <Link className="nav-link fs-6 fw-medium" to="/post_job">
                💼 Post a Job
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-6 fw-medium" to="/about">
                📖 About Us
              </Link>
            </li>
            <li> </li>
          </ul>

          {/* Right Side Links */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                🔑 Login
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link
                className="btn btn-light text-primary fw-bold px-4 rounded-pill shadow-sm"
                to="/signup"
              >
                ✨ Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
