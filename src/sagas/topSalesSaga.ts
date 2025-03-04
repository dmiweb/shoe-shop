import { call, put, spawn, takeLatest, cancelled, delay } from "redux-saga/effects";
import { requestTopSales, getTopSalesSuccess, getTopSalesFailure } from "../slices/topSalesSlice";
import { fetchData } from "../api";
import { TProduct } from "../models";

function* handleGetProductsSaga(): Generator {
  const url = import.meta.env.VITE_GET_TOP_SALES_URL;
  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  while (true) {
    try {
      const products: TProduct[] = yield call(fetchData, url, signal);

      yield put(getTopSalesSuccess(products));
      break;
    } catch (err: unknown) {
      void err;
      yield put(getTopSalesFailure("Произошла ошибка!"));
    }
    finally {
      if (yield cancelled()) {
        abortController.abort();
      }
    }
    yield delay(3000);
  }
}

function* watchGetProductsSaga() {
  yield takeLatest(requestTopSales.type, handleGetProductsSaga);
}

export default function* productsSaga() {
  yield spawn(watchGetProductsSaga);
}