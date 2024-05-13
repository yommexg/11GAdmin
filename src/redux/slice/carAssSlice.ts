import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { axiosPrivate } from "../../interceptors/axios";
import { CarAss } from "../../../types";

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface GetCarAssError {
  message: string;
}

interface getcarAsssState {
  carAssData: object;
  oneCarAssData: object;
  loading: boolean;
}

interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export const getCarAss = createAsyncThunk(
  "car/getcarAss",
  async ({ userId }: { userId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getCarAssRequest());
      const { data } = await axiosPrivate.get(`car-ass/${userId}`);
      // console.log(data);
      dispatch(getCarAssSuccessful(data));
    } catch (error) {
      console.log("Get Used Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarAssError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarAssComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOneCarAss = createAsyncThunk(
  "car/getOneCarAss",
  async (
    {
      carAssId,
      userId,
      extra,
    }: { carAssId: string; userId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getCarAssRequest());
      const { data } = await axiosPrivate.get(`/car-ass/${userId}/${carAssId}`);
      dispatch(getOneCarAssSucessful(data));

      navigate(`/car-ass/${carAssId}`);
    } catch (error) {
      console.log("Get New Cars Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarAssError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarAssComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const addCarAss = createAsyncThunk(
  "car/addItemAss",
  async (
    {
      item: { itemName, price, quantity, discount, description },
      selectedFiles,
      userId,
      extra,
    }: {
      item: CarAss;
      selectedFiles: FileWithPreview[];
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getCarAssRequest());

      const formData = new FormData();

      formData.append("itemName", itemName);
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());
      formData.append("quantity", quantity.toString());
      formData.append("description", description);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("Car-Ass", selectedFiles[i]);
      }

      const { data } = await axiosPrivate.post(
        `/car-ass/${userId}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.success);

      await dispatch(getCarAss({ userId }));

      dispatch(getCarAssComplete());

      navigate("/car-ass");
    } catch (error) {
      console.log("Add Item Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarAssError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarAssComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateCarAssStatus = createAsyncThunk(
  "car/updatecarAssStatus",
  async (
    {
      carAssId,
      userId,
      itemStatus,
      extra,
    }: {
      carAssId: string;
      userId: string;
      itemStatus: number;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getCarAssRequest());
      const { data } = await axiosPrivate.patch(
        `/car-ass/${userId}/change-status/${carAssId}`,
        {
          itemStatus,
        }
      );

      toast.success(data.success);
      await dispatch(
        getOneCarAss({
          userId,
          carAssId,
          extra: {
            navigate,
          },
        })
      );
      dispatch(getCarAssComplete());
    } catch (error) {
      console.log("Change Car Assesory Status Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarAssError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarAssComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const deleteCarAss = createAsyncThunk(
  "car/deletecarAss",
  async (
    {
      carAssId,
      userId,
      extra,
    }: {
      carAssId: string;
      userId: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;
    try {
      dispatch(getCarAssRequest());
      const { data } = await axiosPrivate.delete(
        `/car-ass/${userId}/delete/${carAssId}`
      );

      toast.success(data.success);
      await dispatch(getCarAss({ userId }));

      dispatch(getCarAssComplete());

      navigate("/car-ass");
    } catch (error) {
      console.log("Delete Car Assesory Error", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<GetCarAssError>;
        if (axiosError.response && axiosError.response.data) {
          errorMessage = axiosError.response.data.message;
        }
      }
      dispatch(getCarAssComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: getcarAsssState = {
  carAssData: [],
  oneCarAssData: [],
  loading: false,
};

const carAssSlice = createSlice({
  name: "carAss",
  initialState,
  reducers: {
    getCarAssRequest: (state) => {
      state.loading = true;
    },
    getCarAssSuccessful: (state, action) => {
      state.carAssData = action.payload;
      state.loading = false;
    },
    getOneCarAssSucessful: (state, action) => {
      state.oneCarAssData = action.payload;
      state.loading = false;
    },
    getCarAssComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getCarAssSuccessful,
  getCarAssComplete,
  getCarAssRequest,
  getOneCarAssSucessful,
} = carAssSlice.actions;

export default carAssSlice;
