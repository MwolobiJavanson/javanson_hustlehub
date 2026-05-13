import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";

function SplashComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // if user exists in localStorage navigate to dashboard
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user && user.user_id) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        navigate("/login", { replace: true });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="splash-screen">
      <div className="splash-panel">
        <BrandLogo
          size={72}
          showText={false}
          className="mb-4"
          markClassName="rounded-4"
        />
        <div className="splash-copy">
          <p className="splash-kicker">Welcome to Fixmtaa</p>
          <h1>The Future of Ghettos</h1>
          <p className="splash-subtitle">
            Connecting local talent, employers, and services through a smarter
            community-first platform.
          </p>
        </div>
        <div className="splash-progress" aria-hidden="true">
          <span></span>
        </div>
      </div>
    </main>
  );
}

export default SplashComponent;
