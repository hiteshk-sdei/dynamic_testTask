import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUsersDetails } from "../../Components/Interface/Interface";
import { callGetAPI, callPostAPI } from "../../Service/Index";

export const getUserDetails = createAsyncThunk(
  "user/GetAllShow",
  async (params, { rejectWithValue }) => {
    try {
      const response = await callGetAPI(`/api/form`);
      return { response };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editUserDetails = createAsyncThunk(
  "user/editUserDetails",
  async (data: IUsersDetails, { rejectWithValue }) => {
    try {
      const response = await callPostAPI(`/api/form`, data);
      return { response };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
