import { put, spawn, takeLatest, cancelled, call, delay, select, take, race } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { requestCatalog, requestMoreCatalogItems, requestCatalogByCategory, getCatalogSuccess, getCatalogFailure, cancelRequestCatalog } from "../slices/catalogSlice";
import { fetchData } from "../api";
import { TCatalogItem, TGetParams, RetryRequestConfig } from "../models";

const retryRequestConfig: RetryRequestConfig = {
  initialDelay: 5 * 100,
  maxDelay: 5 * 1000,
  exponent: 2,
};

type HandleGetCatalogAction =
  | PayloadAction<void, typeof requestCatalog.type>
  | PayloadAction<number, typeof requestMoreCatalogItems.type>
  | PayloadAction<number, typeof requestCatalogByCategory.type>;

function* handleGetCatalogSaga(action: HandleGetCatalogAction): Generator {
  let url = import.meta.env.VITE_GET_CATALOG_URL;
  const skipCountCatalogItems = yield select((state) => state.catalog.catalog.length);
  const currentSearchQuery = yield select((state) => state.catalog.searchQuery);
  const selectedCategory = yield select((state) => state.categories.selectedCategory);

  const abortController: AbortController = new AbortController();
  const signal = abortController.signal;

  const getParams: TGetParams = {};

  if (skipCountCatalogItems > 0) getParams.offset = skipCountCatalogItems;
  if (selectedCategory) getParams.categoryId = selectedCategory;
  if (currentSearchQuery) getParams.q = currentSearchQuery;

  const searchParams = new URLSearchParams(getParams);
  const queryString = searchParams.toString();

  if (action.type === requestCatalog.type ||
    action.type === requestMoreCatalogItems.type ||
    action.type === requestCatalogByCategory.type) {
    url = `${url}${queryString ? `?${queryString}` : ""}`;
  }

  let attempt = 0;

  while (true) {
    if (attempt === 4) break;

    try {
      attempt++;

      const catalog: TCatalogItem[] = yield call(fetchData, url, signal);

      yield put(getCatalogSuccess(catalog));
      break;
    } catch (error: unknown) {
      void error;
      if (attempt === 4) {
        if (!navigator.onLine) {
          yield put(getCatalogFailure("Нет соединения с интернетом!"));
        } else {
          yield put(getCatalogFailure("Не удалось загрузить товары!"));
        }
      }
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

        console.log(`Каталог товаров - попытка ${attempt}: ${delayTime}ms`);
        yield delay(delayTime);
      }
    }
  }
}

function* createCancellableWatcher(
  requestAction: string,
  cancelAction: string,
  handleSaga: (action: HandleGetCatalogAction) => Generator
) {
  yield takeLatest(requestAction, function* (action: HandleGetCatalogAction) {
    yield race({
      task: call(handleSaga, action),
      cancel: take(cancelAction),
    });
  });
}

function* watchGetCatalogSaga() {
  yield createCancellableWatcher(
    requestCatalog.type,
    cancelRequestCatalog.type,
    handleGetCatalogSaga
  );
}

function* watchGetMoreCatalogItemsSaga() {
  yield createCancellableWatcher(
    requestMoreCatalogItems.type,
    cancelRequestCatalog.type,
    handleGetCatalogSaga
  );
}

function* watchGetCatalogByCategorySaga() {
  yield createCancellableWatcher(
    requestCatalogByCategory.type,
    cancelRequestCatalog.type,
    handleGetCatalogSaga
  );
}

export default function* catalogSaga() {
  yield spawn(watchGetCatalogSaga);
  yield spawn(watchGetMoreCatalogItemsSaga);
  yield spawn(watchGetCatalogByCategorySaga);
}