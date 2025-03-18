import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategoriesState, TCategoryProducts } from "../models";

const initialState: TCategoriesState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const categoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: (create) => ({
    requestCategories: create.reducer((state) => {
      state.categories = [];
      state.loading = true;
      state.error = null;
    }),

    getCategoriesSuccess: create.reducer((state, action: PayloadAction<TCategoryProducts[]>) => {
      state.categories = action.payload;
      state.loading = false;
    }),

    getCategoriesFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }),

    selectCategory: create.reducer((state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
      state.error = null;
      state.loading = false;
    }),
    cancelRequestCategories: create.reducer((state) => {
      state.selectedCategory = null;
      state.error = null;
      state.loading = false;
    }),
  })
});

export const {
  requestCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  selectCategory,
  cancelRequestCategories
} = categoriesSlice.actions;

export default categoriesSlice.reducer;