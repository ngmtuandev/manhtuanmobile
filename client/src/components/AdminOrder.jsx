import React, { useEffect, useState } from "react";
import { allOrder } from "../service/orderApi";
import HashLoader from "react-spinners/HashLoader";
import { convertPrice } from "../ultis/convertPrice";
const AdminOrder = () => {
  const [allOder, setAllOrder] = useState();
  useEffect(() => {
    (async () => {
      const getAllOrder = await allOrder();
      setAllOrder(getAllOrder?.data);
    })();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <div className="px-5">
      {isLoading && (
        <div className="z-10 w-screen min-h-[800px] mt-[-100px] bg-black bg-opacity-70 flex items-center justify-center fixed">
          <HashLoader color="#ff2626" size={75} loading={isLoading} />
        </div>
      )}
      <div>
        <h3 className="text-[26px] text-gray-600 mb-2 uppercase">
          Quản lý đơn hàng
        </h3>

        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Hình ảnh
                        </th>
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
                          Đơn giá
                        </th>
                        <th
                          scope="col"
                          className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Người mua
                        </th>
                      </tr>
                    }
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allOder?.length > 0 &&
                      allOder?.map((product) =>
                        product.orderItem?.map((item) => (
                          <tr key={item?._id} className="min-h-[300px]">
                            <td className="px-2 py-4 whitespace-nowrap">
                              <img
                                className="rounded-md w-[60px]"
                                src={item?.image}
                                alt=""
                              />
                            </td>
                            <td className="pl-6 py-4 whitespace-nowrap">
                              {item?.name}
                            </td>
                            <td className="pl-2 py-4 whitespace-nowrap">
                              {convertPrice(item?.price)}
                            </td>
                            <td className="pl-6 py-4 whitespace-nowrap">
                              {item?.total}
                            </td>
                            <td className="pl-4 py-4 whitespace-nowrap">
                              {product?.fullName}
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
