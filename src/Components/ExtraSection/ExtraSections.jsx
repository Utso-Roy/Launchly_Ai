import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCheckCircle } from "react-icons/fa";

const ExtraSections = () => {
  return (
    <div className="px-4 md:px-10 my-16 space-y-16">
      {/* Section 1 - Why Choose Us */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
        className="bg-[#f0fbff]  dark:bg-gray-900 p-6 md:p-12 rounded-2xl shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-6">
          Why Tech Enthusiasts Choose Launchly?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Launchly brings together developers, designers, and creators to
              share, vote, and explore groundbreaking tech products.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaCheckCircle className="text-[#21BEDA] mr-2" /> Community-driven
                innovation
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaCheckCircle className="text-[#21BEDA] mr-2" /> Daily trending
                and featured updates
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaCheckCircle className="text-[#21BEDA] mr-2" /> Developer-friendly
                tools & UI
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/Xf1yx4Lk/tech-enthusiast.jpg"
              alt="Why Choose Us"
              className="w-full md:w-96 rounded shadow"
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Success Stories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#f0fbff] dark:bg-gray-800 p-6 md:p-12 rounded-2xl  shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-10">
           Success Stories from Launchly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-4  bg-[#f9fdff] dark:bg-gray-700 rounded-xl shadow-sm"
            >
              <FaUsers className="text-[#21BEDA] text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-[#21BEDA] mb-2">
                Startup #{i + 1}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                I launched “GreenTech Ideas” as part of my university project. Launchly gave it a platform, and now I'm collaborating with real-world NGOs. The feedback and reach were beyond my expectations.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ExtraSections;
