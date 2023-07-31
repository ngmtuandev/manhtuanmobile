import React from "react";
import icons from "../ultis/icons";
const Category = ({ data }) => {
  const {
    RiHardDrive3Fill,
    BiHeadphone,
    PiComputerTowerFill,
    RiMacbookFill,
    BiLogoApple,
    BsLaptopFill,
    BsPhoneFill,
    FcIpad,
    FcPhoneAndroid,
    
  } = icons;
  return (
    <div
      className="p-1 px-3 rounded-md cursor-pointer flex items-center justify-center 
     text-gray-800 hover:text-red-500 font-medium "
    >
      {data === "Apple" ? (
        <BiLogoApple className="text-red-500" size={23}></BiLogoApple>
      ) : data === "Samsung" ? (
        <BsPhoneFill className="text-yellow-400" size={21}></BsPhoneFill>
      ) : data === "Laptop" ? (
        <BsLaptopFill size={22}></BsLaptopFill>
      ) : data === "MacBook" ? (
        <RiMacbookFill className="text-red-600" size={22}></RiMacbookFill>
      ) : data === "PC" ? (
        <PiComputerTowerFill className="text-orange-500"  size={22}></PiComputerTowerFill>
      ) : data === "Tai nghe" ? (
        <BiHeadphone className="text-blue-400"  size={22}></BiHeadphone>
      ) : data === "Ổ cứng" ? (
        <RiHardDrive3Fill className="text-orange-500" size={22}></RiHardDrive3Fill>
      ) : data === "Iphone" ? (
        <FcPhoneAndroid size={22}></FcPhoneAndroid>
      ) : data === "iPad" ? (
        <FcIpad size={22}></FcIpad>
      ) :
      (
        ""
      )}
      <span className="ml-1 text-[13px]">{data}</span>
    </div>
  );
};

export default Category;
