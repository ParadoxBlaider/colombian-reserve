// src/api.js
import axios from 'axios';
import { URL_API } from '../../constants/env';

const BASE_URL = URL_API;

export const getBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailsBooking = async (booking_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/${booking_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




