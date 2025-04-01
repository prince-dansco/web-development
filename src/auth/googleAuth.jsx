import { useState, useEffect } from "react";
import { superbase } from "../superbaseAuth/superbaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

export default function GoogleApp() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    superbase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate("/dashBoard");
    });
    const {
      data: { subscription },
    } = superbase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN") {
        navigate("/dashBoard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!session) {
    return (
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md p-1">
          <Auth
            supabaseClient={superbase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            onlyThirdPartyProviders={true}
            redirectTo={window.location.origin + "/dashBoard"}
            magicLink={false}
          />
        </div>
      </div>
    );
  }

  return null;
}
