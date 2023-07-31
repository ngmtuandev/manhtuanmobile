import React, { useEffect, useState } from "react";
import { CardProduct } from "./index";
import { getAllProduct } from "../service/productApi";
const Products = () => {
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      setDataProduct(dataProduct?.data);
    })();
  }, []);
  return (
    <div className="grid grid-cols-5 gap-3 px-5">
      {dataProduct?.length > 0 &&
        dataProduct?.map((data, index) => (
          <CardProduct key={index} data={data}></CardProduct>
        ))}
    </div>
  );
};

export default Products;
