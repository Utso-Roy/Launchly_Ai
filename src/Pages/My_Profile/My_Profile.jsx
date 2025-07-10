import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const My_Profile = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const isSubscribed = user?.isSubscribed || false;
  const subscriptionAmount = "$9.99 / month";

  const handleSubscribe = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen dark:bg-gray-950 bg-gray-100">
      

      {/* Profile Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        <div data-aos="zoom-in-down" data-aos-duration="2000">
          <h2 className="text-3xl font-bold text-center text-[#21BEDA] dark:text-white mb-8">
            My Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 border border-[#21BEDA] p-6 rounded-lg shadow-lg">
            {/* Profile Image */}
            <div className="flex justify-center items-center">
              <img
                src={user?.photoURL || "https://i.ibb.co/ZVGf7Vn/user.png"}
                alt="User"
                className="w-36 h-36 object-cover rounded-full border-2 border-[#21BEDA] shadow"
              />
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {user?.displayName || "User Name"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {user?.email || "user@example.com"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Membership</p>
                {!isSubscribed ? (
                  <button
                    onClick={handleSubscribe}
                    className="px-4 py-2 bg-[#21BEDA] hover:bg-[#1ca6c0] text-white rounded shadow"
                  >
                    Subscribe: {subscriptionAmount}
                  </button>
                ) : (
                  <span className="inline-block px-4 py-2 bg-green-600 text-white rounded shadow">
                    Status: Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DaisyUI Modal */}
        {showModal && (
          <dialog id="subscribe_modal" className="modal modal-open">
            <div className="modal-box dark:bg-gray-800 dark:text-white">
              <h3 className="font-bold text-lg">Subscribe Now</h3>
              <p className="py-4">
                To enjoy premium benefits, subscribe now for{" "}
                <span className="font-semibold text-[#21BEDA]">{subscriptionAmount}</span>.
              </p>
              <div className="modal-action">
                <form method="dialog" className="space-x-2">
                  <button
                    className="btn bg-[#21BEDA] hover:bg-[#1ca6c0] text-white"
                    onClick={() => {
                      // TODO: backend call here
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
      </main>
    </div>
  );
};

export default My_Profile;
