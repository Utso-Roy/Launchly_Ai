import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Services/products_Api/Featured_Products_Api";
import { FaThumbsUp, FaFlag, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../../Context/Auth/Loader/Loading";

const Products_Details_Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

    const { data: products = [], isLoading, refetch } = useQuery(
        
        {
    queryKey: ["all_products"],
    queryFn: () => axiosSecure("all_products"),
  }
  );

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => axiosSecure(`reviews/${id}`),
  });

  const product = products.find((item) => item._id === id);

  if (isLoading) return <Loading />;
  if (!product)
    return <p className="text-center text-red-500 mt-10">Product not found!</p>;

  const isOwner = user?.uid === product.ownerId;
  const hasVoted = product.upvotedUsers?.includes(user?.uid);

  const handleUpvote = async () => {
    if (!user) return toast.error("Please login first.");
    try {
      await axiosSecure(`featured_products/upvote/${product._id}`, {
        method: "PATCH",
        data: { userId: user.uid },
      });
      refetch();
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  const handleReportConfirm = async () => {
    try {
      await axiosSecure(`report/${product._id}`, {
        method: "POST",
        data: { reporterId: user.uid },
      });
      toast.success("Report submitted successfully.");
      setShowReportModal(false);
    } catch (err) {
      console.error("Report failed", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure(`reviews/${product._id}`, {
        method: "POST",
        data: {
          name: user.displayName,
          photo: user.photoURL,
          description: reviewText,
          rating: reviewRating,
        },
      });
      setReviewText("");
      setReviewRating(0);
      toast.success("Review posted!");
      refetch();
    } catch (err) {
      console.error("Review failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-12 lg:px-32">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 transition-all duration-300">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-[#21BEDA] hover:text-[#1ca6c0] font-semibold"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover rounded mb-6"
        />

        <h2 className="text-3xl font-bold text-[#21BEDA] mb-2">{product.name}</h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {product.description || "No description available."}
        </p>

        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mb-4 block"
          >
            Visit Product Site
          </a>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, i) => (
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
                ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-[#21BEDA] text-white hover:bg-[#1ca6c0]"
            }`}
          >
            <FaThumbsUp /> {product.votes} Votes
          </button>

          {user && (
            <>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                <FaFlag /> Report
              </button>

              {/* DaisyUI Modal */}
              {showReportModal && (
                <dialog id="report_modal" className="modal modal-open">
                  <div className="modal-box bg-white dark:bg-gray-800">
                    <h3 className="font-bold text-lg dark:text-white">Report Product</h3>
                    <p className="py-4 text-gray-700 dark:text-gray-300">
                      Are you sure you want to report this product?
                    </p>
                    <div className="modal-action">
                      <form method="dialog" className="space-x-2">
                        <button
                          onClick={() => setShowReportModal(false)}
                          className="btn"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReportConfirm}
                          className="btn bg-red-600 text-white hover:bg-red-700"
                        >
                          Confirm Report
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              )}
            </>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#21BEDA] mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-gray-500">No reviews yet.</p>
            )}
            {reviews.map((review, i) => (
              <div
                key={i}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {review.name}
                  </span>
                </div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= review.rating ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-800 dark:text-gray-200">
                  {review.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form */}
        {user && (
          <form onSubmit={handleReviewSubmit} className="mt-10 space-y-4">
            <h3 className="text-xl font-bold text-[#21BEDA]">Post a Review</h3>

            <input
              type="text"
              readOnly
              value={user.displayName}
              className="w-full p-3 border border-gray-300 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              readOnly
              value={user.photoURL}
              className="w-full p-3 border border-gray-300 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
            />

            {/* Daisy UI Rating */}
            <div className="rating mb-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <input
                  key={num}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={reviewRating === num}
                  onChange={() => setReviewRating(num)}
                />
              ))}
            </div>

            <textarea
              required
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
            ></textarea>

            <button
              type="submit"
              className="bg-[#21BEDA] text-white px-6 py-2 rounded hover:bg-[#1ca6c0]"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Products_Details_Page;
