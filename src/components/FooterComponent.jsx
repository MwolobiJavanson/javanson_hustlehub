import React from "react";
import { Link } from "react-router-dom";

function FooterComponent() {
  // This helper function ensures that when a link is clicked,
  // the page scrolls back to the top automatically.
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-success">
              JobhubPortal
            </h5>
            <p className="small text-muted">
              Connecting talented professionals with their dream careers in
              Kenya. Find your next opportunity or hire the best talent today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-success">
              Quick Links
            </h5>
            {/* Added onClick to reset scroll position when navigating */}
            <p>
              <Link
                to="/"
                onClick={scrollToTop}
                className="text-white text-decoration-none small"
              >
                Home
              </Link>
            </p>
            <p>
              <Link
                to="/get_job"
                onClick={scrollToTop}
                className="text-white text-decoration-none small"
              >
                Browse Jobs
              </Link>
            </p>
            <p>
              <Link
                to="/about"
                onClick={scrollToTop}
                className="text-white text-decoration-none small"
              >
                About Us
              </Link>
            </p>
            <p>
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="text-white text-decoration-none small"
              >
                Contact
              </Link>
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-success">
              Contact
            </h5>
            <p className="small">
              <i className="fas fa-home me-2 text-success"></i> Nairobi, Kenya
            </p>
            <p className="small">
              <i className="fas fa-envelope me-2 text-success"></i>{" "}
              support@jobhubportal.co.ke
            </p>
            <p className="small">
              <i className="fas fa-phone me-2 text-success"></i> +254 700 000
              000
            </p>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-success">
              Newsletter
            </h5>
            <div className="input-group mb-3 shadow-sm">
              <input
                type="email"
                className="form-control border-success bg-transparent text-white"
                placeholder="Your Email"
              />
              <button className="btn btn-success fw-bold" type="button">
                Join
              </button>
            </div>
          </div>
        </div>

        <hr className="mb-4 opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="small text-muted">
              <strong className="text-success">
                <marquee>© All rights reserved by: Javanson mwolobi</marquee>
              </strong>
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-white ms-3 fs-5">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white ms-3 fs-5">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white ms-3 fs-5">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
