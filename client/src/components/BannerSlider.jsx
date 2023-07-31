import React from "react";
import Slider from "react-slick";
const BannerSlider = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <Slider {...settings}>
      {data?.map((item, index) => (
        <img src={item} key={index} className="z-0 rounded-md h-[300px] w-[100%]" alt=""></img>
      ))}
    </Slider>
  );
};

export default BannerSlider;
