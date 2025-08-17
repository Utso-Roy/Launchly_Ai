import React from "react";
import { FiBook, FiUpload, FiUsers, FiTrendingUp, FiAward, FiEdit3, FiTag,  FiCpu, FiZap } from "react-icons/fi";

const guides = [
  { id: 1, title: "Getting Started", description: "Learn how to quickly get started with our platform and explore its core features.", icon: <FiBook size={24} /> },
  { id: 2, title: "Product Submission", description: "Step-by-step guide on how to submit your product and reach thousands of enthusiasts.", icon: <FiUpload size={24} /> },
  { id: 3, title: "Community Engagement", description: "Tips for engaging with the community, sharing reviews, and building your network.", icon: <FiUsers size={24} /> },
  { id: 4, title: "Maximizing Visibility", description: "Learn strategies to make your products more visible and attract more users.", icon: <FiTrendingUp size={24} /> },
  { id: 5, title: "Success Stories", description: "Get inspired by stories of users who found success through our platform.", icon: <FiAward size={24} /> },
  { id: 6, title: "Review Writing", description: "Learn how to write impactful reviews that help others make better decisions.", icon: <FiEdit3 size={24} /> },
  { id: 7, title: "Coupon Sharing", description: "Discover how to share and redeem coupons effectively within the community.", icon: <FiTag size={24} /> },
  { id: 9, title: "AI Tools Guide", description: "Understand how to leverage AI tools integrated into the platform for smarter work.", icon: <FiCpu size={24} /> },
  { id: 10, title: "Advanced Tips & Tricks", description: "Unlock pro tips and hidden features to become a power user of our platform.", icon: <FiZap size={24} /> },
];

const Guide = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-6">
          User Guides
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Explore our easy-to-follow guides to make the most out of the platform — from getting started to becoming a power user.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform transition hover:-translate-y-1 flex flex-col items-start"
            >
              <div className="text-[#101960] dark:text-yellow-400 mb-3">
                {guide.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#101960] dark:text-yellow-400">
                {guide.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {guide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guide;
