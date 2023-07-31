import React from "react";

const Button = ({ text }) => {
  return (
    <button className="w-[100px] p-1 rounded-2xl text-gray-50 text-[14px] hover:bg-opacity-90 bg-bg_main">
      {text}
    </button>
  );
};

export default Button;
