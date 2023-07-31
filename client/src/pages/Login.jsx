import React, { useEffect, useState } from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { login } from "../service/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slide/userSlide";
import { useLocation } from "react-router-dom";
import icperson from "../assets/icperson.png";
const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleEmail = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (+data?.status === 0) {
      localStorage.setItem("token_user", data?.token);
      if (data?.token) {
        dispatch(getUser(data));
      }
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
    }
  }, [data?.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataLogin = await login({
      email: userName,
      password: password,
    });
    console.log(dataLogin);
    setData(dataLogin);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col p-5 rounded-md justify-center items-center">
        <h3 className="text-[25px] text-gray-600 uppercase">
          Đăng nhập vào tài khoản
        </h3>
        <img className="w-[120px]" src={icperson}></img>
        <form action="" className="flex items-center flex-col">
          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="email"
            placeholder="nhập email của bạn"
            onChange={handleEmail}
          ></input>

          <input
            className="w-[470px] border border-gray-400 text-[13px] outline-none rounded-md px-2 mt-5 h-10"
            type="password"
            placeholder="mật khẩu"
            onChange={handlePassword}
          ></input>
          <small className="text-red-600 mt-2 font-semibold">
            {+data?.status === 1 ? `${data.mess}` : ""}
          </small>
          <div className="mt-6 mb-2" onClick={handleSubmit}>
            <Button text={"Đăng Nhập"}></Button>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-10 mt-2">
          <small className="cursor-pointer text-red-600 font-medium hover:text-gray-600">
            <Link to={path.home}>Quay lại trang chủ</Link>
          </small>
          <small className="cursor-pointer text-red-600 font-medium hover:text-gray-600">
            <Link to={path.register}>Đăng ký tài khoản</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
