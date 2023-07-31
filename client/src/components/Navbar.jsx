import React from "react";

const Navbar = () => {
  const renderContentNavbar = (type, listOptions) => {
    switch (type) {
      case "text":
        return listOptions?.map((item) => (
          <div className="p-5 bg-bg_main">{item}</div>
        ));

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
