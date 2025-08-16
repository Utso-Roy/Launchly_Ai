import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alice Cooper",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    comment:
      "This AI-powered tool revolutionized our workflow! The automation features saved hours of manual work.",
  },
  {
    id: 2,
    name: "Bob Martin",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    comment:
      "The software is very intuitive. Integrating it with our existing systems was smooth and efficient.",
  },
  {
    id: 3,
    name: "Catherine Lee",
    avatar: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    comment:
      "Absolutely love the AI suggestions! It helped our team make smarter decisions in real-time.",
  },
  {
    id: 4,
    name: "Daniel Kim",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    comment:
      "The analytics dashboard is top-notch. We can track all our KPIs effortlessly with this software.",
  },
  {
    id: 5,
    name: "Eva Johnson",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 4,
    comment:
      "Great AI assistant! It enhanced our productivity and gave accurate predictions for our projects.",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          What Our Users Say About Our Software
        </h2>

        {/* Review Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.avatar} alt={review.name} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {review.name}
                    </h3>
                    <div className="flex mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-yellow-400 mr-1"
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
