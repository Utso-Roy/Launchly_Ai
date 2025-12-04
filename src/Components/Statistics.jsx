import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import Container from "../Container/Container";

const stats = [
  { id: 1, label: "Enthusiasts Joined", value: 10000, suffix: "+" },
  { id: 2, label: "Products Shared", value: 1500, suffix: "+" },
  { id: 3, label: "Reviews Posted", value: 5000, suffix: "+" },
  { id: 4, label: "Success Stories", value: 500, suffix: "+" },
];

const Statistics = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-10 transition-colors duration-300">
      <Container >
        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-12"
        >
          Our Impact in Numbers
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 cursor-target cursor-pointer transition-transform transform hover:scale-105"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#101960] dark:text-yellow-400">
                <CountUp end={stat.value} duration={15} separator="," />
                {stat.suffix}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
