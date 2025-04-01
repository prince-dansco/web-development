// import { Outlet, useLocation } from "react-router-dom";
// import NavBar from "../components/globalComp/navBar";
// import FooterPage from "../components/globalComp/footerPage";

// export default function Layout() {
//   const location = useLocation();

//   // Define routes where the NavBar should not appear
//   const noNavbarRoutes = ["/signIn", "/signUp", "/forgettedPassword","/updatedPassword"];
//   const noFooterRoutes = ["/signIn", "/signUp", "/forgettedPassword","/updatedPassword", "/"];

//   // Check if the current route is in the noNavbarRoutes array
//   const showNavbar = !noNavbarRoutes.includes(location.pathname);
//   const showFooter = !noFooterRoutes.includes(location.pathname)

//   return (
//     <div>
//       {showNavbar && <NavBar />}
//       {showFooter && <FooterPage />}

//       <div className="mt-20">

//       <Outlet />
//       </div>
//     </div>
//   );
// }

import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/globalComp/navBar";
import FooterPage from "../components/globalComp/footerPage";

export default function Layout() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/signIn",
    "/signUp",
    "/forgettedPassword",
    "/updatedPassword",
    "/dashBoard",
    "/"
  ];
  const noFooterRoutes = [
    "/signIn",
    "/signUp",
    "/forgettedPassword",
    "/updatedPassword",
    "/dashBoard",
    "/",	
  ];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbar && <NavBar />}

      <div className={showNavbar ? "mt-20" : ""}>
        <Outlet />
      </div>

      {showFooter && <FooterPage />}
    </div>
  );
}
