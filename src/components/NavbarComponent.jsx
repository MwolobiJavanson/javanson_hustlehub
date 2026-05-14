import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiPlusCircle, FiUserPlus, FiLogIn, FiLogOut } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarComponent() {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const userString = localStorage.getItem("user");
  const isLoggedIn = !!userString;
  const user = isLoggedIn ? JSON.parse(userString) : {};

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <div className="bg-primary rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <FiBriefcase size={18} className="text-white" />
          </div>
          <span className="fs-4 tracking-tight">JobHub</span>
        </Link>

        {/* Desktop Links (No Hamburger) */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/jobs" className="nav-link text-white-50 hover:text-white d-flex align-items-center gap-1">
            <FiBriefcase /> <span className="d-none d-md-inline">Browse Jobs</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/post_job" className="btn btn-outline-primary rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                <FiPlusCircle /> <span>Post a Job</span>
              </Link>
              
              <div className="vr mx-2 text-white-50" style={{ height: '20px' }}></div>
              
              <span className="text-white small d-none d-lg-inline me-2">Hi, {user.username}</span>
              
              <button 
                onClick={handleLogout}
                className="btn btn-danger btn-sm rounded-pill px-3"
              >
                <FiLogOut className="me-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link text-white-50 hover:text-white d-flex align-items-center gap-1">
                <FiLogIn /> Login
              </Link>
              <Link to="/signup" className="btn btn-primary rounded-pill px-4 fw-bold">
                <FiUserPlus className="me-1" /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;