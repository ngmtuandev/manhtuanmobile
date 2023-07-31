export const login = async (data) => {
  const dataLogin = await fetch("http://localhost:5000/tai-khoan/dang-nhap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await dataLogin?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const register = async (data) => {
  const dataRegister = await fetch("http://localhost:5000/tai-khoan/dang-ky", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await dataRegister?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const dataUser = async (id, token) => {
  const dataRegister = await fetch(
    `http://localhost:5000/nguoi-dung/thong-tin-nguoi-dung/${id}`,
    {
      method: "GET",
      headers: {
        token: `beare ${token}`,
      },
    }
  );
  const dataResponse = await dataRegister?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const updateUser = async (id, data) => {
  const dataUpdate = await fetch(`http://localhost:5000/nguoi-dung/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await dataUpdate?.json();
  // console.log(dataResponse.data);
  return dataResponse;
};

export const getAllUser = async (token) => {
  const dataUser = await fetch("http://localhost:5000/nguoi-dung/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `beare ${token}`,
    },
  });
  const dataResponse = await dataUser?.json();
  return dataResponse;
};

export const refreshToken = async () => {
  const dataRefreshToken = await fetch(
    `http://localhost:5000/nguoi-dung/refresh-token`,
    {
      method: "POST",
    }
  );
  // console.log(dataResponse.data);
  return dataRefreshToken.tokenNew;
};
