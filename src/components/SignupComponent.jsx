import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import BrandLogo from "./BrandLogo";
import ToastComponent from "./ToastComponent";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupComponent() {
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    
    if (!passwordRegex.test(form.password)) {
      setToast({ show: true, message: "Password needs 4+ chars, 1 letter, and 1 number.", type: "danger" });
      setLoading(false);
      return;
    }

    try {
      // Match Flask backend expectations (multipart/form-data): username, email, phone, password
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("phone", `+254${form.phone.replace(/\s/g, "")}`);
      data.append("password", form.password);

      const res = await api.post("/api/signup", data);
      if (res.status === 200 || res.status === 201) {
        setToast({ show: true, message: "Welcome to JobHub! Redirecting...", type: "success" });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.message || "Signup failed.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5" 
         style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
      
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          
          {/* Brand Branding Above Card */}
          <div className="text-center mb-4">
             <BrandLogo size={45} className="mb-2" />
          </div>

          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              
              <div className="text-center mb-4">
                <h2 className="fw-bold h3 mb-1">Create Account</h2>
                <p className="text-muted small">Join JobHub and start your career journey</p>
              </div>

              <ToastComponent
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
              />

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Username */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-secondary">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="form-control border-start-0 rounded-end-3"
                        placeholder="deng"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-secondary">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control border-start-0 rounded-end-3"
                        placeholder="deng@work.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-12 mb-3">
                    <label className="form-label small fw-bold text-secondary">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                        <FiPhone />
                      </span>
                      <span className="input-group-text bg-white border-0 text-muted px-1">+254</span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-control border-start-0 rounded-end-3"
                        placeholder="712345678"
                        pattern="[0-9]{9}"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="col-12 mb-4">
                    <label className="form-label small fw-bold text-secondary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 rounded-start-3 text-muted">
                        <FiLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control border-start-0"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text bg-white text-muted rounded-end-3 border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>Register <FiArrowRight /></>
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer bg-light border-0 text-center py-4">
              <p className="mb-0 small text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold text-decoration-none">
                  Login here
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="text-muted small text-decoration-none">← Back to Home</Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-primary { background-color: #0d6efd; border: none; transition: transform 0.2s; }
        .btn-primary:hover { background-color: #0a58ca; transform: translateY(-1px); }
        .form-control:focus { box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15); border-color: #0d6efd; }
        .input-group-text { border-color: #dee2e6; }
      `}} />
    </div>
  );
}