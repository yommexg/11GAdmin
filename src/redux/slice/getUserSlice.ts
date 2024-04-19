import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { axiosPrivate } from "../../interceptors/axios";

interface GetUserError {
  message: string;
}

interface GetUserParams {
  userId: string;
  accessToken: string;
}

interface getUserState {
  userData: object;
  loading: boolean;
}

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (
    { userId, accessToken }: GetUserParams,
    { dispatch, rejectWithValue }
  ) => {
    axiosPrivate.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    try {
      dispatch(getUserRequest());
      const { data } = await axiosPrivate.get(`/user/${userId}`);

      dispatch(getUserSuccessful(data));
    } catch (error) {
      console.log("Get User Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUserError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUserFail());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getUserState = {
  userData: [],
  loading: false,
};

const getUserSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccessful: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    getUserFail: (state) => {
      state.loading = false;
    },
  },
});

export const { getUserSuccessful, getUserFail, getUserRequest } =
  getUserSlice.actions;

export default getUserSlice;
