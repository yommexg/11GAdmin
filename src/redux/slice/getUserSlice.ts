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
  allUsers: object[];
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
      dispatch(getUserComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "car/getAllUsers",
  async ({ userId }: { userId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUserRequest());
      const { data } = await axiosPrivate.get(`users/${userId}`);
      // console.log(data);
      dispatch(getAllUsersSuccessful(data));
    } catch (error) {
      console.log("Get All Users Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUserError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUserComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "car/updateUser",
  async (
    {
      userId,
      email,
      status,
    }: { userId: string; email: string; status: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserRequest());
      await axiosPrivate.patch(`update-user-status/${userId}`, {
        email,
        status,
      });

      dispatch(getAllUsers({ userId }));

      dispatch(getUserComplete());
    } catch (error) {
      console.log("User Status Update Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUserError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUserComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getUserState = {
  userData: [],
  loading: false,
  allUsers: [],
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
    getAllUsersSuccessful: (state, action) => {
      state.allUsers = action.payload;
      state.loading = false;
    },
    getUserComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getUserSuccessful,
  getUserComplete,
  getAllUsersSuccessful,
  getUserRequest,
} = getUserSlice.actions;

export default getUserSlice;
