import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import { Home, Order, Products, Login } from "./pages/index";
import { Header, CategoryDetail, ProductDetail } from "./components/index";
function App() {
  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route
          path={path.detail_category}
          element={<CategoryDetail></CategoryDetail>}
        ></Route>
        <Route
          path={path.detail_product}
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path={path.login} element={<Login></Login>}></Route>
        <Route path={path.home} element={<Home></Home>}></Route>
        <Route path={path.order} element={<Order></Order>}></Route>
        <Route path={path.product} element={<Products></Products>}></Route>
      </Routes>
    </div>
  );
}

export default App;
