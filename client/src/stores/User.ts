import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../interfaces/IUserStore";
import type { IExerciseUtils } from "../interfaces/IExercise";

const initialSlice: IUser = {
  user: {
    fullName: "",
    userName: "",
    email: "",
    sex: "",
    age: 0,
    height: 0,
    weight: 0,
  },
  token: "",
  sidebar: true,
  exercisesUtils: {
    target: [],
    bodyParts: [],
    equipment: [],
    types: [],
  },
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
      state.user = {
        fullName: "",
        userName: "",
        email: "",
        sex: "",
        age: 0,
        height: 0,
        weight: 0,
      };
      state.token = "";
    },
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    },
    setExerciseUtils: (state, action: PayloadAction<IExerciseUtils>) => {
      state.exercisesUtils = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setLogin, setLogout, toggleSidebar, setExerciseUtils } =
  userSlice.actions;
