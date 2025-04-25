import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetch User
export const fetchUser = createAsyncThunk('user/fetchUser', async ({page, limit, search, sortBy, sortOrder}, { rejectWithValue }) => {
    try {
      console.log(page);
      
      const response = await axios.get(`http://localhost:8000/api/users?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
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
    
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId, { rejectWithValue }) => {
  try {
      await axios.delete(
      `http://localhost:8000/api/users/${userId}`,
      { 
        withCredentials: true,
      
      }
    );
    return userId
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const updateUserById = createAsyncThunk('user/updateUserById', async ({userId, userData},{ rejectWithValue }) => {
  
  try {
       const response = await axios.put(
      `http://localhost:8000/api/users/${userId}`, userData, // Pass updatedData here
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      
      }
    );
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const userStatusAction = createAsyncThunk('user/userStatusAction', async ({userId, action},{ rejectWithValue }) => {
  
  try {
       const response = await axios.put(
      `http://localhost:8000/api/users/user-status/${userId}`, {action:action}, // Pass updatedData here
      { 
        withCredentials: true,
      }
    );
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);


//http://localhost:8000/api/users/verify
const userSlice = createSlice({
  name: 'user',
  initialState: {
    pagination:[],
    register: [],
    payload: [],
    success: false,
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
        state.pagination = action.payload.payload.pagination;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

      })
      .addCase(createUser.pending, (state) => {
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.register = action.payload; // Fix the typo from 'toekn' to 'token'
        state.success = true;
      })
      .addCase(verifyRegisterToken.fulfilled, (state) => {
          state.success = true              
      })
      .addCase(verifyRegisterToken.rejected, (state, action) => {
        state.error = action.payload;

      })
      //state.books = state.books.filter(book => book.id !== action.payload.id);
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter(user => user._id !== action.payload)
    })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const index = state.user.findIndex(user => user._id === action.payload._id);
          state.user[index] = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userStatusAction.fulfilled, (state, action) => {
        const index = state.user.findIndex(user => user._id === action.payload.payload._id);
          state.user[index] = action.payload.payload;
      })

      
  },
});

export default userSlice.reducer;
