import axios from 'axios';

const API = axios.create({
  baseURL: 'https://train-journey-backend.onrender.com/api/markers',
});

export const getMarkers = () => API.get('/');
export const addMarker = (marker) => API.post('/add', marker);
export const removeMarker = (id) => API.delete(`/${id}`);
