import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import catalogReducer from '../slices/catalogSlice';
import categoriesReducer from '../slices/categoriesSlice';
import topSalesReducer from '../slices/topSalesSlice';
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    categories: categoriesReducer,
    topSales: topSalesReducer,
    product: productReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;