import { createSlice } from '@reduxjs/toolkit';

const initialSlice = {
    mode: "light",
    user: null,
    token: null,
    exercices: [],
    mNavbar: false,
};

export const clientSlice = createSlice({
    name: "client",
    initialState: initialSlice,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setExercices: (state, action) => {
            state.exercices = [...action.payload.exercices];
        },
        setMNavbar: (state, action) => {
            state.mNavbar = action.payload.mNavbar;
        },
    }
});

export const { setMode, setLogin, setLogout, setExercices, setMNavbar, getExercises } = clientSlice.actions;
export default clientSlice.reducer;