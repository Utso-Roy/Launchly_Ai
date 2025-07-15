import React, { useContext } from "react";
import Slider from "../../Components/BennarSlider/Slider";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Services/products_Api/Featured_Products_Api";
import { useNavigate } from "react-router";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import { GiStarFormation } from "react-icons/gi";
import { IoMdTrendingUp } from "react-icons/io";
import TrendingProducts from "../../Components/Tranding_products/TrendingProducts";
import ExtraSections from "../../Components/ExtraSection/ExtraSections";
import Loading from "../../Context/Auth/Loader/Loading";
import MakeFeaturedSection from "../../Utils/MakeFeturedSection/MakeFeturedSection";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["featured_products"],
    queryFn: () => axiosSecure("featured_products"),
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

  const featured = products
    ?.filter((item) => item.isFeatured)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <div>
      {/* Slider */}
      <div className="my-2">
        <Slider />
      </div>

      {/* Featured Products */}
      <section
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="my-10 px-4 md:px-8"
      >
        <h2 className="text-3xl flex items-center justify-center  font-bold text-center text-[#101960] dark:text-white mb-8">
          <GiStarFormation color="#f3d60f" />
          Featured Tech Products
        </h2>

        {isLoading ? (
          Loading()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => {
              const isOwner = user?.uid === product.ownerId;
              const hasVoted = product.upvotedUsers.includes(user?.uid);

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
                  className=" border-2 border-[#21BEDA] rounded-xl p-4 bg-white dark:bg-gray-900 cursor-pointer shadow-md transition-all"
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
                  ) : (
                    " "
                  )}
                </motion.div>
              );
            })}
          </div>
        )}


        {
          <MakeFeaturedSection></MakeFeaturedSection>
        }
      </section>

      <section
        data-aos="fade-left"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="my-10 px-4 md:px-8"
      >
        <h2 className="text-3xl flex items-center justify-center  font-bold text-center text-[#101960] dark:text-white mb-8">
          <IoMdTrendingUp size={40} color="#f3d60f" />
          Trending Products Section
        </h2>
        
          <TrendingProducts></TrendingProducts>
    
      </section>

      <section className="my-10 ">
        <ExtraSections></ExtraSections>
      </section>
    </div>
  );
};

export default Home;
