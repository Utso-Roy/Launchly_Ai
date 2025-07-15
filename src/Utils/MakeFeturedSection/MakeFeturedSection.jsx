import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const MakeFeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");

    try {
      const res = await axios.patch(`http://localhost:3000/upvote/${productId}`, {
        userId: user.uid,
      });

      if (res.data.success) {
        setFeaturedProducts((prev) =>
          prev.map((product) => {
            const id = product._id?.toString?.();
            return id === productId
              ? {
                  ...product,
                  upvotes: (product.upvotes || 0) + 1,
                  upvotedUsers: [...(product.upvotedUsers || []), user.uid],
                }
              : product;
          })
        );

        toast.success("You upvoted successfully!");
      }
    } catch (error) {
      console.error("Upvote failed:", error);
      toast.error(error.response?.data?.message || "Failed to upvote");
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/featured")
      .then((res) => res.json())
      .then((data) => {
        // fallback for missing upvotedUsers
        const updated = data.map((item) => ({
          ...item,
          upvotedUsers: item.upvotedUsers || [],
        }));
        setFeaturedProducts(updated);
      })
      .catch((err) => {
        console.error("Failed to fetch featured products:", err);
      });
  }, []);

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, i) => {
          const alreadyVoted = (product.upvotedUsers || []).includes(user?.uid);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
              className="border-2 border-[#21BEDA] rounded-xl p-4 bg-white dark:bg-gray-900 cursor-pointer shadow-md transition-all"
            >
              <img
                src={product?.data?.image}
                alt={product?.data?.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3
                className="text-xl font-semibold text-[#21BEDA] cursor-pointer hover:underline"
                onClick={() => navigate(`/dashboard/products/${product._id}`)}
              >
                {product?.data?.name}
              </h3>

              <div className="flex flex-wrap gap-2 my-2">
                {product?.data?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <button
                  onClick={() => handleUpvote(product?._id)}
                  disabled={alreadyVoted}
                  className={`btn ${
                    alreadyVoted ? "bg-gray-400 cursor-not-allowed" : "bg-[#21BEDA]"
                  }`}
                >
                  <FaThumbsUp size={18} className="text-white" />
                  <span className="text-white ml-1">{product?.upvotes || 0}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MakeFeaturedSection;
