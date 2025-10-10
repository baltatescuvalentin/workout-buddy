import axios from "axios";
import { redirect } from "react-router";
import store from "../stores/config";
import { setLogout } from "../stores/User";
// import { useAppSelector } from "../hooks/useTypedStore";
// const baseUrl = `https://workout-buddy-3j5n.onrender.com`;
const baseUrl = `http://localhost:3001`;
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const token = state.token;
    if (token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setLogout());
      redirect("/login");
    }

    return Promise.reject(error);
  }
);

export default axios;
