import React, { useEffect, useState } from "react";
import Loading from "../../Context/Auth/Loader/Loading";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ReportedContent = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/reported")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reported`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Deleted Successfully");
        // UI থেকে ম্যানুয়ালি রিমুভ করতে পারো: যেকোনো একটা item যার isFeatured === true
        setReport((prevReport) =>
          prevReport.filter((item) => item.isFeatured !== true)
        );
      } else {
        toast.error("No featured product found to delete");
      }
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const handelDetailsBtn = (id) => {
    navigate(`/dashboard/reportDetails/${id}`);
  };

  if (report.length === 0) {
    return (
      <div className="w-full max-w-4xl my-10  mx-10 dark:bg-gray-900">
        <h2 className="font-semibold  text-2xl text-gray-600 text-center dark:text-white">
          No Reported Products Found
        </h2>
      </div>
    );
  }

  if (loading)
    return (
      <div className="block mx-auto">
        {" "}
        <Loading />;
      </div>
    );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-900">
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
                <td className="py-3 px-10 text-gray-700 dark:text-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={
                      item?.productImage ||
                      "https://i.ibb.co/0F3VJfp/resume.jpg"
                    }
                    alt="Product"
                    className="w-12 h-12 object-cover rounded shadow dark:border-gray-600"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
                  {item?.productName || "No Name"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handelDetailsBtn(item?._id)}
                      className="bg-[#21CAD2] cursor-pointer hover:bg-[#68bbbf] text-white px-3 py-2 rounded-md text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete()}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
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
