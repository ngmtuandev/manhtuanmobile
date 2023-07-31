import React, { useState } from "react";
import { CardProduct } from "./index";
import HashLoader from "react-spinners/HashLoader";

const ProductsType = (data) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 500);
  return (
    <div className="w-[300px] mt-10">
      {isLoading && (
        <div className="z-10 w-screen ml-[-30px] min-h-[800px] mt-[-130px] bg-black bg-opacity-70 flex items-center justify-center fixed">
          <HashLoader color="#ff2626" size={75} loading={isLoading} />
        </div>
      )}
      <CardProduct data={data?.data}></CardProduct>
    </div>
  );
};

export default ProductsType;
