import { useDispatch, useSelector } from "react-redux";
import type { RootStateType, AppDispatchType } from "../stores/config";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
