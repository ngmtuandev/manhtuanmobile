import React from "react";
import icons from "../ultis/icons";
import { Button } from "./index";
const ProductDetail = () => {
  const { AiFillStar } = icons;
  return (
    <div className="px-5">
      <div className="my-3">
        <span>Trang chủ</span>
      </div>
      <div className="flex mt-7">
        <div className="w-[40%]">
          <div>
            <img
              src="https://cdn.tgdd.vn/Products/Images/1363/291825/mieng-dan-kinh-iphone-14-pro-max-jcpal-1-1.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-between mt-8">
            <img
              className="w-[20%]"
              src="https://cdn.tgdd.vn/Products/Images/1363/291825/mieng-dan-kinh-iphone-14-pro-max-jcpal-2.jpg"
              alt=""
            ></img>
            <img
              className="w-[20%]"
              src="https://cdn.tgdd.vn/Products/Images/1363/291825/mieng-dan-kinh-iphone-14-pro-max-jcpal-2.jpg"
              alt=""
            ></img>
            <img
              className="w-[20%]"
              src="https://cdn.tgdd.vn/Products/Images/1363/291825/mieng-dan-kinh-iphone-14-pro-max-jcpal-2.jpg"
              alt=""
            ></img>
            <img
              className="w-[20%]"
              src="https://cdn.tgdd.vn/Products/Images/1363/291825/mieng-dan-kinh-iphone-14-pro-max-jcpal-2.jpg"
              alt=""
            ></img>
          </div>
        </div>
        <div className="w-[60%]">
          <h3 className=" uppercase text-[25px]">
            Miếng dán kính iPhone 14 Pro Max Jcpal{" "}
          </h3>
          <div className="flex items-center my-4">
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
          <span className="text-[30px] font-semibold">360.000</span>
          <div className="flex items-center mt-3">
            <span className="font-semibold">Giao đến: </span>
            <p className="ml-1"> Q.1, P.Bến Ghé, Hồ Chí Minh</p>
            <p className="ml-1 font-semibold hover:text-gray-800 cursor-pointer">
              - Đổi Địa Chỉ
            </p>
          </div>
          <div className="flex items-center mt-3">
            <span>Số lượng : </span>
            <input
              type="number"
              min={1}
              className="outline-none ml-2 border rounded-md px-2 w-[50px]"
            />
          </div>
          <div className="mt-4 flex">
            <div className="mr-4">
              <Button text={"Mua Ngay"}></Button>
            </div>
            <div>
              <Button text={"Mua Trả Sau"}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
