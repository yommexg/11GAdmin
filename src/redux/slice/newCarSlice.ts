import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";
import { NewCar } from "../../../types";

interface FileWithPreview extends File {
  previewUrl?: string;
}

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
  async ({ userId }: { userId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(`new-cars/${userId}`);
      // console.log(data);
      dispatch(getNewCarsSuccessful(data));
    } catch (error) {
      console.log("Get Used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneNewCar = createAsyncThunk(
  "car/getOneNewCar",
  async (
    {
      newCarId,
      userId,
      extra,
    }: { newCarId: string; userId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.get(
        `/new-cars/${userId}/${newCarId}`
      );
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
      dispatch(getNewCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const addNewCar = createAsyncThunk(
  "car/addNewCar",
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
        description,
      },
      selectedFiles,
      userId,
      extra,
    }: {
      car: NewCar;
      selectedFiles: FileWithPreview[];
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getNewCarsRequest());

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
      formData.append("carColor", carColor);
      formData.append("energyType", energyType);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("New-Car", selectedFiles[i]);
      }

      const { data } = await axiosPrivate.post(
        `/new-cars/${userId}/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.success);

      await dispatch(getNewCars({ userId }));

      dispatch(getNewCarsComplete());

      navigate("/new-cars");
    } catch (error) {
      console.log("Add New Car Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
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
        `/new-cars/${userId}/change-status/${newCarId}`,
        {
          carStatus,
        }
      );

      toast.success(data.success);
      await dispatch(
        getOneNewCar({
          userId,
          newCarId,
          extra: {
            navigate,
          },
        })
      );
      dispatch(getNewCarsComplete());
    } catch (error) {
      console.log("Change New Car Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const deleteNewCar = createAsyncThunk(
  "car/deleteNewCar",
  async (
    {
      newCarId,
      userId,
      extra,
    }: {
      newCarId: string;
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getNewCarsRequest());
      const { data } = await axiosPrivate.delete(
        `/new-cars/${userId}/delete/${newCarId}`
      );

      toast.success(data.success);
      await dispatch(getNewCars({ userId }));

      dispatch(getNewCarsComplete());

      navigate("/new-cars");
    } catch (error) {
      console.log("Change New Car Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetNewCarsError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getNewCarsComplete());
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
  name: "newCar",
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
    getNewCarsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getNewCarsSuccessful,
  getNewCarsComplete,
  getNewCarsRequest,
  getOneNewCarSucessful,
} = newCarSlice.actions;

export default newCarSlice;
