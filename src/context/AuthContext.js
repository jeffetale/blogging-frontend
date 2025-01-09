// src/context/AuthContext.js

'use client'

import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('access_token'));

  const login = (token) => {
    Cookies.set('access_token', token, { expires: 30 });
    setLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('access_token');
    setLoggedIn(false);
  };

  const getAccessToken = () => {
    return Cookies.get('access_token');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
