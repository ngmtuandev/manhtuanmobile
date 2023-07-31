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

const ProductDetail = () => {
  const { address, token } = useSelector((state) => state.user);
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
  const dispatch = useDispatch();
  const { AiFillStar } = icons;
  useEffect(() => {
    (async () => {
      const data = await getOneProduct(id);
      setInfoProduct(data?.data);
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
    }
  };

  const handleQuanlity = (e) => {
    setQuantity(e.target.value);
  };

  console.log("infoProduct: ", infoProduct);

  const handleComment = async () => {
    await createComment(dataComment);

    window.location.reload();
  };

  return (
    <div className="px-5">
      <div className="my-3">
        <Link to="/">
          <span>Trang chủ</span>
        </Link>
      </div>
      <div className="flex mt-7">
        <div className="w-[40%]">
          <div>
            <img src={infoProduct?.image} alt="" />
          </div>
        </div>
        <div className="w-[60%]">
          <h3 className=" uppercase text-[25px]">
            {infoProduct?.nameProduct}{" "}
          </h3>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <span className="text-[13px] mr-1">{infoProduct?.rate}</span>
              <div className="text-yellow-400">
                <AiFillStar></AiFillStar>
              </div>
            </div>
            <div className="border-l-[2px] text-[13px] pl-2 ml-2">
              <span>Đã bán {infoProduct?.sell}+</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span>
              Khuyến mãi:{" "}
              {infoProduct?.discount === ""
                ? "Sản phẩm không có chương trình khuyến mãi"
                : `${infoProduct?.discount}%`}
            </span>
            <span className="text-[30px] font-semibold">
              {convertPrice(infoProduct?.price)}
            </span>
          </div>
          <div className="flex items-center mt-3">
            <span className="font-semibold">Giao đến: </span>
            <p className="ml-1">
              {" "}
              {address?.length > 0 ? address : "Chưa cập nhập"}
            </p>
            <p className="ml-1 font-semibold hover:text-gray-800 cursor-pointer">
              - Đổi Địa Chỉ
            </p>
          </div>
          <div className="flex items-center mt-3">
            <span>Số lượng : </span>
            <input
              type="number"
              min={1}
              value={quality}
              className="outline-none ml-2 border rounded-md px-2 w-[50px]"
              onChange={handleQuanlity}
            />
          </div>
          <div className="mt-4 flex">
            <div className="mr-4" onClick={handleAddCart}>
              <Button text={"Mua Ngay"}></Button>
            </div>
            <div>
              <Button text={"Mua Trả Sau"}></Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div>
          <h3>Bình luận sản phẩm</h3>
          <input
            type="text"
            className="border outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Bình luận</button>
        </div>
        <div className="mt-5">
          <h3>Tất cả bình luận</h3>
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
