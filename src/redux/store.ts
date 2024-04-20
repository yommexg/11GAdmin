import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";

import loginSlice from "./slice/loginSlice";
import getUserSlice from "./slice/getUserSlice";
import logoutSlice from "./slice/logoutSlice";

const rootReducer = combineReducers({
  login: loginSlice.reducer,
  getUser: getUserSlice.reducer,
  logout: logoutSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
