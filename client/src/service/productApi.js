export const getAllProduct = async () => {
  const dataProduct = await fetch(
    "http://localhost:5000/san-pham/tat-ca-san-pham",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataResponse = await dataProduct?.json();
  return dataResponse;
};

export const getAllProductType = async (type) => {
  const dataProduct = await fetch(
    `http://localhost:5000/san-pham/tat-ca-san-pham/${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataResponse = await dataProduct?.json();
  return dataResponse;
};

export const createProduct = async (data) => {
  const dataPrd = await fetch("http://localhost:5000/san-pham/tao-san-pham", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await dataPrd?.json();
  console.log("dataResponse : ", dataResponse);
  return dataResponse;
};

export const getOneProduct = async (id) => {
  const dataProduct = await fetch(
    `http://localhost:5000/san-pham//chi-tiet-san-pham/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataResponse = await dataProduct?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const updateProduct = async (id, data, token) => {
  const dataUpdate = await fetch(
    `http://localhost:5000/san-pham/cap-nhap-san-pham/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `beare ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const dataResponse = await dataUpdate?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const deleteProduct = async (id, token) => {
  const dataUpdate = await fetch(
    `http://localhost:5000/san-pham/xoa-san-pham/${id}`,
    {
      method: "DELETE",
      headers: {
        token: `beare ${token}`,
      },
    }
  );
  const dataResponse = await dataUpdate?.json();
  return dataResponse;
};
