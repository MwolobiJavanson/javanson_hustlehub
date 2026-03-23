import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    try {
      const res = await axios.post("http://localhost:5000/api/login", data);

      if (res.data.user) {
        // Clear fields
        setEmail("");
        setPassword("");

        // Save user data
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Immediate Navigation
        navigate("/get_job");
      } else {
        setError(res.data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Welcome Back
              </h2>

              {error && (
                <div className="alert alert-danger py-2 small fw-bold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control py-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
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
                      Confirming user...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-white border-0 text-center pb-4">
              <span className="text-muted small">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-decoration-none fw-bold text-primary small"
              >
                Sign Up Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
