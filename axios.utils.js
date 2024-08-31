import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET = import.meta.env.VITE_SECRET;
const PHRASE = import.meta.env.VITE_PHRASE;
const ACCESS_HASH = import.meta.env.VITE_ACCESS_HASH;
const CLIENT_ROLE_HASH = import.meta.env.VITE_USER_ROLE_HASH;
const AGENT_ROLE_HASH = import.meta.env.VITE_AGENT_ROLE_HASH;
const ADMIN_ROLE_HASH = import.meta.env.VITE_ADMIN_ROLE_HASH;

class Crypt {
  static encrypt = async data => {
    try {
      const ciphertext = await CryptoJS.AES.encrypt(data, SECRET).toString();
      return ciphertext;
    } catch (error) {
      return Promise.reject(new Error('Encryption failed'));
    }
  };

  static decrypt = async data => {
    try {
      const bytes = await CryptoJS.AES.decrypt(data, SECRET);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;
    } catch (error) {
      return Promise.reject(new Error('Decryption failed'));
    }
  };
}

class Packet {
  static pack = async data => {
    if (PHRASE === 'Development') {
      return data;
    }
    const jsonString = JSON.stringify(data);
    const encryptedData = await Crypt.encrypt(jsonString);
    return {data: encryptedData};
  };

  static extract = async data => {
    if (PHRASE === 'Development') {
      return data;
    }
    const decryptedData = await Crypt.decrypt(data);
    return JSON.parse(decryptedData);
  };
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    try {
      if (config.data) {
        const packedData = await Packet.pack(config.data);
        config.data = packedData;
      }
      config.headers['Access-hash'] = ACCESS_HASH;
      
      const accessToken = sessionStorage.getItem('access');
      if (accessToken) {
        config.headers['Authorization'] = accessToken;
      }

      // Determine which role hash to add based on the endpoint
      if (config.url.includes('client')) {
        config.headers['Role-Hash'] = CLIENT_ROLE_HASH;
      } else if(config.url.includes('admin')) {
        console.log("admin")
        config.headers['Role-Hash'] = ADMIN_ROLE_HASH;
      } else if(config.url.includes('agent')) {
        config.headers['Role-Hash'] = AGENT_ROLE_HASH;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async response => {
    try {
      if (response.data) {
        const extractedData = await Packet.extract(response.data.data);
        response.data = extractedData;
      }
      if(response.data.credentials.access){
        sessionStorage.setItem('access', response.data.credentials.access)
      }
      if(response.data.credentials.Identifier){
        sessionStorage.setItem('Identifier', response.data.credentials.Identifier)
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

export default axiosInstance;
