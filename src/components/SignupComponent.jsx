import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupComponent() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("password", form.password);

      const res = await axios.post("http://localhost:5000/api/signup", data);

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Account created successfully. Redirecting to login...");
        setForm({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        setTimeout(() => navigate("/login"), 1400);
      } else {
        setMessage(res.data?.message || "❌ Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "❌ unable to create account. Please try again later.",
      );
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark bg-gradient">
      <div className="row w-100 justify-content-center px-3 px-md-0">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-primary py-4 text-center text-white">
              <h1 className="h4 fw-bold mb-1">Fixmtaa</h1>
              <p className="mb-0 small opacity-75">Create your Fixmtaa account</p>
            </div>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-15"
                  style={{ width: 64, height: 64 }}
                >
                  <span className="fs-6 fw-bold text-primary">Fixmtaa</span>
                </div>
                <h2 className="h5 fw-bold mb-2">Create Account</h2>
                <p className="text-muted small mb-0">Join Fixmtaa and get started.</p>
              </div>

              {message && (
                <div
                  className={`alert py-2 px-3 small mb-4 text-center ${
                    message.includes("✅")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-muted">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg rounded-4 border-2"
                    placeholder="Choose a username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-muted">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg rounded-4 border-2"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-muted">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control form-control-lg rounded-4 border-2"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted">Password</label>
                  <div className="input-group input-group-lg rounded-4 border-2 overflow-hidden">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control border-0"
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary border-0 px-3"
                      onClick={togglePassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.359 11.238l1.387 1.387a.5.5 0 0 1-.708.708l-1.528-1.528A8.178 8.178 0 0 1 8 13.5 8.5 8.5 0 0 1 1.606 9.198a.5.5 0 1 1 .785-.62 7.5 7.5 0 0 0 11.184 1.26l.784.724a.5.5 0 0 1-.62.785l-.42-.388z" />
                          <path d="M3.20 5.63a.5.5 0 0 1 .706-.706l1.4 1.4C6.125 6.164 6.56 6 7 6c1.657 0 3 1.343 3 3 0 .44-.164.875-.324 1.094l1.37 1.37c.373-.428.654-.95.82-1.474A7.5 7.5 0 0 0 8 2.5a7.519 7.519 0 0 0-4.8 1.388l.0-.01z"/>
                          <path d="M13.646 1.354a.5.5 0 0 1 .708.708l-12 12a.5.5 0 1 1-.708-.708l12-12z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8s-3.5-5.5-8-5.5S0 8 0 8s3.5 5.5 8 5.5S16 8 16 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-100 rounded-4 fw-semibold"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-white border-0 text-center py-4">
              <p className="mb-2 small text-muted">Already have an account?</p>
              <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
