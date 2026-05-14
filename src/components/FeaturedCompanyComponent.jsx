import React from "react";
import { Link } from "react-router-dom";
import {
  FiGlobe,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiZap,
  FiShield,
} from "react-icons/fi";

function FeaturedCompaniesComponent() {
  const companies = [
    {
      id: 1,
      name: "Google",
      sector: "Cloud & AI",
      icon: <FiCloud />,
      bgColor: "aliceblue",
      textColor: "#4285F4",
    },
    {
      id: 2,
      name: "Microsoft",
      sector: "Software Dev",
      icon: <FiCode />,
      bgColor: "ghostwhite",
      textColor: "#00A4EF",
    },
    {
      id: 3,
      name: "Amazon",
      sector: "E-commerce & AWS",
      icon: <FiGlobe />,
      bgColor: "oldlace",
      textColor: "#FF9900",
    },
    {
      id: 4,
      name: "Apple",
      sector: "Hardware & iOS",
      icon: <FiSmartphone />,
      bgColor: "whitesmoke",
      textColor: "#555555",
    },
    {
      id: 5,
      name: "Tesla",
      sector: "Energy & Auto",
      icon: <FiZap />,
      bgColor: "lavenderblush",
      textColor: "#E31937",
    },
    {
      id: 6,
      name: "Meta",
      sector: "Social Technology",
      icon: <FiShield />,
      bgColor: "honeydew",
      textColor: "#0668E1",
    },
  ];

  return (
    <div className="container my-5 py-4">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h6 className="text-primary fw-bold text-uppercase mb-2">
          Global Opportunities
        </h6>
        <h2 className="fw-bold text-dark">Top Companies Hiring Now</h2>
        <div
          className="mx-auto bg-primary mt-2"
          style={{ width: "50px", height: "3px" }}
        ></div>
      </div>

      <div className="row g-4 justify-content-center">
        {companies.map((company) => (
          <div key={company.id} className="col-6 col-md-4 col-lg-2">
            <Link
              to={`/jobs?company_id=${company.id}`}
              className="text-decoration-none"
              aria-label={`View jobs at ${company.name}`}
            >
              <div
                className="card h-100 border-0 shadow-sm text-center p-3 bg-white hover-up"
                style={{ borderRadius: "15px", transition: "transform 0.3s ease" }}
              >
                {/* Icon Container */}
                <div
                  className="mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: company.bgColor,
                    borderRadius: "12px",
                    fontSize: "1.8rem",
                    color: company.textColor,
                  }}
                >
                  {company.icon}
                </div>

                <h6 className="fw-bold mb-1 small text-dark">
                  {company.name}
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                  {company.sector}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="text-center mt-5">
        <p className="text-muted small">
          Are you an employer?
          <Link
            to="/post_job"
            className="text-primary fw-bold text-decoration-none ms-2"
          >
            Join these industry leaders to post your job
          </Link>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-up:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}} />
    </div>
  );
}

export default FeaturedCompaniesComponent;