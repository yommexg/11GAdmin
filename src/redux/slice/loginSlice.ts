import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";
import { getUser } from "./getUserSlice";
import { getNewCars } from "./newCarSlice";

interface LoginError {
  message: string;
}

interface LoginState {
  loading: boolean;
  roles: number[] | null;
}

interface UserInfo {
  roles: number[];
  _id: string;
}

interface JwtPayload {
  UserInfo: UserInfo;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const loginAsync = createAsyncThunk(
  "auth/LoginAsync",
  async (
    { email, pwd, extra }: { email: string; pwd: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getLoginRequest());

      const { data } = await axiosPrivate.post(
        "auth",
        { email, pwd },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const decodedToken = jwtDecode<JwtPayload>(data?.accessToken);

      localStorage.setItem("accessToken", data?.accessToken);

      const userId = decodedToken?.UserInfo?._id;
      const roles = decodedToken?.UserInfo?.roles;

      if (!roles || !roles.includes(5150)) {
        toast.error("Unauthorized, User is NOT an Admin");
        dispatch(getLoginComplete());
      } else {
        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.accessToken}`;

        await dispatch(getUser({ userId, accessToken: data?.accessToken }));

        await dispatch(getNewCars());

        toast.success(data?.message);
        navigate("/");

        dispatch(getLoginComplete());
      }
    } catch (error) {
      // console.log("Login Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getLoginComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LoginState = {
  loading: false,
  roles: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoginRequest: (state) => {
      state.loading = true;
    },

    getLoginComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getLoginRequest, getLoginComplete } = loginSlice.actions;

export default loginSlice;
