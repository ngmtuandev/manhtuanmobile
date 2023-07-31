import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { dataUser } from "../service/userApi";
import { useNavigate } from "react-router-dom";

const Header = ({
  dataSearch,
  setDataSearch,
  isShowMenuUser,
  setIsShowMenuUser,
}) => {
  const {
    AiOutlineSearch,
    AiOutlineCaretDown,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiFillBell,
  } = icons;

  const navigate = useNavigate();

  const { name, token, avatar } = useSelector((state) => state.user);
  const { orderItem, orderSuccess } = useSelector((state) => state.order);
  const { totalOrder, setTotalOrder } = useState("");
  // console.log("orderItem", orderItem);
  const [avatarUser, setAvatarUser] = useState("");
  // console.log("name header", name, token);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/dang-nhap");
    window.location.reload();
  };
  const calculateOrder = () => {
    return orderItem.reduce((total, item) => total + +item.total, 0);
  };

  // const [isShowMenuUser, setIsShowMenuUser] = useState(false);

  // console.log("calculateOrder");

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
    <div className="flex bg-bg_main items-center justify-between px-5  h-14">
      <div className="font-semibold font-mono text-gray-50 text-[20px]">
        <Link to={path.home}>Mạnh Tuấn Mobile</Link>
      </div>
      <div className="relative flex items-center">
        <input
          onChange={(e) => setDataSearch(e.target.value)}
          className="rounded-sm w-[500px] h-8 text-[13px] outline-none px-3"
          placeholder="Nhập sản phẩm bạn đang tìm kiếm ..."
        ></input>
        <div
          className="absolute cursor-pointer  right-2"
          onClick={() => console.log(dataSearch)}
        >
          <AiOutlineSearch
            className="text-gray-700"
            size={20}
          ></AiOutlineSearch>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative flex items-center text-gray-100 mr-7">
          <div
            className="mr-1 text-gray-100 cursor-pointer"
            onClick={handleCart}
          >
            <AiFillBell size={23}></AiFillBell>
          </div>
          <span className="text-gray-100 text-[14px] ml-1">Thông báo</span>
          <span className="absolute w-5 h-5 bg-gray-800 text-[12px] left-[10px] top-[-8px] text-gray-300 flex items-center justify-center font-semibold rounded-full">
            0
          </span>
        </div>
        <div className="relative flex items-center text-gray-100 mr-7">
          <div
            className="mr-1 text-gray-100 cursor-pointer"
            onClick={handleCart}
          >
            <AiOutlineShoppingCart size={23}></AiOutlineShoppingCart>
          </div>
          <span className="text-gray-100 text-[14px] ml-2">Giỏ hàng</span>
          <span className="absolute w-5 h-5 bg-gray-800 text-[12px] left-4 top-[-8px] text-gray-300 flex items-center justify-center font-semibold rounded-full">
            {orderSuccess ? 0 : calculateOrder()}
          </span>
        </div>
        <div className="relative flex items-center text-gray-50">
          <div className="mr-1 flex items-center">
            {avatarUser?.length > 0 ? (
              <img
                className="rounded-full cursor-pointer mr-1 w-8 h-8"
                onClick={() => {
                  setIsShowMenuUser(!isShowMenuUser);
                }}
                src={avatarUser}
                alt="avatar"
              ></img>
            ) : (
              <div
                onClick={() => {
                  setIsShowMenuUser(!isShowMenuUser);
                }}
              >
                <AiOutlineUser size={23}></AiOutlineUser>
              </div>
            )}
            <span>{name ? name : ""}</span>
          </div>
          {token ? (
            isShowMenuUser && (
              <div className="flex z-50 shadow-2xl rounded-md absolute top-12 w-[170px] p-4 text-gray-800 right-0 bg-white flex-col">
                <span className="p-2 mb-2 rounded-md cursor-pointer bg-bg_gray bg-opacity-70 hover:bg-opacity-100">
                  Xin chào,
                  <Link to={path.updateuser}> {name}</Link>
                </span>
                <span
                  className="p-2 mb-2 rounded-md cursor-pointer bg-bg_gray bg-opacity-70 hover:bg-opacity-100"
                  onClick={() => handleLogout()}
                >
                  Đăng Xuất
                </span>
              </div>
            )
          ) : (
            <div className="flex flex-col text-[14px]">
              <div className="flex">
                <span className="cursor-pointer hover:text-gray-200">
                  <Link to={path.login}>Đăng nhập</Link>
                </span>
                <span>/</span>
                <span className="cursor-pointer hover:text-gray-200">
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
      </div>
    </div>
  );
};

export default Header;
