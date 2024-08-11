// // src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5555/api/v1/auth/current_user",
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// // http://localhost:5555/api/v1/profile
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.user = action.payload || null;
//       })
//       .addCase(fetchCurrentUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;

// export default authSlice.reducer;


// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async () => {
//   const token = getToken();
//   if (!token) throw new Error('No token found');

  const response = await axios.get('https://fashionoasis-backend.onrender.com/api/v1/profile', {
    withCredentials : true
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return response.data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    //   removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
