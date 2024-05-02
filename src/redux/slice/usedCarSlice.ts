import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";
import { UsedCar } from "../../../types";

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface GetUsedCarsError {
  message: string;
}

interface getUsedCarsState {
  usedCarsData: object;
  oneUsedCarData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getUsedCars = createAsyncThunk(
  "car/getUsedCars",
  async ({ userId }: { userId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(`/used-cars/${userId}`);
      dispatch(getUsedCarsSuccessful(data));
    } catch (error) {
      console.log("Get Used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneUsedCar = createAsyncThunk(
  "car/getOneUsedCar",
  async (
    {
      usedCarId,
      userId,
      extra,
    }: { usedCarId: string; userId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.get(
        `/used-cars/${userId}/${usedCarId}`
      );

      dispatch(getOneUsedCarSucessful(data));

      navigate(`/used-cars/${usedCarId}`);
    } catch (error) {
      console.log("Get One Used CarError", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const addUsedCar = createAsyncThunk(
  "car/addUsedCar",
  async (
    {
      car: {
        carName,
        carColor,
        carBrand,
        price,
        quantity,
        year,
        discount,
        gearType,
        energyType,
        engineNumber,
        engineType,
        plateNumber,
        carLocation: { busStop, city, country, state },
        description,
      },
      selectedFiles,
      userId,
      extra,
    }: {
      car: UsedCar;
      selectedFiles: FileWithPreview[];
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUsedCarsRequest());

      const formData = new FormData();

      formData.append("carName", carName);
      formData.append("carBrand", carBrand);
      formData.append("color", carColor);
      formData.append("gearType", gearType);
      formData.append("year", year.toString());
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());
      formData.append("quantity", quantity.toString());
      formData.append("description", description);
      formData.append("engineType", engineType);
      formData.append("engineNumber", engineNumber);
      formData.append("plateNumber", plateNumber);
      formData.append("carColor", carColor);
      formData.append("energyType", energyType);

      formData.append("carLocation[busStop]", busStop);
      formData.append("carLocation[city]", city);
      formData.append("carLocation[country]", country);
      formData.append("carLocation[state]", state);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("Used-Car", selectedFiles[i]);
      }

      const { data } = await axiosPrivate.post(
        `/${userId}/create-used-car`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.success);

      await dispatch(getUsedCars({ userId }));

      dispatch(getUsedCarsComplete());

      navigate("/Used-cars");
    } catch (error) {
      console.log("Add Used Car Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUsedCarStatus = createAsyncThunk(
  "car/updateUsedCarStatus",
  async (
    {
      usedCarId,
      userId,
      carStatus,
      extra,
      reason,
    }: {
      usedCarId: string;
      userId: string;
      reason?: string;
      carStatus: number;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.patch(
        `/used-cars/${userId}/change-status/${usedCarId}`,
        {
          carStatus,
          reason,
        }
      );

      toast.success(data.success);
      await dispatch(
        getOneUsedCar({
          userId,
          usedCarId,
          extra: {
            navigate,
          },
        })
      );
      dispatch(getUsedCarsComplete());
    } catch (error) {
      console.log("Change Used Car Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const deleteUsedCar = createAsyncThunk(
  "car/deleteUsedCar",
  async (
    {
      usedCarId,
      userId,
      extra,
    }: {
      usedCarId: string;
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getUsedCarsRequest());
      const { data } = await axiosPrivate.delete(
        `/used-cars/${userId}/delete/${usedCarId}`
      );

      toast.success(data.success);
      await dispatch(getUsedCars({ userId }));

      dispatch(getUsedCarsComplete());

      navigate("/used-cars");
    } catch (error) {
      console.log("Change Used Car Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetUsedCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getUsedCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getUsedCarsState = {
  usedCarsData: [],
  oneUsedCarData: [],
  loading: false,
};

const usedCarSlice = createSlice({
  name: "usedCar",
  initialState,
  reducers: {
    getUsedCarsRequest: (state) => {
      state.loading = true;
    },
    getUsedCarsSuccessful: (state, action) => {
      state.usedCarsData = action.payload;
      state.loading = false;
    },
    getOneUsedCarSucessful: (state, action) => {
      state.oneUsedCarData = action.payload;
      state.loading = false;
    },
    getUsedCarsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getUsedCarsSuccessful,
  getUsedCarsComplete,
  getUsedCarsRequest,
  getOneUsedCarSucessful,
} = usedCarSlice.actions;

export default usedCarSlice;
