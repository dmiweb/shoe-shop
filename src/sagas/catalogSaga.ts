import { put, spawn, takeLatest, cancelled, retry, select } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { requestCatalog, requestMoreCatalogItems, requestCatalogByCategory, getCatalogSuccess, getCatalogFailure } from "../slices/catalogSlice";
import { fetchData } from "../api";
import { TCatalogItem, TGetParams } from "../models";

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

  try {
    const retryCount = 3;
    const retryDelay = 3 * 1000;
    const catalog: TCatalogItem[] = yield retry(
      retryCount,
      retryDelay,
      fetchData,
      url,
      signal
    );

    yield put(getCatalogSuccess(catalog));
  } catch (error: unknown) {
    void error;
    
    if (!navigator.onLine) {
      yield put(getCatalogFailure("Нет соединения с интернетом!"));
    } else {
      yield put(getCatalogFailure("Не удалось загрузить товары!"));
    }
  }
  finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

function* watchGetCatalogSaga() {
  yield takeLatest(requestCatalog.type, handleGetCatalogSaga);
}

function* watchGetMoreCatalogItemsSaga() {
  yield takeLatest(requestMoreCatalogItems.type, handleGetCatalogSaga);
}

function* watchGetCatalogByCategorySaga() {
  yield takeLatest(requestCatalogByCategory.type, handleGetCatalogSaga);
}

export default function* catalogSaga() {
  yield spawn(watchGetCatalogSaga);
  yield spawn(watchGetMoreCatalogItemsSaga);
  yield spawn(watchGetCatalogByCategorySaga);
}