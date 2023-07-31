import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: "",
    password: "",
    address: "",
    avatar: "",
    phone: 0,
    userName: "",
    admin: false,
  },
  reducers: {
    getUser: (state, action) => {
      // console.log("action : ", action?.payload?.data?.isAdmin);
      state.name = action?.payload?.data?.name;
      state.token = action?.payload?.token;
      state.avatar = action?.payload?.data?.avatar;
      state.admin = action?.payload?.data?.isAdmin;
      state.address = action?.payload?.data?.address;
      state.phone = action?.payload?.data?.phone;
    },
    update: (state, action) => {
      state.name = action?.payload?.name;
      state.email = action?.payload?.email;
      state.password = action?.payload?.password;
      state.phone = action?.payload?.phone;
      state.address = action?.payload?.address;
      state.avatar = action?.payload?.avatar;
      state.admin = action?.payload?.admin;
    },
  },
});

export const { getUser, update } = userSlice.actions;
export default userSlice.reducer;
