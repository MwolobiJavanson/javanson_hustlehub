import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  let navigator = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get_jobs");
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const filteredAndSortedJobs = jobs
    .filter(
      (job) =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.job_description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.job_id - a.job_id;
        case "oldest":
          return a.job_id - b.job_id;
        case "a-z":
          return a.job_title.localeCompare(b.job_title);
        case "z-a":
          return b.job_title.localeCompare(a.job_title);
        case "size":
          return (b.application_fee || 0) - (a.application_fee || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="container p-0">
      <h2 className="text-center my-4 fw-bold">
        <marquee>Available Jobs</marquee>
      </h2>

      {/* --- Filter & Sort Controls --- */}
      <div className="row mb-4 g-3 align-items-end">
        {/* Search Bar */}
        <div className="col-md-8">
          <label className="form-label small fw-bold text-muted">
            Search Jobs
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-success border-end-0">
              🔍
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
          <label className="form-label small fw-bold text-muted">Sort By</label>
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
        {filteredAndSortedJobs.length > 0 ? (
          filteredAndSortedJobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.job_id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                {job.job_image && (
                  <img
                    src={`http://localhost:5000/static/images/${job.job_image}`}
                    className="card-img-top"
                    alt="job"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-success">
                    {job.job_title}
                  </h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {job.job_description}
                  </p>

                  <div className="mb-3">
                    <span className="badge bg-success bg-opacity-10 text-success border border-success fw-bold p-2">
                      Application fee: KES {job.application_fee || 0}
                    </span>
                  </div>

                  <button
                    className="btn btn-success w-100 fw-bold py-2 shadow-sm"
                    onClick={() => {
                      navigator("/payment", { state: { job } });
                    }}
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
  );
}

export default JobListComponent;
