import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCatalogItem, TCatalogState } from "../models";

const initialState: TCatalogState = {
  catalog: [],
  loading: false,
  error: null,
  newProductsCount: null,
  searchQuery: "",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: (create) => ({
    requestCatalog: create.reducer((state) => {
      state.catalog = [];
      state.loading = true;
      state.error = null;
    }),

    requestMoreCatalogItems: create.reducer((state, action: PayloadAction<number>) => {
      void action;
      state.newProductsCount = null;
      state.loading = true;
      state.error = null;
    }),

    requestCatalogByCategory: create.reducer((state, action: PayloadAction<number>) => {
      void action;
      state.catalog = [];
      state.loading = true;
      state.error = null;
    }),

    getCatalogSuccess: create.reducer((state, action: PayloadAction<TCatalogItem[]>) => {
      state.catalog = [...state.catalog, ...action.payload];
      state.newProductsCount = action.payload.length;
      state.loading = false;
    }),

    getCatalogFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }),

    saveSearchQuery: create.reducer((state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }),
    cancelRequestCatalog: create.reducer((state) => {
      state.error = null;
      state.loading = false;
    }),
  })
});

export const {
  requestCatalog,
  requestMoreCatalogItems,
  requestCatalogByCategory,
  getCatalogSuccess,
  getCatalogFailure,
  saveSearchQuery,
  cancelRequestCatalog
} = catalogSlice.actions;

export default catalogSlice.reducer;