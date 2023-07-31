import React, { useState } from "react";
import { useEffect } from "react";
import { getAllProduct } from "../service/productApi";
import { useNavigate } from "react-router-dom";
import {
  Category,
  BannerSlider,
  Products,
  Navbar,
  Button,
} from "../components/index";
import banner1 from "../assets/ipad-230703011633.webp";
import banner2 from "../assets/iphone-230703011602.webp";
import banner3 from "../assets/macbook-moi-230724052210.webp";

const Home = () => {
  const [dataProduct, setDataProduct] = useState();
  const categoryList = [];
  const categoryListFilter = [];
  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      setDataProduct(dataProduct?.data);
    })();
  }, []);
  const navigate = useNavigate();

  dataProduct?.map((item) => {
    categoryList.push(item.type);
  });

  for (const typeFilter of categoryList) {
    if (!categoryListFilter.includes(typeFilter)) {
      categoryListFilter.push(typeFilter);
    }
  }

  const listBanner = [banner1, banner2, banner3];

  const handleSetProductType = (type) => {
    navigate(`/san-pham/${type}`);
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-12 px-5 items-center">
        {categoryListFilter?.map((item, index) => (
          <div key={index} onClick={() => handleSetProductType(item)}>
            <Category data={item}></Category>
          </div>
        ))}
      </div>
      <div className=" bg-bg_gray">
        <div className="mb-8">
          <BannerSlider data={listBanner}></BannerSlider>
        </div>
        <div>
          <Products></Products>
        </div>
        <div className="w-[100%] flex justify-center my-5 pb-5">
          <Button text={"Xem thêm"}></Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
