import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { Button } from "./index";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from "../service/productApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addCartProduct } from "../redux/slide/orderSlide";
import { useDispatch } from "react-redux";
import { convertPrice } from "../ultis/convertPrice";
import { addCartSuccess } from "../redux/slide/orderSlide";
import { createComment, getAllCommentProduct } from "../service/commentApi";
import { Comment } from "./index";
import jwtDecode from "jwt-decode";
import HashLoader from "react-spinners/HashLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = () => {
  const { address, token } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  const decodeTokenIdUser = () => {
    try {
      const userDecode = jwtDecode(token);
      return userDecode;
    } catch (error) {
      console.log(error);
    }
  };
  const idUser = decodeTokenIdUser();
  const idUserDecode = idUser?.id;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [infoProduct, setInfoProduct] = useState();
  const [comment, setComment] = useState();
  const [quality, setQuantity] = useState(1);
  const [allComment, setAllComment] = useState();
  const [isShowDetailInfoPrd, setIsShowDetailInfo] = useState(false);
  const dispatch = useDispatch();
  const { AiFillStar, AiOutlineDown, AiOutlineUp, AiOutlineLeft } = icons;
  useEffect(() => {
    (async () => {
      const data = await getOneProduct(id);
      setInfoProduct(data?.data);
      console.log(infoProduct);
    })();
  }, []);

  const dataComment = {
    product: id,
    text: comment,
    user: idUserDecode,
  };

  useEffect(() => {
    (async () => {
      const dataComment = await getAllCommentProduct(id);
      setAllComment(dataComment?.data);
    })();
  }, []);

  console.log("allComment", allComment);
  const handleAddCart = () => {
    console.log(location);
    if (!token) {
      navigate("/dang-nhap", { state: location?.pathname });
    } else {
      dispatch(addCartSuccess({ orderSuccess: false }));
      dispatch(
        addCartProduct({
          dataProduct: {
            name: infoProduct?.nameProduct,
            total: quality,
            price: infoProduct?.price,
            discount: infoProduct?.discount,
            image: infoProduct?.image,
            product: infoProduct?._id,
          },
        })
      );
      toast.success("Thêm sản phẩm vào giỏ hàng");
    }
  };

  const handleQuanlity = (e) => {
    setQuantity(e.target.value);
  };

  console.log("infoProduct: ", infoProduct);

  const handleComment = async () => {
    await createComment(dataComment);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    window.location.reload();
  };

  return (
    <div className="px-5">
      <ToastContainer />
      {isLoading && (
        <div className="z-10 ml-[-20px] w-screen min-h-[800px] mt-[-100px] bg-black bg-opacity-70 flex items-center justify-center fixed">
          <HashLoader color="#ff2626" size={75} loading={isLoading} />
        </div>
      )}
      <div className="my-3">
        <Link to="/">
          <div className="flex items-center">
            <span className="text-gray-500  hover:text-[#ff2626]">
              Quay lại
            </span>
          </div>
        </Link>
      </div>
      <div className="flex mt-7">
        <div className="w-[40%]">
          <div className="border-b-[1px] pb-8">
            <img className="rounded-md" src={infoProduct?.image} alt="" />
            <div className="flex mt-4 items-center justify-center">
              <span className="mr-1 font-semibold text-gray-500">
                Chia sẻ :{" "}
              </span>
              <div className="grid mt-1 grid-cols-3 gap-1">
                <img
                  className="w-[22px]"
                  src="https://dpshopvn.vercel.app/assets/iconFacebook-ae343977.svg"
                  alt=""
                />
                <img
                  className="w-[22px]"
                  src="https://dpshopvn.vercel.app/assets/iconMessenger-7ff975a2.svg"
                  alt=""
                />
                <img
                  className="w-[22px]"
                  src="https://dpshopvn.vercel.app/assets/iconCopy-2007d3e5.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mb-5 mt-5 cursor-pointer">
            <h3
              className="my-3 flex items-center font-semibold text-gray-700  text-[17px]"
              onClick={() => setIsShowDetailInfo(!isShowDetailInfoPrd)}
            >
              Chi Tiết Sản Phẩm
            </h3>
            {isShowDetailInfoPrd && (
              <div>
                <span className="text-gray-600 text-[15px]">
                  {infoProduct?.desc}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%] ml-10 mt-5">
          <div className="flex items-center text-[14px] mb-2">
            <span className="text-gray-500 mr-1 font-medium">Thể loại </span>
            <span className="text-[rgb(255,0,29)] font-semibold">
              {infoProduct?.type}
            </span>
          </div>
          <h3 className=" uppercase text-[25px]">
            {infoProduct?.nameProduct}{" "}
          </h3>
          <div className="flex items-center my-2">
            <div className="flex items-center">
              <span className="text-[16px] text-gray-700 mr-1">
                {infoProduct?.rate}
              </span>
              <div className="text-yellow-400">
                <AiFillStar size={20}></AiFillStar>
              </div>
            </div>
            <div className="border-l-[2px] text-[13px] pl-2 ml-2">
              <span>Đã bán {infoProduct?.sell || 100}+</span>
            </div>
          </div>
          <div className="">
            <span className="text-gray-600 text-[14px] ">
              Số lượng còn trong kho : {infoProduct?.totalStock}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-[14px]">
              Khuyến mãi :{" "}
              {infoProduct?.discount === ""
                ? "Sản phẩm không có chương trình khuyến mãi"
                : `${infoProduct?.discount}%`}
            </span>
            <span
              className="text-[35px] mb-2 w-[350px] rounded-md px-4 py-2 bg-gray-300 bg-opacity-10 
            mt-3 text-[rgb(255,0,29)] font-semibold shadow-md"
            >
              {convertPrice(
                (infoProduct?.price * [100 - infoProduct?.discount]) / 100
              )}
            </span>
            <div>
              <span className="text-[17px] text-gray-500 line-through">
                {convertPrice(infoProduct?.price)}
              </span>
              <span className="text-[13px] text-[rgb(255,0,29)] font-medium ml-1">
                -{infoProduct?.discount}%
              </span>
            </div>
          </div>
          <div className="flex items-center mt-3 text-gray-600">
            <span className="font-medium text-gray-600">Giao đến: </span>
            <p className="ml-1">
              {" "}
              {address?.length > 0 ? address : "Chưa cập nhập"}
            </p>
            <div className="cursor-pointer">
              <p className="ml-1 font-medium hover:text-gray-800 ">
                - Đổi Địa Chỉ
              </p>
            </div>
          </div>

          <div className="flex items-center mt-3">
            <span className="text-gray-600 font-semibold">Số lượng : </span>
            <input
              type="number"
              min={1}
              value={quality}
              className="outline-none ml-2 mt-1 border rounded-sm px-2 w-[60px] text-gray-600"
              onChange={handleQuanlity}
            />
          </div>
          <div
            className="px-4 mt-3 py-3 border rounded-md w-[250px] text-[rgb(255,0,29)] font-semibold
             my-2 flex items-center justify-center border-[rgb(255,0,29)]"
          >
            <span>Trả góp chỉ từ 500.000 VNĐ</span>
          </div>
          <div className="mt-4 flex">
            <div className="mr-4 cursor-pointer" onClick={handleAddCart}>
              <Button text={"Mua Ngay"}></Button>
            </div>
            <div>
              <Button text={"Mua Trả Sau"}></Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 p-5 w-[100%] min-h-[300px] bg-bg_gray shadow-md">
        <div>
          <h3 className="text-[22px] text-gray-700 mb-5 font-semibold">
            Đã có {allComment?.length || 0} đánh giá cho sản phẩm{" "}
            {infoProduct?.nameProduct}
          </h3>
          <input
            type="text"
            className="border px-4 text-[13px] w-[400px] h-[30px] rounded-md outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="ml-5 w-[120px] cursor-pointer text-gray-50 font-medium
            hover:bg-opacity-80 h-[30px] bg-bg_main rounded-md"
            onClick={handleComment}
          >
            Gửi đánh giá
          </button>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-[19px] text-gray-800">
            Tất cả bình luận
          </h3>
          <div className="mt-5">
            {allComment?.length > 0 &&
              allComment?.map((item) => (
                <div key={item?._id} className="mb-3">
                  <Comment data={item}></Comment>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
