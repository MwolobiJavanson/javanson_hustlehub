import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobListComponent() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div className="container p-0">
      <h2 className="text-center my-4 fw-bold">
        <marquee>Available Jobs</marquee>
      </h2>

      <div className="row">
        {jobs.map((job) => (
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
                  className="btn btn-success w-100 fw-bold py-2"
                  onClick={() => {
                    navigator("/payment", { state: { job } });
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobListComponent;
