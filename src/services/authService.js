import axios from "axios";

const API_URL = "https://goal-tracker-api.onrender.com/api/v1/";

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};