import { takeLatest, put, call, spawn, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setOrders, getOrders, getOrdersSuccess, getOrdersFailure, removeOrder, submitOrder, getOrderStatus } from '../slices/cartSlice';
import { TOrder, TCompletedOrder } from '../models';
import { fetchStatusOrder } from "../api";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/localStorageUtils';
import { processOrders, removeOrderById } from '../utils/orderUtils';

const ORDER_KEY = import.meta.env.VITE_KEY_LOCAL_STORAGE_ORDERS;

function* handleSetOrdersSaga(action: PayloadAction<TOrder>) {
  const orders: TOrder[] | null = yield call(getLocalStorage, ORDER_KEY);
  const processedOrders: TOrder[] = processOrders(orders, action.payload);

  try {
    yield call(setLocalStorage, ORDER_KEY, processedOrders);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message)
    yield put(getOrdersFailure("Произошла ошибка!"));
  }
}

function* handleGetOrdersSaga() {
  try {
    const orders: TOrder[] | null = yield call(getLocalStorage, ORDER_KEY);

    yield put(getOrdersSuccess(orders));
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message)
    yield put(getOrdersFailure("Произошла ошибка!"));
  }
}

function* handleRemoveOrderSaga(action: PayloadAction<number>) {
  const removeOrderId = action.payload;
  const orders: TOrder[] = yield call(getLocalStorage, ORDER_KEY);
  const filteredOrders: TOrder[] | null = removeOrderById(orders, removeOrderId);

  try {
    yield call(setLocalStorage, ORDER_KEY, filteredOrders);

    const updatedOrders: TOrder[] | null = yield call(getLocalStorage, ORDER_KEY);

    yield put(getOrdersSuccess(updatedOrders));
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message)
    yield put(getOrdersFailure("Произошла ошибка!"));
  }
}

function* handleSubmitOrderSaga(action: PayloadAction<TCompletedOrder>) {
  const url = import.meta.env.VITE_SUBMIT_ORDER_URL
  const completedOrder = action.payload;

  while (true) {
    try {
      const status: boolean = yield call(fetchStatusOrder, url, completedOrder);

      yield put(getOrderStatus(status));
      yield call(removeLocalStorage, ORDER_KEY);
      break;
    } catch (err: unknown) {
      void err;
    }
    yield delay(3000);
  }
}

function* watchSetOrdersSaga() {
  yield takeLatest(setOrders.type, handleSetOrdersSaga);
}

function* watchGetOrdersSaga() {
  yield takeLatest(getOrders.type, handleGetOrdersSaga);
}

function* watchRemoveOrderSaga() {
  yield takeLatest(removeOrder.type, handleRemoveOrderSaga);
}

function* watchSubmitOrderSaga() {
  yield takeLatest(submitOrder.type, handleSubmitOrderSaga);
}

export default function* cartSaga() {
  yield spawn(watchSetOrdersSaga);
  yield spawn(watchGetOrdersSaga);
  yield spawn(watchRemoveOrderSaga);
  yield spawn(watchSubmitOrderSaga);
}