import React from "react";
import { useSelector } from "react-redux";
import { convertPrice } from "../ultis/convertPrice";
import { Link, useNavigate } from "react-router-dom";
import emtycart from "../assets/empty_cart.webp";
const Cart = () => {
  const navigate = useNavigate();

  const { address } = useSelector((state) => state.user);

  const { orderItem } = useSelector((state) => state.order);
  console.log("orderItem in cart", orderItem);

  const calculateTotal = () => {
    return orderItem.reduce(
      (total, item) => total + item.price * item.total,
      0
    );
  };

  const handlePayment = () => {
    navigate("/thanh-toan");
  };

  return (
    <div className="bg-bg_gray h-screen">
      <div className="flex justify-around pt-5">
        <Link to="/gio-hang">
          <div className="flex flex-col justify-center items-center">
            <div
              className="w-8 h-8 rounded-full cursor-pointer hover:bg-opacity-80
              bg-bg_main border flex items-center justify-center text-gray-50 text-[19px] font-bold"
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
              bg-white border flex items-center justify-center text-gray-900 text-[19px] font-bold"
            >
              3
            </div>
            <span>Đơn Hàng</span>
          </div>
        </Link>
      </div>
      {orderItem?.length <= 0 ? (
        <div className="flex justify-center items-center mt-24">
          <img src={emtycart} alt="emtycart"></img>
        </div>
      ) : (
        <div className="flex justify-end px-5 my-16">
          <div className="pr-5 text-gray-600">
            <thead>
              <tr>
                <th className="px-2 py-2">Sản phẩm</th>
                <th className="px-2 py-2">Gía tiền</th>
                <th className="px-2 py-2">Số lượng</th>
                <th className="px-2 py-2">Tổng tiền</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orderItem.map((item) => (
                <tr key={item.id}>
                  <td className=" px-4 py-2">{item.name}</td>
                  <td className=" px-4 py-2">{convertPrice(item.price)}</td>
                  <td className=" px-7 py-2">{item.total}</td>
                  <td className=" px-4 py-2">
                    {convertPrice(item.price * item.total)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-bg_main hover:bg-opacity-90 text-white py-1 px-5 flex items-center 
                  justify-center rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
          <div className="mt-[-40px] shadow-xl flex flex-col w-[300px] justify-center items-center py-5 rounded-md bg-white">
            <div className="flex flex-col">
              <span>Tạm tính : {convertPrice(calculateTotal())}</span>
              <span>Giảm giá : 0%</span>
              <span>Phí giao hàng : 10.000 VNĐ</span>
              <span>
                Địa chỉ : {address?.length > 0 ? address : "Chưa cập nhập"}
              </span>
            </div>
            <h2 className="text-lg mt-3 font-semibold flex flex-col items-center">
              <span>Tổng tiền:</span>
              <span className="text-red-500 font-bold text-[23px]">
                {convertPrice(calculateTotal())}
              </span>
              <button
                onClick={handlePayment}
                className="p-4 w-[200px] mt-4 h-[30px] bg-bg_main hover:bg-opacity-90 flex justify-center 
            items-center text-gray-50 rounded-md"
              >
                Đặt Hàng
              </button>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
