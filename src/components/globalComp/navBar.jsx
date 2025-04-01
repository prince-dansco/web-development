// import React, { useState } from "react";
// import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
// import { Link, NavLink } from "react-router-dom";
// import { navList } from "../../const/constDataNav";

// export default function NavBar() {
//   const [toggle, setToggle] = useState(false);

//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   return (
//     <div>
//       <div className="md:px-32 px-2 py-5 flex items-center  justify-between fixed top-0 w-full bg-white opacity-75">
//         {/* Logo */}
//         <div className="flex items-center gap-1 md:gap-3 cursor-pointer">
//           <FaShopify size={35} className="text-fuchsia-600" />
//           <h1 className="font-bold font-sans text-2xl text-gray-700">
//             Enterprise <span className="text-fuchsia-600">plc</span>
//           </h1>
//         </div>

//         {/* Navigation Links (Hidden on Mobile) */}
//         <div className="hidden md:flex items-center gap-3 font-semibold font-sans text-lg">
//           {navList.map((link, index) => (
//             <NavLink
//               key={index}
//               to={link.href}
//               className={({ isActive }) =>
//                 `text-gray-700 hover:bg-slate-400 px-4 py-2 rounded-full ${
//                   isActive ? "bg-fuchsia-400 text-white" : ""
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>

//         {/* Login Button (Hidden on Mobile) */}
//         <div className="hidden md:block">
//           <button className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white">
//             <Link to='/signIn'>Login</Link>
//           </button>
//         </div>

//         {toggle && (
//           <div className="md:hidden absolute top-16 left-0 w-full bg-fuchsia-100 text-black py-4 z-50 flex flex-col items-center text-center gap-4 shadow-lg">
//             {navList.map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link.href}
//                 className={({ isActive }) =>
//                   `px-4 py-2 text-gray-700 font-semibold text-base hover:bg-slate-400 rounded-full ${
//                     isActive ? "bg-fuchsia-400 text-white" : ""
//                   }`
//                 }
//                 onClick={handleToggle}
//               >
//                 {link.label}
//               </NavLink>
//             ))}

//             {/* Login Button in Mobile Menu */}
//             <button
//               className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white mt-4"
//               onClick={handleToggle}
//             >
//               Login
//             </button>
//           </div>
//         )}
//         {/* Mobile Toggle Button */}
//         <div className="md:hidden block" onClick={handleToggle}>
//           {!toggle ? (
//             <FaBars size={30} className="text-fuchsia-500" />
//           ) : (
//             <FaTimes size={30} className="text-fuchsia-500" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navList } from "../../const/constDataNav";
import { superbase } from "../../superbaseAuth/superbaseClient";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await superbase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const signOut = async () => {
    const { error } = await superbase.auth.signOut();
    if (error) throw error;
    setIsLoggedIn(false); 
    navigate("/signIn"); 
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="md:px-32 px-2 py-5 flex items-center justify-between fixed top-0 w-full bg-white opacity-75">
        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-3 cursor-pointer">
          <FaShopify size={35} className="text-fuchsia-600" />
          <h1 className="font-bold font-sans text-2xl text-gray-700">
            Enterprise <span className="text-fuchsia-600">plc</span>
          </h1>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-3 font-bold font-sans text-lg">
          {navList.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) =>
                `text-fuchsia-800 hover:bg-fuchsia-400 hover:text-white px-4 py-2 rounded-full ${
                  isActive ? "bg-fuchsia-400 text-white" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Login/Logout Button (Hidden on Mobile) */}
        <div className="hidden md:block">
          <button
            className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white"
            onClick={isLoggedIn ? signOut : undefined}
          >
            <Link to={isLoggedIn ? "#" : "/signIn"}>
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
          </button>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-fuchsia-100 text-black py-4 z-50 flex flex-col items-center text-center gap-4 shadow-lg">
            {navList.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-2 text-gray-700 font-semibold text-base hover:bg-slate-400 rounded-full ${
                    isActive ? "bg-fuchsia-400 text-white" : ""
                  }`
                }
                onClick={handleToggle}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Login/Logout Button in Mobile Menu */}
            <button
              className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white mt-4"
              onClick={isLoggedIn ? signOut : handleToggle}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}

        {/* Mobile Toggle Button */}
        <div className="md:hidden block" onClick={handleToggle}>
          {!toggle ? (
            <FaBars size={30} className="text-fuchsia-500" />
          ) : (
            <FaTimes size={30} className="text-fuchsia-500" />
          )}
        </div>
      </div>
    </div>
  );
}
