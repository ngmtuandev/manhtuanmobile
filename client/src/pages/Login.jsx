import React, { useEffect, useState } from "react";
import { Button } from "../components/index";
import { Link } from "react-router-dom";
import path from "../ultis/path";
import { useMutation } from "react-query";
import { login, dataUser } from "../service/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slide/userSlide";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const mutation = useMutation({
    mutationFn: (data) => login(data),
  });

  const { data } = mutation;
  console.log("dataaa", data);
  const handleEmail = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (+data?.status === 0) {
      localStorage.setItem("token_user", data?.token);
      console.log("data?.token", data?.token, "id : ");
      if (data?.token) {
        dispatch(getUser(data));
      }
      console.log("location : ", location);
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
    }
  }, [data?.status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: userName,
      password: password,
    });
    console.log("data input", userName, password);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-20">
      <div className="flex flex-col w-[30%] shadow-2xl bg-slate-200 p-5 rounded-md justify-center items-center">
        <h3 className="text-[25px]">Đăng nhập vào tài khoản</h3>
        <form action="" className="flex items-center flex-col">
          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
            type="email"
            placeholder="nhập email của bạn"
            onChange={handleEmail}
          ></input>

          <input
            className="w-[270px] outline-none rounded-md px-2 mt-5 h-8"
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
          <small className="cursor-pointer hover:text-gray-600">
            <Link to={path.home}>Quay lại trang chủ</Link>
          </small>
          <small className="cursor-pointer hover:text-gray-600">
            <Link to={path.register}>Đăng ký tài khoản</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
