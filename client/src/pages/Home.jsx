import React from "react";
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
  const categoryList = [
    "tivi",
    "tủ lạnh",
    "máy tính",
    "điện thoại",
    "tủ lạnh",
    "máy tính",
    "điện thoại",
    "tủ lạnh",
    "máy tính",
    "điện thoại",
  ];
  const listBanner = [banner1, banner2, banner3];
  return (
    <div className="">
      <div className="flex justify-between h-12 px-5 items-center">
        {categoryList?.map((item, index) => (
          <div key={index}>
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
