import React, { useState, useEffect } from "react";
import { api, API_BASE } from "../api";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import NavbarComponent from "./NavbarComponent";
import JobServicePredictorComponent from "./JobServicePredictorComponent";


// removed axios.defaults.withCredentials to avoid sending credentials by default

function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  // check query param for featured filtering
  const urlParams = new URLSearchParams(window.location.search);
  const showFeatured = urlParams.get("featured") === "1";
  // optional company filter when clicking featured company cards
  const companyIdParam = urlParams.get("company_id") || null;

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs");
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      // ensure user is logged in and we have a user_id
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      if (!user || !user.user_id) {
        alert("Please login to apply for jobs.");
        // redirect to login page
        window.location.href = "/login";
        return;
      }

      const data = new FormData();
      data.append("job_id", jobId);
      data.append("user_id", user.user_id);

      // let axios set the multipart Content-Type (boundary)
      const res = await api.post("/api/apply", data);

      // Accept 201 Created from the Flask endpoint as success
      if (res.status !== 201 && !res.data?.message) {
        throw new Error(res.data?.error || "Failed to apply for job");
      }

      // store applied job locally so dashboard can show it
      const appliedJob = jobs.find((j) => String(j.job_id) === String(jobId));
      try {
        const existing = JSON.parse(
          localStorage.getItem("applications") || "[]",
        );
        const entry = {
          job_id: appliedJob?.job_id || jobId,
          title: appliedJob?.title || res.data?.title || "Job",
          applied_at: new Date().toISOString(),
        };
        const updated = [entry, ...existing];
        localStorage.setItem("applications", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not persist application locally", e);
      }

      alert("Application submitted successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to apply for this job.");
    }
  };

  const filteredAndSortedJobs = jobs
    .filter((job) => {
      // if company filter provided, prefer employer_id or company_id on job
      if (companyIdParam) {
        const employerId =
          job.employer_id || job.company_id || job.companyId || job.company?.id;
        return String(employerId) === String(companyIdParam);
      }
      if (showFeatured) return !!job.featured;
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      return (
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.job_id - a.job_id;
        case "oldest":
          return a.job_id - b.job_id;
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "size":
          return (b.salary || 0) - (a.salary || 0);
        default:
          return 0;
      }
    });

  return (
    <>
      <NavbarComponent />
      <JobServicePredictorComponent />
      <div className="container p-0">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
          <div>
            <h2 className="fw-bold">Available Jobs</h2>
            <p className="text-muted small mb-0">
              Browse jobs posted by employers and apply quickly.
            </p>
          </div>
          <Link
            to="/post_job"
            className="btn btn-primary btn-modern btn-primary-custom rounded-pill px-4 py-2 shadow-sm hover\:scale"
          >
            Post a Job
          </Link>
        </div>

        {/* --- Filter & Sort Controls --- */}
        <div className="row mb-4 g-3 align-items-end">
          {/* Search Bar */}
          <div className="col-md-8">
            <label className="form-label small fw-bold text-muted">
              Search Jobs
            </label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-success border-end-0">
                <FiSearch />
              </span>
              <input
                type="text"
                className="form-control border-success border-start-0 ps-0"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="col-md-4">
            <label className="form-label small fw-bold text-muted">
              Sort By
            </label>
            <select
              className="form-select shadow-sm border-success fw-bold"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">Alphabetical: A-Z</option>
              <option value="z-a">Alphabetical: Z-A</option>
              <option value="size">Fee: High to Low</option>
            </select>
          </div>
        </div>

        <hr className="mb-4 opacity-10" />

        {/* --- Jobs Display Grid --- */}
        <div className="row">
          {companyIdParam && (
            <div className="col-12 mb-3">
              <div className="alert alert-info py-2 small mb-0">
                Showing jobs for company id <strong>{companyIdParam}</strong>.{" "}
                <a href="/jobs" className="ms-2">
                  Clear
                </a>
              </div>
            </div>
          )}
          {filteredAndSortedJobs.length > 0 ? (
            filteredAndSortedJobs.map((job) => (
              <div className="col-md-4 mb-4" key={job.job_id}>
                <div className="card h-100 card-modern hover\:glow hover\:scale rounded-4 overflow-hidden fade-in">
                  {job.image && (
                    <img
                      src={`${API_BASE}/uploads/${job.image}`}
                      className="card-img-top"
                      alt="job"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-primary fs-5 mb-2">
                      {job.title}
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      {job.description}
                    </p>

                    <div className="mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary fw-bold px-3 py-2 me-2">
                        {job.job_type || "Full-time"}
                      </span>
                      <span className="badge bg-success bg-opacity-10 text-success border border-success fw-bold px-3 py-2">
                        KES {job.salary?.toLocaleString() || "Negotiable"}
                      </span>
                    </div>

                    <button
                      className="btn btn-success btn-modern btn-success-custom w-100 fw-bold py-2 shadow-sm hover\:scale mt-auto"
                      onClick={() => applyToJob(job.job_id)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                No jobs found matching "{searchTerm}"
              </h4>
              <button
                className="btn btn-link text-success fw-bold"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobListComponent;
