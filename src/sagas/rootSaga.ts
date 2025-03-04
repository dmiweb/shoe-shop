import { all, spawn } from 'redux-saga/effects';
import catalogSaga from './catalogSaga';
import topSalesSaga from './topSalesSaga';
import categoriesSaga from './categoriesSaga';
import productSaga from './productSaga';
import cartSaga from './cartSaga';

export default function* rootSaga() {
  yield all([
    spawn(catalogSaga),
    spawn(topSalesSaga),
    spawn(categoriesSaga),
    spawn(productSaga),
    spawn(cartSaga)
  ]);
}