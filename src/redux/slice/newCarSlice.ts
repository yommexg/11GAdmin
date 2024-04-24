import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";

interface GetNewCarsError {
  message: string;
}

interface getNewCarsState {
  newCarsData: object;
  oneNewCarData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getNewCars = createAsyncThunk(
  "car/getNewCars",
  async (_crendentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get("/new-cars");
      // console.log(data);
      dispatch(getNewCarsSuccessful(data));
    } catch (error) {
      console.log("Get New Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsFail());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneNewCar = createAsyncThunk(
  "car/getOneNewCar",
  async (
    { newCarId, extra }: { newCarId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(`/new-cars/${newCarId}`);
      dispatch(getOneNewCarSucessful(data));

      navigate(`/new-cars/${newCarId}`);
    } catch (error) {
      console.log("Get New Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsFail());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateNewCarStatus = createAsyncThunk(
  "car/updateNewCarStatus",
  async (
    {
      newCarId,
      userId,
      carStatus,
      extra,
    }: {
      newCarId: string;
      userId: string;
      carStatus: number;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.patch(
        `/new-car/${userId}/change-status/${newCarId}`,
        {
          carStatus,
        }
      );

      toast.success(data.success);
      await dispatch(
        getOneNewCar({
          newCarId,
          extra: {
            navigate,
          },
        })
      );
      dispatch(getNewCarsFail());

      // dispatch(getOneNewCarSucessful(data));
    } catch (error) {
      console.log("Change New Car Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsFail());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getNewCarsState = {
  newCarsData: [],
  oneNewCarData: [],
  loading: false,
};

const newCarSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getNewCarsRequest: (state) => {
      state.loading = true;
    },
    getNewCarsSuccessful: (state, action) => {
      state.newCarsData = action.payload;
      state.loading = false;
    },
    getOneNewCarSucessful: (state, action) => {
      state.oneNewCarData = action.payload;
      state.loading = false;
    },
    getNewCarsFail: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getNewCarsSuccessful,
  getNewCarsFail,
  getNewCarsRequest,
  getOneNewCarSucessful,
} = newCarSlice.actions;

export default newCarSlice;
