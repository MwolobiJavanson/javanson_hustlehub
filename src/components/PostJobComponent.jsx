import { useState } from "react";
import axios from "axios";

function PostJobComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [applicationFee, setApplicationFee] = useState("");

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous feedback
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
    data.append("user_id", user.user_id);
    data.append("job_title", title);
    data.append("job_description", description);
    data.append("application_fee", applicationFee);
    if (image) data.append("job_image", image);

    try {
      await axios.post("http://localhost:5000/api/post_job", data);

      // 1. Clear Form Data immediately
      setTitle("");
      setDescription("");
      setApplicationFee("");
      setImage(null);
      e.target.reset();

      // 2. Show success message
      setSuccess("Uploaded successfully");

      // 3. Stop Loading (Button reverts to normal)
      setLoading(false);

      // 4. HIDE AFTER 3 SECONDS
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
    <div className="container mt-4">
      <div
        className="card shadow border-0 rounded-3 p-4 mx-auto"
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
              className="form-control"
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
              className="form-control"
              rows="3"
              placeholder="What needs to be done?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">
              Application Fee (KES)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 50"
              value={applicationFee}
              onChange={(e) => setApplicationFee(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">
              Job Image (Optional)
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold py-2 mt-2"
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
              "Upload Hustle"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJobComponent;
