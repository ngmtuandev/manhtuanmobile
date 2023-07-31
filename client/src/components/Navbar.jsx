import React from "react";

const Navbar = () => {
  const renderContentNavbar = (type, listOptions) => {
    switch (type) {
      case "text":
        return listOptions?.map((item) => <div>{item}</div>);
      //   case "check":
      //     return listOptions?.map((item) => (
      //       <checkbox value={item.value}>{item.key}</checkbox>
      //     ));
      
      default:
        return [];
    }
  };

  return (
    <div className="mb-5 flex flex-col justify-center">
      <label className="font-semibold">Danh mục</label>
      <div>
        {renderContentNavbar("text", ["iphone", "samsung", "tablet", "laptop"])}
      </div>
      <div>
        {renderContentNavbar("check", [
          { key: "a", value: "A" },
          { key: "b", value: "B" },
        ])}
      </div>
      <div>{renderContentNavbar("star", [3, 4, 5])}</div>
    </div>
  );
};

export default Navbar;
