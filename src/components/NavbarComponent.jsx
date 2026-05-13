import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";

// removed axios.defaults.withCredentials to avoid sending credentials by default

function NavbarComponent() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menuSections = [
    {
      title: "Work",
      links: [
        { label: "Browse Jobs", description: "Find open roles", to: "/jobs" },
        {
          label: "Post a Job",
          description: "Create a new listing",
          to: "/post_job",
        },
        {
          label: "Services",
          description: "View available support",
          to: "/services",
        },
      ],
    },
    {
      title: "Insights",
      links: [
        {
          label: "Reports",
          description: "Review platform updates",
          to: "/reports",
        },
        { label: "Skills", description: "Manage skill areas", to: "/skills" },
        { label: "Stats", description: "Track activity metrics", to: "/stats" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "About", description: "Learn about Fixmtaa", to: "/about" },
        { label: "Contact", description: "Reach support", to: "/contact" },
      ],
    },
  ];

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/logout");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-dark navbar-modern shadow-sm py-3 sticky-top">
      <div className="container position-relative">
        <div className="d-flex align-items-center">
          <div className="me-2 text-white" style={{ fontSize: 22 }}>
            <FiUser />
          </div>
          <div>
            <div className="fw-bold text-white">{user.username || "User"}</div>
            <small className="text-white-50">
              {user.email || "email@example.com"}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-danger btn-modern rounded-pill px-4 fw-semibold shadow-sm hover\:scale"
            onClick={handleLogout}
          >
            <FiLogOut className="me-2" /> Logout
          </button>

          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarcollapse"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <FiMenu className="text-white" />
          </button>
        </div>

        {menuOpen && (
          <div
            className="position-absolute end-0 top-100 navbar-modern rounded-4 shadow-lg mt-2 p-3 border-0"
            id="navbarcollapse"
            style={{
              width: 320,
              zIndex: 1050,
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <div className="d-flex align-items-start justify-content-between border-bottom border-white border-opacity-10 pb-2 mb-2">
              <div>
                <p
                  className="text-uppercase text-white-50 fw-bold mb-1"
                  style={{ fontSize: 11 }}
                >
                  Navigation
                </p>
                <h2 className="fw-bold mb-0" style={{ fontSize: 14 }}>
                  Where would you like to go?
                </h2>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close menu"
                onClick={closeMenu}
              ></button>
            </div>

            <Link
              className="d-block text-white text-decoration-none rounded-3 p-3 mb-3 bg-primary bg-opacity-90 shadow-md hover\:glow hover\:scale"
              to="/post_job"
              onClick={closeMenu}
            >
              <span className="d-block fw-bold" style={{ fontSize: 14 }}>
                Post a Job
              </span>
              <span className="d-block text-white-50" style={{ fontSize: 12 }}>
                Start a new hiring request
              </span>
            </Link>

            {menuSections.map((section) => (
              <div className="mb-3" key={section.title}>
                <p
                  className="text-uppercase text-white-50 fw-bold mb-2"
                  style={{ fontSize: 11 }}
                >
                  {section.title}
                </p>
                <ul className="list-unstyled mb-0 d-grid gap-1">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        className="d-flex align-items-center justify-content-between text-white text-decoration-none rounded-3 px-2 py-1 bg-white bg-opacity-10 border border-white border-opacity-10 hover\:glow hover\:scale"
                        to={link.to}
                        onClick={closeMenu}
                      >
                        <span>
                          <span
                            className="d-block fw-semibold"
                            style={{ fontSize: 13 }}
                          >
                            {link.label}
                          </span>
                          <span
                            className="d-block text-white-50"
                            style={{ fontSize: 11 }}
                          >
                            {link.description}
                          </span>
                        </span>
                        <span className="text-white-50 small">&rsaquo;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarComponent;
