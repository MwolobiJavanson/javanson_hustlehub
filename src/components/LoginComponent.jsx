import React, { useState } from "react";
import { api } from "../api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import ToastComponent from "./ToastComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const togglePassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const res = await api.post("/api/login", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.user && res.data.user.user_id) {
        setEmail("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        const redirectTo = location.state?.redirectTo;
        if (redirectTo) {
          navigate(redirectTo, { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setToast({
          show: true,
          message: res.data?.message || "Invalid email or password.",
          type: "danger",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message:
          err.response?.data?.message || "Login failed. Check your connection.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark bg-gradient fade-in">
      <div className="row w-100 justify-content-center px-3 px-md-0">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden card-modern">
            <div className="bg-primary py-4 text-center text-white">
              <h1 className="h4 fw-bold mb-1">
                <BrandLogo
                  size={34}
                  className="justify-content-center"
                  textClassName="text-white"
                />
              </h1>
              <p className="mb-0 small opacity-75">
                Secure login to access your dashboard
              </p>
            </div>
            <div className="card-body p-5">
              <ToastComponent
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
              />
              <div className="text-center mb-4">
                <BrandLogo
                  size={64}
                  showText={false}
                  className="justify-content-center mb-3"
                  markClassName="rounded-circle"
                />
                <h2 className="h5 fw-bold mb-2">Welcome Back</h2>
                <p className="text-muted small mb-0">
                  Log in and continue where you left off.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-muted">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg rounded-4 border-2 form-modern"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted">
                    Password
                  </label>
                  <div className="input-group input-group-lg rounded-4 border-2 overflow-hidden">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control border-0 form-modern"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary border-0 px-3"
                      onClick={togglePassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238l1.387 1.387a.5.5 0 0 1-.708.708l-1.528-1.528A8.178 8.178 0 0 1 8 13.5 8.5 8.5 0 0 1 1.606 9.198a.5.5 0 1 1 .785-.62 7.5 7.5 0 0 0 11.184 1.26l.784.724a.5.5 0 0 1-.62.785l-.42-.388z" />
                          <path d="M3.20 5.63a.5.5 0 0 1 .706-.706l1.4 1.4C6.125 6.164 6.56 6 7 6c1.657 0 3 1.343 3 3 0 .44-.164.875-.324 1.094l1.37 1.37c.373-.428.654-.95.82-1.474A7.5 7.5 0 0 0 8 2.5a7.519 7.519 0 0 0-4.8 1.388l.0-.01z" />
                          <path d="M13.646 1.354a.5.5 0 0 1 .708.708l-12 12a.5.5 0 1 1-.708-.708l12-12z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3.5-5.5-8-5.5S0 8 0 8s3.5 5.5 8 5.5S16 8 16 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <small className="text-muted">Required</small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-4 fw-semibold btn-modern btn-primary-custom hover\:scale"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
            <div className="card-footer bg-white border-0 text-center py-4">
              <p className="mb-2 small text-muted">
                Don’t have an account yet?
              </p>
              <Link
                to="/signup"
                className="text-primary fw-semibold text-decoration-none hover\:glow"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
