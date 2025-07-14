import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router"; 
import { motion } from "framer-motion";
import signInAnimation from "../../assets/signIn.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
const from = location.state?.from?.pathname || "/";


  const { loginUser,setUser, googleLogin } = useContext(AuthContext)
  const handleGoogleLogin = () => {
    googleLogin()
      .then(data => {
        setUser(data.user)
        toast.success('Google Login successful!')
        navigate(from, { replace: true });
      })
      .catch(err => {
      
        console.log(err.message)
        toast.error("Google Login failed ! please try again later .")
    })


   
  };
const handleLogin = (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  loginUser(email, password)
    .then((data) => {
      setUser(data.user);
        navigate(from, { replace: true });
      toast.success("Login successful!");
      form.reset();
    })
    .catch((err) => {
      console.error("Login error:", err.message);
      toast.error("Login failed! Please check your credentials.");
    })
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
            Login
          </h2>

          
<form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
  <input
    type="email"
    name="email"
    placeholder="Email"
    className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
    required
  />

  {/* Password Field with Toggle Icon */}
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
      className="input input-bordered w-full pr-10 dark:bg-gray-700 dark:text-white"
      required
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  <button
    type="submit"
    className="w-full py-2 cursor-pointer px-4 bg-[#21BEDA] rounded-md text-white font-semibold"
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
