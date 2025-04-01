import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { superbase } from "../superbaseAuth/superbaseClient";
import GoogleApp from "./googleAuth";
import { Toaster, toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Register() {
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


      
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (formData) => {
    const { email, password, userName } = formData;
    setIsLoading(true);
    try {
      const { data: signUpData, error } = await superbase.auth.signUp({
        userName,
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
      } else if (signUpData) {
        toast.success("Password updated successfully!");
        reset();
        setTimeout(() => {
          navigate("/signIn");
        }, 2000);
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
          className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full"
        >
          <div className="">
            <Link to="/">
              <FaArrowLeft size={20} />
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-center ">
            Create an account{" "}
          </h2>
          <p className="mb-5 text-center text-fuchsia-400">
            let create your account
          </p>
          {/*  */}

          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.fullName
                    ? "border-red-500"
                    : isValid
                    ? "border-fuchsia-500"
                    : "border-fuchsia-300"
                }`}
                {...register("fullName", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Z][a-zA-Z\s'-]{4,19}$/,
                    message:
                      "Name must start with a capital letter, contain only letters, spaces, hyphens, or apostrophes, and be 5-20 characters long.",
                  },
                  validate: (value) => {
                    if (value.length < 5 || value.length > 20) {
                      return "Name must be between 5 and 20 characters long.";
                    }
                    return true;
                  },
                })}
              />
              {/* Icon */}
              {!errors.fullName && isValid && (
                <FaCircleCheck
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500"
                  size={20}
                />
              )}
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          {/*  */}
          <div className="mb-3">
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
                placeholder="enter email your email address"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.email
                    ? "border-red-500"
                    : isValid
                    ? "border-fuchsia-500"
                    : "border-fuchsia-300"
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
          <div className="mb-3">
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
                placeholder="enter your password"
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
            <p className="text-sm my-3 text-fuchsia-400">
              By signing up you agree to our Terms,{" "}
              <span className="underline cursor-pointer font-medium text-fuchsia-600">
                {" "}
                Privacy Policy,
              </span>{" "}
              and{" "}
              <span className="underline font-medium cursor-pointer text-fuchsia-600">
                {" "}
                Cookie Use{" "}
              </span>
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <ColorRing
                  visible={true}
                  height={24}
                  width={24}
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
          <div className="flex items-center gap-3 my-2">
            <hr className="flex-grow border-t border-fuchsia-600" />
            <p className="text-fuchsia-500 font-medium">or</p>
            <hr className="flex-grow border-t border-fuchsia-600" />
          </div>
          <GoogleApp />
          <p className="text-base my-2">
            Already have an account?{" "}
            <Link to="/signIn" className="text-fuchsia-500 underline text-lg">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
