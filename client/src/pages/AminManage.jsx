import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { AdminProduct, AdminUser, AdminOrder } from "../components/index";
import HashLoader from "react-spinners/HashLoader";

const AminManage = () => {
  const [menuUser, setMenuUser] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [menuOrder, setMenuOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const handleMenuUser = () => {
    setMenuUser(!menuUser);
    if (menuProduct) {
      setMenuProduct(false);
    }
    if (menuOrder) {
      setMenuOrder(false);
    }
  };

  useEffect(() => {
    setMenuProduct(true);
  }, []);

  const handleMenuProduct = () => {
    setMenuProduct(!menuProduct);
    if (menuUser) {
      setMenuUser(false);
    }
    if (menuOrder) {
      setMenuOrder(false);
    }
  };

  const handleMenuOrder = () => {
    setMenuOrder(!menuOrder);
    if (menuUser) {
      setMenuUser(false);
    }
    if (menuProduct) {
      setMenuProduct(false);
    }
  };
  return (
    <div className="flex px-5 pt-2">
      {isLoading && (
        <div className="z-10 w-screen ml-[-20px] min-h-[800px] mt-[-100px] bg-black bg-opacity-70 flex items-center justify-center fixed">
          <HashLoader color="#ff2626" size={75} loading={isLoading} />
        </div>
      )}
      <div className="w-[20%] flex flex-col">
        <div className="cursor-pointer">
          <h3
            className={
              !menuProduct
                ? "flex items-center h-[40px] p-2"
                : "flex items-center  h-[40px] p-2 bg-bg_main bg-opacity-20 bg-opacity-30bg-blue-400  border-r-2 border-[rgb(255,0,29)]"
            }
            onClick={handleMenuProduct}
          >
            Sản Phẩm{" "}
          </h3>
        </div>
        <div className="cursor-pointer">
          <h3
            className={
              !menuUser
                ? "flex items-center p-2"
                : "flex items-center  h-[40px] p-2 bg-bg_main bg-opacity-20 bg-opacity-30bg-blue-400  border-r-2 border-[rgb(255,0,29)]"
            }
            onClick={handleMenuUser}
          >
            Người dùng{" "}
          </h3>
        </div>
        <div className="cursor-pointer">
          <h3
            className={
              !menuOrder
                ? "flex items-center h-[40px] p-2"
                : "flex items-center  h-[40px] p-2 bg-bg_main bg-opacity-20 bg-opacity-30bg-blue-400  border-r-2 border-[rgb(255,0,29)]"
            }
            onClick={handleMenuOrder}
          >
            Đơn Hàng{" "}
          </h3>
        </div>
      </div>
      <div className="w-[80%]">
        {menuProduct ? (
          <AdminProduct></AdminProduct>
        ) : menuUser ? (
          <AdminUser></AdminUser>
        ) : (
          <AdminOrder></AdminOrder>
        )}
      </div>
    </div>
  );
};

export default AminManage;
