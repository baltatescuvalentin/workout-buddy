import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../interfaces/IUserStore";

const initialSlice: IUser = {
  user: {},
  token: "",
  sidebar: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialSlice,
  reducers: {
    setLogin: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = {};
      state.token = "";
    },
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setLogin, setLogout, toggleSidebar } = userSlice.actions;
