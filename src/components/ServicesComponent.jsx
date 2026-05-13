import React, { useState, useEffect } from "react";
import { api } from "../api";
import NavbarComponent from "./NavbarComponent";

// removed axios.defaults.withCredentials to avoid sending credentials by default

export default function ServicesComponent() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    phone: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      if (!user || !user.user_id) {
        setMessage("Please login to add a service.");
        setLoading(false);
        return;
      }

      const data = new FormData();
      // backend expects provider_id, title, description, price
      data.append("provider_id", user.user_id);
      data.append("title", form.name);
      data.append("description", form.description);
      data.append("price", form.type || "");

      await api.post("/api/services", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Service added successfully.");
      setForm({ name: "", type: "", phone: "", location: "", description: "" });
      fetchServices();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Unable to add service.");
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
              <p className="text-uppercase text-muted small mb-2">Services</p>
              <h1 className="display-5 fw-bold">Business Services</h1>
              <p className="text-muted mb-0">
                Add and browse active services available to the community.
              </p>
            </div>
          </div>

          {message && (
            <div className="alert alert-success small fw-semibold" role="alert">
              {message}
            </div>
          )}

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-3">Add a New Service</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Service Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Digital Marketing"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Category
                    </label>
                    <input
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Consultancy"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. +254700000000"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Location
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Nairobi"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Brief service description"
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-4 py-2"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Add Service"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div
                      className="col-12"
                      key={service.service_id || service.id || service.title}
                    >
                      <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h5 className="fw-bold mb-1">{service.title}</h5>
                            <p className="text-muted small mb-1">
                              {service.description}
                            </p>
                          </div>
                          <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill py-2 px-3">
                            KES {service.price || ""}
                          </span>
                        </div>
                        <p className="text-muted small mb-2">
                          {service.description}
                        </p>
                        <div className="d-flex flex-wrap gap-2 small text-muted">
                          <span>{service.location || ""}</span>
                          <span>{service.phone || ""}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 p-4 text-center text-muted">
                      No services found yet.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
