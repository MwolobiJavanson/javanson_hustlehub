import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      if (response.status === 200) {
        setStatus({ type: "success", msg: response.data.message || "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Server connection failed. Please try again.";
      setStatus({ type: "danger", msg: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="row g-0">
              
              {/* Left Side: Contact Info */}
              <div className="col-md-5 bg-success text-white p-5 d-flex flex-column justify-content-center">
                <h3 className="fw-bold mb-4">Get in Touch</h3>
                <p className="mb-5 opacity-75">Fill out the form and our team will get back to you within 24 hours.</p>
                
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-map-marker-alt fs-4 me-3"></i>
                  <span>Westlands, Nairobi, Kenya</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-phone-alt fs-4 me-3"></i>
                  <span>+254 700 000 000</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-envelope fs-4 me-3"></i>
                  <span>support@jobportal.co.ke</span>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="col-md-7 p-5 bg-white">
                {status.msg && (
                  <div className={`alert alert-${status.type} border-0 shadow-sm mb-4`} role="alert">
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-success border-opacity-25 py-2"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-success border-opacity-25 py-2"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control border-success border-opacity-25 py-2"
                      placeholder="Payment Inquiry / Account Help"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      className="form-control border-success border-opacity-25"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-success w-100 py-2 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : "Send Message"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;