import React from "react";
import {
  FaGlobe,
  FaRobot,
  FaGamepad,
  FaMobileAlt,
  FaLaptopCode,
} from "react-icons/fa";
import Container from "../Container/Container";

const categories = [
  { name: "Web Apps", icon: <FaGlobe />, color: "#3B82F6" },
  { name: "AI Tools", icon: <FaRobot />, color: "#8B5CF6" },
  { name: "Games", icon: <FaGamepad />, color: "#10B981" },
  { name: "Mobile Apps", icon: <FaMobileAlt />, color: "#EC4899" },
  { name: "Software", icon: <FaLaptopCode />, color: "#F97316" },
];

// duplicate array for infinite scroll
const scrollingCategories = [...categories, ...categories];

const Categories = () => {
  return (
    <div className="py-12  overflow-hidden">
      <h2 className="text-3xl text-[#101960] dark:text-white font-bold text-center mb-8">
        Explore by Categories
      </h2>

      {/* Marquee Wrapper */}
      <Container>

        <div className="overflow-hidden relative w-full">
        <div className="marquee flex">
          {scrollingCategories.map((cat, idx) => (
            <div
              key={idx}
              className="cursor-pointer flex flex-col items-center justify-center min-w-[12rem] h-40 mx-4 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: cat.color }}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
      </Container>

      {/* Inline keyframes + hover pause */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 30s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Categories;
