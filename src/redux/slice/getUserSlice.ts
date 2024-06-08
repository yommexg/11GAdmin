import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { axiosPrivate } from "../../interceptors/axios";
import { toast } from "react-toastify";
import { Address } from "../../../types";

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

interface FileWithPreview extends File {
  previewUrl?: string;
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

export const updateProfPic = createAsyncThunk(
  "user/profpic",
  async (
    {
      userId,
      selectedFile,
      accessToken,
    }: {
      userId: string;
      selectedFile: FileWithPreview;
      accessToken: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserRequest());

      const formData = new FormData();

      formData.append("avatar", selectedFile);

      const { data } = await axiosPrivate.patch(
        `/upload-avatar/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      toast.success(data.message);

      await dispatch(getUser({ userId, accessToken }));

      dispatch(getUserComplete());
    } catch (error) {
      console.log("Upload Prof Pic", error);
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
export const updateProfData = createAsyncThunk(
  "user/profdata",
  async (
    {
      userId,
      user,
      phoneNumber,
      address,
      accessToken,
    }: {
      userId: string;
      user?: string;
      phoneNumber?: string;
      address?: Address;
      accessToken: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserRequest());

      const { data } = await axiosPrivate.patch(`/user/update/${userId}`, {
        user,
        phoneNumber,
        address,
      });
      // console.log(data);
      toast.success(data.message);

      await dispatch(getUser({ userId, accessToken }));

      dispatch(getUserComplete());
    } catch (error) {
      console.log("Upload Prof Pic", error);
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
      reason,
    }: { userId: string; email: string; status: number; reason?: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserRequest());
      const { data } = await axiosPrivate.patch(
        `update-user-status/${userId}`,
        {
          email,
          status,
          reason,
        }
      );

      dispatch(getAllUsers({ userId }));

      dispatch(getUserComplete());

      toast.success(data?.message);
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
