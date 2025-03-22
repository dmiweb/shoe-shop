import { call, put, spawn, cancelled, delay, take, race } from "redux-saga/effects";
import { requestCategories, getCategoriesSuccess, getCategoriesFailure, cancelRequestCategories } from "../slices/categoriesSlice";
import { fetchData } from "../api";
import { TCategoryProducts, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

function* handleGetCategoriesSaga(): Generator {
  const url = import.meta.env.VITE_GET_CATEGORIES_URL;
  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;
  let attempt = 0;

  while (true) {
    try {
      attempt++;

      const categories: TCategoryProducts[] = yield call(fetchData, url, signal);
      yield put(getCategoriesSuccess(categories));
      break;
    } catch (err: unknown) {
      void err;
      yield put(getCategoriesFailure("Произошла ошибка!"));
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

function* watchGetCategoriesSaga(): Generator {
  while (true) {
    yield take(requestCategories.type)
    yield race({
      task: call(handleGetCategoriesSaga),
      cancel: take(cancelRequestCategories.type)
    })
  }
}

export default function* categoriesSaga() {
  yield spawn(watchGetCategoriesSaga);
}