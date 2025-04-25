import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', userData, {
        withCredentials: true
      }); // Fixed URL
      return response.data.payload.userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/logout', {}, { // Fixed URL{
      withCredentials: true
    }); // Fixed URL
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false
        state.isLoading = false;
          state.user = null;
        state.token = null;
        
        
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

//export const { logout } = authSlice.actions;

export default authSlice.reducer;

// reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token'); // Clear token from localStorage
//     },
//   },