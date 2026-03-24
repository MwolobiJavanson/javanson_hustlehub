import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function MpesaPaymentComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const job = location.state?.job;

  const application_fee = job?.application_fee || 0;
  const job_id = job?.job_id || null;
  const job_title = job?.job_title || "";
  const job_image = job?.job_image || "";

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Prevent crash if no job
  if (!job) {
    return <h3 className="text-center mt-5">No job selected</h3>;
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    setMessage("Requesting STK Push... Check your phone.");

    try {
      const res = await axios.post("http://localhost:5000/api/stk_push", {
        phone: phone,
        amount: application_fee,
        job_id: job_id,
      });

      if (res.data.CheckoutRequestID) {
        alert("Payment initiated! Enter your PIN on your phone.");
        navigate("/get_jobs");
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Please try again.");
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
          {/* Job Preview */}
          <div className="text-center mb-4">
            {job_image && (
              <img
                src={`http://localhost:5000/static/images/${job_image}`}
                alt="job"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            )}

            <h5 className="fw-bold text-success">Job: {job_title}</h5>

            <span className="badge bg-success bg-opacity-10 text-success border border-success fw-bold p-2">
              Application fee: KES {application_fee}
            </span>
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
                placeholder="e.g. 0712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="form-text small text-muted text-center mt-2">
                Enter number to receive payment prompt
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-lg w-100 fw-bold"
            >
              Apply & Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MpesaPaymentComponent;
