import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProductType } from "../service/productApi";
import { ProductsType } from "../components";
const ProductType = () => {
  const { type } = useParams();
  const [dataProductType, setDataProductType] = useState();
  useEffect(() => {
    (async () => {
      const dataProdcut = await getAllProductType(type);
      setDataProductType(dataProdcut?.data);
    })();
  }, [type]);
  console.log("dataProductType", dataProductType);
  return (
    <div className="p-5">
      <h3 className="flex justify-center">{type}</h3>
      <div className="grid grid-cols-4 gap-28">
        {dataProductType?.length > 0 &&
          dataProductType?.map((item, index) => (
            <div key={index}>
              <ProductsType data={item}></ProductsType>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductType;
