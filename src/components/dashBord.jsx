import React, { useEffect, useState } from "react";
import { superbase } from "../superbaseAuth/superbaseClient";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DashBord() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: false,
      });
    }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await superbase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = superbase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        Please sign in to access your dashboard
      </div>
    );
  }

  const user = session.user;
  const userName =
    user.user_metadata?.name || user.email?.split("@")[0] || "User";
  const userEmail = user.email || "No email provided";
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    "https://www.gravatar.com/avatar/default?s=200&d=mp";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-fuchsia-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <h1 className="text-xl font-bold text-fuchsia-300">Dashboard  <span className="font-bold text-fuchsia-600 ">Fl/EP</span></h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Left Sidebar - User Profile with Video Background */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-80 fixed md:relative z-20 md:z-0 left-0 top-0 h-full overflow-hidden bg-gray-800 md:bg-transparent`}
        data-aos="flip-right">
        {/* Video Background - Hidden on mobile, shown on md and up */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 hidden md:block"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-grid-with-lines-17345-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col p-4 md:p-8 bg-gradient-to-b from-fuchsia-900/30 to-purple-900/30 md:backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <img
              src={avatarUrl}
              alt="profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 border-4 border-fuchsia-400/50 shadow-lg transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://www.gravatar.com/avatar/default?s=200&d=mp";
              }}
            />
            <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-1">
              {userName}
            </h2>
            <p className="text-sm md:text-base text-fuchsia-200 mb-6">
              {userEmail}
            </p>
          </div>

          <nav className="flex-1 flex flex-col space-y-2 md:space-y-4">
            <Link
              to="/about"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="mt-auto md:mt-24">
            <button className="w-full py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:opacity-90">
              Account Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-4 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-fuchsia-900/80 to-purple-900/80 rounded-2xl p-6 md:p-8 mb-6 md:mb-10 shadow-lg backdrop-blur-sm border border-fuchsia-400/20"
          data-aos="fade-down-left"
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300">
              Welcome, {userName}!
            </h1>
            <p className="text-base md:text-xl leading-relaxed text-fuchsia-100">
              You've arrived at your ultimate web development learning portal!
              Master both frontend and backend technologies through our
              comprehensive courses, hands-on projects, and expert mentorship.
              Ready to level up your skills? Enroll now and start your journey!
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-fuchsia-700 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                <Link to="/courses">Explore Courses</Link>
              </button>
              <button className="border-2 border-fuchsia-300 text-fuchsia-300 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-fuchsia-800/30 transition-colors">
                <Link to="/blog">Learning Paths</Link>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10"
          data-aos="fade-up-right"
          >
            <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
                Courses Available
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">24+</p>
            </div>
            <div className="bg-purple-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-purple-300 text-base md:text-lg mb-2">
                Students Enrolled
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">1.2K+</p>
            </div>
            <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
                Hours of Content
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">300+</p>
            </div>
          </div>

          {/* Featured Courses */}
          <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl border border-fuchsia-400/10"
          data-aos="zoom-in-down"
          >
            <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-4 md:mb-6">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-fuchsia-900/50 to-purple-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Modern Frontend
                </h3>
                <p className="text-fuchsia-200 mb-3 md:mb-4">
                  React, Next.js, Tailwind CSS
                </p>
                <button className="text-fuchsia-300 hover:text-white text-sm font-medium">
                  <Link to="/courses">View Details →</Link>
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Backend Mastery
                </h3>
                <p className="text-purple-200 mb-3 md:mb-4">
                  Node.js, Express, Databases
                </p>
                <button className="text-purple-300 hover:text-white text-sm font-medium">
                  <Link to="/courses">View Details →</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
