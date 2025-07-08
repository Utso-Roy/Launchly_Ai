import React from 'react';
import Lottie from 'lottie-react';
import animation from '../assets/404.json';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#101960] dark:bg-gray-900 px-4 py-10 text-center">
      {/* Animation */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-8">
        <Lottie animationData={animation} loop={true} />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
        404 - Page Not Found
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Go Back Button */}
      <a
        href="/"
        className="inline-block px-6 py-3 text-white bg-[#21BEDA] rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm sm:text-base"
      >
        ⬅ Go Back to Home
      </a>
    </div>
  );
};

export default Error;
