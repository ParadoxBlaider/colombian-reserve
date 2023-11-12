// src/api.js
import axios from 'axios';

//prod
const BASE_URL = 'https://colombian-reserve-server.azurewebsites.net/api';
//dev
/* const BASE_URL = 'http://localhost:4000/api'; */

export const getHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setStatusHotel = async (id,data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/hotels/${id}/status`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createHotel = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/hotels`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailsHotel = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHotel = async (id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/hotels/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


