import { useState, useEffect } from "react";
import { superbase } from "../superbaseAuth/superbaseClient";
import { useNavigate, Navigate } from "react-router-dom";
// import { ColorRing } from "react-loader-spinner";

function Wrapper({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await superbase.auth.getSession();

        setAuthenticated(!!session);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);
  if (loading) {
    // Render the spinner while loading
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-20 h-20">
          {/* Multi-colored spinner that mimics ColorRing */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-fuchsia-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-amber-500 animate-spin animation-delay-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-emerald-500 animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-rose-500 animate-spin animation-delay-300"></div>
        </div>
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/signIn" replace />;
}

export default Wrapper;
