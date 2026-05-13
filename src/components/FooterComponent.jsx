import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { FiMail } from "react-icons/fi";

const primaryLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Browse Jobs", to: "/jobs" },
  { label: "Post a Job", to: "/post_job" },
  { label: "Services", to: "/services" },
];

const supportLinks = [
  { label: "About Fixmtaa", to: "/about" },
  { label: "Contact Support", to: "/contact" },
  { label: "Reports", to: "/reports" },
  { label: "Skills", to: "/skills" },
];

function FooterComponent() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const protectedRoutes = [
    "/dashboard",
    "/jobs",
    "/post_job",
    "/services",
    "/reports",
    "/skills",
    "/stats",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAuthenticated = () => {
    try {
      return !!JSON.parse(localStorage.getItem("user") || "null");
    } catch (err) {
      return false;
    }
  };

  const renderLink = (link) => (
    <li className="mb-2" key={link.to}>
      <Link
        to={link.to}
        onClick={(e) => {
          // If the route is protected and user is not authenticated, send them to login
          if (protectedRoutes.includes(link.to) && !isAuthenticated()) {
            e.preventDefault();
            // navigate to login and include intended destination in state
            navigate("/login", { state: { redirectTo: link.to } });
            return;
          }

          scrollToTop();
        }}
        className="text-white-50 text-decoration-none"
      >
        {link.label}
      </Link>
    </li>
  );

  return (
    <footer className="bg-dark bg-gradient text-white pt-5 navbar-modern">
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-lg-4">
            <Link
              to="/dashboard"
              onClick={scrollToTop}
              className="d-inline-flex align-items-center text-white text-decoration-none mb-3"
            >
              <BrandLogo size={42} textClassName="h4 text-white mb-0 fw-bold" />
            </Link>
            <p className="text-white-50 mb-4" style={{ maxWidth: 420 }}>
              Connecting local talent, employers, and service providers with a
              simple hiring experience built for Kenya.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold px-3 py-2">
                Jobs
              </span>
              <span className="badge rounded-pill bg-success-subtle text-success fw-bold px-3 py-2">
                Services
              </span>
              <span className="badge rounded-pill text-bg-light px-3 py-2 text-dark">
                M-Pesa Ready
              </span>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="h6 text-uppercase fw-bold mb-3">Platform</h2>
            <ul className="list-unstyled mb-0">
              {primaryLinks.map(renderLink)}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="h6 text-uppercase fw-bold mb-3">Support</h2>
            <ul className="list-unstyled mb-0">
              {supportLinks.map(renderLink)}
            </ul>
          </div>

          <div className="col-lg-4">
            <h2 className="h6 text-uppercase fw-bold mb-3">Get Help</h2>
            <div className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-4 p-4">
              <p className="text-white-50 small mb-3">
                Need help with an account, payment, job post, or application?
                Reach the support team and we will guide you through it.
              </p>
              <div className="d-grid gap-2">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-modern btn-primary-custom rounded-4 fw-bold shadow-sm hover\:scale"
                >
                  <FiMail className="me-2" /> Contact Support
                </Link>
                <a
                  href="mailto:support@fixmtaa.co.ke"
                  className="text-white-50 text-decoration-none small text-center"
                >
                  support@fixmtaa.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-white border-opacity-10 py-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="small text-white-50 mb-0">
            Copyright {year} Fixmtaa. All rights reserved.
          </p>
          <p className="small text-white-50 mb-0">Built by Javanson Mwolobi</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
