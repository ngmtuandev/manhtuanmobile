import React from "react";
import Slider from "react-slick";
const BannerSlider = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <Slider {...settings}>
      {data?.map((item, index) => (
        <img src={item} key={index} className="w-[100%]" alt=""></img>
      ))}
    </Slider>
  );
};

export default BannerSlider;
