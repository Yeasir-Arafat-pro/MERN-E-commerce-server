import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const LoginProtected = () => {
  //const { isAdmin } = useSelector(state => state.auth)
  // Check if the user is logged in and is an admin
    const token = Cookies.get('accessToken')
  if (token) {
      return <Navigate to="/" />
    }else{
        return <Outlet />
    }
}

export default LoginProtected

