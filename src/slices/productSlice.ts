import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProductState, TProduct } from '../models';

const initialState: TProductState = {
  product: null,
  loading: false,
  error: null,
  size: null,
  count: 1,
  price: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    requestProduct: (state, action: PayloadAction<number>) => {
      void action;
      state.product = null;
      state.loading = true;
      state.error = null;
      state.size = null;
      state.count = 1;
    },
    getProductSuccess: (state, action: PayloadAction<TProduct>) => {
      state.product = action.payload;
      state.loading = false;
    },
    getProductFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    selectSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const {
  requestProduct,
  getProductSuccess,
  getProductFailure,
  selectSize,
  increment,
  decrement
} = productSlice.actions;

export default productSlice.reducer;