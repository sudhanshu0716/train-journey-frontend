import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/markers',
});

export const getMarkers = () => API.get('/');
export const addMarker = (marker) => API.post('/add', marker);
export const removeMarker = (id) => API.delete(`/${id}`);
