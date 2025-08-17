import React, { useState, useEffect } from "react";
import { FaTags } from "react-icons/fa";

const CouponMarquee = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/valid-coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(data))
      .catch((err) => console.error("Failed to load coupons:", err));
  }, []);

  const scrollingCoupons = [...coupons, ...coupons];

  return (
    <div className="my-10   overflow-hidden py-6 transition-colors duration-500">
      {/* Title */}
      <h2 className="text-3xl font-bold text-blue-900 dark:text-white text-center mb-6 flex items-center justify-center gap-2">
        <FaTags className="text-[#21BEDA]" /> Exclusive Coupons
      </h2>

      {/* Scrolling coupons */}
      <div className="overflow-hidden group">
        <div
          className="flex whitespace-nowrap animate-marquee group-hover:paused"
          style={{ gap: "1rem" }}
        >
          {scrollingCoupons.map((coupon, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 border border-[#21BEDA] p-6 rounded shadow bg-white dark:bg-gray-800 text-center hover:scale-105 transition-transform duration-300"
              style={{ minWidth: "16rem" }}
            >
              <h3 className="text-xl font-bold text-[#21BEDA]">{coupon?.code}</h3>
              <p className="text-gray-600 dark:text-gray-300">{coupon?.description}</p>
              <p className="text-green-600 font-semibold">
                Discount: ${coupon?.discount}
              </p>
              <p className="text-red-500 font-medium">
                Expires: {coupon?.expiryDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes + hover pause */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .paused {
          animation-play-state: paused !important;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CouponMarquee;
