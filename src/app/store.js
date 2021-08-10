import { configureStore } from '@reduxjs/toolkit';
import exchangerReducer from '../features/exchanger/exchangerSlice';
import graphReducer from "../features/graph/graphSlice"


export const store = configureStore({
  reducer: {
    exchanger: exchangerReducer,
    graph: graphReducer
  }
});