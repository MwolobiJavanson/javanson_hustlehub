import React from "react";

function AboutComponent() {
  return (
    <div className="container my-5">
      {/* Hero Section - Text Centered */}
      <div className="text-center py-5 bg-light rounded-5 shadow-sm mb-5 px-3">
        <span className="badge bg-success mb-3 px-3 py-2 rounded-pill">Since 2024</span>
        <h1 className="display-4 fw-bold text-dark mb-3">
          The Future of <span className="text-success">Hiring in Kenya</span>
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          We’ve removed the complexity from the job search. No more endless paperwork—just 
          a direct, secure connection between the best talent and the best companies.
        </p>
        <div className="mt-4">
          <button className="btn btn-success btn-lg px-5 fw-bold shadow-sm me-2">Browse Jobs</button>
          <button className="btn btn-outline-dark btn-lg px-5 fw-bold">Post a Job</button>
        </div>
      </div>

      {/* Statistics Row - Using Colored Borders instead of images */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-start border-success border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-success mb-1">10,000+</h2>
            <p className="text-muted mb-0 fw-medium">Qualified Candidates</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-start border-primary border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-primary mb-1">500+</h2>
            <p className="text-muted mb-0 fw-medium">Verified Employers</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-start border-warning border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-warning mb-1">24/7</h2>
            <p className="text-muted mb-0 fw-medium">Active Support</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="row py-5 align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
            <div className="fs-1 mb-3">🎯</div>
            <h3 className="fw-bold text-success">Our Mission</h3>
            <p className="text-muted">
              To empower every professional in East Africa by providing a transparent 
              recruitment ecosystem where merit meets opportunity. We aim to reduce 
              unemployment by making job discovery as simple as a single click.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
            <div className="fs-1 mb-3">🚀</div>
            <h3 className="fw-bold text-success">Our Vision</h3>
            <p className="text-muted">
              To be the most trusted career partner in the region. We envision a world 
              where hiring is data-driven, secure, and accessible to everyone, 
              regardless of their location or background.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us - Icon Grid */}
      <div className="bg-dark text-white rounded-5 p-5 mt-5 shadow-lg">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Use JobPortal?</h2>
          <p className="text-success fw-bold text-uppercase small ls-2">The Digital Advantage</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3" style={{ width: '80px', height: '80px', lineHeight: '50px' }}>
              <span className="fs-2">💸</span>
            </div>
            <h5 className="fw-bold">Seamless M-Pesa</h5>
            <p className="small text-secondary">Instant fee processing and automatic application status updates.</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3" style={{ width: '80px', height: '80px', lineHeight: '50px' }}>
              <span className="fs-2">🔍</span>
            </div>
            <h5 className="fw-bold">Smart Search</h5>
            <p className="small text-secondary">Find the exact role you want with our advanced filtering and sorting system.</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3" style={{ width: '80px', height: '80px', lineHeight: '50px' }}>
              <span className="fs-2">📱</span>
            </div>
            <h5 className="fw-bold">Mobile First</h5>
            <p className="small text-secondary">Fully responsive design so you can apply for jobs on the go, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutComponent;