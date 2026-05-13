import { Routes, Route, Navigate } from "react-router-dom";
import SignupComponent from "./components/SignupComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import DashboardComponent from "./components/DashboardComponent.jsx";
import JobListComponent from "./components/JobListComponent.jsx";
import PostJobComponent from "./components/PostJobComponent.jsx";
import ServicesComponent from "./components/ServicesComponent.jsx";
import ReportsComponent from "./components/ReportsComponent.jsx";
import SkillsComponent from "./components/SkillsComponent.jsx";
import StatsComponent from "./components/StatsComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import AboutComponent from "./components/AboutComponent.jsx";
import ContactComponent from "./components/ContactComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import MpesaPaymentComponent from "./components/MpesaPaymentComponent.jsx";
// SplashComponent intentionally unused here
import LogoutComponent from "./components/LogoutComponent.jsx";
import SplashComponent from "./components/SplashComponent.jsx";
import "./App.css";

// withCredentials removed — requests will use default credential handling

const isAuthenticated = () => {
  try {
    return !!JSON.parse(localStorage.getItem("user") || "null");
  } catch (err) {
    return false;
  }
};

function PageWithFooter({ children }) {
  return (
    <>
      {children}
      <FooterComponent />
    </>
  );
}

function StandalonePage({ children }) {
  return (
    <PageWithFooter>
      <NavbarComponent />
      {children}
    </PageWithFooter>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashComponent />} />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate replace to="/dashboard" />
          ) : (
            <LoginComponent />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated() ? (
            <Navigate replace to="/dashboard" />
          ) : (
            <SignupComponent />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <DashboardComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route path="/logout" element={<LogoutComponent />} />
      <Route
        path="/get_job"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <JobListComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/jobs"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <JobListComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/post_job"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <PostJobComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/mpesa-payment"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <MpesaPaymentComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/services"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <ServicesComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/reports"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <ReportsComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/skills"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <SkillsComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/stats"
        element={
          isAuthenticated() ? (
            <PageWithFooter>
              <StatsComponent />
            </PageWithFooter>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="/about"
        element={
          <StandalonePage>
            <AboutComponent />
          </StandalonePage>
        }
      />
      <Route
        path="/contact"
        element={
          <StandalonePage>
            <ContactComponent />
          </StandalonePage>
        }
      />
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate replace to="/dashboard" />
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
