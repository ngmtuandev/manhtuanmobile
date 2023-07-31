import React from "react";
import { Navbar, Products } from "./index";

const CategoryDetail = () => {
  return (
    <div className="flex px-5 mt-2">
      <div className="w-[15%]">
        <Navbar></Navbar>
      </div>
      <div className="w-[85%]">
        <Products></Products>
      </div>
    </div>
  );
};

export default CategoryDetail;
