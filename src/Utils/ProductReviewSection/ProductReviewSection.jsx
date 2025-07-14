import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Loading from "../../Context/Auth/Loader/Loading";

const ProductReviewSection = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/reviews/product/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setReviewsData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load reviews.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div><Loading></Loading></div>
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto mt-8 p-4"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-[#21BEDA] hover:text-[#1ca6c0] font-semibold"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-[#21BEDA] text-center">
        Product Reviews
      </h2>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Photo
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              User Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {reviewsData.map((review, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
            >
              <td className="px-6 py-4">
                <img
                  src={review?.photo}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                {review?.userName}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                {review?.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {review?.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductReviewSection;
