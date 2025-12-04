import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import Loading from "../../Context/Auth/Loader/Loading";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const limit = 6;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://launchly-server-side.vercel.app/all_products?page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductData(data.products);
          setTotalProducts(data.total);
        }
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(totalProducts / limit);

  if (loading) return <Loading />;

  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");

    try {
      const response = await fetch(
        `https://launchly-server-side.vercel.app/featured_products/upvote/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        }
      );
      const data = await response.json();
      if (data.success) {
        const updated = productData.map((product) =>
          product._id === productId
            ? {
                ...product,
                votes: product.votes + 1,
                upvotedUsers: [...product.upvotedUsers, user.uid],
              }
            : product
        );
        setProductData(updated);
      }
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (id) => {
    console.log(id);

    navigate(`/products/${id}`);
  };

  return (
    <div className="px-4 md:px-10 py-10   dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        All Accepted Tech Products
      </h2>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#21BEDA] bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product, i) => {
          const isOwner = user?.uid === product.ownerId;
          const hasVoted = product.upvotedUsers.includes(user?.uid);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className=" hover:shadow-[#21BEDA] rounded-xl p-4 bg-base-200 dark:bg-gray-800 shadow-lg cursor-pointer transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3
                className="text-xl font-semibold cursor-pointer text-[#21BEDA] hover:underline"
                onClick={() => handleClick(product._id)}
              >
                {product.name}
              </h3>
              <div className="flex flex-wrap gap-2 my-2">
                {product?.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {user && (
                <button
                  disabled={isOwner || hasVoted}
                  onClick={() => handleUpvote(product._id)}
                  className={`mt-3 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded font-semibold transition-colors ${
                    isOwner || hasVoted
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                      : "bg-[#21BEDA] text-white hover:bg-[#1ca6c0]"
                  }`}
                >
                  <FaThumbsUp />
                  {product.votes}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-10 flex justify-center">
        <div className="join">
          {[...Array(totalPages).keys()].map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg + 1)}
              className={`join-item btn ${
                pg + 1 === page ? "bg-[#21BEDA] text-white" : ""
              }`}
            >
              {pg + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
