import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const ProductsPostData = (data) => {
  const axiosData = axios
    .post("https://launchly-server-side.vercel.app/add_products_data", { data })
    .then((res) => {
      console.log("Product saved:", res.data);

      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Your product has been successfully added.",
        confirmButtonColor: "#21BEDA",
      });
    })
    .catch((err) => {
      console.error("Error saving product:", err);

      //
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the product!",
        confirmButtonColor: "#d33",
      });
    });
  return axiosData;
};

export default ProductsPostData;
