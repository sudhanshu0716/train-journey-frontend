import axios from 'axios';

const apiUrl = "http://localhost:5000/api/reports"; 

export const checkReports = async (trainNo, date) => {
  try {
    const response = await axios.get(`${apiUrl}?trainNo=${trainNo}&date=${date}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching reports");
  }
};

export const submitReport = async (trainNo, date, scale) => {
  try {
    const response = await axios.post(`${apiUrl}/submit`, { trainNo, date, scale });
    return response.data;
  } catch (error) {
    throw new Error("Error submitting report");
  }
};
