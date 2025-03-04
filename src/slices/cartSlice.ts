import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartState, TOrder, TCompletedOrder } from "../models";

const initialState: TCartState = {
  orders: null,
  loading: false,
  error: null,
  orderStatus: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOrders: create.reducer((state, _: PayloadAction<TOrder>) => {
      state.error = null;
    }),
    getOrders: create.reducer((state) => {
      state.orderStatus = false;
      state.loading = true;
      state.error = null;
    }),
    getOrdersSuccess: create.reducer((state, action: PayloadAction<TOrder[] | null>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    }),
    getOrdersFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeOrder: create.reducer((state, _: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitOrder: create.reducer((state, _: PayloadAction<TCompletedOrder>) => {
      state.loading = true;
      state.error = null;
    }),
    getOrderStatus: create.reducer((state, action: PayloadAction<boolean>) => {
      state.orders = null;
      state.loading = false;
      state.error = null;
      state.orderStatus = action.payload;
    })
  })
});

export const {
  setOrders,
  getOrders,
  getOrdersSuccess,
  getOrdersFailure,
  removeOrder,
  submitOrder,
  getOrderStatus
} = cartSlice.actions;
export default cartSlice.reducer;