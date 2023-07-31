import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItem: [],
    user: "",
    infoRecived: "",
    itemPrice: 0,
    feeShip: 0,
    paymentMethod: "",
    totalPyament: 0,
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
    orderSuccess: false,
  },
  reducers: {
    addCartProduct: (state, action) => {
      const checkCart = state?.orderItem?.find(
        (item) => item.product === action?.payload?.dataProduct?.product
      );
      console.log("action?.payload?.dataProduct", action?.payload?.dataProduct);
      if (checkCart) {
        checkCart.total += +action?.payload?.dataProduct?.total;
      } else {
        state.orderItem.push(action?.payload?.dataProduct);
      }
    },
    addCartSuccess: (state, action) => {
      console.log("action order success", action.payload);
      state.orderSuccess = action.payload?.orderSuccess;
    },
  },
});

export const { addCartProduct, addCartSuccess } = orderSlice.actions;
export default orderSlice.reducer;
