import React from "react";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";
import path from "../ultis/path";

const Header = () => {
  const {
    AiOutlineSearch,
    AiOutlineCaretDown,
    AiOutlineShoppingCart,
    AiOutlineUser,
  } = icons;
  return (
    <div className="flex bg-bg_main justify-between items-center px-5 h-14">
      <div className="font-semibold text-gray-50 text-[20px]">
        <Link to={path.home}>Mạnh Tuấn Mobile</Link>
      </div>
      <div className="flex relative items-center">
        <input
          className="rounded-xl w-[300px] h-7 outline-none px-3"
          placeholder="Nhập tìm kiếm ..."
        ></input>
        <div className="absolute right-2 cursor-pointer">
          <AiOutlineSearch size={20}></AiOutlineSearch>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-7 text-gray-50">
          <div className="mr-1">
            <AiOutlineUser size={29}></AiOutlineUser>
          </div>
          <div className="flex flex-col text-[14px]">
            <div className="flex">
              <span className="hover:text-gray-200 cursor-pointer">
                <Link to={path.login}>Đăng nhập</Link>
              </span>
              <span>/</span>
              <span className="hover:text-gray-200 cursor-pointer">
                Đăng ký
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-1 cursor-pointer">Tài khoản</span>
              <AiOutlineCaretDown></AiOutlineCaretDown>
            </div>
          </div>
        </div>
        <div className="flex items-center text-gray-100">
          <div className="mr-1">
            <AiOutlineShoppingCart size={28}></AiOutlineShoppingCart>
          </div>
          <span>Giỏ hàng</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
