// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import productsReducer from './productsSlice.js';
import cartReducer from './cartSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
