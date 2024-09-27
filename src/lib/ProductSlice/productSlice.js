import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: false,
  isDrawerOpen: false, // Add drawer state
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateRefetch: (state) => {
      state.refetch = !state.refetch;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { updateRefetch, toggleDrawer, closeDrawer } =
  productSlice.actions;

export default productSlice.reducer;
