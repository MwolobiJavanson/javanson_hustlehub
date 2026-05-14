import { useState } from "react";
import { api } from "../api";
import { FiUser, FiMapPin, FiClock, FiSend } from "react-icons/fi";

export default function ApplicationComponent({ jobTitle, on处Success }) {
  const [form, setForm] = useState({
    applicant_name: "",
    applicant_location: "",
    applicant_availability: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("job_title", jobTitle); // Passed from the job the user clicked
    data.append("applicant_name", form.applicant_name);
    data.append("applicant_location", form.applicant_location);
    data.append("applicant_availability", form.applicant_availability);

    try {
      await api.post("/api/apply", data);
      setStatus({ type: "success", msg: "Application sent successfully!" });
      setTimeout(() => on处Success?.(), 2000);
    } catch (err) {
      setStatus({ type: "danger", msg: "Failed to send application." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 bg-white p-3">
      <h5 className="fw-bold mb-3 text-primary">Apply for {jobTitle}</h5>
      
      {status.msg && (
        <div className={`alert alert-${status.type} small py-2`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-bold">Full Name</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-0"><FiUser /></span>
            <input 
              type="text" 
              className="form-control bg-light border-0" 
              placeholder="Your Name"
              onChange={(e) => setForm({...form, applicant_name: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Current Location</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-0"><FiMapPin /></span>
            <input 
              type="text" 
              className="form-control bg-light border-0" 
              placeholder="e.g. Mombasa, KE"
              onChange={(e) => setForm({...form, applicant_location: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Availability</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-0"><FiClock /></span>
            <input 
              type="text" 
              className="form-control bg-light border-0" 
              placeholder="e.g. Immediately / 2 weeks"
              onChange={(e) => setForm({...form, applicant_availability: e.target.value})}
              required 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading ? "Sending..." : <><FiSend /> Submit Application</>}
        </button>
      </form>
    </div>
  );
}