import React from "react";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary  vh-30">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          JobHub Kenya
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarcollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarcollapse">
          {/* Left Side Links (Home and Post) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/get_job">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post_job">
                Post a Job
              </Link>
            </li>
          </ul>

          {/* Right Side Links (Login and Signup) */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link key="nav-login-right-01" className="nav-link" to="/">
                🔑 Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-light btn-sm ms-lg-2"
                to="/signup"
              >
                🔍 Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
