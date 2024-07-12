// Desc: Redux slice for managing the modal state
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    openModalId: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.openModalId = action.payload;
    },
    closeModal: (state) => {
      state.openModalId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
