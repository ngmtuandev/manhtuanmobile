import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../ultis/convertPrice";
import { createOrder } from "../service/orderApi";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addCartSuccess } from "../redux/slide/orderSlide";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const PayCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, token, password, address, avatar, phone, userName, admin } =
    useSelector((state) => state.user);
  const [methodPay, setMethodPay] = useState("tienmat");

  const { orderItem } = useSelector((state) => state.order);
  console.log("orderItem in cart", orderItem);

  const calculateTotal = () => {
    return orderItem.reduce(
      (total, item) => total + item.price * item.total,
      0
    );
  };

  console.log("phoneee : ", phone);

  const totalPrice = calculateTotal();
  console.log("address : ", address);
  let data = {
    orderItem: orderItem,
    phone: phone,
    address: address,
    fullName: name,
    paymentMethod: methodPay,
    totalPyament: totalPrice,
  };

  const handlePayment = () => {
    if (address === undefined) {
      toast.warning("Bạn phải cập nhập địa chỉ");
    } else if (name === "" || totalPrice === "") {
      toast.warning("Thông  tin đơn hàng không hợp lệ");
    } else if (phone === 0 || phone === undefined || phone === "") {
      toast.warning("Bạn phải cập nhập số điện thoại");
    } else {
      toast.success("Đặt hàng thành công");
      (() => {
        createOrder(data);
      })();
      setTimeout(() => {
        dispatch(addCartSuccess({ orderSuccess: true }));
        navigate("/don-hang-cua-ban");
      }, 1000);
    }
  };
  return (
    <div className="bg-bg_gray h-screen px-5">
      <ToastContainer />
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
           bg-bg_main flex items-center justify-center text-gray-50 text-[19px] font-bold"
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
      <h3>Thanh toán</h3>
      <div>
        <div>
          <h2>Chọn phương thức giao hàng</h2>
          <div>
            <div className="flex items-center">
              <input type="radio" name="checkbox" value="" checked="checked" />
              <p className="ml-2">Giao hàng nhanh</p>
            </div>
            <div className="flex items-center">
              <input type="radio" name="checkbox" value="" />
              <p className="ml-2">Giao hàng tiết kiệm</p>
            </div>
          </div>
        </div>
        <div>
          <h2>Chọn phương thức thanh toán</h2>
          <div>
            <div className="flex items-center">
              <input type="radio" name="checkbox" value="" checked="checked" />
              <p className="ml-2">Thanh toán khi nhận hàng</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col w-[300px] justify-center items-center py-5 rounded-md bg-white">
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
  );
};

export default PayCart;
