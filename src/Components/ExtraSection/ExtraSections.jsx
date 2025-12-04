import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import Container from "../../Container/Container";

const ExtraSections = () => {
  return (
    <div className=" my-20 space-y-20">
      {/* Section 1 - Why Choose Us */}
      <Container>
        
          <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className=" dark:bg-gray-800 p-8 md:p-16 rounded-xl shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-8">
          Why Tech Enthusiasts Choose Launchly?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Launchly brings together developers, designers, and creators to
              share, vote, and explore groundbreaking tech products.
            </p>
            <ul className="space-y-3">
              {[
                "Community-driven innovation",
                "Daily trending and featured updates",
                "Developer-friendly tools & UI",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaCheckCircle className="text-[#21BEDA] mr-3 text-xl flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/Xf1yx4Lk/tech-enthusiast.jpg"
              alt="Why Choose Us"
              className="w-full md:w-96 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Success Stories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="  p-8 md:p-16 rounded-xl shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-12">
          Success Stories from Launchly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <FaUsers className="text-[#21BEDA] text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-[#101960] dark:text-white mb-3">
                Startup #{i + 1}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                I launched “GreenTech Ideas” as part of my university project.
                Launchly gave it a platform, and now I'm collaborating with
                real-world NGOs. The feedback and reach were beyond my
                expectations.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Container>
    </div>
  );
};

export default ExtraSections;
