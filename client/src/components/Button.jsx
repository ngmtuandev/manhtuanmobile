import React from "react";

const Button = ({ text }) => {
  return (
    <button className="w-[200px] h-[40px] p-1 cursor-pointer rounded-md text-gray-50 text-[16px]
    font-semibold hover:bg-opacity-90 bg-bg_main">
      {text}
    </button>
  );
};

export default Button;
