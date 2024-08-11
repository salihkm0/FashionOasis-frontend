

// src/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fashionoasis-backend.onrender.com/api/v1/product/all'); // Adjust the API endpoint as needed
    return response.data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

