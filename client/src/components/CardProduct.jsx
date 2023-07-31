import React from "react";
import icons from "../ultis/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../ultis/convertPrice";
const CardProduct = ({ data }) => {
  const navigate = useNavigate();
  console.log("dataa prd : ", data);
  const { AiFillStar } = icons;
  const handleDetailProduct = () => {
    navigate(`/chi-tiet-san-pham/${data?._id}`);
  };
  return (
    <div
      className="bg-gray-50 p-3 h-[400px] shadow-xl cursor-pointer"
      onClick={handleDetailProduct}
    >
      <div>
        <img className="w-[100%] h-[270px]" src={data?.image} alt="" />
      </div>
      <div className="mt-2">
        <span className="">{data?.nameProduct}</span>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-[13px] mr-1">{data?.rate}</span>
            <div className="text-yellow-400">
              <AiFillStar></AiFillStar>
            </div>
          </div>
          <div className="border-l-[2px] text-[13px] pl-2 ml-2">
            <span>Đã bán: 100+</span>
          </div>
        </div>
        <div>
          <span className="text-red-600 font-semibold">
            {convertPrice(data?.price)}đ
            <small>
              {data?.discount
                ? `    -${data?.discount}%`
                : "Sản phẩm không khuyến mãi"}
            </small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
