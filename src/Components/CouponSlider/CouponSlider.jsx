import React, { useState, useEffect } from "react";

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
    <div className="my-12 bg-gray-50 overflow-hidden py-6">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
        🔥 Exclusive Coupons
      </h2>

      <div className="overflow-hidden">
        <div
          className="flex whitespace-nowrap animate-marquee"
          style={{ gap: "1rem" }}
        >
          {scrollingCoupons.map((coupon, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 border border-[#21BEDA] p-6 rounded shadow bg-white text-center"
              style={{ minWidth: "16rem" }}
            >
              <h3 className="text-xl font-bold text-[#21BEDA]">{coupon?.code}</h3>
              <p className="text-gray-600">{coupon?.description}</p>
              <p className="text-green-600 font-semibold">Discount: ${coupon?.discount}</p>
              <p className="text-red-500 font-medium">Expires: {coupon?.expiryDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CouponMarquee;
