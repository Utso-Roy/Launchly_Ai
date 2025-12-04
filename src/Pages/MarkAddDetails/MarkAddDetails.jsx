import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../../Context/Auth/Loader/Loading";
import { FaArrowLeft, FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const MarkAddDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwner = product?.ownerId === user?.uid;
  const hasVoted = product?.upvotedUsers?.includes(user?.uid);

  // Fetch product
  useEffect(() => {
    fetch(`https://launchly-server-side.vercel.app/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data?.product);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpvote = async () => {
    if (!user) return navigate("/login");

    try {
      const res = await axios.patch(
        `https://launchly-server-side.vercel.app/upvote/${id}`,
        {
          userId: user.uid,
        }
      );

      if (res.data.success) {
        setProduct((prev) => ({
          ...prev,
          upvotes: (prev.upvotes || 0) + 1,
          upvotedUsers: [...(prev.upvotedUsers || []), user.uid],
        }));
        toast.success("Upvoted successfully!");
      }
    } catch (err) {
      console.error("Upvote failed:", err);
      toast.error(err.response?.data?.message || "Failed to upvote");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-12 lg:px-32">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-[#21BEDA] font-semibold"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>

        <img
          src={product?.data?.image}
          alt={product?.data?.name}
          className="w-full h-[300px] object-cover rounded mb-6"
        />

        <h2 className="text-3xl font-bold text-[#21BEDA] mb-2">
          {product?.data?.name}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {product?.data?.description || "No description available."}
        </p>

        {product?.data?.link && (
          <a
            href={product.data.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline mb-4 block"
          >
            Visit Product Site
          </a>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {product?.data?.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-sm font-medium px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            disabled={isOwner || hasVoted}
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              isOwner || hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#21BEDA] hover:bg-[#1ca6c0]"
            } text-white`}
          >
            <FaThumbsUp /> {product.upvotes || 0} Votes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAddDetails;
