import { useNavigate } from "react-router";
import { setLogin, setLogout } from "../stores/User";
import { useAppDispatch, useAppSelector } from "./useTypedStore";

function useUser() {
  const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function isNoUser() {
    return Object.keys(user).length === 0;
  }

  function loginUser(user: Record<string, unknown>, token: string) {
    dispatch(
      setLogin({
        user: user,
        token: token,
      })
    );
    navigate("/");
  }

  function logoutUser() {
    dispatch(setLogout());
    const persistedRoot = localStorage.getItem("persist:root");
    if (persistedRoot) {
      const root = JSON.parse(persistedRoot);
      root.token = JSON.stringify("");
      localStorage.setItem("persist:root", JSON.stringify(root));
    }
    navigate("/login");
  }

  function getToken() {
    return token;
  }

  return {
    isNoUser,
    loginUser,
    logoutUser,
    getToken,
  };
}

export default useUser;
