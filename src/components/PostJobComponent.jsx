import { useState } from "react";
import { api } from "../api";
import { FiUpload, FiBriefcase, FiMapPin, FiDollarSign, FiAlignLeft, FiList } from "react-icons/fi";

function PostJobComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState(""); // UI only, merged into desc for Backend
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Matching your Flask Backend expectations exactly
    const data = new FormData();
    data.append("title", title);
    data.append("company", company);
    data.append("location", location);
    data.append("salary", salary);
    
    // Merging Requirements into Description so they are saved in your current DB schema
    const fullDescription = `ROLE:\n${description}\n\nREQUIREMENTS:\n${requirements}`;
    data.append("description", fullDescription);

    try {
      await api.post("/api/jobs", data); // Sent as multipart/form-data by default with FormData

      // Reset Form
      setTitle("");
      setDescription("");
      setRequirements("");
      setLocation("");
      setSalary("");
      setCompany("");
      e.target.reset();

      setSuccess("Job posted successfully to JobHub!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.error || "Error posting job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="bg-primary p-4 text-white text-center">
              <h3 className="fw-bold mb-0">Post an Opportunity</h3>
              <p className="opacity-75 small mb-0">Matches your Backend API requirements</p>
            </div>

            <div className="card-body p-4 p-md-5">
              {error && <div className="alert alert-danger rounded-3 small fw-bold">{error}</div>}
              {success && <div className="alert alert-success rounded-3 small fw-bold">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Company */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Company Name</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text border-0 bg-white"><FiBriefcase className="text-primary"/></span>
                      <input type="text" className="form-control border-0" placeholder="e.g. Acme Ltd" value={company} onChange={(e) => setCompany(e.target.value)} required disabled={loading} />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Job Title</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text border-0 bg-white"><FiAlignLeft className="text-primary"/></span>
                      <input type="text" className="form-control border-0" placeholder="e.g. Sales Manager" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={loading} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Job Description</label>
                    <textarea className="form-control border-0 shadow-sm" rows="3" placeholder="What is the role about?" value={description} onChange={(e) => setDescription(e.target.value)} required disabled={loading}></textarea>
                  </div>

                  {/* Requirements (New Field) */}
                  <div className="col-12 mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Requirements</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text border-0 bg-white align-items-start pt-2"><FiList className="text-primary"/></span>
                      <textarea className="form-control border-0" rows="3" placeholder="List the skills needed..." value={requirements} onChange={(e) => setRequirements(e.target.value)} required disabled={loading}></textarea>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Location</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text border-0 bg-white"><FiMapPin className="text-primary"/></span>
                      <input type="text" className="form-control border-0" placeholder="e.g. Nairobi, CBD" value={location} onChange={(e) => setLocation(e.target.value)} required disabled={loading} />
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="col-md-6 mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase">Salary (KES)</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text border-0 bg-white"><FiDollarSign className="text-primary"/></span>
                      <input type="number" className="form-control border-0" placeholder="e.g. 45000" value={salary} onChange={(e) => setSalary(e.target.value)} required disabled={loading} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 hover-up" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <FiUpload /> Post Opportunity
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .form-control { background-color: #f1f3f5 !important; border-radius: 8px; }
        .input-group-text { background-color: #f1f3f5 !important; border-radius: 8px; }
        .form-control:focus { background-color: #ffffff !important; box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; }
        .hover-up { transition: transform 0.2s ease; }
        .hover-up:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2); }
      `}} />
    </div>
  );
}

export default PostJobComponent;