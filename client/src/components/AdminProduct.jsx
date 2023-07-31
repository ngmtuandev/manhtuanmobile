import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { getBase64 } from "../ultis/getBase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../service/productApi";

const AdminProduct = () => {
  const { token } = useSelector((state) => state.user);
  const { AiOutlinePlusCircle, FcAddImage } = icons;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [isErr, setIsErr] = useState(false);
  const [productInfo, setProductInfo] = useState({
    nameProduct: "",
    price: "",
    image: "",
    type: "",
    desc: "",
    totalStock: 0,
    rate: 0,
    discount: "",
    sell: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUpImg = async (e) => {
    const file = e.target.files[0]; // Lấy tệp từ sự kiện
    if (file) {
      try {
        const base64File = await getBase64(file);
        setProductInfo((prevInfo) => ({ ...prevInfo, image: base64File }));
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      setDataProduct(dataProduct?.data);
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setIsErr(false);
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "file" ? e.target.checked : value,
    }));
  };

  console.log("dataProduct", dataProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      await createProduct(productInfo);
    })();
    toggleModal();
    toast.success("Tạo sản phẩm thành công");
    setProductInfo({
      nameProduct: "",
      price: 0,
      image: "",
      type: "",
      desc: "",
      totalStock: 0,
      rate: 0,
      discount: "",
      sell: "",
    });
  };

  const handleUpdateProduct = (id) => {
    setIsModalOpen(!isModalOpen);
    setIsUpdate(true);
    setIdProduct(id);
  };

  const handleDeleteProduct = (id) => {
    (async () => {
      await deleteProduct(id, token);
    })();
    navigate("/");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsErr(false);
    if (
      productInfo.nameProduct === "" ||
      productInfo.image === "" ||
      productInfo.type === "" ||
      productInfo.desc === "" ||
      productInfo.discount === "" ||
      productInfo.sell === ""
    ) {
      setIsErr(true);
      toast.success("Cập nhập thành công");
    } else {
      (async () => {
        await updateProduct(idProduct, productInfo, token);
      })();
      navigate("/");
    }
  };
  return (
    <div className="px-5">
      <ToastContainer />
      <div>
        <h3 className="text-[26px] text-gray-600 mb-2 uppercase">
          Quản lý sản phẩm
        </h3>
        <div className="w-[70px] h-[70px] rounded-md border flex cursor-pointer justify-center items-center">
          <button onClick={toggleModal}>
            <AiOutlinePlusCircle size={35}></AiOutlinePlusCircle>
          </button>
        </div>
        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên sản phẩm
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Giảm giá
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Còn trong kho
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataProduct?.length > 0
                      ? dataProduct?.map((product) => (
                          <tr key={product?._id}>
                            <td className="px-2 py-4 whitespace-nowrap">
                              {product?.nameProduct}
                            </td>
                            <td className="pl-6 py-4 whitespace-nowrap">
                              {product?.discount}
                            </td>
                            <td className="pl-12 py-4 whitespace-nowrap">
                              {product?.totalStock}
                            </td>
                            <td className="px-3 py-4 flex whitespace-nowrap">
                              <span
                                className=" hover:bg-opacity-90 mx-1 cursor-pointer bg-bg_main w-[40px] 
                                flex items-center justify-center rounded-md text-gray-50"
                                onClick={() =>
                                  handleDeleteProduct(product?._id)
                                }
                              >
                                Xóa
                              </span>
                              <span
                                className=" hover:bg-opacity-90 mx-1 cursor-pointer bg-bg_main w-[40px] 
                                flex items-center justify-center rounded-md text-gray-50"
                                onClick={() =>
                                  handleUpdateProduct(product?._id)
                                }
                              >
                                Sửa
                              </span>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed mt-5 h-[550px] inset-0 flex justify-center items-center z-10">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
            <form>
              <div className="mb-4">
                <label className="block text-[12px] text-red-500  font-semibold">
                  Name
                </label>
                {isErr && (
                  <small className="text-red-600">
                    Bạn phải nhập đầy đủ các trường
                  </small>
                )}
                <input
                  type="text"
                  name="nameProduct"
                  value={productInfo.nameProduct}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label className="block text-[12px] text-red-500  font-semibold">
                  Giá thành
                </label>
                <input
                  type="number"
                  name="price"
                  value={productInfo.price}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                {/* <label className="block text-[12px] text-red-500 text-gray-600 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productInfo.name}
                  onChange={handleInputChange}
                  className="border rounded h-[22px] px-1 py-2 w-full focus:outline-none"
                /> */}
                <label className="block text-[12px] text-red-500 font-semibold">
                  Thể loại
                </label>
                <input
                  type="text"
                  name="type"
                  value={productInfo.type}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label className="block text-[12px] text-red-500  font-semibold">
                  Còn trong kho
                </label>
                <input
                  type="number"
                  name="totalStock"
                  value={productInfo.totalStock}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label className="block text-[12px] text-red-500 font-semibold">
                  Đánh giá (hiện tại)
                </label>
                <input
                  type="number"
                  name="rate"
                  value={productInfo.rate}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label className="block text-[12px] text-red-500  font-semibold">
                  Mô tả sản phẩm
                </label>
                <input
                  type="text"
                  name="desc"
                  value={productInfo.desc}
                  onChange={handleInputChange}
                  className="border rounded h-[40px] px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
                <label className="block text-[12px] text-red-500 font-semibold">
                  Giảm giá (nếu có)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={productInfo.discount}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label className="block text-[12px] text-red-500 font-semibold">
                  Đã bán
                </label>
                <input
                  type="number"
                  name="sell"
                  value={productInfo.sell}
                  onChange={handleInputChange}
                  className="border rounded h-[24px] px-1 py-2 w-full focus:outline-none"
                />
                <label
                  htmlFor="up_img_prd"
                  className="block text-[12px] text-red-500 font-semibold"
                >
                  Hình ảnh
                  <FcAddImage size={45}></FcAddImage>
                </label>
                <input
                  type="file"
                  id="up_img_prd"
                  name="image"
                  onChange={handleUpImg}
                  className="border hidden rounded h-[12px] px-1 py-2 w-full focus:outline-none"
                />
              </div>
              <img
                className="w-[80px] myt-[-30px]"
                src={productInfo.image}
                alt=""
              ></img>

              {isUpdate ? (
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="bg-bg_main hover:bg-bg_main-600 text-white font-semibold py-1 px-2 rounded"
                >
                  Chỉnh sửa
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-bg_main hover:bg-bg_main-600 text-white font-semibold py-1 px-2 rounded"
                >
                  Tạo sản phẩm
                </button>
              )}
              <button
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 rounded"
                onClick={toggleModal}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
