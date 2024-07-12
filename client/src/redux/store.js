// Desc: Entire state management for the app
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
