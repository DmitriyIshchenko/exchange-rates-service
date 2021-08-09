import { configureStore } from '@reduxjs/toolkit';
import exchangerReducer from '../features/exchanger/exchangerSlice';


export const store = configureStore({
  reducer: {
    exchanger: exchangerReducer
  }
});