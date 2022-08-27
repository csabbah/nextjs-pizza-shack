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
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    deletePizza: (state, action) => ({
      ...state,
      products: state.products.filter(
        (item) => item._id !== action.payload.pizzaId
      ),
    }),

    updateCart: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct, reset, deletePizza, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
