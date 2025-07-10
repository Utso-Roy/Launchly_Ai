import React, { useEffect, useState } from "react";

const Products = () => {
    const [productData,setProductData] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/all_products")
      .then((res) => res.json())
      .then((data) => setProductData(data));
  }, []);
    
    
    console.log(productData)
    
    

  return <div>this is products route</div>;
};

export default Products;
