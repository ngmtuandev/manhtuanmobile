import React from "react";
import icons from "../ultis/icons";
const CardProduct = () => {
  const { AiFillStar } = icons;
  return (
    <div className="bg-gray-50 p-3 shadow-xl cursor-pointer">
      <div>
        <img
          src="https://clickbuy.com.vn/uploads/2023/07/ava-zflip5-Purrple.png"
          alt=""
        />
      </div>
      <div className="mt-2">
        <span className="">Samsung Galaxy Z Flip5 8GB 512GB Chính Hãng</span>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-[13px] mr-1">4.5</span>
            <div className="text-yellow-400">
              <AiFillStar></AiFillStar>
            </div>
          </div>
          <div className="border-l-[2px] text-[13px] pl-2 ml-2">
            <span>Đã bán 1000</span>
          </div>
        </div>
        <div>
          <span className="text-red-600 font-semibold">
            12.000.000 đ<small>-5%</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
