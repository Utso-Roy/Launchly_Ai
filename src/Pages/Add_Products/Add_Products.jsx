import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ProductsPostData from "../../Utils/ProductsPostData/ProductsPostData";

const Add_Products = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const productData = {
      ...data,
      tags: tags.split(",").map((tag) => tag.trim()), 
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerImage: user?.photoURL,
      timestamp: new Date(),
      }; 
      ProductsPostData(productData)
      reset()
      setTags("")


};


      



  return (
    <div  data-aos="zoom-in-down" data-aos-duration="2000" className="max-w-2xl  mx-8 my-3 p-8 bg-base-200 dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-[#21BEDA] mb-8">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: "Product Name is required" })}
            type="text"
            placeholder="Enter product name"
            className="w-full input input-bordered focus:ring-2 focus:ring-[#21BEDA]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Product Image URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("image", { required: "Image URL is required" })}
            type="url"
            placeholder="Enter image URL"
            className="w-full input input-bordered focus:ring-2 focus:ring-[#21BEDA]"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe your product"
            rows="5"
            className="w-full textarea textarea-bordered focus:ring-2 focus:ring-[#21BEDA]"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* External Link */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            External Link (Optional)
          </label>
          <input
            {...register("externalLink", {
              pattern: {
                value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/i,
                message: "Enter a valid URL",
              },
            })}
            type="url"
            placeholder="Product website or landing page"
            className="w-full input input-bordered focus:ring-2 focus:ring-[#21BEDA]"
          />
          {errors.externalLink && (
            <p className="text-red-500 text-sm mt-1">{errors.externalLink.message}</p>
          )}
        </div>

        {/* Tags Input (Simple text input) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. ai, productivity, tool"
            className="w-full input input-bordered focus:ring-2 focus:ring-[#21BEDA]"
          />
        </div>

        {/* Owner Info */}
        <fieldset className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
          <legend className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Product Owner Info
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex flex-col items-center">
              <img
                src={user?.photoURL || "https://i.ibb.co/ZVGf7Vn/user.png"}
                alt="Owner"
                className="w-20 h-20 rounded-full mb-2 border-2 border-[#21BEDA]"
              />
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                Owner Image
              </p>
            </div>

            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300 text-sm">
                Owner Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Anonymous"}
                readOnly
                className="input input-bordered bg-gray-100 dark:bg-gray-800 dark:text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300 text-sm">
                Owner Email
              </label>
              <input
                type="email"
                value={user?.email || "N/A"}
                readOnly
                className="input input-bordered bg-gray-100 dark:bg-gray-800 dark:text-white cursor-not-allowed"
              />
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 cursor-pointer bg-[#21BEDA] hover:bg-[#1ca6c0] text-white font-semibold rounded-md transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default Add_Products;
