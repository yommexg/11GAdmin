import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";

interface LogoutError {
  message: string;
}

interface LogoutState {
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const logoutAsync = createAsyncThunk(
  "auth/LogoutAsync",
  async ({ extra }: { extra: ExtraArgs }, { dispatch, rejectWithValue }) => {
    const { navigate } = extra;

    try {
      dispatch(getLogoutRequest());

      const { data } = await axiosPrivate.get("logout", {
        withCredentials: true,
      });

      localStorage.removeItem("accessToken");

      axiosPrivate.defaults.headers.common["Authorization"] = "";

      dispatch(getLogoutComplete());

      toast.success(data?.message);
      navigate("/login");
      // window.location.reload();
    } catch (error) {
      // console.log("Logout Error", error);
      let errorMessage = "Nework Error, Try Again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LogoutError>;
        if (axiosError.response && axiosError.response.status === 404) {
          return;
        } else if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getLogoutComplete());
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LogoutState = {
  loading: false,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    getLogoutRequest: (state) => {
      state.loading = true;
    },

    getLogoutComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getLogoutRequest, getLogoutComplete } = logoutSlice.actions;

export default logoutSlice;
