import React, { useState, useEffect } from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { updateUser } from "../service/userApi";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/slide/userSlide";
import jwtDecode from "jwt-decode";
import icons from "../ultis/icons";
import { getBase64 } from "../ultis/getBase";
import { dataUser } from "../service/userApi";
const UpdateUser = () => {
  const { FcAddImage, AiOutlineUser } = icons;
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState();
  const [stateValid, setStateValid] = useState(true);

  const [avatarUser, setAvatarUser] = useState("");
  const [dataUserCurrent, setDataUserCurrent] = useState()
  useEffect(() => {
    try {
      const tokenLocal = localStorage?.getItem("token_user");
      const decodeToken = jwtDecode(tokenLocal);
      if (tokenLocal?.length > 0) {
        let id = decodeToken?.id;
        (async () => {
          const dataApi = await dataUser(id, tokenLocal);
          setDataUserCurrent(dataApi?.data)
          let fileAvatar = dataApi?.data?.avatar;
          setAvatarUser(fileAvatar);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log('dataUserCurrent', dataUserCurrent)

  const handleEmail = (e) => {
    setStateValid(true);
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAvatar = async (e) => {
    const file = e.target.files[0]; // Lấy tệp từ sự kiện
    if (file) {
      try {
        const base64File = await getBase64(file);
        setAvatar(base64File);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    if (userName?.length > 0) {
      dispatch(
        update({
          name: name,
          email: userName,
          password: password,
          phone: phone,
          address: address,
          avatar: avatar,
        })
      );
      const dataUpdate = {};
      if (name) {
        dataUpdate.name = name;
      }
      if (userName) {
        dataUpdate.email = userName;
      }
      if (password) {
        dataUpdate.password = password;
      }
      if (phone) {
        dataUpdate.phone = phone;
      }
      if (address) {
        dataUpdate.address = address;
      }
      if (avatar) {
        dataUpdate.avatar = avatar;
      }
      (async () => {
        try {
          const tokenLocal = localStorage?.getItem("token_user");
          const decodeToken = jwtDecode(tokenLocal);
          await updateUser(decodeToken?.id, dataUpdate);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      e.preventDefault();
      setStateValid(false);
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center ">
      
      <div className="flex flex-col w-[80%] bg-gray-50 p-5 rounded-md justify-center items-center">
        <div className="mb-4 flex flex-col justify-center items-center">
          <h3 className="text-[21px] font-semibold uppercase text-gray-600">Hồ Sơ Của {dataUserCurrent?.name}</h3>
          <small className="text-red-500 font-medium">*Quản lý thông tin hồ sơ để bảo mật tài khoản và địa chỉ giao hàng</small>
        </div>
        <form action="" className="flex items-center justify-center">
          <div className="flex mx-10 flex-col justify-center items-center">
            <div className="flex items-center flex-col mb-2">
              <span className="text-gray-500 font-semibold text-[12px]">Email người dùng </span>
              <input
              className="w-[270px] outline-none rounded-md px-2 h-10 border border-gray-300 text-[13px]"
              type="email"
              placeholder={dataUserCurrent?.email}
              value={userName}
              onChange={handleEmail}
              ></input>
            {!stateValid ? (
              <small className="text-red-600">Bạn phải nhập email</small>
            ) : (
              ""
            )}
            </div>
            <div className="flex items-center flex-col mb-2">
              <span className="text-gray-500 font-semibold text-[12px]">Tên người dùng </span>
              <input
              className="w-[270px] outline-none rounded-md px-2 h-10 border border-gray-300 text-[13px]"
              type="text"
              placeholder={dataUserCurrent?.name}
              value={name}
              onChange={handleName}
              ></input>
            </div>
            <div className="flex items-center flex-col mb-2">
              <span className="text-gray-500 font-semibold text-[12px]">Số điện thoại </span>
              <input
              className="w-[270px] outline-none rounded-md px-2 h-10 border border-gray-300 text-[13px]"
              type="text"
              placeholder={dataUserCurrent?.phone}
              value={phone}
              onChange={handlePhone}
              ></input>
            </div>
            <div className="flex items-center flex-col mb-2">
              <span className="text-gray-500 font-semibold text-[12px]">Mật khẩu </span>
              <input
                className="w-[270px] outline-none rounded-md px-2 h-10 border border-gray-300 text-[13px]"
                type="password"
                placeholder="mật khẩu"
                value={password}
                onChange={handlePassword}
              ></input>
            </div>
            <div className="flex items-center flex-col mb-2">
              <span className="text-gray-500 font-semibold text-[12px]">Địa chỉ </span>
              <input
                className="w-[270px] outline-none rounded-md px-2 h-10 border border-gray-300 text-[13px]"
                type="text"
                placeholder="Địa chỉ (Thôn/Xã/Quận(huyện)/Tỉnh)"
                value={address}
                onChange={handleAddress}
              ></input>
            </div>
            <div className="mt-6 mb-2" onClick={handleSubmit}>
            <Button text={"Cập nhập"}></Button>
          </div>
          </div>
          <div className="flex mx-10 flex-col justify-center items-center">
            <input
              className="w-[270px]  hidden outline-none rounded-md px-2 mt-2 h-8"
              type="file"
              id="set-avatar"
              placeholder="Ảnh đại diện"
              onChange={handleAvatar}
            ></input>
            <img className="rounded-full cursor-pointer w-48 h-48"
                  src={avatar ? avatar : avatarUser} alt=""></img>
            <label
              htmlFor="set-avatar"
              className="mt-4 cursor-pointer"
            >
              <span className="px-2 py-1 border border-gray-500 cursor-pointer">Chọn ảnh</span>
            </label>
          </div>
          
        </form>
      </div>
    
    </div>
  );
};

export default UpdateUser;
