import React, { useState, useEffect } from "react";
import { getAllProduct } from "../service/productApi";
import { CardProduct } from "./index";
import icons from "../ultis/icons";

const ProductMasterDiscount = () => {
  const { FcFlashOn } = icons;
  const [dataProductMasterDiscout, setDataProductMasterDiscout] = useState();
  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      //   console.log('dataProductMasterDiscout',dataProduct?.data?.filter(item => +item?.discount > 5 ))
      setDataProductMasterDiscout(
        dataProduct?.data?.filter((item) => +item?.discount > 5)
      );
    })();
  }, []);
  return (
    <div className="px-5 mb-10 mt-14 ">
      <div className="flex items-center mb-4 h-[35px] px-2 py-4 bg-[rgb(255,0,29)] w-[260px] justify-center shadow-md rounded-md">
        <h2 className="text-[15px] uppercase font-semibold text-gray-100">
          Giảm giá sốc
        </h2>
        <FcFlashOn size={30}></FcFlashOn>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-5 ">
        {dataProductMasterDiscout?.length > 0 &&
          dataProductMasterDiscout?.map((data, index) => (
            <CardProduct
              masterdiscout={true}
              key={index}
              data={data}
            ></CardProduct>
          ))}
      </div>
    </div>
  );
};

export default ProductMasterDiscount;
