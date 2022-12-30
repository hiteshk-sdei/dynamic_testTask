import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetails, editUserDetails } from ".";
import { IUserInitialState } from "../../Components/Interface/Interface";

const initialStateUse: IUserInitialState = {
  getUser: [],
  isGetUserLoading: false,
  getUserError: "",

  editUser: [],
  isEditDetailsLoading: false,
  editUserError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateUse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isGetUserLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isGetUserLoading = false;
        state.getUser = action.payload.response.data?.data;
      })
      .addCase(getUserDetails.rejected, (state, err: any) => {
        state.isGetUserLoading = false;
        state.getUserError = err;
      })
      .addCase(editUserDetails.pending, (state) => {
        state.isEditDetailsLoading = true;
      })
      .addCase(
        editUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isEditDetailsLoading = false;
          state.editUser = action.payload.response;
        }
      )
      .addCase(editUserDetails.rejected, (state, err) => {
        state.isEditDetailsLoading = false;
        state.editUserError = err?.error?.message;
      });
  },
});

export default userSlice.reducer;
