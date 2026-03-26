import React from "react";

function FeaturedCompaniesComponent() {
  const companies = [
    {
      id: 1,
      name: "Safaricom",
      sector: "Telecommunications",
      icon: "📲",
      bgColor: "honeydew",
      textColor: "seagreen",
    },
    {
      id: 2,
      name: "KCB Bank",
      sector: "Banking & Finance",
      icon: "🦁",
      bgColor: "lightyellow",
      textColor: "goldenrod",
    },
    {
      id: 3,
      name: "Equity Group",
      sector: "Financial Services",
      icon: "🏠",
      bgColor: "snow",
      textColor: "darkred",
    },
    {
      id: 4,
      name: "Andela",
      sector: "Tech & Software",
      icon: "💻",
      bgColor: "aliceblue",
      textColor: "royalblue",
    },
    {
      id: 5,
      name: "Kenya Airways",
      sector: "Aviation",
      icon: "✈️",
      bgColor: "whitesmoke",
      textColor: "darkslategray",
    },
    {
      id: 6,
      name: "Jumia Kenya",
      sector: "E-commerce",
      icon: "🛒",
      bgColor: "oldlace",
      textColor: "chocolate",
    },
  ];

  return (
    <div className="container my-5 py-4">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h6 className="text-success fw-bold text-uppercase mb-2">
          Trusted Partnerships
        </h6>
        <h2 className="fw-bold text-dark">Top Companies Hiring Now</h2>
        <div
          className="mx-auto bg-success mt-2"
          style={{ width: "50px", height: "3px" }}
        ></div>
      </div>

      <div className="row g-4 justify-content-center">
        {companies.map((company) => (
          <div key={company.id} className="col-6 col-md-4 col-lg-2">
            <div
              className="card h-100 border-0 shadow-sm text-center p-3 bg-white"
              style={{ borderRadius: "15px" }}
            >
              {/* Icon Container using Color Names */}
              <div
                className="mx-auto d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: company.bgColor,
                  borderRadius: "12px",
                  fontSize: "1.8rem",
                }}
              >
                {company.icon}
              </div>

              <h6
                className="fw-bold mb-1 small"
                style={{ color: company.textColor }}
              >
                {company.name}
              </h6>
              <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                {company.sector}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="text-center mt-5">
        <p className="text-muted small">
          Are you an employer?
          <a
            href="/post_job"
            className="text-success fw-bold text-decoration-none ms-2"
          >
            Join these industry leaders to post your job
          </a>
        </p>
      </div>
    </div>
  );
}

export default FeaturedCompaniesComponent;
