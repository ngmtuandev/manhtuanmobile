import React from "react";
import icons from "../ultis/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../ultis/convertPrice";
const CardProduct = ({ data, masterdiscout }) => {
  const navigate = useNavigate();
  const { AiFillStar, BsFire } = icons;
  const handleDetailProduct = () => {
    navigate(`/chi-tiet-san-pham/${data?._id}`);
  };
  return (
    <div
      className="rounded-md mb-5 h-[360px] shadow-md cursor-pointer"
      onClick={handleDetailProduct}
    >
      <div className="relative">
        <img
          className="w-[100%] mb-[2px] hover:translate-y-4 transition-all rounded-md h-[220px]"
          src={data?.image}
          alt=""
        />
        {+data?.discount !== 0 && (
          <div
            className="absolute w-12 h-12 text-gray-100 font-semibold bg-opacity-75
        shadow-xl p-3 flex-col flex items-center justify-center top-0 rounded-tr-md rounded-bl-md right-0 bg-bg_main"
          >
            <span>{data?.discount}%</span>
            <span>OFF</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="h-[60px]">
          <span className="font-medium text-gray-600">
            {data?.nameProduct.length > 40
              ? `${data?.nameProduct.slice(0, 40)}...`
              : data?.nameProduct}
          </span>
        </div>
        {masterdiscout ? (
          <div
            className="px-3 relative rounded-md py-1 mt-3 bg-[rgb(255,0,29)] h-10 
          flex justify-center items-center bg-opacity-80 hover:bg-opacity-70"
          >
            <div>
              <span className="text-gray-100 font-medium">
                Mua Ngay Kẻo Hết
              </span>
            </div>
            <div>
              <BsFire
                className="text-yellow-400 absolute -top-4 -left-[6px]"
                size={38}
              ></BsFire>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center text-gray-700">
              <div className="flex items-center">
                <span className="text-[13px] mr-1">{data?.rate}</span>
                <div className="text-yellow-400">
                  <AiFillStar></AiFillStar>
                </div>
              </div>
              <div className="border-l-[2px] text-[13px] pl-2 ml-2">
                <span>Đã bán: 100+</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-red-600 flex items-center font-semibold">
                <p className="text-[18px]">{convertPrice(data?.price)}</p>
                <small className="ml-1 px-1 rounded-md border border-red-600">
                  {data?.discount ? `-${data?.discount}%` : ""}
                </small>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
