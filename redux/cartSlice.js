import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      // Pass pizza details as payload
      state.products.push(action.payload);
      state.quantity += 1;
      // Add to payload the price and the quantity selected
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
