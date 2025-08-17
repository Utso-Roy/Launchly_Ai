import React from "react";
import { FaHeart, FaComment, FaEye } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "10 Tips to Improve Productivity",
    author: "Alice Cooper",
    date: "Aug 15, 2025",
    description:
      "Discover practical strategies to boost your daily productivity and workflow efficiency.",
    likes: 120,
    comments: 15,
    views: 350,
  },
  {
    id: 2,
    title: "How to Market Your Product Online",
    author: "Bob Martin",
    date: "Aug 12, 2025",
    description:
      "Learn effective online marketing techniques to reach a wider audience and increase engagement.",
    likes: 95,
    comments: 10,
    views: 280,
  },
  {
    id: 3,
    title: "Top 5 AI Tools for Developers",
    author: "Catherine Lee",
    date: "Aug 10, 2025",
    description:
      "Explore the most popular AI tools that can help developers automate tasks and save time.",
    likes: 80,
    comments: 8,
    views: 200,
  },
  {
    id: 4,
    title: "Building a Strong Community",
    author: "Daniel Kim",
    date: "Aug 08, 2025",
    description:
      "Tips and best practices to engage with your users and grow a loyal community around your platform.",
    likes: 70,
    comments: 5,
    views: 180,
  },
  {
    id: 5,
    title: "Effective Time Management",
    author: "Eva Green",
    date: "Aug 05, 2025",
    description:
      "Learn how to manage your time wisely and increase productivity in your daily tasks.",
    likes: 60,
    comments: 6,
    views: 150,
  },
  {
    id: 6,
    title: "SEO Tips for Beginners",
    author: "Frank White",
    date: "Aug 03, 2025",
    description:
      "An easy guide to improve your website ranking and attract organic traffic.",
    likes: 55,
    comments: 4,
    views: 120,
  },
  {
    id: 7,
    title: "Content Creation Strategies",
    author: "Grace Hall",
    date: "Aug 01, 2025",
    description:
      "Learn how to create engaging content that resonates with your audience.",
    likes: 50,
    comments: 3,
    views: 110,
  },
  {
    id: 8,
    title: "Top Productivity Apps",
    author: "Henry Adams",
    date: "Jul 30, 2025",
    description:
      "A curated list of apps to help you stay organized and productive every day.",
    likes: 45,
    comments: 2,
    views: 100,
  },
];

const Blog = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#101960] dark:text-white mb-6">
          Latest Blog Articles
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Stay updated with the latest insights, tips, and tutorials from our expert team. Each article covers productivity, marketing, AI tools, community building, and personal branding.
        </p>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transform transition hover:-translate-y-1 hover:shadow-xl cursor-target cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">
                  {blog.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  By {blog.author} | {blog.date}
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                  {blog.description}
                </p>
              </div>

              {/* Reactions */}
              <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-300 text-sm">
                <span className="flex items-center gap-1">
                  <FaHeart className="text-red-500" /> {blog.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FaComment className="text-blue-500" /> {blog.comments}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye className="text-green-500" /> {blog.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
