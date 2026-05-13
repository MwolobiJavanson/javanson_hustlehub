import React, { useState, useEffect } from "react";
import axios from "axios";

const contactPhone = "0115995514";
const contactPhoneInternational = "254115995514";
const contactEmail = "mwolobijavanson@gmail.com";

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
      const response = await axios.post(
        "https://jmwolobi.alwaysdata.net/api/contact",
        formData,
      );

      if (response.status === 200) {
        setStatus({
          type: "success",
          msg: response.data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Server connection failed. Please try again.";
      setStatus({ type: "danger", msg: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden card-modern hover\:glow">
            <div className="row g-0">
              {/* Left Side: Contact Info */}
              <div className="col-md-5 bg-primary bg-opacity-90 text-white p-5 d-flex flex-column justify-content-center">
                <h3 className="fw-bold mb-4">Get in Touch</h3>
                <p className="mb-4 opacity-75">
                  Fill out the form or reach us directly through any channel
                  below.
                </p>

                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-map-marker-alt fs-4 me-3"></i>
                  <span>Westlands, Nairobi, Kenya</span>
                </div>

                <div className="d-grid gap-3">
                  <a
                    href={`https://wa.me/${contactPhoneInternational}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light text-success fw-bold rounded-4 text-start py-3 btn-modern hover\:scale"
                  >
                    WhatsApp: {contactPhone}
                  </a>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="btn btn-outline-light fw-bold rounded-4 text-start py-3 btn-modern hover\:scale"
                  >
                    Email: {contactEmail}
                  </a>
                  <a
                    href={`sms:${contactPhone}`}
                    className="btn btn-outline-light fw-bold rounded-4 text-start py-3 btn-modern hover\:scale"
                  >
                    Message: {contactPhone}
                  </a>
                  <a
                    href={`tel:${contactPhone}`}
                    className="btn btn-outline-light fw-bold rounded-4 text-start py-3 btn-modern hover\:scale"
                  >
                    Call: {contactPhone}
                  </a>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="col-md-7 p-5 bg-white">
                {status.msg && (
                  <div
                    className={`alert alert-${status.type} border-0 shadow-sm mb-4`}
                    role="alert"
                  >
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-success border-opacity-25 py-2 form-modern"
                      placeholder="Javanson"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-success border-opacity-25 py-2 form-modern"
                      placeholder="javanson@example.com"
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
                      className="form-control border-success border-opacity-25 py-2 form-modern"
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
                      className="form-control border-success border-opacity-25 form-modern"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 fw-bold shadow-sm btn-modern btn-success-custom hover\:scale"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      "Send Message"
                    )}
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
