import React, { useState } from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { updateUser } from "../service/userApi";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/slide/userSlide";
import jwtDecode from "jwt-decode";
import { getBase64 } from "../ultis/getBase";
const UpdateUser = () => {
  // console.log("decode", decodeToken);
  // const { ...data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState();
  const [stateValid, setStateValid] = useState(true);
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
    <div className="h-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-20">
      <div className="flex flex-col w-[30%] shadow-2xl bg-slate-200 p-5 rounded-md justify-center items-center">
        <h3 className="text-[25px]">Cập nhập thông tin</h3>
        <form action="" className="flex items-center flex-col">
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="email"
            placeholder="nhập email của bạn (BẮT BUỘC)"
            value={userName}
            onChange={handleEmail}
          ></input>
          {!stateValid ? (
            <small className="text-red-600">Bạn phải nhập email</small>
          ) : (
            ""
          )}
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="text"
            placeholder="tên của bạn"
            value={name}
            onChange={handleName}
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={handlePhone}
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="password"
            placeholder="mật khẩu"
            value={password}
            onChange={handlePassword}
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="text"
            placeholder="Địa chỉ (Thôn/Xã/Quận(huyện)/Tỉnh)"
            value={address}
            onChange={handleAddress}
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="file"
            placeholder="Ảnh đại diện"
            onChange={handleAvatar}
          ></input>
          <img className="w-20" src={avatar} alt=""></img>
          <div className="mt-6 mb-2" onClick={handleSubmit}>
            <Button text={"Cập nhập"}></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
