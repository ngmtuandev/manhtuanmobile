import React, { useState } from "react";
import { useSelector } from "react-redux";
import { convertPrice } from "../ultis/convertPrice";
import { Link } from "react-router-dom";
const OrderProcess = () => {
  const { address } = useSelector((state) => state.user);

  const { orderItem } = useSelector((state) => state.order);

  const calculateTotal = () => {
    return orderItem.reduce(
      (total, item) => total + item.price * item.total,
      0
    );
  };

  return (
    <div className="bg-bg_gray h-screen px-5">
      <div className="flex justify-around pt-5">
        <Link to="/gio-hang">
          <div className="flex flex-col justify-center items-center">
            <div
              className="w-8 h-8 rounded-full cursor-pointer hover:bg-opacity-80
              bg-white border flex items-center justify-center text-gray-900 text-[19px] font-bold"
            >
              1
            </div>
            <span>Giỏ Hàng</span>
          </div>
        </Link>
        <Link to="/thanh-toan">
          <div className="flex flex-col justify-center items-center">
            <div
              className="w-8 h-8 rounded-full cursor-pointer hover:bg-opacity-80
              bg-white border flex items-center justify-center text-gray-900 text-[19px] font-bold"
            >
              2
            </div>
            <span>Thanh Toán</span>
          </div>
        </Link>
        <Link to="/don-hang-cua-ban">
          <div className="flex flex-col justify-center items-center">
            <div
              className="w-8 h-8 rounded-full cursor-pointer hover:bg-opacity-80
           bg-bg_main flex items-center justify-center text-gray-50 text-[19px] font-bold"
            >
              3
            </div>
            <span>Đơn Hàng</span>
          </div>
        </Link>
      </div>
      <div className="container mx-auto p-4">
        <h3>Đơn hàng đặt thành công</h3>
        <div>
          <div>
            <h2>Phương thức giao hàng</h2>
            <div>
              <div className="flex items-center">
                <p className="ml-2">Giao hàng tiết kiệm</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Phương thức thanh toán</h2>
            <div>
              <p className="ml-2">Thanh toán khi nhận hàng</p>
            </div>
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Sản phẩm</th>
            <th className="px-4 py-2">Gía tiền</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderItem.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{convertPrice(item.price)}</td>
              <td className="border px-4 py-2">{item.total}</td>
              <td className="border px-4 py-2">
                {convertPrice(item.price * item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-col w-[300px] justify-center items-center py-5 rounded-md bg-white">
        <h2 className="text-lg mt-3 font-semibold flex flex-col items-center">
          <span>Tổng tiền:</span>
          <span className="text-red-500 font-bold text-[23px]">
            {convertPrice(calculateTotal())}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default OrderProcess;
