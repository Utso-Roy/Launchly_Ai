import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ReviewDetails = () => {
  const { id } = useParams();
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://launchly-server-side.vercel.app/all_pending_products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProductList(data || []);
        setError("");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
      });
  }, [user]);

  const product = productList.find((item) => item._id === id);

  if (error) return <div className="text-center text-red-400">{error}</div>;
  if (!product)
    return (
      <div className="text-center text-white">Loading Product Details...</div>
    );

  return (
    <div className="min-h-screen  my-4 bg-gray-100 text-white p-6">
      {/* Back Button */}

      <Link to="/dashboard/reviewQueue">
        <button className="inline-flex items-center mb-4 cursor-pointer text-blue-400 hover:text-[#201571]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Review Queue
        </button>
      </Link>

      {/* Product Card */}
      <div className="max-w-xl mx-auto  bg-gray-50 rounded-xl shadow-lg overflow-hidden p-6 space-y-6">
        {/* Product Image */}
        <img
          src={product?.data?.image}
          alt={product.name}
          className="w-full max-h-[300px] object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#21BEDA]">
            {product?.data?.name}
          </h2>
          <p className="text-[#201571]">{product?.data?.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {product?.data.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#21BEDA] text-white rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* External Link */}
          <button
            href={product?.data?.externalLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block cursor-pointer mt-4 text-blue-400 underline hover:text-blue-200"
          >
            Visit Product Page
          </button>

          {/* Status and Upvotes */}
          <div className="flex items-center justify-between mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === "Pending"
                  ? "bg-yellow-600"
                  : product.status === "Accepted"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              Status: {product.status}
            </span>
            <span className="text-sm text-gray-400">
              Upvotes: {product.upvotes}
            </span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-4 border-t border-gray-700 pt-4">
          <img
            src={product?.data?.ownerImage}
            alt={product?.data?.ownerName}
            className="w-14 h-14 rounded-full object-cover border border-blue-500"
          />
          <div>
            <p className="font-semibold">{product?.data?.ownerName}</p>
            <p className="text-sm text-gray-400">{product?.data?.ownerEmail}</p>
          </div>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-right text-gray-500">
          Submitted on: {new Date(product.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ReviewDetails;
