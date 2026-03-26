import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import MpesaPaymentComponent from "./components/MpesaPaymentComponent";
import NavbarComponent from "./components/NavbarComponent";
import PostJobComponent from "./components/PostJobComponent";
import JobListComponent from "./components/JobListComponent";
import FooterComponent from "./components/FooterComponent";
import AboutComponent from "./components/AboutComponent";
import ContactComponent from "./components/ContactComponent";
import FeaturedCompaniesComponent from "./components/FeaturedCompanyComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <header className="App-header">
          <FeaturedCompaniesComponent />
        </header>

        <div className="container mt-4" style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/about" element={<AboutComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/payment" element={<MpesaPaymentComponent />} />
            <Route path="/post_job" element={<PostJobComponent />} />
            <Route path="/get_job" element={<JobListComponent />} />
            <Route
              path="/featured_companies"
              element={<FeaturedCompaniesComponent />}
            />
          </Routes>
        </div>

        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
