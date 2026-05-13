import { useState } from "react";
import { api } from "../api";
import NavbarComponent from "./NavbarComponent";
import { FiUpload } from "react-icons/fi";

// removed axios.defaults.withCredentials to avoid sending credentials by default

function PostJobComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || !user.user_id) {
      setError("You must be logged in to post a job.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("location", location);
    data.append("salary", salary);
    data.append("job_type", jobType);
    // include employer_id from stored user
    if (user && user.user_id) data.append("employer_id", user.user_id);
    if (image) data.append("image", image);

    try {
      await api.post("/api/jobs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setJobType("");
      setImage(null);
      e.target.reset();

      setSuccess("Job posted successfully.");
      setLoading(false);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error posting job. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4 fade-in">
        <div
          className="card shadow border-0 rounded-4 p-4 mx-auto card-modern"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="mb-4 text-center fw-bold text-success">
            Post a New Job
          </h3>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger py-2 small fw-bold text-center">
              {error}
            </div>
          )}

          {/* Success Alert - Disappears after 3 seconds or on 'X' click */}
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show py-2 small fw-bold text-center"
              role="alert"
            >
              {success}
              <button
                type="button"
                className="btn-close"
                style={{ padding: "0.8rem" }}
                onClick={() => setSuccess("")}
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">
                Job Title
              </label>
              <input
                type="text"
                className="form-control form-modern"
                placeholder="e.g. Graphic Designer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">
                Description
              </label>
              <textarea
                className="form-control form-modern"
                rows="3"
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              ></textarea>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control form-modern"
                  placeholder="e.g. Nairobi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">
                  Job Type
                </label>
                <input
                  type="text"
                  className="form-control form-modern"
                  placeholder="e.g. Full-time"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">
                  Salary (KES)
                </label>
                <input
                  type="number"
                  className="form-control form-modern"
                  placeholder="e.g. 5000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">
                  Job Image (Optional)
                </label>
                <input
                  type="file"
                  className="form-control form-modern"
                  onChange={(e) => setImage(e.target.files[0])}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 fw-bold py-2 mt-2 btn-modern btn-success-custom hover\:scale"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload className="me-2" /> Upload Hustle
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostJobComponent;
