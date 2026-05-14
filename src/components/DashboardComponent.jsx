import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FeaturedCompaniesComponent from "./FeaturedCompanyComponent";
import {
  FiSearch,
  FiPlusCircle,
  FiBriefcase,
} from "react-icons/fi";

export default function DashboardComponent() {
  const [showFeatured, setShowFeatured] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("applications") || "[]");
      setApplications(Array.isArray(stored) ? stored : []);
    } catch (e) {
      console.error("Error loading applications", e);
      setApplications([]);
    }
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <NavbarComponent />
      
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-7">
            <h1 className="fw-bold display-6 mb-2">JobHub Dashboard</h1>
            <p className="text-muted lead">Manage your career and track your progress.</p>
          </div>
          <div className="col-md-5 text-md-end">
            <Link to="/jobs" className="btn btn-primary btn-lg rounded-pill px-4 me-2 shadow-sm">
              <FiSearch className="me-2" /> Find Jobs
            </Link>
            <Link to="/post_job" className="btn btn-outline-dark btn-lg rounded-pill px-4 shadow-sm">
              <FiPlusCircle className="me-2" /> Post Job
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {/* Recent Applications Column */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Applications</h5>
              <button 
                className="btn btn-sm btn-link text-decoration-none text-primary fw-bold"
                onClick={() => setShowFeatured(!showFeatured)}
              >
                {showFeatured ? "Hide Companies" : "Featured Companies"}
              </button>
            </div>

            {showFeatured && (
              <div className="mb-4">
                <FeaturedCompaniesComponent />
              </div>
            )}

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-4">
                  {applications.length > 0 ? (
                    applications.slice(0, 5).map((app, index) => (
                      <li key={index} className="list-group-item p-4 d-flex justify-content-between align-items-center border-0 border-bottom">
                        <div>
                          <h6 className="fw-bold mb-1">{app.title}</h6>
                          <small className="text-muted">
                            Applied: {new Date(app.applied_at).toLocaleDateString()}
                          </small>
                        </div>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          Submitted
                        </span>
                      </li>
                    ))
                  ) : (
                    <div className="p-5 text-center text-muted">
                      <FiBriefcase size={30} className="mb-2" />
                      <p>No applications yet.</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Column (Simplified) */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 bg-primary text-white p-2">
              <div className="card-body">
                <h5 className="fw-bold">Profile Status</h5>
                <div className="progress bg-white bg-opacity-25 my-3" style={{ height: "8px" }}>
                  <div className="progress-bar bg-white" style={{ width: "80%" }}></div>
                </div>
                <small className="opacity-75">Your profile is looking great!</small>
              </div>
            </div>
            {/* The Quick Links div was removed from here */}
          </div>
        </div>
      </div>
    </div>
  );
}