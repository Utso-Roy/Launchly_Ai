import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MangeCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        "https://launchly-server-side.vercel.app/coupons"
      );
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to fetch coupons");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await axios.put(
          `https://launchly-server-side.vercel.app/coupons/${editingId}`,
          formData
        );
        if (res.data.modifiedCount > 0 || res.data.acknowledged) {
          toast.success("Coupon updated successfully!");
        } else {
          toast.warn("No changes made.");
        }
      } else {
        const res = await axios.post(
          "https://launchly-server-side.vercel.app/coupons",
          formData
        );
        if (res.data.insertedId || res.data._id) {
          toast.success("Coupon added successfully!");
        } else {
          toast.error("Failed to add coupon.");
        }
      }

      setFormData({ code: "", expiryDate: "", description: "", discount: "" });
      setEditingId(null);
      fetchCoupons();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://launchly-server-side.vercel.app/coupons/${id}`
      );
      toast.success("Coupon deleted successfully!");
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to delete coupon");
      console.log(err);
    }
  };

  const handleEdit = (coupon) => {
    setFormData({
      code: coupon.code,
      expiryDate: coupon.expiryDate,
      description: coupon.description,
      discount: coupon.discount,
    });
    setEditingId(coupon._id);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1D2A9D] dark:text-white">
        Manage Coupons
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
          className="input input-bordered w-full"
        />
        <input
          type="date"
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Discount Amount"
          value={formData.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
          required
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-[#21BEDA] hover:bg-[#84c8d4] text-white dark:bg-gray-800 col-span-full"
        >
          {editingId ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Description</th>
              <th>Discount ($)</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>${coupon.discount}</td>
                <td>{coupon.expiryDate}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="btn bg-[#50B761] text-white btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="btn bg-[#DA3535] text-[#fefefe] btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-gray-500">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeCoupon;
