// src/api.js
import axios from 'axios';

const BASE_URL = "https://colombian-reserve-server.azurewebsites.net/api";

export const createRoom = async (hote_id, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/hotels/${hote_id}/available-rooms`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setStatusRoom = async (hote_id, room_id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/hotels/${hote_id}/available-rooms/${room_id}/status`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (hote_id, room_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/hotels/${hote_id}/available-rooms/${room_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


