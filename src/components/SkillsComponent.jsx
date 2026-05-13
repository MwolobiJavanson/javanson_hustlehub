import React, { useState, useEffect, useCallback } from "react";
import { api } from "../api";
import NavbarComponent from "./NavbarComponent";

// removed axios.defaults.withCredentials to avoid sending credentials by default

export default function SkillsComponent() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?.user_id;

  const fetchSkills = useCallback(async () => {
    try {
      const res = await api.get(`/api/skills`);
      setSkills(
        Array.isArray(res.data)
          ? res.data.filter((s) => s.user_id === userId)
          : [],
      );
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skill) return;

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      // backend expects user_id and name
      data.append("user_id", userId);
      data.append("name", skill);
      data.append("description", "");
      await api.post("/api/skills", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Skill added.");
      setSkill("");
      fetchSkills();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Unable to add skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid min-vh-100 bg-light py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
            <div>
              <p className="text-uppercase text-muted small mb-2">Skills</p>
              <h1 className="display-5 fw-bold">My Skills</h1>
              <p className="text-muted mb-0">
                Add your abilities and keep your profile up to date.
              </p>
            </div>
          </div>

          {!userId ? (
            <div className="alert alert-warning">
              Please log in to manage your skills.
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                  <h5 className="fw-bold mb-3">Add New Skill</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">
                        Skill Name
                      </label>
                      <input
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="form-control"
                        placeholder="e.g. Web development"
                        required
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-4 py-2"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add Skill"}
                    </button>
                    {message && (
                      <p className="mt-3 small text-success">{message}</p>
                    )}
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                  <h5 className="fw-bold mb-3">Your Skills</h5>
                  {skills.length > 0 ? (
                    <div className="row g-3">
                      {skills.map((item, index) => (
                        <div key={item.skill_id || index} className="col-sm-6">
                          <div className="border rounded-4 p-3 bg-white shadow-sm">
                            <p className="mb-1 fw-semibold">
                              {item.name || item.skill_name}
                            </p>
                            <p className="small text-muted mb-0">
                              Added by you
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted py-5">
                      <p className="mb-1">No skills added yet.</p>
                      <p className="small">
                        Add your first skill to show up on your profile.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
