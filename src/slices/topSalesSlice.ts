import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTopSalesState, TProduct } from "../models";

const initialState: TTopSalesState = {
  topSales: [],
  topSalesLoading: false,
  topSalesError: null,
};

export const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  reducers: (create) => ({
    requestTopSales: create.reducer((state) => {
      state.topSales = [];
      state.topSalesLoading = true;
      state.topSalesError = null;
    }),

    getTopSalesSuccess: create.reducer((state, action: PayloadAction<TProduct[]>) => {
      state.topSales = action.payload;
      state.topSalesLoading = false;
      state.topSalesError = null;
    }),

    getTopSalesFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.topSalesError = action.payload;
      state.topSalesLoading = true;
    }),
    cancelRequestTopSales: create.reducer((state) => {
      state.topSalesError = null;
      state.topSalesLoading = false;
    }),
  })
});

export const {
  requestTopSales,
  getTopSalesSuccess,
  getTopSalesFailure,
  cancelRequestTopSales
} = topSalesSlice.actions;
export default topSalesSlice.reducer;