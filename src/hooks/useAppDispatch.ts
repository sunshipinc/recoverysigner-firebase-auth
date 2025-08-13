import { type AppDispatch } from "ducks/store";
import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux";
import type { State } from "types/State";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
