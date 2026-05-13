import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FeaturedCompaniesComponent from "./FeaturedCompanyComponent";
import {
  FiSearch,
  FiStar,
  FiPlusCircle,
  FiPackage,
  FiBarChart2,
} from "react-icons/fi";

export default function DashboardComponent() {
  const [showFeaturedCompanies, setShowFeaturedCompanies] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("applications") || "[]");
      setApplications(Array.isArray(stored) ? stored : []);
    } catch (e) {
      setApplications([]);
    }
  }, []);
  return (
    <div>
      <NavbarComponent />
      <div className="container-fluid min-vh-100 bg-light py-5">
        <div className="container">
          <div className="fade-in dashboard-hero">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
              <div>
                <p className="text-uppercase text-muted small mb-2">
                  Dashboard
                </p>
                <h1 className="display-5 fw-bold dashboard-title">
                  Fixmtaa Control Panel
                </h1>
                <p className="text-muted mb-0">
                  Manage your profile, view insights, and keep track of your
                  latest activity.
                </p>
              </div>

              <div className="d-flex flex-wrap gap-2 dashboard-actions">
                <Link
                  to="/jobs"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2 btn-modern hover\:scale"
                >
                  <FiSearch className="me-2" /> Browse Jobs
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setShowFeaturedCompanies(!showFeaturedCompanies)
                  }
                  className="btn btn-outline-warning btn-lg rounded-pill px-4 py-2 btn-modern text-warning fw-semibold border-warning"
                >
                  <FiStar className="me-2" /> Featured Company
                </button>
                <Link
                  to="/post_job"
                  className="btn btn-primary btn-modern btn-primary-custom btn-lg rounded-pill px-4 py-2 hover\:scale"
                >
                  <FiPlusCircle className="me-2" /> Post a Job
                </Link>
                <Link
                  to="/services"
                  className="btn btn-success btn-modern btn-success-custom btn-lg rounded-pill px-4 py-2 hover\:scale"
                >
                  <FiPackage className="me-2" /> Services
                </Link>
                <Link
                  to="/skills"
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-2 btn-modern hover\:scale"
                >
                  Skills
                </Link>
                <Link
                  to="/stats"
                  className="btn btn-outline-warning btn-lg rounded-pill px-4 py-2 btn-modern hover\:scale"
                >
                  <FiBarChart2 className="me-2" /> Stats
                </Link>
              </div>
            </div>

            {/* Render featured companies inline when toggled */}
            {showFeaturedCompanies && (
              <div className="mt-4">
                <FeaturedCompaniesComponent />
              </div>
            )}

            <div className="row g-4 mb-4">
              <div className="col-sm-6 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100 card-modern hover\:glow fade-in">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Applications
                      </h6>
                      <p className="h2 mb-0">{applications.length}</p>
                    </div>
                    <div className="badge bg-success rounded-pill py-2 px-3">
                      {applications.length > 0
                        ? "+" + Math.min(99, applications.length) + "%"
                        : "+0%"}
                    </div>
                  </div>
                  <p className="text-muted mb-0">Active applications.</p>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100 card-modern hover\:glow fade-in">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Saved Jobs
                      </h6>
                      <p className="h2 mb-0">18</p>
                    </div>
                    <div className="badge bg-info text-dark rounded-pill py-2 px-3">
                      5 new
                    </div>
                  </div>
                  <p className="text-muted mb-0">
                    Jobs you bookmarked for later review.
                  </p>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100 card-modern hover\:glow fade-in">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-2">
                        Profile Strength
                      </h6>
                      <p className="h2 mb-0">82%</p>
                    </div>
                    <div className="badge bg-warning text-dark rounded-pill py-2 px-3">
                      Good
                    </div>
                  </div>
                  <p className="text-muted mb-0">
                    Complete your profile to increase match rate.
                  </p>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 h-100 card-modern hover\:glow">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div>
                        <h5 className="fw-bold mb-1">Recent Activity</h5>
                        <p className="text-muted small mb-0">
                          Your latest actions and updates.
                        </p>
                      </div>
                      <Link
                        to="/get_job"
                        className="small text-primary text-decoration-none fw-semibold hover\:glow"
                      >
                        View all jobs
                      </Link>
                    </div>

                    <ul className="list-group list-group-flush">
                      {applications.length > 0 ? (
                        applications.slice(0, 5).map((app) => (
                          <li
                            key={app.job_id + app.applied_at}
                            className="list-group-item px-0 py-3 border-0 d-flex justify-content-between align-items-center rounded-3 mb-2 bg-light hover\:scale"
                          >
                            <div>
                              <p className="mb-1 fw-semibold">
                                Applied for {app.title}
                              </p>
                              <small className="text-muted">
                                {new Date(app.applied_at).toLocaleString()}
                              </small>
                            </div>
                            <span className="badge bg-primary rounded-pill">
                              Sent
                            </span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="list-group-item px-0 py-3 border-0 d-flex justify-content-between align-items-center rounded-3 mb-2 bg-light hover\:scale">
                            <div>
                              <p className="mb-1 fw-semibold">
                                No recent applications
                              </p>
                              <small className="text-muted">
                                Apply to jobs to see them here
                              </small>
                            </div>
                            <span className="badge bg-secondary rounded-pill">
                              —
                            </span>
                          </li>
                        </>
                      )}

                      <li className="list-group-item px-0 py-3 border-0 d-flex justify-content-between align-items-center rounded-3 bg-light hover\:scale">
                        <div>
                          <p className="mb-1 fw-semibold">Profile updated</p>
                          <small className="text-muted">
                            Yesterday • Completed
                          </small>
                        </div>
                        <span className="badge bg-success rounded-pill">
                          Done
                        </span>
                      </li>
                      <li className="list-group-item px-0 py-3 border-0 d-flex justify-content-between align-items-center rounded-3 bg-light hover\:scale">
                        <div>
                          <p className="mb-1 fw-semibold">
                            New message from recruiter
                          </p>
                          <small className="text-muted">
                            2 days ago • Check inbox
                          </small>
                        </div>
                        <span className="badge bg-warning text-dark rounded-pill">
                          New
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 card-modern hover\:glow">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Quick Actions</h5>
                    <div className="d-grid gap-3">
                      <button className="btn btn-outline-primary rounded-4 py-3 text-start hover\:scale btn-modern">
                        <strong>Upload CV</strong>
                        <p className="mb-0 small text-muted">
                          Keep your resume ready for employers.
                        </p>
                      </button>
                      <button className="btn btn-outline-secondary rounded-4 py-3 text-start hover\:scale btn-modern">
                        <strong>Update preferences</strong>
                        <p className="mb-0 small text-muted">
                          Refine your job matches.
                        </p>
                      </button>
                      <button className="btn btn-outline-success rounded-4 py-3 text-start hover\:scale btn-modern">
                        <strong>Review recommendations</strong>
                        <p className="mb-0 small text-muted">
                          See jobs tailored for you.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
