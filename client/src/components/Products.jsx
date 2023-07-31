import React, { useEffect, useState } from "react";
import { CardProduct } from "./index";
import { getAllProduct, getAllInPage } from "../service/productApi";

const Products = ({ dataSearch }) => {
  const [dataProduct, setDataProduct] = useState();
  const [productInPage, setProductInPage] = useState();
  const totalPage = Math.ceil(dataProduct?.length / 10);
  const [pageCurr, setPageCurr] = useState(0);
  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i);
  }
  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      setDataProduct(dataProduct?.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dataProduct = await getAllInPage(pageCurr);
      setProductInPage(dataProduct?.data);
    })();
  }, [pageCurr]);

  useEffect(() => {
    (async () => {
      const dataProductSearch = await getAllProduct();
      setDataProduct(
        dataProductSearch?.data?.filter((item) =>
          item?.nameProduct.toLowerCase().includes(dataSearch.toLowerCase())
        )
      );
      if (dataSearch === "") {
        setDataProduct(dataProductSearch?.data);
      }
    })();
  }, [dataSearch]);

  const handlePageCurr = (cur) => {
    // console.log(cur);
    setPageCurr(cur);
  };

  console.log(pageCurr);

  return (
    <div className="px-5 mb-10 flex flex-col justify-center">
      <div className="flex items-center mb-7 h-[35px] px-2 py-4 bg-[rgb(255,0,29)] w-[260px] justify-center shadow-md rounded-md">
        <h2 className="text-[15px] uppercase font-semibold text-gray-100">
          Tất cả sản phẩm
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-5 gap-3">
          {dataSearch.length > 0
            ? dataProduct?.length > 0 &&
              dataProduct?.map((data, index) => (
                <CardProduct key={index} data={data}></CardProduct>
              ))
            : productInPage?.length > 0 &&
              productInPage?.map((data, index) => (
                <CardProduct key={index} data={data}></CardProduct>
              ))}
        </div>
        <div className="flex">
          {pages?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handlePageCurr(item);
                }}
                key={index}
                className={`text-gray-50 mb-3 cursor-pointer rounded-md mx-1 hover:bg-opacity-80
                w-[20px] flex justify-center items-center h-[20px] p-3  font-semibold
                ${+item === +pageCurr ? `bg-red-600` : `bg-red-500`} `}
              >
                {item + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
