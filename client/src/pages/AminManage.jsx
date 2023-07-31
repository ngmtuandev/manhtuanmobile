import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { AdminProduct, AdminUser } from "../components/index";
const AminManage = () => {
  const [menuUser, setMenuUser] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);


  const handleMenuUser = () => {
    setMenuUser(!menuUser);
    if (menuProduct) {
      setMenuProduct(false);
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
  };
  return (
    <div className="flex px-5 pt-2">
      <div className="w-[20%] flex flex-col">
        <div>
          <h3
            className={
              !menuProduct
                ? "flex items-center h-[40px] p-2"
                : "flex items-center  h-[40px] p-2 bg-blue-400 bg-opacity-30bg-blue-400 bg-opacity-30 border-r-2 border-cyan-500"
            }
            onClick={handleMenuProduct}
          >
            Sản Phẩm{" "}
          </h3>
          {menuProduct && (
            <div className="flex flex-col p-2">
              <span>123</span>
              <span>123</span>
              <span>123</span>
            </div>
          )}
        </div>
        <div>
          <h3
            className={
              !menuUser
                ? "flex items-center p-2"
                : "flex items-center p-2 bg-blue-400 bg-opacity-30bg-blue-400 bg-opacity-30 border-r-2 border-cyan-500"
            }
            onClick={handleMenuUser}
          >
            Người dùng{" "}
          </h3>
          {menuUser && (
            <div className="flex flex-col p-2">
              <span>123</span>
              <span>123</span>
              <span>123</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-[80%]">
        {menuProduct ? <AdminProduct></AdminProduct> : <AdminUser></AdminUser>}
      </div>
    </div>
  );
};

export default AminManage;
