// AuthContext.js
// import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const getToken = () => {
  return sessionStorage.getItem('accessToken');
};

export const saveToken = (token) => {
  sessionStorage.setItem('accessToken', token);
};

// export const verifyToken = async (token) => {
//   try {
//     const url = `${import.meta.env.VITE_API_URL}/admin/data`;
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.status === 200; // Assuming 200 means the token is valid
//   } catch (error) {
//     console.error('Error verifying token', error);
//     return false;
//   }
// };

export const refresh = async () => {
  try {
    const token = getToken();
    const url = `${import.meta.env.VITE_API_URL}/admin/data`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
  } catch (error) {
    console.error('Error refreshing data', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const checkAuthStatus = async () => {
    const token = getToken();
    if (token) {
      // const isValid = await verifyToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (token) => {
    saveToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refresh, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
