import loginImage from "../images/login-image.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const isDomainallowed = (email) => {
    const allowedDomains = ["gmail", "yahoo", "outlook", "live"];
    const emailDomain = email.split("@")[1];
    const emailCompany = emailDomain.split(".")[0];
    return allowedDomains.includes(emailCompany);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-16 container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-gray-300 rounded-lg w-[350px] p-5 md:w-auto md:p-8"
        >
          <h1 className="font-heading font-extrabold text-3xl text-indigo-600 mb-1">
            Sign in
          </h1>
          <p className="font-sans text-gray-600 mt-1 mb-4 md:mb-6">
            Sign into your account and explore a world of images.
          </p>

          {/* Email Field */}
          <label
            className="block text-indigo-600 mt-3 mb-1"
            htmlFor="email_login"
          >
            Email
          </label>
          <input
            className={`p-2 block w-full border-[1px] border-gray-300 rounded-md outline-indigo-600 ${
              errors.email ? "border-red-500 outline-red-500" : ""
            }`}
            id="email_login"
            type="text"
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
            <p className="text-red-500 text-xs text-xs">
              {errors.email.message}
            </p>
          )}

          {/* Password Field */}
          <label
            className="block text-indigo-600 mt-3 mb-1"
            htmlFor="password_login"
          >
            Password
          </label>
          <input
            className={`p-2 block w-full border-[1px] border-gray-300 rounded-md outline-indigo-600 ${
              errors.password ? "border-red-500 outline-red-500" : ""
            }`}
            id="password_login"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          {/* Remember Me Checkbox */}
          <input className="my-3" type="checkbox" id="rememberMe_login" />
          <label
            className="pl-1 md:pl-2 text-indigo-600 mt-3 mb-1"
            htmlFor="rememberMe_login"
          >
            Remember me
          </label>
          <a
            className="inline-block ml-6 md:ml-[5rem] text-indigo-600"
            href="#"
          >
            Forgot your password?
          </a>

          {/* Submit Button */}
          <button
            className="block text-center font-sans text-gray-200 bg-indigo-600 w-full py-2 mt-3 mb-2 md:my-4 rounded-md"
            type="submit"
          >
            Log in
          </button>

          <p className="text-indigo-600 inline-block mr-1">
            Don't have an account?
          </p>
          <Link className="text-indigo-600" to="/signup">
            Register here
          </Link>
        </form>

        {/* Login Image */}
        <img
          className="md:w-[20rem] lg:w-[30rem]"
          src={loginImage}
          alt="login image"
        />
      </div>
    </>
  );
};

export default Login;
