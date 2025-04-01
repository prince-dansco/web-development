     
import { useState, useEffect } from "react";
import { superbase } from "../superbaseAuth/superbaseClient";
import { useNavigate, Navigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

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

  // if (loading) {
  //   return <div>Loading...</div>;
  //   render(<ColorRing
  //     visible={true}
  //     height="80"
  //     width="80"
  //     ariaLabel="color-ring-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="color-ring-wrapper"
  //     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //     />)
  // }


  if (loading) {
    // Render the spinner while loading
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height={80}
          width={80}
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/signIn" replace />; 
}

export default Wrapper;