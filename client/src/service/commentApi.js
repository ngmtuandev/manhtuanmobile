export const createComment = async (data) => {
  const dataComment = await fetch(
    "http://localhost:5000/binh-luan/tao-binh-luan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const dataResponse = await dataComment?.json();
  console.log("dataResponse : ", dataResponse);
  return dataResponse;
};

export const getAllCommentProduct = async (product) => {
  const dataComment = await fetch(
    `http://localhost:5000/binh-luan/tat-ca-binh-luan-san-pham/${product}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataResponse = await dataComment.json();
  return dataResponse;
};
