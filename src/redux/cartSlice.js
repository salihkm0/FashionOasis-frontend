// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-hot-toast";

// Async thunk to fetch the cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5555/api/v1/cart');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/api/v1/add-cart/${productId}`,
        { quantity }
      );
      toast.success(response.data.message)
      return response.data; // Returning the product data from the API response
    } catch (error) {
      toast.error(response.data.message)
      return rejectWithValue(error.response.data); // Returning the error message
    }
  }
);

// Async thunk to update product quantity in the cart
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        'http://localhost:5555/api/v1/update-cart',
        { id: productId, quantity }
      );
      toast.success(response.data.message)
      return response.data; // Returning the success message
    } catch (error) {
      toast.error(response.data.message)
      return rejectWithValue(error.response.data); // Returning the error message
    }
  }
);

// Async thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5555/api/v1/delete-cart-product/${productId}`);
      toast.success(response.data.message)
      return response.data; // Returning the success message
    } catch (error) {
      toast.error(response.data.message)
      return rejectWithValue(error.response.data); // Returning the error message
    }
  }
);

// Async thunk to clear the cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete('http://localhost:5555/api/v1/delete-cart');
      toast.success(response.data.message)
      return response.data; // Returning the success message
    } catch (error) {
      toast.error(response.data.message)
      return rejectWithValue(error.response.data); // Returning the error message
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const cart = action.payload;
        state.items = cart.products;
        state.totalQuantity = cart.totalQuantity;
        state.totalPrice = cart.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const product = action.payload.product;
        const existingItem = state.items.find(
          (item) => item.product.toString() === product._id.toString()
        );

        if (existingItem) {
          existingItem.quantity += product.quantity;
        } else {
          state.items.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            image: product.image,
          });
        }

        state.totalQuantity += product.quantity;
        state.totalPrice += product.price * product.quantity;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, quantity } = action.payload;

        const existingItem = state.items.find(
          (item) => item.product.toString() === id.toString()
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          state.totalQuantity += quantity;
          state.totalPrice += existingItem.price * quantity;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const productId = action.payload.productId;

        state.items = state.items.filter(
          (item) => item.product.toString() !== productId.toString()
        );

        // Optionally update totalQuantity and totalPrice based on the removed item
        // You may need to fetch the updated cart details from the server if necessary
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = 'succeeded';
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
