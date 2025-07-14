import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Context/Auth/Loader/Loading";
import { Link } from "react-router"; 
import { toast } from "react-toastify";

const ReviewQueue = () => {
  const { user } = useContext(AuthContext);
  const [postProducts, setPostProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = user?.email;
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:3000/add_products_data/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const order = { Pending: 0, Accepted: 1, Rejected: 2 };
        const sorted = [...data].sort((a, b) => order[a.status] - order[b.status]);
        setPostProducts(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("JWT Protected Route Error:", err);
      });
  }, [user]);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Accepted" }),
      });
      const result = await res.json();
      if (result.modifiedCount) {
        toast.success("Product Accepted");
        setPostProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "Accepted" } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected" }),
      });
      const result = await res.json();
      if (result.modifiedCount) {
        toast.warning("Product Rejected");
        setPostProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "Rejected" } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeatured = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}/feature`, {
        method: "PATCH",
      });
      const result = await res.json();
      if (result.modifiedCount) {
        toast.info("Product marked as Featured");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4   overflow-x-auto bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl text-center font-bold mb-4 text-[#201571] dark:text-white">
        Product Review Queue
      </h2>
      <table className="table  min-w-[800px] mx-auto  text-gray-800 dark:text-white">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th>Product Name</th>
            <th>View Details</th>
            <th>Make Featured</th>
            <th>Status</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {postProducts.map((product) => (
            <tr key={product?._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td>{product?.data?.name}</td>
              <td>
                <Link to={`/product-details/${product?._id}`}>
                  <button className="btn btn-sm bg-[#21BEDA] text-white hover:bg-[#1ba9c3]">
                    View
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-sm  bg-[#21BEDA] text-white  hover:bg-[#1ba9c3]"
                  onClick={() => handleFeatured(product?._id)}
                >
                  Make Featured
                </button>
              </td>
<td
  className={`font-medium ${product?.status === "Accepted" ? "text-green-600": product?.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}
>
  {product?.status}
</td>              <td>
                <button
                  className={`btn btn-sm text-white ${
                    product?.status !== "pending"
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-[#25A65B] hover:bg-green-700"
                  }`}
                  disabled={product?.status !== "pending"}
                  onClick={() => handleAccept(product?._id)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-sm text-white ${
                    product?.status !== "pending"
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-[#E30F3A] hover:bg-red-700"
                  }`}
                  disabled={product?.status !== "pending"}
                  onClick={() => handleReject(product?._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewQueue;
