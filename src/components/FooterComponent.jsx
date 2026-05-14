import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

function FooterComponent() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiFacebook size={20} />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FiTwitter size={20} />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FiInstagram size={20} />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FiLinkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Brand and Description */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <Link to="/" className="d-inline-flex align-items-center text-white text-decoration-none mb-3">
              <BrandLogo size={40} textClassName="h4 text-white mb-0 fw-bold" />
              <span className="ms-2 h4 mb-0 fw-bold">JobHub</span>
            </Link>
            <p className="text-white-50 mb-0" style={{ maxWidth: "400px" }}>
              Connecting local talent and employers with a simple hiring experience. 
              Find your next opportunity or hire the best talent today.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="col-lg-3 mb-4 mb-lg-0 text-lg-center">
            <h6 className="text-uppercase fw-bold mb-3 small opacity-75">Follow Us</h6>
            <div className="d-flex justify-content-lg-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white-50 hover-white transition"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="col-lg-4 text-lg-end">
            <a href="mailto:support@jobhub.com" className="btn btn-outline-light rounded-pill px-4">
              <FiMail className="me-2" /> Contact Support
            </a>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-25" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="small text-white-50 mb-0">
            © {year} JobHub. All rights reserved.
          </p>
          <p className="small text-white-50 mb-0">
            Developed by <span className="text-white">Deng Khot</span>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-white:hover { color: #fff !important; transform: translateY(-2px); }
        .transition { transition: all 0.2s ease-in-out; }
      `}} />
    </footer>
  );
}

export default FooterComponent;