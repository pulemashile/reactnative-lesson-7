import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
});

export const createBooking = async (bookingData) => {
  try 
  {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } 
  catch (error) 
  {
    console.error(error);
    throw error;
  }
};

export const createPaypalOrder = async (bookingId, amount) => {
  try 
  {
    const response = await api.post('/payments/create-order', { bookingId, amount });
    return response.data;
  } 
  catch (error) 
  {
    console.error(error);
    throw error;
  }
};

export const capturePaypalPayment = async (orderId, payerId, bookingId) => {
  try 
  {
    const response = await api.post('/payments/capture-payment', { orderId, payerId, bookingId });
    return response.data;
  } 
  catch (error) 
  {
    console.error(error);
    throw error;
  }
};
