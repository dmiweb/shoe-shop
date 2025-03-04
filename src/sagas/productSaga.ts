import { put, spawn, takeLatest, cancelled, retry } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { requestProduct, getProductSuccess, getProductFailure } from "../slices/productSlice";
import { fetchData } from "../api";
import { TProduct, CustomError } from "../models";

function* handleGetProductSaga(action: PayloadAction<number, typeof requestProduct.type>): Generator {
  const url = `${import.meta.env.VITE_GET_CATALOG_URL}/${action.payload}`;

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  try {
    const retryCount = 3;
    const retryDelay = 3 * 1000;
    const catalog: TProduct = yield retry(
      retryCount,
      retryDelay,
      fetchData,
      url,
      signal
    );

    yield put(getProductSuccess(catalog));

  } catch (error: unknown) {
    const customError = error as CustomError;

    if (!navigator.onLine) {
      yield put(getProductFailure("Нет соединения с интернетом!"));
    } else {
      yield put(getProductFailure("Не удалось загрузить товар!"));
    }

    if (customError.status === 404) {
      yield put(getProductFailure("Не удалось найти товар!"));
    }
  }
  finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

function* watchGetProductSaga() {
  yield takeLatest(requestProduct.type, handleGetProductSaga);
}

export default function* productSaga() {
  yield spawn(watchGetProductSaga);
}