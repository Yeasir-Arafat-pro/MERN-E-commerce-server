import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import productReducer from '../features/products/productSlice';


const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice reducer
    userR: userReducer, // Add the user slice reducer
    productR: productReducer, // Add the user slice reducer
  },
});

export default store;