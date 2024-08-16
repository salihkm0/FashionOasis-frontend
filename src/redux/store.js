// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import productsReducer from './productsSlice.js';
import cartReducer from './cartSlice.js';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
