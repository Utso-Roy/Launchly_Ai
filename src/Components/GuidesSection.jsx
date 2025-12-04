import React, { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router";
import Container from "../Container/Container";

const guides = [
  {
    title: "How to Launch Your Web App",
    description: "Step by step guide to successfully launch your web applications.",
  },
  {
    title: "Top AI Tools in 2025",
    description: "Explore the most powerful AI tools to boost your productivity.",
  },
  {
    title: "Game Development Tips",
    description: "Learn essential tips for building engaging and fun games.",
  },
];

const GuidesSection = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="py-12  transition-colors duration-500">
      <h2
        className="text-3xl font-bold text-center text-[#101960] dark:text-gray-100 mb-8"
        data-aos="fade-up"
      >
         Helpful Guides
      </h2>

      <Container>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 cursor-target cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={idx * 100} 
          >
            <h3 className="text-xl font-semibold text-[#141c60] dark:text-gray-100 mb-2">
              {guide.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{guide.description}</p>
          </div>
        ))}
      </div>
      </Container>

      <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay={400}>
        <Link to="/guide">
        <button className="px-6 py-3 border border-[#21BEDA] btn btn-outline text-[#21BEDA] hover:text-white rounded-full hover:bg-[#21BEDA] transition-colors duration-300 cursor-target cursor-pointer">
          See All Guides
        </button>
        </Link>
      </div>
    </div>
  );
};

export default GuidesSection;
