import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Redux/Slices/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: userSlice as any,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
