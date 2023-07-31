import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { getAllUser } from "../service/userApi";
import { useSelector } from "react-redux";
const AdminUser = () => {
  const { token } = useSelector((state) => state.user);

  const { AiOutlinePlusCircle } = icons;
  const [dataUser, setDataUser] = useState();
  useEffect(() => {
    (async () => {
      const allUser = await getAllUser(token);
      setDataUser(allUser?.data);
    })();
  }, []);
  console.log("dataUser", dataUser);
  return (
    <div className="px-5">
      <h3 className="text-[26px] text-gray-600 mb-1 uppercase">
        Quản lý người dùng
      </h3>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên Người Dùng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Địa Chỉ Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số Điện Thoại
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y text-gray-700 divide-gray-200">
                  {dataUser?.length > 0
                    ? dataUser?.map((data) => (
                        <tr key={data?._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data?.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data?.phone}
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
  );
};

export default AdminUser;
