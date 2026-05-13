import React, { useState, useEffect } from "react";
import { api } from "../api";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";

// removed axios.defaults.withCredentials to avoid sending credentials by default

export default function ReportsComponent() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    issue_type: "",
    description: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const res = await api.get("/api/reports");
      setReports(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // require logged-in user
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      if (!user || !user.user_id) {
        setLoading(false);
        navigate("/login");
        return;
      }
      const data = new FormData();
      // backend expects 'title' field; map issue_type to title
      data.append("title", form.issue_type);
      data.append("user_id", user.user_id);
      data.append("description", form.description);
      data.append("location", form.location);

      await api.post("/api/report", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Report submitted successfully.");
      setForm({
        issue_type: "",
        description: "",
        location: "",
      });
      fetchReports();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Unable to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid min-vh-100 bg-light py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
            <div>
              <p className="text-uppercase text-muted small mb-2">Reports</p>
              <h1 className="display-5 fw-bold">Issue Reporting</h1>
              <p className="text-muted mb-0">
                Submit and review issue reports from the community.
              </p>
            </div>
          </div>

          {message && (
            <div className="alert alert-success small fw-semibold" role="alert">
              {message}
            </div>
          )}

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-3">Report an Issue</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Issue Type
                    </label>
                    <input
                      name="issue_type"
                      value={form.issue_type}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Safety concern"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Describe the issue"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Location
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Westlands"
                      required
                      disabled={loading}
                    />
                  </div>
                  {/* Latitude/Longitude are optional and not required by the API */}
                  {/* Attachments removed: not supported by API */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-4 py-2"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Report"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <div
                      className="col-12"
                      key={report.report_id || report.id || report.issue_type}
                    >
                      <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h5 className="fw-bold mb-1">
                              {report.issue_type}
                            </h5>
                            <p className="text-muted small mb-1">
                              {report.location}
                            </p>
                          </div>
                          <span className="badge bg-warning text-dark rounded-pill py-2 px-3">
                            {report.status || "pending"}
                          </span>
                        </div>
                        <p className="text-muted small mb-2">
                          {report.description}
                        </p>
                        <div className="d-flex flex-wrap gap-2 small text-muted">
                          {report.latitude && report.longitude ? (
                            <span>
                              {report.latitude}, {report.longitude}
                            </span>
                          ) : null}
                          {/* image support removed */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 p-4 text-center text-muted">
                      No reports available yet.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
