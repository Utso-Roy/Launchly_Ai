import React from "react";
import My_Products from "../../Pages/My_products/My_Products";

const My_Products_Delete_Btn = () => {
  const handelDelete = (id) => {
    console.log(id);
  };

  return (
    <div>
      <My_Products handelDelete={handelDelete}></My_Products>
    </div>
  );
};

export default My_Products_Delete_Btn;
