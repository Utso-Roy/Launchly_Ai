import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../Services/products_Api/Featured_Products_Api";
import Loading from "../../Context/Auth/Loader/Loading";
import { useNavigate } from "react-router";

const ReportedContent = () => {
  const navigate = useNavigate();

  const { data: report = [], isLoading } = useQuery({
    queryKey: ["reported_contents"],
    queryFn: () => axiosSecure("reported"),
  });

  if (isLoading) return <Loading> </Loading>;

  const handelDetailsBtn = (e) => {
    console.log(e);

    navigate(`/products/${e}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto  p-4 dark:bg-gray-900 ">
      <h2 className="text-2xl text-[#267DC6] font-semibold text-center mb-6 dark:text-white">
        Reported Products
      </h2>
<div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
    <thead className="bg-base-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <tr>
        <th className="py-3 px-4">Number</th>
        <th className="py-3 px-4">Image</th>
        <th className="py-3 px-4">Product Name</th>
        <th className="py-3 px-4">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-300 dark:divide-gray-800 bg-white dark:bg-gray-900">
      {report.map((item, index) => (
        <tr key={item._id}>
          {/* Serial */}
          <td className="py-3 px-10 text-gray-700 dark:text-gray-200">
            {index + 1}
          </td>

          {/* Image */}
          <td className="py-3 px-4">
            <img
              src={item?.productImage || "https://i.ibb.co/0F3VJfp/resume.jpg"}
              alt="Product"
              className="w-12 h-12 object-cover rounded shadow  dark:border-gray-600"
            />
          </td>

          {/* Product Name */}
          <td className="py-3 px-4 text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
            {item?.productName || "No Name"}
          </td>

          {/* Actions */}
          <td className="py-3 px-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handelDetailsBtn(item?._id)}
                className="bg-[#21CAD2] cursor-pointer hover:bg-[#68bbbf] text-white px-3 py-2 rounded-md text-sm transition"
              >
                View Details
              </button>
              <button
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ReportedContent;
