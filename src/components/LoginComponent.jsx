import React, { useState } from "react";
import { api } from "../api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import ToastComponent from "./ToastComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

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
        const redirectTo = location.state?.redirectTo || "/dashboard";
        navigate(redirectTo, { replace: true });
      } else {
        setToast({
          show: true,
          message: res.data?.message || "Invalid email or password.",
          type: "danger",
        });
      }
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Login failed. Check your connection.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5" 
         style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
      
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          
          {/* Logo Branding Above Card */}
          <div className="text-center mb-4">
             <BrandLogo size={45} className="mb-2" />
          </div>

          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              
              <div className="text-center mb-4">
                <h2 className="fw-bold h3 mb-1">Welcome Back</h2>
                <p className="text-muted small">Enter your credentials to access your account</p>
              </div>

              <ToastComponent
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
              />

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control border-start-0 rounded-end-3 py-2"
                      placeholder="deng@gmail.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-bold text-secondary">Password</label>
                    <Link to="/forgot-password" style={{fontSize: '0.75rem'}} className="text-decoration-none text-primary">Forgot?</Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                      <FiLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control border-start-0 py-2"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-white text-muted rounded-end-3 border-start-0"
                      onClick={togglePassword}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                  style={{ transition: 'transform 0.2s' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      Login <FiArrowRight />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="card-footer bg-light border-0 text-center py-4">
              <p className="mb-0 small text-muted">
                Don’t have an account yet?{" "}
                <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                  Create JobHub Account
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Help Links */}
          <div className="text-center mt-4">
            <Link to="/" className="text-muted small text-decoration-none">← Back to Home</Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-primary {
          background-color: #0d6efd;
          border: none;
        }
        .btn-primary:hover {
          background-color: #0a58ca;
          transform: translateY(-1px);
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          border-color: #0d6efd;
        }
        .input-group-text {
          border-color: #dee2e6;
        }
      `}} />
    </div>
  );
}

export default LoginComponent;