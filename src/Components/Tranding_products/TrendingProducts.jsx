import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { axiosSecure } from "../../Services/products_Api/Featured_Products_Api";
import Loading from "../../Context/Auth/Loader/Loading";

const TrendingProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: trending = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trending_products"],
    queryFn: () => axiosSecure("trending_products"),
  });

  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");
    try {
      await axiosSecure(`featured_products/upvote/${productId}`, {
        method: "PATCH",
        data: { userId: user.uid },
      });
      refetch();
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  return (
    <section className="my-10 ">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((product, i) => {
              const isOwner = user?.uid === product.ownerId;
              const hasVoted = product.upvotedUsers?.includes(user?.uid);

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
                  className="hover:shadow-[#21BEDA] rounded-xl p-4 bg-base-200 dark:bg-gray-900 shadow-md hover:shadow-lg transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3
                    className="text-xl font-semibold text-[#21BEDA] cursor-pointer hover:underline"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 my-2">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {user ? (
                    <button
                      disabled={isOwner || hasVoted}
                      onClick={() => handleUpvote(product._id)}
                      className={`mt-3 flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded font-semibold transition-colors ${
                        isOwner || hasVoted
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                          : "bg-[#21BEDA] text-white hover:bg-[#1ca6c0]"
                      }`}
                    >
                      <FaThumbsUp />
                      {product.votes}
                    </button>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/products")}
            className=" btn btn-outline border-[#21BEDA] text-[#21BEDA] cursor-pointer hover:text-white font-semibold rounded hover:bg-[#1ca6c0] transition"
          >
            Show All Products
          </button>
        </div>
      </div>

    </section>
  );
};

export default TrendingProducts;
