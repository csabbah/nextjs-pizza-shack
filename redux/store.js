import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cartSlice';

export default configureStore({
  reducer: {
    cart: cardReducer,
  },
});
