import { Routes, Route, Navigate } from "react-router-dom";
import SignupComponent from "./components/SignupComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import DashboardComponent from "./components/DashboardComponent.jsx";
import JobListComponent from "./components/JobListComponent.jsx";
import PostJobComponent from "./components/PostJobComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import "./App.css";


function Layout({ children }) {
  return (
    <>
      
      <main>{children}</main>
      <FooterComponent />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Auth pages usually don't have the main Navbar */}
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/signup" element={<SignupComponent />} />

      {/* Wrap all other pages in the Layout */}
      <Route path="/dashboard" element={<Layout><DashboardComponent /></Layout>} />
      <Route path="/get_job" element={<Layout><JobListComponent /></Layout>} />
      <Route path="/jobs" element={<Layout><JobListComponent /></Layout>} />
      <Route path="/post_job" element={<Layout><PostJobComponent /></Layout>} />

      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
}

export default App;