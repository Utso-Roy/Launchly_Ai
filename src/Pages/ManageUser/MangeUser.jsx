import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../Context/Auth/Loader/Loading";

const MangeUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/mangeUser")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error loading users:", err);
        setLoading(false);
      });
  }, []);

  const totalUser = users.length;

  const makeAdmin = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/admin/${id}`);
      toast.success("Made Admin Successfully");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: "admin" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to make admin");
      console.log(error);
    }
  };

  const makeModerator = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/moderator/${id}`);
      toast.success("Made Moderator Successfully");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: "moderator" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to make moderator");
      console.log(error);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-[#23245F] text-center mb-6">
        Manage Users {totalUser}
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Make Moderator</th>
              <th className="px-4 py-3">Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
              >
                <td className="px-4 py-3">{user?.name}</td>
                <td className="px-4 py-3">{user?.email}</td>
                <td className="px-4 py-3 capitalize">{user?.role}</td>
                <td className="px-4 py-3">
                  <button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    disabled={
                      user?.role === "moderator" || user?.role === "admin"
                    }
                    onClick={() => makeModerator(user?._id)}
                  >
                    Make Moderator
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    disabled={user?.role === "admin"}
                    onClick={() => makeAdmin(user?._id)}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Optional: No user fallback */}
        {users.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MangeUser;
