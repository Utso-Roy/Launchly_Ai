import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const My_Profile = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const isSubscribed = user?.isSubscribed || false;
  const subscriptionAmount = "$9.99 / month";

  const handleSubscribe = () => {
    // এখানে future backend integration এর জন্য logic রাখতে পারো
    setShowModal(true);
  };

  return (
    <motion.div
      className="max-w-md mx-auto my-10 p-3 rounded-xl shadow-lg dark:bg-gray-900 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/ZVGf7Vn/user.png"}
          alt="User Profile"
          className="w-24 h-24 object-cover rounded-full border-4 border-[#21BEDA]"
        />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {user?.displayName || "User Name"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {user?.email || "user@example.com"}
        </p>

        {!isSubscribed ? (
          <>
            <button
              onClick={handleSubscribe}
              className="mt-4 px-4 py-2 bg-[#21BEDA] hover:bg-[#1ca6c0] text-white rounded shadow"
            >
              Subscribe: {subscriptionAmount}
            </button>

            {/* DaisyUI Modal */}
            {showModal && (
              <dialog id="subscribe_modal" className="modal modal-open">
                <div className="modal-box dark:bg-gray-800 dark:text-white">
                  <h3 className="font-bold text-lg">Subscribe Now</h3>
                  <p className="py-4">
                    To enjoy premium benefits, subscribe now for{" "}
                    <span className="font-semibold text-[#21BEDA]">
                      {subscriptionAmount}
                    </span>
                    .
                  </p>
                  <div className="modal-action">
                    <form method="dialog" className="space-x-2">
                      <button
                        className="btn bg-[#21BEDA] hover:bg-[#1ca6c0] text-white"
                        onClick={() => {
                          // future: call backend to subscribe
                          setShowModal(false);
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            )}
          </>
        ) : (
          <div className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow">
            Status: Verified
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default My_Profile;
