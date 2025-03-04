import { call, put, spawn, takeLatest, cancelled, delay } from "redux-saga/effects";
import { requestCategories, getCategoriesSuccess, getCategoriesFailure } from "../slices/categoriesSlice";
import { fetchData } from "../api";
import { TCategoryProducts } from "../models";

function* handleGetCategoriesSaga(): Generator {
  const url = import.meta.env.VITE_GET_CATEGORIES_URL;
  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  while (true) {
    try {
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
    }
    yield delay(3000);
  }
}

function* watchGetCategoriesSaga() {
  yield takeLatest(requestCategories.type, handleGetCategoriesSaga);
}

export default function* categoriesSaga() {
  yield spawn(watchGetCategoriesSaga);
}