import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import register from "../../assets/register.json";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
const Register = () => {
  const [error, setError] = useState("");
  const { createUser, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const photo = form.photo.value.trim();

    if (!email || !password || !name || !photo) {
      return setError("All fields are required!");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least one uppercase letter, one number, and one special character.",
      });
      return;
    }

    createUser(email, password)
      .then((data) => {
        const user = data.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration successful!");
            form.reset();
          })
          .catch((err) => {
            console.error("Profile update failed:", err.message);
            toast.error("Failed to update profile.");
          });
      })
      .catch((error) => {
        console.error("Register error:", error.message);
        toast.error("Registration failed!");
      });
  };

  const goToLogin = () => {
    // Future: Navigate to login route
  };

  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10 flex flex-col-reverse lg:flex-row items-center gap-8"
      >
        {/* Animation */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie
            animationData={register}
            loop={true}
            className="w-[80%] max-w-sm dark:bg-white"
          />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white w-full">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />

            {/* Password with toggle eye icon */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              type="url"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 cursor-pointer bg-[#21BEDA] rounded-md text-white font-semibold"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-[#21BEDA] hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
