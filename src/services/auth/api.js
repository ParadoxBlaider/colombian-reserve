// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/authenticate`, credentials);
    console.log(response)
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const isAuthenticated = () => {
  // Check if the token or user information exists in local storage
  return localStorage.getItem('authToken') !== null;
};