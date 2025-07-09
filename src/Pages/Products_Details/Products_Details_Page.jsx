import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Services/products_Api/Featured_Products_Api";
import { FaThumbsUp } from "react-icons/fa";
import Loading from "../../Context/Auth/Loader/Loading";

const Products_Details_Page = () => {
  const { id } = useParams();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featured_products"],
    queryFn: () => axiosSecure("featured_products"),
  });

  const product = products.find((item) => item._id === id);

  if (isLoading) {
    Loading();
    return;
  }

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-12 lg:px-32">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover rounded-md mb-6"
        />

        <h2 className="text-3xl font-bold text-[#21BEDA] dark:text-[#21BEDA] mb-4">
          {product.name}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          This is a professional tool to help developers manage their code
          snippets efficiently.
        </p>

        <div className="flex items-center gap-3 mb-4">
          <FaThumbsUp className="text-[#21BEDA]" />
          <span className="font-semibold text-gray-800 dark:text-white">
            {product.votes} Votes
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="text-sm font-medium px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products_Details_Page;
