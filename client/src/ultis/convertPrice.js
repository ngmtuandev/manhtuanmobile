export const convertPrice = (price) => {
  try {
    const priceConvert = price?.toLocaleString().replaceAll(",", ".");
    return `${priceConvert} VND`;
  } catch (error) {
    console.log(error);
  }
};
