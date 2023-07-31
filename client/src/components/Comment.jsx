import React from "react";

const Comment = (data) => {
  console.log("data comment product : ", data);
  return (
    <div>
      <div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={data?.data?.user?.avatar}
            alt=""
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">
              {data?.data?.user?.name}
            </span>

            <span className="text-[12px] text-gray-600 font-medium">
              {data?.data?.createdAt}
            </span>
          </div>
        </div>
        <div className="mt-2 font-medium text-gray-800">
          <span>Nội dụng bài đánh giá</span>
        </div>
        <div className=" text-[11px">
          <span>{data?.data?.text}</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Comment;
