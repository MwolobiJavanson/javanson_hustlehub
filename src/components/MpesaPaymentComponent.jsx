import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function MpesaPaymentComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from the Job List
  const { application_fee, job_id, job_title } = location.state || {
    application_fee: 0,
    jobId: null,
    job_title: { job_title },
  };

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Requesting STK Push... Check your phone.");

    try {
      const res = await axios.post("http://localhost:5000/api/stk_push", {
        phone: phone,
        amount: application_fee,
        job_id: job_id,
      });

      if (res.data.CheckoutRequestID) {
        alert("Payment initiated! Enter your PIN on your phone to complete.");
        // Optional: Redirect to a 'Waiting' page or back to jobs
        navigate("/get_jobs");
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg border-0 mx-auto rounded-4"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-header bg-success text-white text-center py-3">
          <h4 className="fw-bold mb-0">M-Pesa Checkout</h4>
        </div>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <p className="text-dark mb-1">Applying for: {job_id}</p>
            <h2 className="fw-bold text-primary">KES {application_fee}</h2>
          </div>

          {message && (
            <div className="alert alert-info py-2 small text-center">
              {message}
            </div>
          )}

          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="form-label fw-bold text-muted small">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                className="form-control form-control-lg"
                placeholder="e.g. 0718840790"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="form-text small text-muted text-center mt-2">
                Enter the number to receive the payment popup.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-lg w-100 fw-bold shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border  me-2"></span>
              ) : (
                "Apply Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MpesaPaymentComponent;
