//http://localhost:8000/api/products?limit=20&page=5

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetch User
export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({page, limit, search, sortBy, sortOrder}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
        withCredentials: true 
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//http://localhost:8000/api/users/verify
const productSlice = createSlice({
  name: 'product',
  initialState: {
    pagination:[],
    success: false,
    products: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.payload.products;
        state.pagination = action.payload.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

      })
      
  },
});

export default productSlice.reducer;
