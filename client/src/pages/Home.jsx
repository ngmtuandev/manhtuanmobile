import React, { useState } from "react";
import { useEffect } from "react";
import { getAllProduct } from "../service/productApi";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import deal2 from "../assets/deal2.webp";
import {
  Category,
  BannerSlider,
  Products,
  ProductMasterDiscount,
  DealProductDaily,
} from "../components/index";
import banner1 from "../assets/ipad-230703011633.webp";
import banner2 from "../assets/iphone-230703011602.webp";
import banner3 from "../assets/macbook-moi-230724052210.webp";

const Home = ({ dataSearch }) => {
  const [dataProduct, setDataProduct] = useState();
  const categoryList = [];
  const categoryListFilter = [];
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const dataProduct = await getAllProduct();
      setDataProduct(dataProduct?.data);
      console.log("dataProduct", dataProduct);
    })();
    // }
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  dataProduct?.map((item) => {
    categoryList.push(item.type);
  });

  for (const typeFilter of categoryList) {
    if (!categoryListFilter.includes(typeFilter)) {
      categoryListFilter.push(typeFilter);
    }
  }

  const listBanner = [banner1, banner2, banner3];

  const handleSetProductType = (type) => {
    navigate(`/san-pham/${type}`);
  };
  return (
    <div>
      {isLoading && (
        <div className="z-10 w-screen min-h-[800px] mt-[-100px] bg-black bg-opacity-70 flex items-center justify-center fixed">
          <HashLoader color="#ff2626" size={75} loading={isLoading} />
        </div>
      )}
      <div className="flex pb-3 pt-3 bg-opacity-100  justify-between h-12 px-5 items-center">
        {categoryListFilter?.map((item, index) => (
          <div key={index} onClick={() => handleSetProductType(item)}>
            <Category data={item}></Category>
          </div>
        ))}
      </div>
      <div className=" bg-bg_gray -z-10">
        <div className="mb-8 h-[300px] pt-4 flex">
          <div className="w-[70%] h-[100%]">
            <BannerSlider data={listBanner}></BannerSlider>
          </div>
          <div className="w-[30%] mt-4 flex justify-center items-center">
            <div className="relative flex justify-center items-center shadow-lg">
              <img className="h-[300px] rounded-md" src={deal2}></img>
              <div
                className="absolute p-5 w-[200px] shadow-2xl rounded-md bg-opacity-90 flex flex-col items-center
              justify-center bg-[rgb(255,0,29)]"
              >
                <span className="font-semibold text-[33px] text-yellow-50">
                  Siêu Sale
                </span>
                <DealProductDaily></DealProductDaily>
              </div>
            </div>
          </div>
        </div>

        {dataSearch === "" ? (
          <div>
            <ProductMasterDiscount></ProductMasterDiscount>
          </div>
        ) : (
          ""
        )}

        <div>
          <Products dataSearch={dataSearch}></Products>
        </div>
      </div>
    </div>
  );
};

export default Home;
