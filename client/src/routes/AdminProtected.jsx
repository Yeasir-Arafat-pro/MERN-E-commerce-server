import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const AdminProtected = () => {
  //const { isAdmin } = useSelector(state => state.auth)
  // Check if the user is logged in and is an admin
    const token = Cookies.get('accessToken')
    

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.user.isAdmin) {
      return <Outlet />

    }else{
    return <Navigate to="/auth/login" />
    }
  }else {
    return <Navigate to="/auth/login" />
  }


}
    
export default AdminProtected

