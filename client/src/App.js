import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import {
  Home,
  Order,
  Products,
  Login,
  Register,
  UpdateUser,
  AminManage,
  Cart,
  PayCart,
  OrderProcess,
  ProductType,
} from "./pages/index";
import { Header, CategoryDetail, ProductDetail } from "./components/index";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";
import { dataUser, refreshToken } from "./service/userApi";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/slide/userSlide";

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.user);
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
          dispatch(getUser(dataUserApi));
        })();
      }
      axios.interceptors.request.use(async (config) => {
        if (decodeToken?.exp < new Date().getTime() / 1000) {
          try {
            const newToken = await refreshToken();
            console.log("newToken", newToken);
            config.headers["token"] = `beare ${newToken}`;
          } catch (error) {
            return;
          }
        }
        return config;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route
          path={path.detail_category}
          element={<CategoryDetail></CategoryDetail>}
        ></Route>
        <Route
          path={path.detail_product__id}
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route
          path={path.updateuser}
          element={<UpdateUser></UpdateUser>}
        ></Route>
        <Route
          path={path.order_process}
          element={<OrderProcess></OrderProcess>}
        ></Route>
        <Route
          path={path.product__type}
          element={<ProductType></ProductType>}
        ></Route>
        {admin && (
          <Route path={path.admin} element={<AminManage></AminManage>}></Route>
        )}
        <Route path={path.payment} element={<PayCart></PayCart>}></Route>
        <Route path={path.cart} element={<Cart></Cart>}></Route>
        <Route path={path.login} element={<Login></Login>}></Route>
        <Route path={path.register} element={<Register></Register>}></Route>
        <Route path={path.home} element={<Home></Home>}></Route>
        <Route path={path.order} element={<Order></Order>}></Route>
        <Route path={path.product} element={<Products></Products>}></Route>
      </Routes>
    </div>
  );
}

export default App;
