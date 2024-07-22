// src/lib/auth.js

import Cookies from "js-cookie";

export function isAuthenticated() {
    return !!Cookies.get('access_token');
  }
