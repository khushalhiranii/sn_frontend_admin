// axiosSetup.js
import axios from 'axios';
import { getToken, useAuth } from './context/AuthContext';

const useAxios = () => {
  const { logout } = useAuth();

  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
