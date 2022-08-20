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
      // Add to payload the price and the quantity selected
      state.total += action.payload.price * action.payload.quantity;
      state.quantity += 1;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
