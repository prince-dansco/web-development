import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { superbase } from "../superbaseAuth/superbaseClient";
import { Toaster, toast } from "react-hot-toast";
// import { ColorRing } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });


  useEffect(() => {
          AOS.init({
            duration: 800,
            easing: "ease-out",
            once: false,
          });
        }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    setIsLoading(true);
    try {
      const { data: signUpData, error } =
        await superbase.auth.signInWithPassword({
          email,
          password,
        });
      if (error) {
        toast.error(error.message);
      } else if (signUpData) {
        toast.success("Password updated successfully!");
        reset();
        navigate("/dashBoard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=""
    data-aos="zoom-in-down"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold text-center">
            Login to your acccount.
          </h2>
          <p className="mb-5 text-center text-fuchsia-400">
            Its great to see you again.
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.email
                    ? "border-red-500"
                    : isValid
                    ? "border-fuchsia-500"
                    : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {/* Icon */}
              {!errors.email && isValid && (
                <FaCircleCheck
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500"
                  size={20}
                />
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-fuchsia-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-fuchsia-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <p className="text-sm md:text-base font-normal">
              forgot your password?{" "}
              <Link to="/forgettedPassword">
                {" "}
                <span className="underline font-medium text-fuchsia-400">
                  Reset your password
                </span>
              </Link>
            </p>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Processing...
            </>
            ) : (
              "Login"
            )}
          </button>
          <p className=" text-base my-3">
            Don't have an account{" "}
            <Link to="/signUp" className="text-fuchsia-500 underline text-lg">
              Join
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
