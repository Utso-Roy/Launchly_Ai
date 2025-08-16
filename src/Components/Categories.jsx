import React from "react";
import { FaGlobe, FaRobot, FaGamepad, FaMobileAlt, FaLaptopCode } from "react-icons/fa";

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
    <div className="py-12 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl text-[#101960] font-bold text-center mb-8">Explore by Categories</h2>

      {/* Marquee Wrapper */}
      <div
        className="overflow-hidden relative w-full"
        style={{ minWidth: "100vw" }}
      >
        <div
          className="flex"
          style={{
            animation: "marquee 30s linear infinite",
          }}
        >
          {scrollingCategories.map((cat, idx) => (
            <div
              key={idx}
              className="cursor-target cursor-pointer flex flex-col items-center justify-center min-w-[12rem] h-40 mx-4 rounded-2xl shadow-lg text-white"
              style={{ backgroundColor: cat.color }}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Categories;
