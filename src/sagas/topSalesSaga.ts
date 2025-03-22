import { call, put, spawn, take, race, cancelled, delay } from "redux-saga/effects";
import { requestTopSales, getTopSalesSuccess, getTopSalesFailure, cancelRequestTopSales } from "../slices/topSalesSlice";
import { fetchData } from "../api";
import { TProduct, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetProductsSaga(): Generator {
  const url = import.meta.env.VITE_GET_TOP_SALES_URL;
  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;
  let attempt = 0;

  while (true) {
    try {
      attempt++;

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

      if (attempt > 1) {
        let delayTime =
          retryRequestConfig.initialDelay * Math.pow(retryRequestConfig.exponent, attempt - 1);
        delayTime = Math.min(delayTime, retryRequestConfig.maxDelay);
        delayTime += Math.random() * 200;

        console.log(`Категории - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

// function* watchGetProductsSaga() {
//   yield takeLatest(requestTopSales.type, handleGetProductsSaga);
// }

function* watchGetProductsSaga(): Generator {
  while (true) {
    yield take(requestTopSales.type)
    yield race({
      task: call(handleGetProductsSaga),
      cancel: take(cancelRequestTopSales.type)
    })
  }
}

export default function* productsSaga() {
  yield spawn(watchGetProductsSaga);
}