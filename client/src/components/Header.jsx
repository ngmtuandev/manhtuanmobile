import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { dataUser } from "../service/userApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {
    AiOutlineSearch,
    AiOutlineCaretDown,
    AiOutlineShoppingCart,
    AiOutlineUser,
  } = icons;

  const navigate = useNavigate();

  const { name, token, avatar } = useSelector((state) => state.user);
  const { orderItem, orderSuccess } = useSelector((state) => state.order);
  const { totalOrder, setTotalOrder } = useState("");
  console.log("orderItem", orderItem);
  const [avatarUser, setAvatarUser] = useState("");
  console.log("name header", name, token);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/dang-nhap");
    window.location.reload();
  };
  const calculateOrder = () => {
    return orderItem.reduce((total, item) => total + +item.total, 0);
  };

  console.log("calculateOrder");

  useEffect(() => {
    try {
      const tokenLocal = localStorage?.getItem("token_user");
      const decodeToken = jwtDecode(tokenLocal);
      if (tokenLocal?.length > 0) {
        let id = decodeToken?.id;
        (async () => {
          const dataApi = await dataUser(id, tokenLocal);
          const dataUserApi = {
            data: dataApi?.data,
            token: tokenLocal,
          };
          let fileAvatar = dataUserApi?.data?.avatar;
          setAvatarUser(fileAvatar);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [avatar, avatarUser, orderItem]);

  const handleCart = () => {
    navigate("/gio-hang");
  };

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
            {avatarUser?.length > 0 ? (
              <img
                className="w-7 h-7 rounded-full"
                src={avatarUser}
                alt="avatar"
              ></img>
            ) : (
              <AiOutlineUser size={29}></AiOutlineUser>
            )}
          </div>
          {token ? (
            <div className="flex flex-col">
              <span>
                <Link to={path.updateuser}>{name}</Link>
              </span>
              <span
                className="text-[13px] cursor-pointer"
                onClick={() => handleLogout()}
              >
                Đăng Xuất
              </span>
            </div>
          ) : (
            <div className="flex flex-col text-[14px]">
              <div className="flex">
                <span className="hover:text-gray-200 cursor-pointer">
                  <Link to={path.login}>Đăng nhập</Link>
                </span>
                <span>/</span>
                <span className="hover:text-gray-200 cursor-pointer">
                  <Link to={path.register}>Đăng ký</Link>
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-1 cursor-pointer">Tài khoản</span>
                <AiOutlineCaretDown></AiOutlineCaretDown>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center relative text-gray-100">
          <div className="mr-1 cursor-pointer" onClick={handleCart}>
            <AiOutlineShoppingCart size={28}></AiOutlineShoppingCart>
          </div>
          <span>Giỏ hàng</span>
          <span className="absolute w-5 h-5 bg-gray-800 text-[12px] left-4 top-[-8px] text-gray-300 flex items-center justify-center font-semibold rounded-full">
            {orderSuccess ? 0 : calculateOrder()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
