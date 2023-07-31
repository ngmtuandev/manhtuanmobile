import React from "react";
import { CardProduct } from "./index";

const ProductsType = (data) => {
  console.log("data product type : ", data);
  return (
    <div className="w-[300px] mt-5">
      <CardProduct data={data?.data}></CardProduct>
    </div>
  );
};

export default ProductsType;
