import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import signInAnimation from "../../assets/signIn.json";
import Lottie from "lottie-react";

const Login = () => {
  const handleGoogleLogin = () => {
    alert("Google Login Clicked");
    // TODO: Add real Google Login here
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login Success");
    // TODO: Add real login logic here
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-2 dark:bg-gray-900">
      <motion.div
        className="w-[90%] max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10 flex flex-col-reverse lg:flex-row items-center gap-8"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie
            animationData={signInAnimation}
            loop={true}
            className="w-[80%] max-w-sm dark:bg-white"
          />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white w-full">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#21BEDA] rounded-md text-white font-semibold"
            >
              Login
            </button>
          </form>

          <div className="divider text-gray-500 dark:text-gray-400 w-full max-w-sm">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full max-w-sm flex items-center justify-center gap-2 dark:border-gray-600"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="text-[#21BEDA] hover:underline cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
