import loginImage from "../images/login-image.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allow cookies to be sent and received
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const userRes = await fetch("/me", {
        credentials: "include",
        method: "POST",
      });
      const userData = await userRes.json();
      console.log(userRes);
      console.log(userData);
      setUser(userData.user);
      alert(userData.user.role);
      userData.user.role === "user"
        ? navigate("/myprofile")
        : navigate("/adminDashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-16 container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-gray-300 rounded-lg w-[350px] p-5 md:w-auto md:p-8"
        >
          <h1 className="font-heading font-extrabold text-3xl text-purple-600 mb-1">
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
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            className="block text-center font-sans text-gray-200 bg-purple-600 w-full py-2 mt-3 mb-2 md:my-4 rounded-md"
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
