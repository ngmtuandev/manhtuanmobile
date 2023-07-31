import React from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import path from "../ultis/path";
const Login = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-20">
      <div className="flex flex-col w-[30%] shadow-2xl bg-slate-200 p-5 rounded-md justify-center items-center">
        <h3 className="text-[25px]">Đăng nhập vào tài khoản</h3>
        <form action="" className="flex items-center flex-col">
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="email"
            placeholder="nhập email của bạn"
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="password"
            placeholder="mật khẩu"
          ></input>
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="password"
            placeholder="xác nhận mật khẩu"
          ></input>
          <div className="mt-6 mb-2">
            <Button text={"Đăng Nhập"}></Button>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-10 mt-2">
          <small className="cursor-pointer hover:text-gray-600">
            <Link to={path.home}>Quay lại trang chủ</Link>
          </small>
          <small className="cursor-pointer hover:text-gray-600">
            Đăng ký tài khoản
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
