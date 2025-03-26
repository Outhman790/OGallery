import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import signupImage from "../images/signup-image.svg";
import { useForm } from "react-hook-form";
import { BounceLoader } from "react-spinners";
import Navbar from "../Components/Navbar";
import { useAuth } from "@/Context/AuthContext";
const signUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Sending data to backend:", data); // Log the data being sent
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("Response status:", response.status); // Log response status
      const result = await response.json();
      console.log("Response from backend:", result); // Log the response body

      if (result.message === "Email already in use") {
        setError("email", {
          type: "server",
          message: "Email already in use",
        });
      } else if (result.user) {
        setUser(result.user);
        setTimeout(() => {
          setIsLoading(false); // Stop loading animation
          result.user.role === "user" && navigate("/myprofile");
        }, 2000);
      }
    } catch (error) {
      console.error("Sign-up error:", error); // Log unexpected errors
    }
  };

  const isDomainallowed = (email) => {
    const allowedDomains = ["gmail", "yahoo", "outlook", "live"];
    const emailDomain = email.split("@")[1];
    const emailCompany = emailDomain.split(".")[0];
    return allowedDomains.includes(emailCompany);
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center mt-16 container mx-auto gap-12">
        <div className="border-2 border-gray-300 rounded-lg w-[350px] p-5 md:w-fit md:p-8 shadow-md shadow-indigo-400">
          <h1 className="font-heading font-bold text-2xl  text-center text-purple-600 mb-8">
            Sign up into your account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-1 text-gray-500" htmlFor="firstName">
                First Name
              </label>
              <input
                className={`block outline-indigo-600 border-[1px] border-gray-300 px-1 w-full ${
                  errors.firstName ? "border-red-500 outline-red-500" : ""
                }`}
                type="text"
                id="firstName"
                placeholder="Enter your first Name"
                {...register("firstName", {
                  required: true,
                  validate: {
                    minLength: (value) =>
                      value.length >= 3 ||
                      "Name must be at least 3 characters long",
                    maxLength: (value) =>
                      value.length <= 25 ||
                      "Name must be at most 25 characters long",
                    validatelName: (value) =>
                      /^[a-zA-Z\s]+$/.test(value) ||
                      "Name must only contain letters",
                  },
                })}
                onBlur={() => trigger("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
              <label
                className="block mb-1 text-gray-500 mt-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`block outline-indigo-600 border-[1px] border-gray-300 px-1 w-full ${
                  errors.lastName ? "border-red-500 outline-red-500" : ""
                }`}
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: true,
                  validate: {
                    minLength: (value) =>
                      value.length >= 3 ||
                      "Name must be at least 3 characters long",
                    maxLength: (value) =>
                      value.length <= 25 ||
                      "Name must be at most 25 characters long",
                    validatelName: (value) =>
                      /^[a-zA-Z\s]+$/.test(value) ||
                      "Name must only contain letters",
                  },
                })}
                onBlur={() => trigger("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
              <label
                className="block mb-1 text-gray-500 mt-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`block outline-indigo-600 border-[1px] border-gray-300 px-1 w-full ${
                  errors.password ? "border-red-500 outline-red-500" : ""
                }`}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
              <label
                className="block mb-1 text-gray-500 mt-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`block outline-indigo-600 border-[1px] border-gray-300 px-1 w-full ${
                  errors.confirmPassword ? "border-red-500 outline-red-500" : ""
                }`}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <label
              className="block mb-1 text-gray-500 mt-2"
              htmlFor="email_signup"
            >
              Email
            </label>
            <input
              className={`block outline-indigo-600 border-[1px] border-gray-300 px-1 w-full ${
                errors.email ? "border-red-500 outline-red-500" : ""
              }`}
              type="text"
              id="emailSignup"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  isValidEmail: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Invalid email format",
                  isDomainallowed: (value) =>
                    isDomainallowed(value) || "Domain not allowed",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}

            <button
              className="block text-center font-sans text-gray-200 bg-purple-600 w-full	 py-2 mt-3 mb-2 md:my-4 rounded-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-center md:text-left">
              <p className="inline-block mr-2 text-indigo-500">
                Already have an account?
              </p>
              <Link className="text-indigo-600 inline-block mr-1" to="/login">
                Sign in
              </Link>
            </div>
          </form>
          {isLoading && Object.keys(errors).length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
              <BounceLoader color="#4f46e5" size={50} />
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <img
            className="w-[24rem] lg:w-[40rem] lg:max-w-auto ml-8 mb-10 md:mx-auto md:mt-16"
            src={signupImage}
            alt="signup image"
          />
        </div>
      </div>
    </>
  );
};

export default signUp;
