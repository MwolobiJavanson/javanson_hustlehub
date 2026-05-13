import React, { useState, useEffect } from "react";
import { api } from "../api";
import NavbarComponent from "./NavbarComponent";

// removed axios.defaults.withCredentials to avoid sending credentials by default

export default function StatsComponent() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, reports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/stats");
        setStats(res.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid min-vh-100 bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2">Stats</p>
            <h1 className="display-5 fw-bold">Platform Overview</h1>
            <p className="text-muted mb-0">
              Live counts for users, jobs and reports.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              [
                {
                  label: "Registered Users",
                  value: stats.users,
                  icon: "👥",
                  color: "#cfe2ff",
                },
                {
                  label: "Jobs Posted",
                  value: stats.jobs,
                  icon: "💼",
                  color: "#d1e7dd",
                },
                {
                  label: "Reports Submitted",
                  value: stats.reports,
                  icon: "🚨",
                  color: "#fff3cd",
                },
              ].map((card) => (
                <div className="col-sm-6 col-xl-4" key={card.label}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <p className="text-uppercase text-muted small mb-2">
                            {card.label}
                          </p>
                          <h2 className="fw-bold mb-0">{card.value}</h2>
                        </div>
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: 56,
                            height: 56,
                            backgroundColor: card.color,
                          }}
                        >
                          <span className="fs-4">{card.icon}</span>
                        </div>
                      </div>
                      <p className="text-muted small mb-0"></p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
