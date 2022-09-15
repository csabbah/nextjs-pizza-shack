import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cartSlice';
import featuredImagesReducer from './featuredSlice';

export default configureStore({
  reducer: {
    cart: cardReducer,
    featuredImages: featuredImagesReducer,
  },
});
