export const createOrder = async (data) => {
  const dataOrder = await fetch("http://localhost:5000/dat-hang/tao-don-hang", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await dataOrder?.json();
  console.log("dataResponse : ", dataResponse);
  return dataResponse;
};
