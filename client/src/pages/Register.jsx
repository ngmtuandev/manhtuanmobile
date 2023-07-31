import React, { useState } from "react";
import { Button } from "../components/index";
import path from "../ultis/path";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../service/userApi";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import icperson from "../assets/icperson.png";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUsername(e.target.value);
    console.log(userName);
    setData("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setData("");
  };

  const handleName = (e) => {
    setName(e.target.value);
    setData("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setData("");
  };

  const handleSetPassword = (e) => {
    setConfirmPassword(e.target.value);
    setData("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const dataRedister = await register({
        name: name,
        email: userName,
        password: password,
        confirmPassword: confirmPassword,
        phone: phone,
      });
      setData(dataRedister);
    })();
    if (+data?.status === 0) {
      toast.success("Đăng kí tài khoản thành công");
      setTimeout(() => {
        navigate("/dang-nhap");
      }, 1000);
    } else if (+data?.status === 1) {
      toast.warning("Đăng kí tài khoản thất bại");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <ToastContainer />
      <div className="flex flex-col p-5 rounded-md justify-center items-center">
        <h3 className="text-[25px] text-gray-600 uppercase">Tạo tài khoản</h3>
        <form action="" className="flex items-center flex-col">
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="email"
            placeholder="nhập email của bạn"
            value={userName}
            onChange={handleEmail}
          ></input>
          <small className="text-red-600 mt-2 font-semibold">
            {+data?.status === 1 &&
            String(data.mess) === "Người dùng đã tồn tại"
              ? `${data.mess}`
              : ""}
          </small>
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="text"
            placeholder="tên của bạn"
            value={name}
            onChange={handleName}
          ></input>
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={handlePhone}
          ></input>
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="password"
            placeholder="mật khẩu"
            value={password}
            onChange={handlePassword}
          ></input>
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="password"
            placeholder="xác nhận mật khẩu"
            value={confirmPassword}
            onChange={handleSetPassword}
          ></input>
          <small className="text-red-600 mt-2 font-semibold">
            {+data?.status === 1 &&
            String(data.mess) === "Mật khẩu xác nhận bạn nhập không đúng"
              ? `${data.mess}`
              : ""}
          </small>
          <div className="mt-6 mb-2" onClick={handleSubmit}>
            <Button text={"Đăng Kí"}></Button>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-10 mt-2">
          <small className="cursor-pointer text-red-600 font-medium hover:text-gray-600">
            <Link to={path.home}>Quay lại trang chủ</Link>
          </small>
          <small className="cursor-pointer text-red-600 font-medium hover:text-gray-600">
            <Link to={path.login}>Đăng nhập</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
