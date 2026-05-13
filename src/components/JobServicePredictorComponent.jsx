import React, { useState, useMemo } from "react";
import { api } from "../api";
import * as tf from "@tensorflow/tfjs";
import ToastComponent from "./ToastComponent.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobServicePredictorComponent() {
  const [form, setForm] = useState({
    age: 25,
    pastJob: "",
    serviceDone: "",
    availability: "Immediate",
    expectedSalary: 50000,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [prediction, setPrediction] = useState(null);

  const availabilityOptions = useMemo(
    () => ["Immediate", "Part-time", "Full-time", "This week", "This month"],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateScores = async (items, userValue, key) => {
    if (!items?.length) return [];
    return tf.tidy(() => {
      const expected = parseFloat(userValue) || 1;
      const values = items.map((i) => parseFloat(i[key]) || 0);

      const actual = tf.tensor1d(values);
      const expectedTensor = tf.scalar(expected);

      const diff = actual.sub(expectedTensor).abs().div(expectedTensor);
      const score = tf.scalar(1).sub(diff).clipByValue(0, 1);

      const arr = score.arraySync();

      return items
        .map((item, i) => ({ ...item, score: arr[i] }))
        .sort((a, b) => b.score - a.score);
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [jobsRes, servicesRes] = await Promise.all([
        api.get("/api/jobs"),
        api.get("/api/services"),
      ]);

      const combined = [...jobsRes.data, ...servicesRes.data];
      const ranked = await calculateScores(combined, form.expectedSalary, "salary");

      setPrediction(ranked.slice(0, 6));
      setToast({
        show: true,
        message: "Analysis complete.",
        type: "success",
      });
    } catch (err) {
      setToast({ show: true, message: "Connection error.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="container py-5" style={{ pointerEvents: "auto" }}>


        <div className="header mb-4">
          <h1 className="title">Job & Service Recommendation Engine</h1>
          <p className="subtitle">AI-assisted matching system</p>
        </div>

        <div className="card modern-card mb-4">
          <form onSubmit={handlePredict} className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="label">Age</label>
              <input className="form-control input" type="number" name="age" value={form.age} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="label">Past Job</label>
              <input className="form-control input" name="pastJob" value={form.pastJob} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="label">Service</label>
              <input className="form-control input" name="serviceDone" value={form.serviceDone} onChange={handleChange} />
            </div>

            <div className="col-md-2">
              <label className="label">Availability</label>
              <select className="form-select input" name="availability" value={form.availability} onChange={handleChange}>
                {availabilityOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="label">Salary (KES)</label>
              <input className="form-control input" type="number" name="expectedSalary" value={form.expectedSalary} onChange={handleChange} />
            </div>

            <div className="col-md-12 text-end">
              <button className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Processing..." : "Run Analysis"}
              </button>
            </div>
          </form>
        </div>

        <div className="card modern-card">
          <div className="card-header clean-header">
            <h5 className="m-0">Results</h5>
          </div>

          <div className="card-body">
            {!prediction ? (
              <p className="muted">No results yet. Run analysis to see recommendations.</p>
            ) : (
              <div className="row g-3">
                {prediction.map((item, i) => (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <div className="result-card">
                      <div className="d-flex justify-content-between">
                        <span className="badge-soft">
                          {item.type || "result"}
                        </span>
                        <span className="score">{(item.score * 100).toFixed(0)}%</span>
                      </div>

                      <div className="title-small">{item.title}</div>

                      <div className="salary">KES {item.salary}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ToastComponent
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          background: #f5f7fb;
        }

        .app-shell {
          min-height: 100vh;
          background: #f5f7fb;
          font-family: Inter, system-ui, sans-serif;
          position: relative;
          color: #111827;
        }

        /* subtle top gradient accent */
        .app-shell::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 220px;
          background: linear-gradient(180deg, rgba(59,130,246,0.08), transparent);
          z-index: 0;
        }

        .app-shell > * {
          position: relative;
          z-index: 1;
        }

        /* watermark */
        .app-shell::after {
          content: "Developed by Javanson Mwolobi • Powered by TensorFlow";
          position: fixed;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.72rem;
          color: rgba(71, 85, 105, 0.75);
          letter-spacing: 0.4px;
          background: rgba(255,255,255,0.8);
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(226,232,240,0.8);
          backdrop-filter: blur(8px);
        }

        .header {
          text-align: left;
        }

        .title {
          font-weight: 700;
          font-size: 1.9rem;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .subtitle {
          color: #64748b;
          margin-top: 4px;
          font-size: 0.95rem;
        }

        .modern-card {
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 1px 2px rgba(16,24,40,0.04);
        }

        .label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input {
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          font-size: 0.9rem;
          padding: 8px 10px;
          transition: all 0.2s ease;
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }

        .clean-header {
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .result-card {
          border: 1px solid #eef2f7;
          border-radius: 12px;
          padding: 14px;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .result-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15,23,42,0.08);
          border-color: #dbeafe;
        }

        .badge-soft {
          font-size: 0.7rem;
          padding: 4px 8px;
          background: #f1f5f9;
          border-radius: 999px;
          color: #334155;
          font-weight: 600;
          text-transform: uppercase;
        }

        .score {
          font-weight: 700;
          color: #2563eb;
        }

        .title-small {
          margin-top: 10px;
          font-weight: 600;
          color: #0f172a;
        }

        .salary {
          margin-top: 6px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .muted {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
