import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetch User
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users',{
        withCredentials: true 
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/users/process-register', 
      userData, // FormData
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // এই হেডার যোগ করুন
        }
      }
    );
    console.log(response.data); // Check the token in the response
    
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const verifyRegisterToken = createAsyncThunk('user/verifyRegisterToken', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/users/verify', 
      token, // FormData
      { 
        withCredentials: true,
      
      }
    );
    console.log(response.data); // Check the token in the response
    
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

//http://localhost:8000/api/users/verify

const userSlice = createSlice({
  name: 'user',
  initialState: {
    register: [],
    success: [],
    user: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.payload.users;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action.payload);

      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.register = action.payload; // Fix the typo from 'toekn' to 'token'
        console.log(state.register); // Check the token in the response
        
      })
      .addCase(verifyRegisterToken.fulfilled, (state, action) => {
          state.success = action.payload              
      })
  },
});

export default userSlice.reducer;
