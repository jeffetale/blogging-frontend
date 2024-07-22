// src/context/AuthContext.js

'use client'

import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('access_token'));

  const login = (token) => {
    Cookies.set('access_token', token, { expires: 1 });
    setLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('access_token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
