import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateAuthState = () => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const { user } = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(user.isAdmin);
      } catch (error) {
        console.error('Invalid Token:', error);
        clearAuthState();
      }
    } else {
      clearAuthState();
    }
  };

  useEffect(() => {
    updateAuthState();
  }, []);

  const logout = () => {
    clearAuthState(); 
  };

  const clearAuthState = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, logout,  updateAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};