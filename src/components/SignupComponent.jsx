import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SignupComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Clear UI from previous attempts
    setError("");
    setSuccess("");
    setLoading(true);

    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("phone", phone);
    data.append("password", password);

    try {
      const res = await axios.post("http://localhost:5000/api/signup", data);

      // 2. Clear the input fields immediately after successful API call
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");

      // 3. Set clear success feedback
      setSuccess(res.data.message || "Account created! You can now log in.");

      // 4. Wait 2 seconds so the user can see the success message before moving
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Create Account
              </h2>

              {/* Clear Feedback Alerts */}
              {error && (
                <div className="alert alert-danger py-2 small fw-bold">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success py-2 small fw-bold">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control py-2"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-2"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2 mb-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Saving Data...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer bg-white border-0 text-center pb-4">
              <span className="text-muted small">Back to </span>
              <Link
                to="/"
                className="text-decoration-none fw-bold text-primary small"
              >
                Login Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;
