import React, { useEffect, useState } from "react";
import Loading from "../../Context/Auth/Loader/Loading";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";

const My_Products = () => {
  const [postProducts, setPostProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // 🆕 For modal
  const [showModal, setShowModal] = useState(false); // 🆕

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:3000/add_products_data")
      .then((res) => res.json())
      .then((data) => {
        setPostProducts(data);
        setLoading(false);
      });
  }, []);

  // Delete
  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/add_products_data/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setPostProducts((prev) =>
                prev.filter((product) => product._id !== id)
              );
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
            }
          });
      }
    });
  };

  // Update Handler (Open Modal)
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Submit Update Form

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedImage = form.image.value;
    const updatedStatus = form.status.value;

    const updatedData = {
      ...selectedProduct,
      data: {
        ...selectedProduct.data,
        name: updatedName,
        image: updatedImage,
      },
      status: updatedStatus,
    };

    fetch(`http://localhost:3000/add_products_data/${selectedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setPostProducts((prev) =>
            prev.map((item) =>
              item._id === selectedProduct._id ? updatedData : item
            )
          );
          Swal.fire("Updated!", "Product has been updated.", "success");
        }
        setShowModal(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        {Loading()}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl ">
      <h2 className="text-3xl font-bold mb-5 text-[#101960] text-center dark:text-white">
        <Typewriter
          words={["My Submitted Products"]}
          loop={Infinity}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {postProducts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
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
                <tr key={product._id}>
                  <td className="px-4 py-3">
                    <img
                      src={product?.data?.image}
                      alt={product?.data?.name}
                      className="w-12 h-12 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                    {product?.data?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                    {product.votes || 0}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${
                          product?.status === "Accepted"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : product.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        }`}>
                      {product?.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-[#21BEDA] cursor-pointer hover:bg-[#84c8d4] text-white text-sm rounded transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handelDelete(product?._id)}
                      className="px-3 py-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}

      {showModal && selectedProduct && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Product</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                defaultValue={selectedProduct?.data?.name}
                className="input input-bordered w-full"
                required
              />
              <input
                name="image"
                defaultValue={selectedProduct?.data?.image}
                className="input input-bordered w-full"
                required
              />
              <select
                name="status"
                defaultValue={selectedProduct.status || "Pending"}
                className="select select-bordered w-full"
              >
                <option>Pending</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn text-white hover:bg-[#21bedae8] bg-[#21BEDA]">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn bg-red-400 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default My_Products;
