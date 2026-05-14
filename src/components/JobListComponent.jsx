import React, { useState, useEffect } from "react";
import { api, API_BASE } from "../api";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiClock, FiDollarSign, FiBriefcase, FiPlus } from "react-icons/fi";
import NavbarComponent from "./NavbarComponent";

function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const showFeatured = urlParams.get("featured") === "1";
  const companyIdParam = urlParams.get("company_id") || null;

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs");
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      const userString = localStorage.getItem("user");
      let user = userString ? JSON.parse(userString) : { username: "Applicant", location: "" };

      const appliedJob = jobs.find((j) => String(j.job_id) === String(jobId));

      const data = new FormData();
      data.append("job_title", appliedJob?.title || "Job");
      data.append("applicant_name", user.username);
      data.append("applicant_location", user.location || user.city || "");
      data.append("applicant_availability", "Immediate");

      const res = await api.post("/api/apply", data);

      if (res.status === 201 || res.data?.message) {
        const existing = JSON.parse(localStorage.getItem("applications") || "[]");
        const entry = {
          job_id: appliedJob?.job_id || jobId,
          title: appliedJob?.title || "Job",
          applied_at: new Date().toISOString(),
        };
        localStorage.setItem("applications", JSON.stringify([entry, ...existing]));
        alert("Success! Your application has been sent.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Unable to apply for this job.");
    }
  };

  const filteredAndSortedJobs = jobs
    .filter((job) => {
      if (companyIdParam) return String(job.employer_id || job.company_id) === String(companyIdParam);
      if (showFeatured) return !!job.featured;
      const content = `${job.title} ${job.description}`.toLowerCase();
      return content.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return b.job_id - a.job_id;
        case "oldest": return a.job_id - b.job_id;
        case "a-z": return a.title.localeCompare(b.title);
        case "size": return (b.salary || 0) - (a.salary || 0);
        default: return 0;
      }
    });

  return (
    <div className="bg-light min-vh-100 pb-5">
      <NavbarComponent />
      
      {/* Hero Header */}
      <div className="bg-white border-bottom py-5 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="fw-bold display-6 text-dark mb-2">Find your next step</h1>
              <p className="text-muted lead mb-0">Discover the best opportunities in Kenya's job market.</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/post_job" className="btn btn-primary btn-lg rounded-3 shadow-sm px-4 d-inline-flex align-items-center gap-2">
                <FiPlus /> Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Search & Filter Bar */}
        <div className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-lg-8">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-transparent border-0 text-muted"><FiSearch /></span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none fs-6"
                    placeholder="Search by job title, keywords, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 border-start d-none d-lg-block">
                <select
                  className="form-select form-select-lg border-0 shadow-none fs-6 fw-medium"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest Listed</option>
                  <option value="oldest">Oldest Listed</option>
                  <option value="a-z">Alphabetical (A-Z)</option>
                  <option value="size">Highest Salary</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="row g-4">
          {filteredAndSortedJobs.length > 0 ? (
            filteredAndSortedJobs.map((job) => (
              <div className="col-lg-4 col-md-6" key={job.job_id}>
                <div className="card h-100 border-0 shadow-hover transition-all rounded-4 overflow-hidden">
                  <div className="position-relative">
                    {job.image ? (
                      <img
                        src={`${API_BASE}/uploads/${job.image}`}
                        className="card-img-top"
                        alt={job.title}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{height: '180px'}}>
                        <FiBriefcase size={48} className="text-primary opacity-25" />
                      </div>
                    )}
                    <span className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm py-2 px-3 rounded-pill fw-bold">
                      {job.job_type || "Full-time"}
                    </span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-3">
                      <h5 className="card-title fw-bold mb-1 text-truncate">{job.title}</h5>
                      <div className="d-flex align-items-center text-muted small gap-2">
                         <FiMapPin size={14} /> <span>Kenya</span>
                      </div>
                    </div>
                    
                    <p className="card-text text-muted small mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="text-success fw-bold d-flex align-items-center gap-1">
                          <FiDollarSign />
                          <span>{job.salary ? `KES ${job.salary.toLocaleString()}` : "Negotiable"}</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-dark w-100 py-2 fw-bold rounded-3 apply-btn"
                        onClick={() => applyToJob(job.job_id)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="mb-3">
                <FiSearch size={48} className="text-muted opacity-25" />
              </div>
              <h4 className="text-muted fw-bold">No results found</h4>
              <p className="text-muted">Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn btn-outline-primary mt-2 rounded-pill px-4" onClick={() => setSearchTerm("")}>
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .shadow-hover { transition: all 0.3s ease; }
        .shadow-hover:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .apply-btn { transition: all 0.2s; }
        .apply-btn:hover { background-color: #0d6efd !important; border-color: #0d6efd !important; }
        .transition-all { transition: all 0.3s ease-in-out; }
      `}} />
    </div>
  );
}

export default JobListComponent;