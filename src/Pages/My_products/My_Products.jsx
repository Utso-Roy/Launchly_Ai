import React, { useEffect, useState } from "react";
import Loading from "../../Context/Auth/Loader/Loading";

const My_Products = () => {
  const [postProducts, setPostProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/add_products_data")
      .then((res) => res.json())
      .then((data) => {
        setPostProducts(data);
        setLoading(false);
      });
  }, []);

  console.log(postProducts);
  if (loading) {
    return (
      <div className="flex justify-center mx-50 items-center min-h-[40vh]">
        {Loading()}
      </div>
    );
  }

  return (
    <div   className="p-4 md:p-8 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-[#101960] text-center dark:text-white">
        My Submitted Products
      </h2>

      {postProducts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No products found.</p>
      ) : (
        <div  className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Image</th>
                <th className="px-4 py-3 text-left font-semibold">Product Name</th>
                <th className="px-4 py-3 text-left font-semibold">Votes</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {postProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                  >
                      
                  <td className="px-4 py-3">
                    <img
                      src={product?.data?.image}
                      alt={product?.data?.name}
                      className="w-12 h-12 object-cover rounded shadow "
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                    {product?.data?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                    {product.votes || 0}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${
                          product?.status === "Accepted"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : product.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        }`}
                    >
                      {product?.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="px-3 py-1 bg-[#21BEDA] cursor-pointer hover:bg-[#84c8d4] text-white text-sm rounded transition">
                      Update
                    </button>
                    <button className="px-3 py-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm rounded transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default My_Products;
