import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import MpesaPaymentComponent from "./components/MpesaPaymentComponent";
import NavbarComponent from "./components/NavbarComponent";
// import DashboardComponent from "/DashboardComponent";
import PostJobComponent from "./components/PostJobComponent";
import JobListComponent from "./components/JobListComponent";

function App() {
  return (
    <header className="App-header">
      <BrowserRouter>
        <NavbarComponent />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<LoginComponent />} />

            <Route path="/signup" element={<SignupComponent />} />
            {/* <Route path="/dashboard" element={<DashboardComponent />} /> */}
            <Route path="/payment" element={<MpesaPaymentComponent />} />
            <Route path="/post_job" element={<PostJobComponent />} />
            <Route path="/get_job" element={<JobListComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </header>
  );
}
export default App;
